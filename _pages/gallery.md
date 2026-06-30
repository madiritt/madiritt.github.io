---
layout: page
title: gallery
permalink: /gallery/
description: Field and macro photography from the lab and the field.
nav: true
nav_order: 5
---

<!-- Google Photos-style library: a responsive grid of equal, cropped tiles.
     Clicking any tile opens a full-screen GLightbox slider (prev/next, swipe,
     keyboard) showing the full uncropped image with its title caption beneath.

     To add a photo: drop the image in assets/img/ and copy one .photo-tile
     block below. Set data-title (the caption) on the anchor; it shows in the
     lightbox. Italics (e.g. species names) work via <em> in data-title. The
     grid grows and re-flows automatically. See runbook 04. -->

<style>
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.6rem;
    margin-top: 1rem;
  }
  .photo-grid a.photo-tile {
    display: block;
    position: relative;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 10px;
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

  /* Lightbox caption: title only, in the Mossy display style (cream Lora over
     the dark backdrop) so it reads clearly instead of beige-on-white. */
  .glightbox-container .gslide-description {
    background: transparent;
    padding: 0.7rem 1rem 0;
    text-align: center;
  }
  .glightbox-container .gslide-title,
  .glightbox-container .gslide-title em,
  .glightbox-container .gslide-title i {
    font-family: "Lora", Georgia, serif;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.4;
    color: #f4f0d8;
    margin: 0;
  }
  .glightbox-container .gslide-desc { display: none; }
</style>

<div class="photo-grid">
  <a href="{{ '/assets/img/gallery-paige-fieldwork.jpg' | relative_url }}" class="glightbox photo-tile" data-gallery="field-gallery" data-title="Mackinaw Nature Preserve, 2020">
    {% include figure.liquid path="assets/img/gallery-paige-fieldwork.jpg" title="" class="img-fluid" %}
  </a>
  <a href="{{ '/assets/img/gallery-transects-2025.jpg' | relative_url }}" class="glightbox photo-tile" data-gallery="field-gallery" data-title="Running transects, May 2025">
    {% include figure.liquid path="assets/img/gallery-transects-2025.jpg" title="" class="img-fluid" %}
  </a>
  <a href="{{ '/assets/img/gallery-p-phalangioides-2022.jpg' | relative_url }}" class="glightbox photo-tile" data-gallery="field-gallery" data-title="<em>Pholcus phalangioides</em>, 2022">
    {% include figure.liquid path="assets/img/gallery-p-phalangioides-2022.jpg" title="" class="img-fluid" %}
  </a>
  <a href="{{ '/assets/img/gallery-f-communis-2025.jpg' | relative_url }}" class="glightbox photo-tile" data-gallery="field-gallery" data-title="<em>Frontinella communis</em> web, 2025">
    {% include figure.liquid path="assets/img/gallery-f-communis-2025.jpg" title="" class="img-fluid" %}
  </a>
  <a href="{{ '/assets/img/gallery-clay-models-2025.jpg' | relative_url }}" class="glightbox photo-tile" data-gallery="field-gallery" data-title="Painting clay models, 2025">
    {% include figure.liquid path="assets/img/gallery-clay-models-2025.jpg" title="" class="img-fluid" %}
  </a>
  <a href="{{ '/assets/img/gallery-abs-2025.jpg' | relative_url }}" class="glightbox photo-tile" data-gallery="field-gallery" data-title="Animal Behavior Society meeting, 2025">
    {% include figure.liquid path="assets/img/gallery-abs-2025.jpg" title="" class="img-fluid" %}
  </a>
  <a href="{{ '/assets/img/gallery-spider-hunting-2022.jpg' | relative_url }}" class="glightbox photo-tile" data-gallery="field-gallery" data-title="Hunting for spiders, 2022">
    {% include figure.liquid path="assets/img/gallery-spider-hunting-2022.jpg" title="" class="img-fluid" %}
  </a>
</div>

<!-- GLightbox: full-screen lightbox gallery with prev/next navigation (click a tile). -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/glightbox@3.3.1/dist/css/glightbox.min.css"
  integrity="sha384-GPAzSuZc0kFvdIev6wm9zg8gnafE8tLso7rsAYQfc9hAdWCpOcpcNI5W9lWkYcsd"
  crossorigin="anonymous"
>
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
