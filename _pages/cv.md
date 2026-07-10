---
layout: page
permalink: /cv/
title: CV
nav: true
nav_order: 3
cv_pdf: /assets/pdf/Rittinger_2026_CV.pdf
---

<!-- Simple CV page: one download button + an inline PDF preview.
     The structured cv.yml rendering was retired 2026-07-06 (less is more);
     the data is preserved in _data/cv.yml if it is ever wanted again.

     PREVIEW (2026-07-10): the preview is rendered with PDF.js (canvas), NOT an
     <object>/<iframe>. Mobile browsers (iOS Safari, Android Chrome) refuse to
     render PDFs inline in an <object>, so the old embed showed only the "preview
     isn't available" fallback on phones. PDF.js draws each page to a canvas and
     works on every modern browser, desktop and mobile. If JS is disabled or the
     CDN is blocked, the same download-link fallback shows. This keeps the update
     workflow unchanged: it renders whatever PDF is at cv_pdf.

     To update the CV: drop the new PDF in assets/pdf/ and, if the filename
     changed, update cv_pdf in the frontmatter above. See runbook 03. -->

<style>
  .cv-simple {
    margin-top: 0.5rem;
  }
  .cv-download {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.6rem 1.25rem;
    border-radius: 6px;
    background: var(--global-theme-color);
    color: var(--global-hover-text-color) !important;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-decoration: none !important;
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }
  .cv-download:hover {
    background: var(--global-hover-color);
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
  }
  .cv-download svg {
    width: 1.05em;
    height: 1.05em;
    flex: none;
  }
  .cv-preview {
    display: block;
    width: 100%;
    height: 80vh;
    margin-top: 1.4rem;
    border: 3px solid #feac74; /* same pastel-orange frame as the site's images */
    border-radius: 6px;
    box-sizing: border-box;
    background: var(--global-card-bg-color);
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch; /* momentum scroll inside the frame on iOS */
    padding: 0.5rem;
  }
  /* PDF.js renders each page into one of these canvases, stacked and scrollable. */
  .cv-preview canvas {
    display: block;
    width: 100%;
    height: auto;
    margin: 0 auto 0.5rem;
    border-radius: 2px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.25);
  }
  .cv-preview canvas:last-child {
    margin-bottom: 0;
  }
  .cv-fallback {
    padding: 2.5rem 1.5rem;
    text-align: center;
    color: var(--global-text-color-light);
  }
  .cv-fallback a {
    color: var(--global-theme-color);
  }
  @media (max-width: 600px) {
    .cv-preview {
      height: 65vh;
    }
  }
</style>

<div class="cv-simple">
  <a class="cv-download" href="{{ page.cv_pdf | relative_url }}" download>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 3v12"></path>
      <path d="M6 11l6 6 6-6"></path>
      <path d="M4 21h16"></path>
    </svg>
    Download CV (PDF)
  </a>

  <div class="cv-preview" id="cv-preview" aria-label="CV preview">
    <p class="cv-fallback" id="cv-fallback">
      Loading preview... if it doesn't appear,
      <a href="{{ page.cv_pdf | relative_url }}">download the CV (PDF)</a> instead.
    </p>
  </div>
</div>

<!-- PDF.js: renders the CV to canvas so the preview works on mobile too
     (mobile browsers won't render PDFs inline via <object>/<iframe>). Pinned
     version with SRI; the worker is loaded from the same pinned CDN path. -->
<script
  src="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js"
  integrity="sha384-/1qUCSGwTur9vjf/z9lmu/eCUYbpOTgSjmpbMQZ1/CtX2v/WcAIKqRv+U1DUCG6e"
  crossorigin="anonymous"
></script>
<script>
  (function () {
    var pdfUrl = "{{ page.cv_pdf | relative_url }}";
    var container = document.getElementById('cv-preview');
    var fallback = document.getElementById('cv-fallback');
    // Script blocked or failed to load: keep the download-link fallback.
    if (!window.pdfjsLib || !container) return;

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

    // Cap device pixel ratio so high-DPI phones don't allocate huge canvases.
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function renderPage(pdf, num, cssWidth) {
      return pdf.getPage(num).then(function (page) {
        var base = page.getViewport({ scale: 1 });
        var viewport = page.getViewport({ scale: (cssWidth * dpr) / base.width });
        var canvas = document.createElement('canvas');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        container.appendChild(canvas);
        return page.render({
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        }).promise;
      });
    }

    pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {
      if (fallback && fallback.parentNode) fallback.remove();
      var cssWidth = container.clientWidth - 16; // account for padding
      if (cssWidth <= 0) cssWidth = container.clientWidth;
      // Render pages one at a time (memory-friendly on mobile).
      var chain = Promise.resolve();
      for (var i = 1; i <= pdf.numPages; i++) {
        (function (n) {
          chain = chain.then(function () { return renderPage(pdf, n, cssWidth); });
        })(i);
      }
      return chain;
    }).catch(function () {
      // Render failed: restore the download-link fallback.
      if (fallback && !fallback.parentNode) container.appendChild(fallback);
    });
  })();
</script>
