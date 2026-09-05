const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'config/navigation.json'), 'utf8'));
const SKIP_DIRS = new Set(['.git', 'node_modules']);
const SHELL_HREF = '/BHOC-platform/assets/platform-shell.css';
const INTELLIGENCE_HREF = '/BHOC-platform/assets/intelligence-2026.css';
const NAV_SCRIPT = '/BHOC-platform/assets/navigation.js';
const AUTHOR_PROFILE = 'https://www.linkedin.com/in/archil-jaliashvili-98804927b/';

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.well-known') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) out.push(...walk(full));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

function sectionFor(rel) {
  const p = rel.replace(/\\/g, '/').toLowerCase();
  if (p.startsWith('veterinary/')) return 'veterinary';
  if (p.startsWith('transplant/')) return 'transplant';
  if (p.startsWith('human/')) return 'human';
  if (p.startsWith('clinical/')) return 'clinical';
  if (p.startsWith('social-media/linkedin/')) return 'linkedin';
  if (p.startsWith('science/')) return 'science';
  if (p.startsWith('historical-sources/')) return 'history';
  return 'home';
}

function navHtml(section) {
  const brandCurrent = section === 'home' ? ' aria-current="page"' : '';
  const links = config.links.map(link => {
    const current = link.section === section ? ' aria-current="page"' : '';
    return `<a href="${link.href}"${current}>${link.label}</a>`;
  }).join('');
  const corporate = config.corporate
    ? `<a href="${config.corporate.href}" target="_blank" rel="noopener" class="nav-corporate">${config.corporate.label}</a>`
    : '';
  return `<header class="site-header"><nav class="site-nav" aria-label="Main navigation"><a class="brand" href="${config.brand.href}"${brandCurrent}><img src="/BHOC-platform/assets/bhoc-mark.svg" alt="" width="30" height="30"><span class="brand-word">${config.brand.label}</span><span class="brand-sub">${config.brand.subLabel.replaceAll('&', '&amp;')}</span></a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="bhoc-nav"><span>Menu</span><b aria-hidden="true">☰</b></button><div class="nav-links" id="bhoc-nav">${links}${corporate}</div></nav></header>`;
}

function ensurePlatformAssets(src) {
  if (!/<\/head>/i.test(src)) return src;
  let next = src;
  if (!next.includes(SHELL_HREF)) next = next.replace(/<\/head>/i, `  <link rel="stylesheet" href="${SHELL_HREF}">\n</head>`);
  if (!next.includes(INTELLIGENCE_HREF)) next = next.replace(/<\/head>/i, `  <link rel="stylesheet" href="${INTELLIGENCE_HREF}">\n</head>`);
  if (!next.includes(NAV_SCRIPT)) next = next.replace(/<\/head>/i, `  <script src="${NAV_SCRIPT}" defer></script>\n</head>`);
  if (!next.includes(`rel="author" href="${AUTHOR_PROFILE}"`)) next = next.replace(/<\/head>/i, `  <link rel="author" href="${AUTHOR_PROFILE}">\n</head>`);
  return next;
}

function normalizeAuthorIdentity(src) {
  return src
    .replaceAll('"url":"https://www.linkedin.com/in/archil-jaliashvili-bhoc/"', `"url":"${AUTHOR_PROFILE}"`)
    .replaceAll('"url": "https://www.linkedin.com/in/archil-jaliashvili-bhoc/"', `"url": "${AUTHOR_PROFILE}"`)
    .replaceAll('href="https://www.linkedin.com/in/archil-jaliashvili-bhoc/"', `href="${AUTHOR_PROFILE}"`);
}

const headerRe = /<header class="site-header">[\s\S]*?<\/header>/i;
let changed = 0;
let skipped = 0;

for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  const src = fs.readFileSync(file, 'utf8');
  if (!headerRe.test(src)) {
    skipped++;
    continue;
  }

  let next = src.replace(headerRe, navHtml(sectionFor(rel)));
  next = ensurePlatformAssets(next);
  next = normalizeAuthorIdentity(next);

  if (next !== src) {
    fs.writeFileSync(file, next);
    changed++;
    console.log(`updated ${rel}`);
  }
}

console.log(`Navigation + scientific-intelligence shell sync complete: ${changed} updated, ${skipped} without site-header.`);
