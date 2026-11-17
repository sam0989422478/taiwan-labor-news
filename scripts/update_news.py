"""Fetch official Ministry of Labor news; retain links and avoid invented facts."""
import datetime as dt
import email.utils
import json
import pathlib
import re
import urllib.request
import xml.etree.ElementTree as ET
from html import unescape
from urllib.parse import urlparse

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "news.json"
FEED = "https://www.mol.gov.tw/1607/1632/1633/RssList"

def clean(raw):
    return re.sub(r"\s+", " ", unescape(re.sub(r"<[^>]+>", " ", raw or ""))).strip()

def value(node, name):
    found = node.find(name)
    return (found.text or "").strip() if found is not None else ""

def category(title):
    if any(s in title for s in ("職災", "職安", "職業安全", "勞檢", "霸凌")): return "職安職災"
    if any(s in title for s in ("工資", "薪資", "工時", "加班", "休假", "最低工資")): return "工資工時"
    if any(s in title for s in ("勞資", "工會", "調解", "爭議", "資遣", "解僱")): return "勞資關係"
    return "政策法規"

def date_of(raw):
    try: return email.utils.parsedate_to_datetime(raw).date().isoformat()
    except (TypeError, ValueError, IndexError): pass
    match = re.search(r"(20\d{2})[-/](\d{1,2})[-/](\d{1,2})", raw or "")
    return f"{int(match[1]):04d}-{int(match[2]):02d}-{int(match[3]):02d}" if match else ""

def main():
    req = urllib.request.Request(FEED, headers={"User-Agent":"TaiwanLaborNews/1.0","Accept":"application/rss+xml,application/xml,text/xml"})
    with urllib.request.urlopen(req, timeout=30) as response:
        root = ET.fromstring(response.read())
    items = root.findall("./channel/item")
    if not items: raise RuntimeError("Official RSS has no items; existing news preserved")
    data = []
    for item in items:
        title = clean(value(item, "title"))
        link = value(item, "link")
        parsed = urlparse(link)
        if not title or parsed.scheme != "https" or parsed.hostname not in ("www.mol.gov.tw","mol.gov.tw"): continue
        kind = category(title)
        data.append({"title":title,"date":date_of(value(item,"pubDate")),"url":link,"category":kind,"source":"勞動部","summary":f"這則勞動部消息與「{kind}」相關。建議企業主點閱官方原文，核對適用對象、施行時間與管理實務；勿僅憑標題判斷法規已生效。"})
    seen = {}
    for article in data: seen[article["url"]] = article
    articles = sorted(seen.values(), key=lambda a:a["date"], reverse=True)[:36]
    if not articles: raise RuntimeError("No validated news links; existing news preserved")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"updated_at":dt.datetime.now(dt.timezone.utc).isoformat(),"articles":articles},ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(f"Saved {len(articles)} official entries")

if __name__ == "__main__": main()
