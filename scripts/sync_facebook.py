"""Synchronize Page-owned Facebook posts using a private Page access token.
Never write access tokens to files or logs.
"""
import datetime as dt
import json
import os
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "facebook-posts.json"
PAGE = "https://www.facebook.com/lawkitaiwan/"
GRAPH_VERSION = "v27.0"

def main():
    token = os.environ.get("FB_PAGE_ACCESS_TOKEN", "").strip()
    page_id = os.environ.get("FB_PAGE_ID", "").strip()
    if not token or not page_id:
        print("Missing FB_PAGE_ACCESS_TOKEN or FB_PAGE_ID; keeping existing data.")
        return
    if not page_id.isdigit():
        raise ValueError("FB_PAGE_ID must be the numeric Facebook Page ID")
    params = urlencode({
        "fields": "id,message,created_time,permalink_url,full_picture",
        "limit": "12",
        "access_token": token,
    })
    url = f"https://graph.facebook.com/{GRAPH_VERSION}/{page_id}/posts?{params}"
    with urlopen(Request(url, headers={"User-Agent": "TaiwanLaborNews/1.0"}), timeout=30) as response:
        payload = json.load(response)
    items = payload.get("data")
    if not isinstance(items, list):
        raise RuntimeError("Facebook returned no post list; preserving existing cache")
    posts = []
    for item in items:
        link = item.get("permalink_url") or PAGE
        if not link.startswith(("https://www.facebook.com/", "https://facebook.com/")):
            continue
        img = item.get("full_picture", "")
        posts.append({
            "id": item.get("id", ""),
            "message": (item.get("message") or "")[:2500],
            "date": (item.get("created_time") or "")[:10],
            "url": link,
            "image_url": img if isinstance(img, str) and img.startswith("https://") else "",
        })
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({
        "updated_at": dt.datetime.now(dt.timezone.utc).isoformat(),
        "posts": posts[:6],
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Facebook posts synchronized: {len(posts[:6])}")

if __name__ == "__main__":
    main()
