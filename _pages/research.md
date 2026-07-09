---
layout: page
title: Research
permalink: /research/
nav: true
nav_order: 1
display_categories: [current, past]
horizontal: false
---

<!-- Research is organized by QUESTION so it survives organism switches.
     Each research area is a file in the _projects/ folder. Three placeholder
     areas are already created there; edit them or add more following the same pattern. -->

<div class="projects">
{% assign sorted_projects = site.projects | sort: "importance" %}
{% for project in sorted_projects %}
  {% include projects.liquid %}
{% endfor %}
</div>
