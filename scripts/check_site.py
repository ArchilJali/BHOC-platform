"""Check local navigation, fragment targets and catalogue integrity using only stdlib."""
import json,posixpath,re,sys
from pathlib import Path
from urllib.parse import urlsplit,unquote
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parents[1]
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.ids=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.append(a['id'])
  if tag in ['a','script','link','img']:
   u=a.get('href') or a.get('src')
   if u:self.links.append(u)
errors=[];parsed={}
for p in list(ROOT.rglob('*.html'))+list(ROOT.rglob('*.htm')):
 q=Parser();q.feed(p.read_text());parsed[p]=q
 if len(q.ids)!=len(set(q.ids)):errors.append(f'{p.relative_to(ROOT)}: duplicate HTML IDs')
for p,q in parsed.items():
 for link in q.links:
  u=urlsplit(link)
  if u.scheme or u.netloc:continue
  path=unquote(u.path)
  if path.startswith('/BHOC-platform/'):t=ROOT/path.removeprefix('/BHOC-platform/')
  elif path.startswith('/'):t=ROOT/path.lstrip('/')
  else:t=(p.parent/path).resolve() if path else p
  if t.is_dir():t=t/'index.html'
  if not t.exists():errors.append(f'{p.relative_to(ROOT)} -> {link} (missing file)')
  elif u.fragment and t in parsed and unquote(u.fragment) not in parsed[t].ids:errors.append(f'{p.relative_to(ROOT)} -> {link} (missing anchor)')
d=json.loads((ROOT/'veterinary/Vet-publications.json').read_text())
assert len({x['id'] for x in d})==len(d)
assert len(d)>=238
assert sum(x['id'].startswith('legacy-') for x in d)==4
for x in d:
 assert x.get('sources'),x['id']
 assert isinstance(x['institutions'],list)
 assert isinstance(x['species'],list)
 for field in ['link','pdf_url']:
  if x.get(field):assert urlsplit(x[field]).scheme in ['https','http'],x['id']
 assert not x['institutions'] or x.get('qep_page'),x['id']
search=(ROOT/'veterinary/Vet-search.html').read_text()
assert 'getFallbackData' not in search
assert search.count('class="publication"')==len(d)
print(f'Checked {len(parsed)} HTML pages and {sum(len(q.links) for q in parsed.values())} links; {len(d)} catalogue records')
for err in errors:print(err)
if errors:sys.exit(1)
print('PASS: all local links, anchors and catalogue checks')
