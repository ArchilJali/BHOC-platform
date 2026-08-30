(function () {
  'use strict';
  const C = window.BHOCPublications;
  const config = window.BHOCEvidenceSearchConfig;
  if (!C || !config) return;

  const PAGE_SIZE = 20;
  const $ = id => document.getElementById(id);
  const escapeHTML = value => String(value ?? '').replace(/[&<>"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[character]));
  const normalize = C.normalize;
  let publications = [];
  let selectedInstitution = '';
  let page = 1;

  function values(key) {
    return [...new Set(publications.map(publication => publication[key]).filter(Boolean))]
      .sort((left, right) => key === 'year' ? Number(right) - Number(left) : String(left).localeCompare(String(right), 'en'));
  }

  function addOptions(id, entries) {
    const select = $(id);
    for (const entry of entries) select.add(new Option(entry.label || entry, entry.value ?? entry));
  }

  function populateFilters() {
    addOptions('year', values('year'));
    addOptions(config.primaryElement, values(config.primaryKey));
    addOptions('evidence', values(config.evidenceKey));
    addOptions('product', values('product'));
    addOptions('journal', C.journalOptions(publications));
    for (const author of C.authorOptions(publications)) $('authorOptions').append(new Option(author, author));
    renderInstitutionList();
  }

  function institutionOptions() {
    return C.institutionOptions(publications).slice(1);
  }

  function renderInstitutionList() {
    const query = normalize($('institutionSearch').value);
    const options = institutionOptions().filter(option => !query || normalize(option.label).includes(query));
    $('institutionCount').textContent = `${institutionOptions().length - 1} indexed`;
    $('institutionList').innerHTML = options.map(option => `<button type="button" class="institution-option${option.value === C.OTHER ? ' other' : ''}" data-institution="${escapeHTML(option.value)}" aria-pressed="${selectedInstitution === option.value}"><span>${escapeHTML(option.label)}</span><span class="count">${option.count}</span></button>`).join('');
    $('institutionList').querySelectorAll('[data-institution]').forEach(button => button.addEventListener('click', () => {
      selectedInstitution = button.dataset.institution;
      page = 1;
      renderInstitutionList();
      render();
    }));
    $('selectedLabel').textContent = selectedInstitution ? institutionOptions().find(option => option.value === selectedInstitution)?.label || selectedInstitution : 'All author institutions';
  }

  function searchable(publication) {
    return normalize([
      publication.title,
      publication.citation,
      publication.direction,
      publication.organ,
      publication.evidenceGroup,
      publication.evidence,
      publication.product,
      publication.speciesDetail,
      publication.authors,
      publication.journal,
      ...(publication.institutions || [])
    ].join(' '));
  }

  function filtered() {
    const terms = normalize($('q').value).split(/\s+/).filter(Boolean);
    const author = normalize($('author').value);
    const journal = $('journal').value;
    const year = $('year').value;
    const primary = $(config.primaryElement).value;
    const evidence = $('evidence').value;
    const product = $('product').value;
    return publications.filter(publication => {
      const institutions = publication.institutions || [];
      return terms.every(term => searchable(publication).includes(term))
        && (!author || normalize(publication.authors || publication.citation).includes(author))
        && (!journal || (journal === C.OTHER ? !C.journalName(publication) : C.journalName(publication) === journal))
        && (!year || String(publication.year) === year)
        && (!primary || publication[config.primaryKey] === primary)
        && (!evidence || publication[config.evidenceKey] === evidence)
        && (!product || publication.product === product)
        && (!selectedInstitution || (selectedInstitution === C.OTHER ? !institutions.length : institutions.includes(selectedInstitution)));
    });
  }

  function sorted(items) {
    return C.sort(items, $('sort').value);
  }

  function sourceLinks(publication) {
    const candidates = [
      ['PubMed', publication.pubmedUrl || publication.pubmed_url],
      ['DOI', publication.doiUrl || publication.doi_url],
      ['Original source', publication.originalUrl || publication.hbo2Url]
    ];
    const used = new Set();
    return candidates.map(([label, raw]) => {
      const url = C.safeURL(raw);
      if (!url || used.has(url)) return '';
      used.add(url);
      return `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
    }).filter(Boolean).join('');
  }

  function record(publication) {
    const primary = publication[config.primaryKey];
    const evidence = publication[config.evidenceKey];
    const institutions = publication.institutions || [];
    const links = sourceLinks(publication);
    const preclinical = config.preclinicalPrefix && String(evidence).startsWith(config.preclinicalPrefix);
    return `<article class="record${preclinical ? ' preclinical' : ''}">
      <div class="record-top"><span class="tag year">${escapeHTML(publication.year || 'Year pending')}</span>${primary ? `<span class="tag">${escapeHTML(primary)}</span>` : ''}${evidence ? `<span class="tag">${escapeHTML(evidence)}</span>` : ''}</div>
      <h3>${escapeHTML(publication.title)}</h3>
      ${publication.authors ? `<p class="authors">${escapeHTML(publication.authors)}</p>` : ''}
      ${publication.journal ? `<p class="journal">${escapeHTML(C.journalName(publication) || publication.journal)}</p>` : ''}
      <p class="authors">${escapeHTML([publication.product, publication.evidence, publication.speciesDetail].filter(Boolean).join(' · '))}</p>
      ${preclinical && publication.note ? `<p class="evidence-note">${escapeHTML(publication.note)}</p>` : ''}
      <div class="record-bottom">${institutions.length ? `<span class="institution-label">Author affiliation${institutions.length > 1 ? 's' : ''}: ${escapeHTML(institutions.join(' · '))}</span>` : '<span class="institution-label">Author affiliation not yet indexed</span>'}${links ? `<span class="source-links">${links}</span>` : ''}</div>
      ${publication.citation ? `<details><summary>Full citation</summary><p>${escapeHTML(publication.citation)}</p></details>` : ''}
    </article>`;
  }

  function updateURL() {
    const params = new URLSearchParams();
    const values = {
      q: $('q').value.trim(),
      author: $('author').value.trim(),
      journal: $('journal').value,
      year: $('year').value,
      [config.primaryParam || config.primaryKey]: $(config.primaryElement).value,
      [config.evidenceParam || config.evidenceKey]: $('evidence').value,
      product: $('product').value,
      institution: selectedInstitution
    };
    for (const [key, value] of Object.entries(values)) if (value) params.set(key, value);
    history.replaceState(null, '', `${location.pathname}${params.size ? `?${params}` : ''}`);
  }

  function render() {
    const items = sorted(filtered());
    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    page = Math.min(page, totalPages);
    const start = items.length ? (page - 1) * PAGE_SIZE + 1 : 0;
    const end = Math.min(page * PAGE_SIZE, items.length);
    const shown = items.slice(start ? start - 1 : 0, end);
    $('stats').textContent = `${start}–${end} of ${items.length} publications`;
    $('page').textContent = `Page ${page} of ${totalPages}`;
    $('prev').disabled = page === 1;
    $('next').disabled = page === totalPages;
    $('results').innerHTML = shown.length ? shown.map(record).join('') : '<div class="empty">No publications match these filters.</div>';
    updateURL();
  }

  function restoreURL() {
    const params = new URLSearchParams(location.search);
    const mapping = {
      q: 'q',
      author: 'author',
      journal: 'journal',
      year: 'year',
      [config.primaryParam || config.primaryKey]: config.primaryElement,
      [config.evidenceParam || config.evidenceKey]: 'evidence',
      product: 'product'
    };
    for (const [parameter, id] of Object.entries(mapping)) {
      const value = params.get(parameter);
      if (value && $(id)) $(id).value = value;
    }
    selectedInstitution = params.get('institution') || '';
    renderInstitutionList();
  }

  function reset() {
    document.querySelectorAll('.search-panel input,.search-panel select').forEach(element => element.value = '');
    $('sort').value = 'newest';
    selectedInstitution = '';
    page = 1;
    renderInstitutionList();
    render();
  }

  fetch(config.dataUrl)
    .then(response => {
      if (!response.ok) throw new Error('Publication data unavailable');
      return response.json();
    })
    .then(data => {
      publications = C.validate(data);
      populateFilters();
      restoreURL();
      render();
    })
    .catch(error => {
      console.error(error);
      $('stats').textContent = 'Publication data could not be loaded.';
      $('results').innerHTML = '<div class="empty">Please try again later. No replacement records were loaded.</div>';
      $('prev').disabled = true;
      $('next').disabled = true;
    });

  $('institutionSearch').addEventListener('input', renderInstitutionList);
  $('clear').addEventListener('click', reset);
  $('prev').addEventListener('click', () => { page -= 1; render(); scrollTo(0, 0); });
  $('next').addEventListener('click', () => { page += 1; render(); scrollTo(0, 0); });
  document.querySelectorAll('.search-panel input:not(#institutionSearch),.search-panel select,#sort').forEach(element => {
    element.addEventListener(element.tagName === 'INPUT' ? 'input' : 'change', () => { page = 1; render(); });
  });
})();
