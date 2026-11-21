"""Render crawlable standalone HTML articles for GitHub Pages, without a server or API."""
import html
import json
import re
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://sam0989422478.github.io/taiwan-labor-news/"
OUT = ROOT / "stories"
ARTICLES = ROOT / "data" / "editorial.json"
VALID_ID = re.compile(r"^[A-Za-z0-9_-]{1,85}$")

def esc(value):
    return html.escape(str(value or ""), quote=True)

def url(value):
    value = str(value or "").strip()
    if value.startswith("https://") or value.startswith("http://"):
        return esc(value)
    return ""

def block(content):
    parts = []
    for section in content or []:
        heading = esc(section.get("heading", ""))
        if heading:
            parts.append(f"<h2>{heading}</h2>")
        if section.get("text"):
            parts.append(f"<p>{esc(section['text'])}</p>")
        if section.get("items"):
            li = "".join(f"<li>{esc(item)}</li>" for item in section["items"])
            parts.append(f"<ul>{li}</ul>")
    return "\n".join(parts)

def render(item):
    ident = item["id"]
    title = str(item.get("title") or "勞動新聞")
    description = str(item.get("summary") or title)[:155]
    original = url(item.get("source_url"))
    path = f"stories/{quote(ident)}.html"
    permalink = BASE + path
    schema = {
        "@context":"https://schema.org",
        "@type":"Article",
        "headline":title,
        "description":description,
        "datePublished":item.get("published_at") or item.get("date"),
        "dateModified":item.get("published_at") or item.get("date"),
        "mainEntityOfPage":permalink,
        "author":{"@type":"Organization","name":"台灣勞基新聞網"},
        "publisher":{"@type":"Organization","name":"台灣勞基新聞網"}
    }
    schema_json = json.dumps(schema, ensure_ascii=False).replace("<", "\\u003c")
    source_link = f'<a href="{original}" target="_blank" rel="noopener noreferrer">查閱原始報導</a>' if original else '<span>原始連結暫不可用</span>'
    return f'''<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="index,follow">
<meta name="description" content="{esc(description)}">
<link rel="canonical" href="{esc(permalink)}">
<meta property="og:type" content="article">
<meta property="og:title" content="{esc(title)}｜台灣勞基新聞網">
<meta property="og:description" content="{esc(description)}">
<meta property="og:url" content="{esc(permalink)}">
<title>{esc(title)}｜台灣勞基新聞網</title>
<script type="application/ld+json">{schema_json}</script>
<style>
:root{{--navy:#123451;--red:#bc3044;--text:#243b51}}*{{box-sizing:border-box}}
body{{margin:0;background:#f7f9fb;color:var(--text);font:16px/1.85 system-ui,-apple-system,"Noto Sans TC",sans-serif}}
header{{background:#133552;color:#fff;padding:17px 0}}
.wrap{{width:min(790px,calc(100% - 36px));margin:auto}}
header a{{color:#fff;text-decoration:none;font-weight:850;font-size:1.12rem}}
main{{background:#fff;margin:20px auto 45px;padding:clamp(16px,5vw,40px);border:1px solid #e4eaf0;border-radius:10px}}
h1{{font-size:clamp(1.48rem,4vw,2.15rem);line-height:1.5;color:#173a59;margin:12px 0}}
h2{{color:#173a59;font-size:1.15rem;margin:25px 0 6px}}
p{{margin:10px 0 17px}}li{{margin:8px 0}}a{{color:#a92339;overflow-wrap:anywhere}}
.meta{{font-size:.82rem;color:#637b8d}}
.tag{{background:#e9f1f7;color:#214e70;font-size:.78rem;font-weight:700;padding:5px 10px;border-radius:5px}}
.source{{background:#f2f6f9;padding:15px;border-left:4px solid var(--red);margin-top:28px}}
.contact{{background:#eaf3f7;padding:17px;border-radius:8px;margin-top:22px}}
.line{{display:inline-block;padding:11px 16px;background:#167c4b;color:#fff;border-radius:8px;text-decoration:none;font-weight:800}}
.actions{{margin-top:22px}}
footer{{background:#123451;color:#cfe0ec;padding:18px 0;font-size:.8rem}}
@media(max-width:640px){{main{{margin:0 auto 22px;border:0;border-radius:0}}}}
</style>
</head>
<body>
<header><div class="wrap"><a href="../">台灣勞基新聞網</a></div></header>
<main class="wrap">
<span class="tag">{esc(item.get("category") or "勞動新聞")}</span>
<h1>{esc(title)}</h1>
<div class="meta">{esc(item.get("date"))} · 台灣勞基新聞網編輯整理 · 來源：{esc(item.get("source"))}</div>
<p><strong>{esc(description)}</strong></p>
{block(item.get("body"))}
<div class="source"><strong>原始報導與查證</strong><p>{esc(item.get("source_title") or title)}</p>{source_link}</div>
<div class="contact"><strong>對企業制度或勞資爭議有疑問嗎？</strong><p>實際適用需依個案情況及現行法令確認，歡迎洽詢台灣勞基真人顧問。</p><a class="line" href="https://lin.ee/NgRW9iS" target="_blank" rel="noopener noreferrer">官方 LINE 真人客服</a></div>
<div class="actions"><a href="../#news">返回最新新聞</a></div>
</main>
<footer><div class="wrap">台灣勞基新聞網 · 勞動新聞與企業管理資訊</div></footer>
</body>
</html>
'''

def main():
    data = json.loads(ARTICLES.read_text(encoding="utf-8"))
    OUT.mkdir(exist_ok=True)
    count = 0
    for item in data.get("articles", []):
        ident = str(item.get("id", ""))
        if not VALID_ID.fullmatch(ident):
            print("Skip unsafe article id", repr(ident))
            continue
        (OUT / f"{ident}.html").write_text(render(item), encoding="utf-8")
        count += 1
    print(f"Generated {count} standalone indexable article HTML files")

if __name__ == "__main__":
    main()
