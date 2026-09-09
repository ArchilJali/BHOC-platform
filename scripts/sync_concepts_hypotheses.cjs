const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const AUTHOR = 'Archil Jaliashvili';
const AUTHOR_URL = 'https://www.linkedin.com/in/archil-jaliashvili-98804927b/';
const OLD_BASE = '/BHOC-platform/open-discussion/';
const NEW_BASE = '/BHOC-platform/concepts-hypotheses/';

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) out.push(full);
  }
  return out;
}

function humanDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return iso || '';
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${Number(m[3])} ${months[Number(m[2]) - 1]} ${m[1]}`;
}

function normalizeGlobal(src) {
  return src
    .replaceAll(OLD_BASE, NEW_BASE)
    .replaceAll('https://archiljali.github.io/BHOC-platform/open-discussion/', 'https://archiljali.github.io/BHOC-platform/concepts-hypotheses/')
    .replaceAll('Open Discussion', 'Concepts & Hypotheses');
}

function normalizeConceptCopy(src) {
  return src
    .replaceAll('open research discussion', 'research concept and hypothesis')
    .replaceAll('Open research discussion', 'Research concept and hypothesis')
    .replaceAll('working scientific discussion space', 'structured research-concept space')
    .replaceAll('Scientific discussion', 'Research concepts')
    .replaceAll('Pre-Review', 'Pre-Publication')
    .replaceAll('Pre-review', 'Pre-publication')
    .replaceAll('pre-review', 'pre-publication')
    .replaceAll('open development stage', 'development stage')
    .replaceAll('an research concept', 'a research concept');
}

function ensureConceptArticle(src) {
  let next = normalizeConceptCopy(src);

  next = next
    .replace(/<span class="tag">(?:Concepts &amp; Hypotheses · )?Research hypothesis<\/span>/i, '<span class="tag">Research Concept · Hypothesis</span>')
    .replace(/<span class="tag">(?:Concepts & Hypotheses · )?Research hypothesis<\/span>/i, '<span class="tag">Research Concept · Hypothesis</span>')
    .replace(/"articleSection":"[^"]*"/, '"articleSection":"Concepts & Hypotheses"');

  if (next.includes('"@type":"Article"') && !next.includes('copyrightHolder')) {
    next = next.replace(
      /"publisher":\{"@type":"Organization","name":"BHOC Therapeutics Platform"\},/,
      `"publisher":{"@type":"Organization","name":"BHOC Therapeutics Platform"},"copyrightHolder":{"@type":"Person","name":"${AUTHOR}","url":"${AUTHOR_URL}"},"copyrightYear":"2026","copyrightNotice":"© 2026 ${AUTHOR}",`
    );
  } else if (next.includes('copyrightHolder') && !next.includes('copyrightNotice')) {
    next = next.replace(/"copyrightYear":"2026",/, `"copyrightYear":"2026","copyrightNotice":"© 2026 ${AUTHOR}",`);
  }

  if (!next.includes('concept-authorship')) {
    const dateMatch = next.match(/"datePublished":"(\d{4}-\d{2}-\d{2})"/);
    const iso = dateMatch ? dateMatch[1] : '';
    const shown = humanDate(iso);
    const byline = `\n  <p class="concept-authorship"><em>Research Concept · Hypothesis · Author: <a href="${AUTHOR_URL}" rel="author">${AUTHOR}</a>${iso ? ` · Published: <time datetime="${iso}">${shown}</time>` : ''} · © ${AUTHOR}</em></p>\n`;
    next = next.replace(/<footer class="site-footer">/i, `${byline}<footer class="site-footer">`);
  }

  if (next.includes('concept-authorship') && !next.includes('.concept-authorship{')) {
    next = next.replace(/<\/head>/i, `  <style>.concept-authorship{max-width:1280px;margin:4px auto 0;padding:0 32px 18px;color:var(--muted);font-size:10.5px;line-height:1.5;text-align:right}.concept-authorship em{opacity:.88}.concept-authorship a{color:inherit;text-decoration:none}.concept-authorship a:hover{text-decoration:underline}@media(max-width:680px){.concept-authorship{padding:0 18px 16px;text-align:left}}</style>\n</head>`);
  }

  return next;
}

let changed = 0;
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const src = fs.readFileSync(file, 'utf8');
  let next = normalizeGlobal(src);

  if (rel.startsWith('concepts-hypotheses/')) {
    next = normalizeConceptCopy(next);
    if (rel !== 'concepts-hypotheses/index.html') next = ensureConceptArticle(next);
  }

  if (next !== src) {
    fs.writeFileSync(file, next);
    changed++;
    console.log(`updated ${rel}`);
  }
}

console.log(`Concepts & Hypotheses metadata sync complete: ${changed} HTML files updated.`);
