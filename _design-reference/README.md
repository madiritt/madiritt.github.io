# Design reference (not published)

Files here are visual reference only. The leading-underscore folder name means
Jekyll never copies it to the built site, so nothing here publishes.

## visual-directions-v2-mockup.html

The original "v2" visual-directions mockup with all four explored directions
(Herbarium, Wildflower, Apothecary, Mossy Modernist). Only the **Mossy
Modernist** section (`.d4`, the 4th `<section>`) is the chosen direction. The
other three are kept for context (they show what was rejected).

### IMPORTANT: this mockup is the PRE-refinement state. CLAUDE.md is the source of truth.

The locked Mossy Modernist spec in `CLAUDE.md` supersedes this mockup. The `.d4`
section here still contains six things the spec changed or rejected. Do NOT port
these from the mockup; use the spec values instead:

1. Hero panel color: mockup uses solid `#c4612b` -> `#a84d1a` (REJECTED hard
   block). Spec: pastel orange `#feac74` WITH rgba transparency
   (`rgba(254,172,116,0.90)` -> `rgba(224,142,86,0.75)`).
2. Yellow corner circle (`.hero-left::before`, 24px `#d4c878`): REMOVED in spec.
3. "Currently" status element below the bio: required by spec, absent in mockup.
4. Atmospheric layered radial-gradient background: required by spec, mockup is
   flat `#1e2a18`.
5. Title italics (`<em>` citrine in hero name + section headers): removed in spec;
   all titles are uniform Fraunces cream, no italic.
6. Name: mockup says "Madi Rittinger"; everywhere on the real site it is
   "Madison Rittinger".

### What this mockup IS still good for

Structural skeleton only: grid proportions, card layout and hover, news-row
structure, JetBrains Mono small-caps labels, and the Fraunces/Lexend/JetBrains
Mono typography wiring. Read those, not the colors.
