"""Import the user-supplied catalogue without inventing missing affiliations or outcomes.
Usage: python3 scripts/import_publications.py /path/to/HBOC-Publications.xlsx
Requires openpyxl. Reviewed enrichments live in data/publication-enrichment.json.
"""
import json,re,sys,unicodedata,difflib
from pathlib import Path
import openpyxl
ROOT=Path(__file__).resolve().parents[1]
def clean(x): return re.sub(r'\s+',' ',str(x or '')).strip()
def norm(x): return re.sub(r'[^a-z0-9]','',unicodedata.normalize('NFKD',str(x)).lower())
def species(s):
 s=s.lower();out=[]
 for label,pattern in [('Canine',r'dog|canine|beagle'),('Feline',r'cat|feline'),('Equine',r'horse|foal|pony|equine'),('Porcine',r'pig|swine|porcine'),('Ovine',r'sheep|ovine|ewe'),('Rodent',r'rat|mice|mouse|hamster|rodent|guinea'),('Avian',r'bird|duck|parrot|avian|swan|hawk|eagle|falcon|owl|crane'),('Exotic / wildlife',r'ferret|tamandua|reptile'),('Human',r'human|patient')]:
  if re.search(pattern,s):out.append(label)
 return out or ['Not recorded']
if __name__=='__main__':
 old=json.loads((ROOT/'data/legacy-publications.json').read_text())
 enrich=json.loads((ROOT/'data/publication-enrichment.json').read_text())
 rows=list(openpyxl.load_workbook(sys.argv[1],data_only=True)['HBOC Publications'].values)[1:]
 records=[];used=set();ids=set()
 for rownum,r in enumerate(rows,2):
  if not r[2]:continue
  filename,category,title,indication,population,model,citation,study_type=map(clean,r[:8])
  key=filename or 'reference-'+str(rownum)
  if key in ids:key+='-'+str(rownum)
  ids.add(key)
  scores=[difflib.SequenceMatcher(None,norm(title),norm(x['title'])).ratio() for x in old]
  idx=max(range(len(old)),key=lambda i:scores[i]);legacy=old[idx] if scores[idx]>.86 else {}
  if legacy:used.add(idx)
  dates=re.findall(r'\b(?:19|20)\d{2}\b',filename+' '+citation)
  year=dates[0] if dates else legacy.get('year','')
  doi=re.search(r'10\.\d{4,9}/[^\s"<>]+',citation)
  source_doi=doi.group(0).rstrip('.,;') if doi else ''
  description=' '.join(x for x in [f'Focus: {indication}.' if indication else '',f'Population / material: {population}.' if population else '',f'Model: {model}.' if model else ''] if x) or 'Bibliographic record; the study findings have not yet been summarised.'
  record={'id':key,'title':title,'authors':legacy.get('authors',''),'year':year,'journal':legacy.get('journal',''),'keywords':legacy.get('keywords',''),'category':category,'indication':indication,'population':population,'model':model,'study_type':study_type or 'Not recorded','species':species(population),'citation':citation,'institutions':[],'institution_status':'Not yet verified','summary':description,'summary_status':'Catalogue scope, not an outcome review','doi':source_doi,'link':'https://doi.org/'+source_doi if source_doi else '', 'link_status':'DOI transcribed from supplied citation; resolution not individually checked' if source_doi else 'Original link not yet identified','pdf_url':'','sources':[{'file':'HBOC Publications.xlsx','sheet':'HBOC Publications','row':rownum}]}
  if key in enrich:record.update(enrich[key]);record['sources'].append({'file':'QEP References Combined 2.pdf','page':record['qep_page']})
  records.append(record)
 # Preserve unmatched legacy records rather than silently discarding them.
 for i,x in enumerate(old):
  if i not in used and not any(norm(x['title'])==norm(r['title']) for r in records):
   records.append(dict(x,id='legacy-'+str(i+1),category='Legacy record',species=['Not recorded'],institutions=[],institution_status='Not yet verified',summary='Legacy bibliographic record; reconciliation pending.',summary_status='Not reviewed',link='',pdf_url='',sources=[{'file':'Legacy Vet-publications.json'}],citation='',study_type='Not recorded',indication='',population='',model='',doi=''))
 (ROOT/'veterinary/Vet-publications.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
 print('Imported',len(records),'records;',len(used),'legacy records matched;',len(records)-238,'legacy-only records retained')
