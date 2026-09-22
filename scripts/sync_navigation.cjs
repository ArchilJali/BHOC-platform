const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'config/navigation.json'), 'utf8'));
const version = JSON.parse(fs.readFileSync(path.join(ROOT, 'version.json'), 'utf8'));
const SKIP_DIRS = new Set(['.git', 'node_modules']);
const SHELL_HREF = '/BHOC-platform/assets/platform-shell.css';
const INTELLIGENCE_HREF = '/BHOC-platform/assets/intelligence-2026.css';
const NAV_SCRIPT = '/BHOC-platform/assets/navigation.js?v=20260922-inline5';
const AUTHOR_PROFILE = 'https://bhoctherapeutics.com/archil-jaliashvili/';
const LINKEDIN_PROFILE = 'https://www.linkedin.com/in/archil-jaliashvili-bhoc/';
const BRAND_MARK = 'https://bhoctherapeutics.com/assets/bhoc-biodiversity-mark.png?v=202609055';

// Keep BHOC as one continuous wordmark. The O is a semantic child only for colour,
// never a separate spaced span. This avoids legacy `.brand span` rules inserting gaps.
const wordmark = className => `<strong class="${className}">BH<b class="brand-o">O</b>C</strong>`;
const veterinaryWordmark = () => '<strong class="vet-wordmark">BH<b class="vet-o">O</b>C</strong> Veterinary';

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.well-known') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) out.push(...walk(full));
    } else if (entry.isFile() && /\.html?$/i.test(entry.name)) {
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
  if (p.startsWith('concepts-hypotheses/')) return 'discussion';
  if (p.startsWith('open-discussion/')) return 'discussion';
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
  const network = config.network?.length
    ? `<div class="nav-network" role="group" aria-label="BHOC websites">${config.network.map(item => item.enabled
      ? `<a class="nav-network-link" href="${item.href}">${item.theme === 'vet' ? veterinaryWordmark() : item.label}</a>`
      : `<span class="nav-network-link nav-network-pending" aria-disabled="true" title="Coming soon">${item.label}<small>coming soon</small></span>`
    ).join('')}</div>`
    : '';
  return `<header class="site-header"><nav class="site-nav" aria-label="Main navigation"><a class="brand" href="${config.brand.href}"${brandCurrent}>${wordmark('brand-word')}<span class="brand-sub">${config.brand.subLabel.replaceAll('&', '&amp;')}</span></a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="bhoc-nav"><span>Menu</span><b aria-hidden="true">☰</b></button><div class="nav-links" id="bhoc-nav">${links}${network}</div></nav></header>`;
}

function ensurePlatformAssets(src) {
  if (!/<\/head>/i.test(src)) return src;
  let next = src;
  if (!/href=["'][^"']*assets\/platform-shell\.css["']/i.test(next)) next = next.replace(/<\/head>/i, `  <link rel="stylesheet" href="${SHELL_HREF}">\n</head>`);
  if (!/href=["'][^"']*assets\/intelligence-2026\.css["']/i.test(next)) next = next.replace(/<\/head>/i, `  <link rel="stylesheet" href="${INTELLIGENCE_HREF}">\n</head>`);
  if (/src=["'][^"']*assets\/navigation\.js(?:\?[^"']*)?["']/i.test(next)) {
    next = next.replace(/<script\b(?=[^>]*\bsrc=["'][^"']*assets\/navigation\.js(?:\?[^"']*)?["'])[^>]*><\/script>/gi, `<script src="${NAV_SCRIPT}" defer></script>`);
  } else {
    next = next.replace(/<\/head>/i, `  <script src="${NAV_SCRIPT}" defer></script>\n</head>`);
  }
  if (!next.includes(`rel="author" href="${AUTHOR_PROFILE}"`)) next = next.replace(/<\/head>/i, `  <link rel="author" href="${AUTHOR_PROFILE}">\n</head>`);
  return next;
}


const FOOTER_SOCIALS = "<span class=\"bhoc-footer-socials\" role=\"group\" aria-label=\"BHOC social media\" style=\"display:inline-flex;align-items:center;gap:8px;margin-left:12px;vertical-align:middle;white-space:nowrap\"><a class=\"bhoc-footer-social-link\" data-network=\"linkedin\" href=\"https://www.linkedin.com/company/bhoc-therapeutics/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"BHOC Therapeutics on LinkedIn\" title=\"BHOC Therapeutics on LinkedIn\" style=\"display:inline-flex;align-items:center;justify-content:center;width:35px;height:35px;box-sizing:border-box;border:1.25px solid #6aa6df;border-radius:10px;text-decoration:none;background:rgba(255,255,255,.04)\"><svg viewBox=\"0 0 24 24\" width=\"21\" height=\"21\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"2.5\" y=\"2.5\" width=\"19\" height=\"19\" rx=\"4\" fill=\"#0a66c2\"/><path fill=\"#ffffff\" d=\"M7.25 9.2H4.8V17h2.45V9.2Zm-1.22-3.6a1.43 1.43 0 1 0 0 2.86 1.43 1.43 0 0 0 0-2.86ZM19 12.65c0-2.35-1.25-3.44-2.93-3.44-1.35 0-1.96.74-2.29 1.26V9.2h-2.44V17h2.44v-3.86c0-1.02.2-2 1.46-2 1.25 0 1.26 1.17 1.26 2.07V17H19v-4.35Z\"/></svg></a><a class=\"bhoc-footer-social-link\" data-network=\"youtube\" href=\"https://www.youtube.com/@BHOCTherapeutics\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"BHOC Therapeutics on YouTube\" title=\"BHOC Therapeutics on YouTube\" style=\"display:inline-flex;align-items:center;justify-content:center;width:35px;height:35px;box-sizing:border-box;border:1.25px solid #ff4d4d;border-radius:10px;text-decoration:none;background:rgba(255,255,255,.04)\"><svg viewBox=\"0 0 24 24\" width=\"21\" height=\"21\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"2.5\" y=\"5.5\" width=\"19\" height=\"13\" rx=\"4\" fill=\"#ff0000\"/><path d=\"m10 9 5.5 3-5.5 3Z\" fill=\"#ffffff\"/></svg></a></span>";

function ensureFooterSocials(src) {
  if (src.includes('class="bhoc-footer-socials"')) return src;
  const footerStart = src.indexOf('<footer class="site-footer">');
  if (footerStart < 0) return src;
  const footerEnd = src.indexOf('</footer>', footerStart);
  if (footerEnd < 0) return src;
  const versionPos = src.indexOf('class="platform-version"', footerStart);
  let insertAt = footerEnd;
  if (versionPos >= 0 && versionPos < footerEnd) {
    const pClose = src.indexOf('</p>', versionPos);
    if (pClose >= 0 && pClose < footerEnd) insertAt = pClose;
  }
  return src.slice(0, insertAt) + FOOTER_SOCIALS + src.slice(insertAt);
}

function normalizeBrandIdentity(src) {
  return src
    .replace(/<link\s+rel=["']icon["'][^>]*bhoc-mark\.svg[^>]*>/gi, `<link rel="icon" href="${BRAND_MARK}" type="image/png">`)
    .replaceAll('/BHOC-platform/assets/bhoc-mark.svg', BRAND_MARK);
}

function normalizeAuthorIdentity(src) {
  return src
    .replaceAll(`"url":"${LINKEDIN_PROFILE}"`, `"url":"${AUTHOR_PROFILE}"`)
    .replaceAll(`"url": "${LINKEDIN_PROFILE}"`, `"url": "${AUTHOR_PROFILE}"`)
    .replace(/<link\b(?=[^>]*\brel=["']author["'])[^>]*>/gi, `<link rel="author" href="${AUTHOR_PROFILE}">`)
    .replace(/<meta\b(?=[^>]*\bproperty=["']article:author["'])[^>]*>/gi, `<meta property="article:author" content="${AUTHOR_PROFILE}">`)
    .replace(/<a\b[^>]*>/gi, tag => /\brel=["']author["']/i.test(tag) ? tag.replace(LINKEDIN_PROFILE, AUTHOR_PROFILE) : tag)
    .replaceAll('"author":{"@type":"Person","name":"Archil Jaliashvili"}', `"author":{"@type":"Person","name":"Archil Jaliashvili","url":"${AUTHOR_PROFILE}"}`)
    .replaceAll('"author": {"@type": "Person", "name": "Archil Jaliashvili"}', `"author": {"@type": "Person", "name": "Archil Jaliashvili", "url": "${AUTHOR_PROFILE}"}`);
}

function normalizeVeterinaryBranding(src, section) {
  if (section !== 'veterinary') return src;
  return src
    .replaceAll('<span>BHOC · Biological Hemoglobin Oxygen Carrier', '<span>BH<b class="vet-o">O</b>C · Biological Hemoglobin Oxygen Carrier')
    .replaceAll('>BHOC Veterinary</a>', `>${veterinaryWordmark()}</a>`)
    .replaceAll('>BHOC Veterinary Site</a>', `>${veterinaryWordmark()} Site</a>`);
}

function normalizeHomeIdentity(src) {
  return src
    .replace('A structured scientific evidence platform connecting historical HBOC terminology with tissue-level oxygen delivery across veterinary medicine, transplantation and human-use research.', 'A scientific intelligence platform connecting source-linked evidence, historical HBOC terminology and tissue-level oxygen delivery across veterinary medicine, transplantation and human-use research.')
    .replace('"description":"A structured evidence platform for Precision Oxygenation Therapeutics across veterinary medicine, transplantation and human-use research."', '"description":"A scientific intelligence platform for Precision Oxygen Therapeutics, source-linked evidence and oxygen-delivery research across veterinary medicine, transplantation and human-use research."')
    .replaceAll('"name":"BHOC Evidence Platform"', '"name":"BHOC Therapeutics Platform"')
    .replaceAll('"name":"BHOC Evidence Platform | Precision Oxygen Therapeutics"', '"name":"BHOC Therapeutics Platform | Precision Oxygen Therapeutics"')
    .replace(/<span class="tag">Updated \d{2} [A-Z][a-z]{2} \d{4}<\/span>/, `<span class="tag">Updated ${version.updated}</span>`);
}

const headerRe = /<header class="site-header">[\s\S]*?<\/header>/i;
let changed = 0;
let skipped = 0;

for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const src = fs.readFileSync(file, 'utf8');
  const section = sectionFor(rel);
  let next = ensureFooterSocials(normalizeAuthorIdentity(normalizeVeterinaryBranding(normalizeBrandIdentity(src), section)));

  if (!headerRe.test(next)) {
    skipped++;
    if (next !== src) {
      fs.writeFileSync(file, next);
      changed++;
      console.log(`updated ${rel}`);
    }
    continue;
  }

  next = next.replace(headerRe, navHtml(section));
  next = ensurePlatformAssets(next);
  next = normalizeBrandIdentity(next);
  if (rel === 'index.html') next = normalizeHomeIdentity(next);

  if (next !== src) {
    fs.writeFileSync(file, next);
    changed++;
    console.log(`updated ${rel}`);
  }
}

console.log(`Navigation + scientific-intelligence shell sync complete: ${changed} updated, ${skipped} without site-header.`);
