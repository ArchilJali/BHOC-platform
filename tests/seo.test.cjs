const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('fs');
const path=require('path');

const root=path.resolve(__dirname,'..');
const config=JSON.parse(fs.readFileSync(path.join(root,'seo/page-metadata.json'),'utf8'));
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
const initiativePreview='https://bhoctherapeutics.com/assets/bhoc-social-preview-20260905-initiative-logo.png';
const initiativeMark='https://bhoctherapeutics.com/assets/bhoc-biodiversity-mark.png?v=202609055';

function html(file){return fs.readFileSync(path.join(root,file),'utf8')}
function count(source,pattern){return [...source.matchAll(pattern)].length}

test('canonical SEO pages have unique search titles and descriptions',()=>{
  const titles=new Set();
  const descriptions=new Set();
  const urls=new Set();
  for(const [file,data] of Object.entries(config)){
    assert.ok(data.title.length>=35&&data.title.length<=65,`${file}: title length ${data.title.length}`);
    assert.ok(data.description.length>=110&&data.description.length<=170,`${file}: description length ${data.description.length}`);
    assert.ok(!titles.has(data.title),`${file}: duplicate title`);
    assert.ok(!descriptions.has(data.description),`${file}: duplicate description`);
    assert.ok(!urls.has(data.url),`${file}: duplicate canonical URL`);
    titles.add(data.title);descriptions.add(data.description);urls.add(data.url);
  }
});

test('managed metadata, canonical, initiative branding and H1 are complete',()=>{
  for(const [file,data] of Object.entries(config)){
    const source=html(file);
    assert.equal(count(source,/<title>/g),1,`${file}: title count`);
    assert.equal(count(source,/<meta name="description"/g),1,`${file}: description count`);
    assert.equal(count(source,/<link rel="canonical"/g),1,`${file}: canonical count`);
    assert.equal(count(source,/<h1\b/gi),1,`${file}: H1 count`);
    assert.ok(source.includes(`<title>${data.title}</title>`),`${file}: configured title missing`);
    assert.ok(source.includes(`<link rel="canonical" href="${data.url}">`),`${file}: configured canonical missing`);
    assert.ok(source.includes(`property="og:image" content="${initiativePreview}"`),`${file}: initiative OG image missing`);
    assert.ok(source.includes(`<link rel="icon" href="${initiativeMark}" type="image/png">`),`${file}: initiative favicon missing`);
    assert.ok(source.includes('name="twitter:card" content="summary_large_image"'),`${file}: Twitter card missing`);
  }
});

test('all JSON-LD blocks parse and breadcrumb pages expose breadcrumbs',()=>{
  for(const [file,data] of Object.entries(config)){
    const source=html(file);
    const blocks=[...source.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
    assert.ok(blocks.length>=1,`${file}: JSON-LD missing`);
    for(const block of blocks)assert.doesNotThrow(()=>JSON.parse(block[1]),`${file}: invalid JSON-LD`);
    if(data.breadcrumbs)assert.ok(source.includes('"@type": "BreadcrumbList"'),`${file}: breadcrumb schema missing`);
  }
});

test('sitemap contains every canonical indexable page exactly once',()=>{
  const locations=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1].replace(/&amp;/g,'&'));
  assert.equal(locations.length,Object.keys(config).length);
  assert.equal(new Set(locations).size,locations.length,'duplicate sitemap URLs');
  for(const data of Object.values(config))assert.ok(locations.includes(data.url),`${data.url}: missing from sitemap`);
  for(const redirect of ['Vet-index.html','Vet-search.html','veterinary/index.html','veterinary/business/index.html']){
    assert.ok(/noindex/.test(html(redirect)),`${redirect}: redirect must remain noindex`);
  }
});

test('local fallback social preview remains a valid 1200 by 630 PNG',()=>{
  const png=fs.readFileSync(path.join(root,'assets/bhoc-evidence-social.png'));
  assert.equal(png.toString('hex',0,8),'89504e470d0a1a0a');
  assert.equal(png.readUInt32BE(16),1200);
  assert.equal(png.readUInt32BE(20),630);
});
