#!/usr/bin/env python3
"""Extract the 146 printed case forms from OCR text of Case Listing Book II.

The output intentionally excludes clinician, clinic, city, patient name and the
free-text source narrative. It is a transcription aid, not an OCR authority:
unclear or absent values remain null and must not be inferred.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


PAGE_GROUPS = (
    (range(10, 33), "BL", "Blood loss"),
    (range(34, 43), "HM", "Hemolysis"),
    (range(44, 49), "IE", "Ineffective erythropoiesis"),
)

# Corrections are limited to values that were checked against the page image.
# They repair OCR loss; they do not fill fields that are blank in the source.
VERIFIED_OVERRIDES = {
    "BL-021": {"pcv_pre_percent": 4, "pcv_post_percent": 4, "reported_dose_ml_kg": 4},
    "BL-024": {"pcv_pre_percent": 53, "pcv_post_percent": 40, "reported_dose_ml_kg": 21},
    "BL-058": {"outcome_24h": "Survived"},
    "HM-008": {"outcome_72h": "Survived"},
}

LATER_FOLLOW_UP = {
    "BL-006": "Little or no improvement was reported; the 72-hour field records death.",
    "BL-008": "Later euthanized after PCV fell again and fever developed.",
    "BL-068": "Died suddenly at home after three postoperative days; the report suspected an embolus.",
    "HM-007": "The report attributed death to emboli.",
    "HM-008": "Died 4.5 days after infusion; no response to steroid therapy was reported.",
    "HM-029": "Severe hemolysis was reported the next morning; PCV fell to 2.1%, and euthanasia was elected.",
    "HM-030": "Euthanasia was elected about 36 hours later because of poor response to medication.",
    "IE-001": "Died 4.5 days after infusion; no response to steroid therapy was reported.",
    "IE-003": "Died 3.5 days after infusion; no response to medication was reported.",
    "IE-004": "A second bag and 250 mL whole blood were reported at 72 hours; outlook remained grave.",
    "IE-005": "Extensive neoplastic involvement was found during exploration, and euthanasia was authorized.",
    "IE-008": "Multiple liver growths were found during laparotomy, and euthanasia was performed.",
    "IE-016": "Initial improvement was reported, followed by death associated with chronic renal failure.",
    "IE-017": "Died several weeks later from other reported complications.",
    "IE-018": "Poor response and persistent weakness were reported; euthanasia was requested.",
}

SEQUENCES = (
    (r"pRBCs followed by Oxyglobin", "Packed RBCs followed by Oxyglobin"),
    (r"Whole blood followed by Oxyglobin", "Whole blood followed by Oxyglobin"),
    (r"Oxyglobin followed by whole blood", "Oxyglobin followed by whole blood"),
    (r"Oxyglobin followed by pRBCs", "Oxyglobin followed by packed RBCs"),
    (r"Oxyglobin followed by blood", "Oxyglobin followed by whole blood"),
    (r"Oxyglobin ONLY", "Oxyglobin only"),
)


def clean_space(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def parse_number(value: str) -> float | int | None:
    value = value.replace("O", "0").replace("o", "0")
    match = re.search(r"\d+(?:\.\d+)?", value)
    if not match:
        return None
    number = float(match.group())
    return int(number) if number.is_integer() else number


def parse_outcome(lines: list[str], hours: int) -> str | None:
    token = re.compile(rf"{hours}\s*hrs?\)?\s*(Survived|Died|NA)\b", re.I)
    for line in lines:
        match = token.search(line)
        if match:
            found = match.group(1).upper()
            return {"SURVIVED": "Survived", "DIED": "Died", "NA": "Not available"}[found]
    return None


def parse_pcv(lines: list[str]) -> tuple[float | int | None, float | int | None]:
    for line in lines:
        if not re.match(r"PCV:", line.lstrip(), re.I):
            continue
        value = re.split(r"PCV:", line, maxsplit=1, flags=re.I)[1].split("%", 1)[0]
        parts = value.split("/", 1)
        pre = parse_number(parts[0]) if parts else None
        post = parse_number(parts[1]) if len(parts) == 2 else None
        return pre, post
    return None, None


def parse_sequence(lines: list[str]) -> str | None:
    text = " ".join(lines[:4])
    for pattern, label in SEQUENCES:
        if re.search(pattern, text, re.I):
            return label
    return None


def parse_weight(lines: list[str]) -> float | int | None:
    text = " ".join(lines[:4])
    match = re.search(r"(?:^|\s)(\d{1,3})[°’']?\s*(?:Ibs|ibs|lbs|tbs|ips)\b", text)
    return parse_number(match.group(1)) if match else None


def parse_bags(lines: list[str]) -> str | None:
    text = " ".join(lines[:4])
    match = re.search(r"(<\s*1|[1-9])\s*[-~]\s*125\s*mL\s*bag", text, re.I)
    if not match:
        return None
    return "<1" if "<" in match.group(1) else match.group(1).strip()


def parse_dose(lines: list[str]) -> float | int | None:
    for line in lines:
        if not re.search(r"24\s*hrs?", line, re.I):
            continue
        before_scale = line.split("0 10 20 30", 1)[0]
        match = re.search(r"(\d+(?:\.\d+)?)[°’']?\s*(?:mL|mU|mu)[ /]?k?g", before_scale, re.I)
        return parse_number(match.group(1)) if match else None
    return None


def extract_narrative(lines: list[str]) -> str:
    start = None
    for index, line in enumerate(lines):
        if "Case Outcome Summary:" in line:
            start = index + 1
            break
    return clean_space(" ".join(lines[start:])) if start is not None else ""


def split_page(text: str) -> tuple[int, list[tuple[str, list[str], str]]]:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    marker_indexes = [
        index
        for index, line in enumerate(lines)
        if re.search(r"Pre\s*/?\s*Post Oxyglobin:", line, re.I)
    ]
    page_match = re.search(r"Page\s+(\d+)\s+of\s+37", text, re.I)
    booklet_page = int(page_match.group(1)) if page_match else 0
    records = []
    for case_index, marker_index in enumerate(marker_indexes):
        diagnosis = clean_space(lines[marker_index - 2])
        end = marker_indexes[case_index + 1] - 2 if case_index + 1 < len(marker_indexes) else len(lines)
        block = lines[marker_index + 1 : end]
        if case_index + 1 == len(marker_indexes):
            block = [line for line in block if not re.search(r"Page\s+\d+\s+of\s+37", line, re.I)]
            block = [line for line in block if not line.startswith("For full prescribing information")]
        records.append((diagnosis, block, extract_narrative(block)))
    return booklet_page, records


def build_cases(ocr_dir: Path) -> list[dict]:
    cases: list[dict] = []
    section_counts: dict[str, int] = {"BL": 0, "HM": 0, "IE": 0}
    for pages, prefix, section in PAGE_GROUPS:
        for pdf_page in pages:
            source = ocr_dir / f"page-{pdf_page:02d}.txt"
            booklet_page, page_records = split_page(source.read_text(encoding="utf-8"))
            if not booklet_page:
                if pdf_page <= 32:
                    booklet_page = pdf_page - 9
                elif pdf_page <= 42:
                    booklet_page = pdf_page - 10
                else:
                    booklet_page = pdf_page - 11
            for position, (diagnosis, block, narrative) in enumerate(page_records, start=1):
                section_counts[prefix] += 1
                pre_pcv, post_pcv = parse_pcv(block)
                cases.append(
                    {
                        "id": f"{prefix}-{section_counts[prefix]:03d}",
                        "booklet_section": section,
                        "diagnosis": diagnosis,
                        "treatment_sequence": parse_sequence(block),
                        "weight_lb": parse_weight(block),
                        "oxyglobin_125ml_bags": parse_bags(block),
                        "reported_dose_ml_kg": parse_dose(block),
                        "administration_route": None,
                        "pcv_pre_percent": pre_pcv,
                        "pcv_post_percent": post_pcv,
                        "outcome_24h": parse_outcome(block, 24),
                        "outcome_72h": parse_outcome(block, 72),
                        "later_follow_up": LATER_FOLLOW_UP.get(f"{prefix}-{section_counts[prefix]:03d}"),
                        "source": {
                            "pdf_page": pdf_page,
                            "booklet_case_page": booklet_page,
                            "position_on_page": position,
                        },
                        "_narrative_for_review": narrative,
                    }
                )
                cases[-1].update(VERIFIED_OVERRIDES.get(cases[-1]["id"], {}))
    return cases


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("ocr_dir", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--review", action="store_true", help="Keep private narrative text for extraction review")
    args = parser.parse_args()
    cases = build_cases(args.ocr_dir)
    if len(cases) != 146:
        raise SystemExit(f"Expected 146 cases, extracted {len(cases)}")
    if not args.review:
        for case in cases:
            case.pop("_narrative_for_review", None)
    payload = {
        "data_version": "2026-09-22",
        "source": "Oxyglobin Solution - Case Listing Book II (Biopure Corporation, October 2000)",
        "scope": "146 selected canine case forms; historical, manufacturer-collected, descriptive evidence",
        "transcription_note": "Fields reflect the printed case forms. Missing or unclear values are not inferred. Clinician, clinic, location and patient names are omitted.",
        "field_notes": {
            "case_identity": "Each ID identifies a printed form, not a confirmed unique dog; overlapping or repeated reports may be present.",
            "treatment_sequence": "Sequence selected on the printed form for the first 72 hours; it does not establish causal effect.",
            "administration_route": "The individual printed forms do not state a route, so the explorer reports it as not stated.",
            "amount_and_dose": "Bag count and dose are transcribed only when printed and legible; no missing dose is calculated from weight.",
            "outcomes": "Short-term status fields and later follow-up are descriptive, selected reports and must not be interpreted as efficacy or survival rates."
        },
        "case_count": len(cases),
        "cases": cases,
    }
    args.output.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
