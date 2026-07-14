# CLAUDE.md - Project context for Madison Rittinger's academic website

> This file is read automatically by Claude Code at the start of each session.
> It carries the full project context so any new session can pick up where the last left off.
> Keep it current: when a major decision or phase change happens, update this file.

---

## What this is

A long-term personal academic website for **Madison Rittinger**, PhD candidate in behavioral ecology at the University of Wisconsin-Milwaukee. The site is meant to persist across her career (PhD to postdoc to faculty). Built once, maintained continuously by Madi via plain-language runbooks.

- **Owner:** Madison Rittinger
- **Technical lead:** Trevor Bellerive (GitHub: `abysulgaming`)
- **Live URL:** https://madisonrittinger.org (since 2026-07-13; madiritt.github.io 301s here)
- **Repo:** github.com/madiritt/madiritt.github.io

### Name policy (IMPORTANT)
Her displayed/published name on the rendered site, in mockups, and in any content she shares publicly must always be **"Madison Rittinger"** (full first name), never "Madi" or "Madi Rittinger". This is non-negotiable for anything a site visitor or external reader sees.

Inside internal maintenance documentation (this `CLAUDE.md`, `MAINTENANCE-GUIDE.md`, `CHANGELOG.md`, `TECH-STACK.md`), informal **"Madi"** IS used and is fine when referring to her as a person (e.g. "Madi asked", "Madi's Google account"). This was Trevor's deliberate choice on 2026-07-13. Even in these internal docs, three things stay "Madison": the full formal name **"Madison Rittinger"**, anything inside a URL/domain (madisonrittinger.org), and literal config/code values the site actually reads (`first_name: Madison`, `research_gate_profile: Madison-Rittinger`, BibTeX author `Rittinger, Madison A`). Do NOT bulk-swap those back and forth; the distinction is person-reference (Madi) vs formal-name/site-literal (Madison).

---

## Hard rules for working in this repo

- **NEVER use em-dashes** in any file, commit message, or output. Use a hyphen with spaces, a colon, or restructure. This is a strict, non-negotiable preference.
  - **One sanctioned exception:** the bio paragraph in `_pages/about.md` ("...antagonizing my cat — Ollie") keeps its em-dash. Madi wrote it that way and asked for it untouched. Leave that one em-dash alone; the rule still applies everywhere else.
- **Always update `CHANGELOG.md`** (repo root) when making changes. Use the existing format: dated entries under `[Unreleased]`, categorized (Added/Changed/Fixed/Removed/Decided/Notes).
- **Error logging / changelog discipline** applies to scripts and config work.
- Lowercase `dci` is a convention from Trevor's other work; not relevant here but if it ever comes up, honor it.
- Prefer pragmatic, working solutions over theoretical perfection. Do not over-architect.
- When making multi-file or destructive changes, explain the plan, then execute with confidence.
- Triple-check accuracy. Distinguish what is documented/tested vs. inferred/untested.

---

## Tech stack (locked)

| Layer | Choice | Notes |
|---|---|---|
| Template | al-folio (Jekyll) | Uses `al_folio_core` gem as theme runtime; local files override theme files |
| Build | GitHub Actions (`.github/workflows/deploy.yml`) | The ONLY workflow kept; all others were removed |
| Hosting | GitHub Pages | Serves from the `gh-pages` branch (output) |
| Source branch | `main` | deploy.yml triggers on push to `main`, builds, writes to `gh-pages` |
| Registrar/DNS | Cloudflare | Primary domain madisonrittinger.org; redirect domain madirittinger.org |
| TLS | Let's Encrypt via GitHub Pages | |

### Build pipeline (how publishing works)
Push source to `main` -> deploy.yml runs Jekyll build (with imagemagick for responsive WebP, purgecss for CSS minification) -> finished site written to `gh-pages` -> GitHub Pages serves it. Build takes 3-7 min.

### deploy.yml dependencies (do NOT delete these files)
`package.json`, `package-lock.json` (npm ci), `Gemfile`, `Gemfile.lock` (Jekyll), `requirements.txt` (pip), `purgecss.config.js` (CSS purge step), and the `giscus` key block in `_config.yml`. A prior cleanup pass deleted `purgecss.config.js` by mistake and broke the build; it has been restored. Audit deploy.yml before removing any root-level config file.

### Local development (preview server)
A working local build exists (set up 2026-06-22). Toolchain installed via winget: **Ruby 3.3.11 + DevKit** (`C:\Ruby33-x64`), **Node 26** (`C:\Program Files\nodejs`). Python and imagemagick are intentionally NOT installed locally.

Run the dev server:
```
bundle exec jekyll serve --config _config.yml,_config.dev.yml --livereload
```
Serves at http://localhost:4000 with auto-reload. Full rebuild is ~2.5s.

- `_config.dev.yml` (gitignored, local-only) disables imagemagick so no binary is needed; originals render in place of responsive WebP. It does NOT affect the live GitHub Actions build, which still runs the full production pipeline.
- The al_folio_core gem runs the Tailwind build inside `jekyll build`; no separate `npm` step is needed for local serve (`npm ci` is only for the gem's own tests).
- SCREENSHOT GOTCHA: Edge headless on Windows enforces a ~450px minimum window width; `--window-size=375,...` silently renders a wider layout and fake-clips the right edge (looks like site-wide mobile overflow; it is not). For true phone-width screenshots, point headless Edge at a local harness HTML containing a 375px-wide iframe of the localhost page.
- WINDOWS/HARNESS GOTCHA: the automation shell does not auto-pick-up PATH after winget installs. Prefix shell calls with:
  `$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")`
  A normal user terminal (opened fresh) sees Ruby/Node on PATH without this.
- The demo notebook `assets/jupyter/blog.ipynb` was removed: `jekyll-jupyter-notebook` hard-crashes the build when `jupyter` is not on PATH, and nothing referenced it (no `_posts`). Restore from git history if notebook content is ever needed (live CI has nbconvert and can convert it).

---

## Current status (as of 2026-07-13)

**The site is LIVE at https://madisonrittinger.org** - design ported, content filled, custom domain active with enforced HTTPS. madiritt.github.io 301-redirects to the new domain. Day-to-day work is now polish, content updates from Madi, and the remaining nice-to-haves (madirittinger.org redirect domain, runbook refresh for the new URL).

Domain setup (2026-07-13): Cloudflare DNS-only (grey cloud) records - four apex A records to GitHub Pages IPs + `www` CNAME to madiritt.github.io; repo-root `CNAME` file carries the custom domain through every deploy (the deploy action rebuilds gh-pages from scratch, so the UI-only setting would be wiped without it); Let's Encrypt certificate covers apex + www; `Enforce HTTPS` ticked. Pages settings are owner-only on a personal repo - changing them requires the madiritt login, not a collaborator.

### Phase tracker
| # | Phase | Status |
|---|---|---|
| 1 | Accounts + domains | COMPLETE (both domains owned, GitHub account + 2FA done) |
| 2 | Configure al-folio | COMPLETE (2026-06-12, builds green) |
| 3 | Content fill | COMPLETE (real bio, CV v7, publications, teaching, gallery, socials all live) |
| 4 | Visual design port | COMPLETE (Mossy Modernist live in both themes; light cooled to cream 2026-07-13) |
| 5 | Domain + DNS + security | COMPLETE (2026-07-13: madisonrittinger.org live, HTTPS enforced, old URL 301s). Remaining nice-to-haves: madirittinger.org redirect, GitHub verified-domain |
| 6 | Documentation (runbooks) | COMPLETE (2026-07-13: MAINTENANCE-GUIDE.md at repo root supersedes the out-of-repo runbooks 00-05; beginner-level, covers browser + VS Code routes, every content type, recovery, Cloudflare) |
| 7 | Launch | LIVE at madisonrittinger.org |

---

## THE NEXT BIG TASK: Mossy Modernist design port

The visual design is locked as a standalone HTML mockup but has NOT been ported into the site's Tailwind v4 styling yet. This is the next major work item. The mockup lives outside the repo (in Trevor's Claude outputs as `visual_directions_for_madi.html`); the full spec is below so it can be reproduced.

### Mossy Modernist - full design spec

**Palette:**
- Background base: deep moss `#1e2a18`
- Background gradient (atmospheric, layered on the base):
  - Upper-left light pool: `radial-gradient(ellipse 1100px 700px at 12% -5%, rgba(82, 116, 64, 0.32) 0%, transparent 60%)`
  - Lower-right shadow pool: `radial-gradient(ellipse 900px 600px at 88% 110%, rgba(14, 22, 12, 0.55) 0%, transparent 55%)`
- Body text: warm cream `#f4f0d8` (and `#e8e4d0` for slightly dimmer)
- Muted text: `#b8b5a3`, `#c4c0a8`
- Primary accent (small details, labels, dates, links, brand): citrine gold `#d4c878`
- Secondary accent (hero color block): pastel orange `#feac74`
  - Used with rgba transparency on the large hero panel so moss bleeds through: `rgba(254, 172, 116, 0.90)` to `rgba(224, 142, 86, 0.75)` gradient
  - Solid hex `#feac74` -> `#b87038` for smaller accents (card image gradients)
- Card surface: `#2a3624`
- Card border: `rgba(212, 200, 120, 0.18)`, brightening to full citrine `#d4c878` on hover

**Typography:**
- **CURRENT (2026-06-30): single font sitewide = Lexend.** Madi asked for one font across the whole site; every text element (headings, the hero name, body, the uppercase labels, lightbox captions, news dates) now uses Lexend. Hierarchy is carried by weight, size, and letter-spacing, not by switching families. Code/typogram/bibtex blocks stay `monospace` (correct). Lora and JetBrains Mono are no longer used in rendered output (their Google Fonts links may still load until cleaned up; harmless).
- HISTORICAL (pre-2026-06-30), kept for context if the multi-font look is ever revisited:
  - Display/headings: Lora (serif), weight 500, NO italic on titles. (Originally Fraunces; swapped 2026-06-22 because Fraunces' curly lowercase "f" read as too wavy on headings like "Professional Summary". Lora keeps the warm serif feel with conventional letterforms.)
  - Body: Lexend (sans-serif)
  - Small-caps labels/dates: JetBrains Mono
  - All Google Fonts

**Title bar rule:** ALL titles (h1/h2/h3) are uniform: now Lexend (was Lora), cream `#f4f0d8`, weight 500, no italic, no color splits. Italics were deliberately removed from all titles. Body inline links ARE italicized (scholarly reference style); titles are not.

**Layout signatures:**
- Hero is a 2-column split: left = text (eyebrow, big name/headline, bio, Currently element) on moss; right = pastel orange panel (with transparency) holding the portrait
- Portrait is full-bleed inside the orange panel: it fills the panel and the orange shows only as a slim even frame (8px padding). Changed 2026-06-30: previously the portrait was inset (88% width) and centered, but a figure/flex centering quirk drifted it off-center; full-bleed eliminates the margin entirely. The offset moss shadow (`box-shadow: 8px 8px 0 #1e2a18`) was also REMOVED 2026-06-30 at Madi's request, as was the same hard offset shadow on the publication thumbnails.
- "Currently" status element below the bio: pastel orange dot with soft halo glow + citrine `CURRENTLY` mono label + cream text. Carries Madi's real status (first real text 2026-07-06: "Analyzing data and writing manuscripts"); keep it short, no timeline/date needed. Madi updates this 3-6x/year; it signals the site is live/maintained.
- Research cards: 3-column grid, card surface `#2a3624`, citrine top accent, numbered (01/02/03) in mono. Hover: `translateY(-3px)` + border to full citrine + `box-shadow: 0 10px 24px rgba(0,0,0,0.28)`.
- News/dates in mono small-caps, citrine.
- **Background silhouette field (added 2026-07-06, replaced the orb-web texture layer):** tall grasses (with timothy seed heads) rising from the bottom viewport edge, dragonflies in the open air, a damselfly perched on the tallest seed head, and orb-weaver spiders hanging from draglines anchored above the top edge - all as faded silhouettes (opacity 0.07) behind every page. Generated per-viewport by `assets/js/mossy-field.js` (loaded via the local `_includes/footer.liquid` override); approved settings live in that script's CONFIG block; retune interactively with `_design-reference/grass-insects-mockup.html` then copy values back. Silhouette color = `--mossy-sil` in `_sass/_mossy.scss` (per theme). HARD RULE for this layer: no clipped/cut-off imagery; the generator clamps every blade tip and figure fully inside the viewport by construction. Do NOT reintroduce the orb-web tile (`genweb.js` is retired history).

**Rejected during design (do NOT reintroduce):**
- Drop cap on the bio paragraph (the bio starts with "I'm..." and the contraction made the drop cap orphan the apostrophe-m awkwardly). REJECTED.
- Decorative yellow circle in the hero corner. REMOVED.
- Orange as a hard/solid color block (washed out / competed with moss). Burgundy/oxblood (too dark/heavy). Salmon-peach (too skin-toned). The final answer is pastel orange `#feac74` WITH rgba transparency.
- Roman numeral dates, Latin mottos, portrait corner tabs (these were from a shelved "Scholar's Study / Ravenclaw" exploration, not Mossy Modernist).

**Accessibility:** the palette passes WCAG AA at all text sizes (verified; most pairs clear AAA). The high-contrast dark base helps here.

### How to port (verified against al_folio_core 1.0.11 gem source)
The styling is **gem-based**: `al_folio_core` ships the theme (`_layouts/`, `_includes/`, `_sass/`, `assets/`). The site repo has NO local `_sass/` or stylesheets; you customize by placing local files at the same relative path as gem files (standard Jekyll theme override) or by redefining the theme's CSS variables.

How styling actually loads (from the gem's `_includes/head.liquid`):
- `style_engine: tailwind` (`_config.yml`). `head.liquid` links BOTH `/assets/css/tailwind.css` (Tailwind v4 build) AND `/assets/css/main.css` (compiled from the gem's `_sass` SCSS pipeline) - main.css loads LAST.
- The whole palette is driven by **CSS custom properties** defined in the gem's `_sass/_themes.scss`: `--global-bg-color`, `--global-text-color`, `--global-theme-color`, `--global-hover-color`, `--global-card-bg-color`, `--global-divider-color`, footer vars, etc. Light values live in `:root`; dark values in `html[data-theme="dark"]`. Defaults: theme color `$purple-color` (light) / `$cyan-color` (dark).

The port is two concrete moves:
1. **Recolor (whole site):** redefine the `--global-*` custom properties to the Mossy palette (moss `#1e2a18` bg, citrine `#d4c878` theme/hover, cream `#f4f0d8` text, card `#2a3624`, etc.) via a local stylesheet that loads after the theme, or by overriding the relevant theme partial. Because al-folio consumes these vars everywhere, this recolors the entire site cleanly without fighting Tailwind internals.
2. **Custom hero + Currently + research cards:** the homepage hero is the gem's `_layouts/about.liquid` (name `<h1>` in `.post-header`, a floated `.profile` image div, then `about.md` content). Override it with a local `_layouts/about.liquid` carrying the 2-column split markup, then add custom CSS for the atmospheric gradient, the rgba pastel-orange panel, the offset portrait shadow (`box-shadow: 8px 8px 0 #1e2a18`), the Currently element, and the research-card grid/hover.

NOTE: dark-mode toggle is enabled (`enable_darkmode: true`). Decide whether Mossy is the single look (force it in both `:root` and the dark block) or only the dark theme. The mockup notes say the hero stays moss in either mode.

This is unscoped work; expect it to be the largest remaining chunk. **Recommended first step: a small spike doing the palette recolor + homepage hero only**, previewed locally, before touching the rest of the site. The exact "loads-last custom CSS" hook should be confirmed live with `jekyll serve` (see Local dev below).

**Reference mockup:** `_design-reference/visual-directions-v2-mockup.html` (the `.d4` section is Mossy Modernist). WARNING: that mockup is the PRE-refinement state and contradicts this spec on six points (solid orange instead of transparent pastel, a yellow corner circle that was removed, no Currently element, flat background instead of the atmospheric gradient, italic titles, and "Madi" instead of "Madison"). See `_design-reference/README.md`. Use the mockup only for structural CSS (grid proportions, card layout/hover, news rows, typography wiring); for all colors and the six points, THIS spec is the source of truth.

---

## Site structure (as configured)

### Navigation (final)
About (homepage `/`) - Research (1) - Publications (2) - CV (3) - Teaching / Mentoring (4) - Gallery (5)

- **News** is a homepage section AND lives at `/news/`, but is NOT in the main nav.
- **Outreach** lives at `/outreach/` but is NOT in the main nav (content preserved; may merge into Teaching/Mentoring later or stay URL-accessible).

### Key files
- `_config.yml` - site config; identity (first_name Madison, last_name Rittinger), Jekyll Scholar set to bold Rittinger, imagemagick responsive images enabled
- `_pages/about.md` - homepage, layout `about`, REQUIRES `assets/img/prof_pic.jpg` to exist or the build fails
- `_pages/research.md` - lists `_projects/` entries (organized by research QUESTION, not organism, so it survives taxon switches)
- `_projects/*.md` - one file per research question (3 placeholders exist)
- `_pages/publications.md` - driven by `_bibliography/papers.bib`
- `_pages/cv.md` - simple CV page (2026-07-06): a download button + embedded PDF preview of `cv_pdf` (assets/pdf/Rittinger_2026_CV.pdf); the structured `layout: cv` / `_data/cv.yml` rendering was retired (data file kept, unrendered)
- `_pages/teaching.md` - title "Teaching / Mentoring". Article-style layout (2026-07-09, Madi-approved): each of the 3 mentoring photos floats inside its section with text wrapping around it (right/left/right); the Courses photo precedes its h2 so the title sits beside the photo over its own text; every paragraph reserves the photo column (margin = photo width + gutter) so text edges stay uniform at all widths; NO section dividers on this page (Madi removed them here; homepage + /outreach keep theirs). All styles inline in the page.
- `_pages/gallery.md`, `_pages/outreach.md`, `_pages/news.md`
- `_news/*.md` - news items (1 starter exists)
- `_data/socials.yml` - email live; ORCID/Scholar/ResearchGate/LinkedIn are commented PLACEHOLDERs
- `assets/img/prof_pic.jpg` - Madi's headshot (REQUIRED by about layout)

### Content placeholders awaiting Madi's real content
Search the repo for `PLACEHOLDER` to find them: 3 research-question descriptions, teaching philosophy + courses + mentoring, outreach activities, gallery photos, the .bib entries, and the commented social links in `_data/socials.yml`.

The **bio paragraph in `_pages/about.md` is FINAL (Madi's real bio, as of 2026-06-24)** - no longer a placeholder. Keep its em-dash (see Hard rules exception).

---

## Still needed from Madi
- ORCID iD, Google Scholar URL, ResearchGate URL, LinkedIn URL (uncomment + fill in `_data/socials.yml`)
- ~~Real bio paragraph~~ DONE (final bio in `_pages/about.md` as of 2026-06-24)
- CV PDF (goes in `assets/pdf/`, referenced from `_pages/cv.md`)
- Research question descriptions + representative images
- Publication list (as BibTeX in `_bibliography/papers.bib`)
- Teaching philosophy, course list, mentoring info
- Field/macro photos for the Gallery
- Outreach activities

She is processing/sharing these with Trevor. Content fill (Phase 3) can proceed in parallel with the design port (Phase 4).

---

## Runbooks (plain-language, for Madi's self-maintenance)
Drafted and delivered to Trevor (outside the repo, in Claude outputs). Consider moving copies into a `docs/` or wiki later:
- 00: GitHub site setup (done)
- 01: Apply site config via GitHub Desktop (done)
- 02: Add a publication (BibTeX)
- 03: Update bio / CV
- 04: Add photos
- 05: Emergency reference (what to do if something breaks)

---

## Working style notes (Trevor's preferences)
- Precise, technical, concise. No preamble/postamble. Lead with the answer.
- Step-by-step instructions Trevor can follow; he is newer to git/GitHub/Jekyll (improving fast).
- Push back on flawed premises rather than agreeing reflexively.
- Be honest about uncertainty; flag untested claims with "try this and see."
- For destructive changes, include a rollback method.
- After generating code, offer a review pass for over-architecture or mistakes.
- Use latest PowerShell (from Microsoft Store) as the scripting reference if PowerShell ever comes up.
