---
layout: page
permalink: /publications/
title: Publications
description: Happy to forward pdf's upon request
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Photographer credits under each publication thumbnail (2026-07-10).
     al-folio's bibliography layout (bib.liquid in the al_folio_core gem) renders
     the `preview` image but has NO field for a photo credit, and we don't want to
     freeze a full copy of that 150-line layout. So we decorate the rendered
     previews here instead: the script below matches each `img.preview` by its
     filename, wraps it, and lays a small credit ON the photo (bottom) as a
     gradient-scrim overlay. Degrades gracefully (no JS -> no overlay, thumbnails
     still fine).

     To update a credit: edit the `credits` map below, keyed by the preview
     filename from the .bib `preview={...}` field. Omit an entry for no credit
     (e.g. instinct-insight.jpg is a composite manuscript figure). -->
<style>
  /* Credit set ON the photo, bottom, as a soft gradient-scrim overlay (the same
     classy treatment as the gallery lightbox caption). The overlay is inset by
     the 3px orange frame and rounds its bottom corners to match. The JS below
     wraps each credited preview in .pub-thumb so this can position against it. */
  .publications .pub-thumb {
    position: relative;
    display: block;
    line-height: 0;
  }
  .publications .pub-thumb figure {
    margin: 0;
  }
  .publications .pub-credit-overlay {
    position: absolute;
    left: 3px;
    right: 3px;
    bottom: 3px;
    padding: 1.4rem 0.55rem 0.5rem;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    background: linear-gradient(
      to top,
      rgba(20, 24, 14, 0.92) 0%,
      rgba(20, 24, 14, 0.5) 45%,
      rgba(20, 24, 14, 0) 100%
    );
    color: #f4f0d8;
    font-family: "Lexend", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 0.64rem;
    line-height: 1.3;
    letter-spacing: 0.02em;
    text-align: center;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
    pointer-events: none;
  }
</style>

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography %}

</div>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    var credits = {
      'treefrog.jpg': 'Photo: Höbel Lab',
      'web-spider.jpg': 'Photo: Mark Yokoyama',
      'songbird-nestling.jpg': 'Photo: Dr. Rachael DiSciullo'
      // instinct-insight.jpg: composite manuscript figure, no single credit.
    };
    document.querySelectorAll('img.preview').forEach(function (img) {
      var name = (img.getAttribute('alt') || '').trim();
      if (!credits[name]) {
        name = (img.getAttribute('src') || '').split('/').pop().split('?')[0];
      }
      var credit = credits[name];
      if (!credit) return;
      // Wrap the preview so the credit can be laid ON the photo (bottom).
      var target = img.closest('figure') || img;
      var wrap = document.createElement('div');
      wrap.className = 'pub-thumb';
      target.parentNode.insertBefore(wrap, target);
      wrap.appendChild(target);
      var overlay = document.createElement('div');
      overlay.className = 'pub-credit-overlay';
      overlay.textContent = credit;
      wrap.appendChild(overlay);
    });
  });
</script>
