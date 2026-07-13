# Changelog

All notable changes to Madison Rittinger's academic website.
Format based on Keep a Changelog. No em-dashes anywhere (project rule).

This repo-level changelog begins at the point work moved into the repo itself
(VS Code / Claude Code). Earlier design-iteration history lives in Trevor's
Claude project outputs and is summarized in CLAUDE.md.

---

## [Unreleased]

### 2026-07-13 - SEO: enable Open Graph, Schema.org, and social preview image

#### Changed
- `_config.yml`: `serve_og_meta` false -> true (adds Open Graph meta tags to every page head, so links shared to social/Slack/iMessage get a title, description, and image preview), `serve_schema_org` false -> true (adds Schema.org JSON-LD structured data, which helps Google understand the site is an academic Person profile), and `og_image` set to `/assets/img/prof_pic.jpg` as the site-wide default link-preview image.

#### Notes
- Root cause of "not in Google searches": the site is not yet indexed at all (`site:madisonrittinger.org` returns zero results). The single highest-impact fix is owner-only and cannot be done from the repo: verify the domain in Google Search Console (Madison's Google login) and submit `https://madisonrittinger.org/sitemap.xml`, then use "Request indexing" on the homepage. Config fields `google_site_verification` + `enable_google_verification` are staged for the verification meta-tag ID once she has it. Sitemap and robots.txt were already valid and open; those were not the blocker.

### 2026-07-13 - Research pages: 2-up photo grid on mobile

#### Changed
- The three `_projects/*.md` pages (individual-personality, comparative-cognition, decision-making-under-uncertainty) now show their photo tiles 2 per row on phones. The grid uses `repeat(auto-fit, minmax(220px, 1fr))`, which collapses to a single full-width column below ~440px content width, rendering each square tile at ~340px on a 375px phone (looked oversized; long scroll). Added a `@media (max-width: 600px)` block forcing `grid-template-columns: repeat(2, 1fr)` so each photo is half-width. Scoped under 600px, so the desktop 3-across auto-fit layout is unchanged.

#### Notes
- Follow-up below extends the same 2-up mobile treatment to the Gallery page.

### 2026-07-13 - Gallery: 2-up photo grid on mobile

#### Changed
- `_pages/gallery.md` photo tiles now show 2 per row on phones. The flex tiles used `min-width: 200px`, which forced a single full-width column below ~400px. Added a `@media (max-width: 600px)` block dropping `min-width` to 0 and setting a `calc(50% - 0.3rem)` basis (accounts for the 0.6rem gap). Desktop 4-across (and its centered trailing row) is unchanged.

### 2026-07-13 - Footer: no longer pinned to the viewport

#### Changed
- `_config.yml` `footer_fixed`: true -> false. The copyright footer was permanently overlaid at the bottom of the screen on every page (desktop and mobile), which read poorly; it now sits in the normal page flow and is only visible when scrolled to the end of the content. Verified locally: footer markup switches from `fixed-bottom` to `sticky-bottom mt-5`, and a 900px-viewport screenshot of the homepage shows no pinned bar.

### 2026-07-13 - MAINTENANCE-GUIDE.md: the absolute-beginner runbook

#### Added
- `MAINTENANCE-GUIDE.md` (repo root): the comprehensive self-maintenance guide for Madison, written for absolute beginners and designed to work with zero outside help ("in case Trevor gets hit by a bus"). Covers: how the publish pipeline works in plain language; the GitHub and Cloudflare accounts (with a hard warning never to commit passwords to this public repo); Route A browser-only editing (sign-in, pencil edit, file upload, new file); Route B VS Code setup per OS (Windows primary, Mac included) plus the pull-edit-commit-push routine; step-by-step recipes for every content type (Currently status, news, publications incl. thumbnails and the photographer-credit map, gallery, CV, bio, socials, research pages, teaching page with its layout warnings, profile pic/favicon, contact note); build monitoring and the cache window; failure recovery (red builds, per-file restore from History, stuck-deploy re-run, site-down triage); Cloudflare domain renewal and the exact DNS record table; house rules; and a file-map cheat sheet. Every recipe was verified against the actual files before writing.
- `_config.yml`: added `MAINTENANCE-GUIDE.md` to the `exclude:` list so the guide never renders into the built site (it stays repo-only, like CLAUDE.md and CHANGELOG.md).

### 2026-07-13 - Footer: copyright line only

#### Changed
- Footer now reads just "(c) 2026 Madison Rittinger" sitewide. Emptied `footer_text` in `_config.yml` (was the theme-default "Powered by Jekyll with al-folio theme. Hosted by GitHub Pages." credit - MIT license, attribution optional) and trimmed the redundant "Copyright" word in the local `_includes/footer.liquid` override. The year comes from `site.time`, so it updates automatically each build.

### 2026-07-13 - Phase 5: custom domain madisonrittinger.org

#### Added
- `CNAME` file (repo root) containing `madisonrittinger.org`. Jekyll copies it into `_site` on every build, so the deploy action republishes it to `gh-pages` each time; without it, each deploy would wipe the custom-domain setting.

#### Changed
- `_config.yml` `url`: `https://madiritt.github.io` -> `https://madisonrittinger.org` (canonical URLs, sitemap, feed).

#### Notes
- Cloudflare DNS (Trevor, via dashboard): four A records on the apex to GitHub Pages IPs (185.199.108-111.153) + CNAME `www` -> `madiritt.github.io`, all DNS only (grey cloud) so GitHub can issue the Let's Encrypt certificate. Verified resolving before the repo change.
- Old madiritt.github.io URLs 301-redirect to the new domain automatically once the custom domain is active.
- COMPLETED same day: GitHub picked the custom domain up from the published CNAME file automatically; certificate issued for apex + www within minutes; Enforce HTTPS ticked (madiritt login; Pages settings are owner-only on personal repos, the collaborator API returns 404). Verified: https apex 200, http apex 301 -> https, www 301 -> apex, madiritt.github.io 301 -> new domain. CLAUDE.md and TECH-STACK.md updated to the new live URL. Still open (nice-to-haves): madirittinger.org redirect domain, GitHub verified-domain setting.

### 2026-07-13 - Publication entries: remove the hairline divider too

#### Fixed
- Same "screen tear" read as the news rows: the thin divider under each publication entry (homepage Selected Publications + /publications archive, shared markup) is gone. Removed the `border-bottom` on `.publications ol.bibliography > li` in `_sass/_mossy.scss`; the 1.6rem spacing between entries stays. All the 2026-07-09 editorial hairlines are now retired.

### 2026-07-13 - Light mode: cool the brown/khaki cast to clean cream

#### Fixed
- Light mode read as "the page turns brown" (Trevor): the yellowed parchment base (`#f1ecdd`), the warm tan corner pool (rgba 196,156,96 at 0.14), and the sage silhouette field at full strength stacked into a khaki-brown cast over the lower half of the page. Three changes in `_sass/_mossy.scss`, light theme only:
  - Base palette cooled to clean warm cream: bg `#f1ecdd` -> `#f7f4ea`, darker `#e7e0cc` -> `#ece8db`, card `#fbf8ee` -> `#fdfbf3`.
  - Atmospheric pools softened: sage 0.14 -> 0.10, tan 0.14 -> 0.07.
  - Silhouette field dimmed via `#mossy-field { opacity: 0.65 }` (0.12 internal -> ~0.08 effective); dark mode explicitly keeps opacity 1. PurgeCSS-safe because "mossy-field" appears in the shipped JS, which purge scans.
- Verified locally (jekyll serve + DevTools-protocol screenshots forcing `localStorage.theme` to light and dark): light is cream with whisper-level silhouettes, dark is pixel-identical to before. Contrast improves slightly (darker text/citrine on a lighter bg), so WCAG AA still holds.

### 2026-07-13 - News rows: remove the hairline divider

#### Fixed
- The 2026-07-09 "editorial hairline" between news rows rendered as a thin full-width horizontal line crossing the page between the two homepage news items; Trevor flagged it as looking like a stray artifact rather than intentional. Removed the `border-bottom` on `.news table.table tr` in `_sass/_mossy.scss` (homepage News section and the /news/ archive, which share the class); rows now separate by padding alone. The matching hairlines between publication entries are unchanged.

### 2026-07-12 - Contact note trimmed

#### Changed
- `_config.yml` `contact_note`: dropped the second sentence ("I welcome inquiries about research and potential collaborations."). The note under the homepage social icons now reads just "The best way to reach me is by email."

### 2026-07-12 - Background spiders: fade the draglines

#### Fixed
- The spider draglines in the background silhouette field rendered as solid vertical lines from the top edge down to each spider (opacity 0.8 inside the 0.12 layer). Over half a viewport tall, they read as faint rendering artifacts crossing clean sections (Trevor spotted one through the homepage News section). Each dragline now uses a per-line SVG linearGradient (userSpaceOnUse): fully transparent for its top half, easing to stop-opacity 0.55 at the spider. The spider still clearly hangs; no long line crosses content. Changed in both `assets/js/mossy-field.js` and the retuning mockup `_design-reference/grass-insects-mockup.html` (kept in sync). Verified via headless-Edge screenshot of a harness loading the shipped script with the spider layer temporarily boosted to 0.7 opacity.

### 2026-07-12 - Pre-domain final pass: config cleanup

Site-wide audit before the domain move (Phase 5). Verified clean: all 8 nav
pages + 3 project pages + CV PDF return 200; no placeholders in rendered
content; name policy and em-dash rule hold; all 5 socials live; publication
previews are real photos; all 4 DOIs correct; sitemap/robots/404/feed present.
Three findings, all fixed below.

#### Removed
- `_config.yml` `external_sources` block (al-folio demo feeds): it was generating LIVE demo blog posts on the site - an al-folio Medium post and a Google Gemini marketing article at `/blog/2024/google-gemini-updates.../` - plus orphan tag/category archive pages, all indexed in the sitemap. Nothing on the site linked to them (the /blog/ index itself was already 404), but search engines would have crawled them under Madison's name.
- Footer "Photos from Unsplash" credit (theme default in `footer_text`): her photos are her own, individually credited in-page.

#### Changed
- Favicon emoji: theme-default atom to a spider (`icon:` in `_config.yml`).
- Favicon again (same day, Trevor's call): now Madison's headshot instead of the spider emoji. Added `assets/img/favicon.png` (192px square face crop of `prof_pic.jpg`, crop region 266,220,640x640, generated via System.Drawing) and set `icon: favicon.png`. The theme treats any `icon:` value longer than 4 characters as a filename in `/assets/img/` (gem `head.liquid`). To update later: replace `favicon.png` in place with any square image.

### 2026-07-11 - CV update (v7) + teaching page reconcile

#### Changed
- `assets/pdf/Rittinger_2026_CV.pdf`: replaced with Madison's latest CV (from `Rittinger_2026_CV (7).pdf`). Filename unchanged, so `cv_pdf` in `_pages/cv.md` and the download/preview both pick it up with no further edits.
- `_pages/teaching.md`: added "Statistics Tutor (Ohio Dominican University)" to the "Earlier teaching" summary line so it matches the CV's Teaching Experience section, which lists it (2014). The rest of the Courses section was already word-for-word in sync with the CV.
- `_pages/teaching.md`: reconciled the mentoring counts to the CV (Trevor-approved, "site matches CV" rule). Undergraduate researchers 18 -> 20 (CV: 8 at UWM Arthropod Behavior Lab + 12 at ISU Wren Lab). High school students 16 -> 10 (CV Mentorship: "ten different students" across seven Mentor Matching Engine projects; note this LOWERED the site's figure). The qualitative sentence (four future coauthors, one presented at local conferences) was left as-is; those specifics aren't in the CV and don't conflict with it.

#### Notes
- Publication title now matches: the v7 CV lists the 2025 Biology Letters paper as "Instinct to insight: a variation-based framework to test hypotheses about how animals solve problems," identical to `_bibliography/papers.bib` (`rittinger2025instinct`, DOI 10.1098/rsbl.2025.0293). The v6 CV's "Parsing insight from instinct" wording was corrected by Madison; no change needed to the bib.
- CV lists in-review ("Insightful spiders?") and in-preparation papers not in `papers.bib`; consistent with publishing only published works on the site. No change.

### 2026-07-10 - Background silhouettes: a touch more visible

#### Changed
- `assets/js/mossy-field.js`: raised the opacity of the background silhouette field (grass, dragonflies, spiders) from 0.07 to 0.12 for all three, so the detail is clearer and more visible while text stays fully readable (cream text keeps high contrast over the green silhouettes; the constraint at higher opacity is visual busyness, not legibility). Doc comment and CONFIG both updated. Verified on the Research index (lots of open background): grass blades/seed heads read as a soft silhouette, text unaffected. Easy to dial: ~0.10 subtler, ~0.15 bolder.

### 2026-07-10 - Photo credits now match on the homepage too

#### Changed
- The photographer-credit overlay on publication thumbnails now also appears on the homepage's Selected Publications, so the "Photo: Mark Yokoyama" spider thumbnail (Heuristic-test paper) matches its Publications-page version exactly (it previously had no credit on the homepage). The composite instinct-to-insight figure still gets no credit in either place.
- Refactor to guarantee the match: extracted the credit overlay CSS + JS into a shared `_includes/publication-credits.html`. `_pages/publications.md` now includes it instead of holding its own inline copy, and `_layouts/about.liquid` includes it right after the Selected Publications block. One source of truth, no duplicated copy to drift; added a guard so it never double-decorates a thumbnail. Verified both pages render the overlays identically.

### 2026-07-10 - Gallery: balanced grid (centered rows)

#### Changed
- `_pages/gallery.md`: the photo grid was rendering lopsided (5 tiles on top, 2 hugging the bottom-left) because 7 is a prime count that no column number divides evenly. Switched `.photo-grid` from `grid` (auto-fit, left-packed) to a centered flex wrap: tiles target 4 per row (`flex: 0 1 calc(25% - 0.45rem)`, `min-width: 200px`) and any incomplete row centers. Now reads as a balanced 4-on-top / 3-centered-below at desktop, degrading to 3s then 2s as the page narrows with the trailing row always centered. Tiles are slightly larger as a result. Verified at 1280px and 760px.
- Note: with a prime number of photos the rows can't all be equal; centering makes the layout read as intentional at every width. An even count (6, 8, ...) would fill rows exactly.

### 2026-07-10 - Gallery: auto-sorts newest-first

#### Changed
- `_pages/gallery.md`: the gallery is now data-driven and self-sorting. The seven photos moved from hardcoded `.photo-tile` anchors into a `photos:` list in the page front matter (image, caption, year); the grid renders them with `{% assign gallery_photos = page.photos | sort: "year" | reverse %}` so they always present newest-first (2025 -> 2022 -> 2020) with no manual reordering. Adding a photo is now just a front-matter entry plus the image file; it slots into the right place by year on its own. GLightbox wiring, captions (including `<em>` species names), and the square-tile styling are unchanged. Verified: 7 tiles, correct newest-first order, identical caption encoding to the previous hardcoded version.
- Ordering choice: newest-first (Madison), matching the Publications page. Sort key is `year`; photos within the same year group together in a deterministic (if not list-exact) order. Finer within-year control would need a full date field, not added since only the year is shown.

#### Fixed
- `_config.yml` `contact_note`: replaced the leftover al-folio placeholder ("You can even add a little note about which of these is the best way to reach you.", which was rendering live under the homepage social icons) with Madison's real note: "The best way to reach me is by email. I welcome inquiries about research and potential collaborations." Renders centered under the email/ORCID/Scholar/ResearchGate/LinkedIn icons via the existing `.contact-note` slot in `_layouts/about.liquid`.

### 2026-07-10 - Gallery: captions cleaned up from Madison's image titles

#### Changed
- `_pages/gallery.md`: updated lightbox captions to match the descriptions in Madison's source image filenames. No new images: all seven provided files already exist in the gallery (six are byte-identical to the current assets; the seventh, a HEIC named for the undergrads in it, is the same photo as the existing "Hunting for spiders" tile). Per Madison's rule, existing photos just get their descriptions cleaned up.
  - "Mackinaw Nature Preserve, 2020" -> "Paige Duncan, M.S., and I at Mackinaw Nature Preserve, 2020"
  - "Running transects, May 2025" -> "Helping Mish with transects, 2025"
  - "Painting clay models, 2025" -> "Helping Mish paint clay models, 2025"
  - "Animal Behavior Society meeting, 2025" -> "Animal Behavior Society (ABS), 2025" (title was "ABS 2025"; expanded the acronym, dropped the not-in-title word "meeting")
  - "Hunting for spiders, 2022" -> "Undergraduate researchers Ben Mueller and Kristen Lindemann, 2022"
  - Unchanged: the *Pholcus phalangioides* (2022) and *Frontinella communis* web (2025) captions were already the correct full italic binomials (the filenames use abbreviated/typo'd forms).

#### Notes
- No photographer credits added: none of these seven filenames name a photographer (they are Madison's own field/lab photos), consistent with the Gallery's existing species/description-only caption style.

### 2026-07-10 - Teaching page: Courses section reconciled with the CV

#### Fixed
- `_pages/teaching.md`: made the Courses list match Madison's CV (`Rittinger_2026_CV.pdf`) instead of paraphrased/invented content. Changes:
  - Guest Lecturer dates now match the CV exactly: "Ecology (Spring 2024, Fall 2024, Fall 2025) and Behavioral Ecology (Spring 2023)" (was the vague "Ecology (2024-2025) and Behavioral Ecology (2023)").
  - Replaced the invented "Earlier teaching includes ... at UW-Milwaukee and Illinois State University" summary (which mis-lumped institutions and omitted the ISU General Ecology Lab) with an accurate line: Human Anatomy and Physiology Lab (UW-Milwaukee); Invertebrate Zoology Lab, General Ecology Lab, Biostatistics Lab, and Introduction to Biology Lab (Illinois State University).
  - Added the CV's course descriptions for the two MIAD instructor-of-record courses (Animal Behavior, Patterns in Nature), which the site had omitted.
  - Guest Lecturer / General Ecology Lab wording brought in line with the CV ("the role of hormones in behavior"; "survivorship in humans"; "new laboratory exercises").
  - Kept "See my CV for a full list" (the ODU Statistics Tutor and per-term dates for earlier labs remain CV-only). Verified rendering at 1280px.

### 2026-07-10 - Publications page: credits moved onto the photo

#### Changed
- `_pages/publications.md`: the photographer credit now sits ON each thumbnail (bottom) as a soft gradient-scrim overlay (cream Lexend over a moss-dark fade, inset inside the 3px orange frame with matching rounded bottom corners), instead of a plain caption beneath the tile (Madison's request for a classier, professional look). Same matching/degradation as before: the script wraps each credited `img.preview` in a `.pub-thumb` and lays a `.pub-credit-overlay` on it; no JS -> no overlay, thumbnails unaffected. The composite manuscript figure still gets no credit. Verified at 1280px and narrow width.
- Follow-up: credit text left-aligned to sit in the bottom-LEFT corner (Madison's preference), the standard editorial photo-credit placement, rather than centered on the scrim.

### 2026-07-10 - Publications page: updated thumbnails + photographer credits

#### Changed
- Replaced all four publication preview thumbnails with Madison's chosen images (converted from source JPG/PNG/TIF to JPG, resized to 1000-1200px long edge at q88, keeping the existing filenames so no `.bib` edits were needed): `treefrog.jpg` (gray treefrogs in amplexus), `web-spider.jpg` (cellar spider), `instinct-insight.jpg` (the 4-panel Innate/Previously-learned/Learned-de-novo/Insightful manuscript figure), `songbird-nestling.jpg` (male house wren).

#### Added (photographer credits)
- `_pages/publications.md`: a small credit caption now sits under each thumbnail: "Photo: Höbel Lab" (treefrogs), "Photo: Mark Yokoyama" (spider), "Photo: Dr. Rachael DiSciullo" (house wren). The instinct-to-insight figure is a composite manuscript figure with no single photographer, so it gets no credit.
- Implementation note: al-folio's `bib.liquid` (in the al_folio_core gem) renders the `preview` image but has no photo-credit field, and a full local override of that 150-line layout would risk drifting from the gem on upgrades. So the credits are added by a small script IN `publications.md` that matches each `img.preview` by filename and inserts a `.pub-credit` caption. Degrades gracefully (no JS -> thumbnails still render, just no caption). To change a credit, edit the `credits` map in the page; omit a filename for no credit. Verified at 1280px and 390px.

#### Changed
- `_pages/publications.md`: the subtitle under the heading now reads "Happy to forward pdf's upon request" (was "Peer-reviewed papers, preprints, and work in progress."). This is the page `description`, so it also serves as the page's meta/social description.

### 2026-07-10 - Teaching page: copy tweaks

#### Changed
- `_pages/teaching.md`: Courses section reads "See my CV for a full list" instead of "See the CV for a full list" (Madison's wording).
- `_pages/teaching.md`: "Mentor Matching Engine" in the mentoring blurb is now a hyperlink to https://help.mentormatchingengine.org/about (al-folio auto-adds `target="_blank"` + `rel="external nofollow noopener"` for external links).

### 2026-07-10 - Teaching page: fix crushed text column on mobile

#### Fixed
- `_pages/teaching.md`: on phones every section's text was crammed into a thin left strip with the right half empty and the photo stacked below. Cause was a CSS source-order bug: the `@media (max-width: 640px)` block that releases the reserved photo-column margins sat BEFORE the base rules that set those margins (`margin-right/left: calc(min(320px, 45%) + 1.75rem)`). Both have identical specificity, so the later base rules won even at mobile width and the margin never released. Moved the media query to the END of the style block so source order lets it win. Verified at true 390px (iframe harness): text now uses the full width and photos stack full-width; desktop floated insets unchanged at 1280px.

### 2026-07-10 - CV page: PDF preview now works on mobile

#### Fixed
- `_pages/cv.md`: the inline CV preview showed only "A preview isn't available in this browser - download the CV (PDF) instead" on phones. Cause: mobile browsers (iOS Safari, Android Chrome) refuse to render PDFs inline in an `<object>`/`<iframe>`/`<embed>`, so the `<object>` always fell through to its fallback text. Not a markup bug, a platform limitation.

#### Changed
- Replaced the `<object type="application/pdf">` embed with a PDF.js (canvas) renderer: the PDF at `cv_pdf` is drawn page-by-page into stacked canvases inside the same orange-framed, scrollable preview box. Works on every modern browser, desktop and mobile (PDF.js is the same engine Firefox ships natively). Verified rendering at 1280px and 500px widths.
- PDF.js pinned to `pdfjs-dist@3.11.174` from jsDelivr with an SRI hash on the main script; the worker loads from the same pinned path. Device pixel ratio capped at 2 and pages rendered sequentially to keep canvas memory sane on phones.
- Update workflow UNCHANGED: the renderer draws whatever PDF is at `cv_pdf`, so "drop a new PDF in assets/pdf/" (runbook 03) still just works, no image regeneration needed.
- Graceful degradation preserved: if JS is disabled or the CDN is blocked, the same "download the CV (PDF)" link fallback shows (kept in the container, removed only on successful render, restored on error).

### 2026-07-10 - Spider research pages: gallery-style photos (applied the standard)

#### Added
- `_projects/decision-making-under-uncertainty.md` ("How do spiders make decisions...") and `_projects/comparative-cognition.md` ("How do web spiders navigate?") now use the same gallery-tile + wide-text layout established on the nestlings page: full-width prose, a responsive grid of square `object-fit: cover` tiles with orange frames and hover zoom, a "Select any image to view it full-size" hint, and a GLightbox slider showing the full uncropped image + caption on click. Replaces the older single bottom-photo pattern on both pages.
- Six new images (Madison's own photos), converted from source JPGs via .NET System.Drawing to 1600px long edge at q85:
  - Decisions (all *Pholcus phalangioides*, 2023): `research-decisions-adult-can.jpg` (adult on a can rim), `research-decisions-vial.jpg` (in a lab vial), `research-decisions-spiderlings.jpg` (mother with a spiderling brood). All three source files were distinct shots despite similar names.
  - Navigation: `research-navigation-web.jpg` (*Frontinella communis* web, 2024), `research-navigation-tetragnathid-branch.jpg` and `research-navigation-tetragnathid-twig.jpg` (Tetragnathid sp., Saukville WI, 2026; two distinct shots).

#### Decided (attribution)
- These six are Madison's OWN photos, so per Madison (2026-07-10) they carry NO photographer line: species + year lightbox caption only (italic binomial, matching the Gallery page's caption voice), and no `Photos: ...` credit line under the grid. The "credit the photographer on all images" standard still holds; it just resolves to no line when the photographer is Madison herself. Contrast the nestlings page, whose photos are Dr. Rachael DiSciullo's and are credited.

#### Removed
- `assets/img/research-decisions.jpg` and `assets/img/research-navigation.jpg` (the old single representative photos): now orphaned, replaced by the new named files above. Confirmed no remaining page references before deleting.

#### Notes
- Duplication smell (future refactor, not done): the `.research-photos` tile CSS + the full GLightbox CSS/JS block are now copied inline across three research pages and `_pages/gallery.md`. Faithful to the existing per-page-inline convention, but a shared `_includes/` partial for the GLightbox setup would remove ~4 copies if maintenance ever bites.

### 2026-07-10 - Nestlings research page: gallery-style photos + wide text

#### Added
- `_projects/individual-personality.md` (hatching patterns / house wrens): three house wren photos by Dr. Rachael DiSciullo added at the bottom of the page, replacing the previous no-photo state. Multi-photo research pages are the new standard going forward (Madison, 2026-07-10): as photos are provided, each page gets its set at the bottom rather than a single representative image.
- `assets/img/research-nestlings-nestbox.jpg`, `research-nestlings-branch-a.jpg`, `research-nestlings-branch-b.jpg`: converted from Madison's source TIFFs (one was 198 MB) via .NET System.Drawing, resized to 1600px long edge at JPEG q85 (~190 KB each). The two "sits on branch" source files looked like duplicates by dimension (exactly 2x) but are distinct photographs (bird faces left vs right, different perch/background); both kept.

#### Layout (gallery method + wide text)
- Photos use the GALLERY METHOD (Madison, 2026-07-10: "same size method as the gallery photos"): `.research-photos` is a responsive grid of equal SQUARE tiles (`grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`, `aspect-ratio: 1/1`, `object-fit: cover`, orange frame, hover zoom) that mirrors `_pages/gallery.md`. Clicking a tile opens the same GLightbox slider (loop, prev/next, Mossy-palette caption) showing the FULL uncropped image with its caption, so the square tile crop never permanently hides the photo. GLightbox CSS/JS + caption styling replicated inline from the Gallery page.
- Iteration history (same session, none shipped before this): started as a 4:3-cropped row of three, then a full-view natural-ratio mosaic (7fr:9fr portrait + stacked landscapes), then this gallery-tile version per Madison's request to match the gallery sizing.
- Text now spans the FULL content width (`.research-body { max-width: 100% }`, was 42-44rem), so the short prose reads WIDE rather than as a tall narrow column (Madison, 2026-07-10: "extend the text horizontally rather than vertically"). Title, text, and photo grid all share the same left/right edges.

#### Added (photographer credits)
- Every image is credited (standard set Madison, 2026-07-10: credit the photographer on ALL images). Credit shows in the GLightbox caption per image (`data-title`), plus a visible `Photos: Dr. Rachael DiSciullo` line under the grid. A `.research-hint` line ("Select any image to view it full-size") signals the tiles are clickable, matching the Gallery page's `.gallery-hint`.

#### Notes
- Retro-credit / gallery-method TODO: DONE same day. Both `comparative-cognition.md` and `decision-making-under-uncertainty.md` moved to this gallery-tile treatment (see the entry above); their photos are Madison's own, so no photographer line.

### 2026-07-09 - Research question pages: photos moved to the bottom

#### Changed
- `_projects/comparative-cognition.md` and `_projects/decision-making-under-uncertainty.md`: the representative photo moved from a floated inline inset to a block at the BOTTOM of the page, below the text (Madison's preference: research photos sit tastefully after the prose, not wrapped inline). Left-aligned, orange 4:3 frame unchanged, `max-width: 34rem`, `margin-top: 2.75rem` for clean separation from the text. This also fills the previously-empty lower half of these short pages. Convention going forward: any future research-page photo goes at the bottom in this pattern (documented in each page's comment).
- Text now held to a `max-width: 42rem` reading measure via a `.research-body` wrapper. Removing the float (which had reserved the photo's column) would otherwise have let the prose span the full ~1140px container at ~120 characters/line; 42rem restores a comfortable ~80-char measure. Verified at 1280px, 950px, and true 375px (iframe harness).

### 2026-07-09 - Research question pages: article-style photo insets

#### Changed
- `_projects/comparative-cognition.md` and `_projects/decision-making-under-uncertainty.md`: the representative photo (previously a full-width block above the text) now floats right as an article-style inset the prose wraps around, matching the Teaching/Mentoring treatment. Same uniform-column technique: every paragraph reserves the photo's column (`margin-right`) so text edges stay aligned at all widths, wrapped in a `.research-body` flow-root. Orange 4:3 frame unchanged. Verified at 1280px, 950px (half-laptop), and true 375px (iframe harness): desktop/tablet wrap in a uniform column; phone stacks photo-on-top full-width with the reserved margin released.
- Photo width then widened from `min(320px, 45%)` to `min(380px, 50%)` (2026-07-09, Trevor): the pages read sparse with short text, and a larger photo better balances the content block against the text height. Verified it reaches toward the right edge at full width rather than leaving a gutter.
- `_projects/individual-personality.md` (hatching patterns): NOT changed, it has no representative image, so there is nothing to wrap.

#### Decided
- Narrowing the content measure (`max-width` on `.research-body`) to make a tighter editorial column was tried and REJECTED: left-aligning a capped block leaves the entire right third of the page empty (title comes from the layout full-width, so a centered body would misalign with it). The larger photo at full width is the balanced answer. The remaining bottom emptiness is short content on a full-height layout and only real content (fuller descriptions + the pending nestling photo) closes it.

### 2026-07-09 - News: ABS item dated to the talk itself

#### Changed
- `_news/2026-07-06-abs-2026.md` -> `_news/2026-07-17-abs-2026.md`: the news row's date now reads Jul 17, 2026 (the date of Madison's ABS talk, per Madison) instead of the date the item was posted, and the text is the plain fact without a redundant date: "Presenting at the Animal Behavior Society (ABS) conference." Convention going forward: date news items by the event they announce, not the posting day.

### 2026-07-09 - Teaching/Mentoring page: article-style photo insets (Madison-approved)

#### Changed
- `_pages/teaching.md`: full editorial redesign of the photo treatment. The 3-tile mentoring photo row under the page title is gone; each photo now lives inside its section as a floated inset the text wraps around, news-article style. Kenzie Dasek -> Teaching philosophy (right), Spider Squad -> Courses (left), Ellie Wheeler -> Mentoring philosophy (right). Orange frames, 4:3 crop, and visible captions unchanged; images still go through figure.liquid for responsive WebP.
- Courses title placement (Madison): the Spider Squad figure precedes the h2 in source, so "Courses" renders beside the photo directly above "See the CV for a full list.", capping its own text column.
- Uniform text columns (Trevor, after resize testing): every paragraph reserves the photo's width + 1.75rem gutter on the photo's side (margin-right for sections 1/3, margin-left for Courses p + h2), so all lines in a section share one edge at every viewport width; text never snaps to full width mid-section. Trade-off accepted: text no longer flows under photos, so a text-heavy section shows open background under its photo on narrow windows.
- Each section sits in a `.mentoring-section` flow-root wrapper (floats can't bleed across sections); first wrapper gets `margin-top: 2.75rem` so the title-to-first-section gap matches the ~5.5rem section rhythm.
- Mobile (<=640px): photos stack full-width/centered and the reserved column margins release. The Courses section becomes a flex column with `order` so the heading renders before its photo (in source the photo is first; stacked naively it read as the previous section's image).

#### Removed
- `_pages/teaching.md`: the `.mossy-section` centered dividers, same day they were added (Madison's call after seeing them with the insets). Homepage and /outreach KEEP their dividers; only this page dropped them.

#### Notes
- Headless-screenshot gotcha discovered during verification: Edge headless on Windows enforces a ~450px minimum window width, so `--window-size=375,...` silently renders a wider layout and fake-clips the right edge. For true phone-width checks, load the page in a 375px iframe from a local harness file and screenshot that (media queries track iframe width). The apparent site-wide mobile clipping this produced was a tool artifact; the real 375px render is clean.

### 2026-07-09 - Section dividers extended to Teaching and Outreach

#### Added
- `_pages/teaching.md` + `_pages/outreach.md`: the homepage's centered citrine section divider (`.mossy-section`) now marks all six h2 sections (Teaching philosophy / Courses / Mentoring philosophy; Science communication / Mentoring and K-12 engagement / Department and community service) via kramdown `{: .mossy-section}` attributes. No CSS changes; reuses the existing class.

#### Decided
- Divider audit of every page (2026-07-09): NOT applied to /publications year headings (al-folio already rules them; two divider styles would stack), /research (question headings sit inside bordered cards that already separate), /cv, /gallery, /news, or the project pages (no h2 sections). /news and /publications already inherit the editorial hairlines below.

### 2026-07-09 - Editorial hairlines on news + publication lists

#### Added
- `_sass/_mossy.scss`: thin hairline rules (`--global-divider-color`) between news rows and between publication entries, like a publication site's headline/article lists. News: border-bottom per `<tr>` (none on the last), Bootstrap cell borders cleared, 0.6rem vertical padding per row. Publications: border-bottom per `ol.bibliography > li` (none on the last) with 1.6rem spacing. Applies to the homepage sections AND the /news and /publications archives, which share the markup. Layout and hero untouched.

#### Decided
- A full "article-style" homepage experiment (portrait floated right with text wrap, justified bio, panel sized by aspect ratio) was built, previewed, and REJECTED by Madison the same day; rolled back before commit. The publication-site feel comes from list rhythm only (these hairlines), not from restructuring the hero. Do not reintroduce the float layout.

### 2026-07-09 - Homepage divider bars centered and widened

#### Changed
- `_sass/_mossy.scss`: the citrine section divider bars above "News" and "Selected Publications" (`.mossy-section::before`) are now horizontally centered (`left: 50%` + `translateX(-50%)`) instead of left-hung, and widened 20%: desktop `calc(55% + 0.25rem)` -> `calc(66% + 0.3rem)`, mobile 52px -> 62px. The original left position was tied to the hero's left axis / portrait gutter; that alignment rationale no longer applies and the comment was updated.

### 2026-07-09 - Research question pages: representative photo under each title

#### Added
- `_projects/comparative-cognition.md` ("How do web spiders navigate?") and `_projects/decision-making-under-uncertainty.md` ("How do spiders make decisions involved in prey capture?"): a single pastel-orange-framed 4:3 photo directly under the title, matching the hero/mentoring frame (3px `#feac74` border, 6px radius, `object-fit: cover`). Left-aligned, `max-width: 32rem`. Images `assets/img/research-navigation.jpg` (navigation page) and `assets/img/research-decisions.jpg` (decisions page), copied from Madison's source JPGs. Routed through `figure.liquid` so the live build produces responsive WebP. Scoped `.research-photo` style block is inline in each page.

### 2026-07-09 - Homepage section dividers + animated "Currently" dot

#### Added
- `_layouts/about.liquid` + `_sass/_mossy.scss`: a short citrine "tick" divider above the homepage "News" and "Selected Publications" headings (new `.mossy-section` class on those two `<h2>`s). Left-aligned, echoing the research-card top accent and the hero's left axis; it marks each section's start rather than drawing a full-width rule. Width is `calc(55% + 0.25rem)` so it reaches toward (but stops ~0.875rem short of) the hero portrait's left edge, derived from the hero's 1.1fr/0.9fr grid + 2.5rem gap so it tracks that alignment as the viewport changes. On mobile (<=768px, hero single-column) it falls back to a 52px accent.
- `_sass/_mossy.scss`: the pastel-orange "Currently" status dot now continuously pulses. A `::after` radial-gradient aura scales between 1.05x and 1.3x (opacity 0.8->1) on a `1.9s linear infinite` loop. `linear` (not ease-in-out) keeps it moving at a constant rate so it reads as continuous breathing, not a quick pulse with dead time. The core also got a radial gradient (`#ffcf9c` highlight -> `#feac74` -> `#e08e56` rim) for orb-like depth instead of a flat disc.

#### Decided
- No `prefers-reduced-motion` guard on the Currently pulse: the motion is a tiny 1.05->1.3 scale on a soft 12px aura, judged subtle enough to keep for all visitors (Trevor's call). A guard was trialed and removed; the code comment notes to reinstate one if the effect is ever made larger/faster. NOTE for whoever tests this: the pulse will NOT appear if your OS has "reduce motion" enabled in a build that still has the guard; Trevor's Windows "Animation effects" is off, which is why early tuning looked static until the guard was dropped.

### 2026-07-09 - Content additions + sitewide capitalization and color polish

Continuation of the 2026-07-08 session (after the orange-titles experiment below was rolled back). All previewed on the local dev server (headless-Edge screenshots + pixel sampling) before commit.

#### Added
- `_projects/individual-personality.md`: attribution sentence noting the house-wren work was Madison's Master's thesis in collaboration with the Avian Ecology Lab at Illinois State University, and made "Avian Ecology Lab" a hyperlink to https://about.illinoisstate.edu/wrens/research/ (al-folio auto-adds `target="_blank" rel="external nofollow noopener"`; the link inherits the citrine `--global-theme-color`, matching the highlighted nav tab).
- `_pages/teaching.md`: mentoring photo row at the top of the page (under the title): three equal pastel-orange-framed 4:3 tiles (matching the hero/gallery frame) with visible centered captions beneath. Images `assets/img/mentoring-{kenzie-dasek-2024,spider-squad-2023,ellie-wheeler-2023}.jpg`. Captions: "Undergraduate researcher Kenzie Dasek, 2024"; "The Spider Squad: Ellie Wheeler, Ava Mueller, Sage DeLong, and me, 2023. Photo: Em Wikner"; "Undergraduate researcher Ellie Wheeler and I. Photo: Em Wikner". Static (no lightbox); images go through `figure.liquid` so the live build generates responsive WebP. Grid + caption styles are inline in the page.

#### Changed
- `assets/img/publication_preview/treefrog.jpg` replaced with the Höbel Lab photo for the "Where did she go?" publication (feagles2026did). Swapped the file in place; the `.bib` `preview={treefrog.jpg}` reference is unchanged. New image is landscape (750x500) and fills the same square frame via object-fit.
- Sitewide Title Case for page titles + nav: `_pages/{about,research,publications,gallery,teaching,news,outreach}.md` `title:` strings capitalized (e.g. "teaching / mentoring" -> "Teaching / Mentoring"). Each `title` feeds both the nav link and the page `<h1>`, so both capitalize together. "CV" left uppercase.
- `_layouts/about.liquid`: homepage section headings "news" -> "News" and "selected publications" -> "Selected Publications" to match the Title Case theme (still links to /news/ and /publications/).
- `_pages/teaching.md`: bottom section heading "Mentoring" -> "Mentoring philosophy" (parallels "Teaching philosophy" above it).
- `_sass/_mossy.scss`: relabeled the al-folio search toggle from the default "ctrl k" shortcut hint to "Search" (clearer for a non-technical audience). Done via CSS (`#search-toggle .nav-link` font-size:0 + `::before { content: "Search" }`) rather than shadowing the gem's 149-line `header.liquid` for one word; the button's `aria-label="Open search"` already names it for screen readers. Ctrl+K still opens it.

#### Fixed
- `_sass/_mossy.scss` news text was rendering Bootstrap's near-white emphasis color (#f9fafb) instead of the palette: the homepage news section and /news/ archive are a `table.table` whose cells fall back to Bootstrap's default color. Forced the cream `--global-text-color` on `.news table.table th/td` so dates and items match the "news" heading. The previous rule targeted a `.date` class the markup (`<th scope="row">`) never has, so it never applied. Dates keep the Lexend + wider-tracking treatment.
- `_sass/_mossy.scss` hero eyebrow now renders citrine (matching the "CURRENTLY" label) instead of cream. Root cause was the theme's `span { color: var(--global-text-color) }` overriding the eyebrow's child spans (see the 2026-07-08 entry below); fixed with `.mossy-eyebrow span { color: var(--global-theme-color); }`.

#### Notes
- Verified: eyebrow and CURRENTLY label both sample #d4c878; news date + item both sample #f4f0d8; nav and headers render Title Case; mentoring row and publication preview render correctly on the local dev server.
- The `mentoring-kenzie-dasek-2024.jpg` original is ~2 MB; the live build re-encodes to WebP so delivery stays light, but the full-size JPG lives in the repo. Downsize later if repo weight matters.

### 2026-07-08 - Orange-titles experiment trialed locally, then rolled back (never deployed)

#### Decided
- Trialed replacing citrine with orange across all accents and titles (headings, hero name, nav, links, eyebrow; burnt-orange shades for light mode, pastel/deep for dark). Previewed locally, then rolled back the same day at Trevor's request to match the live site. Nothing was committed or deployed. The full experiment is preserved in a git stash: `stash@{0}` "orange-titles experiment 2026-07-08" (recover with `git stash pop`; stashes are local to Trevor's machine, so it disappears if the clone is deleted).

#### Notes
- KNOWN BUG discovered during the trial (since FIXED 2026-07-09, see the entry above): the hero eyebrow line ("PhD Candidate · ...") rendered cream instead of the intended citrine `--global-theme-color`. Cause: the al-folio theme ships `span { color: var(--global-text-color) }`, which matches the eyebrow's child `<span class="mossy-eyebrow__part">` elements DIRECTLY and beats any color inherited from the parent `<p>` (a direct match always outranks inheritance, even inherited `!important`). Fixed by adding `.mossy-eyebrow span { color: var(--global-theme-color); }` to `_sass/_mossy.scss`.
- The same span trap defeated a hot-pink `!important` diagnostic on the eyebrow, which misleadingly suggested the local build pipeline was stale when it was actually fine. Lesson for future tracers: style an element whose text is not wrapped in child spans, or use geometry (border/transform) instead of color.

### 2026-07-08 - Teaching/Mentoring: strip paraphrased course descriptions (from Madison)

#### Changed
- `_pages/teaching.md` Courses section: removed the two one-line course summaries under **Animal Behavior** ("A foundation in animal behavior, applied through an independent research project.") and **Patterns in Nature** ("Hands-on experience with the scientific method, problem solving, and critical thinking."). Madison flagged these as not her own words - they were Claude's condensations of her CV goal sentences. Added an italic "See the CV for a full list." pointer at the top of the section (per her suggestion) and dropped the now-redundant "A full list is in the CV" sentence that closed the section. Kept the factual role/topic details on General Ecology Lab and Guest Lecturer (verbatim from her CV, not paraphrased). Course names, institutions, and dates unchanged.

### 2026-07-06 - Currently status + first real news item (from Madison)

#### Changed
- `_pages/about.md` hero `current:` -> "Analyzing data and writing manuscripts" (Madison's wording; she asked for no timeline on it since it is, well, currently). Replaces the placeholder "Field collections + behavior trials, summer 2026".

#### Added
- `_news/2026-07-06-abs-2026.md`: "Presenting at ABS July 17th 2026." (her verbatim text). News already works as the running log she asked for: dated `_news/` files, homepage shows the 5 most recent, full history stays at /news/.

### 2026-07-06 - CV page condensed to download + PDF preview

#### Changed
- `_pages/cv.md`: rebuilt from the structured al-folio CV (`layout: cv` rendering `_data/cv.yml`, with TOC sidebar and title PDF icon) to a minimal `layout: page`: one citrine "Download CV (PDF)" button (inline SVG arrow icon, hover lift matching the site's cards) above a full-width PDF preview of `assets/pdf/Rittinger_2026_CV.pdf`, framed in the site's 3px pastel-orange like the image tiles. Preview is an `<object>` with `#toolbar=0&navpanes=0` for a chrome-free viewer and a graceful fallback link where PDFs can't embed (some mobile browsers); 80vh tall, 65vh under 600px. Styles are inline in the page.
- `_sass/_mossy.scss`: removed the now-dead structured-CV (`.cv`) style blocks; recover from git history if the cv.yml rendering ever returns.

#### Notes
- `_data/cv.yml` is KEPT (unrendered) as the structured source of the CV data; nothing links to it anymore.
- Updating the CV = replace the PDF in `assets/pdf/` (and the `cv_pdf` frontmatter path if the filename changes). Runbook 03 flow unchanged.
- Verified on a local build: button + framed preview render correctly over the silhouette field in the dark theme.

### 2026-07-06 - Teaching/Mentoring: drop the mentorship-award sentence

#### Removed
- `_pages/teaching.md`: the closing Mentoring paragraph "In 2025 I received UW-Milwaukee's Graduate Student Mentorship Award, nominated by my undergraduate researchers." (This was the one sentence Claude had appended to Madison's verbatim mentoring text on 2026-07-02; her page is now 100% her own words.) The award itself still lives in the CV under Awards and Honors (`_data/cv.yml`), untouched.

### 2026-07-06 - Gallery: drop the page subtitle

#### Removed
- `_pages/gallery.md`: the `description` frontmatter ("Field and macro photography from the lab and the field."), which the page layout rendered as a subtitle under the gallery title. Trevor asked for it gone; the page's meta description now falls back to the site default.

### 2026-07-06 - LIVE: silhouette field (grasses, dragonflies, spiders); orb-web layer removed

Trevor approved the v2 mockup direction with these settings (from the mockup sliders): grass height 0.50 / opacity 0.07 / amount 1.30; dragonflies count 6 / size 1.20 / opacity 0.07; spiders count 6 / size 1.00 / opacity 0.07.

#### Added
- `assets/js/mossy-field.js`: sitewide silhouette background generator with the approved settings baked into its CONFIG block. Generates a fixed, pointer-events:none SVG at z-index -1 to the exact viewport size (regenerates on resize, fresh arrangement each page load): tall grass clumps with timothy seed heads rooted at the bottom edge, up to 6 dragonflies in the open air, a damselfly perched on the tallest seed head, and up to 6 orb-weavers hanging from draglines anchored above the top edge. No-clipping hard rule enforced by construction: blade tips/seed heads clamped inside the canvas, whole clumps only, figures clamped fully inside the viewport. Figure counts scale down on narrow screens. The SVG's positioning styles are inline from the script so PurgeCSS cannot strip them; a MutationObserver re-renders on the light/dark toggle.
- `_includes/footer.liquid`: LOCAL OVERRIDE of the gem's footer include, identical except it appends the mossy-field script tag (the gem offers no custom-scripts hook; footer renders on every page). Re-diff against the gem on upgrades.

#### Removed
- Orb-weaver web texture layer: `$mossy-web` data-URI tile and the `body::before` mask layer (plus its mobile media query) deleted from `_sass/_mossy.scss`. `_design-reference/genweb.js` is retired but kept for history.

#### Changed
- `_sass/_mossy.scss`: added the per-theme silhouette color `--mossy-sil` (light `#5e7245` sage, dark `#52743f` moss green), the only stylesheet hook the field needs.

#### Notes
- Verified on a local Jekyll build (dev config): field renders on the homepage and /publications/ in the dark theme, web texture gone, content legibility unaffected at 0.07 opacity. Light theme shares the identical code path with its own color (proven in the mockup).

### 2026-07-06 - Mockup: tall grasses + insects silhouette background (proposal)

#### Added
- `_design-reference/grass-insects-mockup.html`: standalone mockup of a proposed background layer for the live site: tall grass clumps (with timothy-style seed heads) rising from the bottom viewport edge plus complete insect silhouettes, all faded behind the content. Replicates the current Mossy Modernist homepage (both themes) so the layer can be judged in context.
- The field is generated in JS to the exact viewport size and regenerates on resize; blade tips and seed heads are clamped inside the canvas and only whole clumps are placed, so nothing is ever clipped or cut off (hard rule for this feature). Insects are single complete figures clamped fully inside the viewport.

#### Changed (v2, same day, after Trevor's first review)
- Orb-web texture layer REMOVED from the mockup entirely (this design direction drops it; the live site keeps its web layer untouched until the port).
- Grass can now rise to 1/3 - 1/2 of the screen: the height slider is a fraction of viewport height, range 0.12 - 0.50 (default 0.35). Blade width and seed-head size scale up with taller grass.
- Grasshopper (cricket-adjacent) removed; SPIDERS added instead: orb-weavers hanging head-down from silk draglines anchored above the top viewport edge (reads as anchored, not cut off). On-brand for Madison's web-spider research.
- Dragonflies kept (they were a hit): now a configurable flock with varied sizes/rotations and simple overlap avoidance; the perched damselfly appears whenever at least one dragonfly is present and rides the dragonfly sliders.
- Control panel rebuilt into three groups - Grass, Dragonflies, Spiders - each with its own sliders: Grass = height / opacity / amount; Dragonflies and Spiders = count (0-6) / size / opacity, with live value readouts. Tone selector dropped (moss tone fixed); Regenerate and Light/dark kept.

#### Notes
- Assessment artifact only; nothing on the live site changes until the direction is approved, at which point the same generator approach ports into `_sass/_mossy.scss` + a small script (same pattern as `genweb.js`).
- Verified via headless-Edge screenshots: defaults, both themes, and a maxed stress test (grass 0.50, six dragonflies + six spiders at 2x size, high opacity) show no clipped blades or partial figures.

### 2026-07-02 - Commit the tech-stack reference doc

#### Added
- `TECH-STACK.md`: a repo tech inventory (versions pulled from the actual config files on 2026-06-24) that pairs with CLAUDE.md. Existed locally but was never committed; now tracked.

### 2026-07-02 - Load Madison's real content (mentoring + 3 research questions)

#### Changed
- Replaced the AI-drafted research descriptions and the paraphrased mentoring section with Madison's own verbatim text, supplied in her "Information for the website" doc. Wording copied exactly; only titles, frontmatter descriptions, and markdown wrapping were touched.
  - `_projects/decision-making-under-uncertainty.md`: title -> "How do spiders make decisions involved in prey capture?"; body swapped to Madison's verbatim description. Removed the fabricated *Biology Letters* (2025) / *Scientific Reports* (2024) citations from the old draft.
  - `_projects/comparative-cognition.md`: retitled from the miniaturization framing to "How do web spiders navigate?" to match Madison's Q2; body swapped to her verbatim navigation description. (Old title/body were about brain-size/miniaturization; her doc scopes this question to navigation.)
  - `_projects/individual-personality.md`: title -> "How do hatching patterns impact nestling development?"; body swapped to her verbatim description. Stays `category: past` (she noted this question is no longer active).
  - Each project's frontmatter `description` set to Madison's keyword line for that question.
  - `_pages/teaching.md` Mentoring section: replaced the paraphrase (which had different mentee counts) with her verbatim three paragraphs (18 undergraduates, 4 future coauthors, 1 conference presenter, 16 high-school students via the Mentor Matching Engine). Kept the 2025 Graduate Student Mentorship Award sentence appended (accurate, not in her doc).

#### Notes
- Per-instance exception: em-dashes allowed in Madison's own content for this pass (none appeared in the supplied text). The no-em-dash rule still holds for everything Trevor/Claude authors.
- Project TITLES now name spiders, overriding the earlier taxon-agnostic-titles design note; Trevor chose Madison's exact question phrasings for coherence with the new bodies.
- Teaching philosophy (`_pages/teaching.md`) and bio (`_pages/about.md`) already matched the doc verbatim; left unchanged.
- One typo fix approved by Trevor: "various brains sizes" -> "various brain sizes" in the prey-capture description. "will be coauthor" (singular) is intentional (they will each be coauthor on one paper) and was left as written.

### 2026-06-30 - Single font sitewide: Lexend everywhere

#### Changed
- Collapsed the three-font system (Lora serif headings + Lexend sans body + JetBrains Mono labels) to a single sitewide font: **Lexend**, at Madison's request. Hierarchy is now carried by weight/size/letter-spacing rather than switching families.
  - `_sass/_mossy.scss`: flipped every Lora and JetBrains Mono declaration (headings, hero name, navbar brand, eyebrow, "CURRENTLY" label, hero meta, news dates) to the Lexend stack.
  - `_pages/gallery.md`: the gallery hint label and the lightbox caption flipped to Lexend.
  - Updated the now-stale "Lora"/"mono" code comments.
- Code/typogram/bibtex blocks intentionally stay `monospace` (the gem's only other font usage); icon fonts (Font Awesome / academicons) untouched.
- Verified on the homepage (name + eyebrow + "CURRENTLY" + section headings) and the research page (page + project headings) via local screenshots: all render in Lexend, no al-folio default leaking through.

#### Notes
- Lora and JetBrains Mono are no longer used in rendered output; their Google Fonts links may still load until a later cleanup pass (harmless). CLAUDE.md typography spec updated, with the old 3-font scheme kept as historical context.

### 2026-06-30 - Unify all thumbnails with a pastel-orange frame (hero match)

#### Changed
- Gave every thumbnail (gallery tiles + publication previews) a consistent 2px pastel-orange (`#feac74`) border with 6px rounded corners, matching the hero portrait panel's frame color. `box-sizing: border-box` keeps the tile size and grid spacing unchanged.
  - `_pages/gallery.md` (`.photo-tile`): added the orange border; radius 10px -> 6px.
  - `_sass/_mossy.scss` (`.publications .preview`): border now `$orange` (was 1px divider); radius 2px -> 6px; dropped the now-redundant row-hover border swap.
- (Briefly shipped citrine first; switched to orange to literally match the hero frame. Border bumped 2px -> 3px for a touch more presence.)

### 2026-06-30 - Gallery: add a "select an image for captions" hint

#### Added
- `_pages/gallery.md`: a small citrine mono label above the grid ("Select any image to view its caption"), styled in the hero-eyebrow voice, so visitors know the captions live in the lightbox.

### 2026-06-30 - Uniform publication thumbnails + remove the medium-zoom icon

#### Changed
- `_sass/_mossy.scss` (`.publications .preview`): publication thumbnails (homepage "selected publications" + the `/publications` list) were rendering at each image's native aspect ratio, so they looked uneven. Now uniform square tiles via `aspect-ratio: 1 / 1` + `object-fit: cover`, same approach as the gallery.
- Disabled al-folio's medium-zoom on those thumbnails with `pointer-events: none`: kills both the click-to-zoom and the zoom-in (magnifying-glass) cursor in one line. The row-hover citrine border still works because the hover falls through to the row.

#### Notes
- `enable_medium_zoom` in `_config.yml` is a dead key in al_folio_core 1.0.11 (not referenced anywhere in the gem), so it could not be used to toggle this. The zoom is medium-zoom@1.1.0 (CDN) binding to `[data-zoomable]`, which the gem's `_layouts/bib.liquid` emits via `figure.liquid zoomable=true`. Rather than fork the 396-line `bib.liquid` or a core include, the CSS `pointer-events` approach is fully scoped and zero-maintenance.
- Verified uniform sizing on both pages via local headless screenshots.

### 2026-06-30 - Fix off-center hero portrait (full-bleed on the orange panel)

#### Changed
- `_sass/_mossy.scss`: the hero portrait drifted off-center on the orange panel (fat orange margin on one side, sliver on the other). Root cause: the portrait was `width: 88%` and meant to center, but al-folio's `figure.liquid` wraps the `<img>` in an inline `<picture>` inside a shrink-wrapped `<figure>` that is a flex item in the panel's centering column, so the percentage-width image resolved/aligned ambiguously instead of centering.
- New approach (chosen by Madison): full-bleed portrait. The image now fills the panel (`width/height: 100%`, `object-fit: cover`) and the orange shows only as a slim even 8px frame. Panel keeps equal height with the text column on desktop; on mobile the portrait falls back to its own `4 / 5` aspect ratio so it can't collapse.
- Verified on desktop (1320px) and mobile (430px) via local headless screenshots before pushing: even frame on all sides, face well-placed (`object-position: 50% 16%`).

### 2026-06-30 - Gallery lightbox caption: gradient-scrim overlay

#### Changed
- `_pages/gallery.md`: switched the lightbox caption from a separate block to a gradient-scrim overlay on the bottom of the image (the format the best photo-forward sites use). Caption type stays cream Lora (italics included) with a soft text-shadow for legibility over photos.
- Moved the caption CSS into a `<style>` that loads AFTER GLightbox's stylesheet, and out-specified the `clean` theme's white `.gslide-description` box, so the moss gradient reliably wins.
- Desktop: pin `.gslide-description` absolutely over the image bottom (verified against GLightbox 3.3.1 CSS/JS: container shrink-wraps to image width on desktop, and no inline width is set on `desc-bottom`, so the overlay aligns to the image). Mobile already overlays by default; retheme its gradient to moss to match.

### 2026-06-30 - Gallery lightbox caption: readable + title-only

#### Changed
- `_pages/gallery.md`: the lightbox caption was unreadable (soft cream text on GLightbox's default white caption box). Styled `.gslide-description`/`.gslide-title` as cream Lora over a transparent background so it reads against the dark lightbox backdrop, in the Mossy display style.
- Dropped the placeholder blurbs: each tile now carries only `data-title` (the caption). Species names italicized via `<em>` in `data-title` (GLightbox renders titles with innerHTML, verified against the 3.3.1 source).
- Header comment + runbook note updated to the title-only workflow.

### 2026-06-30 - Remove the hard offset "block" shadows behind images

#### Changed
- `_sass/_mossy.scss`: removed the flat `Npx Npx 0` offset shadows that dropped a solid colored slab behind images (Madison found them goofy).
  - Hero portrait (`.mossy-hero__panel img`): dropped `box-shadow: 8px 8px 0 $moss-shadow`.
  - Publication thumbnails (`.publications .preview`): dropped `box-shadow: 5px 5px 0 ...` and trimmed the now-unused `box-shadow` transition.
  - Removed the now-unused `$moss-shadow` brand constant.
- Left untouched: the "Currently" dot's soft glow halo and the subtle card hover-lift (not behind images, not the slab effect).

#### Decided
- The offset moss shadow is no longer a design signature. CLAUDE.md Mossy spec updated to reflect the removal.

### 2026-06-28 - Gallery: per-photo blurbs + integrate Madison's new images

#### Added
- Five new gallery images imported to `assets/img/` (kebab-renamed from Madison's Drive export): `gallery-abs-2025.jpg`, `gallery-f-communis-2025.jpg`, `gallery-clay-models-2025.jpg`, `gallery-transects-2025.jpg`, `gallery-p-phalangioides-2022.jpg`.
- Per-photo blurb method on the gallery: each tile now carries `data-title` + `data-description`, shown beneath the full image in the GLightbox lightbox (preserves the clean Google-Photos grid; no visible-caption clutter). Blurb text is currently PLACEHOLDER, awaiting Madison's real captions.

#### Changed
- `_pages/gallery.md`: rebuilt the tile set. Now 6 photos (Paige fieldwork, transects, P. phalangioides, F. communis, clay models, ABS) plus the existing spider-hunting tile.
- Header comment updated to document the `data-title`/`data-description` blurb workflow for runbook 04.

#### Removed
- Dropped the `gallery-spider-squad-2023.jpg` tile from the gallery. It is the same photo as Madison's `mentoring - Ellie Wheeler, Ava Mueller, Sage DeLong, and me 2023`; it belongs on the mentoring page, not the gallery. (File retained in `assets/img/` for reuse on the teaching/mentoring page.)

#### Notes
- Verified by eye that `gallery-paige-fieldwork.jpg` is identical to Madison's new "Paige Duncan...Mackinaw 2020" export, so the existing file is reused (no duplicate import).
- `gallery-spider-hunting-2022.jpg` (3 students searching logs) is not in Madison's new set and has no blurb yet; kept in place pending a caption or a decision to retire it.

### 2026-06-28 - Publications: real preview images replace placeholder cards

#### Changed
- Replaced all four placeholder preview cards in `assets/img/publication_preview/` with Madison's real images, one per paper:
  - `instinct-insight` <- the paper's 4-panel framework figure (Innate / Previously learned / Learned de novo / Insightful). Source was 3178x3510 / 14 MB; downscaled to 1200px wide JPG q90 (358 KB) to keep the repo lean. CI imagemagick still generates responsive WebP from it.
  - `web-spider` <- cellar spider (Pholcus phalangioides) macro.
  - `treefrog` <- eastern gray treefrog.
  - `songbird-nestling` <- house wren.
- `_bibliography/papers.bib`: repointed the four `preview=` fields from `.png` to `.jpg`.

#### Removed
- The four placeholder `.png` preview cards (instinct-insight, web-spider, treefrog, songbird-nestling).

### 2026-06-24 - Reframe the hero portrait (fix the off-center look)

#### Changed
- `_sass/_mossy.scss` (`.mossy-hero__panel img` / `.mossy-portrait`): the portrait read as a full-body shot squeezed into a portrait slot. Source photo is 1200x1500 (4:5), but the panel forced `aspect-ratio: 3 / 4` (0.75). Because the photo is slightly wider than 3:4, `object-fit: cover` showed the FULL height (only ~6% trimmed off the sides), leaving heavy headroom above and a block of torso below, so her face floated high-center.
  - `aspect-ratio` `3 / 4` -> `5 / 6` and added `object-position: 50% 12%`. Together these crop a little headroom and lower torso and pull her face onto the upper third. Portrait orientation (the Mossy panel design) is preserved.

#### Notes
- Chose the framing by rendering the candidate crops (3:4 current, 5:6, 9:10, 1:1) with System.Drawing, reproducing exactly what `object-fit: cover` + `object-position` would paint, and comparing them. 5:6 was the smallest change that fixed the float while keeping the portrait shape. Image file is untouched; this is CSS-only, so it is trivially reversible/swappable to a tighter crop (9:10 or 1:1) if Madison prefers.

#### Decided
- The homepage bio in `_pages/about.md` is now Madison's FINAL bio (no longer a placeholder). CLAUDE.md content tracker updated to match.
- Sanctioned a single exception to the no-em-dash project rule: the bio's "...my cat — Ollie" keeps its em-dash at Madison's request. The rule still holds everywhere else. Documented in CLAUDE.md hard rules.

### 2026-06-23 - Densify the orb-weaver web (kill the blank space)

#### Changed
- `_sass/_mossy.scss` + `_design-reference/genweb.js`: the web field still read as separate hubs with large empty gaps between them. Filled it in two ways:
  - Catch-rings per node: 2 -> 4 (`radii` now `[10, 18, 26, 34]`). The outer ring (34) is larger than half the node spacing (30), so each hub's outermost ring OVERLAPS its neighbors and closes the triangle voids. The field now reads as one continuous dense web instead of loosely linked little webs.
  - Tighter density: `mask-size` `80px 139px` -> `72px 125px` desktop, `64px 111px` -> `58px 100px` mobile (hubs sit closer together).
  - Thread weight eased (spoke `0.6` -> `0.5`, ring `0.5` -> `0.45`) so the denser net stays subtle rather than muddy. Opacity unchanged (0.09 / 0.08 mobile).

#### Notes
- Picked density via headless renders (Edge) of four variants, then confirmed the chosen one at the live 0.09 opacity over the moss gradient with a sample card: background is filled, text stays fully legible. Verified the dense tile + `mask-size:72px 125px` compile into `main.css`.

### 2026-06-23 - Rebuild background as an even orb-weaver web field

#### Changed
- `_sass/_mossy.scss` (`$mossy-web` + `body::before`): replaced the single-target web tile with an even, all-over orb-weaver net. New geometry is a triangular SPOKE lattice (frame / radial threads) with two concentric CONCAVE catch-rings at every node (the capture spiral, sagging inward between spokes like real silk). Every node is identical and rings nearly meet their neighbors, so the field reads as one continuous geometric web rather than a grid of separate, cartoonish webs.
  - New tile viewBox `0 0 60 103.923` (one rhombus of the triangular grid, ratio 1:1.732). `mask-size` is now proportional: `80px 139px` desktop, `64px 111px` on `<=600px` (square sizing would distort the hexagons). Hubs sit ~80px apart, so the texture fills the field densely instead of leaving the old large empty gaps.
  - Opacity unchanged at `0.09` desktop; mobile eased to `0.08`. Still painted via `mask-image` + `background-color: var(--global-theme-color)`, so each theme inherits its own citrine automatically.

#### Added
- `_design-reference/genweb.js`: committed generator for the tile (triangular tiling math + concave Q-curve catch-threads). Edit its knobs (`radii`, `sag`, `s`, stroke widths) and rerun `node _design-reference/genweb.js` to regenerate the `$mossy-web` data URI.

#### Notes
- Motivation: the prior tile read as a repeating cartoon "target" with large dead radial space around each hub. This keeps the orb-weaver identity but makes it an even, subtle, classy field that covers the whole background.
- Verified locally: jekyll build green (~5s); compiled `main.css` carries the new `viewBox='0 0 60 103...'` tile and `mask-size:80px 139px`, and no longer contains the old `200 200` tile. Also rendered the tiled field headless (Edge) at the live 0.09 opacity to confirm subtlety + text legibility before wiring it in.

### 2026-06-23 - Publication thumbnails + Mossy preview styling

#### Added
- `_bibliography/papers.bib`: a `preview={...}` field on all four entries, wiring each paper to a left-column thumbnail (al-folio's built-in feature; `enable_publication_thumbnails` was already `true` and `preview` already in `filtered_bibtex_keywords`).
- `assets/img/publication_preview/`: four Mossy-colored square PLACEHOLDER PNGs (600x600), one per paper: `instinct-insight.png`, `web-spider.png`, `treefrog.png`, `songbird-nestling.png`. Madison replaces each in place (same filename) with a real paper figure or field photo; square sources >=600px work best.
- `_sass/_mossy.scss`: publication-preview styling so the thumbnails match the design language (citrine hairline border, offset moss shadow echoing the hero portrait, border brightens to full citrine on row hover). Also a citrine retint for journal `abbr` venue badges, in case those are added later.

#### Removed
- `assets/img/publication_preview/brownian-motion.gif`, `wave-mechanics.gif`: leftover al-folio demo thumbnails, unreferenced.

#### Notes
- Publication badges (altmetric, dimensions, google_scholar, inspirehep) were already enabled in `_config.yml`; no change needed. Altmetric/Dimensions donuts populate automatically from each entry's DOI.
- Verified with a local jekyll build (green in ~10s): all four previews render into `_site/publications/index.html` and the preview CSS compiles into `main.css` (survives PurgeCSS).

### 2026-06-23 - Seamless spiderweb background field

#### Added
- `_sass/_mossy.scss`: one faint orb-web texture tiled across the whole page as a cohesive backdrop, on a single `body::before` layer (`position: fixed; inset: 0; z-index: -1; pointer-events: none; opacity: 0.09`).
  - Seamless tile: a web node at the tile center with spokes running out to the tile edges and corners, so adjacent tiles' strands meet exactly and read as one continuous net (no visible seams). Geometry: 200x200 viewBox, 8 spokes + 3 sagging orb rings; rendered on screen at a 300px tile.
  - Painted with `mask-image` + `background-color: var(--global-theme-color)`, so each theme inherits its own citrine (deep citrine on parchment, soft citrine on moss) automatically; no per-theme duplication.
  - Fixed full-viewport layer above the body gradient and behind all content, so it stays put while the page scrolls and shows through wherever the moss/parchment shows (cards etc. sit on top).
  - `<=600px`: smaller 220px tile, opacity eased to 0.07.

#### Notes
- Replaces the same-day corner-accent first pass (two `body::before`/`::after` corner webs); the all-over field reads as more intentional and carries across every page.
- Verified with a local jekyll build (data URI compiled intact into main.css). PurgeCSS keeps `body::before` since the `body` base selector is always present.

### 2026-06-22 - Fix awkward wrapping of the homepage hero eyebrow

#### Changed
- `_layouts/about.liquid`: the hero eyebrow subtitle now splits on the dot separator into per-segment spans (role / department / university). Each segment is kept whole so the line can only wrap at a separator, never mid-affiliation (previously "University of" and "Wisconsin-Milwaukee" could split across lines).
- `_sass/_mossy.scss`: `.mossy-eyebrow__part { white-space: nowrap }` plus a two-line `line-height`; separators dimmed slightly. On `<=400px` (e.g. Z Fold cover) tracking tightens and segments are allowed to wrap, since the longest segment cannot fit one line at ~280px regardless.

### 2026-06-22 - Cross-device + mobile hardening

#### Added
- `_sass/_mossy.scss`: a new "Cross-device + mobile hardening" block (additive; desktop layout unchanged) covering iOS, Android, tablets, and foldables (Z Fold cover ~280px, Z Flip, Fold-open):
  - Text/overflow safety nets: `-webkit-text-size-adjust: 100%`, `overflow-x: clip` on root (clip not hidden, so the CV sticky TOC sidebar still works), media `max-width: 100%`, and `overflow-wrap: anywhere` on long tokens (DOIs/URLs/emails) so they wrap on a 280px Fold cover screen.
  - iOS safe-area insets (`env(safe-area-inset-*)`) on the fixed navbar and footer so they clear the notch / Dynamic Island / home indicator.
  - `.table-responsive` horizontal scroll (wrapper-based; bare tables untouched).
  - 44x44px touch targets for the social contact icons on coarse-pointer devices.
  - `<=400px` breakpoint: calmer hero name scale, tighter hero/panel padding, single-column gallery, and consistent edge padding for small phones and folded foldables.
- `_sass/_mossy.scss` (body): `min-height: 100dvh` alongside `100vh` so the atmospheric background fills iOS Safari correctly with its dynamic address bar.

#### Notes
- Baseline was already responsive (viewport meta present, hero collapses at 768px, gallery grid fluid); this hardens the edges rather than fixing a broken state.
- Verified with a local jekyll build (all rules present in compiled main.css). Hinge behavior on real foldables and iOS safe areas cannot be verified in a build; check on actual devices.

### 2026-06-22 - Swap heading font Fraunces -> Lora

#### Changed
- `_sass/_mossy.scss`, `_config.yml`: replaced Fraunces with Lora as the sitewide heading/display font (h1-h6, `.post-title`, `.card-title`, navbar brand). Fraunces' curly lowercase "f" read as too wavy (noticed on the CV "Professional Summary" heading). Lora keeps the warm serif character with conventional letterforms. Body (Lexend) and mono (JetBrains Mono) unchanged.
- `CLAUDE.md`: updated the Mossy typography spec and title-bar rule to reflect Lora.

#### Notes
- Affects every heading sitewide, not just the CV (the f only happened to be visible there). Reversible: swap "Lora" back to "Fraunces" in those two files. Easy to try a different serif (Source Serif, Newsreader) the same way.
- Validated with a local jekyll build: Lora present in the font URL and compiled main.css; Fraunces absent from both.

### 2026-06-22 - Remove redundant Teaching page subtitle

#### Removed
- `_pages/teaching.md`: dropped the page `description` ("Courses, mentoring, and teaching philosophy.") that rendered as a subtitle directly above the three section headers (Teaching philosophy / Courses / Mentoring) listing the same words. Same cleanup as the Research page.

### 2026-06-22 - Google Photos-style gallery grid + GLightbox slider

#### Changed
- `_pages/gallery.md`: rebuilt the gallery as a Google Photos-style library. A responsive CSS grid of equal square tiles (`object-fit: cover`, so mixed portrait/landscape photos all crop tidily and the row is never uneven), with a subtle hover zoom. Tiles re-flow automatically as photos are added.
- Clicking any tile opens a full-screen GLightbox slider (prev/next arrows, keyboard nav, mobile swipe, full uncropped image), the Gmail/Outlook/Google-Photos experience Trevor wanted. Replaced al-folio's medium-zoom (in-place magnify).
- GLightbox 3.3.1 loaded from jsdelivr with SRI integrity hashes (matches the theme's CDN convention; permitted by the theme's permissive CSP). Grid CSS is page-scoped inline `<style>` to stay self-contained. Lightbox captions go in each tile anchor's `data-title` (blank for now, pending Madison's captions).
- Validated with a local jekyll build.

### 2026-06-22 - Fix broken gallery image and add click-to-zoom

#### Fixed
- `assets/img/gallery-spider-hunting-2022.jpg`: the original `Spiderhunting_2022.JPG` was actually a HEIC file (iPhone) with a `.jpg` extension, so browsers could not render it (only 2 of 3 gallery images showed). Re-encoded it to a genuine JPEG (3024x4032) via WIC.

#### Added
- `_pages/gallery.md`: first added `zoomable=true` (medium-zoom); superseded same day by the GLightbox change above.

#### Notes
- Watch for HEIC-as-JPG on future phone photos; convert before committing or the build's responsive step / the browser will choke.

### 2026-06-22 - Add DOIs to publications and fix CV title mismatch

#### Added
- `_bibliography/papers.bib`: added verified `doi` fields to all four publications, so the Publications page now links to each paper. DOIs: Biology Letters 2025 (10.1098/rsbl.2025.0293), Scientific Reports 2024 (10.1038/s41598-024-61252-7), Behavioral Ecology and Sociobiology 2026 (10.1007/s00265-025-03672-7), General and Comparative Endocrinology 2022 (10.1016/j.ygcen.2021.113964).

#### Fixed
- `_data/cv.yml`: corrected the 2025 Biology Letters paper title from "Parsing insight from instinct" to the actual published title "Instinct to insight: a variation-based framework to test hypotheses about how animals solve problems" (verified against royalsocietypublishing.org). The CV and papers.bib now match.

#### Notes
- `papers.bib` was already fully populated with all four real publications in an earlier session (the CLAUDE.md "placeholder" note is stale). Two are flagged `selected={true}` and drive the homepage "selected publications" block. Manuscripts in review/prep from cv.yml are intentionally not in papers.bib (published work only).

### 2026-06-22 - Remove leftover demo PDF

#### Removed
- `assets/pdf/example_pdf.pdf`: al-folio demo file, unreferenced anywhere. The real CV PDF (`Rittinger_2026_CV.pdf`) was already present and wired in `_pages/cv.md`; confirmed Madison's Downloads copy is byte-identical, so no PDF update needed.

### 2026-06-22 - Add Google Scholar and ResearchGate social links

#### Added
- `_data/socials.yml`: enabled `scholar_userid` (FAzQaf4AAAAJ) and `research_gate_profile` (Madison-Rittinger). Contact row order is now email, ORCID, Scholar, ResearchGate, LinkedIn. All academic links now live.

#### Fixed
- Corrected the ResearchGate key: the placeholder used `research_gate`, which the `jekyll-socials` plugin does not recognize (it expects `research_gate_profile`). The wrong key would have rendered no icon or broken the build.

### 2026-06-22 - Add ORCID social link

#### Added
- `_data/socials.yml`: enabled `orcid_id` (0000-0001-6326-1572). Contact row order: email, ORCID, LinkedIn. Scholar/ResearchGate still placeholder.

### 2026-06-22 - Add LinkedIn social link

#### Added
- `_data/socials.yml`: enabled `linkedin_username` (madison-rittinger-5a12711b8). Contact row now shows email then LinkedIn. ORCID/Scholar/ResearchGate still placeholder.

### 2026-06-22 - Add first gallery photos

#### Added
- `assets/img/gallery-paige-fieldwork.jpg`, `gallery-spider-hunting-2022.jpg`, `gallery-spider-squad-2023.jpg`: Madison's first three field photos (originals; the live build generates responsive WebP via imagemagick).
- `_pages/gallery.md`: replaced the "coming soon" placeholder with a responsive 3-across grid (stacks on mobile) of the three photos.

#### Notes
- Captions are intentionally blank (`title=""`) for now; Madison to supply them later.

### 2026-06-22 - Remove Research page subtitle

#### Removed
- `_pages/research.md`: dropped the page `description` ("Organized by question rather than by organism.") that rendered as a subtitle under the title. The question-based organization is still documented in the page's internal HTML comment for maintenance.

### 2026-06-22 - Remove RSS icon from homepage contact row

#### Removed
- `_data/socials.yml`: commented out the `rss_icon` line so the RSS icon no longer renders. There is no blog/feed worth subscribing to (no `_posts`; the one `_news` item is in a collection the default `jekyll-feed` does not include, so `/feed.xml` is effectively empty).

#### Fixed
- Corrected a false assumption: `rss_icon: false` did NOT hide the icon. The `jekyll-socials` plugin renders the RSS icon whenever the `rss_icon` key is PRESENT in `_data/socials.yml`, ignoring its value entirely (plugin source: `jekyll-socials-0.0.7/lib/jekyll-socials.rb`, lines 206-212). The icon had been live on the site. Hiding it requires removing/commenting the key, not setting it false.

#### Notes
- To bring RSS back as a real feature later: configure a `feed.collections.news` block in `_config.yml` so `jekyll-feed` publishes the `_news` collection, then uncomment the `rss_icon` line. Only worth doing once news updates are frequent.

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
