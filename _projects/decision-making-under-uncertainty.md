---
layout: page
title: How do spiders make decisions involved in prey capture?
description: Insight, learning, decision making, spiders
img: # add a representative image, e.g. assets/img/problem-solving.jpg
importance: 1
category: current
---

<!-- Photos at the BOTTOM of the page, GALLERY-STYLE tiles (2026-07-10): the same
     layout as the nestlings page and _pages/gallery.md. A responsive grid of
     equal SQUARE tiles (object-fit: cover, orange frame, hover zoom) that open a
     GLightbox slider showing the FULL uncropped image with a species + year
     caption. Text spans the full content width so the page reads wide, not tall.
     These are Madison's own photos: species + year caption, no photographer line
     (matches the Gallery). -->
<style>
  .research-body { max-width: 100%; }

  .research-photos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0.6rem;
    margin: 3rem 0 0;
  }
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

  .research-hint {
    font-family: "Lexend", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--global-theme-color);
    margin: 3rem 0 0;
  }
</style>

<div class="research-body" markdown="1">

Animals large and small are capable of solving problems. In fact, some animals
can solve some problems better than humans. The types of problems animals may
encounter vary, ranging from trivial like navigating around obstacles, to
life-threatening like escaping predation. The types of solutions animals may use
to solve these problems also vary.

Historically, large vertebrates (with overall large brains) have been the
exemplary species for problem-solving. Small animals (with small brains) were
thought to be "mindless" and solve problems only using simple, innate
mechanisms. However, more recent work has found that small animals can solve
complex problems and in some cases, may use complex solutions to do so.
Exploring the problem-solving abilities of animals with various brain sizes is
therefore key to understanding the cognitive abilities that different neural
architectures can generate.

I am interested in studying how small animals make crucial decisions involved
with capturing prey. This includes studying which decisions these animals make
and how they make them.

</div>

<p class="research-hint">Select any image to view it full-size</p>

<div class="research-photos">
  <a href="{{ '/assets/img/research-decisions-adult-can.jpg' | relative_url }}" class="glightbox photo-tile" data-gallery="decisions-gallery" data-title="<em>Pholcus phalangioides</em>, 2023">
    {% include figure.liquid path="assets/img/research-decisions-adult-can.jpg" title="" class="img-fluid" %}
  </a>
  <a href="{{ '/assets/img/research-decisions-vial.jpg' | relative_url }}" class="glightbox photo-tile" data-gallery="decisions-gallery" data-title="<em>Pholcus phalangioides</em>, 2023">
    {% include figure.liquid path="assets/img/research-decisions-vial.jpg" title="" class="img-fluid" %}
  </a>
  <a href="{{ '/assets/img/research-decisions-spiderlings.jpg' | relative_url }}" class="glightbox photo-tile" data-gallery="decisions-gallery" data-title="<em>Pholcus phalangioides</em> with spiderlings, 2023">
    {% include figure.liquid path="assets/img/research-decisions-spiderlings.jpg" title="" class="img-fluid" %}
  </a>
</div>

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
