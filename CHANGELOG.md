# Changelog

All notable changes to Madison Rittinger's academic website.
Format based on Keep a Changelog. No em-dashes anywhere (project rule).

This repo-level changelog begins at the point work moved into the repo itself
(VS Code / Claude Code). Earlier design-iteration history lives in Trevor's
Claude project outputs and is summarized in CLAUDE.md.

---

## [Unreleased]

### 2026-06-22 - Use academic email for homepage contact icon

#### Changed
- `_data/socials.yml`: switched the email social link from `mrittinger44@gmail.com` to her UWM academic address `ritting2@uwm.edu` (the same one already in `_data/cv.yml`). Interim choice until Madison says otherwise. RSS icon remains off; other social links still placeholder.

### 2026-06-22 - Real teaching philosophy

#### Changed
- `_pages/teaching.md`: replaced the DRAFT teaching philosophy with Madison's final text (provided verbatim).

### 2026-06-22 - Real bio paragraph

#### Changed
- `_pages/about.md`: replaced the placeholder bio with Madison's final text (provided verbatim). Note: contains one em-dash ("my cat — Ollie") kept at Madison's/Trevor's explicit request, a deliberate exception to the repo no-em-dash rule for author-provided content.

### 2026-06-22 - Remove redundant hero photo caption

#### Removed
- `_pages/about.md`: the `profile.more_info` caption under the portrait. It repeated the department + university already shown in the eyebrow subtitle, and the email is already in the contact/social section. Photo panel now holds just the portrait.

### 2026-06-22 - Enlarge homepage portrait

#### Changed
- Hero portrait felt small against the now-wider page. `_sass/_mossy.scss`: portrait `max-width` 270px -> 360px and `width` 78% -> 88%; hero panel `min-height` 320px -> 400px to stay proportional. `_layouts/about.liquid`: responsive-image `sizes` hint 280px/80vw -> 360px/85vw so a sharp enough source loads.

### 2026-06-22 - Widen sitewide content column

#### Changed
- `_config.yml`: `max_width` 930px -> 1200px. Feedback from Madison: content sat in a narrow center column with large empty margins on wider screens. The whole site reads this single value (`assets/css/main.scss` line 17 -> `$max-content-width`), so every page widens uniformly. Easy to tune later.

### 2026-06-22 - Scrub Einstein/demo content; rebuild placeholders from CV

#### Removed
- Einstein/al-folio demo content: `assets/json/resume.json`, `assets/html/relativity.html`, `assets/plotly/demo.html`, `_data/citations.yml` (4,180-line Einstein Scholar dump), and the two demo course pages in `_teachings/` ("Prof. Example"). Cleared demo data from `_data/coauthors.yml`, `_data/venues.yml`, `_data/repositories.yml`.
- `_config.yml`: removed the JSON-resume pipeline (`jekyll_get_json` + `jsonresume`), now that the CV renders from `_data/cv.yml` (RenderCV).

#### Changed
- Research projects (`_projects/`) rewritten from Madison's real publications, with corrected categories (the miniaturization/dissertation work was wrongly marked "past"): problem-solving/insight in spiders (current), miniaturization and cognition (current), avian early-life physiology (past).
- `_pages/teaching.md`: real courses, mentoring record, and a draft teaching philosophy.
- `_pages/outreach.md`: real outreach/service activities.
- `_pages/gallery.md`: cleaner "coming soon" placeholder.

#### Notes
- Interpretive prose (research narratives, teaching philosophy) is marked DRAFT in-file for Madison to confirm; factual lists are from her CV. Still placeholder: bio, social links (ORCID/Scholar), gallery photos.

### 2026-06-22 - CV upgraded to native structured page

#### Changed
- `/cv/` is now a fully structured, on-theme CV instead of an embedded PDF. Replaced the demo `_data/cv.yml` (Albert Einstein) with Madison's complete CV in RenderCV format: Education, Peer-Reviewed Publications, Manuscripts in Review, Manuscripts in Preparation, Research Experience, Presentations, Teaching Experience, Professional Development, Mentorship, Grants and Fellowships, Awards and Honors, Service.
- `_pages/cv.md`: back to `layout: cv` with `cv_format: rendercv`; keeps the PDF download icon (`cv_pdf`). Dropped the iframe embed.
- `_sass/_mossy.scss`: styled the CV cards and retinted the date badges (default red "danger" color) to citrine.

#### Notes
- Transcribed from `assets/pdf/Rittinger_2026_CV.pdf`; phone number intentionally omitted from the web version (still in the downloadable PDF), email kept. No em-dashes (verified on the rendered page).
- Demo `assets/json/resume.json` (Einstein, jsonresume) is now doubly unused; safe to delete later.

### 2026-06-22 - First real content: publications + CV

#### Added
- `_bibliography/papers.bib`: replaced the placeholder with Madison's 4 real publications (2022 GCE, 2024 Sci Reports, 2025 Biology Letters, 2026 Behav Ecol Sociobiol). The two recent first-author papers are flagged `selected={true}` so they feature on the homepage.
- `assets/pdf/Rittinger_2026_CV.pdf`: real CV.

#### Changed
- `_pages/cv.md`: switched from the structured `cv_format: rendercv` (which had no data and would otherwise fall back to the Einstein demo `resume.json`) to a PDF-first page (`layout: page`) that embeds the CV inline and offers a download button. Single source of truth = the PDF; updating the CV = replacing one file.
- `_sass/_mossy.scss`: styling for the CV PDF embed/download.

#### Notes
- Demo `assets/json/resume.json` (Einstein) is now unused but left in place; can be removed later.
- Remaining placeholders: bio, social links, teaching, outreach, gallery.

### 2026-06-22 - Mossy Modernist design ported (homepage hero + sitewide palette)

#### Added
- `_sass/_mossy.scss`: the Mossy Modernist styling, loaded last via a local `assets/css/main.scss` override (one added `@use "mossy"`). Contains:
  - Two cohesive palettes wired to the theme toggle: LIGHT (warm parchment `#f1ecdd`, deep-moss text, deep-citrine accents) in `:root`; DARK (deep moss `#1e2a18`, cream text, citrine accents) in `html[data-theme="dark"]`. Both flow through al-folio's `--global-*` custom properties, so the whole site (and Tailwind utilities) recolor at once.
  - Theme-aware atmospheric layered radial-gradient backgrounds.
  - Typography: Fraunces (headings, weight 500, never italic), Lexend (body), JetBrains Mono (small-caps labels/dates).
  - Hero, "Currently" element, card hover-lift, mono citrine dates.
- `_layouts/about.liquid` (local override): 2-column hero (eyebrow / name / bio / Currently on the left; rgba pastel-orange panel + portrait with `8px 8px 0` moss offset shadow on the right). News, selected publications, and social preserved below.
- `_pages/about.md`: `current:` front-matter field driving the Currently element (Madison updates this 3-6x/year). PLACEHOLDER text for now.
- `_config.yml`: google_fonts URL extended with Fraunces, Lexend, JetBrains Mono.

#### Notes
- Verified in the local server: hero markup renders, portrait resolves (HTTP 200), fonts linked, both palettes compiled. Visual review still pending.
- Light/dark both functional Mossy variants (decision: keep a working toggle rather than force a single dark identity).

### 2026-06-22 - Local build environment stood up

#### Added
- Working local Jekyll dev server. Installed Ruby 3.3.11 + DevKit and Node 26 via winget; `bundle install` (116 gems) succeeded; `bundle exec jekyll build` is green (~2.5s) and `jekyll serve` responds 200 at http://localhost:4000.
- `_config.dev.yml` (gitignored): local-only overrides that disable imagemagick (so no native binary is needed locally) and point url/baseurl at localhost. Does not affect the production CI build.
- `.gitignore`: added `_config.dev.yml`.

#### Removed
- `assets/jupyter/blog.ipynb` (vestigial al-folio demo notebook). The `jekyll-jupyter-notebook` converter hard-crashes the local build when `jupyter` is absent; nothing referenced the notebook (no `_posts`). Restorable from git history; live CI installs nbconvert if it is ever needed.

#### Notes
- Verified styling architecture against the al_folio_core 1.0.11 gem source: palette is driven by `--global-*` CSS custom properties (`_sass/_themes.scss`); the homepage hero is `_layouts/about.liquid`; both `tailwind.css` and `main.css` load (main.css last). Documented in CLAUDE.md "How to port" and "Local development".

### 2026-06-22 - CLAUDE.md design-port correction (SCSS -> Tailwind v4)

#### Fixed
- CLAUDE.md "How to port" and related lines said the visual design ports into al-folio's SCSS. This build has no SCSS: `_config.yml` sets `al_folio.style_engine: tailwind` with `css_entry: assets/tailwind/app.css`, and there is no `_sass/` folder. Rewrote the porting guidance to the actual Tailwind v4 override path (create a local `assets/tailwind/app.css`, define palette via `@theme` tokens, likely override the `about` homepage layout) so future sessions are not misdirected.

#### Added
- `_design-reference/` folder (not published; underscore prefix = Jekyll skips it). Holds `visual-directions-v2-mockup.html` (the original 4-direction v2 mockup) plus a `README.md` documenting how to read it.

#### Decided
- The downloaded mockup turned out to be the PRE-refinement state, not the refined Mossy-only file the browser session described. Its `.d4` section still contains six rejected/changed items (solid clay orange instead of transparent pastel `#feac74`, the removed yellow corner circle, no Currently element, flat background instead of the atmospheric gradient, italic titles, "Madi" instead of "Madison"). Resolution: CLAUDE.md's locked spec is the source of truth for the port; the mockup is used only as a structural-CSS reference. No need to hunt the browser for the refined file, the spec already encodes every refined value. Documented in `_design-reference/README.md` and the CLAUDE.md "How to port" section.

### 2026-06-12 - Repo prepared for VS Code / Claude Code workflow

#### Added
- `CLAUDE.md` at repo root: comprehensive project context (status, locked Mossy Modernist design spec, site structure, hard rules, what's still needed) so Claude Code sessions in VS Code pick up with full context.
- `CHANGELOG.md` at repo root (this file): ongoing change log now that work happens in the repo.

#### Changed
- `_config.yml` exclude list: added `CLAUDE.md` and `CHANGELOG.md` so these docs never publish to the live site.

#### Project status at this point
- Phase 2 complete: configured site builds green on https://madiritt.github.io
- Identity, navigation, content placeholders, and Madison's headshot all live
- Commit chain on main: c7aab07 (url/baseurl) -> 817845a (config) -> a308323 (headshot) -> 634253c (purgecss restore)
- Next: Mossy Modernist design port into Tailwind v4 (Phase 4); content fill in parallel (Phase 3)

---

## Earlier history (pre-repo, summarized)

Detailed history of the design exploration (4 initial directions, Mossy Modernist
color iterations, the shelved Scholar's Study/Ravenclaw exploration, all palette
decisions) and the site configuration build is preserved in Trevor's Claude project
outputs as timestamped PROJECT_PLAN and CHANGELOG snapshots. CLAUDE.md carries the
distilled, decisions-only version.

Key milestones:
- Domains purchased (madisonrittinger.org primary, madirittinger.org redirect)
- al-folio + GitHub Pages + Cloudflare stack locked
- Mossy Modernist visual direction locked (deep moss, citrine, pastel orange #feac74, atmospheric gradient)
- Vanilla al-folio stood up on GitHub Pages, verified building
- Site configured (identity, nav, placeholders, demo stripped) and verified green
