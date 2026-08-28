/* Local static data only. No third-party JavaScript, tracking, or invented fallback records. */
(() => {
  'use strict';
  const C=window.BHOCPublications, $=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let data=[],options=[],page=1,loaded=false;
  const fields={q:'keywordInput',author:'authorInput',year:'yearSelect',journal:'journalInput',species:'speciesInput',site:'studySiteSelect'};
  let selectedInstitution='';
  const readFilters=()=>({...Object.fromEntries(Object.entries(fields).map(([key,id])=>[key,$(id).value])),institution:selectedInstitution});
  const link=(url,label)=>{const safe=C.safeURL(url);return safe?`<a href="${esc(safe)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`:'';};
  function card(p){
    const types=p.publication_types||[];
    const type=['Meta-Analysis','Review','Randomized Controlled Trial','Clinical Trial','Case Reports','Letter'].find(t=>types.includes(t));
    const source=p.pubmed_url||p.doi_url||p.source_url;
    const institutionText=C.institutions(p).join(' · ')||'Other / institution not identified';
    const sourceLinks=[link(p.pubmed_url,'PubMed'),link(p.doi_url,'DOI'),p.source_url?link(p.source_url,'Journal'):null].filter(Boolean).join('');
    const lookup=sourceLinks||link('https://pubmed.ncbi.nlm.nih.gov/?term='+encodeURIComponent(p.title),'Find citation');
    const citationStatus=p.metadata_status==='matched'
      ? `Citation verified against ${link(p.metadata_url,p.metadata_source||'Source record')}. Metadata checked ${esc(p.metadata_checked)}.`
      : `The original citation has not yet been retrieved. “Find citation” opens a search, not a verified original article. ${p.secondary_source_url?link(p.secondary_source_url,'Secondary citation only'):''}`;
    const siteDetails=(p.study_sites||[]).filter(site=>C.studySites(p).includes(site.institution)).map(site=>`<p><strong>Confirmed study location:</strong> ${esc(site.institution)} · ${esc(site.location)}. ${esc(site.evidence_note)} ${link(site.source_url,'Study-location evidence')} (${esc(site.locator)}).</p>`).join('');
    return `<article class="record"><div class="record-top"><span class="tag year">${esc(p.year)}</span>${C.species(p).map(s=>`<span class="tag">${esc(s)}</span>`).join('')}${type?`<span class="tag">${esc(type)}</span>`:''}${C.studySites(p).length?'<span class="tag year">Study location sourced</span>':''}</div><h3>${C.safeURL(source)?`<a href="${esc(C.safeURL(source))}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a>`:esc(p.title)}</h3><p class="authors">${esc(p.source_authors||p.authors)}</p><p class="journal">${esc(p.journal)}</p><div class="record-bottom"><div class="institution-label"><strong>Author affiliation:</strong> ${esc(institutionText)}${C.studySites(p).length?`<br><strong>Study location:</strong> ${esc(C.studySites(p).join(' · '))}`:''}</div><div class="source-links">${lookup}</div></div><details><summary>Source, affiliation &amp; study-location details</summary><p>${citationStatus}</p>${p.source_review_note?`<p>${esc(p.source_review_note)}</p>`:''}${p.source_title&&p.source_title!==p.title?`<p><strong>Source title:</strong> ${esc(p.source_title)}</p>`:''}${p.supplied_year?`<p>Indexed publication year: ${esc(p.year)}. The supplied bibliography used ${esc(p.supplied_year)}; online and print dates may differ.</p>`:''}${(p.affiliations||[]).map(a=>`<p>${esc(a)}</p>`).join('')}${p.affiliation_source_url?`<p>${link(p.affiliation_source_url,'Affiliation evidence')} · ${esc(p.affiliation_source_type)} · ${esc(p.affiliation_source_locator)}.</p>`:''}${!(p.affiliations||[]).length?'<p>No institutional affiliation has been established from the available article-level sources.</p>':''}${siteDetails||'<p>Study location: not independently established in this index. An author affiliation is not treated as a study location.</p>'}<p>Species labels: ${esc(p.species_basis)}. ${esc(p.species_correction_note||'')} Institutions are author affiliations, not endorsements or a complete list of study sites.</p></details></article>`;
  }
  function renderInstitutions(){
    const query=C.normalize($('institutionSearch').value);
    const visible=options.filter(o=>!o.value||o.value===C.OTHER||o.value===selectedInstitution||C.normalize(o.label).includes(query));
    $('institutionList').innerHTML=visible.map(o=>`<button type="button" class="institution-option${o.value===C.OTHER?' other':''}" data-institution="${esc(o.value)}" aria-pressed="${o.value===selectedInstitution}"><span>${esc(o.label)}</span><span class="count">${o.count}</span></button>`).join('');
    $('institutionCount').textContent=String(Math.max(0,options.length-2));
  }
  function updateURL(){const params=new URLSearchParams();for(const [key,value]of Object.entries(readFilters()))if(value)params.set(key,value);if($('sortSelect').value!=='newest')params.set('sort',$('sortSelect').value);if(page>1)params.set('page',page);const query=params.toString();history.replaceState(null,'',location.pathname+(query?'?'+query:'')+location.hash);}
  function render(){
    if(!loaded)return;
    const filtered=C.sort(C.filter(data,readFilters()),$('sortSelect').value);
    const p=C.paginate(filtered,page,$('pageSize').value);page=p.page;
    $('results').innerHTML=p.items.length?p.items.map(card).join(''):'<div class="empty"><h3>No matching publications</h3><p>Try fewer filters, another spelling, or select All institutions.</p></div>';
    $('resultSummary').textContent=p.total?`${p.start}–${p.end} of ${p.total} publications`:'0 matching publications';
    $('pageLabel').textContent=`Page ${p.page} of ${p.totalPages}`;
    $('previousPage').disabled=page<=1;$('nextPage').disabled=page>=p.totalPages;
    $('selectedLabel').textContent=selectedInstitution?(selectedInstitution===C.OTHER?'Other / institution not identified':selectedInstitution):'All institutions';
    $('stats').textContent=`${data.length} records · ${data.filter(p=>p.metadata_status==='matched').length} source-linked citations`;
    renderInstitutions();updateURL();
  }
  function clear(){Object.values(fields).forEach(id=>$(id).value='');selectedInstitution='';$('institutionSearch').value='';page=1;render();}
  async function load(){
    loaded=false;$('results').setAttribute('aria-busy','true');$('results').innerHTML='<div class="empty" role="status">Loading the publication index…</div>';
    try{
      const response=await fetch('Vet-publications.json');if(!response.ok)throw new Error('Data unavailable');data=C.validate(await response.json());
      options=C.institutionOptions(data);
      $('studySiteSelect').innerHTML='<option value="">All records (no location filter)</option>'+C.siteOptions(data).map(site=>`<option value="${esc(site.value)}">${esc(site.label)} (${site.count})</option>`).join('')+`<option value="${C.OTHER}">Location not established</option>`;
      $('studySiteCoverage').textContent=`Study-location review is partial: ${data.filter(p=>C.studySites(p).length).length} of ${data.length} records have an explicit source. Missing locations are not inferred from author affiliations.`;
      $('authorOptions').innerHTML=C.authorOptions(data).map(name=>`<option value="${esc(name)}"></option>`).join('');
      const years=[...new Set(data.map(p=>String(p.year)))].sort((a,b)=>Number(b)-Number(a));
      $('yearSelect').innerHTML='<option value="">All years</option>'+years.map(y=>`<option value="${esc(y)}">${esc(y)}</option>`).join('');
      const species=[...new Set(data.flatMap(C.species))].sort();
      const groups=C.speciesGroups.filter(g=>g.value.startsWith('__'));
      $('speciesInput').innerHTML='<option value="">All species / models</option>'+species.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join('')+`<option value="${C.OTHER}">Not specified</option>`+'<optgroup label="Overview groups">'+groups.map(g=>`<option value="${esc(g.value)}">${esc(g.label)}</option>`).join('')+'</optgroup>';
      const params=new URLSearchParams(location.search);for(const [key,id]of Object.entries(fields))$(id).value=params.get(key)||'';
      selectedInstitution=options.some(o=>o.value===params.get('institution'))?params.get('institution'):'';
      if(['newest','oldest','title'].includes(params.get('sort')))$('sortSelect').value=params.get('sort');page=Number(params.get('page'))||1;
      loaded=true;$('results').setAttribute('aria-busy','false');render();
    }catch(error){data=[];$('results').setAttribute('aria-busy','false');$('stats').textContent='Publication index unavailable';$('resultSummary').textContent='Data could not be loaded';$('results').innerHTML='<div class="empty" role="alert"><h3>The publication index could not be loaded</h3><p>No replacement or demonstration records are shown.</p><button type="button" class="button secondary" id="retryLoad">Try again</button></div>';$('retryLoad').addEventListener('click',load);$('previousPage').disabled=true;$('nextPage').disabled=true;}
  }
  $('searchForm').addEventListener('submit',event=>{event.preventDefault();page=1;render();});
  ['yearSelect','speciesInput','studySiteSelect','sortSelect','pageSize'].forEach(id=>$(id).addEventListener('change',()=>{page=1;render();}));
  $('clearBtn').addEventListener('click',clear);$('showAllBtn').addEventListener('click',clear);
  $('institutionSearch').addEventListener('input',renderInstitutions);
  $('institutionList').addEventListener('click',event=>{const button=event.target.closest('button[data-institution]');if(button){selectedInstitution=button.dataset.institution;page=1;render();}});
  $('previousPage').addEventListener('click',()=>{page--;render();$('resultSummary').focus();});$('nextPage').addEventListener('click',()=>{page++;render();$('resultSummary').focus();});
  load();
})();
