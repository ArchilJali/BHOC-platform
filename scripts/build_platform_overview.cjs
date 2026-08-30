const fs = require('node:fs');
const path = require('node:path');
const C = require('../assets/publications-core.js');

const ROOT = path.resolve(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
const veterinary = read('veterinary/Vet-publications.json');
const human = read('human/BHOC-Human-publications.json');
const transplant = read('transplant/Transplant-publications.json');
const hubs = [veterinary, human, transplant];
const records = hubs.flat();

const normalizeIdentifier = value => String(value || '')
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/^https?:\/\/(?:dx\.)?doi\.org\//, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const parents = records.map((_, index) => index);
function root(index) {
  while (parents[index] !== index) {
    parents[index] = parents[parents[index]];
    index = parents[index];
  }
  return index;
}
function unite(left, right) {
  left = root(left);
  right = root(right);
  if (left !== right) parents[right] = left;
}

const indexes = { doi: new Map(), pmid: new Map(), title: new Map() };
records.forEach((publication, index) => {
  const identifiers = {
    doi: normalizeIdentifier(publication.doi),
    pmid: String(publication.pmid || '').trim(),
    title: normalizeIdentifier(publication.title)
  };
  for (const [type, value] of Object.entries(identifiers)) {
    if (!value) continue;
    if (indexes[type].has(value)) unite(index, indexes[type].get(value));
    else indexes[type].set(value, index);
  }
});

const institutions = new Set(records.flatMap(publication => Array.isArray(publication.institutions) ? publication.institutions : []));
const animalLabels = new Set(veterinary.flatMap(publication => publication.species_tags || []).filter(label => !['Human', 'In vitro'].includes(label)));
const animalLabelledRecords = veterinary.filter(publication => (publication.species_tags || []).some(label => !['Human', 'In vitro'].includes(label))).length;
const overview = {
  snapshot: '2026-08-30',
  uniquePublications: new Set(records.map((_, index) => root(index))).size,
  hubPlacements: records.length,
  evidenceHubs: 3,
  indexedAuthorInstitutions: institutions.size,
  normalizedJournalLabels: C.journalOptions(records).filter(option => option.value !== C.OTHER).length,
  animalLabelledRecords,
  animalEvidenceLabels: animalLabels.size,
  hubs: {
    veterinary: veterinary.length,
    transplantation: transplant.length,
    humanUse: human.length
  },
  notes: {
    uniquePublications: 'Deduplicated across hubs by DOI, PMID and normalized title.',
    hubPlacements: 'A publication may be indexed in more than one evidence hub.',
    institutions: 'Indexed author affiliations, not endorsements or confirmed study locations.',
    animalLabelledRecords: 'Veterinary catalogue records carrying at least one non-human, non-in-vitro animal label.',
    animalEvidenceLabels: 'Includes named animal/model labels plus Other animal; it is not a count of approved species.'
  }
};

const target = path.join(ROOT, 'platform-overview.json');
const serialized = `${JSON.stringify(overview, null, 2)}\n`;
if (process.argv.includes('--check')) {
  if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== serialized) {
    console.error('platform-overview.json is out of date');
    process.exit(1);
  }
} else {
  fs.writeFileSync(target, serialized);
  console.log(`Platform overview: ${overview.uniquePublications} unique publications across ${overview.hubPlacements} hub placements`);
}
