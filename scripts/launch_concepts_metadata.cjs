const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const file=path.join(root,'seo/page-metadata.json');
const data=JSON.parse(fs.readFileSync(file,'utf8'));

data['concepts-hypotheses/index.html']={
  ...data['concepts-hypotheses/index.html'],
  title:'Concepts & Hypotheses | BHOC Research & Pre-Publication',
  description:'BHOC Concepts & Hypotheses presents source-linked research concepts on prehospital oxygen delivery, functional oxygen-delivery potency and postpartum hemorrhage.',
  keywords:'BHOC Concepts and Hypotheses, research concept, scientific hypothesis, oxygen delivery, tissue oxygenation, prehospital EMS, blood transfusion, postpartum hemorrhage, L-TOF, BHOC, HBOC, Biological Hemoglobin Oxygen Carrier, Precision Oxygen Therapeutics, pre-publication',
  url:'https://archiljali.github.io/BHOC-platform/concepts-hypotheses/',
  type:'website'
};

data['concepts-hypotheses/oxygen-delivery-potency-vs-hemoglobin.html']={
  title:'Oxygen-Delivery Potency vs Hemoglobin | BHOC',
  description:'BHOC research concept asking whether oxygen-delivery potency should be measured as a functional property rather than inferred from hemoglobin concentration alone.',
  keywords:'oxygen delivery potency, hemoglobin concentration, L-TOF, blood transfusion, oxygen transport, tissue oxygenation, BHOC, HBOC, Biological Hemoglobin Oxygen Carrier, Precision Oxygen Therapeutics, research hypothesis',
  url:'https://archiljali.github.io/BHOC-platform/concepts-hypotheses/oxygen-delivery-potency-vs-hemoglobin.html',
  type:'article',
  breadcrumbs:[['Home','/'],['Concepts & Hypotheses','/concepts-hypotheses/'],['Oxygen-delivery potency','/concepts-hypotheses/oxygen-delivery-potency-vs-hemoglobin.html']]
};

data['concepts-hypotheses/pph-oxygen-delivery-window.html']={
  title:'PPH Oxygen-Delivery Treatment Window | BHOC',
  description:'BHOC research concept on defining a measurable oxygen-delivery risk window during postpartum hemorrhage while hemorrhage control and definitive transfusion care are being established.',
  keywords:'postpartum hemorrhage, postpartum haemorrhage, PPH, oxygen delivery, maternal hemorrhage, donor blood, blood transfusion, patient blood management, tissue oxygenation, BHOC, HBOC, Biological Hemoglobin Oxygen Carrier, research hypothesis',
  url:'https://archiljali.github.io/BHOC-platform/concepts-hypotheses/pph-oxygen-delivery-window.html',
  type:'article',
  breadcrumbs:[['Home','/'],['Concepts & Hypotheses','/concepts-hypotheses/'],['PPH oxygen-delivery window','/concepts-hypotheses/pph-oxygen-delivery-window.html']]
};

fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n');
console.log('Concepts launch metadata registered.');
