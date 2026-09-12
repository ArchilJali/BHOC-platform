from pathlib import Path
import json
p=Path('seo/page-metadata.json')
data=json.loads(p.read_text(encoding='utf-8'))
key='science/aabb-rbc-transfusion-thresholds-oxygen-delivery.html'
data[key]={
  'title':'AABB 2025: RBC Transfusion Thresholds & Oxygen Delivery | BHOC',
  'description':'AABB 2025 evidence on RBC transfusion thresholds, acute myocardial infarction, blood-product availability and oxygen-delivery relevance to BHOC and HBOC.',
  'keywords':'AABB 2025, RBC transfusion threshold, red blood cell transfusion, hemoglobin threshold, acute myocardial infarction transfusion, oxygen delivery, patient blood management, blood availability, BHOC, HBOC, Biological Hemoglobin Oxygen Carrier, Hemoglobin-Based Oxygen Carrier, Precision Oxygen Therapeutics, Precision Oxygenation Therapeutics',
  'url':'https://archiljali.github.io/BHOC-platform/science/aabb-rbc-transfusion-thresholds-oxygen-delivery.html',
  'type':'article',
  'breadcrumbs':[
    ['Home','/'],
    ['Science','/science/'],
    ['AABB RBC transfusion thresholds','/science/aabb-rbc-transfusion-thresholds-oxygen-delivery.html']
  ]
}
p.write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
