const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DISCUSSION = '/BHOC-platform/open-discussion/';
const CORPORATE = 'https://bhoctherapeutics.com/';

function updateDiscussionLanding() {
  const file = path.join(ROOT, 'open-discussion', 'index.html');
  let src = fs.readFileSync(file, 'utf8');
  let next = src;

  if (!next.includes('.discussion-actions{')) {
    next = next.replace(
      '@media(max-width:900px)',
      '.discussion-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:18px}.discussion-actions .button{min-height:38px;padding:8px 13px;text-decoration:none}@media(max-width:900px)'
    );
  }

  if (!next.includes('class="discussion-actions"')) {
    next = next.replace(
      /(<div class="status-row">[\s\S]*?<\/div>)/,
      `$1\n    <div class="discussion-actions"><a class="button" href="${CORPORATE}">BHOC Therapeutics →</a><a class="button secondary" href="../index.html">Scientific Evidence Platform →</a></div>`
    );
  }

  const footerAt = next.search(/<footer\b/i);
  if (footerAt >= 0) {
    const before = next.slice(0, footerAt);
    let footer = next.slice(footerAt);
    if (!footer.includes(CORPORATE)) {
      footer = footer.replace(
        /(<a href="\.\.\/science\/">Science<\/a>)/,
        `$1 · <a href="${CORPORATE}">BHOC Therapeutics</a>`
      );
      next = before + footer;
    }
  }

  if (next !== src) {
    fs.writeFileSync(file, next);
    console.log('updated open-discussion/index.html');
    return 1;
  }
  return 0;
}

function updatePlatformHome() {
  const file = path.join(ROOT, 'index.html');
  const src = fs.readFileSync(file, 'utf8');
  let next = src;

  if (!next.includes('<span>Open Discussion · Ideas, hypotheses &amp; pre-review</span>')) {
    next = next.replace(
      /(<div class="library-links">)([\s\S]*?)(<\/div>)/,
      (whole, start, inner, end) => `${start}${inner}<a href="open-discussion/"><span>Open Discussion · Ideas, hypotheses &amp; pre-review</span><span>↗</span></a>${end}`
    );
  }

  if (next !== src) {
    fs.writeFileSync(file, next);
    console.log('updated index.html');
    return 1;
  }
  return 0;
}

const changed = updateDiscussionLanding() + updatePlatformHome();
console.log(`Open Discussion contextual navigation sync complete: ${changed} files updated.`);
