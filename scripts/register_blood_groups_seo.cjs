const fs=require('fs');
const metaFile='seo/page-metadata.json';
const pageFile='real-world-evidence/blood-groups-history/index.html';
const meta=JSON.parse(fs.readFileSync(metaFile,'utf8'));
meta[pageFile]={
  title:'Blood Groups History | ABO to 49 ISBT Systems | BHOC',
  description:'A source-linked timeline of human blood-group discovery, from Karl Landsteiner and ABO to 49 ISBT systems, modern red-cell antigens and transfusion compatibility.',
  keywords:'blood groups history, ABO blood group, Karl Landsteiner, Rh blood group, blood group systems, ISBT blood groups, red cell antigens, MNS, Kell, Duffy, Kidd, Diego, JAMA blood group, PIGZ blood group, transfusion compatibility',
  url:'https://archiljali.github.io/BHOC-platform/real-world-evidence/blood-groups-history/',
  type:'article',
  lastmod:'2026-09-12',
  breadcrumbs:[['Home','/'],['Real-World Evidence','/real-world-evidence/'],['Blood Groups History','/real-world-evidence/blood-groups-history/']]
};
fs.writeFileSync(metaFile,JSON.stringify(meta,null,2)+'\n');
let page=fs.readFileSync(pageFile,'utf8');
page=page.replace('<script type="application/ld+json">\n  {\n    "@context":"https://schema.org",\n    "@type":"BreadcrumbList"','<script type="application/ld+json" data-seo-breadcrumbs>\n  {\n    "@context":"https://schema.org",\n    "@type":"BreadcrumbList"');
fs.writeFileSync(pageFile,page);
