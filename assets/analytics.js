(() => {
  'use strict';
  const GA4_MEASUREMENT_ID = '';
  const AHREFS_DATA_KEY = '';

  if (GA4_MEASUREMENT_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_MEASUREMENT_ID);
    document.head.appendChild(gtagScript);
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID);
  }

  if (AHREFS_DATA_KEY) {
    const ahrefsScript = document.createElement('script');
    ahrefsScript.async = true;
    ahrefsScript.src = 'https://analytics.ahrefs.com/analytics.js';
    ahrefsScript.dataset.key = AHREFS_DATA_KEY;
    document.head.appendChild(ahrefsScript);
  }
})();
