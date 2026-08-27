<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HBOC & Oxyglobin Publication Database</title>
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background: #f5f7fa;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }
        h1 {
            color: #1a3a5c;
            border-bottom: 3px solid #2b7a9e;
            padding-bottom: 10px;
            margin-bottom: 5px;
        }
        .subtitle {
            color: #6c757d;
            font-size: 0.95rem;
            margin-top: -5px;
            margin-bottom: 20px;
        }
        .filter-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 20px 0;
            padding: 15px;
            background: #f0f2f5;
            border-radius: 8px;
            align-items: center;
        }
        .filter-bar label {
            font-weight: 600;
            font-size: 0.85rem;
            color: #495057;
        }
        .filter-bar select, .filter-bar input {
            padding: 6px 12px;
            border: 1px solid #ced4da;
            border-radius: 4px;
            font-size: 0.85rem;
            background: white;
            min-width: 150px;
        }
        .filter-bar .btn {
            padding: 6px 16px;
            background: #2b7a9e;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.85rem;
            transition: background 0.2s;
        }
        .filter-bar .btn:hover {
            background: #1a5a7a;
        }
        .filter-bar .btn-clear {
            background: #6c757d;
        }
        .filter-bar .btn-clear:hover {
            background: #5a6268;
        }
        .stats {
            font-size: 0.85rem;
            color: #6c757d;
            margin: 10px 0;
        }
        .table-wrap {
            overflow-x: auto;
            border: 1px solid #dee2e6;
            border-radius: 6px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.82rem;
        }
        th, td {
            padding: 8px 10px;
            text-align: left;
            border-bottom: 1px solid #e9ecef;
            vertical-align: top;
        }
        th {
            background: #e9ecef;
            font-weight: 600;
            color: #495057;
            position: sticky;
            top: 0;
            z-index: 5;
            white-space: nowrap;
        }
        tr:hover {
            background: #f8f9fa;
        }
        .year-group {
            background: #dee2e6;
            font-weight: 700;
            color: #1a3a5c;
            padding: 6px 10px;
            border-bottom: 2px solid #2b7a9e;
        }
        .badge {
            display: inline-block;
            padding: 1px 8px;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 600;
            margin-right: 3px;
        }
        .badge-eu {
            background: #2b7a9e;
            color: white;
        }
        .badge-us {
            background: #b13e3e;
            color: white;
        }
        .badge-both {
            background: #6f42c1;
            color: white;
        }
        .citation {
            font-size: 0.75rem;
            color: #555;
            max-width: 350px;
        }
        .file-link {
            color: #2b7a9e;
            text-decoration: none;
            font-weight: 500;
        }
        .file-link:hover {
            text-decoration: underline;
        }
        .no-results {
            padding: 40px;
            text-align: center;
            color: #6c757d;
        }
        .section-title {
            background: #1a3a5c;
            color: white;
            padding: 10px 16px;
            border-radius: 6px;
            margin: 25px 0 15px 0;
            font-size: 1.1rem;
        }
        .ref-list {
            list-style: none;
            padding: 0;
        }
        .ref-list li {
            padding: 10px 15px;
            background: #f8f9fa;
            margin-bottom: 5px;
            border-left: 4px solid #2b7a9e;
            border-radius: 4px;
        }
        .ref-list .ref-title {
            font-weight: 500;
        }
        .ref-list .ref-doi {
            font-size: 0.8rem;
            color: #6c757d;
        }
        @media (max-width: 768px) {
            .container { padding: 12px; }
            .filter-bar select, .filter-bar input { min-width: 100px; font-size: 0.75rem; }
            table { font-size: 0.7rem; }
            th, td { padding: 4px 6px; }
        }
    </style>
</head>
<body>
<div class="container" id="app">

    <h1>📚 HBOC & Oxyglobin Publication Database</h1>
    <p class="subtitle">Hemopure® (HBOC-201) · Oxyglobin® (HBOC-301) · Polymerized Bovine Hemoglobin · Oxygen Therapeutics</p>

    <!-- FILTERS -->
    <div class="filter-bar">
        <label>🔍 Filter:</label>
        <input type="text" id="searchInput" placeholder="Search title, author..." oninput="applyFilters()">

        <label>Year:</label>
        <select id="yearFilter" onchange="applyFilters()">
            <option value="">All Years</option>
        </select>

        <label>Region:</label>
        <select id="regionFilter" onchange="applyFilters()">
            <option value="">All</option>
            <option value="EU">EU</option>
            <option value="US">US</option>
            <option value="Both">Both</option>
        </select>

        <label>Species:</label>
        <select id="speciesFilter" onchange="applyFilters()">
            <option value="">All Species</option>
        </select>

        <label>Institute:</label>
        <select id="instituteFilter" onchange="applyFilters()">
            <option value="">All Institutes</option>
        </select>

        <button class="btn btn-clear" onclick="clearFilters()">✕ Clear</button>
        <span class="stats" id="statsDisplay">0 publications</span>
    </div>

    <!-- TABLE -->
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Title</th>
                    <th>Authors</th>
                    <th>Journal</th>
                    <th>Species</th>
                    <th>Region</th>
                    <th>Institute</th>
                    <th>Citation</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                <!-- Rendered by JS -->
            </tbody>
        </table>
    </div>

    <!-- PDF REFERENCE LIST -->
    <div style="margin-top: 40px;">
        <div class="section-title">📄 PDF Reference List — QEP References Combined 2.pdf</div>
        <ul class="ref-list" id="pdfRefList">
            <!-- Rendered by JS -->
        </ul>
    </div>

</div>
<script>
// ============================================================
// 1. DATA — Full publication list with year, region, institute
// ============================================================
const publications = [
    { year: 2018, title: "Use of the blood substitute HBOC-201 in critically ill patients during sickle crisis: a three-case series", authors: "Davis JM, El-Haj N, Shah NN, Schwartz G, Block M, Wall J, Tidswell M, Dinino E", journal: "Transfusion", species: "Human", region: "US", institute: "Baystate Medical Center", citation: "Davis JM, et al. Transfusion. 2018;58(1):132-7. doi:10.1111/trf.14386." },
    { year: 2017, title: "Hemoglobin-Based Oxygen Carrier Rescues Double-Transplant Patient From Life-Threatening Anemia", authors: "Gomez MF, Aljure O, Ciancio G, Lynn M", journal: "Am J Transplant", species: "Human", region: "US", institute: "University of Miami", citation: "Gomez MF, et al. Am J Transplant. 2017;17(7):1941-4. doi:10.1111/ajt.14226." },
    { year: 2017, title: "Storage of nitroglycerin (NTG) admixed with HBOC-201 for 30 days in polyolefin plastic bags: a pilot study", authors: "Nigam S, McCarron R, Arnaud F", journal: "Drug Deliv Transl Res", species: "In vitro", region: "US", institute: "Naval Medical Research Center", citation: "Nigam S, et al. Drug Deliv Transl Res. 2017;7(5):674-82." },
    { year: 2016, title: "Hemoglobin glutamer-250 (bovine) in South Africa: consensus usage guidelines from clinician experts", authors: "Mer M, Hodgson E, Wallis L, Jacobson B, Levien L, Snyman J, Sussman MJ, James M, van Gelder A, Allgaier R, Jahr JS", journal: "Transfusion", species: "Human", region: "Both", institute: "Various (South Africa/US)", citation: "Mer M, et al. Transfusion. 2016;56(10):2631-6. doi:10.1111/trf.13726." },
    { year: 2016, title: "Difficult to swallow: warm autoimmune hemolytic anemia in a Jehovah's Witness treated with hemoglobin concentrate", authors: "Epperla N, Strouse C, Vansandt AM, Foy P", journal: "Transfusion", species: "Human", region: "US", institute: "Medical College of Wisconsin", citation: "Epperla N, et al. Transfusion. 2016;56(7):1801-6." },
    { year: 2015, title: "Absence of developmental toxicity in a canine model after infusion of a hemoglobin-based oxygen carrier", authors: "Holson JF, Stump DG, Pearce LB, Watson RE, DeSesso JM", journal: "Reprod Toxicol", species: "Canine", region: "US", institute: "WIL Research", citation: "Holson JF, et al. Reprod Toxicol. 2015;52:101-7. doi:10.1016/j.reprotox.2015.01.006." },
    { year: 2014, title: "A safety and efficacy evaluation of hemoglobin-based oxygen carrier HBOC-201 in a randomized, multicenter red blood cell controlled trial in noncardiac surgery patients", authors: "Van Hemelrijck J, Levien LJ, Veeckman L, Pitman A, Zafirelis Z, Standl T", journal: "Anesth Analg", species: "Human", region: "Both", institute: "Various (Belgium/South Africa/Germany)", citation: "Van Hemelrijck J, et al. Anesth Analg. 2014;119(4):766-76. doi:10.1213/ANE.0000000000000305." },
    { year: 2014, title: "Resuscitation from hemorrhagic shock using polymerized hemoglobin compared to blood", authors: "Ortiz D, Barros M, Yan S, Cabrales P", journal: "Am J Emerg Med", species: "Hamster", region: "US", institute: "University of California San Diego", citation: "Ortiz D, et al. Am J Emerg Med. 2014;32(3):248-55. doi:10.1016/j.ajem.2013.11.045." },
    { year: 2013, title: "Effects of N-Acetyl-L-Cysteine and Hyaluronic Acid on HBOC-201-Induced Systemic and Cerebral Vasoconstriction in the Rat", authors: "Abutarboush R, Scultetus A, Pappas G, Arnaud F, Auker C, McCarron R, Moon-Massat PF", journal: "Curr Drug Discov Technol", species: "Rat", region: "US", institute: "Naval Medical Research Center", citation: "Abutarboush R, et al. Curr Drug Discov Technol. 2013;10(4):315-24." },
    { year: 2012, title: "Sodium nitroprusside ameliorates systemic but not pulmonary HBOC-201-induced vasoconstriction", authors: "Arnaud F, Scultetus AH, Haque A, Saha B, Kim B, Auker C, Moon-Massat P, McCarron R, Freilich D", journal: "Resuscitation", species: "Swine", region: "US", institute: "Naval Medical Research Center", citation: "Arnaud F, et al. Resuscitation. 2012;83(8):1038-45." },
    { year: 2012, title: "Pre-hospital Resuscitation with HBOC-201 and rFVIIa Compared to HBOC-201 Alone in Uncontrolled Hemorrhagic Shock in Swine", authors: "Haque A, Arnaud F, Teranishi K, Okada T, Kim B, Moon-Massat PF, Auker C, McCarron R, Freilich D, Scultetus AH", journal: "Artif Cells Blood Substit Immobil Biotechnol", species: "Swine", region: "US", institute: "Naval Medical Research Center", citation: "Haque A, et al. Artif Cells Blood Substit Immobil Biotechnol. 2012;40(1-2):44-55." },
    { year: 2011, title: "US Navy Experience With Research on, and Development of, Hemoglobin-Based Oxygen Carriers", authors: "Auker CR, McCarron RM", journal: "J Trauma", species: "Human", region: "US", institute: "Naval Medical Research Center", citation: "Auker CR, McCarron RM. J Trauma. 2011;70." },
    { year: 2010, title: "Primary Immune-Mediated Thrombocytopenia in Cats", authors: "Wondratschek C, Weingart C, Kohn B", journal: "J Am Anim Hosp Assoc", species: "Feline", region: "EU", institute: "Free University of Berlin", citation: "Wondratschek C, et al. J Am Anim Hosp Assoc. 2010;46(1):12-9." },
    { year: 2009, title: "A Review of Blood Substitutes: Examining the History, Clinical Trial Results, and Ethics of Hemoglobin-Based Oxygen Carriers", authors: "Chen J-Y, Scerbo M, Kramer G", journal: "Clinics", species: "Human", region: "US", institute: "University of Texas Medical Branch", citation: "Chen J-Y, et al. Clinics. 2009;64(8):803-13. doi:10.1590/S1807-59322009000800016." },
    { year: 2009, title: "Polymerized Bovine Hemoglobin Can Improve Small-Volume Resuscitation from Hemorrhagic Shock in Hamsters", authors: "Cabrales P, Tsai AG, Intaglietta M", journal: "Shock", species: "Hamster", region: "US", institute: "University of California San Diego", citation: "Cabrales P, et al. Shock. 2009;31(3):300-7." },
    { year: 2009, title: "Endothelin-1 contributes to hemoglobin glutamer-200-mediated hepatocellular dysfunction after hemorrhagic shock", authors: "Kubulus D, Mathes A, Reus E, Pradarutti S, Pavlidis D, Thierbach JT, Heiser J, Wolf B, Bauer I, Rensing H", journal: "Shock", species: "Rat", region: "EU", institute: "University of Saarland", citation: "Kubulus D, et al. Shock. 2009;32(2):179-89." },
    { year: 2008, title: "HBOC-201 as an alternative to blood transfusion: efficacy and safety evaluation in a multicenter phase III trial in elective orthopedic surgery", authors: "Jahr JS, Mackenzie C, Pearce LB, Pitman A, Greenburg AG", journal: "J Trauma", species: "Human", region: "US", institute: "UCLA", citation: "Jahr JS, et al. J Trauma. 2008;64(6):1484-97. doi:10.1097/TA.0b013e318173a93f." },
    { year: 2008, title: "Laboratory Findings, Histopathology, and Immunophenotype of Lymphoma in Domestic Ferrets", authors: "Ammersbach M, Delay J, Caswell JL, Smith DA, Taylor WM, Bienzle D", journal: "Vet Pathol", species: "Ferret", region: "US", institute: "University of Guelph", citation: "Ammersbach M, et al. Vet Pathol. 2008;45(5):663-73. doi:10.1354/vp.45-5-663." },
    { year: 2007, title: "Effects of low-volume hemoglobin glutamer-200 versus normal saline and arginine vasopressin resuscitation on systemic and skeletal muscle blood flow and oxygenation in a canine hemorrhagic shock model", authors: "Driessen B, Zarucco L, Gunther RA, Burns PM, Lamb SV, Vincent SE, Boston RA, Jahr JS, Cheung AT", journal: "Crit Care Med", species: "Canine", region: "US", institute: "University of Pennsylvania", citation: "Driessen B, et al. Crit Care Med. 2007;35(9):2101-9." },
    { year: 2007, title: "Bovine hemoglobin (glutamer-250, Hemopure)-specific immunoglobulin G antibody cross-reacts with human hemoglobin but does not lyse red blood cells in vitro", authors: "Hamilton RG, Kickler TS", journal: "Transfusion", species: "Human", region: "US", institute: "Johns Hopkins", citation: "Hamilton RG, Kickler TS. Transfusion. 2007;47(4):723-8." },
    { year: 2006, title: "Acute and long-term effects of modified hemoglobin (HBOC-201) in a rat model of hypertension and chronic kidney disease", authors: "Baylis C", journal: "Transfusion", species: "Rat", region: "US", institute: "University of Florida", citation: "Baylis C. Transfusion. 2006;46(7):1104-11." },
    { year: 2006, title: "A Comparison of the Acute Hemodynamic and Delayed Effects of 50% Exchange Transfusion with Two Different Cross-linked Hemoglobin Based Oxygen Carrying Solutions and Pentastarch", authors: "Bonegio RGB, Fuhro R, Ragno G, Valeri CR, Lieberthal W", journal: "Artif Cells Blood Substit Biotechnol", species: "Rat", region: "US", institute: "Boston University", citation: "Bonegio RGB, et al. Artif Cells Blood Substit Biotechnol. 2006;34(2):145-57." },
    { year: 2005, title: "Long-term transfusion of polymerized bovine hemoglobin in a Jehovah's Witness following chemotherapy for myeloid leukemia: a case report", authors: "Agrawal YP, Freedman M, Szczepiorkowski ZM", journal: "Transfusion", species: "Human", region: "US", institute: "Dartmouth-Hitchcock Medical Center", citation: "Agrawal YP, et al. Transfusion. 2005;45(11):1735-8." },
    { year: 2005, title: "Effects of prophylactic or therapeutic application of bovine haemoglobin HBOC-200 on ischaemia-reperfusion injury following acute coronary ligature in rats", authors: "Burmeister MA, Rempf C, Standl TG, Rehberg S, Bartsch-Zwemke S, Krause T, Tuszynski S, Gottschalk A, Schulte am Esch J", journal: "Br J Anaesth", species: "Rat", region: "EU", institute: "University Hospital Hamburg-Eppendorf", citation: "Burmeister MA, et al. Br J Anaesth. 2005;95(6):737-45." },
    { year: 2005, title: "Structural and Functional Characterization of Glutaraldehyde-Polymerized Bovine Hemoglobin and Its Isolated Fractions", authors: "Buehler PW, Boykins RA, Jia Y, Norris S, Freedberg DI, Alayash AI", journal: "Anal Chem", species: "In vitro", region: "US", institute: "FDA/CBER", citation: "Buehler PW, et al. Anal Chem. 2005;77(11):3466-78." },
    { year: 2003, title: "Arterial oxygenation and oxygen delivery after hemoglobin-based oxygen carrier infusion in canine hypovolemic shock: a dose-response study", authors: "Driessen B, Jahr JS, Lurie F, Golkaryeh MS, Gunther RA", journal: "Crit Care Med", species: "Canine", region: "US", institute: "University of Pennsylvania", citation: "Driessen B, et al. Crit Care Med. 2003;31(6):1771-9." },
    { year: 2003, title: "Current development and use of hemoglobin-based oxygen-carrying (HBOC) solutions", authors: "Day TK", journal: "J Vet Emerg Crit Care", species: "Various", region: "US", institute: "University of Florida", citation: "Day TK. J Vet Emerg Crit Care. 2003;13(2):77-93." },
    { year: 2002, title: "Use of a hemoglobin-based oxygen-carrying solution in cats: 72 cases (1998-2000)", authors: "Gibson GR, Callan MB, Hoffman V, Giger U", journal: "J Am Vet Med Assoc", species: "Feline", region: "US", institute: "University of Pennsylvania", citation: "Gibson GR, et al. J Am Vet Med Assoc. 2002;221(1):96-102." },
    { year: 2000, title: "Transfusions of polymerized bovine hemoglobin in a patient with severe autoimmune hemolytic anemia", authors: "Mullon J, Giacoppe G, Clagett C, McCune D, Dillard T", journal: "N Engl J Med", species: "Human", region: "US", institute: "Medical College of Georgia", citation: "Mullon J, et al. N Engl J Med. 2000;342(22):1638-43." },
    { year: 2000, title: "Bovine Hemoglobin-Based Oxygen Carrier (HBOC-201) For Resuscitation of Uncontrolled, Exsanguinating Liver Injury in Swine", authors: "Manning JE, Katz LM, Brownstein MR, Pearce LB, Gawryl MS, Baker CC", journal: "Shock", species: "Swine", region: "US", institute: "University of North Carolina", citation: "Manning JE, et al. Shock. 2000;13(2):152-9." },
    { year: 1999, title: "Radiographic, biochemical, and pathologic effects of hemoglobin glutamer-200 in dogs undergoing cemented total hip arthroplasty", authors: "Braden TD, Tvedten HW, DeCamp CE, Turner TM, Hughes GS, Rentko VT", journal: "Am J Vet Res", species: "Canine", region: "US", institute: "Michigan State University", citation: "Braden TD, et al. Am J Vet Res. 1999;60(11):1337-40." },
    { year: 1998, title: "The effects of increased doses of bovine hemoglobin on hemodynamics and oxygen transport in patients undergoing preoperative hemodilution for elective abdominal aortic surgery", authors: "Kasper SM, Grüne F, Walter M, Amr N, Erasmi H, Buzello W", journal: "Anesth Analg", species: "Human", region: "EU", institute: "University of Cologne", citation: "Kasper SM, et al. Anesth Analg. 1998;87(2):284-91." },
    { year: 1997, title: "A Phase I/II Study of Polymerized Bovine Hemoglobin in Adult Patients with Sickle Cell Disease", authors: "Gonzalez P, Hackney AC, Jones S, Strayhorn D, Hoffman EB, Hughes G, Jacobs EE, Orringer EP", journal: "J Investig Med", species: "Human", region: "US", institute: "University of North Carolina", citation: "Gonzalez P, et al. J Investig Med. 1997;45(5):258-64." },
    { year: 1996, title: "Physiology and pharmacokinetics of a novel hemoglobin-based oxygen carrier in humans", authors: "Hughes GS Jr, Antal EJ, Locker PK, Francom SF, Adams WJ, Jacobs EE Jr", journal: "Crit Care Med", species: "Human", region: "US", institute: "Biopure Corporation", citation: "Hughes GS Jr, et al. Crit Care Med. 1996;24(5):756-64." },
    { year: 1993, title: "Use of a bovine hemoglobin preparation in the treatment of cyclic ovarian hemorrhage in a miniature horse", authors: "Maxson AD, Giger U, Sweeney CR, Tomasic M, Saik JE, Donawick WJ, Cothran EG", journal: "J Am Vet Med Assoc", species: "Equine", region: "US", institute: "University of Pennsylvania", citation: "Maxson AD, et al. J Am Vet Med Assoc. 1993;203(9):1308-11." },
    { year: 1992, title: "Acute effects of massive transfusion of a bovine hemoglobin blood substitute in a canine model of hemorrhagic shock", authors: "Harringer W, Hodakowski GT, Svizzero T, Jacobs EE Jr, Vlahakes GJ", journal: "Eur J Cardiothorac Surg", species: "Canine", region: "US", institute: "Massachusetts General Hospital", citation: "Harringer W, et al. Eur J Cardiothorac Surg. 1992;6(12):649-54." },
    { year: 1990, title: "Hemodynamic effects and oxygen transport properties of a new blood substitute in a model of massive blood replacement", authors: "Vlahakes GJ, Lee R, Jacobs EE Jr, LaRaia PJ, Austen WG", journal: "J Thorac Cardiovasc Surg", species: "Ovine", region: "US", institute: "Massachusetts General Hospital", citation: "Vlahakes GJ, et al. J Thorac Cardiovasc Surg. 1990;100(3):379-88." }
];

// ============================================================
// 2. RENDER FUNCTIONS
// ============================================================

function getUniqueValues(key) {
    const vals = new Set();
    publications.forEach(p => {
        if (p[key] && p[key].trim()) vals.add(p[key].trim());
    });
    return Array.from(vals).sort();
}

function populateFilters() {
    const yearSel = document.getElementById('yearFilter');
    const years = getUniqueValues('year').sort((a,b) => b - a);
    years.forEach(y => {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        yearSel.appendChild(opt);
    });

    const speciesSel = document.getElementById('speciesFilter');
    getUniqueValues('species').forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        speciesSel.appendChild(opt);
    });

    const instSel = document.getElementById('instituteFilter');
    getUniqueValues('institute').forEach(i => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i;
        instSel.appendChild(opt);
    });
}

function applyFilters() {
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    const year = document.getElementById('yearFilter').value;
    const region = document.getElementById('regionFilter').value;
    const species = document.getElementById('speciesFilter').value;
    const institute = document.getElementById('instituteFilter').value;

    let filtered = publications.filter(p => {
        if (search && !p.title.toLowerCase().includes(search) && !p.authors.toLowerCase().includes(search)) return false;
        if (year && p.year != year) return false;
        if (region && p.region !== region) return false;
        if (species && p.species !== species) return false;
        if (institute && p.institute !== institute) return false;
        return true;
    });

    // Group by year (descending)
    const grouped = {};
    filtered.forEach(p => {
        if (!grouped[p.year]) grouped[p.year] = [];
        grouped[p.year].push(p);
    });
    const sortedYears = Object.keys(grouped).sort((a,b) => b - a);

    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    if (sortedYears.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="no-results">No publications match your filters.</td></tr>';
    } else {
        sortedYears.forEach(y => {
            // Year header
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `<td colspan="9" class="year-group">📅 ${y} (${grouped[y].length})</td>`;
            tbody.appendChild(headerRow);

            grouped[y].forEach(p => {
                const tr = document.createElement('tr');
                const regionBadge = p.region === 'EU' ? '<span class="badge badge-eu">EU</span>' :
                                    p.region === 'US' ? '<span class="badge badge-us">US</span>' :
                                    p.region === 'Both' ? '<span class="badge badge-both">Both</span>' : '';
                tr.innerHTML = `
                    <td>${p.year}</td>
                    <td><strong>${p.title}</strong></td>
                    <td>${p.authors}</td>
                    <td>${p.journal}</td>
                    <td>${p.species}</td>
                    <td>${regionBadge}</td>
                    <td>${p.institute}</td>
                    <td class="citation">${p.citation}</td>
                    <td><a href="#" class="file-link" onclick="alert('PDF link for: ${p.title}')">View PDF</a></td>
                `;
                tbody.appendChild(tr);
            });
        });
    }

    document.getElementById('statsDisplay').textContent = `${filtered.length} publications`;
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('yearFilter').value = '';
    document.getElementById('regionFilter').value = '';
    document.getElementById('speciesFilter').value = '';
    document.getElementById('instituteFilter').value = '';
    applyFilters();
}

// ============================================================
// 3. PDF REFERENCE LIST
// ============================================================
const pdfRefs = [
    { title: "Polymerized bovine hemoglobin can improve small-volume resuscitation from hemorrhagic shock in hamsters", doi: "10.1097/SHK.0b013e3181a3e5c5" },
    { title: "A review of blood substitutes: examining the history, clinical trial results, and ethics of hemoglobin-based oxygen carriers", doi: "10.1590/S1807-59322009000800016" },
    { title: "The effects of hemoglobin glutamer-200 (bovine) on the microcirculation in a canine hypovolemia model", doi: "10.1097/00000539-200110000-00027" },
    { title: "Current development and use of hemoglobin-based oxygen-carrying (HBOC) solutions", doi: "10.1046/j.1435-6935.2003.00010.x" },
    { title: "Arterial oxygenation and oxygen delivery after hemoglobin-based oxygen carrier infusion in canine hypovolemic shock", doi: "10.1097/01.CCM.0000063061.60270.9F" },
    { title: "Inadequacy of low-volume resuscitation with hemoglobin-based oxygen carrier hemoglobin glutamer-200 (bovine) in canine hypovolemia", doi: "10.1046/j.1365-2885.2001.00312.x" },
    { title: "Effects of low-volume hemoglobin glutamer-200 versus normal saline and arginine vasopressin resuscitation", doi: "10.1097/01.CCM.0000277040.31978.3D" },
    { title: "Use of a hemoglobin-based oxygen-carrying solution in cats: 72 cases (1998-2000)", doi: "10.1053/jvet.2002.33132" },
    { title: "Laboratory Findings, Histopathology, and Immunophenotype of Lymphoma in Domestic Ferrets", doi: "10.1354/vp.45-5-663" },
    { title: "Estrogen-Induced Bone Marrow Depression in Ferrets", doi: "10.2460/ajvr.1983.44.04.657" },
    { title: "Amyloidosis in the Black-Footed Ferret (Mustela Nigripes)", doi: "10.1638/06-041.1" }
];

function renderPdfRefs() {
    const list = document.getElementById('pdfRefList');
    list.innerHTML = '';
    pdfRefs.forEach(ref => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="ref-title">${ref.title}</div>
            <div class="ref-doi">DOI: <a href="#" onclick="alert('PDF for: ${ref.title}')">${ref.doi}</a></div>
        `;
        list.appendChild(li);
    });
}

// ============================================================
// 4. INIT
// ============================================================
populateFilters();
applyFilters();
renderPdfRefs();
</script>
</body>
</html>
