const fs=require('fs');
const mdPath='historical-sources/biopure-standing-on-the-shoulders-of-giants/article.md';
const htmlPath='historical-sources/biopure-standing-on-the-shoulders-of-giants/index.html';
let md=fs.readFileSync(mdPath,'utf8');
let html=fs.readFileSync(htmlPath,'utf8');

// Remove the two extra sections added in the previous edit.
md=md.replace(/\n### 4\.1\. Manufacturing Quality Is Part of the Product[\s\S]*?(?=\n## 5\. Regulatory and Clinical Translation)/,'\n');
md=md.replace(/\n### 6\.1\. What Failed at Biopure: Technology, Governance, Regulation and Capital[\s\S]*?(?=\n## 7\. Historical Significance and Limitations)/,'\n');

// Remove their dedicated references 18-26.
md=md.replace(/\n<a id="ref-18"><\/a>[\s\S]*?(?=\n## Copyright and Permissions)/,'\n');

html=html.replace(/\s*<h3 id="4-1-manufacturing-quality-is-part-of-the-product">[\s\S]*?(?=<h2 id="5-regulatory-and-clinical-translation">)/,'\n        ');
html=html.replace(/\s*<h3 id="6-1-what-failed-at-biopure-technology-governance-regulation-and-capital">[\s\S]*?(?=<h2 id="7-historical-significance-and-limitations">)/,'\n        ');
html=html.replace(/\s*<p><a id="ref-18"><\/a><strong>18\.<\/strong>[\s\S]*?(?=<h2 id="copyright-and-permissions">)/,'\n        ');

fs.writeFileSync(mdPath,md);
fs.writeFileSync(htmlPath,html);
