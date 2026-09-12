from pathlib import Path
p=Path('veterinary/business/BHOC-Veterinary-Concept.htm')
s=p.read_text(encoding='utf-8')
s=s.replace('https://archiljali.github.io/BHOC-platform/','https://evidence.bhoctherapeutics.com/')
s=s.replace('https://archiljali.github.io/BHOC-platform','https://evidence.bhoctherapeutics.com')
p.write_text(s,encoding='utf-8')
