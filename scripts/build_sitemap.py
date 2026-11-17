"""Generate sitemap.xml for the public Github Pages site from saved editorials."""
import json
from pathlib import Path
from urllib.parse import quote
from xml.etree.ElementTree import Element, SubElement, ElementTree, indent
ROOT=Path(__file__).resolve().parents[1]
BASE="https://sam0989422478.github.io/taiwan-labor-news/"
entries=json.loads((ROOT/"data/editorial.json").read_text(encoding="utf-8")).get("articles",[])
root=Element("urlset",{"xmlns":"http://www.sitemaps.org/schemas/sitemap/0.9"})
def add(url,lastmod=None):
    entry=SubElement(root,"url")
    SubElement(entry,"loc").text=url
    if lastmod: SubElement(entry,"lastmod").text=lastmod[:10]
add(BASE)
for item in entries:
    identifier=item.get("id","")
    if identifier:
        add(BASE+"article.html?id="+quote(identifier,safe=""),item.get("date"))
indent(root,space="  ")
ElementTree(root).write(ROOT/"sitemap.xml",encoding="utf-8",xml_declaration=True)
print(f"Sitemap entries: {len(entries)+1}")
