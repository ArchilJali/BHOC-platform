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
      ['/veterinary/', '/veterinary/Vet-index.html'],
      ['/transplant/', '/transplant/Transplant-index.html'],
      ['/human/', '/human/BHOC-Human-index.html'],
      ['/clinical/', '/clinical/'],
      ['/social-media/linkedin/', '/social-media/linkedin/'],
      ['/science/', '/science/'],
      ['/historical-sources/', '/historical-sources/']
    ];
    const activeRule = sectionRules.find(([segment]) => path.includes(segment));
    if (activeRule) {
      nav.querySelectorAll('a[aria-current]').forEach(link => link.removeAttribute('aria-current'));
      const current = nav.querySelector(`a[href="${activeRule[1]}"]`);
      if (current) current.setAttribute('aria-current', 'page');
    }
  }

  const addEcosystemNavigation = () => {
    const network = document.querySelector('.nav-network');
    if (!network || network.dataset.ecosystemEnhanced === 'true') return;
    network.dataset.ecosystemEnhanced = 'true';

    const websiteLabel = document.createElement('span');
    websiteLabel.className = 'nav-network-label';
    websiteLabel.textContent = 'Websites';
    network.prepend(websiteLabel);

    const separator = document.createElement('span');
    separator.className = 'nav-network-separator';
    separator.setAttribute('aria-hidden', 'true');

    const knowledgeLabel = document.createElement('span');
    knowledgeLabel.className = 'nav-network-label';
    knowledgeLabel.textContent = 'Knowledge bases';

    const veterinary = document.createElement('a');
    veterinary.className = 'nav-network-link nav-network-knowledge';
    veterinary.href = 'https://evidence.bhocvet.com/';
    veterinary.textContent = 'Veterinary Direction';
    veterinary.title = 'Knowledge Base · BHOC VET-platform';
    veterinary.setAttribute('aria-label', 'Veterinary Direction knowledge base, public BHOC VET-platform');

    const realWorld = document.createElement('a');
    realWorld.className = 'nav-network-link nav-network-knowledge';
    realWorld.href = 'https://evidence.bhoctherapeutics.com/real-world-evidence/';
    realWorld.textContent = 'Real-World Evidence';
    realWorld.title = 'Knowledge Base · Oxygen Delivery Evidence';
    realWorld.setAttribute('aria-label', 'Real-World Evidence knowledge base, public Oxygen Delivery Evidence page');

    network.append(separator, knowledgeLabel, veterinary, realWorld);
  };

  const normalizePrimaryExplorerCTA = () => {
    const hubPaths = [
      '/veterinary/Vet-index.html',
      '/human/BHOC-Human-index.html',
      '/transplant/Transplant-index.html'
    ];
    if (!hubPaths.includes(path)) return;
    const primary = document.querySelector('.overview-actions .button:not(.secondary)');
    if (primary && /search\.html/i.test(primary.getAttribute('href') || '')) {
      primary.textContent = 'Publication Explorer →';
    }
  };

  const addExplorerContext = () => {
    const routes = [
      {
        match: '/veterinary/Vet-search.html',
        href: 'Vet-index.html',
        label: '← Veterinary Evidence Hub',
        extraHref: 'Vet-fda-ema.html',
        extraLabel: 'Regulatory Evidence'
      },
      {
        match: '/human/BHOC-Human-search.html',
        href: 'BHOC-Human-index.html',
        label: '← Human Use Evidence Hub'
      },
      {
        match: '/transplant/Transplant-search.html',
        href: 'Transplant-index.html',
        label: '← Transplantation Evidence Hub'
      }
    ];
    const route = routes.find(item => path.endsWith(item.match));
    if (!route) return;
    const main = document.querySelector('main');
    const intro = main?.querySelector('.page-intro');
    if (!main || !intro || main.querySelector('.context-return')) return;

    if (!document.querySelector('#context-return-style')) {
      const style = document.createElement('style');
      style.id = 'context-return-style';
      style.textContent = '.context-return{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:16px 0 10px;font-size:11px;font-weight:700}.context-return a{text-decoration:none}.context-return span{color:var(--muted)}';
      document.head.appendChild(style);
    }

    const context = document.createElement('nav');
    context.className = 'context-return';
    context.setAttribute('aria-label', 'Evidence section navigation');
    const back = document.createElement('a');
    back.href = route.href;
    back.textContent = route.label;
    context.appendChild(back);
    if (route.extraHref) {
      const separator = document.createElement('span');
      separator.setAttribute('aria-hidden', 'true');
      separator.textContent = '·';
      const extra = document.createElement('a');
      extra.href = route.extraHref;
      extra.textContent = route.extraLabel;
      context.append(separator, extra);
    }
    main.insertBefore(context, intro);
  };

  const enhanceApplicationCards = () => {
    if (!(path.endsWith('/clinical/') || path.endsWith('/clinical/index.html'))) return;
    const routes = [
      ['.vertical-card.sickle', '/human/BHOC-Human-search.html?direction=Hematology%2C%20Sickle%20Cell%20%26%20Severe%20Anemia', 'Open sickle cell and severe anemia evidence'],
      ['.vertical-card.oncology', '/human/BHOC-Human-search.html?direction=Oncology%20%26%20Tumor%20Oxygenation', 'Open oncology and tumor oxygenation evidence'],
      ['.vertical-card.transplant', '/transplant/Transplant-index.html', 'Open transplantation evidence hub']
    ];

    routes.forEach(([selector, href, label]) => {
      const card = document.querySelector(selector);
      if (!card || card.tagName === 'A') return;
      card.setAttribute('role', 'link');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', label);
      card.style.cursor = 'pointer';
      const open = () => { window.location.href = href; };
      card.addEventListener('click', event => {
        if (!event.target.closest('a, button, input, select, textarea')) open();
      });
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      });
    });

    const dfu = document.querySelector('.vertical-card.dfu');
    if (dfu && dfu.tagName !== 'A') {
      dfu.style.cursor = 'default';
      dfu.setAttribute('title', 'Evidence mapping in development');
    }
  };

  const removePublicGitHubLinks = () => {
    document.querySelectorAll('a').forEach(link => {
      const label = link.textContent.trim();
      const href = link.getAttribute('href') || '';
      if (!/^https:\/\/github\.com\/ArchilJali\//i.test(href)) return;
      if (!/^(GitHub|Main Repository)$/i.test(label)) return;

      const previous = link.previousSibling;
      const next = link.nextSibling;
      if (previous && previous.nodeType === Node.TEXT_NODE && /·\s*$/.test(previous.textContent || '')) {
        previous.textContent = (previous.textContent || '').replace(/\s*·\s*$/, '');
      } else if (next && next.nodeType === Node.TEXT_NODE && /^\s*·/.test(next.textContent || '')) {
        next.textContent = (next.textContent || '').replace(/^\s*·\s*/, '');
      }
      link.remove();
    });
  };

  const restoreVetFdaEfficacyHighlight = () => {
    if (!path.endsWith('/veterinary/Vet-index.html')) return;
    const intro = document.querySelector('.page-intro.overview-intro');
    if (!intro || document.querySelector('.vet-fda-efficacy-highlight')) return;

    if (!document.querySelector('#vet-fda-efficacy-highlight-style')) {
      const style = document.createElement('style');
      style.id = 'vet-fda-efficacy-highlight-style';
      style.textContent = '.vet-fda-efficacy-highlight{margin:20px 0 26px}.vet-fda-efficacy-highlight .vet-fda-hero-number{display:block;font-size:clamp(52px,7vw,84px);line-height:.95;font-weight:850;letter-spacing:-.045em;color:#fff}.vet-fda-efficacy-highlight .vet-fda-vs{display:block;margin:5px 0 12px;font-size:20px;font-weight:750;color:#ffd0b2}.vet-fda-efficacy-highlight .vet-fda-source{display:inline-block;margin-top:7px;font-weight:750}.vet-fda-efficacy-highlight .clinical-limit{margin-top:12px}';
      document.head.appendChild(style);
    }

    const section = document.createElement('section');
    section.className = 'clinical-highlight vet-fda-efficacy-highlight';
    section.setAttribute('aria-labelledby', 'vet-fda-efficacy-heading');
    section.innerHTML = '<div><div class="eyebrow">Original FDA canine field trial</div><h2 id="vet-fda-efficacy-heading">Field-Trial Treatment Success</h2><p><strong class="vet-fda-hero-number">95%</strong><span class="vet-fda-vs">vs 32% control</span></p><p>Efficacy population: Oxyglobin 20/21 · Control 9/28 · p≤0.001.</p><a class="vet-fda-source" href="https://animaldrugsatfda.fda.gov/adafda/app/search/public/document/downloadFoi/3700" target="_blank" rel="noopener noreferrer">FDA Freedom of Information Summary, pp. 4-9 ↗</a></div><div><dl class="clinical-stats"><div><dt>Efficacy population</dt><dd>95% <span>/ 32%</span></dd></div><div><dt>Intent-to-treat</dt><dd>73% <span>/ 29%</span></dd></div><div><dt>Endpoint window</dt><dd>24 <span>hours</span></dd></div></dl><p class="clinical-limit">FDA-defined treatment success meant no additional oxygen-carrying support was required for 24 hours. This is an efficacy endpoint, not a survival endpoint.</p><p><a href="Vet-FDA-registry.html">Open full FDA evidence detail →</a></p></div>';
    intro.insertAdjacentElement('afterend', section);
  };

  addEcosystemNavigation();
  removePublicGitHubLinks();
  normalizePrimaryExplorerCTA();
  addExplorerContext();
  enhanceApplicationCards();
  restoreVetFdaEfficacyHighlight();

  if (!path.includes('/veterinary/')) return;

  const localHref = href => {
    if (path.includes('/veterinary/vet-stage/')) return `../${href}`;
    return href;
  };

  document.querySelectorAll('.vet-route-strip-top a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes('publication-catalogue.html') || href.includes('Vet-03-publication-BHOC-Oxyglobin.html')) {
      link.remove();
      return;
    }
    if (href.includes('Vet-search.html')) link.textContent = 'Publication Explorer';
  });

  document.querySelectorAll('.overview-stat[href*="publication-catalogue.html"], .vet-pub-metrics a[href*="publication-catalogue.html"]').forEach(link => {
    link.setAttribute('href', localHref('Vet-search.html'));
  });

  document.querySelectorAll('a[href*="Vet-search.html"]').forEach(link => {
    const label = link.textContent.trim();
    if (/^Publication Search$/i.test(label)) link.textContent = 'Publication Explorer';
    if (/^Search publications\s*→?$/i.test(label)) link.textContent = 'Publication Explorer →';
    if (/^Open publication search\s*→?$/i.test(label)) link.textContent = 'Open Publication Explorer →';
    if (/^Open the publication explorer\s*→?$/i.test(label)) link.textContent = 'Open Publication Explorer →';
  });

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

  if (path.endsWith('/veterinary/publication-catalogue.html')) {
    const heading = document.querySelector('main h1');
    if (heading && /publication catalogue/i.test(heading.textContent)) heading.textContent = 'Full citation index.';
    document.querySelectorAll('a[href*="Vet-search.html"]').forEach(link => {
      if (/publication explorer/i.test(link.textContent)) link.textContent = 'Open Publication Explorer →';
    });
  }

  document.querySelectorAll('.notice a[href*="publication-catalogue.html"], footer a[href*="publication-catalogue.html"], p a[href*="publication-catalogue.html"]').forEach(link => {
    const label = link.textContent.trim();
    if (/full citation catalogue/i.test(label) || /accessible publication catalogue/i.test(label)) {
      link.textContent = 'Full citation index (HTML)';
    }
  });
})();