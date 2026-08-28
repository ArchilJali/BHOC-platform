'use strict';
(() => {
 const form=document.querySelector('#filters'); if(!form)return;
 const cards=[...document.querySelectorAll('.publication')];
 const fields=['q','institution','species','study','category','year','links'];
 const controls=Object.fromEntries(fields.map(k=>[k,document.getElementById(k)]));
 const sort=document.getElementById('sort'), size=document.getElementById('page-size');
 const stats=document.getElementById('stats'), prev=document.getElementById('previous'), next=document.getElementById('next');
 let page=1, filtered=[];
 const norm=s=>s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function syncURL(){const u=new URL(location.href);u.search='';for(const k of fields)if(controls[k].value)u.searchParams.set(k,controls[k].value);if(page>1)u.searchParams.set('page',page);history.replaceState(null,'',u);}
 function render(reset=false){
  if(reset)page=1;
  const terms=norm(controls.q.value.trim()).split(/\s+/).filter(Boolean);
  filtered=cards.filter(c=>{
   const d=c.dataset;
   return terms.every(t=>norm(d.search).includes(t)) &&
    (!controls.institution.value||(controls.institution.value==='missing'?JSON.parse(d.institutions).length===0:JSON.parse(d.institutions).includes(controls.institution.value))) &&
    (!controls.species.value||JSON.parse(d.species).includes(controls.species.value)) &&
    (!controls.study.value||d.study===controls.study.value) &&
    (!controls.category.value||d.category===controls.category.value) &&
    (!controls.year.value||d.year===controls.year.value) &&
    (!controls.links.value||(controls.links.value==='yes'?d.link==='yes':d.link==='no'));
  });
  filtered.sort((a,b)=>sort.value==='title'?a.dataset.title.localeCompare(b.dataset.title):sort.value==='oldest'?Number(a.dataset.year||9999)-Number(b.dataset.year||9999):Number(b.dataset.year||0)-Number(a.dataset.year||0));
  const per=Number(size.value), pages=Math.max(1,Math.ceil(filtered.length/per));page=Math.min(Math.max(1,page),pages);
  cards.forEach(c=>c.hidden=true);
  const shown=filtered.slice((page-1)*per,page*per);
  for(const c of shown){document.getElementById('results').append(c);c.hidden=false;}
  stats.textContent=filtered.length?`${filtered.length} records · showing ${(page-1)*per+1}–${Math.min(page*per,filtered.length)}`:'No matching records';
  document.getElementById('empty').hidden=filtered.length!==0;
  document.getElementById('page-status').textContent=`Page ${page} of ${pages}`;
  prev.disabled=page<=1;next.disabled=page>=pages;syncURL();
 }
 for(const k of fields){controls[k].value=new URL(location.href).searchParams.get(k)||'';controls[k].addEventListener(k==='q'?'input':'change',()=>render(true));}
 form.addEventListener('submit',e=>{e.preventDefault();render(true)});
 document.getElementById('clear').addEventListener('click',()=>{for(const k of fields)controls[k].value='';history.replaceState(null,'',location.pathname);render(true);controls.q.focus()});
 sort.addEventListener('change',()=>render(true));size.addEventListener('change',()=>render(true));
 for(const [button,delta] of [[prev,-1],[next,1]])button.addEventListener('click',()=>{page+=delta;render();stats.scrollIntoView({block:'start'});stats.focus()});
 page=Number(new URL(location.href).searchParams.get('page'))||1;
 if(location.hash){const c=cards.find(c=>'#'+c.id===location.hash);if(c)controls.q.value=c.dataset.id;}
 document.getElementById('interactive').hidden=false;
 document.getElementById('pagination').hidden=false;
 render();
})();
