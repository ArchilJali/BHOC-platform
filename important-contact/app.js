'use strict';
const cards=[...document.querySelectorAll('.contact-card')];
const search=document.getElementById('search');
const country=document.getElementById('country');
const species=document.getElementById('species');
const priority=document.getElementById('priority');
const count=document.getElementById('resultCount');
const empty=document.getElementById('empty');
let category='all';
function apply(){
  const q=search.value.trim().toLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const cat=card.dataset.category||'';
    const okCategory=category==='all'||cat.includes(category);
    const okCountry=country.value==='all'||card.dataset.country===country.value;
    const okSpecies=species.value==='all'||(card.dataset.species||'').includes(species.value);
    const okPriority=Number(card.dataset.priority||0)>=Number(priority.value||0);
    const hay=(card.textContent+' '+(card.dataset.search||'')).toLowerCase();
    const okSearch=!q||hay.includes(q);
    const show=okCategory&&okCountry&&okSpecies&&okPriority&&okSearch;
    card.hidden=!show;if(show)visible++;
  });
  count.textContent=visible;empty.hidden=visible!==0;
}
[search,country,species,priority].forEach(x=>x.addEventListener('input',apply));
document.querySelectorAll('.direction').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.direction').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');category=btn.dataset.filter;apply();document.getElementById('workspace').scrollIntoView({behavior:'smooth'});
}));
document.getElementById('reset').addEventListener('click',()=>{search.value='';country.value='all';species.value='all';priority.value='0';category='all';document.querySelectorAll('.direction').forEach((x,i)=>x.classList.toggle('active',i===0));apply();});
document.querySelectorAll('[data-scroll]').forEach(btn=>btn.addEventListener('click',()=>document.getElementById(btn.dataset.scroll).scrollIntoView({behavior:'smooth'})));
const dialog=document.getElementById('recordDialog');
document.querySelectorAll('.view-btn').forEach(btn=>btn.addEventListener('click',()=>{document.getElementById('dialogTitle').textContent=btn.dataset.name;dialog.showModal();}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
