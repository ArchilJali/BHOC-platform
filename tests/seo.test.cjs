const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('fs');
const path=require('path');

const root=path.resolve(__dirname,'..');
const config={
  ...JSON.parse(fs.readFileSync(path.join(root,'seo/page-metadata.json'),'utf8')),
  ...JSON.parse(fs.readFileSync(path.join(root,'seo/page-metadata-veterinary-cases.json'),'utf8')),
  ...JSON.parse(fs.readFileSync(path.join(root,'seo/page-metadata-additions.json'),'utf8'))
};
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
// Validate generated SEO outputs only after the canonical metadata and sitemap have been synchronized on main.
const initiativeMark='https://bhoctherapeutics.com/assets/bhoc-biodiversity-mark.png?v=202609055';
const veterinaryMark='https://bhocvet.com/assets/favicon.svg';
const defaultSocialImage='https://bhoctherapeutics.com/assets/bhoc-social-preview-20260905-initiative-logo.png';
const authorProfile='https://bhoctherapeutics.com/archil-jaliashvili/';

function html(file){return fs.readFileSync(path.join(root,file),'utf8')}
function count(source,pattern){return [...source.matchAll(pattern)].length}

test('canonical SEO pages have unique search titles and descriptions',()=>{
  const titles=new Set();
  const descriptions=new Set();
  const urls=new Set();
  for(const [file,data] of Object.entries(config)){
    assert.ok(data.title.length>=35&&data.title.length<=65,`${file}: title length ${data.title.length}`);
    assert.ok(data.description.length>=110&&data.description.length<=190,`${file}: description length ${data.description.length}`);
    assert.ok(!titles.has(data.title),`${file}: duplicate title`);
    assert.ok(!descriptions.has(data.description),`${file}: duplicate description`);
    assert.ok(!urls.has(data.url),`${file}: duplicate canonical URL`);
    titles.add(data.title);descriptions.add(data.description);urls.add(data.url);
  }
});

test('managed metadata, canonical, social cards and H1 are complete',()=>{
  for(const [file,data] of Object.entries(config)){
    const source=html(file);
    assert.equal(count(source,/<title>/g),1,`${file}: title count`);
    assert.equal(count(source,/<meta name="description"/g),1,`${file}: description count`);
    assert.equal(count(source,/<link rel="canonical"/g),1,`${file}: canonical count`);
    assert.equal(count(source,/<h1\b/gi),1,`${file}: H1 count`);
    assert.ok(source.includes(`<title>${data.title}</title>`),`${file}: configured title missing`);
    assert.ok(source.includes(`<link rel="canonical" href="${data.url}">`),`${file}: configured canonical missing`);
    const isVeterinary=file.startsWith('veterinary/');
    const isHome=file==='index.html';
    const expectedImage=data.image||defaultSocialImage;
    assert.ok(source.includes(`property="og:image" content="${expectedImage}"`),`${file}: configured OG image missing`);
    assert.ok(source.includes(`name="twitter:image" content="${expectedImage}"`),`${file}: configured Twitter image missing`);
    assert.ok(source.includes('name="twitter:card" content="summary_large_image"'),`${file}: large Twitter card missing`);
    assert.ok(source.includes(`<link rel="author" href="${authorProfile}">`),`${file}: owned author profile missing`);
    if(data.type==='article')assert.ok(source.includes(`property="article:author" content="${authorProfile}"`),`${file}: article author profile missing`);
    if(isHome){
      assert.ok(source.includes('property="og:title" content="BHOC Scientific Evidence"'),`${file}: compact social title missing`);
      assert.ok(source.includes('property="og:description" content="Source-linked evidence on BHOC, HBOC and oxygen delivery."'),`${file}: compact social description missing`);
    }
    assert.ok(source.includes(`<link rel="icon" href="${isVeterinary?veterinaryMark:initiativeMark}" type="${isVeterinary?'image/svg+xml':'image/png'}">`),`${file}: correct favicon missing`);
    assert.ok(source.includes('property="og:site_name" content="BHOC Therapeutics Platform"'),`${file}: platform social name missing`);
  }
});

test('structured author URLs use the owned profile while LinkedIn remains linked visibly',()=>{
  const pages=[];
  const walk=dir=>{
    for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
      if(entry.name.startsWith('.')||entry.name==='node_modules')continue;
      const full=path.join(dir,entry.name);
      if(entry.isDirectory())walk(full);
      else if(entry.isFile()&&/\.html?$/i.test(entry.name))pages.push(path.relative(root,full));
    }
  };
  walk(root);
  for(const file of pages){
    const source=html(file);
    assert.ok(!/<(?:link|a)\b(?=[^>]*\brel=["']author["'])[^>]*linkedin\.com\/in\/archil-jaliashvili-bhoc/i.test(source),`${file}: rel=author still points to LinkedIn`);
    assert.ok(!/<meta\b(?=[^>]*\bproperty=["']article:author["'])[^>]*linkedin\.com\/in\/archil-jaliashvili-bhoc/i.test(source),`${file}: article:author still points to LinkedIn`);
    assert.ok(!/"url"\s*:\s*"https:\/\/www\.linkedin\.com\/in\/archil-jaliashvili-bhoc\/"/.test(source),`${file}: structured author URL still points to LinkedIn`);
  }
  assert.ok(html('social-media/linkedin/index.html').includes(`href="https://www.linkedin.com/in/archil-jaliashvili-bhoc/"`),'visible LinkedIn profile link must remain available');
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
  const lastmods=[...sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map(match=>match[1]);
  assert.equal(locations.length,Object.keys(config).length);
  assert.equal(new Set(locations).size,locations.length,'duplicate sitemap URLs');
  for(const data of Object.values(config))assert.ok(locations.includes(data.url),`${data.url}: missing from sitemap`);
  assert.equal(lastmods.length,Object.values(config).filter(data=>data.lastmod).length,'only explicit substantive lastmod dates belong in sitemap');
  for(const data of Object.values(config).filter(data=>data.lastmod))assert.match(data.lastmod,/^\d{4}-\d{2}-\d{2}$/);
  for(const redirect of ['Vet-index.html','Vet-search.html','veterinary/index.html','veterinary/business/index.html','veterinary/Vet-business-concept.html']){
    assert.ok(/noindex/.test(html(redirect)),`${redirect}: redirect must remain noindex`);
  }
});

test('local fallback social preview remains a valid 1200 by 630 PNG',()=>{
  const png=fs.readFileSync(path.join(root,'assets/bhoc-evidence-social.png'));
  assert.equal(png.toString('hex',0,8),'89504e470d0a1a0a');
  assert.equal(png.readUInt32BE(16),1200);
  assert.equal(png.readUInt32BE(20),630);
});

test('every shared platform header exposes the complete BHOC website network',()=>{
  const pages=[];
  const walk=dir=>{
    for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
      if(entry.name.startsWith('.')||entry.name==='node_modules')continue;
      const full=path.join(dir,entry.name);
      if(entry.isDirectory())walk(full);
      else if(entry.isFile()&&/\.html?$/i.test(entry.name)&&html(path.relative(root,full)).includes('class="site-header"'))pages.push(path.relative(root,full));
    }
  };
  walk(root);
  assert.ok(pages.length>=30,'shared header page coverage');
  for(const file of pages){
    const source=html(file);
    assert.ok(source.includes('href="https://bhoctherapeutics.com/"'),`${file}: Therapeutics route`);
    assert.ok(source.includes('>BHOC Therapeutics</a>'),`${file}: Therapeutics label`);
    assert.ok(source.includes('href="https://bhocvet.com/"'),`${file}: Veterinary route`);
    assert.ok(source.includes('<strong class="vet-wordmark">BH<b class="vet-o">O</b>C</strong> Veterinary</a>'),`${file}: Veterinary label and orange O`);
    assert.ok(source.includes('class="nav-network-link nav-network-pending" aria-disabled="true"'),`${file}: inactive Transplant route`);
    assert.ok(source.includes('BHOC Transplant<small>coming soon</small>'),`${file}: Transplant label`);
    assert.ok(!source.includes('target="_blank" rel="noopener">BHOC Therapeutics'),`${file}: owned network routes stay in the same tab`);
  }
});
