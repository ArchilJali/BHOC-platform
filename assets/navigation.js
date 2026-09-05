(() => {
  const path = window.location.pathname;
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#bhoc-nav');

  if (toggle && nav) {
    const close = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    nav.addEventListener('click', event => {
      if (event.target.closest('a')) close();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) close();
    });

    const sectionRules = [
      ['/veterinary/', '/BHOC-platform/veterinary/Vet-index.html'],
      ['/transplant/', '/BHOC-platform/transplant/Transplant-index.html'],
      ['/human/', '/BHOC-platform/human/BHOC-Human-index.html'],
      ['/clinical/', '/BHOC-platform/clinical/'],
      ['/social-media/linkedin/', '/BHOC-platform/social-media/linkedin/'],
      ['/science/', '/BHOC-platform/science/'],
      ['/historical-sources/', '/BHOC-platform/historical-sources/']
    ];
    const activeRule = sectionRules.find(([segment]) => path.includes(segment));
    if (activeRule) {
      nav.querySelectorAll('a[aria-current]').forEach(link => link.removeAttribute('aria-current'));
      const current = nav.querySelector(`a[href="${activeRule[1]}"]`);
      if (current) current.setAttribute('aria-current', 'page');
    }
  }

  const normalizePrimaryExplorerCTA = () => {
    const hubPaths = [
      '/BHOC-platform/veterinary/Vet-index.html',
      '/BHOC-platform/human/BHOC-Human-index.html',
      '/BHOC-platform/transplant/Transplant-index.html'
    ];
    if (!hubPaths.includes(path)) return;
    const primary = document.querySelector('.overview-actions .button:not(.secondary)');
    if (primary && /search\.html/i.test(primary.getAttribute('href') || '')) {
      primary.textContent = 'Publication Explorer →';
    }
  };

  normalizePrimaryExplorerCTA();

  if (!path.includes('/veterinary/')) return;

  const localHref = href => {
    if (path.includes('/veterinary/vet-stage/')) return `../${href}`;
    return href;
  };

  // Keep the main VET route strip task-oriented. Technical/SEO pages remain crawlable,
  // but they no longer compete with the three primary user destinations.
  document.querySelectorAll('.vet-route-strip-top a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes('publication-catalogue.html') || href.includes('Vet-03-publication-BHOC-Oxyglobin.html')) {
      link.remove();
      return;
    }
    if (href.includes('Vet-search.html')) link.textContent = 'Publication Explorer';
  });

  // Database totals should open the interactive evidence set, not an intermediate static list.
  document.querySelectorAll('.overview-stat[href*="publication-catalogue.html"], .vet-pub-metrics a[href*="publication-catalogue.html"]').forEach(link => {
    link.setAttribute('href', localHref('Vet-search.html'));
  });

  // Normalize visible search labels across the VET evidence experience.
  document.querySelectorAll('a[href*="Vet-search.html"]').forEach(link => {
    const label = link.textContent.trim();
    if (/^Publication Search$/i.test(label)) link.textContent = 'Publication Explorer';
    if (/^Search publications\s*→?$/i.test(label)) link.textContent = 'Publication Explorer →';
    if (/^Open publication search\s*→?$/i.test(label)) link.textContent = 'Open Publication Explorer →';
    if (/^Open the publication explorer\s*→?$/i.test(label)) link.textContent = 'Open Publication Explorer →';
  });

  // From evidence, application and regulatory detail pages, literature links go straight
  // to Explorer. The static citation index remains available only where its technical role
  // is useful: the Explorer fallback, the citation-index page itself and the dedicated
  // organic-search publication landing page.
  const catalogueRolePages = [
    '/veterinary/Vet-search.html',
    '/veterinary/publication-catalogue.html',
    '/veterinary/Vet-03-publication-BHOC-Oxyglobin.html'
  ];
  const keepCatalogueRoute = catalogueRolePages.some(page => path.endsWith(page));
  if (!keepCatalogueRoute) {
    document.querySelectorAll('a[href*="publication-catalogue.html"]').forEach(link => {
      if (link.closest('footer, .notice')) return;
      link.setAttribute('href', localHref('Vet-search.html'));
      const label = link.textContent.trim();
      if (/catalogue/i.test(label)) {
        link.textContent = label
          .replace(/Oxyglobin\s*&\s*Veterinary\s*HBOC\s*Catalogue/i, 'Publication Explorer')
          .replace(/Oxyglobin\s*&\s*Veterinary\s*HBOC\s*publication\s*catalogue/i, 'Publication Explorer')
          .replace(/Publication\s*Catalogue/i, 'Publication Explorer')
          .replace(/Catalogue/i, 'Explorer');
      }
    });
  }

  // The full static page has a clear technical role: crawlable and accessible citation index.
  if (path.endsWith('/veterinary/publication-catalogue.html')) {
    const heading = document.querySelector('main h1');
    if (heading && /publication catalogue/i.test(heading.textContent)) heading.textContent = 'Full citation index.';
    document.querySelectorAll('a[href*="Vet-search.html"]').forEach(link => {
      if (/publication explorer/i.test(link.textContent)) link.textContent = 'Open Publication Explorer →';
    });
  }

  // Keep technical fallback links explicit instead of presenting them as a second search route.
  document.querySelectorAll('.notice a[href*="publication-catalogue.html"], footer a[href*="publication-catalogue.html"], p a[href*="publication-catalogue.html"]').forEach(link => {
    const label = link.textContent.trim();
    if (/full citation catalogue/i.test(label) || /accessible publication catalogue/i.test(label)) {
      link.textContent = 'Full citation index (HTML)';
    }
  });
})();
