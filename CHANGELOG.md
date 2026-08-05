# Changelog

All notable changes to Madison Rittinger's academic website.
Format based on Keep a Changelog. No em-dashes anywhere (project rule).

This repo-level changelog begins at the point work moved into the repo itself
(VS Code / Claude Code). Earlier design-iteration history lives in Trevor's
Claude project outputs and is summarized in CLAUDE.md.

---

## [Unreleased]

### 2026-08-04 - Two helper pages: build status and DOI to BibTeX

Both from the admin-console mockup's ideas, rebuilt as small static pages. No backend, no Jekyll front matter (copied through untouched, out of the sitemap), Mossy-styled, noindex.

#### Added
- **`/admin/status.html` - "Is my change live yet?"** Polls the public GitHub Actions API (repo is public: no token, CORS-open, 60 requests/hour/visitor) and narrates the latest build in plain words: building (with elapsed time), live (with finish time and cache advice), or failed (calm words plus a link to guide Part 7.1). Shows the last six builds with commit messages so Madi can spot her own change. Polls every 20s while building, 60s otherwise, pauses when the tab is hidden. Verified live against the real API during development.
- **`/admin/doi.html` - DOI to BibTeX.** Paste a DOI (bare or full doi.org link), it fetches the BibTeX from Crossref's public API (CORS verified), pretty-prints the one-line response into one-field-per-line (brace-depth-aware splitter, tested against real Crossref output), and gives a Copy button plus six literal paste-in steps, including the "author must read Rittinger, Madison for the bolding" check. Clear plain-words errors for typos, non-Crossref DOIs, and network trouble.
- Maintenance guide: Part 0.2 and Part 6 now point to the status page as the easy way to watch a build; the Publications row in 0.2 points to the DOI helper; one sentence added about the editor's automatic draft backups.

#### Notes
- Crossref covers essentially all journal articles; rare non-Crossref DOIs (e.g. DataCite datasets) get a plain-words error pointing to manual recipe 5.3.
- Rollback: delete the two files and the three guide references.

### 2026-08-04 - Editor: photo uploads auto-shrink; maintenance guide leads with the editor

Two smoothing items from the editing-experience review, approved by Trevor.

#### Added
- **Photo uploads through /admin now shrink themselves.** New `media_libraries` block in `admin/config.yml`: uploads resize to fit 2048px, re-encode as WebP quality 85, and get slugified filenames (spaces and parentheses become hyphens). Madi can upload straight from a phone camera roll; multi-MB originals no longer land in the repo. Existing images untouched. Verified the pinned Sveltia 0.175 bundle implements these keys; also verified it ALWAYS converts to WebP when a raster transformation is configured, so "resize but keep JPEG" was not an option.
- **Build-side WebP support** so those uploads render with responsive variants like every other photo: `.webp` added to imagemagick `input_formats` in `_config.yml`, and a local `_includes/figure.liquid` override (verbatim gem copy plus webp in the srcset extension list and path-stripping filter). Without the override, the gem serves WebP sources as a single full-size file.
- **MAINTENANCE-GUIDE.md Part 0: the site editor.** New first part documenting /admin as the primary route: sign-in steps, a sidebar-to-recipe map for all 13 Part 5 recipes, the photos-need-no-prep note, a practice run (0.4), and when to fall back to the manual route. Intro, "ways to edit", and Part 5 lead-in updated to point at it. Existing part numbering unchanged on purpose: the guide's internal cross-references all survive.

#### Changed
- CLAUDE.md /admin section rewritten from "IN PROGRESS, not live" to LIVE status, recording the Mossy skin, the upload pipeline, and the remaining nice-to-haves (status page, DOI helper, research-sections refactor, Access gate).

#### Removed
- The News "This year" view filter in `admin/config.yml`: its hardcoded 2026 pattern would silently go stale every January, and date sorting covers the need.

#### Notes
- Untested until first real use: an actual photo upload through the editor (the transformation runs client-side in the browser). Spot-check the first one Madi or Trevor makes: the gallery/site image should look normal, and the committed file should be a .webp around a few hundred KB. If anything looks wrong, remove the `media_libraries` block from `admin/config.yml`; uploads then land unmodified as before (the build-side WebP support is harmless either way).
- Local build green with the figure.liquid override in place (imagemagick disabled locally, so the srcset branch is exercised only by the live CI build; the override is a one-condition diff on the gem file, re-apply it if a future gem upgrade changes figure.liquid).

### 2026-08-04 - Removed al-folio demo images

Trevor asked that only Madi's images live in the repo.

#### Removed
- The 15 demo images the al-folio template shipped for its example posts, none referenced anywhere: `assets/img/1.jpg` through `12.jpg` (coffee cups, books, stock shots), `rhino.png`, `template_error.png`, and `book_covers/the_godfather.jpg` (with its now-empty `book_covers/` folder; the repo has no `_books` collection).
- `assets/img/_PLACEHOLDER_README.md`, the early folder note. Unreferenced, never published (leading underscore keeps it out of the built site), and its "runbook 04" pointer was stale; MAINTENANCE-GUIDE.md covers the same ground including the `prof_pic.jpg` requirement.

#### Notes
- Verified before deleting: zero references in repo content and zero in the al_folio_core 1.0.11 gem; local Jekyll build stays green afterward. The `.lycheeignore` line naming `_books/the_godfather.md` was already dead (that file never existed here) and is harmless.
- Rollback: all files recoverable from git history (`git checkout <commit>~1 -- assets/img/<name>`).

### 2026-08-04 - Admin editor reskinned in Mossy Modernist

The /admin editor (Sveltia CMS) now matches the site's Mossy Modernist look instead of Sveltia's stock blue-gray, modeled on the custom admin-console mockup Trevor approved on 2026-07-31.

#### Added
- A CSS override block in `admin/index.html` that retargets Sveltia's `--sui-*` custom properties to the Mossy palette: moss surfaces (#1e2a18 base, #2a3624 cards), cream text (#f4f0d8), citrine accents and buttons (#d4c878, moss text on citrine), citrine-tinted borders, and Lexend as the UI font (monospace fields like the BibTeX box untouched). One look in both of Sveltia's themes; alert colors pinned to the dark-theme values so notices stay readable.
- Lexend Google Fonts links in the admin page head.

#### Notes
- Colors and typography only. The mockup's custom layout (left rail, publish tracker, DOI lookup) is bespoke UI and out of scope for a CSS skin.
- Verified locally: Sveltia renders without shadow DOM, so page-level CSS reaches it; login screen screenshot confirms the palette. The editor interior consumes the same variables but was not screenshot-verified (needs an interactive sign-in); check it on next real use.
- The `--sui-*` surface is not a documented theming API. It is stable within the pinned 0.175.x minor; re-check the skin after any deliberate Sveltia version bump. If variables are ever renamed the editor falls back to its stock look; nothing functional can break.
- Rollback: delete the marked style block and the two font `<link>`s plus preconnects in `admin/index.html`.

### 2026-07-31 - Hero portrait sharpened (Madi's report)

Madi flagged the homepage portrait as softer than the photo she provided. Two causes, both fixed:

#### Fixed
- The committed `assets/img/prof_pic.jpg` was a downscaled recompression (1200x1500, 347 KB) of her original. Replaced with the original file untouched (1638x2048, 818 KB, from Trevor's Madisite folder, `1. About-Homepage/headshot (2).jpg`). Every generated WebP variant now derives from the full-quality source, and the 1400w variant is no longer an upscale.
- The hero image's `sizes` hint said 360px while the orange panel actually renders about 430px wide, so browsers on scaled Windows displays (125-150%, the common case) picked the smallest 480w WebP and stretched it. Now hints 480px, which keeps those displays on the 800w variant.

#### Notes
- WebP quality stays at 85; the loss Madi saw came from the source file, not the compression setting.

### 2026-07-31 - Admin editor: OAuth deployed and proven end to end (one real bug found and fixed)

The full sign-in chain ran for the first time tonight and works: GitHub App (Part 1-ALT route) created on the madiritt account and installed on only the site repo, Worker deployed to https://madiritt-admin-auth.abysul.workers.dev with both secrets set, and a live localhost sign-in as madiritt completed through GitHub's real consent flow into a working editor session.

#### Fixed
- **The Worker's editor-origin guess was wrong for localhost, stalling sign-in forever.** The token handoff postMessages to the editor's origin, which the Worker guessed from the Referer header. In practice Edge never sent a Referer from the http://localhost:4000 editor to the https Worker, so the guess fell back to the production origin and the browser silently dropped every delivery (fail-closed, but stuck). Origin now comes from Sveltia's `site_id` query param, which is deterministic: literal `cms.netlify.com` means localhost (a Netlify-era relic that fingerprints local runs exactly), a real hostname is matched against ALLOWED_ORIGINS, and Referer remains only as a last-resort fallback for non-Sveltia clients.
- **The relay page now diagnoses itself.** Instead of a bare spinner, the "Signing you in" popup prints its delivery target and attempt count on the page, names a missing `window.opener` (popup blocker symptom) in plain words, and after 25 attempts says exactly what to report. This turned the second debugging round from console archaeology into reading one grey sentence, and stays useful for any future sign-in trouble.

#### Notes
- GitHub App experiment (Part 1-ALT): the app route works exactly like an OAuth App through the same endpoints, as hoped. Client ID starts with `Iv`, tokens exchange fine, allowlist lookup via /user works.
- The one-time workers.dev subdomain registration (abysul.workers.dev) had to be done in the Cloudflare dashboard before the first deploy would go through.
- Remaining untested: sign-in from the live https://madisonrittinger.org origin (Part 5), collaborator sign-in as AbysulGaming, and Madi's own machine.

### 2026-07-31 - Admin editor: Part 0 local test run by Trevor, two findings fixed

First human run of the SETUP-ADMIN.md Part 0 no-account test (Sveltia local mode against the running dev server). Every sidebar collection showed real content, both saves worked, and the repo was verified clean afterward.

#### Verified
- **BibTeX round-trip PASSED (the go/no-go gate for Publications).** Saving `papers.bib` from the editor produced a zero-line `git diff`: no reordered keys, no stripped comments, no mangling (the deliberately added trailing blank line was normalized away, which the runbook counts as a pass). Publications stays in the editor.
- New-news-item creation writes correct front matter: `layout`/`inline`/`related_posts` hidden defaults all present, date in the site's exact `YYYY-MM-DD 09:00:00-0600` format.

#### Fixed
- **News filename was dated tomorrow.** The slug tags `{{year}}-{{month}}-{{day}}` use save-time UTC, so any evening save in US time produced a filename one day ahead of the front-matter date (test file: `2026-08-01-...` for a July 31 item). Slug recipe is now `{{fields.date | date('YYYY-MM-DD')}}-{{uuid_short}}`: date from the Date field itself, short random id for uniqueness (news items have no title to slug). Harmless to the build either way (front-matter date wins) but confusing to a human.
- **Homepage Portrait preview was blank.** The stored value was the al-folio bare filename (`prof_pic.jpg`), which the editor cannot map back to a real file for preview. The portrait field now uses the same global `assets/img` media/public mapping as the gallery (whose previews worked): `_pages/about.md` stores `assets/img/prof_pic.jpg`, and the local `_layouts/about.liquid` normalizes with `remove_first: 'assets/img/' | prepend: 'assets/img/'` so BOTH the bare and full-path forms render identically. Gem consumers of the bare form (`profiles.liquid`) are unused by this site. While in there, the hero image's alt text changed from the filename to "Portrait of Madison Rittinger" (screen-reader fix).

#### Notes
- Retest of just these two items (portrait preview + news filename) is the remaining Part 0 work; the `{{fields.date | date(...)}}` slug syntax is documented Sveltia but untested here until that retest.

The Worker had been syntax-checked and contract-verified but never executed. `wrangler dev` runs it locally with no Cloudflare account, so it got a five-test curl battery tonight.

#### Verified (all five passed, no code changes needed)
- `GET /` returns the 404 explainer page.
- `GET /auth` with a localhost Referer issues the 302 to GitHub with the right `client_id`, `scope=public_repo`, a fresh random `state`, and `redirect_uri` derived from the Worker's own origin; the state cookie carries `state|origin` with the origin correctly resolved FROM THE REFERER and validated against the allowlist. This is the first live exercise of the Referer fix.
- Bare `GET /callback` is refused with 400.
- `GET /callback` with a wrong `state` is refused with 400 AND clears the state cookie.
- `GET /callback` with the correct state and a fake code runs the full exchange against GitHub's REAL token endpoint (which refused the fake credentials), and the resulting relay page is exactly the Sveltia contract: `authorization:github:error:` + JSON carrying `provider` and `error`, the `authorizing:github` announce, the target origin faithfully round-tripped (`http://localhost:4000`), the cookie cleared, and syntactically valid embedded JS.
- Net: the only untested code path left in the Worker is the one that requires a real OAuth app: a genuine code swap succeeding, plus the allowlist lookup that follows it.

#### Added
- `.dev.vars` (wrangler's local-dev secrets file) added to `.gitignore` before first use, so tomorrow's debugging can never accidentally commit real credentials. Tonight's run used fake values, deleted after the test.

#### Notes
- Third PR production build (the schema-fix push) green.

### 2026-07-30 - Admin editor: schema validation pass (nine invalid config keys found mechanically)

Sveltia generates a JSON schema of its config format from its own source. Validating `admin/config.yml` against it (ajv, draft-07, schema pinned to our `^0.175.0`) found real problems every eyeball pass had missed, because the keys involved are valid SOMEWHERE in the config, just not where they sat.

#### Fixed
- **All seven file-entry `description` keys were invalid and silently ignored.** File entries accept no `description`; collections do. Every files collection (Homepage, Gallery, Publications, Outreach, Teaching, CV, Links and contact) had its explanatory text on the file entry, where the editor would never have shown it. All seven moved up to collection level, where they render in the UI.
- **Hidden fields accept only `name`/`widget`/`default`/`i18n`.** The two hidden `body` fields (Teaching and CV) carried `label` and `comment` keys the schema rejects; both are now minimal `{ name: body, widget: hidden }` with the explanation moved to YAML `#` comments beside them.
- Re-validated after the fixes: `admin-config.json valid`, zero violations. Boot re-verified by screenshot; `admin/config.yml` still byte-identical through the build (20476 = 20476).

#### Added
- `# yaml-language-server: $schema=...` comment at the top of `admin/config.yml`, pinned to `^0.175.0`, so VS Code (with the YAML extension) validates future edits live. A comment only; the editor never reads it.

#### Notes
- The schema run also CONFIRMED choices made earlier from documentation: `format` is legal at both collection and file level (yesterday's move was right but not required), `output.omit_empty_optional_fields` is a recognised root key, and the news `format`/`slug`/`view_filters`/`sortable_fields` block is clean.
- Second PR build (triggered by the docs push) also green, and this push gives a third run on the corrected config for free.

### 2026-07-30 - Admin editor: continued cleanup (docs made merge-proof, production build validated)

Kept hunting after the squeaky-clean pass. Two finds this round, one of them the biggest remaining blind spot.

#### Fixed
- **MAINTENANCE-GUIDE recipe 5.9 would have been wrong the moment the branch merges.** It still taught the pre-refactor Teaching page: editing sentences between HTML in the body, "carefully", with fragile-layout warnings. Rewritten on the branch for the front-matter world: words, photo swaps, side moves, and adding a section (now safe), with indentation as the one rule. The photo-shape warning is retired outright: the frame's CSS has always cropped to 4 by 3, so shape never mattered. TOC, 5.0 index entry, and appendix row updated; "(carefully)" dropped from the title. (Committed as 7c65535 without its changelog line; recorded here.)
- TECH-STACK.md at-a-glance table gains the editor rows (Sveltia at /admin, the Worker + wrangler), so the stack inventory stays truthful post-merge.

#### Verified
- **The production build pipeline passes on the branch.** deploy.yml turns out to run its full build for pull requests and only skip the Deploy step, so draft PR #1 was opened to exercise it: imagemagick responsive WebP, JEKYLL_ENV=production, purgecss, all green, Deploy correctly skipped. This closes the one gap local testing could not reach (the dev config intentionally disables imagemagick). Tomorrow's Part 5 merge now runs a pipeline that has already succeeded on this exact tree; the PR is draft-only, marked do-not-merge (go-live stays gated by SETUP-ADMIN.md), and the Part 5 push will close it automatically.
- README.md's only "cms" match is al-folio boilerplate; TECH-STACK.md contained nothing the branch invalidates.

### 2026-07-30 - Admin editor: paving tomorrow's manual work (branch `admin-cms`, still NOT live)

Everything below removes a step, a decision, or a surprise from the login-requiring session planned for 2026-07-31.

#### Added
- **Worker sign-in allowlist (the "A" hardening, built tonight so tomorrow needs one deploy instead of two).** After the token exchange the Worker asks GitHub which account just signed in and only relays the token if the login is on the `ALLOWED_USERS` list (a plain var in `wrangler.toml`, currently madiritt + AbysulGaming, case-insensitive). GitHub already rejects saves from strangers, so this adds no capability; it turns them away at sign-in instead of at their first save. Fails safe in both directions: an unreachable GitHub API refuses the sign-in with a readable message, and an empty or deleted list switches the check off rather than locking everyone out. Runbook's who-can-edit section and troubleshooting updated (adding an editor is now Collaborators + this list + `wrangler deploy`).
- **SETUP-ADMIN Part 6: the Cloudflare Access gate (the "D" hardening), written up from current Cloudflare docs.** One-click "Enable Cloudflare Access" on the Worker's workers.dev route, policy restricted to two literal email addresses, a gate-alone test and a whole-chain test, the back-out, and a note on the one interaction with our own design (Access's redirect can strip the Referer the Worker reads; harmless in production because the fallback IS the production origin). Flagged as docs-derived and unexercised.

#### Done tonight that the runbook expected tomorrow
- Part 2 complete: wrangler 4.115.0 installed globally and on PATH.
- Part 3's mechanics proven without an account: `wrangler deploy --dry-run` bundles the Worker green (6.96 KiB) and shows `ALLOWED_USERS` bound as an environment variable. Only `wrangler login` and the real deploy remain.
- Worker re-verified after the allowlist: Node syntax check green.

#### Changed
- CLAUDE.md gains an "IN PROGRESS: /admin web editor" section: branch state, what is done and verified, exactly what remains (with runbook part numbers), the honest unknowns, and the post-go-live reminder to update MAINTENANCE-GUIDE (deliberately not before). A fresh session tomorrow starts with the full picture instead of reconstructing it from git.

### 2026-07-30 - Admin editor: squeaky-clean pass (branch `admin-cms`, still NOT live)

Final sweep of the corners no earlier pass had reached. Nothing dramatic surfaced, which was the point of checking.

#### Fixed
- Worker error payloads now carry `provider: "github"` alongside `error`, matching the shape Sveltia's own authenticator sends. Success payloads already had it; errors did not.
- SETUP-ADMIN's time estimate still said 15 minutes for a Part 0 that had grown to 20 steps; now says 20.

#### Added
- Part 0 step 17: after creating the test news item, `Get-Content` the new file and compare its `date:` line against the existing items' fixed `09:00:00-0600` shape. The datetime widget's stored format is the last thing only a real save can prove; now the test proves it, with told-what-to-report wording if it differs.

#### Verified (no changes needed)
- `wrangler.toml` read end to end for the first time: name matches the URL pattern the runbook promises, `main = worker.js`, no bindings, secrets documented as CLI-only. Correct as written on day one.
- `worker.js` passes a real syntax check (Node `--check` as an ES module).
- `admin/config.yml` and the refactored `_pages/teaching.md` both parse under a second YAML implementation (Ruby's, the one the live build actually uses); teaching yields its 3 sections.
- `papers.bib` front-matter fence confirmed intact (first two lines `---`).
- Built output re-checked: `/admin/` absent from `sitemap.xml`, `/teaching/` present, `robots.txt` carries the Disallow (its localhost sitemap URL is the dev-config override, not a bug).
- Every numbered list in SETUP-ADMIN.md re-verified strictly sequential after the step insertions (Part 0 runs 1 to 21).
- Em-dash sweep across every file the branch touches vs `main`: the only two hits are the pre-existing sanctioned CHANGELOG mentions of the bio's "Ollie" exception.

### 2026-07-30 - Admin editor: error-hunting pass over our own work (branch `admin-cms`, still NOT live)

Deliberate defect hunt over everything built on this branch today, checking claims against files rather than against memory. Four real bugs found and fixed, plus a full front-matter audit.

#### Fixed
- **teaching-sections.liquid ran figure.liquid even for photo-less sections.** The figure markup was built inside `{% capture %}` before the photo check, so a section without a photo would still execute the include with a nil path (broken image or build error waiting for the first photo-less section). The capture is now inside the guard. Rendered output for the current three sections: verified unchanged, every `<p>`, `<h2>` and `<figcaption>` byte-identical to the pre-refactor baseline.
- **Publications collection had `format: yaml-frontmatter` on the file entry; the config schema defines it at collection level.** At file level it could be ignored, and a `.bib` extension has no inferred format, so the collection might not have loaded at all. Moved up, with a comment saying why it sits there.
- **Clearing an optional field would have written a truthy empty string.** Sveltia writes `""` for emptied fields by default, and empty string is truthy to Liquid, so clearing ORCID would render a broken icon while the field's own hint says "clear a value to hide that icon". Root-level `output: omit_empty_optional_fields: true` makes clearing genuinely remove the key (Sveltia-only option; harmless if Decap ever replaces it).
- **Worker: a thrown fetch to GitHub surfaced as a bare Cloudflare exception page.** The token exchange is now wrapped so network failures come back through the normal relay ("Could not reach GitHub..."), which the editor shows on its sign-in screen. The one-time state cookie is also expired on every callback outcome instead of lingering for its 10-minute window.

#### Verified (audit, no changes needed)
- Every front-matter key in every file the editor touches, re-checked against the live files: about.md (all 13 keys incl. the three nested objects), gallery.md, cv.md (`cv_pdf` leading slash matches the field's `public_folder`), outreach.md, `_projects/*` (incl. empty `img`), `_news/*`, socials.yml. No undeclared keys anywhere.
- Gallery and Teaching photo paths store as `assets/img/...` via the global media settings, matching what the pages already contain.

#### Changed
- SETUP-ADMIN Part 0 grew from 14 to 20 steps, adding the two checks the audit could not settle from source alone: the Homepage portrait preview (the one image field with a nonstandard path mapping) and a create-a-news-item test. News files have no `title` key and the filename recipe leans on one, so what filename the editor invents for a new item is genuinely unknown; the test says what a pass looks like and what to report otherwise. Cleanup switched to `git checkout -- .` plus `git clean -fd _news`, since checkout cannot remove a file git was never told about.
- SETUP-ADMIN Part 5 step 8: the go-live smoke test said to click "the publish button"; the button is labelled **Save** (top right), and in signed-in mode Save commits to the repo. Named exactly now.

#### Notes
- `/admin` boot re-verified by screenshot after the config changes; `admin/config.yml` still byte-identical through the build (20061 = 20061). Full local build green.

### 2026-07-30 - Teaching page refactor (now editable) + GitHub App sign-in route (branch `admin-cms`, still NOT live)

Second follow-up of the day, reopening the two items previously written off as not workaroundable. Both fell.

#### Changed
- **Teaching / Mentoring page refactored so its words are editable without touching its layout.** The page's text now lives in the front matter as a `sections` list (heading, optional photo + caption + side, text), and a new local `_includes/teaching-sections.liquid` renders the Madison-approved article-style float layout around it. The page body is now a single include line. The one content change: the CV link's `relative_url` Liquid (which cannot run in front matter) became a literal `/cv/`, byte-identical output since `baseurl` is empty.
- While moving the CSS into the include, the per-section selectors changed from `:nth-of-type(1/2/3)` (which hardcoded "three sections, right/left/right") to `.photo-right`/`.photo-left` classes derived from each section's `photo_side`. Adding, removing, or reordering sections can no longer silently detach a section from its layout rules. A left-side photo now automatically renders before its heading (the Courses title-beside-photo behaviour, generalized).
- Verified faithful: whitespace-normalized diff of the built page shows only the intended class renames and comment text, with every content line, heading id, link, and smart quote identical; before/after screenshots at 1280px and 500px match, including the mobile flex reorder that keeps the Courses heading above its photo.

#### Added
- **Teaching / Mentoring collection in the /admin editor.** Sections as a list widget with heading, photo, caption, side picker, and text. Machinery (`layout` etc. and the include-line body) pinned hidden, same pattern as the CV page. The fourth-pass "too fragile for a text box" verdict is retired: the fragile part is simply no longer in the editable file.
- **SETUP-ADMIN.md Part 1-ALT: register a GitHub App instead of an OAuth App.** GitHub Apps use the identical authorize/token endpoints, so the Worker needs no changes; the app is installable on exactly this one repo with only Contents read/write, the tightest blast radius available. Runbook covers the webhook untick (the form will not save without it), disabling user-token expiration for the first test, single-repo install, cross-references in Part 3, a clean-swap procedure back to the OAuth App if the experiment fails, and backout. Flagged try-and-see: endpoints verified identical, but no CMS documents the combination, and the collaborator-account sign-in is the honest unknown.
- Worker now passes GitHub's `refresh_token` through to the editor as `refreshToken` (Sveltia's auth client understands it). Inert for OAuth Apps; only fires if a GitHub App with token expiration is ever used.

#### Notes
- Local build green; `/admin` boot re-verified by screenshot with the Teaching collection added; `admin/config.yml` still byte-identical through the build (19339 = 19339).
- Both Part 0 sidebar expectations and Part 5 step 7 updated to the nine-collection list.

### 2026-07-30 - Admin editor: verification pass + pragmatic workarounds (branch `admin-cms`, still NOT live)

Follow-up to the entry below, attacking its open risks in order. The OAuth handshake is no longer a leap of faith, the editor is now testable end to end without any accounts, and publications made it into the editor after all.

#### Fixed (both would have broken the first sign-in)
- **The Sveltia version pin was wrong.** `@sveltia/cms@^0.1.0` was meant to pin the major version, but Sveltia versions as 0.MINOR.PATCH, so it resolved to 0.1.8 from early 2023 while current is 0.175.1. Now pinned `^0.175.0` (one minor: patches arrive, breaking releases do not), and verified 0.175.1 ships `dist/sveltia-cms.js` at that path. Also dropped `type="module"` from the script tag, which the Sveltia docs say not to add.
- **The Worker read a query param that never arrives.** It expected `site_origin` to learn which page to hand the token back to, but Sveltia sends only `provider`, `site_id` and `scope`, and its `site_id` is useless as an origin (a bare domain, and literally `cms.netlify.com` when the editor runs on localhost, a Netlify-era relic). Every sign-in would have fallen back to the apex default, so localhost and www sign-ins would have hung with no error. The Worker now derives the editor's origin from the Referer header (browsers send at least the origin cross-site under the default policy), validated against the same allowlist. A wrong or missing Referer fails closed: the token postMessage is simply never delivered to an unlisted origin.
- Worker's missing-secret error pointed at `admin-auth/README.md`, which does not exist. Now points at SETUP-ADMIN.md Part 3.

#### Verified (the "UNTESTED end to end" flag, mostly retired)
- The popup handshake contract was checked against Sveltia's actual source (`src/lib/services/backends/git/shared/auth.js`) and against Sveltia's own official authenticator Worker: announce `authorizing:github`, wait for the editor's echo, then `authorization:github:success:{json}` with a `token` key, origins checked both ways. Our relay implements exactly this, and is stricter than the official one in one respect (it targets the editor's specific origin where the official uses a wildcard for the initial announce). What remains untested is only GitHub's half (the consent screen and code swap), which cannot run without the registered app.
- Editor boot verified live: Jekyll serve + headless Edge screenshot of /admin shows Sveltia 0.175.1 parsing our config and rendering the sign-in screen, with the local-repository and access-token options present.

#### Added
- **Publications made it into the editor after all** (the entry below ruled them out). `papers.bib` carries an empty Jekyll front-matter fence, so it parses as front matter + body like any page, and the whole BibTeX text is now exposed as one plain text box: collection "Publications (advanced)". Not a form, and never will be: it is recipe 5.3's file in a bigger window with commit-on-save. Explicitly experimental: it stays only if the Part 0 round-trip test (save, then `git diff` must be clean) passes; the config block says so in its own comment.
- **SETUP-ADMIN.md Part 0: test the whole editor with no accounts.** Sveltia's local-repository mode (Chromium's File System Access API; Edge or Chrome required, no proxy server, no sign-in) edits the working tree directly. The runbook walks every collection, then a deliberate round-trip on papers.bib with a `git diff` pass/fail gate and `git checkout -- .` cleanup. This moves "does every form and hidden field survive a save" from launch-day discovery to a 15-minute pre-flight.
- **SETUP-ADMIN.md Plan B: access-token sign-in.** The sign-in screen's "Sign In Using Access Token" button works with no OAuth app and no Worker, so Parts 1 to 3 are now documented as optional. A fine-grained PAT scoped to only this repo's Contents is actually tighter than the OAuth app's `public_repo` scope. Trade-off stated in the runbook: fine for Trevor, clunkier for Madi day-to-day, so OAuth remains the primary plan.

#### Notes
- Referer-origin claim is documented browser default behaviour (strict-origin-when-cross-origin sends the origin on cross-site requests); flagged here because it is the one piece of the fix that rests on a browser default rather than something exercised locally. The Part 0 test cannot reach it; the first real sign-in in Part 5 does.
- Local `jekyll build` still green after all changes; /admin boot re-verified by screenshot after the config gained the Publications collection.

### 2026-07-30 - Web editor at /admin (branch `admin-cms`, NOT yet live)

A form-based editor so Madi can change the site without editing files. Built on the `admin-cms` branch; the site only rebuilds on pushes to `main`, so nothing reaches visitors until the merge step in `SETUP-ADMIN.md` Part 5.

#### Added
- `admin/index.html` and `admin/config.yml`: Sveltia CMS (reads Decap's config format unchanged, so swapping to Decap is a one-line script-tag change if it ever misbehaves). Collections for Homepage, News, Gallery, Research, Outreach, CV, and Links and contact.
- `admin-auth/worker.js` + `wrangler.toml`: our own ~200-line Cloudflare Worker brokering the GitHub OAuth handshake. Written in-house rather than depending on a third-party worker whose current endpoint contract could not be verified. Holds no state, has no bindings, and does exactly two things (`/auth`, `/callback`).
- `SETUP-ADMIN.md`: numbered one-time runbook for the parts needing a login (register the OAuth app, deploy the Worker, set the two secrets, merge to go live), with expected results per step, a failure-diagnosis section, and a complete back-out procedure.
- `robots.txt`: `Disallow: /admin/`. Filed as polish, not protection; robots.txt is public and advertises the path as much as it hides it.

#### Decided
- **Authorisation is GitHub's, not ours.** The Worker authenticates but authorises nothing. Anyone may sign in; only accounts with push access to the repo can save. Verified live: `madiritt` (admin) and `AbysulGaming` (push) both qualify, so the "two admins" requirement needed zero implementation. Adding or removing an editor is a Collaborators change and nothing else.
- **OAuth scope is `public_repo`, not `repo`.** The site repo is public, so the narrower scope suffices. This matters because `repo` would also grant write access to every private repository the signed-in person can reach (`claude-home`, `academic-site-starter`, and the rest). Free reduction in blast radius.
- **A GitHub App would be tighter still** (installable on one repo) but OAuth App is the path both CMSes document. Deferred rather than promised, since GitHub App support could not be confirmed.
- **Publications are NOT in the editor.** `_bibliography/papers.bib` is BibTeX read by jekyll-scholar; these CMSes model YAML/markdown only. The design mockup showed a publications form, and that is a phase-2 custom widget, not something this config delivers. Recipe 5.3 remains the route, which is a handful of papers a year.
- **Teaching page body is not exposed.** Its hand-tuned float layout is too fragile for a text box; recipe 5.9 stays. Research and Outreach bodies use a plain `text` widget rather than a rich markdown editor so their `<style>` blocks and `{: .mossy-section}` attribute lines survive verbatim.
- Rejected a secret admin path (`/admin/<number>`) and hosting the editor from a private repo. Both confuse source privacy with page privacy: a public repo publishes the path in a browsable file list, and Pages serves the built output publicly regardless of repo visibility (Trevor's own `integrity-preview` and `helius-preview` repos are public for exactly this reason, and private-repo Pages needs a paid plan besides). Also rejected client-side MFA on the admin page, which is unenforceable in static files and redundant: both accounts already have GitHub 2FA, so the sign-in is already multi-factor.

#### Fixed (caught before it shipped)
- `admin/config.yml` contains Liquid-looking templates (`{{fields.caption}}`, `{{year}}`, `{{slug}}`, `{{body | truncate(70)}}`). Giving it front matter would make Jekyll run Liquid over it and silently blank all of them, breaking the editor in a way that would be very hard to trace. Both admin files are therefore deliberately front-matter-free static files, with a comment at the top of each saying so and why. Verified: build output is byte-identical to source for both.
- jekyll-sitemap lists static `.html` files, so `/admin/` appeared in `sitemap.xml` on the first build. Excluded via a second `defaults` scope, matching the existing `assets` precedent, rather than with front matter (which would have reintroduced the Liquid problem above).
- Every existing front-matter key in every file the editor touches is declared in the config, including ones Madi must never edit, as `widget: hidden` with the current value as default. Undeclared keys can be dropped on save, and losing `layout` or `permalink` breaks that page's build. `_pages/about.md` was the risky one: `layout`, `title`, `permalink`, the whole `profile` object, `selected_papers`, `social`, `announcements`, and `latest_posts` are all pinned.

#### Notes
- Verified locally: full `jekyll build` green in 3.6s with the new files; `/admin/` and `/admin/config.yml` published; `admin-auth/` and `SETUP-ADMIN.md` excluded from output; `robots.txt` correct; sitemap clean.
- UNTESTED end to end, and honestly flagged as such in the runbook: the OAuth popup handshake (the `postMessage` contract between the Worker's relay page and the editor) cannot be exercised without a registered OAuth app. It is the most likely thing to need a tweak, so `SETUP-ADMIN.md` leads its troubleshooting with that symptom and a console-inspection step.
- KNOWN COST: the editor rewrites YAML mechanically, so the explanatory `#` comments in `about.md`, `gallery.md` and `socials.yml` are stripped the first time she saves those files. Their content was moved into `hint:` text on the corresponding fields, where it surfaces in the UI at the moment it is useful, and it remains in CLAUDE.md and MAINTENANCE-GUIDE.md.
- The maintenance guide stays the documented fallback. The editor is a convenience layer over ordinary commits, so if the Worker ever breaks, the browser route still works unchanged. Madi should still do the 3.6 practice run.

### 2026-07-29 - MAINTENANCE-GUIDE.md: sixth pass (page-first routing + the missing Outreach recipe)

Trevor's observation: the guide was keyed by task and file ("5.2 Add a news item"), but Madi will always arrive from the opposite direction, having just looked at a page on her own site and noticed something. Nothing indexed the guide that way.

#### Added
- **5.0 "Start from the page you are looking at."** A page-by-page index: for each live page, a table of the individual things a visitor sees on it and which recipe changes each one. Leads with the fact that one page is assembled from several files (the homepage draws on six), which is the reason "edit the homepage" was never a single recipe. Verified against `_layouts/about.liquid` for what the homepage actually composes, in render order: subtitle eyebrow, headline name, bio, Currently, portrait, News (limit 5), Selected Publications, social icons + contact note.
- Rows in 5.0 for the two things that look editable and are not: the headline name (comes from `first_name`/`last_name` in `_config.yml`, flagged as technical-help) and menu/colour/font/spacing (design work, not content). Also a warning not to go hunting in `_pages/research.md`, which is 20 lines of card-assembly machinery with none of the research content in it.
- **5.13 Edit the Outreach page.** `_pages/outreach.md` renders live at /outreach/ and had NO recipe in any previous version of this guide, despite still carrying its `<!-- DRAFT, assembled from Madison's CV -->` comment, meaning the one page most in need of Madi's own editing was the one page she had no instructions for. The recipe covers the draft comment, the paragraphs, adding a section, and the `{: .mossy-section}` line (verified against `_sass/_mossy.scss` line 388: it draws the 3px citrine divider bar above the section plus its top spacing, so deleting it silently removes the divider and closes up the gap). Notes that the page is off-menu but fully public, and that moving it into the menu is a `nav:` plus ordering change worth handing over.

#### Changed
- Appendix cheat sheet gained two columns: which page each thing shows on, and the recipe number. Previously it named the file but left her to find the matching recipe by scanning Part 5. The News and Publications rows now state the two-places-at-once behaviour (homepage newest 5 vs /news/ all; homepage `selected` vs the full Publications page). The Research row says explicitly to edit `_projects/`, NOT `_pages/research.md`. Added the Outreach row and a Google-summary row. Both `_config.yml` rows now say the value is on the indented line below the label, matching the fifth-pass fix.
- 5.11 retitled from "Small homepage text (contact note, subtitle)" to "Contact note, Google summary, and the subtitle under your name". Its `description:` half is site-wide, not homepage text, so the old title mis-sold it.
- Appendix now points at 5.0 as the by-page view of the same information, so the two indexes reference each other instead of competing.

#### Notes
- Purely additive to the recipes; no existing recipe's steps changed. Guide is 918 lines.
- Verified page inventory from `_pages/*.md` permalinks and `nav:` flags: /research/ (nav 1), /publications/ (2), /cv/ (3), /teaching/ (4), /gallery/ (5), homepage at `/`, and /news/ + /outreach/ both `nav: false` but live.

### 2026-07-29 - MAINTENANCE-GUIDE.md: fifth pass (accuracy audit + trim)

Audit pass over the fourth-pass rewrite, checking every claim against the actual repo contents rather than against the previous draft.

#### Fixed
- **5.11 was flatly wrong.** `contact_note:` and `description:` in `_config.yml` are YAML folded block scalars (the label line ends in `>` and the sentence sits on the NEXT line, indented two spaces). The recipe said "change only the text after the colon," which would have had her editing the `>` and the stock al-folio comment instead of the sentence. Now shows the real four lines from the file, explains what `>` does, and says to keep the two-space indent. Verified `_config.yml` is the ONLY file any recipe touches that uses folded scalars (`_pages`, `_projects`, `_data/socials.yml`, `papers.bib` are all plain), so the "text after the colon" wording stays correct everywhere else.
- 5.11 also now warns off `blog_description` (line 125, unused, looks similar to the real `description`).
- **5.8 pointed at an ambiguous anchor.** `_projects/*.md` contain TWO `<style>` blocks (lines 17-60 and 102-138), so "scroll past the `</style>` line, roughly 70 lines down" pointed at the wrong boundary and would have dropped her into the photo/script tail. Re-anchored on the unambiguous `<div class="research-body" markdown="1">` block (line 62) and its closing `</div>` 15 lines later, which is genuinely the only editable region. Shorter than the wording it replaced.
- 5.3 step 8 told her to "press Enter twice" after pasting a BibTeX block, which assumes what Scholar's clipboard content ends with. Replaced with a self-checking instruction: look at where the block ends, add one blank line only if the closing `}` is touching the next `@article{`.
- 5.12's news-item deletion described GitHub's delete-confirmation screen as "contents crossed out or a commit box at the bottom." That hedge covered uncertainty about which UI generation is live. Now describes it as a deletion preview and defers to the commit steps already taught in 3.2.
- House rule 4 omitted `_includes` from the machinery list while its own exception (`_includes/publication-credits.html`) lives there. Added.
- 7.6's "no new run in Actions" row blamed VS Code only; it is equally the browser symptom of never clicking the final **Commit changes**. Row now covers both with the section number for each.

#### Changed (trimmed, no information lost)
- 5.3 Part 1 dropped from a 15-step slog with two redundant steps to 15 tighter ones: the "add the last three lines" preview no longer duplicates the three steps that follow it, and the `preview={...}` step no longer forward-references Part 2 which already covers it. The duplicate-BibTeX-ID check moved out of the numbered steps (it is a rare snag, not a per-paper action) into a footnote that says what the build error looks like.
- Non-action items pulled out of numbered lists and into notes: "never delete prof_pic.jpg" (5.10), "pick a photo of similar shape" (5.9, moved BEFORE the steps where it is actionable rather than after the commit), and the house-rule-4 reminder (5.3 Part 3).
- Cut the appendix's three-row "sections worth remembering" table, which duplicated the bolded TOC entries and the intro pointer, down to one sentence.

#### Added
- One line in 3.2 noting that `Ctrl+F` in edit mode opens the editor's own find box, not the browser's, so it looks different than expected. Several recipes tell her to use it.
- One line closing 3.6 that bridges the practice run to recipe 5.1 and names the rhythm every Part 5 recipe shares.

#### Notes
- Verified against the repo: `_config.yml` lines 9-16, `contact_note`/`description` folded scalars, `icon: favicon.png` (so 5.10's favicon filename is right), `_pages/teaching.md` `</style>` at line 121, `_projects` style blocks at 17-60 and 102-138 with `research-body` at 62-77, `_bibliography/papers.bib` `---` fence on lines 1-2 with the first `@article{` on line 4, `_projects` importance values 1/2/3, `_includes/publication-credits.html` credits map at line 54 of 81, workflow name "Deploy site", single workflow file, `CNAME` contains madisonrittinger.org. Also confirmed via `gh api` that the repo really is public, which Part 2's password warning depends on.
- Every numbered list re-checked for sequential numbering after the edits. Guide is 832 lines.

### 2026-07-29 - MAINTENANCE-GUIDE.md: fourth pass (literal step-by-step for absolute beginners)

#### Added
- **3.6 Practice run: your first edit, start to finish.** A 23-step dry run of a real edit (the homepage `current:` line) from sign-in through green check, cache wait, hard refresh, and restore. Every click named, every step stating its expected result including the ones where success looks like nothing happening. The practice text is a sentence that is also TRUE ("Writing manuscripts and mentoring undergraduates") rather than a visible "test" string, so a visitor who loads the page mid-run sees nothing odd. Flagged from the guide's intro as the thing to do first.
- **3.5 Backing out of an edit you have not saved yet.** The missing escape hatch: an uncommitted browser edit is abandoned by navigating away, and the "Leave site?" warning is the desired outcome, not an error.
- **7.6 Quick diagnosis table.** Symptom -> most likely cause -> section, covering the 10 failure modes a content editor actually hits (green check but no change, no run at all, red X, scrambled page, broken-image icon, orphan upload, duplicate file, missing papers, site down, not in Google).
- "Way 2" file navigation in 3.2: the **Go to file** button, so she can find `papers.bib` or `gallery.md` by name instead of clicking through folders.
- Labeled front-matter diagram in the Part 5 preamble using the real `_pages/about.md` (with an explicit note that the `<-` arrows are guide-only annotations, not file content), plus a third formatting rule (keep the colon and the single space after it).
- Appendix: a small "three sections worth remembering by number" table (3.6 / 3.5 / 7.6).
- TOC now lists every subsection of Parts 3, 4, and 7.

#### Changed
- Recipes 5.1 through 5.12 rewritten from bullet-lists-of-facts into numbered steps, one action per step, each pointing back to the mechanics section it needs (3.2 edit, 3.3 upload, 3.4 create) instead of assuming she remembers them. Expected results stated throughout.
- 3.1 / 3.2 / 3.3 / 3.4 given per-step expected results and exact UI labels ("Username or email address", "Commit message", "Extended description", "choose your files", "Commit directly to the `main` branch"). 3.3 now says to rename the file on the computer BEFORE uploading and warns that a case mismatch (`prof_pic.JPG`) produces a second file instead of a replacement.
- 4.4 (VS Code) now names the Route-B-only trap explicitly: a commit without a push produces no build and no Actions row at all.
- Part 6 expanded per step, with the yellow/green/red states spelled out and the cache wait restated as a do-nothing step.
- 7.1 split into "quick fix" vs "read the log", leading with the reassurance that a failed build publishes nothing.
- 7.2 (universal undo) now uses the **Copy raw file** button or **Raw** view instead of `Ctrl+A` on the formatted file view, which would have grabbed GitHub's page chrome and line numbers along with the file.
- 7.3 turned into numbered re-run steps naming the workflow by its real name (**Deploy site**).
- 5.9 (Teaching) "do not touch" list made concrete: the `<style>` block by its `<style>`/`</style>` boundaries, and the exact line prefixes to leave alone.

#### Fixed
- 5.3 (add a publication) had no mention of the two `---` lines at the top of `_bibliography/papers.bib`. Pasting a new entry "at the very top" as previously worded would have destroyed that required empty front matter and broken the Publications page. The recipe now anchors the paste at the first `@article{` line and calls the `---` lines out as must-keep; 5.12's removal steps carry the same warning.
- 5.8 (research pages) understated the photo swap: each research image's file name appears TWICE per photo (the `<a href>` and the `{% include figure.liquid path=...%}`) and its caption is a third place (`data-title`). The old "change the filename in the body" wording would have left a half-broken tile. Now all three are called out with the real markup shown.
- 5.8 also now documents the `img:` front-matter field (empty in all three files, deliberately) and warns that `_projects/*.md` have their own `<style>` blocks to scroll past.
- 5.4 opening line said "The photo will not appear until you do step 2" while the recipe has 11 steps; reworded to name the two jobs by step range.

#### Notes
- Wording and structure only. No site files, layouts, or styles touched, so this pass cannot change the rendered site. Verified against the live repo contents (`about.md` line 19 for `current:`, the five `_data/socials.yml` keys, the three `_projects` importance values 1/2/3, `Rittinger_2026_CV.pdf`, the `credits` map in `_includes/publication-credits.html`, workflow name "Deploy site"), so every quoted line and file name in the guide matches what she will actually see.
- Guide grew from 452 to 815 lines. That is deliberate per the literal-instructions rule: explicitness outranks brevity here, and the recipes are meant to be jumped into individually, not read start to finish.

### 2026-07-14 - Footer: auto-updating copyright year (client-side)

#### Added
- The footer copyright year now updates to the viewer's current year via a small inline
  script in `_includes/footer.liquid` (added alongside the existing mossy-field script),
  so it stays correct into new years with no rebuild. The Liquid `site.time` year stays as
  the build-time fallback for no-JS visitors. Scoped to the copyright line only; content
  dates (news, publications, CV) are unchanged. Uses the visitor's clock (a wrong-clock
  visitor sees only their own footer off, cosmetically); NTP/server-time was considered
  and rejected as over-engineering for a copyright line (browsers can't speak NTP anyway).

### 2026-07-13 - Docs: use informal "Madi" for person-references in internal documentation

#### Changed
- Adopted a new naming convention for INTERNAL docs only (Trevor's decision): in `CLAUDE.md`, `MAINTENANCE-GUIDE.md`, and this `CHANGELOG.md`, bare person-references to "Madison" (e.g. "Madison asked", "Madison's Google account") are now written informally as "Madi". The rendered site is UNCHANGED and still shows "Madison Rittinger" everywhere.
- Applied via a protected search-replace: converted bare personal "Madison" -> "Madi" while preserving the full formal name "Madison Rittinger", URLs/domains (madisonrittinger.org), and literal config/code values (`first_name: Madison`, `research_gate_profile: Madison-Rittinger`, BibTeX author `Rittinger, Madison A`). Verified no corrupted forms ("Madi Rittinger", "Madi-Rittinger", "first_name Madi") were produced.
- Reworded the name-policy rule in `CLAUDE.md` and house rule #1 in `MAINTENANCE-GUIDE.md` to state the new split explicitly: "Madison Rittinger" on the rendered site and anything public; informal "Madi" allowed in internal maintenance docs; formal-name/URL/config literals stay "Madison" even there.

#### Notes
- Site-content files were deliberately NOT touched: `_pages/*`, `_projects/*`, `_news/*`, `_bibliography/papers.bib`, `_config.yml`, `_data/*.yml`, and the design mockup HTML all keep "Madison" because they render publicly. `TECH-STACK.md` and `_design-reference/README.md` were unchanged (their only "Madison" occurrences are the formal name and the `first_name: Madison` config note).

### 2026-07-13 - MAINTENANCE-GUIDE.md: third pass (plain-language / de-jargon)

#### Changed
- Wording-only pass to remove unexplained jargon for absolute beginners (no meaning or steps changed):
  - 5.2: dropped the term "slug" (undefined web jargon) in favor of "a few words describing the item."
  - 4.4: glossed "stage" inline ("include these files in this save") at the commit step.
  - Part 1: added a one-time plain explanation of "cache" (temporary saved copies of pages) since it underpins the whole "did my change show up yet?" flow and Part 6's "wait out the cache" step.
  - 5.7: rewrote the confusing "if that key exists at all, the icon shows" into plain cause/effect about the `#` that hides the `rss_icon` line; changed "key" to "line."
  - 3.2: replaced "tooltip" with a description of the hover label.

### 2026-07-13 - MAINTENANCE-GUIDE.md: second clarity pass (deeper beginner friction)

#### Fixed
- Part 2: "Both accounts have 2FA" was inaccurate after the Google Search Console row made the table three accounts. Reworded to name GitHub + Cloudflare (and note Madi's Google account should have 2FA too), and clarified GitHub is the only one signed into regularly.

#### Added
- New recipe 5.12 "Remove something (news item, gallery photo, publication)": the guide previously covered add/edit but not delete. Explains the key trap (removing the ENTRY, not just the image file, is what makes a photo/publication disappear), with Route A and Route B delete steps and the exact spans to remove for gallery/bib. Added to the table of contents and two appendix rows (remove-an-item, search-visibility).

#### Changed
- Part 5 formatting note: added the "two zones" mental model (between the `---` lines = settings, after the second `---` = content) and, most importantly, an explicit "indent with the space bar, never Tab" rule - a single Tab in front matter silently breaks the build and is the most common beginner failure.
- 3.2: explained what "main branch" means (the site's one live version, always leave it selected) instead of leaving the term unexplained, and to ignore "Create a new branch."
- 7.1: made reading a failed build more actionable (expand the red-X step, the real error is in the last few lines, look for a filename you recognize).

#### Notes
- Considered and deliberately REJECTED adding a "use GitHub's Preview tab to check your edit" tip: GitHub's markdown preview mis-renders Jekyll front matter and does not reflect the real site design, so it would mislead a beginner. Part 6 (watch the real build, then hard-refresh) remains the single verification path on purpose.

### 2026-07-13 - MAINTENANCE-GUIDE.md: clarity buffs for first-time editors + Search Console

#### Added
- New section 7.5 "The site isn't showing up in a Google search": explains Google Search Console (set up today), that indexing takes days to weeks, the difference between being indexed and ranking, the `site:` check, and that profile backlinks are the main ranking lever.
- Google Search Console row added to the Part 2 accounts table.

#### Changed
- 3.2: added a "finding your way around the file list" tip (folders sort first, underscore-prefixed folders like `_pages` are normal, how to navigate back up).
- 4.4: noted the VS Code "Sync Changes" button shows a count of waiting commits as a sanity check.
- 5.2: clarified that only the date part of the news `date:` line should change; the time and `-0600` stay as-is.
- 5.3: promoted the "paste Google Scholar's BibTeX export" shortcut to the recommended first step of adding a publication; trimmed the now-duplicated mention in the author bullet.
- 7.2: rewrote the restore-a-previous-version steps to be unambiguous click-by-click (open file, History, row below the bad change, ... -> View file, select-all/copy, paste over current, commit), with explicit Ctrl+A/C/V shortcuts.

#### Notes
- Verification pass first confirmed the guide had NO factual inaccuracies against the current repo (checked `about.md` front matter fields, news pattern, `cv_pdf`, the `publication-credits.html` credits map, `_projects` front matter, the "Deploy site" workflow name, and the Cloudflare DNS records). All six edits are additive clarity/coverage improvements, not corrections.

### 2026-07-13 - SEO: enable Open Graph, Schema.org, and social preview image

#### Changed
- `_config.yml`: `serve_og_meta` false -> true (adds Open Graph meta tags to every page head, so links shared to social/Slack/iMessage get a title, description, and image preview), `serve_schema_org` false -> true (adds Schema.org JSON-LD structured data, which helps Google understand the site is an academic Person profile), and `og_image` set to `/assets/img/prof_pic.jpg` as the site-wide default link-preview image.

#### Fixed
- `og_image` changed from a relative path (`/assets/img/prof_pic.jpg`) to an absolute URL (`https://madisonrittinger.org/assets/img/prof_pic.jpg`). The al-folio head template emits `og_image` verbatim without prepending `site.url`, and the Open Graph spec requires an absolute URL; a relative one causes Facebook/LinkedIn/Slack/iMessage to render link previews with no image.

#### Notes
- Correction to the note below: the site turned out to be ALREADY indexed. Search Console URL Inspection on the homepage returned "URL is on Google / Page is indexed" immediately after verification. The empty `site:` result came from a stale/limited search index, not from the site being absent. Domain verified via Cloudflare's one-click DNS integration; sitemap submitted; re-indexing requested to pick up the new OG/Schema tags. The real gap is ranking (other profiles outrank the site for her name), which is a backlinks-and-time problem, not an indexing one.
- Also stale in CLAUDE.md: `_data/socials.yml` is fully populated with real values (ORCID 0000-0001-6326-1572, Scholar FAzQaf4AAAAJ, ResearchGate Madison-Rittinger, LinkedIn madison-rittinger-5a12711b8), and the JSON-LD `sameAs` block already links all four. Not placeholders.
- Original (now-corrected) diagnosis: the site is not yet indexed at all (`site:madisonrittinger.org` returns zero results). The single highest-impact fix is owner-only and cannot be done from the repo: verify the domain in Google Search Console (Madi's Google login) and submit `https://madisonrittinger.org/sitemap.xml`, then use "Request indexing" on the homepage. Config fields `google_site_verification` + `enable_google_verification` are staged for the verification meta-tag ID once she has it. Sitemap and robots.txt were already valid and open; those were not the blocker.

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
- `MAINTENANCE-GUIDE.md` (repo root): the comprehensive self-maintenance guide for Madi, written for absolute beginners and designed to work with zero outside help ("in case Trevor gets hit by a bus"). Covers: how the publish pipeline works in plain language; the GitHub and Cloudflare accounts (with a hard warning never to commit passwords to this public repo); Route A browser-only editing (sign-in, pencil edit, file upload, new file); Route B VS Code setup per OS (Windows primary, Mac included) plus the pull-edit-commit-push routine; step-by-step recipes for every content type (Currently status, news, publications incl. thumbnails and the photographer-credit map, gallery, CV, bio, socials, research pages, teaching page with its layout warnings, profile pic/favicon, contact note); build monitoring and the cache window; failure recovery (red builds, per-file restore from History, stuck-deploy re-run, site-down triage); Cloudflare domain renewal and the exact DNS record table; house rules; and a file-map cheat sheet. Every recipe was verified against the actual files before writing.
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
- `_config.yml` `external_sources` block (al-folio demo feeds): it was generating LIVE demo blog posts on the site - an al-folio Medium post and a Google Gemini marketing article at `/blog/2024/google-gemini-updates.../` - plus orphan tag/category archive pages, all indexed in the sitemap. Nothing on the site linked to them (the /blog/ index itself was already 404), but search engines would have crawled them under Madi's name.
- Footer "Photos from Unsplash" credit (theme default in `footer_text`): her photos are her own, individually credited in-page.

#### Changed
- Favicon emoji: theme-default atom to a spider (`icon:` in `_config.yml`).
- Favicon again (same day, Trevor's call): now Madi's headshot instead of the spider emoji. Added `assets/img/favicon.png` (192px square face crop of `prof_pic.jpg`, crop region 266,220,640x640, generated via System.Drawing) and set `icon: favicon.png`. The theme treats any `icon:` value longer than 4 characters as a filename in `/assets/img/` (gem `head.liquid`). To update later: replace `favicon.png` in place with any square image.

### 2026-07-11 - CV update (v7) + teaching page reconcile

#### Changed
- `assets/pdf/Rittinger_2026_CV.pdf`: replaced with Madi's latest CV (from `Rittinger_2026_CV (7).pdf`). Filename unchanged, so `cv_pdf` in `_pages/cv.md` and the download/preview both pick it up with no further edits.
- `_pages/teaching.md`: added "Statistics Tutor (Ohio Dominican University)" to the "Earlier teaching" summary line so it matches the CV's Teaching Experience section, which lists it (2014). The rest of the Courses section was already word-for-word in sync with the CV.
- `_pages/teaching.md`: reconciled the mentoring counts to the CV (Trevor-approved, "site matches CV" rule). Undergraduate researchers 18 -> 20 (CV: 8 at UWM Arthropod Behavior Lab + 12 at ISU Wren Lab). High school students 16 -> 10 (CV Mentorship: "ten different students" across seven Mentor Matching Engine projects; note this LOWERED the site's figure). The qualitative sentence (four future coauthors, one presented at local conferences) was left as-is; those specifics aren't in the CV and don't conflict with it.

#### Notes
- Publication title now matches: the v7 CV lists the 2025 Biology Letters paper as "Instinct to insight: a variation-based framework to test hypotheses about how animals solve problems," identical to `_bibliography/papers.bib` (`rittinger2025instinct`, DOI 10.1098/rsbl.2025.0293). The v6 CV's "Parsing insight from instinct" wording was corrected by Madi; no change needed to the bib.
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
- Ordering choice: newest-first (Madi), matching the Publications page. Sort key is `year`; photos within the same year group together in a deterministic (if not list-exact) order. Finer within-year control would need a full date field, not added since only the year is shown.

#### Fixed
- `_config.yml` `contact_note`: replaced the leftover al-folio placeholder ("You can even add a little note about which of these is the best way to reach you.", which was rendering live under the homepage social icons) with Madi's real note: "The best way to reach me is by email. I welcome inquiries about research and potential collaborations." Renders centered under the email/ORCID/Scholar/ResearchGate/LinkedIn icons via the existing `.contact-note` slot in `_layouts/about.liquid`.

### 2026-07-10 - Gallery: captions cleaned up from Madi's image titles

#### Changed
- `_pages/gallery.md`: updated lightbox captions to match the descriptions in Madi's source image filenames. No new images: all seven provided files already exist in the gallery (six are byte-identical to the current assets; the seventh, a HEIC named for the undergrads in it, is the same photo as the existing "Hunting for spiders" tile). Per Madi's rule, existing photos just get their descriptions cleaned up.
  - "Mackinaw Nature Preserve, 2020" -> "Paige Duncan, M.S., and I at Mackinaw Nature Preserve, 2020"
  - "Running transects, May 2025" -> "Helping Mish with transects, 2025"
  - "Painting clay models, 2025" -> "Helping Mish paint clay models, 2025"
  - "Animal Behavior Society meeting, 2025" -> "Animal Behavior Society (ABS), 2025" (title was "ABS 2025"; expanded the acronym, dropped the not-in-title word "meeting")
  - "Hunting for spiders, 2022" -> "Undergraduate researchers Ben Mueller and Kristen Lindemann, 2022"
  - Unchanged: the *Pholcus phalangioides* (2022) and *Frontinella communis* web (2025) captions were already the correct full italic binomials (the filenames use abbreviated/typo'd forms).

#### Notes
- No photographer credits added: none of these seven filenames name a photographer (they are Madi's own field/lab photos), consistent with the Gallery's existing species/description-only caption style.

### 2026-07-10 - Teaching page: Courses section reconciled with the CV

#### Fixed
- `_pages/teaching.md`: made the Courses list match Madi's CV (`Rittinger_2026_CV.pdf`) instead of paraphrased/invented content. Changes:
  - Guest Lecturer dates now match the CV exactly: "Ecology (Spring 2024, Fall 2024, Fall 2025) and Behavioral Ecology (Spring 2023)" (was the vague "Ecology (2024-2025) and Behavioral Ecology (2023)").
  - Replaced the invented "Earlier teaching includes ... at UW-Milwaukee and Illinois State University" summary (which mis-lumped institutions and omitted the ISU General Ecology Lab) with an accurate line: Human Anatomy and Physiology Lab (UW-Milwaukee); Invertebrate Zoology Lab, General Ecology Lab, Biostatistics Lab, and Introduction to Biology Lab (Illinois State University).
  - Added the CV's course descriptions for the two MIAD instructor-of-record courses (Animal Behavior, Patterns in Nature), which the site had omitted.
  - Guest Lecturer / General Ecology Lab wording brought in line with the CV ("the role of hormones in behavior"; "survivorship in humans"; "new laboratory exercises").
  - Kept "See my CV for a full list" (the ODU Statistics Tutor and per-term dates for earlier labs remain CV-only). Verified rendering at 1280px.

### 2026-07-10 - Publications page: credits moved onto the photo

#### Changed
- `_pages/publications.md`: the photographer credit now sits ON each thumbnail (bottom) as a soft gradient-scrim overlay (cream Lexend over a moss-dark fade, inset inside the 3px orange frame with matching rounded bottom corners), instead of a plain caption beneath the tile (Madi's request for a classier, professional look). Same matching/degradation as before: the script wraps each credited `img.preview` in a `.pub-thumb` and lays a `.pub-credit-overlay` on it; no JS -> no overlay, thumbnails unaffected. The composite manuscript figure still gets no credit. Verified at 1280px and narrow width.
- Follow-up: credit text left-aligned to sit in the bottom-LEFT corner (Madi's preference), the standard editorial photo-credit placement, rather than centered on the scrim.

### 2026-07-10 - Publications page: updated thumbnails + photographer credits

#### Changed
- Replaced all four publication preview thumbnails with Madi's chosen images (converted from source JPG/PNG/TIF to JPG, resized to 1000-1200px long edge at q88, keeping the existing filenames so no `.bib` edits were needed): `treefrog.jpg` (gray treefrogs in amplexus), `web-spider.jpg` (cellar spider), `instinct-insight.jpg` (the 4-panel Innate/Previously-learned/Learned-de-novo/Insightful manuscript figure), `songbird-nestling.jpg` (male house wren).

#### Added (photographer credits)
- `_pages/publications.md`: a small credit caption now sits under each thumbnail: "Photo: Höbel Lab" (treefrogs), "Photo: Mark Yokoyama" (spider), "Photo: Dr. Rachael DiSciullo" (house wren). The instinct-to-insight figure is a composite manuscript figure with no single photographer, so it gets no credit.
- Implementation note: al-folio's `bib.liquid` (in the al_folio_core gem) renders the `preview` image but has no photo-credit field, and a full local override of that 150-line layout would risk drifting from the gem on upgrades. So the credits are added by a small script IN `publications.md` that matches each `img.preview` by filename and inserts a `.pub-credit` caption. Degrades gracefully (no JS -> thumbnails still render, just no caption). To change a credit, edit the `credits` map in the page; omit a filename for no credit. Verified at 1280px and 390px.

#### Changed
- `_pages/publications.md`: the subtitle under the heading now reads "Happy to forward pdf's upon request" (was "Peer-reviewed papers, preprints, and work in progress."). This is the page `description`, so it also serves as the page's meta/social description.

### 2026-07-10 - Teaching page: copy tweaks

#### Changed
- `_pages/teaching.md`: Courses section reads "See my CV for a full list" instead of "See the CV for a full list" (Madi's wording).
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
- Six new images (Madi's own photos), converted from source JPGs via .NET System.Drawing to 1600px long edge at q85:
  - Decisions (all *Pholcus phalangioides*, 2023): `research-decisions-adult-can.jpg` (adult on a can rim), `research-decisions-vial.jpg` (in a lab vial), `research-decisions-spiderlings.jpg` (mother with a spiderling brood). All three source files were distinct shots despite similar names.
  - Navigation: `research-navigation-web.jpg` (*Frontinella communis* web, 2024), `research-navigation-tetragnathid-branch.jpg` and `research-navigation-tetragnathid-twig.jpg` (Tetragnathid sp., Saukville WI, 2026; two distinct shots).

#### Decided (attribution)
- These six are Madi's OWN photos, so per Madi (2026-07-10) they carry NO photographer line: species + year lightbox caption only (italic binomial, matching the Gallery page's caption voice), and no `Photos: ...` credit line under the grid. The "credit the photographer on all images" standard still holds; it just resolves to no line when the photographer is Madi herself. Contrast the nestlings page, whose photos are Dr. Rachael DiSciullo's and are credited.

#### Removed
- `assets/img/research-decisions.jpg` and `assets/img/research-navigation.jpg` (the old single representative photos): now orphaned, replaced by the new named files above. Confirmed no remaining page references before deleting.

#### Notes
- Duplication smell (future refactor, not done): the `.research-photos` tile CSS + the full GLightbox CSS/JS block are now copied inline across three research pages and `_pages/gallery.md`. Faithful to the existing per-page-inline convention, but a shared `_includes/` partial for the GLightbox setup would remove ~4 copies if maintenance ever bites.

### 2026-07-10 - Nestlings research page: gallery-style photos + wide text

#### Added
- `_projects/individual-personality.md` (hatching patterns / house wrens): three house wren photos by Dr. Rachael DiSciullo added at the bottom of the page, replacing the previous no-photo state. Multi-photo research pages are the new standard going forward (Madi, 2026-07-10): as photos are provided, each page gets its set at the bottom rather than a single representative image.
- `assets/img/research-nestlings-nestbox.jpg`, `research-nestlings-branch-a.jpg`, `research-nestlings-branch-b.jpg`: converted from Madi's source TIFFs (one was 198 MB) via .NET System.Drawing, resized to 1600px long edge at JPEG q85 (~190 KB each). The two "sits on branch" source files looked like duplicates by dimension (exactly 2x) but are distinct photographs (bird faces left vs right, different perch/background); both kept.

#### Layout (gallery method + wide text)
- Photos use the GALLERY METHOD (Madi, 2026-07-10: "same size method as the gallery photos"): `.research-photos` is a responsive grid of equal SQUARE tiles (`grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`, `aspect-ratio: 1/1`, `object-fit: cover`, orange frame, hover zoom) that mirrors `_pages/gallery.md`. Clicking a tile opens the same GLightbox slider (loop, prev/next, Mossy-palette caption) showing the FULL uncropped image with its caption, so the square tile crop never permanently hides the photo. GLightbox CSS/JS + caption styling replicated inline from the Gallery page.
- Iteration history (same session, none shipped before this): started as a 4:3-cropped row of three, then a full-view natural-ratio mosaic (7fr:9fr portrait + stacked landscapes), then this gallery-tile version per Madi's request to match the gallery sizing.
- Text now spans the FULL content width (`.research-body { max-width: 100% }`, was 42-44rem), so the short prose reads WIDE rather than as a tall narrow column (Madi, 2026-07-10: "extend the text horizontally rather than vertically"). Title, text, and photo grid all share the same left/right edges.

#### Added (photographer credits)
- Every image is credited (standard set Madi, 2026-07-10: credit the photographer on ALL images). Credit shows in the GLightbox caption per image (`data-title`), plus a visible `Photos: Dr. Rachael DiSciullo` line under the grid. A `.research-hint` line ("Select any image to view it full-size") signals the tiles are clickable, matching the Gallery page's `.gallery-hint`.

#### Notes
- Retro-credit / gallery-method TODO: DONE same day. Both `comparative-cognition.md` and `decision-making-under-uncertainty.md` moved to this gallery-tile treatment (see the entry above); their photos are Madi's own, so no photographer line.

### 2026-07-09 - Research question pages: photos moved to the bottom

#### Changed
- `_projects/comparative-cognition.md` and `_projects/decision-making-under-uncertainty.md`: the representative photo moved from a floated inline inset to a block at the BOTTOM of the page, below the text (Madi's preference: research photos sit tastefully after the prose, not wrapped inline). Left-aligned, orange 4:3 frame unchanged, `max-width: 34rem`, `margin-top: 2.75rem` for clean separation from the text. This also fills the previously-empty lower half of these short pages. Convention going forward: any future research-page photo goes at the bottom in this pattern (documented in each page's comment).
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
- `_news/2026-07-06-abs-2026.md` -> `_news/2026-07-17-abs-2026.md`: the news row's date now reads Jul 17, 2026 (the date of Madi's ABS talk, per Madi) instead of the date the item was posted, and the text is the plain fact without a redundant date: "Presenting at the Animal Behavior Society (ABS) conference." Convention going forward: date news items by the event they announce, not the posting day.

### 2026-07-09 - Teaching/Mentoring page: article-style photo insets (Madi-approved)

#### Changed
- `_pages/teaching.md`: full editorial redesign of the photo treatment. The 3-tile mentoring photo row under the page title is gone; each photo now lives inside its section as a floated inset the text wraps around, news-article style. Kenzie Dasek -> Teaching philosophy (right), Spider Squad -> Courses (left), Ellie Wheeler -> Mentoring philosophy (right). Orange frames, 4:3 crop, and visible captions unchanged; images still go through figure.liquid for responsive WebP.
- Courses title placement (Madi): the Spider Squad figure precedes the h2 in source, so "Courses" renders beside the photo directly above "See the CV for a full list.", capping its own text column.
- Uniform text columns (Trevor, after resize testing): every paragraph reserves the photo's width + 1.75rem gutter on the photo's side (margin-right for sections 1/3, margin-left for Courses p + h2), so all lines in a section share one edge at every viewport width; text never snaps to full width mid-section. Trade-off accepted: text no longer flows under photos, so a text-heavy section shows open background under its photo on narrow windows.
- Each section sits in a `.mentoring-section` flow-root wrapper (floats can't bleed across sections); first wrapper gets `margin-top: 2.75rem` so the title-to-first-section gap matches the ~5.5rem section rhythm.
- Mobile (<=640px): photos stack full-width/centered and the reserved column margins release. The Courses section becomes a flex column with `order` so the heading renders before its photo (in source the photo is first; stacked naively it read as the previous section's image).

#### Removed
- `_pages/teaching.md`: the `.mossy-section` centered dividers, same day they were added (Madi's call after seeing them with the insets). Homepage and /outreach KEEP their dividers; only this page dropped them.

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
- A full "article-style" homepage experiment (portrait floated right with text wrap, justified bio, panel sized by aspect ratio) was built, previewed, and REJECTED by Madi the same day; rolled back before commit. The publication-site feel comes from list rhythm only (these hairlines), not from restructuring the hero. Do not reintroduce the float layout.

### 2026-07-09 - Homepage divider bars centered and widened

#### Changed
- `_sass/_mossy.scss`: the citrine section divider bars above "News" and "Selected Publications" (`.mossy-section::before`) are now horizontally centered (`left: 50%` + `translateX(-50%)`) instead of left-hung, and widened 20%: desktop `calc(55% + 0.25rem)` -> `calc(66% + 0.3rem)`, mobile 52px -> 62px. The original left position was tied to the hero's left axis / portrait gutter; that alignment rationale no longer applies and the comment was updated.

### 2026-07-09 - Research question pages: representative photo under each title

#### Added
- `_projects/comparative-cognition.md` ("How do web spiders navigate?") and `_projects/decision-making-under-uncertainty.md` ("How do spiders make decisions involved in prey capture?"): a single pastel-orange-framed 4:3 photo directly under the title, matching the hero/mentoring frame (3px `#feac74` border, 6px radius, `object-fit: cover`). Left-aligned, `max-width: 32rem`. Images `assets/img/research-navigation.jpg` (navigation page) and `assets/img/research-decisions.jpg` (decisions page), copied from Madi's source JPGs. Routed through `figure.liquid` so the live build produces responsive WebP. Scoped `.research-photo` style block is inline in each page.

### 2026-07-09 - Homepage section dividers + animated "Currently" dot

#### Added
- `_layouts/about.liquid` + `_sass/_mossy.scss`: a short citrine "tick" divider above the homepage "News" and "Selected Publications" headings (new `.mossy-section` class on those two `<h2>`s). Left-aligned, echoing the research-card top accent and the hero's left axis; it marks each section's start rather than drawing a full-width rule. Width is `calc(55% + 0.25rem)` so it reaches toward (but stops ~0.875rem short of) the hero portrait's left edge, derived from the hero's 1.1fr/0.9fr grid + 2.5rem gap so it tracks that alignment as the viewport changes. On mobile (<=768px, hero single-column) it falls back to a 52px accent.
- `_sass/_mossy.scss`: the pastel-orange "Currently" status dot now continuously pulses. A `::after` radial-gradient aura scales between 1.05x and 1.3x (opacity 0.8->1) on a `1.9s linear infinite` loop. `linear` (not ease-in-out) keeps it moving at a constant rate so it reads as continuous breathing, not a quick pulse with dead time. The core also got a radial gradient (`#ffcf9c` highlight -> `#feac74` -> `#e08e56` rim) for orb-like depth instead of a flat disc.

#### Decided
- No `prefers-reduced-motion` guard on the Currently pulse: the motion is a tiny 1.05->1.3 scale on a soft 12px aura, judged subtle enough to keep for all visitors (Trevor's call). A guard was trialed and removed; the code comment notes to reinstate one if the effect is ever made larger/faster. NOTE for whoever tests this: the pulse will NOT appear if your OS has "reduce motion" enabled in a build that still has the guard; Trevor's Windows "Animation effects" is off, which is why early tuning looked static until the guard was dropped.

### 2026-07-09 - Content additions + sitewide capitalization and color polish

Continuation of the 2026-07-08 session (after the orange-titles experiment below was rolled back). All previewed on the local dev server (headless-Edge screenshots + pixel sampling) before commit.

#### Added
- `_projects/individual-personality.md`: attribution sentence noting the house-wren work was Madi's Master's thesis in collaboration with the Avian Ecology Lab at Illinois State University, and made "Avian Ecology Lab" a hyperlink to https://about.illinoisstate.edu/wrens/research/ (al-folio auto-adds `target="_blank" rel="external nofollow noopener"`; the link inherits the citrine `--global-theme-color`, matching the highlighted nav tab).
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

### 2026-07-08 - Teaching/Mentoring: strip paraphrased course descriptions (from Madi)

#### Changed
- `_pages/teaching.md` Courses section: removed the two one-line course summaries under **Animal Behavior** ("A foundation in animal behavior, applied through an independent research project.") and **Patterns in Nature** ("Hands-on experience with the scientific method, problem solving, and critical thinking."). Madi flagged these as not her own words - they were Claude's condensations of her CV goal sentences. Added an italic "See the CV for a full list." pointer at the top of the section (per her suggestion) and dropped the now-redundant "A full list is in the CV" sentence that closed the section. Kept the factual role/topic details on General Ecology Lab and Guest Lecturer (verbatim from her CV, not paraphrased). Course names, institutions, and dates unchanged.

### 2026-07-06 - Currently status + first real news item (from Madi)

#### Changed
- `_pages/about.md` hero `current:` -> "Analyzing data and writing manuscripts" (Madi's wording; she asked for no timeline on it since it is, well, currently). Replaces the placeholder "Field collections + behavior trials, summer 2026".

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
- `_pages/teaching.md`: the closing Mentoring paragraph "In 2025 I received UW-Milwaukee's Graduate Student Mentorship Award, nominated by my undergraduate researchers." (This was the one sentence Claude had appended to Madi's verbatim mentoring text on 2026-07-02; her page is now 100% her own words.) The award itself still lives in the CV under Awards and Honors (`_data/cv.yml`), untouched.

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
- Grasshopper (cricket-adjacent) removed; SPIDERS added instead: orb-weavers hanging head-down from silk draglines anchored above the top viewport edge (reads as anchored, not cut off). On-brand for Madi's web-spider research.
- Dragonflies kept (they were a hit): now a configurable flock with varied sizes/rotations and simple overlap avoidance; the perched damselfly appears whenever at least one dragonfly is present and rides the dragonfly sliders.
- Control panel rebuilt into three groups - Grass, Dragonflies, Spiders - each with its own sliders: Grass = height / opacity / amount; Dragonflies and Spiders = count (0-6) / size / opacity, with live value readouts. Tone selector dropped (moss tone fixed); Regenerate and Light/dark kept.

#### Notes
- Assessment artifact only; nothing on the live site changes until the direction is approved, at which point the same generator approach ports into `_sass/_mossy.scss` + a small script (same pattern as `genweb.js`).
- Verified via headless-Edge screenshots: defaults, both themes, and a maxed stress test (grass 0.50, six dragonflies + six spiders at 2x size, high opacity) show no clipped blades or partial figures.

### 2026-07-02 - Commit the tech-stack reference doc

#### Added
- `TECH-STACK.md`: a repo tech inventory (versions pulled from the actual config files on 2026-06-24) that pairs with CLAUDE.md. Existed locally but was never committed; now tracked.

### 2026-07-02 - Load Madi's real content (mentoring + 3 research questions)

#### Changed
- Replaced the AI-drafted research descriptions and the paraphrased mentoring section with Madi's own verbatim text, supplied in her "Information for the website" doc. Wording copied exactly; only titles, frontmatter descriptions, and markdown wrapping were touched.
  - `_projects/decision-making-under-uncertainty.md`: title -> "How do spiders make decisions involved in prey capture?"; body swapped to Madi's verbatim description. Removed the fabricated *Biology Letters* (2025) / *Scientific Reports* (2024) citations from the old draft.
  - `_projects/comparative-cognition.md`: retitled from the miniaturization framing to "How do web spiders navigate?" to match Madi's Q2; body swapped to her verbatim navigation description. (Old title/body were about brain-size/miniaturization; her doc scopes this question to navigation.)
  - `_projects/individual-personality.md`: title -> "How do hatching patterns impact nestling development?"; body swapped to her verbatim description. Stays `category: past` (she noted this question is no longer active).
  - Each project's frontmatter `description` set to Madi's keyword line for that question.
  - `_pages/teaching.md` Mentoring section: replaced the paraphrase (which had different mentee counts) with her verbatim three paragraphs (18 undergraduates, 4 future coauthors, 1 conference presenter, 16 high-school students via the Mentor Matching Engine). Kept the 2025 Graduate Student Mentorship Award sentence appended (accurate, not in her doc).

#### Notes
- Per-instance exception: em-dashes allowed in Madi's own content for this pass (none appeared in the supplied text). The no-em-dash rule still holds for everything Trevor/Claude authors.
- Project TITLES now name spiders, overriding the earlier taxon-agnostic-titles design note; Trevor chose Madi's exact question phrasings for coherence with the new bodies.
- Teaching philosophy (`_pages/teaching.md`) and bio (`_pages/about.md`) already matched the doc verbatim; left unchanged.
- One typo fix approved by Trevor: "various brains sizes" -> "various brain sizes" in the prey-capture description. "will be coauthor" (singular) is intentional (they will each be coauthor on one paper) and was left as written.

### 2026-06-30 - Single font sitewide: Lexend everywhere

#### Changed
- Collapsed the three-font system (Lora serif headings + Lexend sans body + JetBrains Mono labels) to a single sitewide font: **Lexend**, at Madi's request. Hierarchy is now carried by weight/size/letter-spacing rather than switching families.
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
- New approach (chosen by Madi): full-bleed portrait. The image now fills the panel (`width/height: 100%`, `object-fit: cover`) and the orange shows only as a slim even 8px frame. Panel keeps equal height with the text column on desktop; on mobile the portrait falls back to its own `4 / 5` aspect ratio so it can't collapse.
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
- `_sass/_mossy.scss`: removed the flat `Npx Npx 0` offset shadows that dropped a solid colored slab behind images (Madi found them goofy).
  - Hero portrait (`.mossy-hero__panel img`): dropped `box-shadow: 8px 8px 0 $moss-shadow`.
  - Publication thumbnails (`.publications .preview`): dropped `box-shadow: 5px 5px 0 ...` and trimmed the now-unused `box-shadow` transition.
  - Removed the now-unused `$moss-shadow` brand constant.
- Left untouched: the "Currently" dot's soft glow halo and the subtle card hover-lift (not behind images, not the slab effect).

#### Decided
- The offset moss shadow is no longer a design signature. CLAUDE.md Mossy spec updated to reflect the removal.

### 2026-06-28 - Gallery: per-photo blurbs + integrate Madi's new images

#### Added
- Five new gallery images imported to `assets/img/` (kebab-renamed from Madi's Drive export): `gallery-abs-2025.jpg`, `gallery-f-communis-2025.jpg`, `gallery-clay-models-2025.jpg`, `gallery-transects-2025.jpg`, `gallery-p-phalangioides-2022.jpg`.
- Per-photo blurb method on the gallery: each tile now carries `data-title` + `data-description`, shown beneath the full image in the GLightbox lightbox (preserves the clean Google-Photos grid; no visible-caption clutter). Blurb text is currently PLACEHOLDER, awaiting Madi's real captions.

#### Changed
- `_pages/gallery.md`: rebuilt the tile set. Now 6 photos (Paige fieldwork, transects, P. phalangioides, F. communis, clay models, ABS) plus the existing spider-hunting tile.
- Header comment updated to document the `data-title`/`data-description` blurb workflow for runbook 04.

#### Removed
- Dropped the `gallery-spider-squad-2023.jpg` tile from the gallery. It is the same photo as Madi's `mentoring - Ellie Wheeler, Ava Mueller, Sage DeLong, and me 2023`; it belongs on the mentoring page, not the gallery. (File retained in `assets/img/` for reuse on the teaching/mentoring page.)

#### Notes
- Verified by eye that `gallery-paige-fieldwork.jpg` is identical to Madi's new "Paige Duncan...Mackinaw 2020" export, so the existing file is reused (no duplicate import).
- `gallery-spider-hunting-2022.jpg` (3 students searching logs) is not in Madi's new set and has no blurb yet; kept in place pending a caption or a decision to retire it.

### 2026-06-28 - Publications: real preview images replace placeholder cards

#### Changed
- Replaced all four placeholder preview cards in `assets/img/publication_preview/` with Madi's real images, one per paper:
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
- Chose the framing by rendering the candidate crops (3:4 current, 5:6, 9:10, 1:1) with System.Drawing, reproducing exactly what `object-fit: cover` + `object-position` would paint, and comparing them. 5:6 was the smallest change that fixed the float while keeping the portrait shape. Image file is untouched; this is CSS-only, so it is trivially reversible/swappable to a tighter crop (9:10 or 1:1) if Madi prefers.

#### Decided
- The homepage bio in `_pages/about.md` is now Madi's FINAL bio (no longer a placeholder). CLAUDE.md content tracker updated to match.
- Sanctioned a single exception to the no-em-dash project rule: the bio's "...my cat — Ollie" keeps its em-dash at Madi's request. The rule still holds everywhere else. Documented in CLAUDE.md hard rules.

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
- `assets/img/publication_preview/`: four Mossy-colored square PLACEHOLDER PNGs (600x600), one per paper: `instinct-insight.png`, `web-spider.png`, `treefrog.png`, `songbird-nestling.png`. Madi replaces each in place (same filename) with a real paper figure or field photo; square sources >=600px work best.
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
- GLightbox 3.3.1 loaded from jsdelivr with SRI integrity hashes (matches the theme's CDN convention; permitted by the theme's permissive CSP). Grid CSS is page-scoped inline `<style>` to stay self-contained. Lightbox captions go in each tile anchor's `data-title` (blank for now, pending Madi's captions).
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
- `assets/pdf/example_pdf.pdf`: al-folio demo file, unreferenced anywhere. The real CV PDF (`Rittinger_2026_CV.pdf`) was already present and wired in `_pages/cv.md`; confirmed Madi's Downloads copy is byte-identical, so no PDF update needed.

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
- `assets/img/gallery-paige-fieldwork.jpg`, `gallery-spider-hunting-2022.jpg`, `gallery-spider-squad-2023.jpg`: Madi's first three field photos (originals; the live build generates responsive WebP via imagemagick).
- `_pages/gallery.md`: replaced the "coming soon" placeholder with a responsive 3-across grid (stacks on mobile) of the three photos.

#### Notes
- Captions are intentionally blank (`title=""`) for now; Madi to supply them later.

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
- `_data/socials.yml`: switched the email social link from `mrittinger44@gmail.com` to her UWM academic address `ritting2@uwm.edu` (the same one already in `_data/cv.yml`). Interim choice until Madi says otherwise. RSS icon remains off; other social links still placeholder.

### 2026-06-22 - Real teaching philosophy

#### Changed
- `_pages/teaching.md`: replaced the DRAFT teaching philosophy with Madi's final text (provided verbatim).

### 2026-06-22 - Real bio paragraph

#### Changed
- `_pages/about.md`: replaced the placeholder bio with Madi's final text (provided verbatim). Note: contains one em-dash ("my cat — Ollie") kept at Madi's/Trevor's explicit request, a deliberate exception to the repo no-em-dash rule for author-provided content.

### 2026-06-22 - Remove redundant hero photo caption

#### Removed
- `_pages/about.md`: the `profile.more_info` caption under the portrait. It repeated the department + university already shown in the eyebrow subtitle, and the email is already in the contact/social section. Photo panel now holds just the portrait.

### 2026-06-22 - Enlarge homepage portrait

#### Changed
- Hero portrait felt small against the now-wider page. `_sass/_mossy.scss`: portrait `max-width` 270px -> 360px and `width` 78% -> 88%; hero panel `min-height` 320px -> 400px to stay proportional. `_layouts/about.liquid`: responsive-image `sizes` hint 280px/80vw -> 360px/85vw so a sharp enough source loads.

### 2026-06-22 - Widen sitewide content column

#### Changed
- `_config.yml`: `max_width` 930px -> 1200px. Feedback from Madi: content sat in a narrow center column with large empty margins on wider screens. The whole site reads this single value (`assets/css/main.scss` line 17 -> `$max-content-width`), so every page widens uniformly. Easy to tune later.

### 2026-06-22 - Scrub Einstein/demo content; rebuild placeholders from CV

#### Removed
- Einstein/al-folio demo content: `assets/json/resume.json`, `assets/html/relativity.html`, `assets/plotly/demo.html`, `_data/citations.yml` (4,180-line Einstein Scholar dump), and the two demo course pages in `_teachings/` ("Prof. Example"). Cleared demo data from `_data/coauthors.yml`, `_data/venues.yml`, `_data/repositories.yml`.
- `_config.yml`: removed the JSON-resume pipeline (`jekyll_get_json` + `jsonresume`), now that the CV renders from `_data/cv.yml` (RenderCV).

#### Changed
- Research projects (`_projects/`) rewritten from Madi's real publications, with corrected categories (the miniaturization/dissertation work was wrongly marked "past"): problem-solving/insight in spiders (current), miniaturization and cognition (current), avian early-life physiology (past).
- `_pages/teaching.md`: real courses, mentoring record, and a draft teaching philosophy.
- `_pages/outreach.md`: real outreach/service activities.
- `_pages/gallery.md`: cleaner "coming soon" placeholder.

#### Notes
- Interpretive prose (research narratives, teaching philosophy) is marked DRAFT in-file for Madi to confirm; factual lists are from her CV. Still placeholder: bio, social links (ORCID/Scholar), gallery photos.

### 2026-06-22 - CV upgraded to native structured page

#### Changed
- `/cv/` is now a fully structured, on-theme CV instead of an embedded PDF. Replaced the demo `_data/cv.yml` (Albert Einstein) with Madi's complete CV in RenderCV format: Education, Peer-Reviewed Publications, Manuscripts in Review, Manuscripts in Preparation, Research Experience, Presentations, Teaching Experience, Professional Development, Mentorship, Grants and Fellowships, Awards and Honors, Service.
- `_pages/cv.md`: back to `layout: cv` with `cv_format: rendercv`; keeps the PDF download icon (`cv_pdf`). Dropped the iframe embed.
- `_sass/_mossy.scss`: styled the CV cards and retinted the date badges (default red "danger" color) to citrine.

#### Notes
- Transcribed from `assets/pdf/Rittinger_2026_CV.pdf`; phone number intentionally omitted from the web version (still in the downloadable PDF), email kept. No em-dashes (verified on the rendered page).
- Demo `assets/json/resume.json` (Einstein, jsonresume) is now doubly unused; safe to delete later.

### 2026-06-22 - First real content: publications + CV

#### Added
- `_bibliography/papers.bib`: replaced the placeholder with Madi's 4 real publications (2022 GCE, 2024 Sci Reports, 2025 Biology Letters, 2026 Behav Ecol Sociobiol). The two recent first-author papers are flagged `selected={true}` so they feature on the homepage.
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
- `_pages/about.md`: `current:` front-matter field driving the Currently element (Madi updates this 3-6x/year). PLACEHOLDER text for now.
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
- Identity, navigation, content placeholders, and Madi's headshot all live
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
