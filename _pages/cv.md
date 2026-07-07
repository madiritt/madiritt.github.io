---
layout: page
permalink: /cv/
title: CV
nav: true
nav_order: 3
cv_pdf: /assets/pdf/Rittinger_2026_CV.pdf
---

<!-- Simple CV page: one download button + an embedded PDF preview.
     The structured cv.yml rendering was retired 2026-07-06 (less is more);
     the data is preserved in _data/cv.yml if it is ever wanted again.

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

  <object
    class="cv-preview"
    data="{{ page.cv_pdf | relative_url }}#toolbar=0&navpanes=0"
    type="application/pdf"
    aria-label="CV preview"
  >
    <p class="cv-fallback">
      A preview isn't available in this browser -
      <a href="{{ page.cv_pdf | relative_url }}">download the CV (PDF)</a> instead.
    </p>
  </object>
</div>
