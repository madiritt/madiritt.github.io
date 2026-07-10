---
layout: page
permalink: /publications/
title: Publications
description: Happy to forward pdf's upon request
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Photographer credits on the publication thumbnails are handled by the shared
     _includes/publication-credits.html (included at the bottom of this page), so
     the homepage's Selected Publications and this page render them identically. -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography %}

</div>

{% include publication-credits.html %}
