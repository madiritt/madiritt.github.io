---
layout: page
title: How do spiders make decisions involved in prey capture?
description: Insight, learning, decision making, spiders
img: # add a representative image, e.g. assets/img/problem-solving.jpg
importance: 1
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
    {% include figure.liquid path="assets/img/research-decisions.jpg" title="" class="img-fluid" %}
  </div>
</figure>

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
