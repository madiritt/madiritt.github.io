---
layout: page
title: gallery
permalink: /gallery/
description: Field and macro photography from the lab and the field.
nav: true
nav_order: 5
---

<!-- To add more photos: drop images into assets/img/ and add another column
     following the pattern below. Each photo is wrapped in a GLightbox anchor
     (class="glightbox", same data-gallery group) so clicking opens a full-screen
     slider with prev/next. Set the lightbox caption with data-title, and the
     thumbnail caption in the figure's title="". See runbook 04. -->

<div class="row">
  <div class="col-sm-4 mt-3 mt-md-0">
    <a href="{{ '/assets/img/gallery-paige-fieldwork.jpg' | relative_url }}" class="glightbox" data-gallery="field-gallery" data-title="">
      {% include figure.liquid path="assets/img/gallery-paige-fieldwork.jpg" title="" class="img-fluid rounded z-depth-1" %}
    </a>
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    <a href="{{ '/assets/img/gallery-spider-hunting-2022.jpg' | relative_url }}" class="glightbox" data-gallery="field-gallery" data-title="">
      {% include figure.liquid path="assets/img/gallery-spider-hunting-2022.jpg" title="" class="img-fluid rounded z-depth-1" %}
    </a>
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    <a href="{{ '/assets/img/gallery-spider-squad-2023.jpg' | relative_url }}" class="glightbox" data-gallery="field-gallery" data-title="">
      {% include figure.liquid path="assets/img/gallery-spider-squad-2023.jpg" title="" class="img-fluid rounded z-depth-1" %}
    </a>
  </div>
</div>

<!-- GLightbox: full-screen lightbox gallery with prev/next navigation (click an image). -->
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
