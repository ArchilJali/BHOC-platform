(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.BHOCPublications=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const OTHER='__other__';
  const normalize=value=>String(value??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const institutions=p=>Array.isArray(p.institutions)?p.institutions.filter(x=>typeof x==='string'&&x.trim()):[];
  const species=p=>Array.isArray(p.species_tags)?p.species_tags:[];
  const studySites=p=>Array.isArray(p.study_sites)?[...new Set(p.study_sites.filter(s=>s&&typeof s.institution==='string'&&safeURL(s.source_url)&&s.locator).map(s=>s.institution))]:[];
  function siteOptions(data){const counts=new Map();for(const p of data)for(const name of studySites(p))counts.set(name,(counts.get(name)||0)+1);return [...counts].map(([value,count])=>({value,label:value,count})).sort((a,b)=>a.label.localeCompare(b.label,'en'));}
  function authorOptions(data){const names=new Map();for(const p of data)for(const part of String(p.source_authors||p.authors||'').split(/[,;]/)){const name=part.trim().replace(/\.$/,'');const key=normalize(name);if(name&&!/^et\s+al\.?$/i.test(name)&&!names.has(key))names.set(key,name);}return [...names.values()].sort((a,b)=>a.localeCompare(b,'en'));}
  const journalAliases=new Map(Object.entries({
    'anesth analg':'Anesthesia & Analgesia',
    'american journal of transplantation':'American Journal of Transplantation',
    'the american journal of transplantation':'American Journal of Transplantation',
    'artif cells blood substit immobil biotechnol':'Artificial Cells, Blood Substitutes, and Biotechnology',
    'can j anaesth':'Canadian Journal of Anesthesia',
    'ann emerg med':'Annals of Emergency Medicine',
    'clin pharmacol ther':'Clinical Pharmacology & Therapeutics',
    'clin tech small anim pract':'Clinical Techniques in Small Animal Practice',
    'clin transl sci':'Clinical and Translational Science',
    'curr drug discov technol':'Current Drug Discovery Technologies',
    'j am anim hosp assoc':'Journal of the American Animal Hospital Association',
    'j am vet med assoc':'Journal of the American Veterinary Medical Association',
    'j appl physiol':'Journal of Applied Physiology',
    'j bone joint surg am':'Journal of Bone and Joint Surgery. American Volume',
    'j heart lung transplant':'Journal of Heart and Lung Transplantation',
    'j invest surg':'Journal of Investigative Surgery',
    'j investig med':'Journal of Investigative Medicine',
    'j lab clin med':'Journal of Laboratory and Clinical Medicine',
    'j surg res':'Journal of Surgical Research',
    'j thorac cardiovasc surg':'The Journal of Thoracic and Cardiovascular Surgery',
    'j vasc surg':'Journal of Vascular Surgery',
    'j vet emerg crit care':'Journal of Veterinary Emergency and Critical Care',
    'j vet intern med':'Journal of Veterinary Internal Medicine',
    'j zoo wildl med':'Journal of Zoo and Wildlife Medicine',
    'n engl j med':'New England Journal of Medicine',
    'pediatr crit care med':'Pediatric Critical Care Medicine',
    'reprod toxicol':'Reproductive Toxicology',
    'sajaa':'Southern African Journal of Anaesthesia and Analgesia',
    'the journal of thoracic and cardiovascular surgery':'The Journal of Thoracic and Cardiovascular Surgery',
    'the journal of trauma':'Journal of Trauma',
    'journal of trauma':'Journal of Trauma',
    'the veterinary record':'Veterinary Record',
    'vet anaesth analg':'Veterinary Anaesthesia and Analgesia',
    'vet surg':'Veterinary Surgery'
  }));
  const nonJournalLabels=new Set(['equine','hb-200','hemopure','nonclinical','advances in transfusion safety','haemostasis in spine surgery']);
  function journalName(p){const raw=String(p&&p.journal||'').trim();const key=normalize(raw);if(!key||nonJournalLabels.has(key))return '';return journalAliases.get(key)||raw;}
  function journalOptions(data){const counts=new Map();let other=0;for(const p of data){const name=journalName(p);if(name)counts.set(name,(counts.get(name)||0)+1);else other++;}const values=[...counts].map(([value,count])=>({value,label:value,count})).sort((a,b)=>a.label.localeCompare(b.label,'en'));if(other)values.push({value:OTHER,label:'Other / source not classified',count:other});return values;}
  const corePattern=/(oxyglobin|hboc(?:[- ]?\d+)?|hemopure|polyheme|hemassist|diaspirin|dclhb|mp4ox|sanguinate|hemarina|hemoglobin[- ]based oxygen|haemoglobin[- ]based oxygen|hemoglobin glutamer|polymerized(?: bovine)? hemoglobin|bovine polymerized hemoglobin|polymerised(?: bovine)? haemoglobin|bovine polymerised haemoglobin|stroma[- ]free (?:hemo|haemo)globin|cell[- ]free (?:hemo|haemo)globin|(?:hemo|haemo)globin substitute|blood substitute|oxygen[- ]carr(?:ier|ying)|bovine hemoglobin solution|purified hemoglobin|hemoglobin concentrate)/;
  function isCorePublication(p){return corePattern.test(normalize([p.title,p.source_title,p.keywords].join(' ')));}
  const speciesGroups=[
    {value:'Canine',label:'Canine (Dog)',icon:'🐕',tags:['Canine']},
    {value:'Feline',label:'Feline (Cat)',icon:'🐈',tags:['Feline']},
    {value:'Equine',label:'Equine (Horse)',icon:'🐴',tags:['Equine']},
    {value:'Porcine',label:'Porcine (Pig)',icon:'🐖',tags:['Porcine']},
    {value:'Ovine',label:'Ovine (Sheep)',icon:'🐑',tags:['Ovine']},
    {value:'Rodent',label:'Rodent',icon:'🐀',tags:['Rodent']},
    {value:'Avian',label:'Avian (Birds)',icon:'🦅',tags:['Avian']},
    {value:'__exotic__',label:'Exotic / other animals',icon:'🦦',tags:['Ferret','Rabbit','Other animal']},
    {value:'Human',label:'Human',icon:'👤',tags:['Human']},
    {value:'__other_models__',label:'Other / In vitro',icon:'🧪',tags:['In vitro'],includeUnspecified:true}
  ];
  function matchesSpecies(p,value){if(!value)return true;const labels=species(p);if(value===OTHER)return !labels.length;const group=speciesGroups.find(g=>g.value===value);return group?group.tags.some(t=>labels.includes(t))||Boolean(group.includeUnspecified&&!labels.length):labels.includes(value);}
  function overview(data){return {total:data.length,groups:speciesGroups.map(g=>({...g,count:data.filter(p=>matchesSpecies(p,g.value)).length})),journalLabels:journalOptions(data).filter(o=>o.value!==OTHER).length,institutions:institutionOptions(data).length-2,linked:data.filter(p=>p.metadata_status==='matched').length,pubmed:data.filter(p=>p.pubmed_url).length,dois:data.filter(p=>p.doi).length,unspecified:data.filter(p=>!species(p).length).length,siteRecords:data.filter(p=>studySites(p).length).length,sites:siteOptions(data).length};}
  function institutionOptions(data){const counts=new Map();for(const p of data)for(const name of new Set(institutions(p)))counts.set(name,(counts.get(name)||0)+1);return [{value:'',label:'All institutions',count:data.length},...Array.from(counts,([value,count])=>({value,label:value,count})).sort((a,b)=>a.label.localeCompare(b.label,'en')),{value:OTHER,label:'Other / institution not identified',count:data.filter(p=>!institutions(p).length).length}];}
  function filter(data,f={}){const terms=normalize(f.q).split(/\s+/).filter(Boolean);return data.filter(p=>{const hay=normalize([p.title,p.source_title,p.authors,p.source_authors,p.journal,p.keywords,...institutions(p),...species(p),...studySites(p)].join(' '));return terms.every(t=>hay.includes(t))&&(!f.author||normalize([p.authors,p.source_authors].join(" ")).includes(normalize(f.author)))&&(!f.year||String(p.year)===String(f.year))&&(!f.journal||(f.journal===OTHER?!journalName(p):journalName(p)===f.journal))&&(!f.scope||(f.scope==='core'?isCorePublication(p):!isCorePublication(p)))&&matchesSpecies(p,f.species)&&(!f.site||(f.site===OTHER?!studySites(p).length:studySites(p).includes(f.site)))&&(!f.institution||(f.institution===OTHER?!institutions(p).length:institutions(p).includes(f.institution)));});}
  function sort(data,order='newest'){return [...data].sort((a,b)=>order==='title'?String(a.title).localeCompare(String(b.title)):order==='oldest'?Number(a.year)-Number(b.year):Number(b.year)-Number(a.year));}
  function paginate(data,page=1,size=12){size=[12,24,48].includes(Number(size))?Number(size):12;const totalPages=Math.max(1,Math.ceil(data.length/size));page=Math.min(totalPages,Math.max(1,Math.floor(Number(page)||1)));return {items:data.slice((page-1)*size,page*size),page,totalPages,total:data.length,start:data.length?(page-1)*size+1:0,end:Math.min(page*size,data.length)};}
  function safeURL(value){try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}}
  function validate(data){if(!Array.isArray(data)||!data.length||data.some(p=>!p||typeof p.title!=='string'||!p.title.trim()))throw new Error('Invalid publication data');return data;}
  return {OTHER,normalize,institutions,species,studySites,siteOptions,authorOptions,journalName,journalOptions,isCorePublication,speciesGroups,matchesSpecies,overview,institutionOptions,filter,sort,paginate,safeURL,validate};
});
