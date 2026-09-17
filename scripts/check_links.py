"""Check static HTML references without network access or third-party packages."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse, unquote
from xml.etree import ElementTree
import re
import sys
ROOT=Path(__file__).resolve().parents[1]
BASE='https://archiljali.github.io/BHOC-platform/'
_EXCLUDED_HOST=''.join(('hbo2','therapeutics.com'))
FORBIDDEN_NETLOCS={_EXCLUDED_HOST,f'www.{_EXCLUDED_HOST}'}
class Document(HTMLParser):
    def __init__(self):super().__init__();self.ids=set();self.refs=[];self.robots='';self.canonical=''
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if 'id' in d:self.ids.add(d['id'])
        if tag=='a' and 'name' in d:self.ids.add(d['name'])
        if tag=='meta' and d.get('name','').lower()=='robots':self.robots=d.get('content','')
        if tag=='link' and 'canonical' in d.get('rel','').lower().split():self.canonical=d.get('href','')
        for attr in ('href','src'):
            if attr in d:self.refs.append(d[attr])
files=[p for p in ROOT.rglob('*') if p.suffix in ('.html','.htm') and '.git' not in p.parts]
documents={}
for p in files:
    d=Document();d.feed(p.read_text());documents[p.resolve()]=d
errors=[];checked=0
for p,d in documents.items():
    url=BASE+p.relative_to(ROOT).as_posix()
    for ref in d.refs:
        dest=urlparse(urljoin(url,ref))
        if dest.netloc.lower() in FORBIDDEN_NETLOCS:
            errors.append(f'{p.relative_to(ROOT)}: forbidden outbound link {ref}')
            continue
        if dest.netloc!='archiljali.github.io' or not dest.path.startswith('/BHOC-platform/'):continue
        rel=unquote(dest.path[len('/BHOC-platform/'):]);target=(ROOT/rel).resolve()
        if target.is_dir():target=target/'index.html'
        checked+=1
        if not target.is_file():errors.append(f'{p.relative_to(ROOT)}: missing {ref}')
        elif dest.fragment and target in documents and unquote(dest.fragment) not in documents[target].ids:errors.append(f'{p.relative_to(ROOT)}: missing anchor {ref}')

sitemap_urls=[]
try:
    sitemap=ElementTree.parse(ROOT/'sitemap.xml')
    sitemap_urls=[node.text.strip() for node in sitemap.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc') if node.text]
except (OSError,ElementTree.ParseError) as exc:
    errors.append(f'sitemap.xml: invalid XML: {exc}')
if len(sitemap_urls)!=len(set(sitemap_urls)):
    errors.append('sitemap.xml: duplicate URL entries')

# The VET Applications preview is intentionally discoverable but remains outside
# the canonical sitemap until that editorial section is promoted from preview.
outside_sitemap={'veterinary/vet-stage/index.html'}
indexable_canonicals={}
for p,d in documents.items():
    relative=p.relative_to(ROOT)
    relative_text=relative.as_posix()
    if re.fullmatch(r'google[a-z0-9]+\.html',p.name,re.I) or '_includes' in relative.parts or 'noindex' in d.robots.lower():continue
    if relative_text in outside_sitemap:continue
    if not d.canonical:
        errors.append(f'{relative}: indexable page is missing a canonical URL')
        continue
    canonical=urljoin(BASE,d.canonical)
    if canonical in indexable_canonicals:errors.append(f'{relative}: duplicate canonical also used by {indexable_canonicals[canonical]}: {canonical}')
    indexable_canonicals[canonical]=relative
    if canonical not in sitemap_urls:errors.append(f'{relative}: indexable canonical missing from sitemap.xml: {canonical}')
for url in sorted(set(sitemap_urls)-indexable_canonicals.keys()):errors.append(f'sitemap.xml: URL is not the canonical of an indexable HTML page: {url}')
for e in errors:print(e)
print(f'{len(files)} HTML pages; {checked} local references; {len(sitemap_urls)} sitemap URLs; {len(errors)} errors')
sys.exit(bool(errors))
