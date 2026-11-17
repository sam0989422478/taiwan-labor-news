"""Generate distinct, labelled editorial-illustration PHOTOS for up to three news items/day.

Requires OPENAI_API_KEY as a GitHub Actions secret. API usage incurs charges.
When absent, news generation and GitHub Pages continue with fallback art.
"""
import base64
import datetime as dt
import io
import json
import os
import re
import urllib.error
import urllib.request
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
FILE = ROOT / "data/editorial.json"
IMAGES = ROOT / "assets/generated"
TZ = dt.timezone(dt.timedelta(hours=8))
MODEL = os.environ.get("IMAGE_MODEL", "gpt-image-1.5")
MAX_PER_DAY = max(0, min(int(os.environ.get("MAX_DAILY_IMAGES", "3")), 3))
IMAGE_NOTE = "AI 生成示意圖，非新聞事件現場照片"

def scene_for(title):
    if re.search(r"育兒|子女|育嬰|托育|親職|產假", title):
        return "A Taiwanese working parent at a contemporary office desk, child at a nearby after-school corner, subtle everyday workplace context, caring and realistic."
    if re.search(r"投票|選舉|公投", title):
        return "A neutral Taiwan-style polling station entrance, ballot box and generic voting signs without text, no political party branding and no recognizable politician."
    if re.search(r"勞資|工會|調解|資遣|解僱|裁員|爭議", title):
        return "An ordinary Taiwanese company meeting room with several anonymous colleagues reviewing documents in a calm negotiation; no apparent real litigants."
    if re.search(r"職安|職災|勞檢|工安|事故|職業安全", title):
        return "An ordinary Taiwan factory workplace safety inspection, safety helmets, high-visibility vests and safe machinery, people shown from behind."
    if re.search(r"加班|工資|薪資|工時|薪水|勞退", title):
        return "A contemporary Taiwanese office desk with payroll spreadsheets, an analogue clock, calculator and anonymous worker hands; no legible personal information."
    return "A realistic Taiwanese business office setting with generic documents and staff collaborating on labor policy administration, anonymous people."

def prompt_for(item):
    title = item.get("title", "")
    return (
        "Create ONE unique high-quality photorealistic editorial STOCK-STYLE illustration for an independent Taiwan labor news website. "
        "Specific news subject: " + title[:110] + ". "
        "Visual scenario: " + scene_for(title) + " "
        "Landscape newsroom photography, natural light, documentary realism, professional framing, subtle navy and teal accents, no exaggerated drama, "
        "composition suitable for a 16:9 website crop. "
        "No words, no captions, no lettering, no watermarks, no brand logos, no government seals. "
        "Do not portray real named persons, specific companies, authentic scenes of alleged wrongdoing, or imply an actual news photograph. "
        "Use anonymous generic models. Each article must have a visually distinct scene. "
        "Imagery is illustrative, not evidence of an event. Article ID: " + str(item.get("id", ""))[:40]
    )

def generate(key, prompt):
    payload = json.dumps({
        "model": MODEL,
        "prompt": prompt,
        "size": "1536x1024",
        "quality": "medium",
        "n": 1,
    }).encode("utf-8")
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=payload,
        method="POST",
        headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=160) as resp:
        data = json.load(resp)
    b64 = data["data"][0]["b64_json"]
    raw = base64.b64decode(b64, validate=True)
    if len(raw) > 20_000_000:
        raise ValueError("Image exceeded maximum size")
    with Image.open(io.BytesIO(raw)) as im:
        image = ImageOps.fit(im.convert("RGB"), (1280, 720), method=Image.Resampling.LANCZOS)
        output = io.BytesIO()
        image.save(output, "WEBP", quality=82, method=5)
        return output.getvalue()

def main():
    key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not key:
        print("OPENAI_API_KEY not configured: automatic image generation skipped; using topic artwork.")
        return
    content = json.loads(FILE.read_text(encoding="utf-8"))
    articles = content.get("articles", [])
    if not articles:
        print("No articles yet; skipping images")
        return
    IMAGES.mkdir(parents=True, exist_ok=True)
    now = dt.datetime.now(TZ)
    # Bound spending: only newly published items in the past 3 days; never regenerate an existing image.
    eligible = []
    for item in articles:
        if item.get("image"):
            continue
        try:
            date = dt.date.fromisoformat(item.get("date", ""))
        except ValueError:
            continue
        if not 0 <= (now.date() - date).days <= 3:
            continue
        eligible.append(item)
    already_today = sum(1 for x in articles if (x.get("image_generated_at") or "").startswith(now.date().isoformat()))
    made = 0
    remaining = max(0, MAX_PER_DAY - already_today)
    print(f"Daily remaining image budget: {remaining}")
    for item in eligible:
        if made >= remaining:
            break
        slug = re.sub(r"[^a-zA-Z0-9_-]", "-", str(item.get("id", "")))[:65]
        if not slug:
            continue
        filename = f"{slug}.webp"
        path = IMAGES / filename
        if path.exists():
            item["image"] = f"assets/generated/{filename}"
            item["image_note"] = IMAGE_NOTE
            continue
        try:
            result = generate(key, prompt_for(item))
            path.write_bytes(result)
            item["image"] = f"assets/generated/{filename}"
            item["image_note"] = IMAGE_NOTE
            item["image_generated_at"] = now.isoformat()
            made += 1
            print(f"Generated illustration for {slug} ({len(result)} bytes)")
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, ValueError, KeyError, OSError) as error:
            # No API key, response data, or prompt details in error logs.
            print(f"Could not generate illustration for {slug}: {type(error).__name__}; will use topic artwork")
    if made or any(x.get("image") for x in eligible):
        FILE.write_text(json.dumps(content, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Generated {made} new illustrations; {already_today + made}/{MAX_PER_DAY} today")

if __name__ == "__main__":
    main()
