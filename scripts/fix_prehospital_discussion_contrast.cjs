const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'open-discussion', 'prehospital-oxygen-delivery-selection.html');
let src = fs.readFileSync(file, 'utf8');

const marker = '/* FIX: discussion question contrast */';
if (!src.includes(marker)) {
  const fix = `\n  <style>\n    ${marker}\n    .two-col .section.question{background:#102f49!important;color:#fff!important;border-color:#102f49!important}\n    .two-col .section.question .eyebrow{color:#91d4cf!important}\n    .two-col .section.question h2{color:#fff!important}\n    .two-col .section.question p{color:#dce8ec!important}\n    .two-col .section.question strong{color:#fff!important}\n  </style>\n`;
  src = src.replace('</head>', `${fix}</head>`);
  fs.writeFileSync(file, src);
  console.log('Fixed Open Discussion question-card contrast.');
} else {
  console.log('Contrast fix already present.');
}
