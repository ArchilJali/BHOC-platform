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
    veterinary.href = 'https://archiljali.github.io/BHOC-VET-platform/';
    veterinary.textContent = 'Veterinary Direction';
    veterinary.title = 'Knowledge Base · BHOC VET-platform';
    veterinary.setAttribute('aria-label', 'Veterinary Direction knowledge base, public BHOC VET-platform');

    const realWorld = document.createElement('a');
    realWorld.className = 'nav-network-link nav-network-knowledge';
    realWorld.href = 'https://archiljali.github.io/BHOC-platform/real-world-evidence/';
    realWorld.textContent = 'Real-World Evidence';
    realWorld.title = 'Knowledge Base · Oxygen Delivery Evidence';
    realWorld.setAttribute('aria-label', 'Real-World Evidence knowledge base, public Oxygen Delivery Evidence page');

    network.append(separator, knowledgeLabel, veterinary, realWorld);
  };

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

  const addHistoricalArticleBreadcrumbs = () => {
    const articlePaths = [
      '/BHOC-platform/historical-sources/biopure-standing-on-the-shoulders-of-giants/',
      '/BHOC-platform/historical-sources/biopure-standing-on-the-shoulders-of-giants/index.html'
    ];
    if (!articlePaths.includes(path)) return;

    const shell = document.querySelector('main.page-shell');
    if (!shell || shell.querySelector('.historical-breadcrumbs')) return;

    if (!document.querySelector('#historical-breadcrumbs-style')) {
      const style = document.createElement('style');
      style.id = 'historical-breadcrumbs-style';
      style.textContent = '.historical-breadcrumbs{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0;padding:13px clamp(1.6rem,6vw,5rem);border-bottom:1px solid #dce3ea;background:#fffefa;color:#6a7687;font-size:11px;font-weight:750;line-height:1.4}.historical-breadcrumbs a{color:#16385f;text-decoration:none}.historical-breadcrumbs a:hover{text-decoration:underline;text-underline-offset:.2em}.historical-breadcrumbs .breadcrumb-parent{font-weight:850}.historical-breadcrumbs .breadcrumb-current{color:#6a7687;font-weight:650}.historical-breadcrumbs .breadcrumb-separator{color:#a7b0ba;font-weight:500}@media(max-width:680px){.historical-breadcrumbs{padding:11px 16px;font-size:10.5px;gap:6px}}';
      document.head.appendChild(style);
    }

    const breadcrumbs = document.createElement('nav');
    breadcrumbs.className = 'historical-breadcrumbs';
    breadcrumbs.setAttribute('aria-label', 'Breadcrumb');
    breadcrumbs.innerHTML = '<a href="/BHOC-platform/index.html">BHOC Platform</a><span class="breadcrumb-separator" aria-hidden="true">›</span><a class="breadcrumb-parent" href="/BHOC-platform/historical-sources/">Historical Sources</a><span class="breadcrumb-separator" aria-hidden="true">›</span><span class="breadcrumb-current" aria-current="page">Standing on the Shoulders of Giants</span>';

    shell.prepend(breadcrumbs);
  };

  const enhanceApplicationCards = () => {
    if (!(path.endsWith('/clinical/') || path.endsWith('/clinical/index.html'))) return;
    const routes = [
      ['.vertical-card.sickle', '/BHOC-platform/human/BHOC-Human-search.html?direction=Hematology%2C%20Sickle%20Cell%20%26%20Severe%20Anemia', 'Open sickle cell and severe anemia evidence'],
      ['.vertical-card.oncology', '/BHOC-platform/human/BHOC-Human-search.html?direction=Oncology%20%26%20Tumor%20Oxygenation', 'Open oncology and tumor oxygenation evidence'],
      ['.vertical-card.transplant', '/BHOC-platform/transplant/Transplant-index.html', 'Open transplantation evidence hub']
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

  const enhanceRealWorldEvidenceActivity = () => {
    if (!path.includes('/real-world-evidence/')) return;

    if (!document.body.id) document.body.id = 'top';

    if (!document.querySelector('#rwe-activity-style')) {
      const style = document.createElement('style');
      style.id = 'rwe-activity-style';
      style.textContent = '.section-latest{display:inline-block;margin:0 0 10px;padding:3px 7px;border-radius:999px;background:#f1f4f6;color:#66737d;font-size:8px;font-weight:850;letter-spacing:.045em;text-transform:uppercase}.article-activity-meta{margin:28px 0 10px;padding:14px 16px;border:1px solid var(--line);border-radius:10px;background:#f7f9fa;color:var(--muted);font-size:10.5px;line-height:1.6}.article-activity-meta strong{color:var(--ink)}';
      document.head.appendChild(style);
    }

    const formatDate = iso => {
      const [year, month, day] = iso.split('-').map(Number);
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return `${String(day).padStart(2, '0')} ${months[month - 1]} ${year}`;
    };

    const indexPage = path.endsWith('/real-world-evidence/') || path.endsWith('/real-world-evidence/index.html');
    if (indexPage) {
      const directoryCards = [...document.querySelectorAll('.dir-card')];
      const overviewCards = [...document.querySelectorAll('.rwe-card')];
      let newest = null;

      directoryCards.forEach((card, index) => {
        const datedItems = [...card.querySelectorAll('li time[datetime]')]
          .map(time => ({time, iso: time.getAttribute('datetime') || '', item: time.closest('li')}))
          .filter(entry => /^\d{4}-\d{2}-\d{2}$/.test(entry.iso))
          .sort((a, b) => b.iso.localeCompare(a.iso));
        if (!datedItems.length) return;

        const latest = datedItems[0];
        const heading = card.querySelector('h3');
        let sectionDate = card.querySelector('.section-latest');
        if (!sectionDate) {
          sectionDate = document.createElement('time');
          sectionDate.className = 'section-latest';
          heading?.insertAdjacentElement('afterend', sectionDate);
        }
        sectionDate.setAttribute('datetime', latest.iso);
        sectionDate.textContent = `Latest ${formatDate(latest.iso)}`;

        const overview = overviewCards[index];
        if (overview) {
          let overviewDate = overview.querySelector('.update-date');
          if (!overviewDate) {
            overviewDate = document.createElement('time');
            overviewDate.className = 'update-date';
            overview.appendChild(document.createElement('br'));
            overview.appendChild(overviewDate);
          }
          overviewDate.classList.remove('added');
          overviewDate.setAttribute('datetime', latest.iso);
          overviewDate.textContent = `Latest ${formatDate(latest.iso)}`;
        }

        if (!newest || latest.iso > newest.iso) newest = latest;
      });

      if (newest) {
        const latestBox = document.querySelector('.latest-update');
        const latestLink = newest.item?.querySelector('a');
        if (latestBox) {
          const label = latestBox.querySelector('strong');
          const time = latestBox.querySelector('time');
          const link = latestBox.querySelector('a');
          if (label) label.textContent = 'Latest activity';
          if (time) {
            time.setAttribute('datetime', newest.iso);
            time.textContent = formatDate(newest.iso);
          }
          if (link && latestLink) {
            link.href = latestLink.getAttribute('href') || '#directory';
            link.textContent = latestLink.textContent.replace(/\s*→\s*$/, '').trim() + ' →';
          }
        }
      }
    }

    if (path.includes('/real-world-evidence/blood-groups-history/')) {
      const article = document.querySelector('main article');
      if (article && !article.querySelector('.article-activity-meta')) {
        const meta = document.createElement('div');
        meta.className = 'article-activity-meta';
        meta.innerHTML = '<strong>BHOC Knowledge Base record</strong><br>Added: <time datetime="2026-09-12">12 Sep 2026</time> · Last updated: <time datetime="2026-09-12">12 Sep 2026</time><br>Dates refer to this BHOC reference page, not to the publication dates of the cited scientific sources.';
        article.appendChild(meta);
      }
    }

  };

  const addGlobalPageContext = () => {
    const main = document.querySelector('main');
    if (!main || main.dataset.contextNavigationEnhanced === 'true') return;
    main.dataset.contextNavigationEnhanced = 'true';

    if (!document.getElementById('top')) {
      const topAnchor = document.createElement('span');
      topAnchor.id = 'top';
      topAnchor.setAttribute('aria-hidden', 'true');
      topAnchor.style.position = 'absolute';
      topAnchor.style.top = '0';
      document.body.prepend(topAnchor);
    }

    const sectionDefs = [
      ['/veterinary/', 'Veterinary Evidence', '/BHOC-platform/veterinary/Vet-index.html'],
      ['/transplant/', 'Transplantation', '/BHOC-platform/transplant/Transplant-index.html'],
      ['/human/', 'Human Use', '/BHOC-platform/human/BHOC-Human-index.html'],
      ['/clinical/', 'Applications', '/BHOC-platform/clinical/'],
      ['/concepts-hypotheses/', 'Concepts & Hypotheses', '/BHOC-platform/concepts-hypotheses/'],
      ['/social-media/linkedin/', 'LinkedIn Publications', '/BHOC-platform/social-media/linkedin/'],
      ['/science/', 'Science', '/BHOC-platform/science/'],
      ['/historical-sources/', 'History', '/BHOC-platform/historical-sources/'],
      ['/real-world-evidence/', 'Real-World Evidence', '/BHOC-platform/real-world-evidence/']
    ];
    const sectionMatch = sectionDefs.find(([segment]) => path.includes(segment));
    const section = sectionMatch ? {label: sectionMatch[1], href: sectionMatch[2]} : null;
    const pageTitle = (main.querySelector('h1')?.textContent || document.title.split('|')[0] || 'Current page').replace(/\s+/g, ' ').trim().replace(/[.]+$/, '');
    const shortTitle = pageTitle.length > 84 ? `${pageTitle.slice(0, 81).trim()}…` : pageTitle;
    const canonicalCurrent = `${window.location.origin}${window.location.pathname}${window.location.search}`;

    if (!document.querySelector('#global-page-context-style')) {
      const style = document.createElement('style');
      style.id = 'global-page-context-style';
      style.textContent = '.global-page-context{display:grid;gap:9px;margin:0 0 18px;padding:10px 13px;border:1px solid var(--line,#dce3e7);border-radius:10px;background:rgba(255,255,255,.96);color:var(--ink,#17334d);box-shadow:0 4px 18px rgba(23,51,77,.04);font-size:11px;line-height:1.45}.global-context-trail,.global-context-actions,.global-page-end{display:flex;align-items:center;gap:7px;flex-wrap:wrap}.global-context-trail a,.global-context-actions a,.global-page-end a,.global-context-actions button,.global-page-end button{color:var(--link,#0b5f78);font:inherit;font-weight:760;text-decoration:none;background:none;border:0;padding:0;cursor:pointer}.global-context-trail a:hover,.global-context-actions a:hover,.global-page-end a:hover,.global-context-actions button:hover,.global-page-end button:hover{text-decoration:underline;text-underline-offset:.2em}.global-context-current{color:var(--muted,#687884);font-weight:680}.global-context-sep{color:#a4afb7}.global-context-actions{padding-top:7px;border-top:1px solid var(--line,#dce3e7)}.global-context-actions .global-context-section{font-weight:830}.global-page-end{justify-content:space-between;margin:30px 0 8px;padding:13px 0 2px;border-top:1px solid var(--line,#dce3e7);font-size:11px}.global-page-end-group{display:flex;align-items:center;gap:12px;flex-wrap:wrap}@media(max-width:680px){.global-page-context{margin-bottom:14px;padding:9px 10px;font-size:10.5px}.global-context-actions{gap:10px}.global-page-end{align-items:flex-start}}';
      document.head.appendChild(style);
    }

    const toHref = item => {
      const raw = typeof item === 'string' ? item : item && (item['@id'] || item.url);
      if (!raw) return '';
      try {
        const url = new URL(raw, window.location.href);
        return url.origin === window.location.origin ? `${url.pathname}${url.search}${url.hash}` : url.href;
      } catch {
        return raw;
      }
    };

    let crumbs = [];
    const breadcrumbScript = document.querySelector('script[data-seo-breadcrumbs]');
    if (breadcrumbScript) {
      try {
        const data = JSON.parse(breadcrumbScript.textContent || '{}');
        const items = Array.isArray(data.itemListElement) ? data.itemListElement : [];
        crumbs = items.map(entry => ({label: String(entry.name || '').trim(), href: toHref(entry.item)})).filter(entry => entry.label);
      } catch (_error) {}
    }
    if (!crumbs.length) {
      crumbs.push({label: 'Home', href: '/BHOC-platform/'});
      if (section) crumbs.push({label: section.label, href: section.href});
      crumbs.push({label: shortTitle, href: ''});
    } else {
      const last = crumbs[crumbs.length - 1];
      const lastPath = last.href ? (() => { try { return new URL(last.href, window.location.href).pathname; } catch { return ''; } })() : '';
      if (lastPath !== window.location.pathname) crumbs.push({label: shortTitle, href: ''});
    }

    const trail = document.createElement('div');
    trail.className = 'global-context-trail';
    crumbs.forEach((crumb, index) => {
      if (index) {
        const sep = document.createElement('span');
        sep.className = 'global-context-sep';
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = '›';
        trail.appendChild(sep);
      }
      if (index < crumbs.length - 1 && crumb.href) {
        const link = document.createElement('a');
        link.href = crumb.href;
        link.textContent = crumb.label;
        trail.appendChild(link);
      } else {
        const current = document.createElement('span');
        current.className = 'global-context-current';
        current.setAttribute('aria-current', 'page');
        current.textContent = crumb.label;
        trail.appendChild(current);
      }
    });

    let storedReturn = null;
    try {
      storedReturn = JSON.parse(sessionStorage.getItem('bhocReturnContext') || 'null');
      if (storedReturn && (!storedReturn.url || storedReturn.url.split('#')[0] === canonicalCurrent.split('#')[0])) storedReturn = null;
    } catch (_error) {
      storedReturn = null;
    }

    const createBackControl = () => {
      const hasStored = storedReturn && storedReturn.url;
      const hasHistory = window.history.length > 1 || Boolean(document.referrer);
      if (!hasStored && !hasHistory && !section) return null;
      const button = document.createElement('button');
      button.type = 'button';
      const returnLabel = hasStored && storedReturn.label ? String(storedReturn.label).replace(/\s+/g, ' ').trim() : '';
      button.textContent = hasStored && returnLabel ? `← Return to ${returnLabel.length > 54 ? `${returnLabel.slice(0, 51)}…` : returnLabel}` : hasHistory ? '← Back to previous page' : `← ${section.label}`;
      button.addEventListener('click', () => {
        if (hasStored) {
          window.location.href = storedReturn.url;
          return;
        }
        if (hasHistory) {
          window.history.back();
          return;
        }
        if (section) window.location.href = section.href;
      });
      return button;
    };

    const actions = document.createElement('div');
    actions.className = 'global-context-actions';
    const back = createBackControl();
    if (back) actions.appendChild(back);
    if (section && window.location.pathname !== section.href) {
      const sectionLink = document.createElement('a');
      sectionLink.className = 'global-context-section';
      sectionLink.href = section.href;
      sectionLink.textContent = `${section.label} home`;
      actions.appendChild(sectionLink);
    }
    const home = document.createElement('a');
    home.href = '/BHOC-platform/';
    home.textContent = 'Platform home';
    actions.appendChild(home);

    const context = document.createElement('nav');
    context.className = 'global-page-context';
    context.setAttribute('aria-label', 'Page location and return navigation');
    context.append(trail, actions);

    document.querySelectorAll('.historical-breadcrumbs').forEach(item => item.remove());
    main.prepend(context);

    const end = document.createElement('nav');
    end.className = 'global-page-end';
    end.setAttribute('aria-label', 'End of page navigation');
    const endGroup = document.createElement('div');
    endGroup.className = 'global-page-end-group';
    const endBack = createBackControl();
    if (endBack) endGroup.appendChild(endBack);
    if (section && window.location.pathname !== section.href) {
      const endSection = document.createElement('a');
      endSection.href = section.href;
      endSection.textContent = `${section.label} home`;
      endGroup.appendChild(endSection);
    }
    const endHome = document.createElement('a');
    endHome.href = '/BHOC-platform/';
    endHome.textContent = 'Platform home';
    endGroup.appendChild(endHome);
    end.append(endGroup);
    main.appendChild(end);

    document.querySelectorAll('.rwe-page-tools').forEach(item => item.remove());


    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || link.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const href = link.getAttribute('href') || '';
      if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) return;
      try {
        const destination = new URL(link.href, window.location.href);
        const currentBase = `${window.location.origin}${window.location.pathname}${window.location.search}`;
        const destinationBase = `${destination.origin}${destination.pathname}${destination.search}`;
        if (destinationBase === currentBase) return;
        if (destination.origin === window.location.origin && destination.pathname.startsWith('/BHOC-platform/')) {
          sessionStorage.setItem('bhocReturnContext', JSON.stringify({url: window.location.href, label: pageTitle, time: Date.now()}));
        }
      } catch (_error) {}
    }, true);
  };

  addEcosystemNavigation();
  removePublicGitHubLinks();
  normalizePrimaryExplorerCTA();
  addExplorerContext();
  addHistoricalArticleBreadcrumbs();
  enhanceApplicationCards();
  restoreVetFdaEfficacyHighlight();
  enhanceRealWorldEvidenceActivity();
  addGlobalPageContext();

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