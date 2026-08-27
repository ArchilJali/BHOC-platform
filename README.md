<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO Meta Tags -->
    <title>BHOC — Biological Hemoglobin Oxygen Carrier | Precision Oxygen Therapeutics</title>
    <meta name="description" content="BHOC is a hemoglobin-based oxygen carrier platform focused on Precision Oxygen Therapeutics — tissue-level oxygen delivery, HBOC research, and veterinary applications.">
    <meta name="keywords" content="BHOC, HBOC, hemoglobin-based oxygen carrier, oxygen therapeutics, precision oxygen, tissue oxygenation, Oxyglobin, veterinary HBOC, oxygen delivery">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://archiljali.github.io/BHOC-platform/">

    <!-- Open Graph (Social Media) -->
    <meta property="og:title" content="BHOC — Biological Hemoglobin Oxygen Carrier">
    <meta property="og:description" content="Precision Oxygen Therapeutics — Tissue-Level Oxygen Delivery">
    <meta property="og:url" content="https://archiljali.github.io/BHOC-platform/">
    <meta property="og:type" content="website">

    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": "BHOC — Biological Hemoglobin Oxygen Carrier",
        "description": "Precision Oxygen Therapeutics platform for hemoglobin-based oxygen carrier research, veterinary applications, and tissue-level oxygen delivery.",
        "url": "https://archiljali.github.io/BHOC-platform/"
    }
    </script>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: #f7fafc;
            color: #1a202c;
            line-height: 1.7;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
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
        .top-nav .nav-right a {
            color: rgba(255,255,255,0.6);
            padding: 0;
        }
        .top-nav .nav-right a:hover {
            background: none;
            text-decoration: underline;
        }

        /* ===== HERO SECTION ===== */
        .hero {
            background: linear-gradient(145deg, #1a365d 0%, #2b6cb0 100%);
            color: white;
            padding: 70px 50px;
            border-radius: 0 0 16px 16px;
            margin-bottom: 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .hero::after {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 500px;
            height: 500px;
            background: rgba(255,255,255,0.03);
            border-radius: 50%;
            pointer-events: none;
        }
        .hero h1 {
            font-size: 44px;
            font-weight: 800;
            letter-spacing: -0.02em;
            position: relative;
            z-index: 1;
        }
        .hero .subtitle {
            font-size: 20px;
            opacity: 0.9;
            margin-top: 12px;
            font-weight: 300;
            position: relative;
            z-index: 1;
        }
        .hero .tagline {
            font-size: 16px;
            opacity: 0.7;
            margin-top: 8px;
            font-style: italic;
            position: relative;
            z-index: 1;
        }
        .hero .badges {
            margin-top: 25px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
            position: relative;
            z-index: 1;
        }
        .badge {
            background: rgba(255,255,255,0.12);
            padding: 6px 20px;
            border-radius: 30px;
            font-size: 13px;
            font-weight: 500;
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255,255,255,0.08);
        }
        .badge.blue {
            background: rgba(66, 153, 225, 0.3);
            border-color: rgba(66, 153, 225, 0.2);
        }

        /* ===== SECTION TITLE ===== */
        .section-title {
            font-size: 28px;
            font-weight: 700;
            color: #1a365d;
            margin-bottom: 20px;
            text-align: center;
        }
        .section-title span {
            color: #2b6cb0;
        }

        /* ===== QUICK LINKS CARDS ===== */
        .quick-links {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
            margin-bottom: 50px;
        }
        .quick-card {
            background: white;
            padding: 32px 28px;
            border-radius: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.06);
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            text-decoration: none;
            color: #1a202c;
            border: 1px solid #e2e8f0;
            display: block;
        }
        .quick-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 40px rgba(43, 108, 176, 0.13);
            border-color: #2b6cb0;
        }
        .quick-card .icon {
            font-size: 40px;
            display: block;
            margin-bottom: 12px;
        }
        .quick-card h3 {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 6px;
            color: #1a365d;
        }
        .quick-card p {
            font-size: 14px;
            color: #4a5568;
            margin: 0;
        }
        .quick-card .arrow {
            display: inline-block;
            margin-top: 10px;
            color: #2b6cb0;
            font-weight: 600;
            font-size: 14px;
        }

        /* ===== CONTENT SECTIONS ===== */
        .content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 40px 0;
        }
        .content-block {
            background: white;
            padding: 30px 35px;
            border-radius: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
        }
        .content-block h2 {
            font-size: 20px;
            font-weight: 700;
            color: #1a365d;
            margin-bottom: 12px;
        }
        .content-block p {
            color: #4a5568;
            font-size: 15px;
        }
        .content-block ul {
            padding-left: 20px;
            color: #4a5568;
            font-size: 15px;
            margin-top: 8px;
        }
        .content-block ul li {
            margin-bottom: 6px;
        }

        /* ===== RESEARCH AREAS ===== */
        .research-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 12px;
        }
        .research-tag {
            background: #ebf8ff;
            color: #2b6cb0;
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
        }

        /* ===== FOOTER ===== */
        .footer {
            text-align: center;
            color: #a0aec0;
            font-size: 13px;
            padding: 25px 20px;
            border-top: 1px solid #e2e8f0;
            margin-top: 30px;
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
            .hero { padding: 40px 20px; }
            .hero h1 { font-size: 30px; }
            .hero .subtitle { font-size: 17px; }
            .content-grid { grid-template-columns: 1fr; }
            .top-nav { padding: 10px 16px; flex-direction: column; text-align: center; }
            .quick-links { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>

<div class="container">

    <!-- ===== TOP NAVIGATION ===== -->
    <div class="top-nav">
        <div>
            <a href="index.html">🏠 Home</a>
            <a href="veterinary/search.html">🔍 Search Database</a>
            <a href="veterinary/README.md">📖 About</a>
            <a href="veterinary/LICENSE">⚖️ License</a>
        </div>
        <div class="nav-right">
            <a href="https://github.com/ArchilJali/BHOC-platform" target="_blank">View on GitHub</a>
        </div>
    </div>

    <!-- ===== HERO SECTION ===== -->
    <div class="hero">
        <h1>🩸 BHOC</h1>
        <p class="subtitle"><strong>Biological Hemoglobin Oxygen Carrier</strong></p>
        <p class="tagline">Precision Oxygen Therapeutics — Tissue-Level Oxygen Delivery</p>
        <div class="badges">
            <span class="badge">🔬 HBOC Research</span>
            <span class="badge">🧬 Precision Oxygenation</span>
            <span class="badge">🏥 Veterinary Applications</span>
            <span class="badge blue">📄 200+ Publications</span>
        </div>
    </div>

    <!-- ===== QUICK LINKS ===== -->
    <div class="quick-links">
        <a href="veterinary/search.html" class="quick-card">
            <span class="icon">🔍</span>
            <h3>Interactive Search Tool</h3>
            <p>Search 200+ publications on HBOCs, Oxyglobin, oxygen therapeutics, and tissue oxygenation.</p>
            <span class="arrow">→ Go to Search</span>
        </a>
        <a href="veterinary/03-publication-BHOC-Oxyglobin.md" class="quick-card">
            <span class="icon">📋</span>
            <h3>Oxyglobin Publications</h3>
            <p>Full list of Oxyglobin-specific references with Vancouver-style citations.</p>
            <span class="arrow">→ View List</span>
        </a>
        <a href="veterinary/README.md" class="quick-card">
            <span class="icon">📖</span>
            <h3>About This Database</h3>
            <p>Overview, usage guidelines, species distribution, and how to contribute.</p>
            <span class="arrow">→ Learn More</span>
        </a>
        <a href="veterinary/LICENSE" class="quick-card">
            <span class="icon">⚖️</span>
            <h3>License</h3>
            <p>Creative Commons Attribution 4.0 — Free to use with attribution.</p>
            <span class="arrow">→ View License</span>
        </a>
    </div>

    <!-- ===== CONTENT GRID ===== -->
    <div class="content-grid">

        <div class="content-block">
            <h2>🧬 What is BHOC?</h2>
            <p><strong>BHOC (Biological Hemoglobin Oxygen Carrier)</strong> is a hemoglobin-based oxygen carrier platform focused on supporting oxygen delivery beyond the conventional red blood cell transfusion model.</p>
            <p style="margin-top: 10px;">The central concept is <strong>Precision Oxygen Therapeutics</strong> — focusing on oxygen delivery at the tissue level rather than on blood hemoglobin concentration alone.</p>
            <p style="margin-top: 10px; font-size: 14px; color: #2b6cb0; font-style: italic;">Delivering oxygen where it is needed, when it is needed, and in the amount needed — continuously, controllably, and at the tissue level.</p>
        </div>

        <div class="content-block">
            <h2>🔬 Precision Oxygen Therapeutics</h2>
            <p>Four fundamental questions drive the BHOC platform:</p>
            <ul>
                <li><strong>📍 WHERE</strong> — Where is oxygen needed?</li>
                <li><strong>⏰ WHEN</strong> — When is additional oxygen delivery required?</li>
                <li><strong>📊 HOW MUCH</strong> — How much oxygen is required to support tissue demand?</li>
                <li><strong>🎛️ CONTROL</strong> — How can oxygen delivery be supported in a controlled and continuous manner?</li>
            </ul>
        </div>

        <div class="content-block">
            <h2>📚 Research Areas</h2>
            <p>BHOC is relevant to research across many areas of oxygen therapeutics:</p>
            <div class="research-tags">
                <span class="research-tag">HBOCs</span>
                <span class="research-tag">Oxygen Therapeutics</span>
                <span class="research-tag">Tissue Oxygenation</span>
                <span class="research-tag">Transfusion Medicine</span>
                <span class="research-tag">Organ Preservation</span>
                <span class="research-tag">Machine Perfusion</span>
                <span class="research-tag">Trauma</span>
                <span class="research-tag">Emergency Medicine</span>
                <span class="research-tag">Surgery</span>
                <span class="research-tag">Veterinary Medicine</span>
                <span class="research-tag">Ischemia & Reperfusion</span>
                <span class="research-tag">Microvascular Oxygenation</span>
            </div>
        </div>

        <div class="content-block">
            <h2>📄 Veterinary Publications Database</h2>
            <p>This repository includes a comprehensive literature review on hemoglobin-based oxygen carriers with a special focus on <strong>Oxyglobin</strong> — the only FDA-approved HBOC for veterinary use.</p>
            <ul>
                <li><strong>200+</strong> peer-reviewed publications</li>
                <li><strong>45+</strong> veterinary studies</li>
                <li><strong>38</strong> clinical trials</li>
                <li><strong>72</strong> preclinical studies</li>
                <li>Covering <strong>canine, feline, equine, avian, exotic</strong>, and more</li>
            </ul>
            <p style="margin-top: 10px;">
                <a href="veterinary/search.html" style="color: #2b6cb0; font-weight: 600; text-decoration: none;">🔍 Search all publications →</a>
            </p>
        </div>

    </div>

    <!-- ===== SPECIES DISTRIBUTION SUMMARY ===== -->
    <div class="content-block" style="margin: 20px 0; padding: 25px 35px; background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 14px;">
        <h2 style="text-align: center; font-size: 22px; color: #1a365d;">🐾 Species Distribution</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-top: 15px; text-align: center;">
            <div><strong>🐕 Canine</strong><br><span style="color: #2b6cb0;">35+</span></div>
            <div><strong>🐈 Feline</strong><br><span style="color: #2b6cb0;">15+</span></div>
            <div><strong>🐴 Equine</strong><br><span style="color: #2b6cb0;">8+</span></div>
            <div><strong>🐖 Porcine</strong><br><span style="color: #2b6cb0;">18+</span></div>
            <div><strong>🐑 Ovine</strong><br><span style="color: #2b6cb0;">6+</span></div>
            <div><strong>🐀 Rodent</strong><br><span style="color: #2b6cb0;">32+</span></div>
            <div><strong>🦅 Avian</strong><br><span style="color: #2b6cb0;">15+</span></div>
            <div><strong>🦦 Exotic</strong><br><span style="color: #2b6cb0;">12+</span></div>
            <div><strong>👤 Human</strong><br><span style="color: #2b6cb0;">38+</span></div>
        </div>
        <p style="text-align: center; font-size: 14px; color: #718096; margin-top: 12px;">Total: <strong>200+ publications</strong> across all species</p>
    </div>

    <!-- ===== FOOTER ===== -->
    <div class="footer">
        <a href="index.html">🏠 Home</a> &bull;
        <a href="veterinary/search.html">🔍 Search Database</a> &bull;
        <a href="veterinary/README.md">📖 About</a> &bull;
        <a href="veterinary/LICENSE">⚖️ License</a> &bull;
        <a href="https://github.com/ArchilJali/BHOC-platform" target="_blank">View on GitHub</a>
        <br><br>
        <strong>BHOC — Biological Hemoglobin Oxygen Carrier</strong><br>
        Precision Oxygen Therapeutics · Tissue-Level Oxygen Delivery
        <br><br>
        &copy; 2026 Archil Jaliashvili &bull; Biotechnology &amp; Healthcare Innovation
    </div>

</div>

</body>
</html>
