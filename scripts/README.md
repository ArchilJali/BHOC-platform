# Evidence hub maintenance

The published website is static HTML, CSS and JavaScript. No runtime package installation or third-party JavaScript is required by the publication explorer.

## Checks

```sh
node --test tests/publications.test.cjs
node --check assets/publications.js
python3 scripts/check_links.py
node scripts/apply_seo_metadata.cjs --check
```

The GitHub workflow runs these checks for pull requests and pushes to main. Browser interaction and visual tests are separate; they were not completed for the initial redesign because browser access was not permitted in the editing session.

## Bibliographic data

`veterinary/Vet-publications.json` preserves all 236 source bibliography entries. Indexed metadata was retrieved from the Europe PMC REST API (`SRC:MED`, `resultType:core`) on 2026-08-28. Matching compared normalised titles, first authors, and publication year. Title similarity was at least 0.91 and publication years within one year for automatic matches. Seven additional matches were manually reviewed; their IDs are in `veterinary/metadata-audit.json`.

Each matched record retains its PubMed ID, DOI if supplied by the index, source title and authors, source URL, check date, and the indexed affiliation text (email addresses omitted). The original title and author fields are preserved. If the indexed publication year differs, the supplied year is kept in `supplied_year`.

Institution labels are assigned only when an explicit alias in `institution_aliases.json` is present in the indexed affiliation text. They are not inferred from an author's identity, a current employer, a paper's topic, or a funding statement. Institution counts are counts of papers, not claims of institutional partnership, trial-site participation, endorsement, or regulatory approval. Several labels may apply to one paper. Unassigned records are grouped under the last directory option, **Other / institution not identified**.

Species labels are based on indexed MeSH headings and explicit title words. This is a discoverability aid, not a verified study-design classification. Background literature remains in the bibliography. Do not label all entries as product-efficacy studies or all records as independently verified peer-reviewed evidence.

When editing citations, update the coverage audit, accessible HTML catalogue and methodology page as needed. The regression checks contain the verified baseline counts and should be changed only after intentional, documented data updates.

## HTML and Markdown

GitHub-readable Markdown notes are retained. Their explicit HTML counterparts are the website presentation. `_config.yml` excludes the Markdown copies from Jekyll output to prevent filename collisions and inconsistent automatic styling. Update both formats together. Original raw notes remain accessible through GitHub.

The project sitemap is regenerated from the canonical page map. The repository also exposes a project-level `robots.txt` for direct discovery, but GitHub Pages serves host-level crawler rules from `archiljali.github.io/robots.txt`; the project file cannot override that host-level policy.

## SEO metadata

Canonical titles, descriptions, page-level keyword taxonomy, social previews, favicons and breadcrumb structured data are defined in `seo/page-metadata.json`. Run `node scripts/apply_seo_metadata.cjs` after changing that file or adding a canonical page. The same command regenerates `sitemap.xml`; `--check` verifies that the checked-in HTML and sitemap remain synchronized.

The keywords meta tag is retained as an internal taxonomy and for non-Google consumers. Google ranking intent is expressed through unique titles, H1 headings, visible source-backed content, descriptive internal links and canonical page separation rather than keyword repetition.

## Regulatory sources

The new regulatory page uses direct original and supplemental FDA documents and the correct 18 October 2021 European Commission amendment. The attachment's purported current FDA product-list link was excluded after its downloaded file was found to be an unrelated FOIA request log. The archived detailed FDA/EMA notes are preserved with a notice that not every clinical/numerical statement was revalidated. These are historical reference materials, not prescribing guidance.

## Veterinary overview

Run `node scripts/build_veterinary_overview.cjs` after changing publication data or overview content. This generates the hub, the GitHub directory README, the section guide and `overview-statistics.json`. `node scripts/build_veterinary_overview.cjs --check` fails when the checked-in overview is stale.

The ten displayed species/model groups and the publication explorer share `speciesGroups` and `matchesSpecies` in `assets/publications-core.js`. Composite groups count unique records within a group; records can still appear in several groups. Journal counts are explicitly unnormalised journal labels, not unique journals. Author suggestions are extracted from the recorded author lists. Institution labels describe author affiliations, not necessarily study sites.

The clinical highlight cites the original FDA FOI summary: 64 dogs; intent-to-treat success 22/30 versus 10/34; endpoint was no additional oxygen-carrying support for 24 hours, not survival. Adverse reactions are disclosed. Do not substitute the per-protocol 95% figure or broaden the product/species scope.

## Source provenance continuation

The 28 August continuation identified 13 of the 14 previously unresolved citations: three additional PubMed records and ten publisher/DOI records. `metadata_status: matched` now means identified original citation, not necessarily PubMed indexing. `pubmed_citations` and `publisher_only_citations` distinguish these in the audit. The original 1991 Giger abstract remains unresolved; its review citation is explicitly secondary.

`affiliation_source_url` records a separately consulted article affiliation source. `study_sites` contains a separate institution, location, source URL, locator, evidence note and check date; no site is inferred from an affiliation. Only one record currently has explicit site evidence. `provenance-review.json` lists the reviewed records and remaining limits. Four false Porcine labels on guinea-pig records were removed.

After data edits run `node scripts/build_source_pages.cjs` followed by `node scripts/build_veterinary_overview.cjs`. Both scripts accept `--check`, and CI checks their generated pages for drift.
