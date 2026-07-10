---
layout: page
permalink: /teaching/
title: Teaching / Mentoring
nav: true
nav_order: 4
---

<!-- Mentoring photos as article-style insets (2026-07-09, Madison-approved):
     one orange-framed photo floated inside each section so the text wraps
     around it like a news article (was: a 3-tile row under the page title).
     Floats alternate right/left/right for the editorial mix. Captions stay
     visible under each photo; responsive images via figure.liquid (WebP on
     the live build).
     Madison's follow-up (same day): NO section dividers on this page (the
     .mossy-section bars were removed here; homepage and /outreach keep
     theirs), and the Courses title sits beside its photo, directly above
     "See the CV...", so the figure comes BEFORE that h2 in the source.
     Each section lives in a .mentoring-section flow-root wrapper so a photo
     taller than its text can never bleed into the next section. -->
<style>
  .mentoring-inset {
    width: min(320px, 45%);
    margin: 0.35rem 0 1rem 1.75rem;
    float: right;
  }
  .mentoring-inset.inset-left {
    float: left;
    margin: 0.35rem 1.75rem 1rem 0;
  }
  .mentoring-inset .mentoring-frame {
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: 6px;
    /* Pastel-orange frame matching the hero portrait and gallery tiles. */
    border: 3px solid #feac74;
    box-sizing: border-box;
  }
  .mentoring-inset .mentoring-frame figure,
  .mentoring-inset .mentoring-frame picture {
    margin: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
  .mentoring-inset .mentoring-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .mentoring-inset figcaption.mentoring-caption {
    font-family: "Lexend", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 0.82rem;
    line-height: 1.45;
    color: var(--global-text-color-light);
    margin: 0.55rem 0 0;
    text-align: center;
  }
  /* Self-contained sections: flow-root swallows each photo's float so it
     can't overlap the next section; margin replaces the removed dividers'
     spacing. */
  .mentoring-section {
    display: flow-root;
    margin-bottom: 2.5rem;
  }
  /* Uniform text column per section: reserve the photo's width (plus its
     1.75rem gutter) on the photo's side for EVERY paragraph, so all lines in
     a section share one left/right edge at every viewport width. Without
     this, a paragraph starting below the photo snaps to full width and the
     text edges jump around as the window narrows. Sections 1 and 3 float
     their photo right; section 2 (Courses) floats left, and its h2 shares
     the column so the title stays over its own text. */
  .mentoring-section:nth-of-type(1) p,
  .mentoring-section:nth-of-type(3) p {
    margin-right: calc(min(320px, 45%) + 1.75rem);
  }
  .mentoring-section:nth-of-type(2) p,
  .mentoring-section:nth-of-type(2) h2 {
    margin-left: calc(min(320px, 45%) + 1.75rem);
  }
  /* Page title -> first section: match the visual gap between sections
     (their 2.5rem margin plus the h2's own top margin). */
  .mentoring-section:first-of-type {
    margin-top: 2.75rem;
  }

  /* MOBILE. Placed LAST on purpose: these rules have the same specificity as the
     base photo-column margins above, so source order is what makes them win. When
     this block sat before those base rules, the reserved margin never released on
     phones and the text was crushed into a thin strip beside the empty photo
     column. Here we stack each photo full-width and drop the reserved margin so
     text uses the full page width. */
  @media (max-width: 640px) {
    .mentoring-inset,
    .mentoring-inset.inset-left {
      float: none;
      width: 100%;
      max-width: 26rem;
      margin: 1.25rem auto;
    }
    /* The Courses figure precedes its h2 in source (desktop title alignment);
       stacked on mobile that reads as the previous section's photo. Flex
       reorder puts the heading first: h2 keeps order 0, photo 2, text 3. */
    .mentoring-section:nth-of-type(2) {
      display: flex;
      flex-direction: column;
    }
    .mentoring-section:nth-of-type(2) .mentoring-inset { order: 2; }
    .mentoring-section:nth-of-type(2) p { order: 3; }
    /* Release the reserved photo-column margins (no float to wrap around now). */
    .mentoring-section:nth-of-type(1) p,
    .mentoring-section:nth-of-type(3) p {
      margin-right: 0;
    }
    .mentoring-section:nth-of-type(2) p,
    .mentoring-section:nth-of-type(2) h2 {
      margin-left: 0;
    }
  }
</style>

<div class="mentoring-section" markdown="1">

## Teaching philosophy

<figure class="mentoring-inset">
  <div class="mentoring-frame">
    {% include figure.liquid path="assets/img/mentoring-kenzie-dasek-2024.jpg" title="" class="img-fluid" %}
  </div>
  <figcaption class="mentoring-caption">Undergraduate researcher Kenzie Dasek, 2024</figcaption>
</figure>

In life, we are often faced with new knowledge and must decipher what knowledge
to trust. This skill is applicable to many areas of life such as keeping up with
current events, making medical decisions, and navigating politics. It is
therefore my goal to give students the necessary tools to recreate this process:
thinking independently and using that thought process to decipher what knowledge
to trust. The task of learning these processes, however, falls primarily on the
students as I utilize an active learning approach in my teaching. To give the
students the tools to decipher what knowledge to trust, I emphasize critical and
independent thinking in my courses and create a learner-centered classroom to
encourage students to apply those skills in real time.

</div>

<div class="mentoring-section" markdown="1">

<figure class="mentoring-inset inset-left">
  <div class="mentoring-frame">
    {% include figure.liquid path="assets/img/mentoring-spider-squad-2023.jpg" title="" class="img-fluid" %}
  </div>
  <figcaption class="mentoring-caption">The Spider Squad: Ellie Wheeler, Ava Mueller, Sage DeLong, and me, 2023. Photo: Em Wikner</figcaption>
</figure>

## Courses

*See the [CV]({{ '/cv/' | relative_url }}) for a full list.*

**Animal Behavior** (instructor of record). Milwaukee Institute of Art and Design (MIAD), Summer 2026.

**Patterns in Nature** (instructor of record). MIAD, Fall 2025-Present.

**General Ecology Lab.** UW-Milwaukee, Spring 2022-Present.
Teaching assistant and head TA (Fall 2023-Present); co-authored new lab exercises on human survivorship and stream ecology.

**Guest Lecturer.** UW-Milwaukee. Ecology (2024-2025) and Behavioral Ecology (2023); topics including ecological succession, evolution, and hormones and behavior.

Earlier teaching includes Human Anatomy and Physiology, Invertebrate Zoology,
Biostatistics, and Introductory Biology labs at UW-Milwaukee and Illinois State
University.

</div>

<div class="mentoring-section" markdown="1">

## Mentoring philosophy

<figure class="mentoring-inset">
  <div class="mentoring-frame">
    {% include figure.liquid path="assets/img/mentoring-ellie-wheeler-2023.jpg" title="" class="img-fluid" %}
  </div>
  <figcaption class="mentoring-caption">Undergraduate researcher Ellie Wheeler and I. Photo: Em Wikner</figcaption>
</figure>

During my undergraduate degree, research opportunities were "few and far
between". This lack of opportunity hindered my progress towards graduate school
and in the field of animal behavior more generally. One of my career goals is to
offer opportunities to undergraduate researchers that I never had access to. I do
this by incorporating undergraduate researchers at all stages of the research
process starting from brainstorming initial ideas for a project to communicating
the final results to the public.

As a mentor, I prioritize communication and making myself accessible to my
mentees. This often comes in the form of weekly check-ins to ensure that my
mentees are confident in their work and that I can help troubleshoot any
problems. Between these check-ins my mentees largely work independently which
helps them gain confidence in their own research abilities.

To date I have mentored 18 undergraduate researchers. Four of these
undergraduates will be coauthor on future publications and one undergraduate has
presented our research at several local conferences. I have also mentored 16 high
school students through the Mentor Matching Engine - a virtual mentor program.

</div>
