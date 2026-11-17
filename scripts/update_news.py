"""Daily editorial digest from verifiable RSS metadata; no fabricated details."""
import datetime as dt
import email.utils
import hashlib
import json
import os
import re
import urllib.request
import xml.etree.ElementTree as ET
from html import unescape
from pathlib import Path
from urllib.parse import urlencode, urlparse

ROOT = Path(__file__).resolve().parents[1]
EDITORIAL = ROOT / "data/editorial.json"
OFFICIAL = ROOT / "data/news.json"
RSS_OFFICIAL = "https://www.mol.gov.tw/1607/1632/1633/RssList"
QUERIES = [
    "台灣 勞基法 勞資爭議 when:3d",
    "台灣 勞動部 工時 薪資 職災 when:3d",
    "台灣 職場霸凌 育兒假 資遣 勞檢 when:3d",
]
USER_AGENT = "TaiwanLaborNews/1.0 (public RSS editorial digest)"
TZ = dt.timezone(dt.timedelta(hours=8))

def clean(raw):
    return re.sub(r"\s+", " ", unescape(re.sub(r"<[^>]*>", " ", raw or ""))).strip()

def tag(node, name):
    found = node.find(name)
    return (found.text or "").strip() if found is not None else ""

def date_of(raw):
    try:
        d = email.utils.parsedate_to_datetime(raw)
        return d.astimezone(TZ).date().isoformat()
    except (TypeError, ValueError, IndexError, OverflowError):
        m = re.search(r"(20\d{2})[-/](\d{1,2})[-/](\d{1,2})", raw or "")
        return f"{int(m[1]):04d}-{int(m[2]):02d}-{int(m[3]):02d}" if m else ""

def category(text):
    if any(v in text for v in ("職災", "職安", "職業安全", "勞檢", "霸凌", "職場安全")): return "職安職災"
    if any(v in text for v in ("工資", "薪資", "工時", "加班", "休假", "最低工資", "育兒", "產假")): return "工資工時"
    if any(v in text for v in ("勞資", "工會", "調解", "爭議", "資遣", "解僱", "裁員")): return "勞資關係"
    return "政策法規"

def request_feed(url):
    req = urllib.request.Request(url, headers={"User-Agent":USER_AGENT, "Accept":"application/rss+xml,application/xml,text/xml"})
    with urllib.request.urlopen(req, timeout=25) as response:
        root = ET.fromstring(response.read(2_000_000))
    return root.findall("./channel/item")

def read_json(path, default):
    try: return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError): return default

def save_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")

def safe_source_link(url):
    parsed = urlparse(url)
    return parsed.scheme == "https" and bool(parsed.netloc)

def fetch_official():
    results = []
    for node in request_feed(RSS_OFFICIAL):
        title, url = clean(tag(node,"title")), tag(node,"link")
        if not title or not safe_source_link(url) or urlparse(url).hostname not in ("www.mol.gov.tw","mol.gov.tw"): continue
        cat = category(title)
        results.append({"title":title,"date":date_of(tag(node,"pubDate")),"url":url,"category":cat,"source":"勞動部","summary":"勞動部發布相關政策與資訊，請點閱原文核對適用對象、法規及施行日期。"})
    unique = {item["url"]:item for item in results}
    return sorted(unique.values(),key=lambda x:x["date"],reverse=True)[:36]

def fetch_media():
    results = []
    for query in QUERIES:
        url = "https://news.google.com/rss/search?"+urlencode({"q":query,"hl":"zh-TW","gl":"TW","ceid":"TW:zh-Hant"})
        try:
            items = request_feed(url)
        except Exception as exc:
            print(f"News RSS query unavailable: {type(exc).__name__}")
            continue
        for node in items:
            headline, url = clean(tag(node,"title")), tag(node,"link")
            date = date_of(tag(node,"pubDate"))
            source = clean(tag(node,"source")) or "Google 新聞收錄媒體"
            if not headline or not date or not safe_source_link(url): continue
            # Google News links are aggregated pointers; never imply full article content was read.
            normalized = re.sub(r"\s+-\s+[^-]{2,36}$","",headline).strip()
            if len(normalized)<10: continue
            results.append({"title":normalized,"original_title":headline,"date":date,"url":url,"source":source,"category":category(normalized)})
    unique = {}
    for item in results: unique[item["title"]] = item
    return sorted(unique.values(), key=lambda x:x["date"], reverse=True)

def practical_notes(cat):
    return {
        "工資工時":["確認公司現行工時、排班及出勤紀錄是否完整","檢查薪資項目與相關給付的計算方式","如涉及新制，應先核對主管機關公布的適用日期"],
        "勞資關係":["檢查相關勞動契約與工作規則是否清楚","保存溝通、協商及書面通知紀錄","遇到個別爭議，先核對實際事實與適用法規"],
        "職安職災":["重新檢視作業風險與防護措施","確認教育訓練、通報及事故紀錄","視業務性質核對職安衛相關法定義務"],
        "政策法規":["確認政策目前處於提案、修法或施行哪個階段","盤點公司制度可能受影響的項目","依主管機關正式公告調整內部管理"],
    }[cat]

def build_article(item):
    cat=item["category"]
    # Conservative original digest based on verified metadata only.
    title=item["title"]
    ref=item["source"]
    intro=f"近期勞動議題受到關注。根據「{ref}」於 {item['date']} 發布的新聞標題，相關焦點為「{title}」。"
    context="本篇為台灣勞基新聞網的原創導讀與企業管理提醒，依公開新聞標題及來源資訊整理；尚未獨立核實新聞全文細節，不將媒體報導、修法提案或爭議指控視為已確定的法律結論。"
    notes=practical_notes(cat)
    return {
        "id":hashlib.sha256((item["url"]+title).encode()).hexdigest()[:16],
        "title":f"{cat}焦點｜{title}",
        "date":item["date"],"published_at":dt.datetime.now(TZ).isoformat(),
        "category":cat,"source":ref,"source_title":item.get("original_title",title),
        "source_url":item["url"],"summary":intro,
        "body":[{"heading":"新聞焦點","text":intro},{"heading":"台灣勞基觀察","text":context},
                {"heading":"企業主可以先做的三件事","items":notes},
                {"heading":"資料與查證","text":f"資料來源：{ref}；來源日期：{item['date']}。本文為編輯導讀，完整事實與法規適用請查閱下方原始報導及主管機關公告。"}],
        "kind":"編輯導讀"
    }

def main():
    now = dt.datetime.now(TZ)
    existing = read_json(EDITORIAL,{"articles":[]})
    existing_official = read_json(OFFICIAL,{"articles":[]})
    try:
        official = fetch_official()
        if official:
            save_json(OFFICIAL,{"updated_at":now.isoformat(),"articles":official})
    except Exception as exc:
        print(f"Official RSS unavailable, keep old data: {type(exc).__name__}")
    media = fetch_media()
    # Supplement with official sources if media RSS is temporarily unavailable.
    candidates = media or [{"title":x["title"],"date":x["date"],"url":x["url"],"source":"勞動部","category":x["category"]} for x in existing_official["articles"][:8]]
    cutoff = (now.date()-dt.timedelta(days=7)).isoformat()
    existing_articles = {a["id"]:a for a in existing.get("articles",[]) if a.get("id")}
    added = 0
    for item in candidates:
        if item["date"] < cutoff: continue
        article = build_article(item)
        if article["id"] not in existing_articles:
            existing_articles[article["id"]] = article
            added += 1
        if added >= 4: break
    articles = sorted(existing_articles.values(),key=lambda a:(a["date"],a.get("published_at","")),reverse=True)[:90]
    if not articles: raise RuntimeError("No current articles available; refusing fabricated news")
    save_json(EDITORIAL,{"updated_at":now.isoformat(),"articles":articles})
    print(f"Editorial update: {added} new, {len(articles)} stored")

if __name__=="__main__": main()
