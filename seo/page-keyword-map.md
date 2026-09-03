# BHOC Evidence Platform SEO Architecture

Updated: 3 September 2026

This repository owns scientific evidence, publication catalogues, regulatory records and technology history. Corporate, product-development and market positioning belong on `bhoctherapeutics.com`; full articles should not be duplicated between the two sites.

## Canonical identity

- **BHOC** means **Biological Hemoglobin Oxygen Carrier**.
- **BHOC Evidence Platform** is a source-linked scientific and historical evidence platform.
- **Precision Oxygenation Therapeutics** is the umbrella scientific framework.
- BHOC is not presented as artificial blood, a replacement for all blood functions, a replacement for donors, an approved treatment or clinical advice.
- Historical phrases such as “blood substitute” remain only where needed to retrieve or accurately describe legacy literature.

## Permanent vocabulary

Use naturally where relevant, not as a repeated block:

**BHOC; Biological Hemoglobin Oxygen Carrier; Precision Oxygenation Therapeutics; oxygen delivery; oxygen carrier; hemoglobin oxygen carrier; HBOC; blood transfusion; scientific evidence; translational research; source-linked publications.**

`meta name="keywords"` is maintained as an internal taxonomy and for non-Google consumers. It is not treated as a Google ranking factor. Page titles, H1 headings, visible evidence, descriptive links and source quality carry the actual search intent.

## Page-level search intent

| Canonical page | Primary intent | Secondary and semantic terms |
|---|---|---|
| `/` | Biological Hemoglobin Oxygen Carrier evidence | BHOC; Precision Oxygenation Therapeutics; oxygen delivery; veterinary medicine; transplantation; human-use research |
| `/veterinary/Vet-index.html` | veterinary oxygen carrier evidence | Oxyglobin; veterinary transfusion; canine anemia; animal oxygenation; FDA and EMA records |
| `/veterinary/Vet-search.html` | veterinary oxygen carrier publication search | species; institution; author; journal; year; PubMed; DOI |
| `/veterinary/Vet-03-publication-BHOC-Oxyglobin.html` | Oxyglobin and veterinary HBOC publication gateway | publication search; citation catalogue; regulatory evidence routes; BHOC veterinary evidence |
| `/veterinary/publication-catalogue.html` | Oxyglobin and veterinary HBOC catalogue | bibliography; publications; journals; institutions; PubMed; DOI |
| `/veterinary/publication-methodology.html` | veterinary evidence methodology | provenance; author affiliations; study locations; species classification; evidence limits |
| `/veterinary/Vet-fda-ema.html` | Oxyglobin FDA and EMA records | Oxyglobin veterinary; hemoglobin glutamer-200; veterinary HBOC; NADA 141-067; EU/2/99/015; canine anemia; European authorization; BHOC veterinary evidence |
| `/veterinary/Vet-FDA-registry.html` | Oxyglobin FDA detailed regulatory evidence | NADA 141-067; Oxyglobin dog; 24-hour treatment-success endpoint; efficacy population; intent-to-treat; FDA FOI |
| `/veterinary/Vet-EMA-approvals-summary.html` | Oxyglobin EU/EMA detailed regulatory evidence | EU/2/99/015; 2001 EC product information; Oxyglobin dog; treatment success by anemia cause; blood loss; hemolysis; ineffective erythropoiesis |
| `/transplant/Transplant-index.html` | oxygen carriers in transplantation | organ perfusion; machine perfusion; organ preservation; ischemia reperfusion; liver; kidney; heart |
| `/transplant/Transplant-search.html` | transplant publication search | organ; evidence group; institution; author; journal; year; HBOC-201 |
| `/human/BHOC-Human-index.html` | human-use oxygen carrier evidence | HBOC-201; Hemopure; severe anemia; hemorrhage; trauma; surgery; emergency oxygenation |
| `/human/BHOC-Human-search.html` | human-use publication search | clinical evidence; translational evidence; institution; author; journal; year |
| `/human/BHOC-Human-fda-expanded-access.html` | HBOC-201 FDA expanded access | emergency IND; single-patient IND; NCT01881503; severe anemia; regulatory evidence |
| `/science/` | BHOC scientific publications | oxygen carrier evidence; oxygen delivery research; hemoglobin physiology; transfusion research |
| `/science/oxygen-delivery-potency.html` | oxygen delivery potency of blood products | L-TOF; fresh blood; stored red blood cells; hemoglobin oxygen carriers; oxygen transport |
| `/science/sepsis-microcirculation-tissue-oxygenation-bhoc.html` | tissue oxygenation and microcirculation in severe inflammation | BHOC; HBOC; Biological Hemoglobin Oxygen Carrier; Precision Oxygenation Therapeutics; sepsis; endothelial dysfunction; nitric oxide; oxygen delivery; HBOC-201; Hemopure; Oxyglobin; Biopure |
| `/historical-sources/` | HBOC historical sources | Biopure; Hemopure history; Oxyglobin history; primary documents; oxygen therapeutics history |
| `/historical-sources/biopure-standing-on-the-shoulders-of-giants/` | Biopure history | Carl W. Rausch; HBOC history; biologics manufacturing; institutional history |
| `/social-media/linkedin/` | BHOC LinkedIn publications | Archil Jaliashvili; oxygen delivery; transfusion; emergency medicine; transplantation; veterinary medicine |

## Veterinary growth architecture

This section is a **page-routing map**, not a second keyword master. It assigns unique search intent to Veterinary URLs so that Oxyglobin, HBOC and BHOC reinforce one another without creating avoidable keyword cannibalization.

### Veterinary category bridge

Use the bridge naturally and only where evidence/context supports it:

**existing veterinary search intent → Oxyglobin → HBOC → BHOC → Biological Hemoglobin Oxygen Carrier → veterinary oxygen therapeutics / Precision Oxygenation Therapeutics**

Oxyglobin is the legacy and regulatory search bridge. BHOC is the developing category term. Existing Oxyglobin regulatory and publication URLs keep their current intent; new pages must not duplicate those functions.

### Veterinary page / keyword map

| Priority | Canonical / planned page | Primary keyword / intent | Secondary and semantic terms | Oxyglobin bridge | BHOC bridge | Required internal links | Status |
|---|---|---|---|---|---|---|---|
| CORE | `/veterinary/Vet-index.html` | veterinary oxygen carrier evidence | Oxyglobin; veterinary HBOC; animal anemia; veterinary transfusion; species evidence; animal oxygenation | Central discovery link to Oxyglobin evidence, publications and regulatory history | BHOC veterinary evidence; Biological Hemoglobin Oxygen Carrier; veterinary oxygen therapeutics | Oxyglobin cornerstone; transfusion pillar; Dog; Cat; Equine; Blood Bank; publication search; FDA/EMA | **EXISTING — preserve URL** |
| CORE | `/veterinary/Vet-fda-ema.html` | Oxyglobin FDA and EMA regulatory records | Oxyglobin FDA approval; Oxyglobin EMA authorization; Oxyglobin veterinary; Oxyglobin dog; hemoglobin glutamer-200; veterinary HBOC; NADA 141-067; EU/2/99/015; canine anemia | Combined regulatory hub; 1999 → 2001 → 2021 EU chronology | Clarify historical Oxyglobin record versus future BHOC / Biological Hemoglobin Oxygen Carrier development | Vet hub; Oxyglobin cornerstone; FDA source; EMA source; publication catalogue | **EXISTING — preserve URL** |
| CORE-SOURCE | `/veterinary/Vet-FDA-registry.html` | Oxyglobin FDA detailed regulatory evidence | NADA 141-067; Oxyglobin dog; canine anemia; 24-hour treatment-success endpoint; efficacy population; ITT | Jurisdiction-specific FDA source summary; do not duplicate EU chronology | Veterinary HBOC / BHOC context only, with approval boundary | Regulatory hub; Vet hub; EMA source; publication catalogue | **EXISTING — preserve URL** |
| CORE-SOURCE | `/veterinary/Vet-EMA-approvals-summary.html` | Oxyglobin EU/EMA detailed regulatory evidence | EU/2/99/015; hemoglobin glutamer-200; Oxyglobin dog; cause-stratified treatment success; blood loss; hemolysis; ineffective erythropoiesis | Jurisdiction-specific EU/EMA source summary; 2001 primary-document context | Veterinary HBOC / BHOC context only, with approval boundary | Regulatory hub; Vet hub; FDA source; publication catalogue | **EXISTING — preserve URL** |
| CORE-GATEWAY | `/veterinary/Vet-03-publication-BHOC-Oxyglobin.html` | Oxyglobin and veterinary HBOC publication gateway | Oxyglobin publications; veterinary HBOC; BHOC veterinary evidence | Navigation layer only; do not duplicate catalogue lists or keyword indexes | Oxyglobin → veterinary HBOC → BHOC context in concise form | Vet hub; publication search; catalogue; FDA/EMA; VET Applications | **EXISTING — preserve URL** |
| CORE | `/veterinary/publication-catalogue.html` | Oxyglobin and veterinary HBOC publication catalogue | Oxyglobin publications; veterinary HBOC literature; veterinary oxygen carrier bibliography; PubMed; DOI | Primary bibliography / literature intent | BHOC evidence context only; do not turn catalogue into a product page | Vet hub; Oxyglobin cornerstone; publication search; methodology | **EXISTING — preserve URL** |
| P1 | `/veterinary/oxyglobin-veterinary-hboc-bhoc.html` | Oxyglobin veterinary evidence | Oxyglobin veterinary; Oxyglobin dog; Oxyglobin canine anemia; Oxyglobin oxygen carrier; hemoglobin glutamer-200; Oxyglobin HBOC; Oxyglobin blood transfusion historical terminology | **Primary bridge page**: history, indication scope, evidence and limitations | Oxyglobin → HBOC → BHOC; Biological Hemoglobin Oxygen Carrier; veterinary oxygen carrier | Vet hub; FDA/EMA; publication catalogue; transfusion pillar; Dog; Cat; BHOC concept | **PLANNED — P1 cornerstone** |
| P1 | `/veterinary/veterinary-blood-transfusion.html` | veterinary blood transfusion | animal blood transfusion; veterinary transfusion medicine; emergency veterinary blood; blood products; donor blood; severe anemia | Historical oxygen-carrying support context where donor blood is unavailable or delayed | veterinary oxygen carrier; BHOC veterinary; oxygen delivery as a function distinct from whole blood | Vet hub; Oxyglobin cornerstone; Blood Bank; Dog; Cat; Equine; Emergency | **PLANNED — P1 pillar** |
| P1 | `/veterinary/dog-canine-blood-transfusion.html` | dog blood transfusion | canine blood transfusion; blood transfusion for dogs; dog blood donor; dog blood bank; canine anemia; dog hemorrhage; DEA 1; dog crossmatch; dog surgery transfusion | Oxyglobin dog; Oxyglobin canine; Oxyglobin canine anemia; regulatory history | BHOC dog; BHOC canine; canine oxygen carrier; veterinary HBOC | Transfusion pillar; Oxyglobin cornerstone; Blood Bank; Emergency; Surgery; FDA/EMA | **PLANNED — P1** |
| P1 | `/veterinary/cat-feline-blood-transfusion.html` | cat blood transfusion | feline blood transfusion; blood transfusion for cats; cat blood donor; cat blood bank; feline anemia; cat blood types; feline crossmatch; feline donor shortage; cat xenotransfusion | Oxyglobin cat / feline only as historical or published off-label evidence, clearly labelled | BHOC cat; BHOC feline; feline oxygen carrier; donor-independent oxygen-carrying research | Transfusion pillar; Blood Bank; Oxyglobin cornerstone; Emergency; Surgery; publication evidence | **PLANNED — P1** |
| P1 | `/veterinary/animal-blood-bank-donor-blood-shortage.html` | animal blood bank | veterinary blood bank; pet blood bank; veterinary blood shortage; donor blood availability; animal blood supply; veterinary blood logistics; storage; blood inventory; backorder | Explain why historical oxygen-carrier research was clinically interesting when blood access is constrained | BHOC veterinary; oxygen-carrying bridge research; donor-independent oxygen delivery without implying replacement of blood functions | Transfusion pillar; Dog; Cat; Equine; Emergency; Oxyglobin cornerstone | **PLANNED — P1** |
| P1 | `/veterinary/horse-equine-blood-transfusion.html` | horse blood transfusion | equine blood transfusion; equine blood donor; horse blood typing; equine crossmatch; horse hemorrhage; equine severe anemia; colic surgery transfusion; mare postpartum hemorrhage; uterine artery rupture | Oxyglobin/equine evidence only where supported by published literature; avoid performance positioning | BHOC equine; equine oxygen carrier; emergency oxygen delivery horse | Transfusion pillar; Emergency; Surgery; Blood Bank; Oxyglobin cornerstone; evidence catalogue | **PLANNED — P1/P2** |
| P2 | `/veterinary/veterinary-emergency-trauma-hemorrhage.html` | veterinary emergency blood transfusion | veterinary trauma transfusion; animal hemorrhagic shock; acute blood loss; emergency donor blood; pet trauma; wildlife trauma; critical care | Oxyglobin emergency / oxygen-carrying support historical context | BHOC emergency veterinary; tissue oxygen delivery; Precision Oxygenation Therapeutics | Transfusion pillar; Blood Bank; Dog; Cat; Equine; Wildlife; Oxyglobin cornerstone | **PLANNED — P2** |
| P2 | `/veterinary/veterinary-surgery-blood-transfusion.html` | veterinary surgery blood transfusion | perioperative transfusion veterinary; operative blood loss; intraoperative hemorrhage; veterinary cell salvage; autotransfusion; dog surgery; cat surgery; equine surgery | Oxyglobin surgical/perioperative evidence where supported | BHOC perioperative oxygen delivery; veterinary oxygen carrier research | Transfusion pillar; Dog; Cat; Equine; Oncology; Oxyglobin cornerstone | **PLANNED — P2** |
| P2 | `/veterinary/veterinary-oncology-blood-transfusion.html` | veterinary oncology blood transfusion | dog cancer blood transfusion; canine oncology transfusion; feline oncology transfusion; hemangiosarcoma transfusion; splenic tumor hemorrhage; cancer surgery blood loss; cancer-associated anemia | Historical oxygen-carrier context only; no claim that Oxyglobin/BHOC treats cancer | BHOC veterinary oncology research; oxygen delivery in anemia/hemorrhage; never “BHOC treats cancer” | Surgery; Dog; Cat; Transfusion pillar; Oxyglobin cornerstone; evidence sources | **PLANNED — P2** |
| P2 | `/veterinary/wildlife-zoo-blood-transfusion.html` | wildlife blood transfusion | zoo animal blood transfusion; wildlife donor blood; wildlife trauma; wildlife rescue; zoological emergency medicine; wild animal anemia | Oxyglobin wildlife / zoo / exotic evidence only when directly source-supported | BHOC wildlife; zoo animal oxygen carrier; donor-independent oxygen-carrier research | Transfusion pillar; Exotic; Avian; Emergency; Oxyglobin cornerstone; evidence catalogue | **PLANNED — P2** |
| P2 | `/veterinary/exotic-animal-blood-transfusion.html` | exotic animal blood transfusion | exotic pet blood transfusion; rabbit transfusion; ferret transfusion; exotic animal anemia; exotic donor blood; exotic emergency medicine | Oxyglobin exotic animal research/history with species-specific qualification | BHOC exotic animals; exotic veterinary oxygen carrier | Wildlife; Avian; Transfusion pillar; Emergency; Oxyglobin cornerstone | **PLANNED — P2** |
| P2 | `/veterinary/avian-falcon-blood-transfusion.html` | avian blood transfusion | bird blood transfusion; falcon blood transfusion; parrot blood transfusion; raptor transfusion; eagle transfusion; avian anemia; avian donor blood; falcon emergency veterinary | Oxyglobin avian evidence only where directly supported; no approved-use implication | BHOC avian; BHOC falcon; avian oxygen carrier research | Wildlife; Exotic; Transfusion pillar; Emergency; Oxyglobin cornerstone | **PLANNED — P2 / MENA strategic** |
| P3 | `/veterinary/camel-camelid-blood-transfusion.html` | camelid blood transfusion | camel blood transfusion; dromedary transfusion; camel donor blood; alpaca blood transfusion; llama transfusion; camelid blood bank; camelid anemia | Oxyglobin/HBOC only if source-supported; otherwise link at category level, not species claim | BHOC camel; BHOC camelid; camelid oxygen carrier research | Transfusion pillar; Blood Bank; Emergency; Oxyglobin cornerstone; evidence catalogue | **PLANNED — P3 / MENA strategic** |

### Intent ownership and cannibalization rules

1. **Oxyglobin combined regulatory intent** belongs to `Vet-fda-ema.html`; `Vet-FDA-registry.html` and `Vet-EMA-approvals-summary.html` own jurisdiction-specific detailed source summaries and should link back to the hub rather than duplicate one another.
2. **Oxyglobin bibliography intent** belongs to `publication-catalogue.html` and `Vet-search.html`; `Vet-03-publication-BHOC-Oxyglobin.html` is a concise gateway into those tools and must not repeat their lists or keyword indexes.
3. **Oxyglobin overview / bridge intent** belongs to the planned cornerstone `oxyglobin-veterinary-hboc-bhoc.html`.
4. **Broad veterinary transfusion intent** belongs to the planned `veterinary-blood-transfusion.html`, not to `Vet-index.html`.
5. Species pages own species-specific transfusion intent. They should link to, not duplicate, the broad transfusion and blood-bank explanations.
6. Blood-bank / shortage content owns supply, donor, storage and logistics intent; species pages may summarize those issues and link back.
7. Surgery, oncology and emergency pages own clinical-context intent and must not repeat full species primers.
8. Wildlife, exotic, avian/falcon and camelid pages must distinguish published evidence, extrapolation and research hypotheses by species.
9. Historical search terms such as **blood substitute** may appear where useful for retrieval, but visible copy must explain that an HBOC does not reproduce all functions of blood.
10. No new page is marked READY until it has a unique title/H1, evidence set, source-qualified claims, Oxyglobin/BHOC bridge, internal-link plan and no unresolved overlap with an existing canonical page.

### Stage 1 build order

1. `oxyglobin-veterinary-hboc-bhoc.html` — cornerstone.
2. `veterinary-blood-transfusion.html` — broad demand pillar.
3. `cat-feline-blood-transfusion.html` — feline donor-availability cluster.
4. `dog-canine-blood-transfusion.html` — canine transfusion / Oxyglobin cluster.
5. `animal-blood-bank-donor-blood-shortage.html` — supply/logistics pillar.
6. `horse-equine-blood-transfusion.html` — equine emergency/surgery cluster.
7. Recheck indexation, search visibility, internal-link coverage and cannibalization before opening P2 pages.


## Implementation rules

Every indexable page must have:

1. One unique descriptive `<title>`.
2. One unique H1 aligned with the page’s primary intent.
3. A useful meta description written for the search result, not a list of keywords.
4. A self-referencing canonical URL.
5. Open Graph and large-image social metadata.
6. One appropriate Schema.org page or dataset type and breadcrumbs where relevant.
7. Crawlable internal links using descriptive anchors.
8. Inclusion in `sitemap.xml` only when the page is canonical and indexable.
9. Evidence-qualified language and links to original sources wherever available.

Redirect-only HTML files remain `noindex,follow` and point to their canonical destination. Filter and query states remain canonical to the base publication-search page.

Metadata and sitemap output are maintained by:

```sh
node scripts/apply_seo_metadata.cjs
node scripts/apply_seo_metadata.cjs --check
```
