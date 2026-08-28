(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.BHOCPublications=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const OTHER='__other__';
  const normalize=value=>String(value??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const institutions=p=>Array.isArray(p.institutions)?p.institutions.filter(x=>typeof x==='string'&&x.trim()):[];
  const species=p=>Array.isArray(p.species_tags)?p.species_tags:[];
  function institutionOptions(data){const counts=new Map();for(const p of data)for(const name of new Set(institutions(p)))counts.set(name,(counts.get(name)||0)+1);return [{value:'',label:'All institutions',count:data.length},...Array.from(counts,([value,count])=>({value,label:value,count})).sort((a,b)=>a.label.localeCompare(b.label,'en')),{value:OTHER,label:'Other / institution not identified',count:data.filter(p=>!institutions(p).length).length}];}
  function filter(data,f={}){const terms=normalize(f.q).split(/\s+/).filter(Boolean);return data.filter(p=>{const hay=normalize([p.title,p.authors,p.source_authors,p.journal,p.keywords,...institutions(p),...species(p)].join(' '));return terms.every(t=>hay.includes(t))&&(!f.author||normalize([p.authors,p.source_authors].join(" ")).includes(normalize(f.author)))&&(!f.year||String(p.year)===String(f.year))&&(!f.journal||normalize(p.journal).includes(normalize(f.journal)))&&(!f.species||(f.species===OTHER?!species(p).length:species(p).includes(f.species)))&&(!f.institution||(f.institution===OTHER?!institutions(p).length:institutions(p).includes(f.institution)));});}
  function sort(data,order='newest'){return [...data].sort((a,b)=>order==='title'?String(a.title).localeCompare(String(b.title)):order==='oldest'?Number(a.year)-Number(b.year):Number(b.year)-Number(a.year));}
  function paginate(data,page=1,size=12){size=[12,24,48].includes(Number(size))?Number(size):12;const totalPages=Math.max(1,Math.ceil(data.length/size));page=Math.min(totalPages,Math.max(1,Math.floor(Number(page)||1)));return {items:data.slice((page-1)*size,page*size),page,totalPages,total:data.length,start:data.length?(page-1)*size+1:0,end:Math.min(page*size,data.length)};}
  function safeURL(value){try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}}
  function validate(data){if(!Array.isArray(data)||!data.length||data.some(p=>!p||typeof p.title!=='string'||!p.title.trim()))throw new Error('Invalid publication data');return data;}
  return {OTHER,normalize,institutions,species,institutionOptions,filter,sort,paginate,safeURL,validate};
});
