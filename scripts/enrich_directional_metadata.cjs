const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
const write = (file, value) => fs.writeFileSync(path.join(ROOT, file), `${JSON.stringify(value, null, 2)}\n`);
const normalize = value => String(value || '')
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/^https?:\/\/(?:dx\.)?doi\.org\//, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const veterinary = read('veterinary/Vet-publications.json');
const human = read('human/BHOC-Human-publications.json');
const transplant = read('transplant/Transplant-publications.json');

const byDoi = new Map();
const byPmid = new Map();
const byTitle = new Map();
for (const publication of veterinary) {
  if (publication.doi) byDoi.set(normalize(publication.doi), publication);
  if (publication.pmid) byPmid.set(String(publication.pmid), publication);
  byTitle.set(normalize(publication.title), publication);
}

function pmid(publication) {
  if (publication.pmid) return String(publication.pmid);
  const match = String(publication.pubmedUrl || publication.originalUrl || '').match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/);
  return match ? match[1] : '';
}

function sourceMatch(publication) {
  return (publication.doi && byDoi.get(normalize(publication.doi)))
    || (pmid(publication) && byPmid.get(pmid(publication)))
    || byTitle.get(normalize(publication.title));
}

function enrich(publication, includeCitationFields) {
  const matched = sourceMatch(publication);
  const result = { ...publication, institutions: matched?.institutions ? [...matched.institutions] : [] };
  if (!matched || !includeCitationFields) return result;
  if (!result.authors && matched.authors) result.authors = matched.authors;
  if (!result.journal && matched.journal) result.journal = matched.journal;
  if (!result.pmid && matched.pmid) result.pmid = matched.pmid;
  if (!result.doi && matched.doi) result.doi = matched.doi;
  if (!result.pubmedUrl && matched.pubmed_url) result.pubmedUrl = matched.pubmed_url;
  if (!result.doiUrl && matched.doi_url) result.doiUrl = matched.doi_url;
  return result;
}

write('human/BHOC-Human-publications.json', human.map(publication => enrich(publication, false)));
write('transplant/Transplant-publications.json', transplant.map(publication => enrich(publication, true)));

const humanInstitutions = new Set(human.map(publication => enrich(publication, false)).flatMap(publication => publication.institutions));
const transplantInstitutions = new Set(transplant.map(publication => enrich(publication, true)).flatMap(publication => publication.institutions));
console.log(`Human: ${humanInstitutions.size} indexed author institutions`);
console.log(`Transplantation: ${transplantInstitutions.size} indexed author institutions`);
