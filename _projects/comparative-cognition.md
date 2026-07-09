---
layout: page
title: How do web spiders navigate?
description: Memory, navigation, web spiders
img: # add a representative image, e.g. assets/img/microct-spider.jpg
importance: 2
category: current
---

<!-- Representative photo floated as an article-style inset (2026-07-09), matching
     the Teaching/Mentoring page: the photo floats right and the prose wraps
     around it, with every paragraph reserving the photo's column so text edges
     stay uniform at all widths. Orange frame matches the hero portrait and the
     mentoring tiles. Responsive WebP comes from figure.liquid on the live build. -->
<style>
  .research-body { display: flow-root; }
  .research-body .research-photo {
    float: right;
    width: min(320px, 45%);
    margin: 0.35rem 0 1rem 1.75rem;
  }
  .research-body .research-frame {
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: 6px;
    border: 3px solid #feac74;
    box-sizing: border-box;
  }
  .research-body .research-frame figure,
  .research-body .research-frame picture { margin: 0; width: 100%; height: 100%; display: block; }
  .research-body .research-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  /* Reserve the photo column for every paragraph so all lines share one edge
     at every width (no full-width snap below the photo mid-page). */
  .research-body p {
    margin-right: calc(min(320px, 45%) + 1.75rem);
  }
  @media (max-width: 640px) {
    /* Single column: photo stacks full-width on top (already first in source),
       release the reserved column. */
    .research-body .research-photo {
      float: none;
      width: 100%;
      max-width: 26rem;
      margin: 0 auto 1.5rem;
    }
    .research-body p { margin-right: 0; }
  }
</style>

<div class="research-body" markdown="1">

<figure class="research-photo">
  <div class="research-frame">
    {% include figure.liquid path="assets/img/research-navigation.jpg" title="" class="img-fluid" %}
  </div>
</figure>

Many animals are capable of navigating complex environments such as
transcontinental migration routes or circuitous foraging trips. Navigating these
environments can require traversing difficult terrain, interacting with other
conspecifics, and avoiding potential predators. There are many ways that animals
can accomplish these tasks, which can require using visual, olfactory, and even
cognitive processes like memory. Although navigation using cognitive processes
is considered complex, many small animals utilize this strategy. For example, it
is not uncommon for arthropods to navigate by memory.

I am interested in studying how small animals navigate complex environments.
Particularly how spiders navigate their own webs and their surrounding
environment.

</div>
