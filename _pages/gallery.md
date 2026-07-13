---
layout: page
title: Gallery
permalink: /gallery/
nav: true
nav_order: 5

# Gallery photos. The grid AUTO-SORTS by `year` (newest first), so a new photo
# slots into the right place on its own: just add an entry here and drop the image
# in assets/img/. `caption` is the lightbox text (use <em> for species names).
# Photos from the same year group together; their order within that year is
# deterministic but not guaranteed to match this list.
photos:
  - image: assets/img/gallery-abs-2025.jpg
    caption: "Animal Behavior Society (ABS), 2025"
    year: 2025
  - image: assets/img/gallery-f-communis-2025.jpg
    caption: "<em>Frontinella communis</em> web, 2025"
    year: 2025
  - image: assets/img/gallery-transects-2025.jpg
    caption: "Helping Mish with transects, 2025"
    year: 2025
  - image: assets/img/gallery-clay-models-2025.jpg
    caption: "Helping Mish paint clay models, 2025"
    year: 2025
  - image: assets/img/gallery-p-phalangioides-2022.jpg
    caption: "<em>Pholcus phalangioides</em>, 2022"
    year: 2022
  - image: assets/img/gallery-spider-hunting-2022.jpg
    caption: "Undergraduate researchers Ben Mueller and Kristen Lindemann, 2022"
    year: 2022
  - image: assets/img/gallery-paige-fieldwork.jpg
    caption: "Paige Duncan, M.S., and I at Mackinaw Nature Preserve, 2020"
    year: 2020
---

<!-- Google Photos-style library: a responsive grid of equal, cropped tiles.
     Clicking any tile opens a full-screen GLightbox slider (prev/next, swipe,
     keyboard) showing the full uncropped image with its title caption beneath.

     The tiles are generated from the `photos` list in this page's front matter
     and AUTO-SORT by year, newest first. To add a photo: drop the image in
     assets/img/ and add one entry to that list (image, caption, year). It slots
     into the right place on its own. See runbook 04. -->

<style>
  /* Centered flex wrap (not a plain grid) so an incomplete last row centers
     instead of hugging the left. With 7 photos this reads as 4 on top and 3
     centered below at desktop, rather than a lopsided 5 + 2. The `calc(25% ...)`
     basis targets 4 per row; min-width drops it to 3, then 2, as the page
     narrows, and the trailing row always centers. */
  .photo-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem;
    margin-top: 1rem;
  }
  .photo-grid a.photo-tile {
    display: block;
    position: relative;
    flex: 0 1 calc(25% - 0.45rem);
    min-width: 200px;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 6px;
    /* Pastel-orange frame matching the hero portrait panel; border-box keeps tile
       size + grid spacing unchanged. */
    border: 3px solid #feac74;
    box-sizing: border-box;
  }
  /* Make the al-folio figure/picture fill the square tile. */
  .photo-grid a.photo-tile figure,
  .photo-grid a.photo-tile picture {
    margin: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
  .photo-grid a.photo-tile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }
  .photo-grid a.photo-tile:hover img {
    transform: scale(1.06);
  }
  .photo-grid a.photo-tile figcaption {
    display: none; /* captions live in the lightbox, not on the tiles */
  }
  /* Mobile: 2 tiles per row so each photo is half-width, not a full-width
     square. Below 600px the 200px min-width would otherwise force a single
     column; drop it and set a 50% basis. Desktop 4-across is unchanged. */
  @media (max-width: 600px) {
    .photo-grid a.photo-tile {
      flex: 0 1 calc(50% - 0.3rem);
      min-width: 0;
    }
  }
  /* Small citrine uppercase label, matching the hero eyebrow voice. */
  .gallery-hint {
    font-family: "Lexend", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--global-theme-color);
    margin: 1.1rem 0 0;
  }
</style>

<p class="gallery-hint">Select any image to view its caption</p>

{% assign gallery_photos = page.photos | sort: "year" | reverse %}
<div class="photo-grid">
  {% for photo in gallery_photos %}
  <a href="{{ photo.image | prepend: '/' | relative_url }}" class="glightbox photo-tile" data-gallery="field-gallery" data-title="{{ photo.caption }}">
    {% include figure.liquid path=photo.image title="" class="img-fluid" %}
  </a>
  {% endfor %}
</div>

<!-- GLightbox: full-screen lightbox gallery with prev/next navigation (click a tile). -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/glightbox@3.3.1/dist/css/glightbox.min.css"
  integrity="sha384-GPAzSuZc0kFvdIev6wm9zg8gnafE8tLso7rsAYQfc9hAdWCpOcpcNI5W9lWkYcsd"
  crossorigin="anonymous"
>

<style>
  /* Lightbox caption: gradient-scrim overlay on the bottom of the image, in the
     Mossy palette (cream Lexend over a moss gradient). Loaded AFTER GLightbox's
     CSS so it wins on equal specificity; selectors also out-specify the clean
     theme's white description box. GLightbox already overlays on mobile, so we
     mainly add the overlay on desktop and retheme the gradient on both. */
  .glightbox-clean .gdesc-inner { padding: 0; }

  .glightbox-clean .ginner-container .gslide-description {
    background: linear-gradient(
      to top,
      rgba(20, 24, 14, 0.92) 0%,
      rgba(20, 24, 14, 0.55) 55%,
      rgba(20, 24, 14, 0) 100%
    );
  }

  /* Desktop: pin the caption over the bottom of the image (mobile already does). */
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

  /* Mobile: keep GLightbox's built-in absolute bottom, just match the padding. */
  .glightbox-mobile .glightbox-container .gslide-description {
    padding: 3rem 1.2rem 1.4rem;
  }

  /* Caption type: cream Lexend (italics included), legible over the photo. */
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
