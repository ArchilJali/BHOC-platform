const fs=require('fs');
const path=require('path');

const root=path.resolve(__dirname,'..');
const config=JSON.parse(fs.readFileSync(path.join(root,'seo/page-metadata.json'),'utf8'));
const version=JSON.parse(fs.readFileSync(path.join(root,'version.json'),'utf8'));
const check=process.argv.includes('--check');
const image='https://archiljali.github.io/BHOC-platform/assets/bhoc-evidence-social.png';
const base='https://archiljali.github.io/BHOC-platform';
const authorProfile='https://www.linkedin.com/in/archil-jaliashvili-98804927b/';

function escapeAttr(value){return value.replace(/&(?!(?:amp|lt|gt|quot|#39);)/g,'&amp;').replace(/"/g,'&quot;')}
function stripTag(html,pattern){return html.replace(pattern,'')}
function managedBlock(file,data){
  const depth=file.split('/').length-1;
  const prefix=depth?'../'.repeat(depth):'';
  const articleAuthor=data.type==='article'?`\n  <meta property="article:author" content="${authorProfile}">`:'';
  return `\n  <!-- SEO metadata: managed by scripts/apply_seo_metadata.cjs -->\n  <title>${data.title}</title>\n  <meta name="description" content="${escapeAttr(data.description)}">\n  <meta name="keywords" content="${escapeAttr(data.keywords)}">\n  <meta name="author" content="Archil Jaliashvili">\n  <link rel="author" href="${authorProfile}">\n  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">\n  <link rel="canonical" href="${data.url}">\n  <link rel="icon" href="${prefix}assets/bhoc-mark.svg" type="image/svg+xml">\n  <link rel="sitemap" href="${prefix}sitemap.xml" type="application/xml">\n  <meta property="og:locale" content="en_US">\n  <meta property="og:site_name" content="BHOC Evidence Platform">\n  <meta property="og:type" content="${data.type}">\n  <meta property="og:title" content="${escapeAttr(data.title.replace(/&amp;/g,'&'))}">\n  <meta property="og:description" content="${escapeAttr(data.description)}">\n  <meta property="og:url" content="${data.url}">\n  <meta property="og:image" content="${image}">\n  <meta property="og:image:width" content="1200">\n  <meta property="og:image:height" content="630">\n  <meta property="og:image:alt" content="BHOC Evidence Platform: Precision Oxygenation Therapeutics">${articleAuthor}\n  <meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:title" content="${escapeAttr(data.title.replace(/&amp;/g,'&'))}">\n  <meta name="twitter:description" content="${escapeAttr(data.description)}">\n  <meta name="twitter:image" content="${image}">\n  <meta name="twitter:image:alt" content="BHOC Evidence Platform: Precision Oxygenation Therapeutics">`;
}

function breadcrumbBlock(data){
  if(!data.breadcrumbs)return '';
  const itemListElement=data.breadcrumbs.map(([name,url],index)=>({
    '@type':'ListItem',position:index+1,name,item:url==='/'?`${base}/`:`${base}${url}`
  }));
  return `\n  <script type="application/ld+json" data-seo-breadcrumbs>\n${JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement},null,2)}\n  </script>\n`;
}

function render(file,data){
  const absolute=path.join(root,file);
  let html=fs.readFileSync(absolute,'utf8');
  html=html.replace(/\s*<!-- SEO metadata: managed by scripts\/apply_seo_metadata\.cjs -->[\s\S]*?<meta name="twitter:image:alt"[^>]*>/i,'');
  html=stripTag(html,/\s*<title>[\s\S]*?<\/title>/i);
  const metaKeys=['description','keywords','author','robots','twitter:card','twitter:title','twitter:description','twitter:image','twitter:image:alt'];
  for(const key of metaKeys)html=stripTag(html,new RegExp(`\\s*<meta\\b(?=[^>]*\\bname=["']${key.replace(':','\\:')}["'])[^>]*>`,'i'));
  const propertyKeys=['og:locale','og:site_name','og:type','og:title','og:description','og:url','og:image','og:image:width','og:image:height','og:image:alt','article:author'];
  for(const key of propertyKeys)html=stripTag(html,new RegExp(`\\s*<meta\\b(?=[^>]*\\bproperty=["']${key.replace(/:/g,'\\:')}["'])[^>]*>`,'i'));
  html=stripTag(html,/\s*<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i);
  html=stripTag(html,/\s*<link\b(?=[^>]*\brel=["']icon["'])[^>]*>/i);
  html=stripTag(html,/\s*<link\b(?=[^>]*\brel=["']sitemap["'])[^>]*>/i);
  html=stripTag(html,/\s*<link\b(?=[^>]*\brel=["']author["'])[^>]*>/i);
  html=html.replace(/\s*<script type="application\/ld\+json" data-seo-breadcrumbs>[\s\S]*?<\/script>\s*/i,'');
  const viewport=/<meta\b(?=[^>]*\bname=["']viewport["'])[^>]*>/i;
  if(!viewport.test(html))throw new Error(`${file}: viewport meta missing`);
  html=html.replace(viewport,match=>match+managedBlock(file,data));
  html=html.replace(/<\/head>/i,breadcrumbBlock(data)+'</head>');
  return html;
}

let stale=0;
for(const [file,data] of Object.entries(config)){
  const absolute=path.join(root,file);
  if(!fs.existsSync(absolute))throw new Error(`${file}: configured page missing`);
  const next=render(file,data);
  const current=fs.readFileSync(absolute,'utf8');
  if(next!==current){
    stale++;
    if(!check)fs.writeFileSync(absolute,next);
    else console.error(`${file}: SEO metadata is stale`);
  }
}
const sitemapLastmod=version.updated_iso||new Date().toISOString().slice(0,10);
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.values(config).map(data=>`  <url>\n    <loc>${data.url.replace(/&/g,'&amp;')}</loc>\n    <lastmod>${data.lastmod||sitemapLastmod}</lastmod>\n  </url>`).join('\n')}\n</urlset>\n`;
const sitemapPath=path.join(root,'sitemap.xml');
const currentSitemap=fs.readFileSync(sitemapPath,'utf8');
if(sitemap!==currentSitemap){
  stale++;
  if(!check)fs.writeFileSync(sitemapPath,sitemap);
  else console.error('sitemap.xml: URL coverage is stale');
}
if(check&&stale)process.exit(1);
console.log(check?`${Object.keys(config).length} SEO pages and sitemap are current`:`Updated ${stale} SEO output(s)`);
