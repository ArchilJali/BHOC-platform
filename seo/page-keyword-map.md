# BHOC Evidence Platform SEO Architecture

Updated: 30 August 2026

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
| `/veterinary/publication-catalogue.html` | Oxyglobin and veterinary HBOC catalogue | bibliography; publications; journals; institutions; PubMed; DOI |
| `/veterinary/publication-methodology.html` | veterinary evidence methodology | provenance; author affiliations; study locations; species classification; evidence limits |
| `/veterinary/Vet-fda-ema.html` | Oxyglobin FDA and EMA records | veterinary regulation; NADA 141-067; canine anemia; European authorization |
| `/transplant/Transplant-index.html` | oxygen carriers in transplantation | organ perfusion; machine perfusion; organ preservation; ischemia reperfusion; liver; kidney; heart |
| `/transplant/Transplant-search.html` | transplant publication search | organ; evidence group; institution; author; journal; year; HBOC-201 |
| `/human/BHOC-Human-index.html` | human-use oxygen carrier evidence | HBOC-201; Hemopure; severe anemia; hemorrhage; trauma; surgery; emergency oxygenation |
| `/human/BHOC-Human-search.html` | human-use publication search | clinical evidence; translational evidence; institution; author; journal; year |
| `/human/BHOC-Human-fda-expanded-access.html` | HBOC-201 FDA expanded access | emergency IND; single-patient IND; NCT01881503; severe anemia; regulatory evidence |
| `/science/` | BHOC scientific publications | oxygen carrier evidence; oxygen delivery research; hemoglobin physiology; transfusion research |
| `/science/oxygen-delivery-potency.html` | oxygen delivery potency of blood products | L-TOF; fresh blood; stored red blood cells; hemoglobin oxygen carriers; oxygen transport |
| `/historical-sources/` | HBOC historical sources | Biopure; Hemopure history; Oxyglobin history; primary documents; oxygen therapeutics history |
| `/historical-sources/biopure-standing-on-the-shoulders-of-giants/` | Biopure history | Carl W. Rausch; HBOC history; biologics manufacturing; institutional history |
| `/social-media/linkedin/` | BHOC LinkedIn publications | Archil Jaliashvili; oxygen delivery; transfusion; emergency medicine; transplantation; veterinary medicine |

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
