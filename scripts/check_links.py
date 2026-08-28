"""Check static HTML references without network access or third-party packages."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse, unquote
import sys
ROOT=Path(__file__).resolve().parents[1]
BASE='https://archiljali.github.io/BHOC-platform/'
class Document(HTMLParser):
    def __init__(self):super().__init__();self.ids=set();self.refs=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if 'id' in d:self.ids.add(d['id'])
        if tag=='a' and 'name' in d:self.ids.add(d['name'])
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
        if dest.netloc!='archiljali.github.io' or not dest.path.startswith('/BHOC-platform/'):continue
        rel=unquote(dest.path[len('/BHOC-platform/'):]);target=(ROOT/rel).resolve()
        if target.is_dir():target=target/'index.html'
        checked+=1
        if not target.is_file():errors.append(f'{p.relative_to(ROOT)}: missing {ref}')
        elif dest.fragment and target in documents and unquote(dest.fragment) not in documents[target].ids:errors.append(f'{p.relative_to(ROOT)}: missing anchor {ref}')
for e in errors:print(e)
print(f'{len(files)} HTML pages; {checked} local references; {len(errors)} errors')
sys.exit(bool(errors))
