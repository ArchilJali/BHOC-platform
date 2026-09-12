const fs = require('fs');
const file = 'real-world-evidence/blood-groups-history/index.html';
let html = fs.readFileSync(file, 'utf8');

if (!html.includes('id="article-record"')) {
  html = html.replace('<body class="theme-main">', '<body id="top" class="theme-main">');

  html = html.replace('</style>', `
    .article-record{margin:30px 0 10px;border:1px solid var(--line);border-radius:14px;background:#fff;padding:22px}.article-record h2{margin:5px 0 7px;font-size:22px}.article-record p{margin:6px 0;color:var(--muted);line-height:1.6}.article-dates{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.article-dates time{display:inline-block;padding:4px 8px;border-radius:999px;background:#f1f4f6;color:#66737d;font-size:8px;font-weight:850;letter-spacing:.045em;text-transform:uppercase}.article-dates time:first-child{background:#e7f6f8;color:#0e718b}.article-record-nav{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:15px;padding-top:13px;border-top:1px solid var(--line)}.article-record-nav a{text-decoration:none;font-weight:800;font-size:12px}\n  </style>`);

  const block = `
      <section id="article-record" class="article-record" aria-labelledby="article-author-title">
        <div class="eyebrow">Author</div>
        <h2 id="article-author-title">Archil Jaliashvili</h2>
        <p>BHOC Therapeutics · Biological Hemoglobin Oxygen Carrier · Precision Oxygen Therapeutics</p>
        <p>This reference timeline is part of the BHOC public scientific knowledge architecture and is maintained as a source-linked overview of the continuing evolution of blood-group science.</p>
        <p><a href="https://www.linkedin.com/in/archil-jaliashvili-bhoc/" target="_blank" rel="noopener noreferrer">Archil Jaliashvili on LinkedIn ↗</a></p>
        <div class="article-dates"><time datetime="2026-09-12">Added 12 Sep 2026</time><time datetime="2026-09-12">Last updated 12 Sep 2026</time></div>
        <nav class="article-record-nav" aria-label="Article navigation"><a href="../">← Real-World Evidence</a><a href="#top">↑ Back to top</a></nav>
      </section>`;

  html = html.replace(/\s*<\/article>/, `${block}\n    </article>`);
  fs.writeFileSync(file, html);
}
