# CLAUDE.md - Project context for Madison Rittinger's academic website

> This file is read automatically by Claude Code at the start of each session.
> It carries the full project context so any new session can pick up where the last left off.
> Keep it current: when a major decision or phase change happens, update this file.

---

## What this is

A long-term personal academic website for **Madison Rittinger**, PhD candidate in behavioral ecology at the University of Wisconsin-Milwaukee. The site is meant to persist across her career (PhD to postdoc to faculty). Built once, maintained continuously by Madison via plain-language runbooks.

- **Owner:** Madison Rittinger
- **Technical lead:** Trevor Bellerive (GitHub: `abysulgaming`)
- **Live URL (current):** https://madiritt.github.io
- **Final URL (after Phase 5):** https://madisonrittinger.org
- **Repo:** github.com/madiritt/madiritt.github.io

### Name policy (IMPORTANT)
Her displayed/published name everywhere on the site, in mockups, runbooks, and any formal content must always be **"Madison Rittinger"** (full first name), never "Madi". Informal conversational reference to "Madi" in chat is fine, but never in committed files or rendered output.

---

## Hard rules for working in this repo

- **NEVER use em-dashes** in any file, commit message, or output. Use a hyphen with spaces, a colon, or restructure. This is a strict, non-negotiable preference.
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

---

## Current status (as of 2026-06-12)

**Phase 2 complete: the configured site builds green on madiritt.github.io.**

Commit chain on `main`:
- `c7aab07` url/baseurl pointed at madiritt.github.io
- `817845a` site configuration (identity, nav, placeholders, demo content stripped)
- `a308323` Madison's headshot added
- `634253c` purgecss.config.js restored (build fix)

### Phase tracker
| # | Phase | Status |
|---|---|---|
| 1 | Accounts + domains | COMPLETE (both domains owned, GitHub account + 2FA done) |
| 2 | Configure al-folio | COMPLETE (2026-06-12, builds green) |
| 3 | Content fill | IN PROGRESS (Trevor processing resources Madison shared) |
| 4 | Visual design port | NEXT (Mossy Modernist mockup locked; needs porting to SCSS) |
| 5 | Domain + DNS + security | Not started (15-min job at the end) |
| 6 | Documentation (runbooks) | Runbooks 00-05 drafted |
| 7 | Launch | Pending 3-5 |

---

## THE NEXT BIG TASK: Mossy Modernist design port

The visual design is locked as a standalone HTML mockup but has NOT been ported into al-folio's SCSS yet. This is the next major work item. The mockup lives outside the repo (in Trevor's Claude outputs as `visual_directions_for_madi.html`); the full spec is below so it can be reproduced.

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
- Display/headings: Fraunces (serif), weight 500, NO italic on titles
- Body: Lexend (sans-serif)
- Small-caps labels/dates: JetBrains Mono
- All Google Fonts

**Title bar rule:** ALL titles (h1/h2/h3) are uniform: Fraunces, cream `#f4f0d8`, weight 500, no italic, no color splits. Italics were deliberately removed from all titles. Body inline links ARE italicized (scholarly reference style); titles are not.

**Layout signatures:**
- Hero is a 2-column split: left = text (eyebrow, big name/headline, bio, Currently element) on moss; right = pastel orange panel (with transparency) holding the portrait
- Portrait sits on the orange panel with an offset moss shadow (`box-shadow: 8px 8px 0 #1e2a18`)
- "Currently" status element below the bio: pastel orange dot with soft halo glow + citrine `CURRENTLY` mono label + cream text. Placeholder text "Field collections + behavior trials, summer 2026". Madison updates this 3-6x/year; it signals the site is live/maintained.
- Research cards: 3-column grid, card surface `#2a3624`, citrine top accent, numbered (01/02/03) in mono. Hover: `translateY(-3px)` + border to full citrine + `box-shadow: 0 10px 24px rgba(0,0,0,0.28)`.
- News/dates in mono small-caps, citrine.

**Rejected during design (do NOT reintroduce):**
- Drop cap on the bio paragraph (the bio starts with "I'm..." and the contraction made the drop cap orphan the apostrophe-m awkwardly). REJECTED.
- Decorative yellow circle in the hero corner. REMOVED.
- Orange as a hard/solid color block (washed out / competed with moss). Burgundy/oxblood (too dark/heavy). Salmon-peach (too skin-toned). The final answer is pastel orange `#feac74` WITH rgba transparency.
- Roman numeral dates, Latin mottos, portrait corner tabs (these were from a shelved "Scholar's Study / Ravenclaw" exploration, not Mossy Modernist).

**Accessibility:** the palette passes WCAG AA at all text sizes (verified; most pairs clear AAA). The high-contrast dark base helps here.

### How to port
al-folio's styling lives in SCSS. The override approach: add custom SCSS that redefines al-folio's CSS variables and adds the custom hero/Currently/card treatments, rather than forking the theme. al-folio supports custom styles; check `_sass/` and the theme's variable definitions. This is unscoped work; expect it to be the largest remaining chunk. Recommended first step: a small spike porting just the homepage hero + palette to confirm the override approach before doing the whole site.

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
- `_pages/cv.md` - layout `cv`, has a PDF download button (cv_pdf path)
- `_pages/teaching.md` - title "teaching / mentoring"
- `_pages/gallery.md`, `_pages/outreach.md`, `_pages/news.md`
- `_news/*.md` - news items (1 starter exists)
- `_data/socials.yml` - email live; ORCID/Scholar/ResearchGate/LinkedIn are commented PLACEHOLDERs
- `assets/img/prof_pic.jpg` - Madison's headshot (REQUIRED by about layout)

### Content placeholders awaiting Madison's real content
Search the repo for `PLACEHOLDER` to find them: bio paragraph, 3 research-question descriptions, teaching philosophy + courses + mentoring, outreach activities, gallery photos, the .bib entries, and the commented social links in `_data/socials.yml`.

---

## Still needed from Madison
- ORCID iD, Google Scholar URL, ResearchGate URL, LinkedIn URL (uncomment + fill in `_data/socials.yml`)
- Real bio paragraph
- CV PDF (goes in `assets/pdf/`, referenced from `_pages/cv.md`)
- Research question descriptions + representative images
- Publication list (as BibTeX in `_bibliography/papers.bib`)
- Teaching philosophy, course list, mentoring info
- Field/macro photos for the Gallery
- Outreach activities

She is processing/sharing these with Trevor. Content fill (Phase 3) can proceed in parallel with the design port (Phase 4).

---

## Runbooks (plain-language, for Madison's self-maintenance)
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
