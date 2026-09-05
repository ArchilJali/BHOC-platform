'use strict';
const networkStyles=document.createElement('link');networkStyles.rel='stylesheet';networkStyles.href='network.css';document.head.append(networkStyles);
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

const make=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=String(text);if(cls)n.className=cls;return n;};
const uniq=a=>[...new Set((a||[]).filter(Boolean))];
const articleUrl=r=>r.doi_url||r.pubmed_url||r.link||r.metadata_url||'';
const isOxyglobinRecord=r=>/oxyglobin|hemoglobin glutamer-200|haemoglobin glutamer-200|hboc-200/i.test([r.title,r.source_title,r.keywords].filter(Boolean).join(' '));
const splitAuthors=s=>(s||'').split(',').map(x=>x.trim()).filter(x=>x&& !/^et al\.?$/i.test(x));

function articleLink(r){
  const url=articleUrl(r);if(!url)return null;
  const a=make('a',`${r.year||'Year?'} · ${r.title||r.source_title||'Publication'}`,'evidence-link');
  a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;
}
function addTags(parent,items){const box=make('div',undefined,'tags');uniq(items).slice(0,6).forEach(t=>box.append(make('span',t)));parent.append(box);}
function publicationList(parent,pubs){const box=make('div',undefined,'publication-links');pubs.slice(0,4).forEach(r=>{const a=articleLink(r);if(a)box.append(a);});if(pubs.length>4)box.append(make('small',`+ ${pubs.length-4} more linked publications`));parent.append(box);}

async function installOxyglobinNetwork(){
  const anchor=document.querySelector('.methodology');if(!anchor)return;
  const section=make('section',undefined,'section evidence-network');section.id='oxyglobin-network';
  const shell=make('div',undefined,'shell');section.append(shell);
  const head=make('div',undefined,'network-head');
  const headLeft=make('div');headLeft.append(make('p','EVIDENCE-LINKED CONTACT INTELLIGENCE','eyebrow dark'),make('h2','Oxyglobin authors & institutions'));
  const note=make('p','Built automatically from the Veterinary publication index. Article affiliations are historical evidence, not proof of current employment, study location or institutional endorsement.','network-note');
  head.append(headLeft,note);shell.append(head);
  const status=make('p','Loading Oxyglobin / hemoglobin glutamer-200 records…','network-status');shell.append(status);
  try{
    const res=await fetch('../veterinary/Vet-publications.json',{cache:'no-store'});if(!res.ok)throw Error(`HTTP ${res.status}`);
    const all=await res.json();const pubs=all.filter(isOxyglobinRecord);
    const people=new Map(),institutions=new Map();
    pubs.forEach(r=>{
      const authors=splitAuthors(r.source_authors||r.authors);
      authors.forEach(name=>{
        if(!people.has(name))people.set(name,{name,pubs:[],institutions:new Set(),species:new Set()});
        const p=people.get(name);p.pubs.push(r);(r.institutions||[]).forEach(i=>p.institutions.add(i));(r.species_tags||[]).forEach(s=>p.species.add(s));
      });
      (r.institutions||[]).forEach(name=>{
        if(!institutions.has(name))institutions.set(name,{name,pubs:[],authors:new Set(),species:new Set()});
        const inst=institutions.get(name);inst.pubs.push(r);authors.forEach(a=>inst.authors.add(a));(r.species_tags||[]).forEach(s=>inst.species.add(s));
      });
    });
    const personRows=[...people.values()].sort((a,b)=>b.pubs.length-a.pubs.length||a.name.localeCompare(b.name));
    const institutionRows=[...institutions.values()].sort((a,b)=>b.pubs.length-a.pubs.length||a.name.localeCompare(b.name));
    status.replaceChildren();
    const metrics=make('div',undefined,'network-metrics');
    [[pubs.length,'Oxyglobin / Hb glutamer-200 records'],[personRows.length,'unique authors'],[institutionRows.length,'author institutions']].forEach(([n,l])=>{const x=make('div');x.append(make('strong',n),make('span',l));metrics.append(x);});
    shell.append(metrics);
    const controls=make('div',undefined,'network-controls');
    const peopleBtn=make('button','People','network-mode active');const instBtn=make('button','Institutions / Organisations','network-mode');
    const input=make('input');input.type='search';input.placeholder='Search author, institution, species or publication…';input.className='network-search';
    controls.append(peopleBtn,instBtn,input);shell.append(controls);
    const peopleGrid=make('div',undefined,'cards network-grid');const instGrid=make('div',undefined,'cards network-grid');instGrid.hidden=true;
    function personCard(p){
      const card=make('article',undefined,'contact-card network-card');card.dataset.networkSearch=[p.name,...p.institutions,...p.species,...p.pubs.map(x=>x.title)].join(' ').toLowerCase();
      const top=make('div',undefined,'card-top');top.append(make('span','OXYGLOBIN / Hb glutamer-200 AUTHOR','type'),make('span',p.pubs.length,'score'));card.append(top);
      card.append(make('h3',p.name),make('p',p.institutions.size?[...p.institutions].join(' · '):'Institution not identified in indexed affiliation','role'));
      addTags(card,[...p.species,'Published Oxyglobin/HBOC research']);
      card.append(make('div',undefined,'card-rule'),make('p',`${p.pubs.length} evidence-linked publication${p.pubs.length===1?'':'s'}. Article affiliation is shown as historical bibliographic context.`,'evidence'));
      publicationList(card,p.pubs.sort((a,b)=>Number(b.year||0)-Number(a.year||0)));return card;
    }
    function institutionCard(i){
      const card=make('article',undefined,'contact-card network-card institution-card');card.dataset.networkSearch=[i.name,...i.authors,...i.species,...i.pubs.map(x=>x.title)].join(' ').toLowerCase();
      const top=make('div',undefined,'card-top');top.append(make('span','INSTITUTION / ORGANISATION','type'),make('span',i.pubs.length,'score'));card.append(top);
      card.append(make('h3',i.name),make('p',`${i.authors.size} linked author${i.authors.size===1?'':'s'} in Oxyglobin/Hb glutamer-200 bibliography`,'role'));
      addTags(card,[...i.species,'Oxyglobin/HBOC evidence']);
      const authors=[...i.authors].sort().slice(0,8).join(', ');card.append(make('div',undefined,'card-rule'),make('p',authors?`Linked authors: ${authors}${i.authors.size>8?'…':''}`:'Linked authors not resolved','evidence'));
      publicationList(card,i.pubs.sort((a,b)=>Number(b.year||0)-Number(a.year||0)));return card;
    }
    personRows.forEach(p=>peopleGrid.append(personCard(p)));institutionRows.forEach(i=>instGrid.append(institutionCard(i)));shell.append(peopleGrid,instGrid);
    const sourceLine=make('p',undefined,'network-source');sourceLine.append(document.createTextNode('Source: '));
    const sourceLink=make('a','Veterinary Publication Search');sourceLink.href='../veterinary/Vet-search.html';sourceLink.target='_blank';sourceLink.rel='noopener noreferrer';sourceLine.append(sourceLink,document.createTextNode(' · records are derived from the same structured bibliography used by that search page.'));shell.append(sourceLine);
    let mode='people';
    function filterNetwork(){const q=input.value.trim().toLowerCase(),grid=mode==='people'?peopleGrid:instGrid;[...grid.children].forEach(c=>c.hidden=!!q&&!c.dataset.networkSearch.includes(q));}
    peopleBtn.onclick=()=>{mode='people';peopleBtn.classList.add('active');instBtn.classList.remove('active');peopleGrid.hidden=false;instGrid.hidden=true;filterNetwork();};
    instBtn.onclick=()=>{mode='institutions';instBtn.classList.add('active');peopleBtn.classList.remove('active');instGrid.hidden=false;peopleGrid.hidden=true;filterNetwork();};input.addEventListener('input',filterNetwork);
  }catch(err){status.textContent='Could not load the veterinary publication index. The rest of Important Contact remains available.';status.classList.add('error');}
  anchor.before(section);
}
installOxyglobinNetwork();
