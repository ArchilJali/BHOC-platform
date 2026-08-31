const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'config/navigation.json'), 'utf8'));
const SKIP_DIRS = new Set(['.git', 'node_modules']);

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
  return `<header class="site-header"><nav class="site-nav" aria-label="Main navigation"><a class="brand" href="${config.brand.href}"${brandCurrent}>${config.brand.label}<span>${config.brand.subLabel.replace('&', '&amp;')}</span></a><div class="nav-links">${links}</div></nav></header>`;
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
  const next = src.replace(headerRe, navHtml(sectionFor(rel)));
  if (next !== src) {
    fs.writeFileSync(file, next);
    changed++;
    console.log(`updated ${rel}`);
  }
}

console.log(`Navigation sync complete: ${changed} updated, ${skipped} without site-header.`);
