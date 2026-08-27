<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hb vs Hct — Understanding the Difference</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            background: #f0f4f8;
            color: #1a202c;
            line-height: 1.7;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 30px 20px;
        }

        /* ===== TOP NAVIGATION ===== */
        .top-nav {
            background: #1a365d;
            padding: 14px 30px;
            border-radius: 12px 12px 0 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
        }

        .top-nav a {
            color: white;
            text-decoration: none;
            padding: 6px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.2s;
        }

        .top-nav a:hover {
            background: rgba(255,255,255,0.15);
        }

        .top-nav .nav-right {
            color: rgba(255,255,255,0.5);
            font-size: 13px;
        }

        /* ===== HERO SECTION ===== */
        .hero {
            background: linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%);
            color: white;
            padding: 50px 40px;
            border-radius: 0 0 16px 16px;
            margin-bottom: 35px;
            text-align: center;
        }

        .hero h1 {
            font-size: 34px;
            font-weight: 800;
            margin-bottom: 8px;
        }

        .hero .subtitle {
            font-size: 17px;
            opacity: 0.9;
            font-weight: 400;
        }

        .hero .badges {
            margin-top: 18px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
        }

        .hero .badge {
            background: rgba(255,255,255,0.15);
            padding: 6px 18px;
            border-radius: 30px;
            font-size: 13px;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .hero .badge.blue {
            background: rgba(66, 153, 225, 0.3);
            border-color: rgba(66, 153, 225, 0.2);
        }

        /* ===== CARDS ===== */
        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 24px;
            margin-bottom: 40px;
        }

        .card {
            background: white;
            padding: 30px 28px;
            border-radius: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.06);
            border: 1px solid #e2e8f0;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 35px rgba(43, 108, 176, 0.10);
            border-color: #2b6cb0;
        }

        .card .icon {
            font-size: 36px;
            display: block;
            margin-bottom: 10px;
        }

        .card h3 {
            font-size: 20px;
            font-weight: 700;
            color: #1a365d;
            margin-bottom: 8px;
        }

        .card p, .card li {
            font-size: 15px;
            color: #4a5568;
        }

        .card ul {
            padding-left: 20px;
            margin-top: 8px;
        }

        .card ul li {
            margin-bottom: 4px;
        }

        /* ===== COLORED CARDS ===== */
        .card.red { border-left: 5px solid #e53e3e; }
        .card.blue { border-left: 5px solid #2b6cb0; }
        .card.green { border-left: 5px solid #38a169; }
        .card.purple { border-left: 5px solid #805ad5; }
        .card.orange { border-left: 5px solid #dd6b20; }
        .card.pink { border-left: 5px solid #d53f8c; }
        .card.teal { border-left: 5px solid #319795; }
        .card.yellow { border-left: 5px solid #d69e2e; }

        /* ===== FULL WIDTH CARD ===== */
        .card-full {
            background: white;
            padding: 30px 35px;
            border-radius: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.06);
            border: 1px solid #e2e8f0;
            margin-bottom: 24px;
        }

        .card-full h3 {
            font-size: 20px;
            font-weight: 700;
            color: #1a365d;
            margin-bottom: 10px;
        }

        .card-full p, .card-full li {
            font-size: 15px;
            color: #4a5568;
        }

        .card-full ul {
            padding-left: 20px;
            margin-top: 8px;
        }

        .card-full ul li {
            margin-bottom: 4px;
        }

        /* ===== STATS ===== */
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 16px;
            margin-bottom: 40px;
        }

        .stat {
            background: white;
            padding: 18px 20px;
            border-radius: 12px;
            text-align: center;
            border: 1px solid #e2e8f0;
            box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }

        .stat .number {
            font-size: 28px;
            font-weight: 800;
            color: #2b6cb0;
        }

        .stat .label {
            font-size: 13px;
            color: #718096;
        }

        /* ===== FOOTER ===== */
        .footer {
            text-align: center;
            color: #a0aec0;
            font-size: 13px;
            padding: 25px 20px 10px;
            border-top: 1px solid #e2e8f0;
            margin-top: 20px;
        }

        .footer a {
            color: #2b6cb0;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
            .hero { padding: 35px 20px; }
            .hero h1 { font-size: 26px; }
            .cards { grid-template-columns: 1fr; }
            .stats { grid-template-columns: repeat(2, 1fr); }
        }
    </style>
</head>
<body>

<div class="container">

    <!-- ===== TOP NAVIGATION ===== -->
    <div class="top-nav">
        <div>
            <a href="../index.html">🏠 Home</a>
            <a href="index.html">📚 Database</a>
            <a href="search.html">🔍 Search</a>
            <a href="README.md">📖 About</a>
        </div>
        <div class="nav-right">
            <a href="https://github.com/ArchilJali/BHOC-platform" target="_blank" style="color: rgba(255,255,255,0.6);">View on GitHub</a>
        </div>
    </div>

    <!-- ===== HERO SECTION ===== -->
    <div class="hero">
        <h1>🩸 Haemoglobin vs Haematocrit</h1>
        <p class="subtitle">Understanding the Difference — Why They Don't Always Tell the Same Story</p>
        <div class="badges">
            <span class="badge">🧬 Haemoglobin (Hb)</span>
            <span class="badge">🩸 Haematocrit (Hct)</span>
            <span class="badge">📊 Clinical Interpretation</span>
            <span class="badge blue">🔬 Laboratory Medicine</span>
        </div>
    </div>

    <!-- ===== STATISTICS ===== -->
    <div class="stats">
        <div class="stat">
            <div class="number">Hb</div>
            <div class="label">Haemoglobin — g/dL</div>
        </div>
        <div class="stat">
            <div class="number">Hct</div>
            <div class="label">Haematocrit — %</div>
        </div>
        <div class="stat">
            <div class="number">×3</div>
            <div class="label">Traditional Relationship</div>
        </div>
        <div class="stat">
            <div class="number">⚠️</div>
            <div class="label">Not Always Proportional</div>
        </div>
    </div>

    <!-- ===== CARDS ===== -->

    <!-- Card 1: What is Haemoglobin -->
    <div class="cards">
        <div class="card red">
            <span class="icon">🧬</span>
            <h3>What is Haemoglobin (Hb)?</h3>
            <p>Haemoglobin is the <strong>iron-containing protein</strong> inside red blood cells responsible for:</p>
            <ul>
                <li>Carrying oxygen from lungs to tissues</li>
                <li>Transporting carbon dioxide back to lungs</li>
                <li>Measuring <strong>concentration</strong> of Hb in blood (g/dL)</li>
            </ul>
        </div>

        <!-- Card 2: What is Haematocrit -->
        <div class="card blue">
            <span class="icon">🩸</span>
            <h3>What is Haematocrit (Hct)?</h3>
            <p>Haematocrit represents the <strong>percentage</strong> of blood volume occupied by red blood cells.</p>
            <ul>
                <li>Measured as <strong>%</strong> of total blood volume</li>
                <li>Reflects <strong>quantity</strong> of red cells</li>
                <li>Traditional relationship: <strong>Hct ≈ Hb × 3</strong></li>
            </ul>
        </div>
    </div>

    <!-- Card 3: Why Relationship Changes -->
    <div class="card-full" style="border-left: 5px solid #e53e3e;">
        <h3>⚠️ Why Might the Relationship Change?</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-top: 10px;">
            <div style="background: #fff5f5; padding: 14px 18px; border-radius: 8px;">
                <strong style="color: #e53e3e;">Microcytosis & Hypochromia</strong>
                <p style="font-size: 14px; margin-top: 4px;">Iron deficiency — red cells contain less Hb than expected for their volume.</p>
            </div>
            <div style="background: #ebf8ff; padding: 14px 18px; border-radius: 8px;">
                <strong style="color: #2b6cb0;">Macrocytosis</strong>
                <p style="font-size: 14px; margin-top: 4px;">Larger red cells occupy more volume, influencing Hct relative to Hb.</p>
            </div>
            <div style="background: #fefcbf; padding: 14px 18px; border-radius: 8px;">
                <strong style="color: #d69e2e;">Plasma Volume Changes</strong>
                <p style="font-size: 14px; margin-top: 4px;">Dehydration concentrates both; hemodilution lowers them.</p>
            </div>
            <div style="background: #faf5ff; padding: 14px 18px; border-radius: 8px;">
                <strong style="color: #805ad5;">Abnormal RBC Morphology</strong>
                <p style="font-size: 14px; margin-top: 4px;">Conditions affecting RBC size, shape, or haemoglobinisation.</p>
            </div>
            <div style="background: #fff5f5; padding: 14px 18px; border-radius: 8px;">
                <strong style="color: #e53e3e;">Analytical Interference</strong>
                <p style="font-size: 14px; margin-top: 4px;">Lipemia, haemolysis, cold agglutinins, poor sample mixing.</p>
            </div>
        </div>
    </div>

    <!-- Card 4: Clinical Significance -->
    <div class="card-full" style="border-left: 5px solid #38a169;">
        <h3>🏥 Clinical Significance</h3>
        <p><strong>An unexpected Hb/Hct relationship should not simply be ignored.</strong></p>
        <p style="margin-top: 8px;">As Medical Scientists, we look beyond one number. <strong>Hb, Hct, RBC count, MCV, MCH, MCHC, RDW, blood-film findings, and the patient's clinical picture</strong> should be interpreted together.</p>
    </div>

    <!-- Card 5: Haemoglobin Types -->
    <div class="cards">
        <div class="card purple">
            <span class="icon">🧪</span>
            <h3>Haemoglobin Types</h3>
            <ul>
                <li><strong>HbA (α₂β₂)</strong> — Predominant in adults</li>
                <li><strong>HbA₂ (α₂δ₂)</strong> — Normally present in small amounts</li>
                <li><strong>HbF (α₂γ₂)</strong> — Predominates in fetal life</li>
                <li><strong>Abnormal Haemoglobins</strong> — HbS, HbC, HbE, HbD</li>
            </ul>
        </div>

        <!-- Card 6: Take-Home Message -->
        <div class="card orange">
            <span class="icon">💡</span>
            <h3>Key Take-Home Message</h3>
            <p><strong>Haemoglobin and haematocrit measure two different things.</strong></p>
            <ul>
                <li><strong>Hb</strong> = Concentration of oxygen-carrying protein</li>
                <li><strong>Hct</strong> = Percentage of blood volume occupied by RBCs</li>
                <li style="margin-top: 8px; font-weight: 600; color: #dd6b20;">Always interpret together with other parameters!</li>
            </ul>
        </div>
    </div>

    <!-- ===== FOOTER ===== -->
    <div class="footer">
        <a href="../index.html">🏠 Home</a> &bull;
        <a href="index.html">📚 Database</a> &bull;
        <a href="search.html">🔍 Search</a> &bull;
        <a href="README.md">📖 About</a> &bull;
        <a href="https://github.com/ArchilJali/BHOC-platform" target="_blank">View on GitHub</a>
        <br><br>
        Hb vs Hct — Clinical Laboratory Medicine &bull; Understanding the Difference
        <br>
        &copy; 2026 Archil Jaliashvili
    </div>

</div>

</body>
</html>
