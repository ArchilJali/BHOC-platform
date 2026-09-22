(() => {
  "use strict";

  const explorer = document.querySelector("[data-oxyglobin-explorer]");
  if (!explorer) return;

  const controls = {
    search: document.getElementById("case-search"),
    section: document.getElementById("case-section"),
    treatment: document.getElementById("case-treatment"),
    outcome: document.getElementById("case-outcome"),
    dose: document.getElementById("case-dose"),
    sort: document.getElementById("case-sort"),
    reset: document.getElementById("case-reset"),
    loadMore: document.getElementById("case-load-more")
  };
  const results = document.getElementById("case-results");
  const count = document.getElementById("case-results-count");
  const status = document.getElementById("case-status");
  const sourcePath = explorer.dataset.caseData;
  const pageSize = 24;

  let allCases = [];
  let filteredCases = [];
  let visibleLimit = pageSize;

  const normalized = value => String(value ?? "").toLocaleLowerCase().replace(/\s+/g, " ").trim();
  const reported = (value, suffix = "") => value === null || value === undefined || value === "" ? "Not reported" : `${value}${suffix}`;

  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function addDefinition(list, term, value, className = "") {
    const item = makeElement("div", `case-field${className ? ` ${className}` : ""}`);
    item.append(makeElement("dt", "", term), makeElement("dd", "", value));
    list.append(item);
  }

  function outcomeClass(value) {
    if (value === "Died") return "outcome-died";
    if (value === "Survived") return "outcome-survived";
    return "outcome-na";
  }

  function formatBags(value) {
    if (!value) return "Not reported";
    if (value === "<1") return "Less than one 125 mL bag";
    const number = Number(value);
    return `${value} × 125 mL ${number === 1 ? "bag" : "bags"}`;
  }

  function formatPcv(caseRecord) {
    const before = caseRecord.pcv_pre_percent;
    const after = caseRecord.pcv_post_percent;
    if (before == null && after == null) return "Not reported";
    return `Pre: ${reported(before, "%")} · Post: ${reported(after, "%")}`;
  }

  function treatmentGroup(sequence) {
    if (sequence === "Oxyglobin only") return "only";
    if (normalized(sequence).includes("packed")) return "packed";
    if (normalized(sequence).includes("whole blood")) return "whole";
    return "other";
  }

  function searchableText(caseRecord) {
    return normalized([
      caseRecord.id,
      caseRecord.booklet_section,
      caseRecord.diagnosis,
      caseRecord.treatment_sequence,
      caseRecord.outcome_24h,
      caseRecord.outcome_72h,
      caseRecord.later_follow_up,
      caseRecord.reported_dose_ml_kg,
      caseRecord.oxyglobin_125ml_bags
    ].join(" "));
  }

  function buildCaseCard(caseRecord) {
    const card = makeElement("details", "case-card");
    card.id = caseRecord.id;

    const summary = makeElement("summary", "case-card-summary");
    const headingWrap = makeElement("span", "case-heading");
    const meta = makeElement(
      "span",
      "case-source-line",
      `${caseRecord.id} · ${caseRecord.booklet_section} · booklet case page ${caseRecord.source.booklet_case_page}`
    );
    const heading = makeElement("span", "case-diagnosis", caseRecord.diagnosis);
    const chips = makeElement("span", "case-chips");
    chips.append(
      makeElement("span", "case-chip", caseRecord.treatment_sequence || "Sequence not reported"),
      makeElement("span", `case-chip ${outcomeClass(caseRecord.outcome_72h)}`, `72 h: ${reported(caseRecord.outcome_72h)}`)
    );
    headingWrap.append(meta, heading, chips);
    summary.append(headingWrap, makeElement("span", "case-open-label", "View record"));

    const body = makeElement("div", "case-card-body");
    const columns = makeElement("div", "case-detail-grid");

    const scenario = makeElement("section", "case-detail");
    scenario.append(makeElement("h3", "", "What was reported"));
    const scenarioList = makeElement("dl", "case-fields");
    addDefinition(scenarioList, "Clinical situation", caseRecord.diagnosis);
    addDefinition(scenarioList, "Booklet section", caseRecord.booklet_section);
    addDefinition(scenarioList, "Reported weight", reported(caseRecord.weight_lb, " lb"));
    addDefinition(scenarioList, "PCV", formatPcv(caseRecord));
    scenario.append(scenarioList);

    const treatment = makeElement("section", "case-detail");
    treatment.append(makeElement("h3", "", "What was done"));
    const treatmentList = makeElement("dl", "case-fields");
    addDefinition(treatmentList, "Treatment sequence", reported(caseRecord.treatment_sequence));
    addDefinition(treatmentList, "Oxyglobin amount", formatBags(caseRecord.oxyglobin_125ml_bags));
    addDefinition(treatmentList, "Reported dose", reported(caseRecord.reported_dose_ml_kg, " mL/kg"));
    addDefinition(treatmentList, "Administration route", "Not stated in the individual case form");
    treatment.append(treatmentList);

    const outcome = makeElement("section", "case-detail");
    outcome.append(makeElement("h3", "", "What happened"));
    const outcomeList = makeElement("dl", "case-fields");
    addDefinition(outcomeList, "24-hour field", reported(caseRecord.outcome_24h), outcomeClass(caseRecord.outcome_24h));
    addDefinition(outcomeList, "72-hour field", reported(caseRecord.outcome_72h), outcomeClass(caseRecord.outcome_72h));
    addDefinition(
      outcomeList,
      "Later follow-up",
      caseRecord.later_follow_up || "No later outcome was extracted beyond the printed status fields."
    );
    outcome.append(outcomeList);

    columns.append(scenario, treatment, outcome);

    const footer = makeElement("div", "case-record-footer");
    footer.append(
      makeElement("p", "", `Source locator: PDF page ${caseRecord.source.pdf_page}, booklet case page ${caseRecord.source.booklet_case_page}, record ${caseRecord.source.position_on_page} on page.`)
    );
    const anchor = makeElement("a", "case-anchor", "Link to this record");
    anchor.href = `#${caseRecord.id}`;
    footer.append(anchor);
    body.append(columns, footer);
    card.append(summary, body);
    return card;
  }

  function currentFilters() {
    return {
      query: normalized(controls.search.value),
      section: controls.section.value,
      treatment: controls.treatment.value,
      outcome: controls.outcome.value,
      dose: controls.dose.value,
      sort: controls.sort.value
    };
  }

  function matchesOutcome(caseRecord, selected) {
    if (!selected) return true;
    if (selected === "later-adverse") return Boolean(caseRecord.later_follow_up);
    return caseRecord.outcome_72h === selected;
  }

  function sortCases(cases, selected) {
    const sorted = [...cases];
    if (selected === "diagnosis") {
      sorted.sort((a, b) => a.diagnosis.localeCompare(b.diagnosis) || a.id.localeCompare(b.id));
    } else if (selected === "dose-desc") {
      sorted.sort((a, b) => (b.reported_dose_ml_kg ?? -1) - (a.reported_dose_ml_kg ?? -1) || a.id.localeCompare(b.id));
    }
    return sorted;
  }

  function applyFilters({ preserveLimit = false } = {}) {
    const selected = currentFilters();
    if (!preserveLimit) visibleLimit = pageSize;

    filteredCases = allCases.filter(caseRecord => {
      if (selected.query && !searchableText(caseRecord).includes(selected.query)) return false;
      if (selected.section && caseRecord.booklet_section !== selected.section) return false;
      if (selected.treatment && treatmentGroup(caseRecord.treatment_sequence) !== selected.treatment) return false;
      if (!matchesOutcome(caseRecord, selected.outcome)) return false;
      if (selected.dose === "reported" && caseRecord.reported_dose_ml_kg == null) return false;
      if (selected.dose === "missing" && caseRecord.reported_dose_ml_kg != null) return false;
      return true;
    });
    filteredCases = sortCases(filteredCases, selected.sort);
    renderResults();
  }

  function renderResults() {
    results.replaceChildren();
    const visible = filteredCases.slice(0, visibleLimit);

    if (!visible.length) {
      const empty = makeElement("div", "case-empty");
      empty.append(
        makeElement("h2", "", "No matching records"),
        makeElement("p", "", "Try a broader search or clear one of the filters.")
      );
      results.append(empty);
    } else {
      const fragment = document.createDocumentFragment();
      visible.forEach(caseRecord => fragment.append(buildCaseCard(caseRecord)));
      results.append(fragment);
    }

    const noun = filteredCases.length === 1 ? "record" : "records";
    count.textContent = `${filteredCases.length} ${noun}`;
    status.textContent = visible.length < filteredCases.length
      ? `Showing ${visible.length} of ${filteredCases.length} matching records.`
      : `Showing all ${filteredCases.length} matching records.`;
    controls.loadMore.hidden = visible.length >= filteredCases.length;
    if (!controls.loadMore.hidden) {
      controls.loadMore.textContent = `Show ${Math.min(pageSize, filteredCases.length - visible.length)} more`;
    }
  }

  function resetFilters() {
    controls.search.value = "";
    controls.section.value = "";
    controls.treatment.value = "";
    controls.outcome.value = "";
    controls.dose.value = "";
    controls.sort.value = "source";
    applyFilters();
    controls.search.focus();
  }

  function openHashRecord() {
    const id = window.location.hash.slice(1).toUpperCase();
    if (!id) return;
    const index = filteredCases.findIndex(caseRecord => caseRecord.id === id);
    if (index < 0) return;
    if (index >= visibleLimit) {
      visibleLimit = index + 1;
      renderResults();
    }
    requestAnimationFrame(() => {
      const card = document.getElementById(id);
      if (!card) return;
      card.open = true;
      card.scrollIntoView({ block: "start" });
    });
  }

  async function initialise() {
    try {
      const response = await fetch(sourcePath);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      allCases = Array.isArray(payload.cases) ? payload.cases : [];
      if (allCases.length !== 146) throw new Error("The case index is incomplete");
      applyFilters();
      openHashRecord();
    } catch (error) {
      count.textContent = "Case index unavailable";
      status.textContent = "The structured case data could not be loaded.";
      const failure = makeElement("div", "case-empty");
      failure.append(
        makeElement("h2", "", "The case index did not load"),
        makeElement("p", "", "Please reload the page. The archive review remains available from the link above.")
      );
      results.replaceChildren(failure);
      console.error("Oxyglobin case explorer:", error);
    }
  }

  [controls.search, controls.section, controls.treatment, controls.outcome, controls.dose, controls.sort]
    .forEach(control => control.addEventListener(control === controls.search ? "input" : "change", () => applyFilters()));
  controls.reset.addEventListener("click", resetFilters);
  controls.loadMore.addEventListener("click", () => {
    visibleLimit += pageSize;
    renderResults();
  });
  window.addEventListener("hashchange", openHashRecord);

  initialise();
})();
