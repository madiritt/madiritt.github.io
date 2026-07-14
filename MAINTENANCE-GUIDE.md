# Website Maintenance Guide

**For: Madison Rittinger (and anyone helping her)**
**Site: https://madisonrittinger.org**
**Written: July 2026. If something in here doesn't match what you see on screen, the site may have changed since; the ideas will still be right even if a button moved.**

This guide assumes you have never edited a website before. It explains everything: what the site is made of, how to sign in, how to change things, and how to fix mistakes. Read Part 1 once so the rest makes sense. After that, jump straight to the recipe you need in Part 5. Ctrl+F (Cmd+F on Mac) is your friend.

**If you only remember one thing:** you cannot permanently break this site. Every change ever made is saved forever in the history, and Part 7 shows you how to roll anything back.

---

## Table of contents

- Part 1: How the site works (read once)
- Part 2: Accounts you need
- Part 3: Route A - editing in the web browser (no installs)
- Part 4: Route B - editing with VS Code (for bigger jobs)
- Part 5: Task recipes
  - 5.1 Update the "Currently" line
  - 5.2 Add a news item
  - 5.3 Add a publication (with thumbnail and photo credit)
  - 5.4 Add a gallery photo
  - 5.5 Replace the CV
  - 5.6 Edit the bio
  - 5.7 Update social links
  - 5.8 Edit the research pages
  - 5.9 Edit the Teaching / Mentoring page (carefully)
  - 5.10 Change the profile photo or the browser-tab icon
  - 5.11 Small homepage text (contact note, subtitle)
  - 5.12 Remove something (news item, gallery photo, publication)
- Part 6: After every change - how to know it worked
- Part 7: When something breaks
- Part 8: Cloudflare and the domain (rarely touched, never ignored)
- Part 9: House rules
- Appendix: file map cheat sheet

---

## Part 1: How the site works (read once)

The website is not edited "live." It works like this:

1. **All the site's files live in one place on GitHub** (a free service that stores files and remembers every version of them forever). The collection of files is called a **repository**, or "repo." Ours is at: https://github.com/madiritt/madiritt.github.io
2. **You change a file in the repo** (through the browser or through an app on your computer).
3. **A robot notices and rebuilds the site.** Every time a file changes, GitHub automatically runs a build (takes about 3 to 7 minutes) and publishes the result.
4. **The live site updates.** After the build, allow up to 10 more minutes for the update to reach everyone. Browsers and the internet keep temporary copies of pages so they load fast; this is called the "cache," and the old cached copy has to expire before your change shows. Then refresh the page.

That's the whole system. There is no server to manage, no "publish" button to press, nothing to renew except the domain name (Part 8). Saving a change into the repo is called a **commit**, and every commit triggers steps 3 and 4 automatically.

One more player: **Cloudflare** manages the domain name madisonrittinger.org, which is just a signpost pointing at GitHub. You will almost never log into it. Part 8 covers the one thing about it that matters.

### The two ways to edit

- **Route A: the web browser (Part 3).** Sign in to github.com and edit files right on the website. Nothing to install. Best for text changes and uploading a photo or PDF. **When in doubt, use Route A.**
- **Route B: VS Code (Part 4).** A free editor app on your computer with a synced copy of the repo. Better for editing several files at once or fiddly changes. Requires one-time setup.

Every recipe in Part 5 works with either route.

---

## Part 2: Accounts you need

**Never write real passwords into any file in this repo. The repo is public - anyone on the internet can read it, including this guide. Keep passwords in a password manager or somewhere private.**

| Account | Where | Username | What it controls |
|---|---|---|---|
| GitHub | github.com | `madiritt` | The site's files and settings. This is the account that matters day to day. |
| Cloudflare | dash.cloudflare.com | (Madi's email) | The domain name registration and DNS. Touched almost never. See Part 8. |
| Google Search Console | search.google.com/search-console | (Madi's Google account) | Tells Google the site exists and reports how it shows up in Google searches. Set up July 2026; touched almost never. See Part 7.5. |

The GitHub and Cloudflare accounts both have two-factor authentication (2FA) turned on, and Madi's Google account should as well: after the password, they ask for a code from a phone app. **Keep the recovery codes** (given when 2FA was set up) somewhere safe and offline; they are the only way back in if the phone is lost. Of the three, GitHub is the only one you'll sign into regularly; the other two are almost never touched.

---

## Part 3: Route A - editing in the web browser

No installs. Works from any computer.

### 3.1 Signing in

1. Go to https://github.com and click **Sign in** (top right).
2. Username: `madiritt`. Enter the password, then the 2FA code when asked.
3. Go to the repo: https://github.com/madiritt/madiritt.github.io (or click your profile picture, top right, then **Your repositories**, then **madiritt.github.io**).

### 3.2 Editing a text file

1. In the repo, click through the folders to the file you want (each recipe in Part 5 gives the exact path, like `_pages/about.md` - that means the file `about.md` inside the folder `_pages`).
   - **Finding your way around the file list:** folders are listed first (at the top), then individual files below them. Many folder names start with an underscore, like `_pages`, `_news`, `_projects` - that underscore is normal, not a typo; click those folders exactly like any other. To open a folder, click its name; to go back up, click the folder name in the trail near the top (e.g. `madiritt.github.io / _pages`) or use your browser's Back button.
2. Click the file name to view it, then click the **pencil icon** (top right of the file view; hover over it and a small label reads "Edit this file").
3. Make your change in the editor that appears.
4. Click the green **Commit changes...** button (top right).
5. A box pops up asking for a description. Write a short note about what you did, e.g. `Update Currently status`. Leave **"Commit directly to the main branch"** selected - "main" is just the name of the site's one live version, and you always want to save straight to it. (Ignore the "Create a new branch" option; it's for a more advanced workflow you don't need here.)
6. Click **Commit changes**. Done - the robot takes it from here (Part 6).

### 3.3 Uploading a file (photo, PDF)

1. In the repo, navigate INTO the folder the file belongs in (for example click `assets`, then `img`).
2. Click the **Add file** button (near the top right), then **Upload files**.
3. Drag the file from your computer into the big dashed box (or click "choose your files").
4. In the description box write e.g. `Add gallery photo`, leave "Commit directly to the main branch" selected, click **Commit changes**.

**To replace an existing file** (like the CV): give the new file **exactly the same name** as the old one on your computer first, then upload it into the same folder. GitHub replaces the old version automatically.

### 3.4 Creating a brand-new text file

1. Navigate into the folder where the file should live (e.g. `_news`).
2. Click **Add file**, then **Create new file**.
3. Type the file name in the name box at the top, type the contents in the big box below, then **Commit changes** as usual.

---

## Part 4: Route B - editing with VS Code

One-time setup, then a simple routine. VS Code and Git are free and work the same on Windows and Mac.

### 4.1 One-time setup - Windows (Madi's current computer)

**Step 1 - install Git** (the tool that talks to GitHub):
1. Download from https://git-scm.com/download/win (pick "64-bit Git for Windows Setup" if asked).
2. Run the installer. It shows MANY screens of options; just click **Next** on every one - the defaults are all fine - then **Install**, then **Finish**.

**Step 2 - install VS Code:**
1. Download from https://code.visualstudio.com (the big blue "Download for Windows" button).
2. Run the installer, accept the agreement, click Next through the screens (defaults fine), Install, Finish.

Then continue at **4.3 Connect to GitHub** below.

### 4.2 One-time setup - Mac (if she ever switches)

**Step 1 - install Git:**
1. Open the **Terminal** app (Cmd+Space, type Terminal, Enter).
2. Type `git --version` and press Enter.
3. If Git is already there it prints a version number - done. If not, macOS pops up an offer to install the "command line developer tools"; click **Install** and wait.

**Step 2 - install VS Code:**
1. Download from https://code.visualstudio.com (Mac version).
2. It downloads as a zip; double-click it, then drag **Visual Studio Code** into the **Applications** folder.

Keyboard note for everything in this guide: where Windows says `Ctrl`, Mac uses `Cmd`. Hard refresh on Mac is `Cmd+Shift+R`.

### 4.3 Connect VS Code to GitHub and copy the repo down (both systems)
1. Open VS Code.
2. Press `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`). A command box drops down.
3. Type `Git: Clone` and press Enter.
4. Paste this and press Enter: `https://github.com/madiritt/madiritt.github.io.git`
5. It asks where to put the folder; pick somewhere easy, like Documents.
6. A browser window opens asking you to sign in to GitHub - sign in as `madiritt` and click through the "Authorize" screens.
7. When VS Code asks "Would you like to open the cloned repository?", click **Open**.
8. If a box asks "Do you trust the authors?", click **Yes, I trust the authors**.

You now have a full copy of the site on your computer. You never have to clone again; from now on, just open that folder in VS Code (File > Open Recent).

### 4.4 The everyday routine (the sacred order - same on Windows and Mac)

Always in this order: **pull, edit, commit, push.**

1. **PULL FIRST.** Click the **Source Control icon** in the left sidebar (it looks like a branching line, third icon down). Click the **... menu** at the top of that panel and choose **Pull**. This downloads any changes made elsewhere (by the browser route, or by someone else) so your copy is current. Skipping this is the number one cause of headaches.
2. **Edit.** Open files from the Explorer icon (top of the left sidebar), make changes, save with `Ctrl+S` (Mac: `Cmd+S`). Add new files or photos by dragging them into the right folder in the Explorer panel.
3. **Commit.** Back in Source Control, your changed files are listed under "Changes." Type a short description in the Message box at the top (e.g. `Add ABS talk news item`), then click the **Commit** button. If it asks whether to "stage" changes (that just means "include these files in this save"), click **Yes** (or **Always**).
4. **Push.** Click **Sync Changes** (the button that appears after committing; the ... menu also has **Push**). It usually shows a small number, like a `1` with an up-arrow - that is how many commits are waiting to upload, so the number is a quick sanity check that you're pushing exactly what you just committed. This uploads your commit to GitHub, which triggers the rebuild.

If you also used GitHub Desktop during the site's early setup: it does the same job with the same pull, commit, push idea, and it's fine to keep using it instead.

---

## Part 5: Task recipes

Every recipe: which file, what to put in it, and anything to watch out for. Use Route A or B for the actual editing mechanics.

**Formatting note for all recipes:** these files begin with a block fenced by two `---` lines. Picture it as two zones: everything **between** the two `---` lines is settings (called front matter), and everything **after** the second `---` is the page's actual content. In the settings zone the spacing and indentation matter a lot. Two rules that prevent almost every broken build:
- **Copy the patterns exactly and change only the values** (the text after the colon), never the labels before it.
- **Indent with the space bar, never the Tab key.** A single Tab in the settings block looks fine on screen but stops the whole page from building. When a recipe says "two spaces," tap the space bar twice.

### 5.1 Update the "Currently" line (homepage status dot)

- **File:** `_pages/about.md`
- Near the top, find:
  ```yaml
  current: Analyzing data and writing manuscripts
  ```
- Replace the text after `current:` with the new status. Keep it to one short line, no dates needed. Update it a few times a year so the site feels alive.

### 5.2 Add a news item

- **Folder:** `_news/`
- Create a new file whose name is the date followed by a few words describing the item: `2026-09-15-new-paper.md` (format: `YYYY-MM-DD-something.md`, all lowercase, words joined by hyphens, no spaces).
- Contents (copy this exactly, change the date and the sentence):
  ```
  ---
  layout: post
  date: 2026-09-15 09:00:00-0600
  inline: true
  related_posts: false
  ---

  New paper out in Animal Behaviour on spider decision-making.
  ```
- The `date:` inside the file should match the filename date. **Only change the date part** (the `2026-09-15`); leave the time and the `-0600` after it exactly as they are. Those set the time zone and don't need touching. Keep `inline: true` too - that is what makes it a one-line item instead of a separate page.
- The homepage shows the 5 newest items (that cap is `limit: 5` under `announcements:` in `_pages/about.md`); the full list lives at madisonrittinger.org/news/ automatically. Old items never need deleting.

### 5.3 Add a publication (with thumbnail and photo credit)

Three parts: the entry, the thumbnail, and (optionally) a photo credit.

**Part 1 - the entry.**
- **File:** `_bibliography/papers.bib`
- **Easiest way, do this first:** don't type the entry by hand. On Google Scholar, find the paper, click **"Cite"** underneath it, then **"BibTeX"** at the bottom. Copy the whole block it shows you and paste it at the top of `papers.bib`. That gets the title, authors (including tricky accented names), journal, year, and DOI correct automatically. Then all you add by hand are the three special lines below: `doi`, `selected`, and `preview` if they aren't already there. Everything after this is just explaining what those pieces mean.
- Add the new block at the top of the file, following this pattern (this is a real entry from the file):
  ```bibtex
  @article{rittinger2025instinct,
    title={Instinct to insight: a variation-based framework to test hypotheses about how animals solve problems},
    author={Rittinger, Madison A and Rodr{\'\i}guez, Rafael Lucas},
    journal={Biology Letters},
    volume={21},
    number={10},
    year={2025},
    publisher={The Royal Society},
    doi={10.1098/rsbl.2025.0293},
    selected={true},
    preview={instinct-insight.jpg}
  }
  ```
- Line by line, the parts you change:
  - `rittinger2025instinct` is the entry's internal ID. Make up a new unique one: last name + year + first word of title.
  - `author={...}`: separate multiple authors with ` and ` (the word, spelled out). Accented characters use codes like `{\'\i}` for í - this is exactly the fiddly part the Scholar copy-paste above handles for you, so you shouldn't need to type these by hand.
  - `doi={...}`: the paper's DOI, just the number part, no https prefix. This becomes the DOI button.
  - `selected={true}`: include this line to feature the paper on the HOMEPAGE under Selected Publications. Leave the line out for papers that should only appear on the Publications page. Keep the homepage list to the best 2 or 3.
  - `preview={filename.jpg}`: the thumbnail image (next part). Leave this line out for no thumbnail.
  - Your name is bolded automatically on the site; nothing special needed.

**Part 2 - the thumbnail.**
- Upload a square-ish image into the folder `assets/img/publication_preview/`, e.g. `new-paper.jpg`, and set `preview={new-paper.jpg}` in the entry. Around 400 to 800 pixels on the short side is plenty; the build makes small web copies automatically.

**Part 3 - photo credit (only if the thumbnail is someone else's photo).**
- **File:** `_includes/publication-credits.html`
- Find the block that looks like this:
  ```js
  var credits = {
    'treefrog.jpg': 'Photo: Höbel Lab',
    'web-spider.jpg': 'Photo: Mark Yokoyama',
    'songbird-nestling.jpg': 'Photo: Dr. Rachael DiSciullo'
  };
  ```
- Add your line inside the braces, matching the pattern, with a comma after the previous line:
  ```js
    'songbird-nestling.jpg': 'Photo: Dr. Rachael DiSciullo',
    'new-paper.jpg': 'Photo: Jane Photographer'
  ```
- The key (left side) must exactly match the `preview={...}` filename. No entry means no credit overlay, which is correct for figures from your own papers.

### 5.4 Add a gallery photo

- **Step 1:** upload the image into `assets/img/` with a descriptive name starting with `gallery-`, e.g. `gallery-fieldwork-door-county-2026.jpg`.
- **Step 2:** open `_pages/gallery.md` and add an entry to the `photos:` list in the front matter, copying the pattern:
  ```yaml
  photos:
    - image: assets/img/gallery-fieldwork-door-county-2026.jpg
      caption: "Surveying orb weavers in Door County, 2026"
      year: 2026
    - image: assets/img/gallery-abs-2025.jpg
      caption: "Animal Behavior Society (ABS), 2025"
      year: 2025
  ```
- The grid sorts itself newest year first; you can add your entry anywhere in the list and it lands in the right spot.
- Species names in captions go in italics using `<em>` tags inside the quotes: `caption: "<em>Pholcus phalangioides</em>, 2022"`.
- Indentation matters in this list: two spaces before `-`, four before `image:`/`caption:`/`year:`. Copy an existing entry and edit it rather than typing fresh.

### 5.5 Replace the CV

- The CV PDF lives at `assets/pdf/Rittinger_2026_CV.pdf` and both the download button and the preview on the CV page point at it.
- **Easiest way:** rename your new PDF on your computer to exactly `Rittinger_2026_CV.pdf`, then upload it into `assets/pdf/` (Route A: section 3.3). It replaces the old one; nothing else to edit. Ignore that the filename says 2026 in later years, or use the tidier way:
- **Tidier way (optional):** upload the new PDF with a new name (e.g. `Rittinger_2027_CV.pdf`) into `assets/pdf/`, then edit `_pages/cv.md` and change the line `cv_pdf: /assets/pdf/Rittinger_2026_CV.pdf` to the new filename. You can then delete the old PDF from `assets/pdf/`.

### 5.6 Edit the bio

- **File:** `_pages/about.md`
- The bio is the paragraph BELOW the second `---` line (everything above it is settings; be careful in there). Edit the paragraph text directly.
- The long dash in the "antagonizing my cat" sentence is there on purpose (Madi's phrasing). Leave it unless Madi herself rewrites the sentence.

### 5.7 Update social links

- **File:** `_data/socials.yml`
- Current live entries:
  ```yaml
  email: ritting2@uwm.edu
  orcid_id: 0000-0001-6326-1572
  scholar_userid: FAzQaf4AAAAJ
  research_gate_profile: Madison-Rittinger
  linkedin_username: madison-rittinger-5a12711b8
  ```
- Change a value to update a link; put a `#` at the start of a line to hide that icon.
- Two traps, both explained in the file's own comments: the ResearchGate line must stay spelled exactly `research_gate_profile`, and the `rss_icon` line must keep its `#` at the front (that `#` is what hides it) - if that line is ever left active without the `#`, an unwanted RSS feed icon appears.

### 5.8 Edit the research pages

- The Research page lists one card per research question. Each card is a file in `_projects/`:
  - `decision-making-under-uncertainty.md`
  - `comparative-cognition.md`
  - `individual-personality.md`
- In each file's front matter: `title` and `description` are the card text; `importance: 1` (2, 3...) controls order, lowest number first; `category: current` or `category: past` controls which section it sits in.
- The page text and photos live in the body below the `---`. Photos referenced there (named `research-*.jpg`) live in `assets/img/`; to swap one, upload the new image and change the filename in the body where it's referenced.
- To ADD a research question: copy one of the three files (Route A: open it, copy all, create a new file in `_projects/`, paste, edit), give it a new filename, title, description, and importance number. It appears on the Research page automatically.

### 5.9 Edit the Teaching / Mentoring page (carefully)

- **File:** `_pages/teaching.md`
- This page has a hand-tuned layout: three sections, each with a photo the text wraps around. It is the one content page where the structure is fragile.
- **Safe to edit freely:** the visible sentences and paragraphs (mentoring counts, course lists, philosophy text), and the `<figcaption class="mentoring-caption">...</figcaption>` caption text.
- **Do not touch:** the `<style>` block at the top, the `<figure class="mentoring-inset">` blocks (except the caption text inside), the `<div class="mentoring-section" ...>` wrapper lines, or the order of anything. These control the photo float and text alignment at every screen size.
- **To swap a photo:** upload the new image to `assets/img/` (name it `mentoring-something.jpg`), then inside the relevant `<figure>` block change the old filename in the `path="assets/img/..."` part to the new one, and update the caption.
- If the page layout ever looks broken after an edit here, don't fight it: use Part 7.2 to restore the previous version of the file and try again with a smaller change (or leave a note for technical help).

### 5.10 Change the profile photo or the browser-tab icon

- **Profile photo (homepage portrait):** upload the new image as `assets/img/prof_pic.jpg` (exact name; it replaces the old one). Roughly square looks best in the orange panel. This file must always exist - deleting it breaks the build.
- **Browser-tab icon (favicon):** upload a SQUARE image as `assets/img/favicon.png` (exact name). It's the tiny face in the browser tab; around 192x192 pixels is right.

### 5.11 Small homepage text (contact note, subtitle)

- **File:** `_config.yml` - edit gently, this file also holds machinery settings. Change only lines you recognize:
  - `contact_note:` - the sentence under the social icons ("The best way to reach me is by email.").
  - `description:` - the one-line site summary search engines show.
- The subtitle line under the name on the homepage ("PhD Candidate · Department of ...") is `subtitle:` in `_pages/about.md`. Update it when the title changes (PhD Candidate becomes Dr., new institution, etc.). Keep the ` · ` separators; they become the stacked lines.

### 5.12 Remove something (news item, gallery photo, publication)

Removing is the mirror of adding. The key idea: for photos and publications, deleting the image file is NOT what makes the item disappear - removing its ENTRY (the lines that list it) is. Do the entry first.

- **A news item:** delete the whole file from `_news/`. In Route A: open the file, click the small caret (triangle) next to the pencil icon, or the **...** menu, and choose **Delete file**, then commit. In Route B (VS Code): right-click the file in the Explorer panel, choose **Delete**, then commit and push. Nothing else references it, so that's all.
- **A gallery photo:** in `_pages/gallery.md`, delete that photo's three-line entry from the `photos:` list (the `- image:` line and its `caption:` and `year:` lines beneath it). That removes it from the page. You can optionally also delete the image file from `assets/img/` to tidy up, but you don't have to.
- **A publication:** in `_bibliography/papers.bib`, delete the paper's whole block, from its `@article{...` line down to and including its closing `}`. If it had a thumbnail and/or a photo credit, you can optionally also delete the image from `assets/img/publication_preview/` and remove its line from the credits list in `_includes/publication-credits.html` (recipe 5.3).

As always, one change at a time, then check the result (Part 6). If a removal ever looks wrong, restoring the previous version (Part 7.2) brings it right back.

---

## Part 6: After every change - how to know it worked

1. **Watch the robot.** Go to https://github.com/madiritt/madiritt.github.io/actions - the top row is your change. A yellow dot means building (3 to 7 minutes), a **green check** means published, a **red X** means the build failed (go to Part 7.1).
2. **Wait out the cache.** After the green check, the OLD version of the site can keep appearing for up to 10 more minutes. This is normal.
3. **Hard refresh.** Open the page and force a fresh copy: Windows `Ctrl+F5`, Mac `Cmd+Shift+R`. On a phone, close the tab and reopen it.
4. Check your change is there and looks right. That's it.

---

## Part 7: When something breaks

Stay calm: every version of every file is saved forever. Nothing is ever lost.

### 7.1 The build failed (red X in Actions)

1. Your change had a formatting problem (usually a missing quote, bracket, or wrong indentation in front matter). The live site is still up - it just kept the previous version, so there's no rush.
2. Click the red X row in the Actions tab, then the job name on the left. The step that failed has a red X next to it; click it to expand, and look near the BOTTOM of the text that appears - the real error is usually in the last few red lines. Skim for a filename you recognize (like `gallery.md`). You don't need to understand the message; you just need to know which file to fix or restore.
3. Compare your edit against the recipe's pattern and fix the typo, or restore the file (7.2). Committing the fix triggers a fresh build automatically.

### 7.2 Restore a previous version of a file (the universal undo)

Works in the browser for any file. The idea is simple: find the last good version of the file, copy its contents, and paste them over the broken current version.

1. In the repo, open the file (click its name so you're viewing it), then click **History** (top right of the file view). You get a list of every change ever made to just that file, newest first. Each row is one change, with its date and description.
2. In that list, click the row **just below** the bad change - that's the version from right before the problem. GitHub now shows you what that change did, with the file's full contents underneath.
3. At the top right of the file box on that page, click the **...** (three dots) button, then choose **View file**. You are now looking at the old, good version of the whole file on its own page.
4. Click anywhere in the file text, select everything (`Ctrl+A`, or `Cmd+A` on Mac), and copy (`Ctrl+C` / `Cmd+C`).
5. Now go back to the file's current (broken) version: open the file normally in the repo, click the **pencil** icon to edit, select everything in the editor (`Ctrl+A`), delete it, and paste (`Ctrl+V`) the good version in its place.
6. Commit with a message like `Restore previous version of gallery.md`. The site rebuilds and you're back to the working version.

### 7.3 Build is green but the site won't update

- First: did you wait 10 minutes and do a HARD refresh (Part 6, steps 2 and 3)? That's the answer 9 times out of 10.
- If it's been an hour and truly nothing changed: go to the Actions tab, click the most recent "Deploy site" run, and press **Re-run all jobs** (button at the top right). Wait for the green check and try again. (Rarely, GitHub's publishing step times out and holds things up; a re-run clears it.)

### 7.4 The whole site is down

- Check https://www.githubstatus.com - if GitHub Pages shows an incident, it's them, not you; wait it out.
- If GitHub is fine, check Cloudflare (Part 8): log in and make sure the domain hasn't expired and the DNS records are still there.
- Remember the site also answers at https://madiritt.github.io (it forwards to the main domain). If THAT works but madisonrittinger.org doesn't, the problem is on the Cloudflare/domain side for sure.

### 7.5 The site isn't showing up in a Google search

This is about search visibility, not a broken site - the site can be perfectly healthy and still take time to appear well in Google. The tool that manages this is **Google Search Console** (search.google.com/search-console, sign in with Madi's Google account). It was set up in July 2026: the domain is verified, the site's page list (its "sitemap") is submitted, and Google has confirmed the homepage is indexed.

A few things worth knowing:
- **New pages take days to weeks to appear in Google.** This is normal and there is no button that makes it instant. When you add a big new page you want found sooner, you can nudge Google: in Search Console, paste the page's address into the **"Inspect any URL"** bar at the top, wait for the check, then click **Request Indexing**.
- **Being in Google is not the same as ranking first.** For a while, other pages about Madi (her university profile, ResearchGate, etc.) may sit above her own site when you search her name. That improves with time and, most of all, with those other profiles linking to madisonrittinger.org. The single best thing Madi can do is add her website link to her Google Scholar, ORCID, LinkedIn, and ResearchGate profiles.
- **To check what Google sees:** search Google for `site:madisonrittinger.org` (type it exactly, including `site:`). Whatever it lists is what Google currently has indexed. Search Console's **Pages** report (left menu, under Indexing) shows the same thing in more detail.
- You almost never need to log in here. It's a health dashboard, not something to maintain.

---

## Part 8: Cloudflare and the domain (rarely touched, never ignored)

Cloudflare is where the name madisonrittinger.org is registered and pointed at GitHub. Log in at https://dash.cloudflare.com.

**The one thing that must never lapse: the domain registration.** If it expires, the site vanishes from madisonrittinger.org and the name can eventually be bought by someone else. Once a year, make sure:
1. **Auto-renew is ON**: dash.cloudflare.com > Domain Registration > Manage Domains > madisonrittinger.org > check renewal is set to auto.
2. **The payment card on file is valid**: Billing > Payment info. When a card expires, update it here. Cloudflare emails renewal reminders to the account email; don't ignore them.

**The DNS records (the signpost pointing at GitHub).** Under the madisonrittinger.org site > DNS > Records there are exactly five records that matter, all with the cloud icon set to grey "DNS only":

| Type | Name | Content |
|---|---|---|
| A | @ (shows as madisonrittinger.org) | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | madiritt.github.io |

Don't edit or delete these, and don't switch the grey clouds to orange (orange breaks the site's HTTPS certificate). If they're ever lost, re-create them exactly as above and the site comes back.

There is also a second domain, **madirittinger.org** (common misspelling), owned as a protective redirect. Same rule: keep it renewed, or let it lapse deliberately if it's ever not worth the fee.

---

## Part 9: House rules

1. **The name on the site is always "Madison Rittinger."** Never "Madi" in any page, caption, news item, or file that renders on the site. (This maintenance guide is internal and is not part of the rendered site, so it refers to her informally as "Madi" in places - that's intentional and fine. The rule is about what visitors actually see.)
2. **No em-dashes (the long dash) in site text.** Use a hyphen with spaces, a colon, or reword. One exception exists on purpose: the long dash in the bio's "antagonizing my cat" sentence.
3. **Image guidelines:** JPG for photos. Keep files under about 2 MB (phone photos may need shrinking; any "resize image" tool works, aim for 1600 to 2000 pixels on the long side). Name files in lowercase with hyphens and a prefix that says where they belong: `gallery-`, `mentoring-`, `research-`, or into `publication_preview/`. No spaces in filenames.
4. **Don't edit machinery.** Folders `_layouts`, `_sass`, `.github`, and the file `purgecss.config.js` are the site's engine room. The ONLY exception you'll ever need is the credits list in `_includes/publication-credits.html` (recipe 5.3). Root files `CNAME`, `Gemfile`, `Gemfile.lock`, `package.json`, `package-lock.json`, `requirements.txt` must not be deleted or renamed.
5. **One change at a time.** Make an edit, commit it, watch it go green, look at the site. Small steps make mistakes easy to find and undo.
6. **Log what you change.** The file `CHANGELOG.md` at the repo root is the site's diary. Adding a dated line about what you changed is good practice, not mandatory for small content edits.

---

## Appendix: file map cheat sheet

| To change... | Edit... |
|---|---|
| "Currently" status | `_pages/about.md` (the `current:` line) |
| Bio paragraph | `_pages/about.md` (text below the second `---`) |
| Subtitle under the name | `_pages/about.md` (`subtitle:`) |
| News | new file in `_news/` |
| Publications | `_bibliography/papers.bib` |
| Publication thumbnails | image in `assets/img/publication_preview/` + `preview={...}` in the entry |
| Photo credits on thumbnails | `_includes/publication-credits.html` (the credits list) |
| Gallery | `_pages/gallery.md` (photos list) + image in `assets/img/` |
| CV | PDF in `assets/pdf/` (+ `cv_pdf:` in `_pages/cv.md` if renamed) |
| Research cards/pages | files in `_projects/` |
| Teaching / Mentoring | `_pages/teaching.md` (text only; see 5.9) |
| Social icons | `_data/socials.yml` |
| Contact note under icons | `_config.yml` (`contact_note:`) |
| Profile photo | `assets/img/prof_pic.jpg` (replace, keep name) |
| Browser-tab icon | `assets/img/favicon.png` (replace, keep name) |
| Domain / DNS / renewal | Cloudflare dashboard (Part 8) |
| Remove a news item / photo / publication | delete the file or its entry (recipe 5.12) |
| Search visibility (not showing in Google) | Google Search Console (Part 7.5) |

**Live site:** https://madisonrittinger.org
**Repo:** https://github.com/madiritt/madiritt.github.io
**Build status:** https://github.com/madiritt/madiritt.github.io/actions
