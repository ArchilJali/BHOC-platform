const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const agents = ['robots', 'googlebot', 'bingbot', 'msnbot'];

function directives(source, agent) {
  const head = (source.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '').replace(/<!--[\s\S]*?-->/g, '');
  return [...head.matchAll(/<meta\b[^>]*>/gi)].flatMap(([tag]) => {
    const name = tag.match(/\bname\s*=\s*(["'])(.*?)\1/i)?.[2]?.toLowerCase();
    if (name !== agent) return [];
    return (tag.match(/\bcontent\s*=\s*(["'])(.*?)\1/i)?.[2] || '').toLowerCase().split(/[\s,]+/).filter(Boolean);
  });
}

function assertPublicIndexing(source, label) {
  assert.ok(directives(source, 'robots').includes('index'), `${label}: explicit global index directive required`);
  assert.deepEqual(directives(source, 'yandex'), ['noindex'], `${label}: Yandex-only exclusion required`);
  for (const agent of agents) {
    assert.ok(!directives(source, agent).some(value => ['noindex', 'none', 'nofollow'].includes(value)), `${label}: ${agent} must not block international search`);
  }
}

function htmlFiles(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    if (/^[._]/.test(entry.name) || entry.name === 'node_modules') return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(full) : /\.html?$/i.test(entry.name) ? [path.relative(root, full)] : [];
  });
}

test('public sitemap pages and VET Applications exclude Yandex without excluding Google or Bing', () => {
  const files = new Set(['veterinary/vet-stage/index.html']);
  for (const [, location] of read('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)) {
    const url = new URL(location.replaceAll('&amp;', '&'));
    assert.equal(url.origin, 'https://archiljali.github.io');
    assert.ok(url.pathname.startsWith('/BHOC-platform/'));
    let file = decodeURIComponent(url.pathname.slice('/BHOC-platform/'.length));
    if (!file || file.endsWith('/')) file += 'index.html';
    files.add(file);
  }
  assert.ok(files.size > 30, 'check the full public sitemap, not just the home page');
  for (const file of files) assertPublicIndexing(read(file), file);
});

test('real drafts, migration redirects and 404 retain their general noindex', () => {
  let checked = 0;
  for (const file of htmlFiles(root)) {
    const source = read(file);
    const redirect = /<meta\b(?=[^>]*\bhttp-equiv=["']refresh["'])[^>]*>/i.test(source);
    if (!(file === '404.html' || file.startsWith('drafts/') || redirect || file === 'veterinary/vet-stage/oxyglobin-veterinary.html')) continue;
    assert.ok(directives(source, 'robots').includes('noindex'), `${file}: Yandex noindex is not a substitute for a draft/redirect exclusion`);
    checked++;
  }
  assert.ok(checked >= 10, 'preserve the existing draft and redirect exclusions');
});

test('Jekyll-generated pages inherit Yandex exclusion and editorial drafts stay excluded globally', () => {
  const include = read('_includes/head-custom.html');
  assert.equal((include.match(/<meta name="yandex" content="noindex">/g) || []).length, 1);
  assert.ok(include.indexOf('<meta name="yandex"') < include.indexOf('{% if'), 'Yandex exclusion must be unconditional');
  for (const file of ['concepts-hypotheses/PUBLICATION-FLOW.md', 'concepts-hypotheses/publication/C-001-prehospital-viewpoint-outline.md', 'social-media/linkedin/concepts-hypotheses-launch.md']) assert.ok(include.includes(file));
  assert.ok(include.includes('<meta name="robots" content="noindex,follow">'));
});

test('noindex cannot pass an index check; duplicate and crawler-specific conflicts are rejected', () => {
  const good = '<head><meta name="robots" content="index,follow"><meta name="yandex" content="noindex"></head>';
  assertPublicIndexing(good, 'Yandex only');
  for (const blocked of ['noindex', 'none', 'nofollow']) {
    assert.throws(() => assertPublicIndexing(good.replace('index,follow', blocked), blocked));
  }
  for (const agent of agents) {
    assert.throws(() => assertPublicIndexing(good.replace('</head>', `<meta content='noindex' name='${agent}'></head>`), agent));
  }
  assertPublicIndexing(good.replace('</head>', '<!-- <meta name="robots" content="noindex"> --></head>'), 'comment is not a directive');
});
