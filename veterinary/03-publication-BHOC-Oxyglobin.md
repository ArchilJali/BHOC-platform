<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HBOC / Oxyglobin Publications</title>
    <style>
        /* General Styling */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 0 20px;
        }

        /* Headers */
        h1, h2 {
            color: #0056b3;
            border-bottom: 2px solid #dee2e6;
            padding-bottom: 10px;
        }
        .subtitle {
            color: #6c757d;
            font-size: 1.1rem;
            margin-top: -10px;
            margin-bottom: 20px;
        }
        .section-header {
            background-color: #e9ecef;
            padding: 10px 15px;
            border-radius: 5px;
            margin-top: 30px;
        }

        /* Table Styling */
        .table-responsive {
            overflow-x: auto;
            margin: 20px 0;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            background-color: white;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
        }
        th, td {
            padding: 8px 10px;
            text-align: left;
            border-bottom: 1px solid #dee2e6;
            vertical-align: top;
        }
        th {
            background-color: #f1f3f5;
            font-weight: 600;
            color: #495057;
            position: sticky;
            top: 0;
            z-index: 10;
        }
        tr:hover {
            background-color: #f8f9fa;
        }

        /* PDF Reference List Styling */
        .ref-list {
            list-style: none;
            padding: 0;
        }
        .ref-list li {
            background-color: white;
            margin-bottom: 8px;
            padding: 12px 15px;
            border-left: 4px solid #0056b3;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            transition: box-shadow 0.2s ease;
        }
        .ref-list li:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.08);
        }
        .ref-list .ref-citation {
            font-style: italic;
            color: #495057;
            margin-bottom: 4px;
        }
        .ref-list .ref-doi {
            font-size: 0.85rem;
        }
        .ref-list .ref-doi a {
            color: #0056b3;
            text-decoration: none;
        }
        .ref-list .ref-doi a:hover {
            text-decoration: underline;
        }
        .ref-category {
            font-size: 0.8rem;
            font-weight: 600;
            color: #6c757d;
            background-color: #e9ecef;
            padding: 2px 8px;
            border-radius: 12px;
            margin-left: 8px;
        }

        /* Link Styling */
        a {
            color: #0056b3;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .btn {
            display: inline-block;
            padding: 8px 16px;
            background-color: #0056b3;
            color: white !important;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 500;
            transition: background-color 0.2s ease;
            border: none;
            cursor: pointer;
        }
        .btn:hover {
            background-color: #004494;
            text-decoration: none;
        }
        .btn-outline {
            background-color: transparent;
            color: #0056b3 !important;
            border: 1px solid #0056b3;
        }
        .btn-outline:hover {
            background-color: #0056b3;
            color: white !important;
        }
        .btn-small {
            font-size: 0.85rem;
            padding: 4px 12px;
        }

        /* Layout for PDF References */
        .pdf-reference {
            margin-bottom: 20px;
            padding: 15px;
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        /* Utility */
        .text-muted {
            color: #6c757d;
        }
        .mt-3 {
            margin-top: 1.5rem;
        }
        .mb-3 {
            margin-bottom: 1.5rem;
        }
        .note-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 12px 15px;
            border-radius: 4px;
            margin: 15px 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .container {
                padding: 0 10px;
            }
            table {
                font-size: 0.8rem;
            }
            th, td {
                padding: 6px 8px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>HBOC & Oxyglobin Publication Database</h1>
        <p class="subtitle">
            A combined reference source for publications related to Hemoglobin-Based Oxygen Carriers (HBOCs), including Hemopure® (HBOC-201), Oxyglobin® (HBOC-301), and other related products.
        </p>
        <p>
            This page combines data from two source documents: <strong>HBOC Publications.xlsx</strong> and <strong>QEP References Combined 2.pdf</strong>.
            You can view the content directly below or open the original documents.
        </p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
            <a href="#" class="btn" id="view-pdf-btn">📄 View Combined PDF (Original)</a>
            <a href="#publications-table" class="btn btn-outline">📊 Jump to Publication Table</a>
            <a href="#pdf-references" class="btn btn-outline">📚 Jump to PDF Reference List</a>
        </div>

        <div class="note-box">
            <strong>Note:</strong> The full combined PDF is available at the link above. This page provides a searchable and structured version for easier browsing.
        </div>

        <!-- ==================== SECTION 1: EXCEL DATA ==================== -->
        <h2 id="publications-table">Publication Database (from Excel)</h2>
        <p>The following table contains all entries from the <strong>HBOC Publications.xlsx</strong> file, including metadata from the "HBOC Publications" sheet.</p>
        <div class="table-responsive">
            <table id="publicationTable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>File Name</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Indication</th>
                        <th>Species</th>
                        <th>Study Type</th>
                        <th>Citation</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Data will be injected here by JavaScript -->
                </tbody>
            </table>
        </div>
        <p class="text-muted" style="font-size:0.9rem;">Showing all entries from the source Excel file. Use the "Go to Original" link to view the full PDF for a specific entry.</p>

        <!-- ==================== SECTION 2: PDF REFERENCE LIST ==================== -->
        <h2 id="pdf-references">PDF Reference List (from QEP References Combined 2.pdf)</h2>
        <p>The following list contains references extracted from the <strong>QEP References Combined 2.pdf</strong> file, organized by the sections in the original PDF (Pharmacology/Toxicology, Justification for Use in Minor Species, and selected key articles).</p>

        <div class="pdf-reference">
            <h3 class="section-header">Pharmacology & Toxicology (Oxyglobin)</h3>
            <ul class="ref-list" id="pharm-tox-list">
                <!-- Injected by JS -->
            </ul>
        </div>

        <div class="pdf-reference">
            <h3 class="section-header">Justification for Use in Minor Species</h3>
            <ul class="ref-list" id="minor-species-list">
                <!-- Injected by JS -->
            </ul>
        </div>

        <div class="pdf-reference">
            <h3 class="section-header">Selected Key Articles (Full Text in PDF)</h3>
            <ul class="ref-list" id="key-articles-list">
                <!-- Injected by JS -->
            </ul>
        </div>
        <p class="text-muted" style="font-size:0.9rem;">These references are drawn from the provided PDF. Click the title to view the full article in the combined PDF.</p>

        <hr style="margin: 40px 0;">
        <p style="text-align: center; color: #6c757d;">
            This combined document was generated from source files. For any updates or corrections, please refer to the original documents.
            <br>
            <a href="#" id="view-pdf-btn-bottom" class="btn btn-small mt-3">📄 View Full PDF Document</a>
        </p>
    </div>

    <script>
        // ============================================
        // 1. DATA EXTRACTION (Excel Data)
        // ============================================
        // This is the data from the HBOC Publications.xlsx sheet.
        // It's been manually transcribed into a JavaScript array of objects.
        const publicationsData = [
  { FileName: "abutarboush-2013", Category: "Hemopure - Clinical", Title: "Effects of N-Acetyl-L-Cysteine and Hyaluronic Acid on HBOC-201- Induced Systemic and Cerebral Vasoconstriction in the Rat", Indication: "Vasoconstriction", Species: "36 rats", Model: "In vivo", Citation: "Abutarboush R, Scultetus A, Pappas G, Arnaud F, Auker C, McCarron R, Moon-Massat PF. Effects of N-Acetyl-L-Cysteine and Hyaluronic Acid on HBOC-201- Induced Systemic and Cerebral Vasoconstriction in the Rat. Curr Drug Discov Technol. 2013 Dec;10(4):315-24.", StudyType: "Nonclinical" },
  { FileName: "ammersbach-2008", Category: "Vet", Title: "Laboratory Findings, Histopathology, and Immunophenotype of Lymphoma in Domestic Ferrets", Indication: "Lymphoma", Species: "29 ferrets", Model: "In vivo", Citation: "Ammersbach, M., J. Delay, J. L. Caswell, D. A. Smith, W. M. Taylor, and D. Bienzle. \"Laboratory Findings, Histopathology, and Immunophenotype of Lymphoma in Domestic Ferrets.\" Veterinary Pathology 45, no. 5 (2008): 663-73. doi:10.1354/vp.45-5-663.", StudyType: "Nonclinical" },
  { FileName: "agrawal-2005", Category: "Human", Title: "Long-term transfusion of polymerized bovine hemoglobin in a Jehovah's Witness following chemotherapy for myeloid leukemia: a case report", Indication: "relapsed secondary acute myeloid leukemia", Species: "1 human", Model: "In vivo", Citation: "Agrawal YP, Freedman M, Szczepiorkowski ZM. Long-term transfusion of polymerized bovine hemoglobin in a Jehovahs Witness following chemotherapy for myeloid leukemia: a case report. Transfusion. 2005;45(11):1735–8.", StudyType: "Clinical" },
  { FileName: "anbarri-2004", Category: "Human", Title: "Hemoglobin substitutes", Indication: "", Species: "Human", Model: "In vivo", Citation: "Anbari KK, Garino JP, Mackenzie CF. Hemoglobin substitutes. Haemostasis in Spine Surgery. :76–82.", StudyType: "Clinical" },
  { FileName: "arnaud-2005", Category: "Vet", Title: "Effects of Bovine Polymerized Hemoglobin on Coagulation in Controlled Hemorrhagic Shock in Swine", Indication: "hemorrhage and soft tissue injury", Species: "24 pigs", Model: "In vivo", Citation: "Arnaud F, Hammett M, Asher L, Philbin N, Rice J, Dong F, et al. Effects Of Bovine Polymerized Hemoglobin On Coagulation In Controlled Hemorrhagic Shock In Swine. Shock. 2005;24(2):145–52.", StudyType: "Nonclinical" },
  { FileName: "arnaud-2007", Category: "Vet", Title: "Hematology patterns after hemoglobin-based oxygen carrier resuscitation from severe controlled hemorrhage with prolonged delayed definitive care", Indication: "hemorrhage", Species: "48 pigs", Model: "In vivo", Citation: "Arnaud F, Fasipe D, Philbin N, Rice J, Flournoy WS, Ahlers S, et al. Hematology patterns after hemoglobin-based oxygen carrier resuscitation from severe controlled hemorrhage with prolonged delayed definitive care. Transfusion. 2007;47(11):2098–109.", StudyType: "Nonclinical" },
  { FileName: "arnaud-2006", Category: "Vet", Title: "Coagulation patterns following haemoglobin-based oxygen carrier resuscitation in severe uncontrolled haemorrhagic shock in swine", Indication: "hemorrhage", Species: "24 pigs", Model: "In vivo", Citation: "Arnaud F, Handrigan M, Hammett M, Philbin N, Rice J, Dong F, et al. Coagulation patterns following haemoglobin-based oxygen carrier resuscitation in severe uncontrolled haemorrhagic shock in swine. Transfusion Medicine. 2006;16(4):290–302.", StudyType: "Nonclinical" },
  { FileName: "arnaud-2012", Category: "Hemopure - Clinical", Title: "Sodium nitroprusside ameliorates systemic but not pulmonary HBOC-201-induced vasoconstriction: An exploratory study in a swine controlled haemorrhage model", Indication: "Vasoconstriction", Species: "unknown number of pigs", Model: "In vivo", Citation: "Arnaud F, Scultetus AH, Haque A, Saha B, Kim B, Auker C, Moon-Massat P, McCarron R, Freilich D. Sodium nitroprusside ameliorates systemic but not pulmonary HBOC-201-induced vasoconstriction: An exploratory study in a swine controlled haemorrhage model. Resuscitation. 2012 Aug;83(8):1038-45.", StudyType: "Nonclinical" },
  { FileName: "ashenden-2007", Category: "Human", Title: "The use of haemoglobin glutamer-250 (HBOC-201) as an oxygen bridge in patients with acute anaemia associated with surgical blood loss", Indication: "oxygen uptake", Species: "12 Male Humans", Model: "In vivo", Citation: "Ashenden M, Schumacher Y, Sharpe K, Varlet-Marie E, Audran M. Effects of Hemopure™ on Maximal Oxygen Uptake and Endurance Performance in Healthy Humans. International Journal of Sports Medicine. 2007;28(5):381–5.", StudyType: "Clinical" },
  { FileName: "auker-2011", Category: "Human", Title: "US Navy Experience With Research on, and Development of, Hemoglobin-Based Oxygen Carriers", Indication: "oxygen uptake", Species: "NA", Model: "", Citation: "Auker CR, Mccarron RM. US Navy Experience With Research on, and Development of, Hemoglobin-Based Oxygen Carriers. The Journal of Trauma: Injury, Infection, and Critical Care. 2011;70.", StudyType: "Clinical" },
  { FileName: "Banan-2016", Category: "Oxyply - Transplantation", Title: "Novel Strategy to Decrease Reperfusion Injuries and Improve Function of Cold-Preserved Livers Using Normothermic Ex Vivo Liver Perfusion Machine", Indication: "Preservation/ Storage Methods", Species: "pig - Liver", Model: "In vitro", Citation: "Banan B, Xiao Z, Watson R, Xu M, Jia J, Upadhya GA, et al. Novel strategy to decrease reperfusion injuries and improve function of cold-preserved livers using normothermic ex vivo liver perfusion machine. Liver Transplantation. 2016;22(3):333–43.", StudyType: "Nonclinical" },
  { FileName: "baylis-2006", Category: "Vet", Title: "Acute and long-term effects of modified hemoglobin (HBOC-201) in a rat model of hypertension and chronic kidney disease", Indication: "Hypertension and chronic Kidney disease", Species: "rat", Model: "In vivo", Citation: "Baylis C. Acute and long-term effects of modified hemoglobin (HBOC-201) in a rat model of hypertension and chronic kidney disease. Transfusion. 2006;46(7):1104–11.", StudyType: "Nonclinical" },
  { FileName: "bernard-1983", Category: "Vet", Title: "Estrogen-Induced Bone Marrow Depression in Ferrets", Indication: "Estrogen-induced bone marrow depression", Species: "9 ferrets", Model: "In vivo", Citation: "Benard, Susan L., MS, Charles W. Leathers, DMV,PhD, Duane F. Brobst, DMV, PhD, and John R. Gorham, DMV, PhD. \"Estrogen-induced Bone Marrow Depression in Ferrets.\" American Journal of Vetenery Research 44, no. 4 (April 1983): 657-61.", StudyType: "Laboratory / Field Study" },
  { FileName: "bonegio-2006", Category: "Vet", Title: "A Comparison of the Acute Hemodynamic and Delayed Effects of 50% Exchange Transfusion with Two Different Cross-linked Hemoglobin Based Oxygen Carrying Solutions and Pentastarch", Indication: "Hemodynamics", Species: "rats", Model: "In vivo", Citation: "Bonegio RGB, Fuhro R, Ragno G, Valeri CR, Lieberthal W. A Comparison of the Acute Hemodynamic and Delayed Effects of 50% Exchange Transfusion with Two Different Cross-linked Hemoglobin Based Oxygen Carrying Solutions and Pentastarch. Artificial Cells, Blood Substitutes, and Biotechnology. 2006;34(2):145–57.", StudyType: "Nonclinical" },
  { FileName: "bovens-2013", Category: "Vet", Title: "Xenotransfusion with canine blood in the feline species: review of the literature", Indication: "Xenotransfusion", Species: "62 cats", Model: "In vivo", Citation: "Bovens C, Gruffydd-Jones T. Xenotransfusion with canine blood in the feline species: review of the literature. Journal of Feline Medicine and Surgery. 2012;15(2):62–7.", StudyType: "Nonclinical" },
  { FileName: "braden-1999", Category: "Vet", Title: "Radiographic, biochemical, and pathologic effects of hamoglobin, glutamer-200 in dogs undergoing cemented total hip arthroplasty", Indication: "Bone-cement", Species: "9 dogs", Model: "In vivo", Citation: "Braden, Terrance D., DMV, MS, Harold W. Tvedten, DMV, PhD, Charles E. DeCamp, DMV, MS, Thomas M. Turner, DMV, George S. Hughes, MD, and Virginia T. Rentko, VMD. \"Radiographic, Biomechanical, and Pathologic Effects of Hemoglobin Glutamer-200 in Dogs Undergoing Cemented Total Hip Arthroplasty.\" American Journal of Veterinary Research 60, no. 11 (November 11, 1999): 1337-340.", StudyType: "Nonclinical" },
  { FileName: "buehler-2005", Category: "Oxyply - Chemistry", Title: "Structural and Functional Characterization of Glutaraldehyde-Polymerized Bovine Hemoglobin and Its Isolated Fractions", Indication: "Chemistry", Species: "Blood cells", Model: "In vitro", Citation: "Buehler PW, Boykins RA, Jia Y, Norris S, Freedberg DI, Alayash AI. Structural and Functional Characterization of Glutaraldehyde-Polymerized Bovine Hemoglobin and Its Isolated Fractions. Analytical Chemistry. 2005;77(11):3466–78.", StudyType: "Nonclinical" },
  { FileName: "burkoff-2005", Category: "Background", Title: "Cardioprotection before revascularization in<br>ischemic myocardial injury and the potential role of hemoglobin-based oxygen carriers", Indication: "Ischaemia", Species: "NA", Model: "", Citation: "Burkhoff D, Lefer DJ. Cardioprotection before revascularization in ischemic myocardial injury and the potential role of hemoglobin-based oxygen carriers. American Heart Journal. 2005;149(4):573–9.", StudyType: "NA" },
  { FileName: "burmeister-2005", Category: "Hemopure - Clinical", Title: "Effects of prophylactic or therapeutic application of bovine haemoglobin HBOC-200 on ischaemia-reperfusion injury following acute coronary ligature in rats.", Indication: "Ischaemia", Species: "46 rats", Model: "In vivo", Citation: "Burmeister MA, Rempf C, Standl TG, Rehberg S, Bartsch-Zwemke S, Krause T, Tuszynski S, Gottschalk A, Schulte am Esch J. Effects of prophylactic or therapeutic application of bovine haemoglobin HBOC-200 on ischaemia-reperfusion injury following acute coronary ligature in rats. Br J Anaesth. 2005 Dec;95(6):737-45. Epub 2005 Oct 14.", StudyType: "Nonclinical" },
  { FileName: "callas-1997", Category: "Chemistry", Title: "In vitro effects of a novel hemoglobin-based oxygen carrier on routine chemistry, therapeutic drug, coagulation, hematology, and blood bank assays", Indication: "Transfusion", Species: "Human Blood", Model: "In vitro", Citation: "Callas, Demetra D., Terri L. Clark, Paulo L. Moreira, Cara Lansden, Maria S. Gawryl, Stephen Kahn, and Edward W. Bermer, Jr. \"In Vitro Effects of a Novel Hemoglobin-based Oxygen Carrier on Routine Chemistry, Therapeutic Drug, Coagulation, Hematology, and Blood Bank Assays.\" Clinical Chemistry 43, no. 9 (June 23, 1997): 1744-748.", StudyType: "Clinical" },
  { FileName: "cabrales-2009", Category: "Oxyglobin", Title: "Polymerized Bovine Hemoglobin Can Improve Small-Volumeresuscitation from Hemorrhagic Shock in Hamsters", Indication: "hemorrhagic shock", Species: "hampsters", Model: "In vivo", Citation: "Cabrales P, Tsai AG, Intaglietta M. Polymerized Bovine Hemoglobin Can Improve Small-Volume Resuscitation From Hemorrhagic Shock In Hamsters. Shock. 2009;31(3):300–7.", StudyType: "Nonclinical" },
  { FileName: "caswell-2004", Category: "Oxyply - Transplantation", Title: "A novel hemoglobin-based blood substitute protects against myocardial reperfusion injury", Indication: "myocardial reperfusion", Species: "22 dog - heart", Model: "In vitro", Citation: "Caswell, John E., Micah B. Strange, David M. Rimmer, Michael F. Gibson, Phillip Cole, and David J. Lefer. \"A Novel Hemoglobin-based Blood Substitute Protects against Myocardial Reperfusion Injury.\" American Journal of Physiology-Heart and Circulatory Physiology 288, no. 4 (2005). doi:10.1152/ajpheart.00905.2004.", StudyType: "Nonclinical" },
  { FileName: "chen-2006", Category: "Anemia", Title: "Decreased Hephaestin Activity in the Intestine of Copper-Deficient Mice Causes Systemic Iron Deficiency", Indication: "Anemia", Species: "mice", Model: "In vivo", Citation: "Chen H, Huang G, Su T, Gao H, Attieh ZK, Mckie AT, et al. Decreased Hephaestin Activity in the Intestine of Copper-Deficient Mice Causes Systemic Iron Deficiency. The Journal of Nutrition. 2006;136(5):1236–41.", StudyType: "Nonclinical" },
  { FileName: "chen-2009", Category: "History / Ethics", Title: "A Review of Blood Substitutes: Examining the History, Clinical Trial Results, and Ethics of Hemoglobin-Based Oxygen Carriers", Indication: "General", Species: "NA", Model: "", Citation: "Chen J-Y, Scerbo M, Kramer G. A review of blood substitutes: examining the history, clinical trial results, and ethics of hemoglobin-based oxygen carriers. Clinics. 2009;64(8).", StudyType: "Clinical" },
  { FileName: "cheung-2001", Category: "Oxyglobin - nonclinical", Title: "The Effects of Hemoglobin Glutamer-200 (Bovine) on the Microcirculation in a Canine Hypovolemia Model: A Noninvasive Computer-Assisted Intravital Microscopy Study", Indication: "Hypovolemia", Species: "8 dogs", Model: "In vivo", Citation: "Cheung AT, Jahr JS, Driessen B, Duong PL, Chan MS, Lurie F, Golkaryeh MS, Kullar RK, Gunther RA. The Effects of Hemoglobin Glutamer-200 (Bovine) on the Microcirculation in a Canine Hypovolemia Model: A Noninvasive Computer-Assisted Intravital Microscopy Study. Anesth Analg. 2001 Oct;93(4):832-8.", StudyType: "Nonclinical" },
  { FileName: "cheung-2006", Category: "Oxyglobin - nonclinical", Title: "Systemic function, oxygenation and microvascular correlation during treatment of hemorrhagic shock with blood substitutes", Indication: "Hemorrhagic shock", Species: "12 dogs", Model: "In vivo", Citation: "Cheung, Anthony T., Patricia L. Duong, Bernd Driessen, Peter C. Chen, Jonathan S. Jahr, and Robert A. Gunther. \"Systemic Function, Oxygenation and Microvascular Correlation during Treatment of Hemorrhagic Shock with Blood Substitutes.\" Clinical Hemorheology and Microcirculation 34 (2006): 325-34.", StudyType: "Nonclinical" },
  { FileName: "cohn-2000", Category: "Human", Title: "Blood substitutes in surgery", Indication: "General", Species: "NA", Model: "", Citation: "Cohn SM. Blood substitutes in surgery. Surgery. 2000;127(6):599–602.", StudyType: "Clinical" },
  { FileName: "davis-2018", Category: "Human", Title: "Use of the blood substitute HBOC-201 in critically ill patientsduring sickle crisis: a three-case series", Indication: "severe sickle cell crisis", Species: "humans", Model: "In vivo", Citation: "Davis, Jonathan M., Nura El-Haj, Nimish N. Shah, Garry Schwartz, Margaret Block, James Wall, Mark Tidswell, and Ernest Dinino. \"Use of the Blood Substitute HBOC-201 in Critically Ill Patients during Sickle Crisis: A Three-case Series.\" Transfusion 58, no. 1 (January 2018): 132-37. doi:10.1111/trf.14386.", StudyType: "Clinical" },
  { FileName: "day-2003", Category: "Human/Vet", Title: "Current development and use of hemoglobin-based oxygen-carrying (HBOC) solutions", Indication: "General", Species: "NA", Model: "", Citation: "Davis JM, El-Haj N, Shah NN, Schwartz G, Block M, Wall J, et al. Use of the blood substitute HBOC-201 in critically ill patients during sickle crisis: a three-case series. Transfusion. 2017;58(1):132–7.", StudyType: "Nonclinical & Clinical" },
  { FileName: "dean-2006", Category: "Vet", Title: "Falcon adenovirus infection in breeding Taita falcons (Falco fasciinucha)", Indication: "Clinical aviadenovirus infection", Species: "7 Taita falcons", Model: "In vivo", Citation: "Dean, Jason, Kenneth S. Latimer, J. Lindsay Oaks, Mark Schrenzel, Patrick T. Redig, and Arno Wünschmann. \"Falcon Adenovirus Infection in Breeding Taita Falcons (Falco Fasciinucha).\" Journal of Veterinary Diagnostic Investigation 18, no. 3 (2006): 282-86. doi:10.1177/104063870601800310.", StudyType: "Laboratory / Field Study" },
  { FileName: "dimino-2007", Category: "Hemopure", Title: "Hemoglobin-Based O2 Carrier O2 Affinity and Capillary Inlet pO2 Are Important Factors That Influence O2 Transport in a Capillary", Indication: "Chemistry", Species: "Capillary", Model: "In vitro", Citation: "Hemoglobin-Based O2 Carrier O2 Affinity and Capillary Inlet pO2 Are Important<br>Factors That Influence O2 Transport in a Capillary", StudyType: "Clinical" },
  { FileName: "dong-2006", Category: "Hemopure - Clinical", Title: "Immune effects of resuscitation with HBOC-201, a hemoglobin-based oxygen carrier, in swine with moderately severe hemorrhagic shock from controlled hemorrhage.", Indication: "Hemorrhagic shock", Species: "unknown number of pigs", Model: "In vivo", Citation: "Dong F, Hall CH, Golech SA, et al. Immune effects of resuscitation with HBOC-201, a hemoglobin-based oxygen carrier, in swine with moderately severe hemorrhagic shock from controlled hemorrhage. Shock. 2006 Jan;25(1):50-5.", StudyType: "Nonclinical" },
  { FileName: "driessen-2001a", Category: "Vet", Title: "Effects of the haemoglobin-based oxygen carrier Hemoglobin glutamer-200 (bovine) on intestinal perfusion and oxygenation in a canine hypovolaemia", Indication: "Transfusion", Species: "12 dogs / 9 sheep", Model: "In vivo", Citation: "Driessen B, Jahr JS, Lurie F, Gunther R. Low-volume resuscitation with a haemoglobin-based oxygen carrier Hemoglobin glutamer-200 (bovine) in canine hypovolaemia. Veterinary Anaesthesia and Analgesia. 2001;28(4):204.", StudyType: "Nonclinical" },
  { FileName: "driessen-2001b", Category: "Vet", Title: "Inadequacy of low-volume resuscitation with hemoglobin-based oxygen carrier hemoglobin glutamer 200 (bovine) in canine hypovolemia", Indication: "Transfusion", Species: "12 dogs", Model: "In vivo", Citation: "Driessen B, Jahr JS, Lurie F, Gunther RA. Inadequacy of low-volume resuscitation with hemoglobin-based oxygen carrier hemoglobin glutamer-200 (bovine) in canine hypovolemia. Journal of Veterinary Pharmacology and Therapeutics. 2001;24(1):61–71.", StudyType: "Nonclinical" },
  { FileName: "driessen-2003", Category: "Oxyglobin - nonclinical", Title: "Arterial oxygenation and oxygen delivery after hemoglobin-based oxygen carrier infusion in canine hypovolemic shock: A dose-response study", Indication: "Hypovolemia", Species: "24 dogs", Model: "In vivo", Citation: "Driessen B, Jahr JS, Lurie F, Golkaryeh MS, Gunther RA. Arterial oxygenation and oxygen delivery after hemoglobin-based oxygen carrier infusion in canine hypovolemic shock: A dose-response study. Crit Care Med. 2003 Jun;31(6):1771-9.", StudyType: "Nonclinical" },
  { FileName: "driessen-2006", Category: "Vet", Title: "Effects of isovolemic resuscitation with hemoglobin-based oxygen carrier Hemoglobin glutamer-200 (bovine) on systemic and mesenteric perfusion and oxygenation in a canine model of hemorrhagic shock: a comparison with 6% hetastarch solution and shed blood", Indication: "Hemorrhagic<br>shock", Species: "12 dogs", Model: "In vivo", Citation: "Driessen B, Jahr J, Lurie F, Gunther R. Effects of isovolemic resuscitation with hemoglobin-based oxygen carrier Hemoglobin glutamer-200 (bovine) on systemic and mesenteric perfusion and oxygenation in a canine model of hemorrhagic shock: a comparison with 6% hetastarch solution and shed blood. Veterinary Anaesthesia and Analgesia. 2006;33(6):368–80.", StudyType: "Nonclinical" },
  { FileName: "driessen-2007", Category: "Vet", Title: "Effects of low-volume hemoglobin glutamer-200 versus normal saline and arginine vasopressin resuscitation on systemic and skeletal muscle blood flow and oxygenation in a canine hemorrhagic shock model*", Indication: "Hemorrhagic<br>shock", Species: "19 dogs", Model: "In vivo", Citation: "Driessen B, Zarucco L, Gunther RA, Burns PM, Lamb SV, Vincent SE, et al. Effects of low-volume hemoglobin glutamer-200 versus normal saline and arginine vasopressin resuscitation on systemic and skeletal muscle blood flow and oxygenation in a canine hemorrhagic shock model*. Critical Care Medicine. 2007;35(9):2101–9", StudyType: "Nonclinical" },
  { FileName: "dube-2011", Category: "Vet", Title: "Intravenous and Intraosseous Fluid Therapy in Critically Ill Birds of Prey", Indication: "Avian fluid therapy", Species: "Birds of prey", Model: "In vivo", Citation: "Dubé C, Dubois I, Struthers J. Intravenous and Intraosseous Fluid Therapy in Critically Ill Birds of Prey. Journal of Exotic Pet Medicine. 2011;20(1):21–6.", StudyType: "Laboratory / Field Study" },
  { FileName: "dube-2017", Category: "Hemopure - Clinical", Title: "Relative efficacies of HBOC-201 and PolyHeme to increase oxygen transport compared to blood and
