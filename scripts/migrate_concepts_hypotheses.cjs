const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OLD_DIR = path.join(ROOT, 'open-discussion');
const NEW_DIR = path.join(ROOT, 'concepts-hypotheses');
const OLD_BASE = 'https://archiljali.github.io/BHOC-platform/open-discussion/';
const NEW_BASE = 'https://archiljali.github.io/BHOC-platform/concepts-hypotheses/';
const AUTHOR_URL = 'https://www.linkedin.com/in/archil-jaliashvili-98804927b/';
const AUTHOR = 'Archil Jaliashvili';

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function titleCaseDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return iso || '09 Sep 2026';
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${Number(m[3])} ${months[Number(m[2]) - 1]} ${m[1]}`.padStart(11, '0').replace(/^0/, '');
}

function baseTransform(src) {
  return src
    .replaceAll(OLD_BASE, NEW_BASE)
    .replaceAll('/BHOC-platform/open-discussion/', '/BHOC-platform/concepts-hypotheses/')
    .replaceAll('Open Discussion', 'Concepts & Hypotheses')
    .replaceAll('open scientific discussion', 'research concept')
    .replaceAll('Open scientific discussion', 'Research concept')
    .replaceAll('pre-review', 'pre-publication')
    .replaceAll('Pre-review', 'Pre-publication')
    .replaceAll('PRE-REVIEW', 'PRE-PUBLICATION');
}

function transformLanding(src) {
  let next = baseTransform(src);
  next = next
    .replace(/<title>[\s\S]*?<\/title>/i, '<title>Concepts &amp; Hypotheses | BHOC Research Concepts &amp; Pre-Publication</title>')
    .replace(/<meta name="description" content="[^"]*">/i, '<meta name="description" content="BHOC Concepts &amp; Hypotheses presents source-linked research concepts, scientific hypotheses, clinical questions and pre-publication thinking before formal journal publication.">')
    .replace(/<meta name="keywords" content="[^"]*">/i, '<meta name="keywords" content="BHOC Concepts and Hypotheses, research concept, scientific hypothesis, clinical hypothesis, oxygen delivery, tissue oxygenation, BHOC, HBOC, Biological Hemoglobin Oxygen Carrier, Precision Oxygen Therapeutics, EMS, trauma, PPH, pre-publication">')
    .replace('Ideas · hypotheses · pre-publication', 'Research concepts · hypotheses · pre-publication')
    .replace('Open to scientific challenge', 'Built for scientific challenge')
    .replace('The goal is not to publish certainty too early. The goal is to make the reasoning visible while there is still time to improve it.', 'The goal is to separate developing concepts from established evidence, make the reasoning visible and strengthen each hypothesis before formal publication.')
    .replace('Current discussions', 'Current concepts')
    .replace('Questions now open.', 'Concepts and hypotheses under development.')
    .replace('Open discussion →', 'Read concept →')
    .replace('Not limited to one application.', 'A platform for concepts across multiple applications.')
    .replace('Concepts & Hypotheses can hold future questions', 'Concepts & Hypotheses can hold future research concepts');
  return next;
}

function transformArticle(src) {
  let next = baseTransform(src);
  next = next
    .replace(/<title>[\s\S]*?<\/title>/i, '<title>Prehospital Oxygen-Delivery Patient Selection | Concepts &amp; Hypotheses</title>')
    .replace(/<meta name="description" content="[^"]*">/i, '<meta name="description" content="BHOC research concept and hypothesis on prehospital patient selection beyond blood pressure and arrest, including tissue ischemia, oxygen-delivery failure and EMS protocol development.">')
    .replace(/<meta name="keywords" content="[^"]*">/i, '<meta name="keywords" content="prehospital oxygen delivery, tissue ischemia, tissue oxygenation, EMS protocol, prehospital blood transfusion, hemorrhagic shock, trauma, oxygen deficit, organ oxygenation, BHOC, HBOC, Biological Hemoglobin Oxygen Carrier, Precision Oxygen Therapeutics, research concept, scientific hypothesis, pre-publication">')
    .replace('<span class="tag">Concepts &amp; Hypotheses · Research hypothesis</span>', '<span class="tag">Research Concept · Hypothesis</span>')
    .replace('<span class="tag">Concepts & Hypotheses · Research hypothesis</span>', '<span class="tag">Research Concept · Hypothesis</span>')
    .replace('Concepts & Hypotheses Home', 'Concepts & Hypotheses')
    .replace('The broader question for discussion is whether', 'The research hypothesis is whether')
    .replace('02 / The question for discussion', '02 / Core hypothesis')
    .replace('This is where the hypothesis needs challenge.', 'This is where the hypothesis needs clinical and scientific testing.');

  if (!next.includes('copyrightHolder')) {
    next = next.replace(
      '"publisher":{"@type":"Organization","name":"BHOC Therapeutics Platform"},',
      '"publisher":{"@type":"Organization","name":"BHOC Therapeutics Platform"},"copyrightHolder":{"@type":"Person","name":"Archil Jaliashvili","url":"https://www.linkedin.com/in/archil-jaliashvili-98804927b/"},"copyrightYear":"2026",'
    );
  }

  if (!next.includes('concept-authorship')) {
    const dateMatch = next.match(/"datePublished":"(\d{4}-\d{2}-\d{2})"/);
    const iso = dateMatch ? dateMatch[1] : '2026-09-09';
    const human = titleCaseDate(iso);
    const byline = `\n  <p class="concept-authorship"><em>Research Concept · Hypothesis · Author: <a href="${AUTHOR_URL}" rel="author">${AUTHOR}</a> · Published: <time datetime="${iso}">${human}</time> · © ${AUTHOR}</em></p>\n`;
    next = next.replace(/<footer class="site-footer">/i, `${byline}<footer class="site-footer">`);
    next = next.replace(/<\/head>/i, '  <style>.concept-authorship{max-width:1280px;margin:4px auto 0;padding:0 32px 18px;color:var(--muted);font-size:10.5px;line-height:1.5;text-align:right}.concept-authorship em{opacity:.88}.concept-authorship a{color:inherit;text-decoration:none}.concept-authorship a:hover{text-decoration:underline}@media(max-width:680px){.concept-authorship{padding:0 18px 16px;text-align:left}}</style>\n</head>');
  }
  return next;
}

function redirectPage(target, label) {
  return `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>Moved to Concepts &amp; Hypotheses | BHOC Therapeutics Platform</title>\n<meta name="robots" content="noindex,follow">\n<link rel="canonical" href="${target}">\n<meta http-equiv="refresh" content="0; url=${target}">\n</head>\n<body>\n<p>This page has moved to <a href="${target}">${label}</a>.</p>\n</body>\n</html>\n`;
}

fs.mkdirSync(NEW_DIR, { recursive: true });
const sourceLanding = fs.readFileSync(path.join(OLD_DIR, 'index.html'), 'utf8');
const sourceArticle = fs.readFileSync(path.join(OLD_DIR, 'prehospital-oxygen-delivery-selection.html'), 'utf8');
fs.writeFileSync(path.join(NEW_DIR, 'index.html'), transformLanding(sourceLanding));
fs.writeFileSync(path.join(NEW_DIR, 'prehospital-oxygen-delivery-selection.html'), transformArticle(sourceArticle));

fs.writeFileSync(path.join(OLD_DIR, 'index.html'), redirectPage(NEW_BASE, 'Concepts & Hypotheses'));
fs.writeFileSync(path.join(OLD_DIR, 'prehospital-oxygen-delivery-selection.html'), redirectPage(`${NEW_BASE}prehospital-oxygen-delivery-selection.html`, 'Prehospital Oxygen-Delivery Patient Selection'));

for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  if (!rel.endsWith('.html')) continue;
  if (rel.startsWith('open-discussion/') || rel.startsWith('concepts-hypotheses/')) continue;
  const src = fs.readFileSync(file, 'utf8');
  const next = baseTransform(src)
    .replaceAll('Concepts & Hypotheses: patient selection', 'Concepts & Hypotheses: patient selection')
    .replaceAll('Concepts &amp; Hypotheses: patient selection', 'Concepts &amp; Hypotheses: patient selection');
  if (next !== src) fs.writeFileSync(file, next);
}

const sitemap = path.join(ROOT, 'sitemap.xml');
if (fs.existsSync(sitemap)) {
  const src = fs.readFileSync(sitemap, 'utf8');
  fs.writeFileSync(sitemap, src.replaceAll(OLD_BASE, NEW_BASE));
}

const keywordMap = path.join(ROOT, 'seo', 'page-keyword-map.md');
if (fs.existsSync(keywordMap)) {
  const src = fs.readFileSync(keywordMap, 'utf8');
  fs.writeFileSync(keywordMap, src
    .replaceAll('/open-discussion/', '/concepts-hypotheses/')
    .replaceAll('Open Discussion', 'Concepts & Hypotheses')
    .replaceAll('pre-review', 'pre-publication'));
}

console.log('Concepts & Hypotheses migration complete: new canonical pages created, old URLs preserved as noindex redirects, internal links and SEO paths updated.');
