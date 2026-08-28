# Website and evidence catalogue review — 28 August 2026

Prepared against upstream commit `0f675216d73c2d799952bf04fe1ed1cc42a5016d`.

## Changes

- Preserve GitHub Pages and existing URLs. Add explicit HTML entry pages for Science, LinkedIn resources and the veterinary directory.
- Repair local paths and table-of-contents links. Unwritten business sections are marked as not provided, rather than linked to nonexistent anchors.
- Replace the unpaginated search and fabricated fallback references with a static, indexable catalogue enhanced by client-side search, filters, sorting and pagination. It remains readable without JavaScript.
- Preserve 238 supplied Excel rows and four unmatched legacy records (242 catalogue entries, not a claim of 242 unique studies). Legacy-only entries require bibliographic verification.
- Recover 37 DOI links from supplied citations or article first pages. They are original identifiers, but not all DOI destinations have been individually resolved.
- Identify 48 institutions across 33 papers using the supplied QEP full text. This is partial coverage. Names reflect author affiliations, not endorsement, research sponsorship or BHOC partnerships. Some papers have additional affiliations still to be catalogued.
- Add 10 full-text-checked short descriptions. Other descriptions state catalogue scope, not an asserted study outcome.
- Restore distinct FDA original and supplemental FOI links, and the October 2021 European Commission decision from the supplied Pages file.
- Provide readable HTML source notes and a document index with explicit PDF availability states.

## Verification

- `python3 scripts/check_site.py`: local HTML links, anchors, IDs, record uniqueness, data provenance and safe URL schemes.
- `node --check assets/publications.js`: JavaScript syntax.
- `node scripts/test_search.cjs`: DOM-adapter functional tests for filters, institution aliases, combined queries, pagination, URL state, reset, empty states and fragment navigation.
- Original FDA FOI, supplemental FDA FOI and the October 2021 Commission decision opened through web retrieval. EMA's product landing page returned HTTP 429 during the review.
- No real-browser visual or accessibility audit was completed: the available Playwright package has no installed browser executable. DOM-adapter tests are not browser rendering tests.

## Source files used

- `HBOC Publications.xlsx`, worksheet `HBOC Publications`: 238 nonempty titled rows. Record source row numbers are retained in JSON.
- `QEP References Combined 2.pdf`: 507 pages, about 72 MB. Full text used for selected affiliations, summaries and DOI recovery; PDF-page references are retained per enriched record.
- `Regulatory Approvals for Oxyglobin .pages`: embedded links extracted from the Pages archive, and preview inspected.

## Remaining work / rollout

- Review desktop and mobile rendering before merging.
- Verify the four legacy-only records; deduplicate only after bibliographic confirmation.
- Complete affiliation and original-link recovery for remaining studies. Search does not claim exhaustive institution coverage.
- Review source category and study-type labels. The original workbook labels are retained even where inconsistent; animal models are not automatically evidence for veterinary clinical approval.
- Individual paper PDFs and the 72 MB QEP compilation are not published in this change. Choose the document hosting location and confirm public redistribution rights before publishing full-text collections. No annual reports have been provided.
- Preserve current main until the proposed changes are reviewed. No deployment is claimed by these notes.
- This is not a full medical, regulatory or business-claim audit. Existing detailed strategy and source-note content needs separate expert review.

## Maintenance

The site is static HTML/CSS/JavaScript; GitHub Pages needs no new package or build service.

- Edit `veterinary/Vet-publications.json`, then run `python3 scripts/build_site.py` to regenerate the catalogue, institution directory and veterinary hub.
- To reimport a spreadsheet, use `python3 scripts/import_publications.py /path/to/workbook.xlsx` (requires openpyxl). Curated enrichments are kept in `data/publication-enrichment.json`; the original legacy catalogue remains in `data/legacy-publications.json` for reconciliation.
- Add a verified `pdf_url` to a publication only when that file is available. Keep article summaries, source notes and downloadable files distinct.
- Source-note HTML and Markdown are paired documents: update both when changing their content.


## Follow-up: separate Biopure annual report pages

- Added independent 2001 and 2002 English summaries, each with a corresponding original PDF and cover image. PDFs are byte-identical to the supplied uploads.
- Source links cite PDF page numbers; cumulative sales are not patient counts. FDA acceptance for review is not approval, and the Saxon case is described as a testimonial rather than trial evidence.
- Added unique titles, descriptions, canonical URLs, Article/Report structured data, Open Graph and Twitter metadata, descriptive image alt text, contextual keywords and sitemap entries. Archil Jaliashvili is identified with the BHOC commentary; Carl W. Rausch with his historical Biopure role.
- Annual report files are now supplied and included; earlier notes about missing annual reports are superseded. The QEP collection and individual research PDFs remain unpublished.
- After regenerating the catalogue with `scripts/build_site.py`, run `python3 scripts/build_reports.py` to restore report entry points and the sitemap.
- Local link check now covers 19 HTML pages and 703 links. SEO markup is technical preparation, not a promise of indexing or ranking. Real-browser visual verification remains pending.
