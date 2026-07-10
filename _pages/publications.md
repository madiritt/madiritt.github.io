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
     filename and inserts a small credit caption beneath it. Degrades gracefully
     (no JS -> no caption, thumbnails still fine).

     To update a credit: edit the `credits` map below, keyed by the preview
     filename from the .bib `preview={...}` field. Omit an entry for no credit
     (e.g. instinct-insight.jpg is a composite manuscript figure). -->
<style>
  .pub-credit {
    font-family: "Lexend", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 0.72rem;
    line-height: 1.35;
    color: var(--global-text-color-light);
    margin: 0.3rem 0 0;
    text-align: center;
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
      var cap = document.createElement('figcaption');
      cap.className = 'pub-credit';
      cap.textContent = credit;
      var anchor = img.closest('figure') || img;
      anchor.parentNode.insertBefore(cap, anchor.nextSibling);
    });
  });
</script>
