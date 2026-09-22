const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'veterinary/data/oxyglobin-case-listing-book-ii-cases.json');
const explorerPath = path.join(root, 'veterinary/Vet-archive-Oxyglobin-Case-Explorer.html');
const archivePath = path.join(root, 'veterinary/Vet-archive-Oxyglobin-Case-Listing-Book-II.html');
const payload = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const cases = payload.cases;

function countBy(field) {
  return cases.reduce((counts, record) => {
    const value = record[field];
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

test('case index contains every printed form once and in source order', () => {
  assert.equal(payload.case_count, 146);
  assert.equal(cases.length, 146);
  assert.equal(new Set(cases.map(record => record.id)).size, 146);
  assert.deepEqual(countBy('booklet_section'), {
    'Blood loss': 92,
    Hemolysis: 36,
    'Ineffective erythropoiesis': 18
  });
  assert.equal(cases[0].id, 'BL-001');
  assert.equal(cases.at(-1).id, 'IE-018');
  assert.ok(cases.every(record => record.source.booklet_case_page >= 1 && record.source.booklet_case_page <= 37));
});

test('treatment and short-term outcome counts agree with the 146 forms', () => {
  assert.deepEqual(countBy('treatment_sequence'), {
    'Oxyglobin only': 109,
    'Oxyglobin followed by packed RBCs': 11,
    'Oxyglobin followed by whole blood': 23,
    'Whole blood followed by Oxyglobin': 2,
    'Packed RBCs followed by Oxyglobin': 1
  });
  assert.deepEqual(countBy('outcome_24h'), { Survived: 141, 'Not available': 1, Died: 4 });
  assert.deepEqual(countBy('outcome_72h'), { Survived: 129, Died: 10, 'Not available': 7 });
  assert.ok(cases.every(record => record.oxyglobin_125ml_bags));
});

test('missing values stay missing and route is never inferred', () => {
  assert.ok(cases.some(record => record.reported_dose_ml_kg === null));
  assert.ok(cases.some(record => record.weight_lb === null));
  assert.ok(cases.some(record => record.pcv_post_percent === null));
  assert.ok(cases.every(record => record.administration_route === null));
  assert.match(payload.field_notes.administration_route, /do not state a route/i);
  assert.match(payload.field_notes.amount_and_dose, /no missing dose is calculated/i);
});

test('later deaths, euthanasia and poor response remain visible', () => {
  const byId = Object.fromEntries(cases.map(record => [record.id, record]));
  for (const id of ['BL-008', 'HM-008', 'HM-029', 'HM-030', 'IE-001', 'IE-003', 'IE-005', 'IE-008', 'IE-017', 'IE-018']) {
    assert.ok(byId[id].later_follow_up, `${id}: later follow-up missing`);
  }
  assert.equal(byId['HM-008'].outcome_72h, 'Survived');
  assert.match(byId['HM-008'].later_follow_up, /died 4\.5 days/i);
  assert.equal(byId['IE-018'].outcome_72h, 'Not available');
  assert.match(byId['IE-018'].later_follow_up, /euthanasia/i);
});

test('public data is de-identified and excludes source narrative', () => {
  const forbiddenKeys = new Set(['clinician', 'clinic', 'city', 'location', 'patient_name', 'dog_name', 'narrative', 'raw_comment']);
  for (const record of cases) {
    for (const key of Object.keys(record)) assert.ok(!forbiddenKeys.has(key), `${record.id}: forbidden key ${key}`);
  }
  const serialized = JSON.stringify(payload);
  assert.doesNotMatch(serialized, /\bDr\./);
  assert.doesNotMatch(serialized, /Louisville|Fresno|Porterville|Memphis|Dublin/);
});

test('explorer page exposes all search controls and evidence cautions', () => {
  const html = fs.readFileSync(explorerPath, 'utf8');
  for (const id of ['case-search', 'case-section', 'case-treatment', 'case-outcome', 'case-dose', 'case-sort', 'case-results']) {
    assert.match(html, new RegExp(`id="${id}"`), `${id}: missing`);
  }
  assert.match(html, /data-case-data="data\/oxyglobin-case-listing-book-ii-cases\.json"/);
  assert.match(html, /not 146 confirmed unique dogs/i);
  assert.match(html, /not an efficacy or survival rate/i);
  assert.match(html, /do not state an administration route/i);
});

test('archive keeps two summary indicators and links to the explorer', () => {
  const html = fs.readFileSync(archivePath, 'utf8');
  assert.equal((html.match(/<article class="archive-stat">/g) || []).length, 2);
  assert.match(html, /<strong>885<\/strong><span>Veterinary reports<\/span>/);
  assert.match(html, /<strong>146<\/strong><span>Printed case vignettes<\/span>/);
  assert.match(html, /href="Vet-archive-Oxyglobin-Case-Explorer\.html"/);
  assert.doesNotMatch(html, /<article class="archive-stat"><strong>(?:3|64)<\/strong>/);
});
