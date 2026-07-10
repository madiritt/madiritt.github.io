---
layout: page
title: How do hatching patterns impact nestling development?
description: Hatching asynchrony, house wrens, sex-specific patterns, corticosterone
img: # add a representative image, e.g. assets/img/house-wren.jpg
importance: 3
category: past
---

<!-- Representative photos at the BOTTOM of the page (2026-07-10, Madison's
     preference; standard for research pages as photos are provided).

     GALLERY-STYLE tiles (2026-07-10, Madison: "same size method as the gallery
     photos"): a responsive grid of equal SQUARE tiles cropped to fill (same
     `object-fit: cover` + auto-fit grid + orange frame as _pages/gallery.md).
     Clicking a tile opens the same GLightbox slider used on the Gallery page,
     showing the FULL uncropped image with its caption, so the square crop on the
     tile never hides the photo. Credits show in the lightbox caption; a visible
     credit line sits under the grid too (photographer-credit standard).

     Text spans the FULL content width (no reading-measure cap) so the page reads
     WIDE rather than tall (Madison, 2026-07-10): short content laid out
     horizontally, edge-aligned with the title and the photo grid. -->
<style>
  /* Wide text: fill the content width so the prose is horizontal, not a tall
     narrow column. Edges line up with the title and the photo grid. */
  .research-body { max-width: 100%; }

  .research-photos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0.6rem;
    margin: 3rem 0 0;
  }
  /* Square tile = the gallery method (mirrors _pages/gallery.md .photo-tile). */
  .research-photos a.photo-tile {
    display: block;
    position: relative;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 6px;
    border: 3px solid #feac74;
    box-sizing: border-box;
  }
  .research-photos a.photo-tile figure,
  .research-photos a.photo-tile picture { margin: 0; width: 100%; height: 100%; display: block; }
  .research-photos a.photo-tile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }
  .research-photos a.photo-tile:hover img { transform: scale(1.06); }

  /* Citrine uppercase hint + centered credit, matching the gallery/caption voice. */
  .research-hint {
    font-family: "Lexend", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--global-theme-color);
    margin: 3rem 0 0;
  }
  .research-credit {
    font-family: "Lexend", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 0.82rem;
    line-height: 1.45;
    color: var(--global-text-color-light);
    margin: 0.75rem 0 0;
  }
</style>

<div class="research-body" markdown="1">

Variation in nestling growth and survival is often influenced by hatching order,
with first-hatched offspring having an advantage over later-hatched younger
siblings. This effect of hatching order is especially evident in asynchronously
hatched broods and can lead to sex-specific differences in the size and
condition of nestlings. Females appear to allocate the sex of their offspring
across the laying order to capitalize on these differences.

I was interested in the mechanism behind these sex-specific differences,
specifically the role of the primary metabolic hormone in birds, corticosterone.
This work was done for my Master's thesis in collaboration with the [Avian Ecology
Lab](https://about.illinoisstate.edu/wrens/research/) at Illinois State University.

</div>

<p class="research-hint">Select any image to view it full-size</p>

<div class="research-photos">
  <a href="{{ '/assets/img/research-nestlings-nestbox.jpg' | relative_url }}" class="glightbox photo-tile" data-gallery="nestlings-gallery" data-title="Male house wren at a nestbox entrance. Photo: Dr. Rachael DiSciullo">
    {% include figure.liquid path="assets/img/research-nestlings-nestbox.jpg" title="" class="img-fluid" %}
  </a>
  <a href="{{ '/assets/img/research-nestlings-branch-a.jpg' | relative_url }}" class="glightbox photo-tile" data-gallery="nestlings-gallery" data-title="Male house wren. Photo: Dr. Rachael DiSciullo">
    {% include figure.liquid path="assets/img/research-nestlings-branch-a.jpg" title="" class="img-fluid" %}
  </a>
  <a href="{{ '/assets/img/research-nestlings-branch-b.jpg' | relative_url }}" class="glightbox photo-tile" data-gallery="nestlings-gallery" data-title="Male house wren. Photo: Dr. Rachael DiSciullo">
    {% include figure.liquid path="assets/img/research-nestlings-branch-b.jpg" title="" class="img-fluid" %}
  </a>
</div>

<p class="research-credit">Photos: Dr. Rachael DiSciullo</p>

<!-- GLightbox: full-screen lightbox showing the full uncropped image + caption
     (same setup and Mossy-palette caption styling as _pages/gallery.md). -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/glightbox@3.3.1/dist/css/glightbox.min.css"
  integrity="sha384-GPAzSuZc0kFvdIev6wm9zg8gnafE8tLso7rsAYQfc9hAdWCpOcpcNI5W9lWkYcsd"
  crossorigin="anonymous"
>

<style>
  .glightbox-clean .gdesc-inner { padding: 0; }
  .glightbox-clean .ginner-container .gslide-description {
    background: linear-gradient(
      to top,
      rgba(20, 24, 14, 0.92) 0%,
      rgba(20, 24, 14, 0.55) 55%,
      rgba(20, 24, 14, 0) 100%
    );
  }
  @media (min-width: 769px) {
    .glightbox-container .ginner-container.desc-bottom { position: relative; }
    .glightbox-clean .ginner-container.desc-bottom .gslide-description {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      padding: 3rem 1.4rem 1.1rem;
    }
  }
  .glightbox-mobile .glightbox-container .gslide-description {
    padding: 3rem 1.2rem 1.4rem;
  }
  .glightbox-container .gslide-title,
  .glightbox-container .gslide-title em,
  .glightbox-container .gslide-title i {
    font-family: "Lexend", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 500;
    font-size: 1.05rem;
    line-height: 1.4;
    color: #f4f0d8;
    margin: 0;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.6);
  }
  .glightbox-container .gslide-desc { display: none; }
</style>

<script
  src="https://cdn.jsdelivr.net/npm/glightbox@3.3.1/dist/js/glightbox.min.js"
  integrity="sha384-MZZbZ6RXJudK43v1qY1zOWKOU2yfeBPatuFoKyHAaAgHTUZhwblRTc9CphTt4IGQ"
  crossorigin="anonymous"
></script>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    GLightbox({ selector: '.glightbox', loop: true });
  });
</script>
