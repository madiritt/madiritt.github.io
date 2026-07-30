# Website Maintenance Guide

**For: Madison Rittinger (and anyone helping her)**
**Site: https://madisonrittinger.org**
**Written: July 2026. If something in here doesn't match what you see on screen, the site may have changed since; the ideas will still be right even if a button moved.**

This guide assumes you have never edited a website before. It explains everything: what the site is made of, how to sign in, how to change things, and how to fix mistakes. Read Part 1 once so the rest makes sense. After that, jump straight to the recipe you need in Part 5. Ctrl+F (Cmd+F on Mac) is your friend.

**Never edited the site before? Do section 3.6 first.** It is a practice run (about 10 minutes of clicking, then waiting for the site to rebuild): one real, harmless edit from signing in to seeing it live, with every click named and every expected result written down. Everything else in this guide is a variation on those same steps.

**If you only remember one thing:** you cannot permanently break this site. Every change ever made is saved forever in the history, and Part 7 shows you how to roll anything back.

---

## Table of contents

- Part 1: How the site works (read once)
- Part 2: Accounts you need
- Part 3: Route A - editing in the web browser (no installs)
  - 3.1 Signing in
  - 3.2 Editing a text file
  - 3.3 Uploading a file (photo, PDF)
  - 3.4 Creating a brand-new text file
  - 3.5 Backing out of an edit you have not saved yet
  - **3.6 Practice run: your first edit, start to finish (START HERE)**
- Part 4: Route B - editing with VS Code (for bigger jobs)
  - 4.1 One-time setup, Windows
  - 4.2 One-time setup, Mac
  - 4.3 Connect VS Code to GitHub and copy the repo down
  - 4.4 The everyday routine: pull, edit, commit, push
- Part 5: Task recipes
  - **5.0 Start from the page you are looking at (a page-by-page index of everything below)**
  - 5.1 Update the "Currently" line
  - 5.2 Add a news item
  - 5.3 Add a publication (with thumbnail and photo credit)
  - 5.4 Add a gallery photo
  - 5.5 Replace the CV
  - 5.6 Edit the bio
  - 5.7 Update social links
  - 5.8 Edit the research pages
  - 5.9 Edit the Teaching / Mentoring page
  - 5.10 Change the profile photo or the browser-tab icon
  - 5.11 Contact note, Google summary, and the subtitle under your name
  - 5.12 Remove something (news item, gallery photo, publication)
  - 5.13 Edit the Outreach page
- Part 6: After every change - how to know it worked
- Part 7: When something breaks
  - 7.1 The build failed (red X)
  - 7.2 Restore a previous version of a file (the universal undo)
  - 7.3 Build is green but the site won't update
  - 7.4 The whole site is down
  - 7.5 The site isn't showing up in a Google search
  - **7.6 Quick diagnosis: what the symptom usually means (start here when something is wrong)**
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

1. Go to https://github.com
2. Click **Sign in** (top right corner of the page).
3. In the box labeled **Username or email address**, type `madiritt`
4. Type the password in the box below it, then click the green **Sign in** button.
5. GitHub asks for a 2FA code. Open the authenticator app on the phone, read the 6-digit code for GitHub, and type it in. Expected result: you land on your GitHub home page, which is a feed of activity. That page is not the site; ignore it.
6. Go to the repo by typing this address into the browser: https://github.com/madiritt/madiritt.github.io
   Expected result: a page titled `madiritt / madiritt.github.io` with a list of folders and files. This file list is where all editing starts.
   - Alternate way to reach the same page if you forget the address: click your profile picture (top right), then **Your repositories**, then **madiritt.github.io**.
7. Optional but recommended: bookmark that repo page in the browser. If you skip this, just retype the address next time.

### 3.2 Editing a text file

**Two ways to reach a file. Use whichever you like.**

*Way 1 - click through the folders.* Each recipe in Part 5 gives the exact path, like `_pages/about.md`. That means: the file `about.md` inside the folder `_pages`. So click `_pages`, then click `about.md`.
- Folders are listed first (at the top of the list), then individual files below them.
- Many folder names start with an underscore, like `_pages`, `_news`, `_projects`. That underscore is normal, not a typo; click those folders exactly like any other.
- To go back up a level, click the folder name in the trail near the top of the page (it reads `madiritt.github.io / _pages`) or press your browser's Back button.

*Way 2 - search for the file by name (faster).* On the repo page, click the **Go to file** button (it sits just above the file list, near the green **Code** button). A search box appears. Type part of the file name, for example `gallery`. Expected result: a short list of matching file paths. Click the one you want. This skips all folder clicking.

**Then edit it:**

1. Click the file name so you are viewing the file. Expected result: you see the file's contents as read-only text with line numbers down the left side.
2. Click the **pencil icon** near the top right of the file box. Hover over it and a small label reads "Edit this file". Expected result: the same text, now with a blinking cursor when you click into it. You are in edit mode.
3. Click into the text and make your change, exactly as the recipe in Part 5 describes. Nothing is saved yet at this point, and nothing is live. That is correct.
4. Click the green **Commit changes...** button (top right). Expected result: a pop-up box appears titled "Commit changes".
5. In that box, the first field is **Commit message**. Type a short note about what you did, for example `Update Currently status`. The second field, "Extended description", can stay empty.
6. Below those fields, make sure **"Commit directly to the `main` branch"** is the selected option. It is selected by default, so normally you change nothing here. ("main" is just the name of the site's one live version, and you always want to save straight to it. Ignore the "Create a new branch" option; that is for a more advanced workflow you do not need.)
7. Click the green **Commit changes** button inside the pop-up. Expected result: the pop-up closes and you are back to viewing the file, with your new text in it. The change is now saved and the robot has started rebuilding. Go to Part 6 to watch it.

**Searching inside a file:** while you are in edit mode, `Ctrl+F` (Mac `Cmd+F`) opens a small find box that belongs to the editor, not the usual browser one, so it looks different than you expect. Type your text and press Enter to jump to it. This is the fastest way to find a line in a long file, and several recipes below tell you to use it.

**If you get stuck partway and want out, see 3.5. Nothing you have not committed can hurt anything.**

### 3.3 Uploading a file (photo, PDF)

1. Rename the file on your computer FIRST, before uploading, to the name the recipe asks for. Renaming it after it is on GitHub is extra work. (On Windows: right-click the file in File Explorer, choose **Rename**, type the new name, press Enter.)
2. On the repo page, click into the folder the file belongs in. For a photo that is `assets`, then `img`. Expected result: the trail near the top of the page reads `madiritt.github.io / assets / img` and you see a long list of image files.
3. Click the **Add file** button (near the top right, next to the green **Code** button). A small menu drops down.
4. In that menu click **Upload files**. Expected result: a mostly empty page with a big dashed rectangle that says "Drag files here to add them to your repository".
5. Drag the file from your computer into that dashed rectangle. If dragging is awkward, click the blue **choose your files** link inside the rectangle instead and pick the file in the file-picker window.
6. Wait for the upload. Expected result: the file name appears in a list below the rectangle with a green check next to it. On a slow connection a large photo can take up to a minute.
7. Scroll down to the **Commit changes** section at the bottom of the page. In the first box type a short note, for example `Add gallery photo`.
8. Leave **"Commit directly to the `main` branch"** selected (it is the default).
9. Click the green **Commit changes** button. Expected result: you land back in the folder and your file is now in the list.

**To replace an existing file** (like the CV, or the profile photo): give the new file on your computer **exactly the same name** as the old one, character for character, then upload it into the same folder with the steps above. GitHub replaces the old version automatically and asks you nothing extra. If the name differs even slightly (`prof_pic.JPG` vs `prof_pic.jpg`), you will end up with two files instead of a replacement, and the site keeps showing the old one.

### 3.4 Creating a brand-new text file

1. On the repo page, click into the folder where the new file should live. For a news item that is `_news`. Expected result: the trail near the top reads `madiritt.github.io / _news`.
2. Click the **Add file** button (near the top right). A small menu drops down.
3. In that menu click **Create new file**. Expected result: a page with an empty name box at the top and a large empty text area below it.
4. Click the name box and type the file name exactly as the recipe gives it, including the `.md` at the end.
5. Click into the large text area and type or paste the contents.
6. Click the green **Commit changes...** button (top right). A pop-up appears.
7. Type a short note in the **Commit message** field, leave **"Commit directly to the `main` branch"** selected, and click the green **Commit changes** button. Expected result: the pop-up closes and your new file is listed in the folder.

### 3.5 Backing out of an edit you have not saved yet

Any time you are mid-edit and want to abandon it, the escape is the same: **do not click Commit changes.** An edit only becomes real when you commit it.

1. Press your browser's Back button, or click the repo name `madiritt.github.io` in the trail at the top of the page.
2. If the browser pops up a warning like "Leave site? Changes you made may not be saved", click **Leave** or **Leave page**. That warning is exactly what you want here.
3. Expected result: you are back on a normal file list and your typing is gone. The file on GitHub is untouched and the live site never saw anything. Nothing broke.

If you already committed and want that undone, that is Part 7.2 instead.

### 3.6 Practice run: your first edit, start to finish

Do this once, all the way through, before you need to make a real change. Budget about 10 minutes of clicking plus 15 minutes of waiting.

**What you are changing:** the short "Currently" line on the homepage, under the bio. It reads "Analyzing data and writing manuscripts" today. You will change it to another sentence that is also true, so that if a visitor happens to look during the practice run they see nothing odd. Step 22 puts the original wording back.

1. Open a browser tab and go to https://github.com
2. Click **Sign in** (top right).
3. Type `madiritt` in the **Username or email address** box, type the password below it, click the green **Sign in** button, then type the 6-digit code from the phone authenticator app when GitHub asks. Expected result: you are signed in and looking at a GitHub activity feed.
4. In the browser address bar, type https://github.com/madiritt/madiritt.github.io and press Enter. Expected result: a file list, with the page title `madiritt / madiritt.github.io` at the top.
5. In that file list, click the folder named `_pages`. Expected result: a shorter list of files, all ending in `.md`, including `about.md`.
6. Click the file named `about.md`. Expected result: you are viewing the file's text, read-only, with line numbers down the left.
7. Near the top right of the file box, click the **pencil icon** (hovering shows "Edit this file"). Expected result: the text is now editable and clicking into it gives you a blinking cursor.
8. Find the line that reads `current: Analyzing data and writing manuscripts`. It is about 19 lines down, in the upper settings section of the file. If you cannot spot it, press `Ctrl+F` (Mac: `Cmd+F`), type `current:`, and press Enter to jump to it.
9. Click at the very end of that line, after the word `manuscripts`, so the cursor is blinking there.
10. Hold Backspace and delete only the words after `current: `, leaving the line reading exactly `current: ` with the colon and one space still there. Do NOT delete the word `current` or the colon.
11. Type this text: `Writing manuscripts and mentoring undergraduates`
    Expected result: the line now reads `current: Writing manuscripts and mentoring undergraduates` and nothing else on the page has changed.
12. Click the green **Commit changes...** button (top right). Expected result: a pop-up box titled "Commit changes".
13. In the **Commit message** field, type `Update Currently line`
14. Confirm the option **"Commit directly to the `main` branch"** is selected. It is the default, so normally you do not touch this.
15. Click the green **Commit changes** button inside the pop-up. Expected result: the pop-up closes and you are viewing `about.md` again with your new text in it. Nothing appears to happen on the live site yet. That is correct; the rebuild has just started.
16. Open a new browser tab and go to https://github.com/madiritt/madiritt.github.io/actions
17. Look at the top row of the list. Expected result: it shows your message `Update Currently line` with a spinning yellow-brown dot next to it, meaning the site is being rebuilt. This takes 3 to 7 minutes.
18. Wait, refreshing that Actions page every couple of minutes, until the top row shows a **green check mark**. Expected result: green check = the new version is published.
19. Wait 10 more minutes after the green check. Nothing to do in this step; the internet is still handing out the old cached copy of the page. Skipping this wait is the single most common reason people think an edit failed.
20. Open https://madisonrittinger.org and press `Ctrl+F5` (Mac: `Cmd+Shift+R`) to force a fresh copy.
21. Look at the homepage under the bio, next to the small orange dot. Expected result: it reads "Writing manuscripts and mentoring undergraduates". You have now made a real edit end to end, and every recipe in Part 5 is a variation on what you just did.
22. Now put the original wording back. Go to https://github.com/madiritt/madiritt.github.io again, then repeat steps 5 through 15, with one change: in step 11 type `Analyzing data and writing manuscripts` instead. (Or, if you prefer the new sentence, skip this step and leave it. Either is fine; both are true.)
23. You do not need to watch this second build, but check the homepage again in about 20 minutes to confirm the wording you wanted is the wording that is live.

**If step 18 shows a red X instead of a green check:** you have a typo, most likely a deleted colon or a deleted `current` label in step 10. The live site is still fine and still showing the old version. Go to Part 7.2 and restore the previous version of `about.md`, then start over at step 5.

**If step 21 still shows the old text:** you almost certainly shortened the wait in step 19 or did a normal refresh instead of `Ctrl+F5`. Wait another 10 minutes and hard-refresh again. If it is still wrong after an hour, go to Part 7.3.

From now on, updating that line is recipe 5.1, which is these same steps in short form. Every other recipe in Part 5 follows the identical rhythm: open the file, change the thing, commit, watch for green, wait, hard refresh.

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

1. **PULL FIRST.** Click the **Source Control icon** in the left sidebar (it looks like a branching line, third icon down). Click the **... menu** at the top of that panel and choose **Pull**. Expected result: nothing visible happens, or a brief progress flicker in the bottom bar. That is correct. This downloads any changes made elsewhere (by the browser route, or by someone else) so your copy is current. Skipping this is the number one cause of headaches.
2. **Edit.** Open files from the Explorer icon (top of the left sidebar), make changes, save with `Ctrl+S` (Mac: `Cmd+S`). Add new files or photos by dragging them from a File Explorer window into the right folder in the Explorer panel. Expected result after saving: the file name in the tab loses its dot, and the Source Control icon shows a small number badge.
3. **Commit.** Back in Source Control, your changed files are listed under "Changes." Type a short description in the Message box at the top (e.g. `Add ABS talk news item`), then click the **Commit** button. If it asks whether to "stage" changes (that just means "include these files in this save"), click **Yes** (or **Always**). Expected result: the Changes list empties out. Your work is saved on your computer only; GitHub has not seen it yet and the site has NOT started rebuilding.
4. **Push.** Click **Sync Changes** (the button that appears after committing; the ... menu also has **Push**). It usually shows a small number, like a `1` with an up-arrow - that is how many commits are waiting to upload, so the number is a quick sanity check that you're pushing exactly what you just committed. Expected result: the button goes back to plain "Sync Changes" with no number. Only now has the rebuild started, so go to Part 6.

**The trap unique to Route B: committing is not publishing.** In the browser (Route A) one click does both. Here, a commit without a push leaves your change sitting on your computer, invisible to everyone, with no build running and no green check to find. If you cannot see your change on the live site and the Actions tab shows no new run at all, this is almost always why. Go back to step 4.

If you also used GitHub Desktop during the site's early setup: it does the same job with the same pull, commit, push idea, and it's fine to keep using it instead.

---

## Part 5: Task recipes

Every recipe: which file, what to put in it, and anything to watch out for. The recipes tell you WHAT to change. For the clicking mechanics, they point you back to section 3.2 (edit a text file), 3.3 (upload a photo or PDF), or 3.4 (create a new file). If you are using VS Code instead, the mechanics are section 4.4 and everything else in the recipe is identical.

### 5.0 Start from the page you are looking at

Normally you notice something while looking at your own site: "that sentence on my homepage is out of date." So start here. Find the page you were looking at, find the thing on it, and it tells you which recipe to open.

**One thing to know before you use this table:** a single page is usually built from several different files. Your homepage alone is assembled from six of them. That is why "edit the homepage" is not one job, and why the table below is broken down by the individual thing you see rather than by page alone.

**Homepage** (madisonrittinger.org)

| The thing you see | Recipe |
|---|---|
| The line under the bio next to the orange dot ("Currently...") | 5.1 |
| The dated one-line updates under News | 5.2 |
| The 2 or 3 papers under Selected Publications | 5.3, the `selected={true}` line |
| The main paragraph about you | 5.6 |
| The small grey line above your name (role, department, university) | 5.11, the subtitle part |
| The round social icons, and the sentence beneath them | 5.7 for the icons, 5.11 for the sentence |
| Your photo in the orange panel | 5.10 |
| Your name in the large headline | Neither. It comes from `first_name` and `last_name` in `_config.yml`. It should never need changing, so treat it as a technical-help job. |

**Research page** (madisonrittinger.org/research/)

| The thing you see | Recipe |
|---|---|
| A card's heading, blurb, or position in the row | 5.8 |
| The text and photos on the page a card opens | 5.8 |
| A whole new research question, or removing one | 5.8, the last two sub-recipes |

Do not go looking in `_pages/research.md` for any of this. That file is 20 lines of machinery that assembles the cards; the actual content is one file per question in `_projects/`.

**Publications page** (madisonrittinger.org/publications/)

| The thing you see | Recipe |
|---|---|
| Adding a paper, or its DOI button | 5.3, Part 1 |
| The small picture beside a paper | 5.3, Part 2 |
| The photographer's name across a picture | 5.3, Part 3 |
| Removing a paper | 5.12 |

**CV page** (madisonrittinger.org/cv/) - one job only: replace the PDF. Recipe 5.5. Both the download button and the preview come from that one file.

**Teaching / Mentoring page** (madisonrittinger.org/teaching/) - the words, the photos, the captions, and which side each photo sits on, all in one settings block, recipe 5.9.

**Gallery page** (madisonrittinger.org/gallery/)

| The thing you see | Recipe |
|---|---|
| Adding a photo, or its caption when clicked | 5.4 |
| Removing a photo | 5.12 |

**News page** (madisonrittinger.org/news/) - the same items as the homepage News section, recipe 5.2. You never edit this page: it lists everything in `_news/` automatically, while the homepage shows only the newest 5.

**Outreach page** (madisonrittinger.org/outreach/) - recipe 5.13. This page is not in the top menu, but it is live and anyone with the link can read it.

**Every page at once**

| The thing you see | Recipe |
|---|---|
| The tiny icon in the browser tab | 5.10 |
| The one-line summary Google shows under your site name | 5.11 |
| The top menu, footer, colours, fonts, spacing | None of these. That is design and layout work, not content. Ask for technical help. |

### Formatting note that applies to every recipe

Most of these files begin with a block fenced by two `---` lines. Picture it as two zones: everything **between** the two `---` lines is settings (called front matter), and everything **after** the second `---` is the page's actual content. Here is the top of the real `_pages/about.md` with the zones labeled:

```
---                                    <- first fence: settings start here
layout: about
title: About
subtitle: PhD Candidate · Department of Biological Sciences · University of Wisconsin-Milwaukee
current: Analyzing data and writing manuscripts
---                                    <- second fence: settings end here

I am a behavioral ecologist who is...  <- from here down is the visible page text
```

(The `<-` arrows above are labels for this guide only. They are not in the real file, and you never type them.)

In the settings zone the spacing and indentation matter a lot. Three rules prevent almost every broken build:
- **Copy the patterns exactly and change only the values** (the text after the colon), never the labels before it.
- **Keep the colon and the single space after it.** `current: text` builds; `current:text` and `current text` do not.
- **Indent with the space bar, never the Tab key.** A single Tab in the settings block looks fine on screen but stops the whole page from building. When a recipe says "two spaces," tap the space bar twice.

### 5.1 Update the "Currently" line (homepage status dot)

The short line under the bio, next to the orange dot. Madi updates it a few times a year so the site reads as live and maintained.

- **File to edit:** `_pages/about.md`

1. Open `_pages/about.md` for editing (section 3.2: click `_pages`, click `about.md`, click the pencil icon).
2. Find the line that reads `current: Analyzing data and writing manuscripts`. It is in the settings zone near the top. Press `Ctrl+F` and search for `current:` if you cannot see it.
3. Delete only the words after `current: `, leaving the label, the colon, and one space intact.
4. Type the new status on that same line. Keep it to one short line and do not add a date or a timeline. Expected result: the line reads like `current: Running field trials in Door County`.
5. Commit (section 3.2, steps 4 to 7), then check it went live (Part 6).

### 5.2 Add a news item

News items are the dated one-line updates on the homepage. Each item is its own small file.

- **Folder the new file goes in:** `_news/`

1. Decide the item's date and a two-or-three-word description of it. For example: 15 September 2026, new paper.
2. Turn that into a file name in this exact shape: `2026-09-15-new-paper.md`
   - The date comes first, as `YYYY-MM-DD` (four-digit year, two-digit month, two-digit day).
   - Then a hyphen, then the description words joined by hyphens.
   - All lowercase. No spaces anywhere. Ends in `.md`.
   - Real examples already in the folder: `2026-06-01-site-launched.md` and `2026-07-17-abs-2026.md`.
3. Create the new file in the `_news` folder (section 3.4).
4. For the contents, copy the block below exactly, then change only the two things named underneath it:
   ```
   ---
   layout: post
   date: 2026-09-15 09:00:00-0600
   inline: true
   related_posts: false
   ---

   New paper out in Animal Behaviour on spider decision-making.
   ```
5. Change the date on the `date:` line to match the date in your file name. **Change only the `2026-09-15` part.** Leave the ` 09:00:00-0600` after it exactly as it is; that is the time and time zone and it never needs touching.
6. Change the sentence at the bottom to the actual news. One or two sentences is right. Do not change `layout: post`, `inline: true`, or `related_posts: false`; `inline: true` is what makes it a one-line item instead of its own separate page.
7. Commit (section 3.4, steps 6 and 7), then check it went live (Part 6). Expected result: the new item appears at the top of the News section on the homepage, and also at https://madisonrittinger.org/news/
8. Nothing to clean up afterwards. The homepage shows only the 5 newest items (that cap is the `limit: 5` line under `announcements:` in `_pages/about.md`) and the full list at /news/ builds itself. Old items never need deleting.

### 5.3 Add a publication (with thumbnail and photo credit)

This recipe has three parts. **Part 1 is required. Parts 2 and 3 are optional** and each says so. Do them as three separate commits, checking the site between each one, rather than all at once.

**Part 1 - add the paper's entry (required).**

- **File to edit:** `_bibliography/papers.bib`
- Do NOT type the entry by hand. Google Scholar will write most of it for you, including the fiddly accented names.

1. Go to https://scholar.google.com and search for the paper by title.
2. Underneath the search result, click **Cite**. A small window opens showing formatted citations.
3. At the bottom of that window, click **BibTeX**. Expected result: a plain-text page appears showing a block that starts with `@article{`.
4. Select all of that text (`Ctrl+A`, Mac `Cmd+A`) and copy it (`Ctrl+C`, Mac `Cmd+C`).
5. Open `_bibliography/papers.bib` for editing (section 3.2; use the **Go to file** button and type `papers` to find it fast).
6. Look at the top of the file. Lines 1 and 2 are two `---` lines with nothing between them, then a blank line, then the first paper's `@article{` line. **Leave those two `---` lines alone.** They look pointless and they are not; deleting them stops the Publications page from building.
7. Click at the very start of the first `@article{` line, which is line 4, so the cursor is blinking immediately before the `@` symbol.
8. Paste the copied block (`Ctrl+V`, Mac `Cmd+V`). Expected result: the two `---` lines are still at the top, your new paper comes next, and the old entries follow below it. New papers go at the top so the newest work reads first.
9. Look at where your pasted block ends. If its closing `}` is touching the next `@article{` line with no gap, click at the end of that `}` and press Enter once so there is one blank line between them. This is cosmetic, not structural, but it keeps the file readable.
10. Compare your pasted block against this real entry from the file. Yours should have the same shape, though Scholar may not include all the same lines:
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
11. Check there is a `doi={...}` line. If Scholar omitted it, add one, using just the number part of the DOI with no `https://doi.org/` in front, like `doi={10.1098/rsbl.2025.0293},`. That line is what creates the DOI button on the site.
12. Decide about the homepage. To feature this paper on the HOMEPAGE under Selected Publications, add the line `selected={true},`. To have it appear only on the Publications page, leave that line out. Keep the homepage list to the best 2 or 3 papers.
13. Leave out the `preview={...}` line for now. Part 2 below adds it if you want a thumbnail.
14. Last check before saving: the block ends with a `}` on its own line, and every line inside the block ends with a comma EXCEPT the last one before that `}`.
15. Commit (section 3.2, steps 4 to 7), then check the Publications page went live (Part 6).

Two things you never have to do here: your own name is bolded automatically wherever it appears in the list, and the papers sort themselves by year on the page, so the order inside the file is only for your own convenience.

Rare snag: the text between `{` and the first comma on the `@article{` line is the entry's internal ID, and no two entries may share one. Scholar builds it from surname, year, and first title word, so a clash only happens with two same-year papers whose titles start with the same word. If the build fails and the error mentions a duplicate key, change one character in the newer ID (`rittinger2027webs` to `rittinger2027websb`) and commit again.

**Part 2 - add a thumbnail image (optional; skip it and the entry just shows no picture).**

1. Get a square-ish image, roughly 400 to 800 pixels on its short side. Bigger is fine; the build makes small web copies automatically.
2. Rename it on your computer to a lowercase, hyphenated name ending in `.jpg`, for example `new-paper.jpg`.
3. Upload it into the folder `assets/img/publication_preview/` (section 3.3). Note this is a DIFFERENT folder from the gallery images; it is inside `assets/img/`.
4. Open `_bibliography/papers.bib` for editing again and add this line inside the paper's block, just before the closing `}`, using your file name: `preview={new-paper.jpg}`
5. Make sure the line above it ends with a comma, and that the `preview={new-paper.jpg}` line itself has NO comma after it if it is the last line before the `}`.
6. Commit and check the site (Part 6). Expected result: the thumbnail appears next to that paper.

**Part 3 - add a photo credit on the thumbnail (optional; only if the thumbnail is someone else's photograph).**

Figures from Madi's own papers need no credit, so skip this part for those.

- **File to edit:** `_includes/publication-credits.html`

1. Open `_includes/publication-credits.html` for editing (section 3.2; use **Go to file** and type `credits`).
2. Press `Ctrl+F` and search for `var credits` to jump to the right spot. You are looking for this block, about two-thirds of the way down the file:
   ```js
   var credits = {
     'treefrog.jpg': 'Photo: Höbel Lab',
     'web-spider.jpg': 'Photo: Mark Yokoyama',
     'songbird-nestling.jpg': 'Photo: Dr. Rachael DiSciullo'
     // instinct-insight.jpg: composite manuscript figure, no single credit.
   };
   ```
3. Click at the end of the LAST line that has a quote mark on it (in the example, the `'songbird-nestling.jpg': ...` line) and type a comma there.
4. Press Enter and type your new line in the same shape, with no comma at the end of it:
   ```js
     'new-paper.jpg': 'Photo: Jane Photographer'
   ```
   Expected result: every credit line now ends with a comma except the last one, which is yours.
5. Double-check the file name on the left is character-for-character identical to the `preview={...}` file name from Part 2. If they differ at all, no credit appears.
6. Ignore the line that starts with `//`. That is a note to humans, not a setting.
7. Commit and check the site (Part 6). Expected result: the photographer's name shows in small text across the bottom of that thumbnail.

This file is the one and only exception to house rule 4 ("don't edit machinery"), so change nothing else in it. If the thumbnails look wrong afterwards, restore the previous version (Part 7.2).

### 5.4 Add a gallery photo

Two jobs here: upload the photo file (steps 1 to 3), then add its entry to the list of photos (steps 4 to 11). The photo does not appear on the site until BOTH are done.

1. Rename the photo on your computer to a lowercase, hyphenated name that starts with `gallery-` and ends in `.jpg`, for example `gallery-fieldwork-door-county-2026.jpg`. No spaces, no capital letters.
2. If the file is larger than about 2 MB, shrink it first. Any "resize image" tool works; aim for 1600 to 2000 pixels on the long side.
3. Upload it into the folder `assets/img/` (section 3.3: click `assets`, then `img`, then **Add file** > **Upload files**).
4. Open `_pages/gallery.md` for editing (section 3.2; use **Go to file** and type `gallery`).
5. Find the `photos:` line in the settings zone near the top. Below it is a list of entries, each three lines long, that looks like this:
   ```yaml
   photos:
     - image: assets/img/gallery-abs-2025.jpg
       caption: "Animal Behavior Society (ABS), 2025"
       year: 2025
     - image: assets/img/gallery-f-communis-2025.jpg
       caption: "<em>Frontinella communis</em> web, 2025"
       year: 2025
   ```
6. Select the three lines of any one existing entry (its `- image:` line and the `caption:` and `year:` lines under it), copy them, click at the end of that third line, press Enter, and paste. Expected result: you now have two identical entries in a row. Editing a copy is far safer than typing a new entry from scratch, because the indentation comes along for free.
   - Check the pasted `- image:` line starts at exactly the same distance from the left edge as the other `- image:` lines. The editor sometimes adds extra spaces when you press Enter. If your line is pushed further right than its neighbors, click just before the `-` and press Backspace until it lines up.
7. In your pasted copy, change the file name after `assets/img/` to the photo you uploaded in step 3. Leave the `assets/img/` part alone.
8. Change the text inside the quote marks on the `caption:` line. Keep both quote marks. This caption is what shows under the photo when a visitor clicks it.
9. Change the number on the `year:` line to the year the photo was taken. Just the four digits, no quote marks.
10. Do not fix the ordering. The grid sorts itself by year, newest first, so your entry can sit anywhere in the list and still land in the right place on the page.
11. Commit (section 3.2, steps 4 to 7) and check the Gallery page (Part 6).

**Italic species names.** To italicize a scientific name in a caption, wrap it in `<em>` and `</em>` inside the quote marks, like this: `caption: "<em>Pholcus phalangioides</em>, 2022"`. The `<em>` goes before the name and the `</em>` (note the slash) goes after it.

**If the Gallery page breaks,** it is nearly always indentation in this list. Each entry needs exactly two spaces before the `-`, and exactly four spaces before `image:`, `caption:`, and `year:`. Spaces only, never Tab. Restoring the previous version (Part 7.2) and redoing step 6 by copying an existing entry fixes it.

### 5.5 Replace the CV

The CV PDF lives at `assets/pdf/Rittinger_2026_CV.pdf`. Both the download button and the on-page preview point at that exact file name, so the simplest update is to hand GitHub a new file with the same name.

**Easiest way (recommended, one step, nothing to edit):**

1. On your computer, rename the new CV PDF to exactly `Rittinger_2026_CV.pdf`. Capital R, capital CV, underscores not spaces, character for character.
2. Upload it into the folder `assets/pdf/` (section 3.3: click `assets`, then `pdf`, then **Add file** > **Upload files**).
3. Commit and check the CV page (Part 6). Expected result: the download button gives the new PDF and the preview shows the new pages.
4. Yes, the file name still says 2026 in later years. Nobody sees the file name except you, so this is fine and is the trade for never having to edit a settings line.

**Tidier way (optional, two files to change):**

1. Rename the new PDF on your computer to a fresh name, for example `Rittinger_2027_CV.pdf`.
2. Upload it into `assets/pdf/` (section 3.3).
3. Open `_pages/cv.md` for editing (section 3.2).
4. Find the line `cv_pdf: /assets/pdf/Rittinger_2026_CV.pdf` in the settings zone near the top.
5. Change only the file name at the end of that line to your new name. Keep the `/assets/pdf/` part and the leading slash exactly as they are.
6. Commit and check the CV page (Part 6).
7. Optional cleanup: delete the old PDF from `assets/pdf/`. If you skip this, nothing breaks; the old file just sits there unused.

### 5.6 Edit the bio

- **File to edit:** `_pages/about.md`

1. Open `_pages/about.md` for editing (section 3.2).
2. Scroll to the SECOND `---` line, roughly 30 lines down. Everything below that line is the bio paragraph. Everything above it is settings, so stay out of there for this edit.
3. Edit the paragraph text directly, the way you would in a Word document. It is one single paragraph with no special formatting.
4. Leave the long dash in the "antagonizing my cat" sentence alone. It is there on purpose because it is Madi's own phrasing, and it is the one sanctioned exception to house rule 2. Change it only if Madi rewrites that sentence herself.
5. Commit (section 3.2, steps 4 to 7) and check the homepage (Part 6).

### 5.7 Update social links

These are the small round icons under the bio on the homepage.

- **File to edit:** `_data/socials.yml`

1. Open `_data/socials.yml` for editing (section 3.2; use **Go to file** and type `socials`).
2. The whole live file is these five lines. Each one is a label, a colon, and a value:
   ```yaml
   email: ritting2@uwm.edu
   orcid_id: 0000-0001-6326-1572
   scholar_userid: FAzQaf4AAAAJ
   research_gate_profile: Madison-Rittinger
   linkedin_username: madison-rittinger-5a12711b8
   ```
3. To update a link, change only the value after the colon. Never change the label before the colon.
4. Note that most of these are NOT full web addresses. `scholar_userid` is just the ID code out of the middle of the Google Scholar address; `linkedin_username` is just the last part of the LinkedIn profile address. Match the shape of what is already there rather than pasting a whole `https://...` address.
5. To HIDE one icon without deleting the line, type a `#` and a space at the very start of that line. Expected result once live: that icon disappears from the homepage. Removing the `#` again brings it back.
6. Commit (section 3.2, steps 4 to 7) and check the homepage (Part 6).

Two traps in this file, both also flagged in the file's own comment lines:
- The ResearchGate label must stay spelled exactly `research_gate_profile`. `research_gate` looks more sensible and does not work.
- The `rss_icon` line at the bottom must keep the `#` at its front. That `#` is the only thing hiding it. Uncomment that line and an unwanted RSS feed icon appears on the site.

### 5.8 Edit the research pages

The Research page shows one card per research question. Each card is its own file in the `_projects/` folder. The three that exist today are:
- `decision-making-under-uncertainty.md`
- `comparative-cognition.md`
- `individual-personality.md`

**To change an existing research question:**

1. Open the relevant file in `_projects/` for editing (section 3.2: click `_projects`, then the file).
2. In the settings zone at the top, these are the lines you may change:
   - `title:` is the card's heading.
   - `description:` is the short blurb under the heading on the card.
   - `importance: 2` controls the order on the page, lowest number first. `1` sits before `2`.
   - `category: current` puts it in the current-work section; `category: past` moves it to the past-work section. Those are the only two values that work.
   - `img:` would be a picture on the card itself. All three are currently empty (the text after `img:` starts with a `#`, which means it is a note, not a value). Leave it as it is unless you want card pictures, and then set all three, not one.
3. Press `Ctrl+F` and search for `research-body`. It finds one line, about 60 lines down, that reads `<div class="research-body" markdown="1">`. **The page's paragraphs are the text between that line and the `</div>` about 15 lines below it.** That block is the only part of the page you edit.
4. Edit those paragraphs freely. Everything outside that block is layout machinery: two `<style>` blocks, the photo tiles, and some scripts at the bottom. Leave all of it alone.
5. Commit (section 3.2, steps 4 to 7) and check the Research page (Part 6).

**To swap a photo on a research page.** This one is fiddlier than the other photo recipes, because each photo's file name appears TWICE in the file and its caption is in a third place. Change all three or the photo will half-work.

1. Rename the new image on your computer to a lowercase hyphenated name starting with `research-`, for example `research-navigation-web-2027.jpg`.
2. Upload it into `assets/img/` (section 3.3).
3. Open the research file in `_projects/` for editing and press `Ctrl+F`, then search for the OLD file name (for example `research-navigation-web.jpg`). The photos live in a block near the bottom of the file. Each photo is two lines that look like this:
   ```
   <a href="{{ '/assets/img/research-navigation-web.jpg' | relative_url }}" class="glightbox photo-tile" data-gallery="navigation-gallery" data-title="<em>Frontinella communis</em> web, 2024">
     {% include figure.liquid path="assets/img/research-navigation-web.jpg" title="" class="img-fluid" %}
   ```
4. On the FIRST line, replace the old file name with your new one, keeping the quote marks and everything else on the line intact.
5. On that same first line, update the caption, which is the text inside `data-title="..."`. Change only the words between those quote marks. If it is a species name, keep it wrapped in `<em>` and `</em>`.
6. On the SECOND line, replace the old file name with the new one again, inside `path="assets/img/..."`. This is the occurrence people forget.
7. Read both lines over and confirm the same new file name now appears twice, spelled identically.
8. Commit and check the page (Part 6). Expected result: the new photo appears as a tile, and clicking it opens the large version with your new caption.
9. If the tile shows a broken-image icon, the two file names do not match each other or do not match the uploaded file. Compare all three spellings character by character, including `.jpg` versus `.jpeg`.

**To ADD a new research question.** This is the most technical task in this guide and it is a perfectly reasonable one to hand to technical help instead. If you do it yourself, do it on a quiet day and know that Part 7.2 undoes anything.

1. Pick the existing file in `_projects/` whose page looks most like what you want, and open it by clicking its name so you are VIEWING it. Do not click the pencil icon.
2. Near the top right of the file box, click the small icon labeled **Copy raw file** (hover over the icons to find it). Expected result: nothing visible happens. The whole file is now on your clipboard. If you cannot find that icon, click **Raw**, then press `Ctrl+A` and `Ctrl+C`.
3. Create a new file in the `_projects/` folder (section 3.4). Name it after the question, lowercase with hyphens, ending in `.md`, for example `web-building-decisions.md`.
4. Paste the copied contents into the large text area (`Ctrl+V`).
5. Change the `title:` and `description:` lines, and give `importance:` a number no other file is using. The three existing files use 1, 2, and 3, so use 4. Also set `category:` to `current` or `past`.
6. Rewrite the paragraphs inside the `research-body` block (find it the same way as above). Leave everything outside that block exactly as copied; that machinery is what makes the new page look like the others.
7. Leave the photo tiles alone for now. The new page will temporarily show the copied page's photos, which looks wrong but breaks nothing.
8. Commit. Expected result: the new card appears on the Research page on its own, with no other file to update.
9. Then, as a SEPARATE change, swap each photo using the photo-swap steps above, one photo per commit. If you have fewer photos than the copied page had, delete the leftover tiles: each tile is three lines, an `<a href=...>` line, an `{% include figure.liquid ... %}` line, and a `</a>` line. Delete all three together.

### 5.9 Edit the Teaching / Mentoring page

- **File to edit:** `_pages/teaching.md`

The page is built from three sections. Everything you can see on the page (headings, paragraphs, photos, captions, which side each photo sits on) lives in the settings block at the top of the file, between the first `---` line and the second `---` line. Each section looks like this:

```
  - heading: Teaching philosophy
    photo: assets/img/mentoring-kenzie-dasek-2024.jpg
    photo_caption: Undergraduate researcher Kenzie Dasek, 2024
    photo_side: right
    text: |
      In life, we are often faced with new knowledge and must decipher
      what knowledge to trust. ...
```

The layout itself (how photos float, how text lines up on phones) lives in a different file entirely, so nothing you change here can break it. The one rule that matters is indentation: the spaces at the start of each line are how the site knows what belongs to what, so keep them exactly as they are.

**To change the words:**

1. Open `_pages/teaching.md` for editing (section 3.2; use **Go to file** and type `teaching`).
2. Find the section you want. Each starts with a `- heading:` line.
3. Its paragraphs sit under the `text: |` line. Edit the sentences, keeping two things as they are: every text line starts with the same six spaces, and paragraphs are separated by one empty line. Do not change the `text: |` line itself.
4. Commit (section 3.2, steps 4 to 7) and check the Teaching / Mentoring page (Part 6).

**To swap a photo.** Any shape of photo works: the orange frame always shows a wide 4-by-3 crop from the middle, so just keep the subject centred.

1. Rename the new image on your computer to a lowercase hyphenated name starting with `mentoring-`, for example `mentoring-lab-group-2027.jpg`.
2. Upload it into `assets/img/` (section 3.3).
3. Open `_pages/teaching.md` for editing. In the section you are changing, replace the file name on the `photo:` line, keeping the `assets/img/` part: `photo: assets/img/mentoring-lab-group-2027.jpg`
4. Update that section's `photo_caption:` line to describe the new photo.
5. Commit and check the page (Part 6).

**To move a photo to the other side:** change that section's `photo_side:` line to `left` or `right`. A `left` photo sits beside its section heading (like Courses today); `right` photos sit beside the text under the heading. Alternating sides reads best.

**To add a whole new section:** select an existing block from its `- heading:` line down to the last line of its `text:`, copy it, paste it directly after that block, and edit the copy. Keep the indentation identical to the block you copied. A section without a photo is fine: delete the `photo:`, `photo_caption:`, and `photo_side:` lines from the copy.

**Leave alone:** everything above the first `- heading:` line, and the single `{% include teaching-sections.liquid %}` line at the very bottom of the file. That line pulls in the layout; without it the page shows nothing.

**If the page looks wrong after an edit,** the cause is almost always indentation. Restore the previous version of the file (Part 7.2) and retry with a smaller change.

### 5.10 Change the profile photo or the browser-tab icon

**The homepage portrait:**

1. Crop the new photo roughly square. It sits inside the orange panel on the homepage and a square shape fills it best.
2. Rename it on your computer to exactly `prof_pic.jpg`. All lowercase, an underscore between `prof` and `pic`, and `.jpg` at the end. If your file is a `.jpeg` or `.JPG`, renaming the extension to `.jpg` is fine.
3. Upload it into `assets/img/` (section 3.3). Expected result: GitHub replaces the old file silently, with no extra question asked.
4. Commit and check the homepage (Part 6).

**Never DELETE this file.** The homepage refuses to build without something at `assets/img/prof_pic.jpg`. Always replace it, never remove it.

**The browser-tab icon (the tiny picture in the browser tab, called a favicon):**

1. Make or crop a SQUARE image, about 192 by 192 pixels. It is displayed very small, so simple shapes read better than a detailed photo.
2. Rename it on your computer to exactly `favicon.png`. Note this one is a `.png`, not a `.jpg`.
3. Upload it into `assets/img/` (section 3.3).
4. Commit and check (Part 6). Expected result: the new icon shows in the browser tab. Tab icons are cached especially stubbornly, so if the old one persists, close the tab entirely and open the site in a fresh tab.

### 5.11 Contact note, Google summary, and the subtitle under your name

**First, the sentence under the social icons and the summary Google shows.**

- **File to edit:** `_config.yml`

This file also holds machinery settings, so change ONLY the text named below and nothing else.

**These two settings are laid out differently from every other one in this guide.** Their label line ends in a `>` and the sentence you actually edit is on the NEXT line, indented by two spaces. Near the top of the file it looks like this:

```yaml
contact_note: >
  The best way to reach me is by email.
description: > # the ">" symbol means to ignore newlines until "footer_text:"
  Madison Rittinger - behavioral ecologist studying decision-making and cognition in animals. PhD candidate, UW Milwaukee.
```

The `>` is what lets a long sentence sit on its own indented line below the label. Leave the `>` and everything before it alone, including the grey comment text after `description: >`.

1. Open `_config.yml` for editing (section 3.2; use **Go to file** and type `config`).
2. Press `Ctrl+F` and search for `contact_note`. It is around line 9.
3. Edit the indented sentence on the line BELOW it: "The best way to reach me is by email." That sentence appears under the social icons on the homepage. Keep the two spaces of indentation at the start of the line.
4. To change the one-line site summary that Google shows in search results, edit the indented sentence below `description: >`, two lines further down. Same rule: keep the two spaces at the start.
5. Commit (section 3.2, steps 4 to 7) and check the homepage (Part 6).

Do not touch `blog_description` further down the file. It looks similar and is unused.

**The subtitle under the name on the homepage** ("PhD Candidate · Department of Biological Sciences · University of Wisconsin-Milwaukee") lives in a different file:

1. Open `_pages/about.md` for editing (section 3.2).
2. Find the `subtitle:` line in the settings zone near the top.
3. Change the text after the colon. Keep the ` · ` separators between the parts, with one space on each side of each dot. Those dots are what break the line into stacked lines on the page. Copy an existing ` · ` from the line rather than trying to type that character.
4. Commit and check the homepage (Part 6). Update this line whenever the title changes, for example when PhD Candidate becomes Dr., or the institution changes.

### 5.12 Remove something (news item, gallery photo, publication)

Removing is the mirror of adding. **The key idea: for photos and publications, deleting the image file is NOT what makes the item disappear. Removing its ENTRY, meaning the lines that list it, is.** Always do the entry first. Deleting an image whose entry still exists leaves a broken picture on the page.

**To remove a news item:**

1. On the repo page, click the `_news` folder, then click the file you want gone.
2. Near the top right of the file box, click the **...** (three dots) button. A menu drops down.
3. Click **Delete file**. Expected result: a page previewing the deletion, with a green commit button.
4. Commit it the same way as any edit (section 3.2, steps 4 to 7), using a message like `Remove ABS 2026 news item`.
5. That is all. Nothing else in the site refers to a news file.

In VS Code instead: right-click the file in the Explorer panel, choose **Delete**, then commit and push (section 4.4, steps 3 and 4).

**To remove a gallery photo:**

1. Open `_pages/gallery.md` for editing (section 3.2).
2. Find that photo's entry in the `photos:` list. It is three lines: the `- image:` line naming the file, plus the `caption:` and `year:` lines directly beneath it.
3. Delete all three of those lines, and no others. Expected result: the entries above and below yours are untouched and still correctly indented.
4. Commit (section 3.2, steps 4 to 7) and check the Gallery page (Part 6). The photo is gone from the page.
5. Optional: delete the image file itself from `assets/img/` using the **...** > **Delete file** steps above, just to keep the folder tidy. Skipping this changes nothing a visitor sees.

**To remove a publication:**

1. Open `_bibliography/papers.bib` for editing (section 3.2).
2. Find the paper's block. It starts with a line beginning `@article{` and ends with a `}` on its own line, usually 8 to 12 lines later.
3. Delete the whole block, from the `@article{` line down to and including that closing `}`. Expected result: the blocks above and below still each start with `@article{` and end with `}`.
   - If the paper you are deleting is the FIRST one in the file, be careful not to also delete the two `---` lines at the very top. Those must stay or the Publications page will not build.
4. Commit (section 3.2, steps 4 to 7) and check the Publications page (Part 6).
5. Optional, only if that paper had a thumbnail: delete its image from `assets/img/publication_preview/`, and remove its line from the credits list in `_includes/publication-credits.html` (recipe 5.3, Part 3). If you remove a credit line that was the last one in the list, make sure the line now last has NO comma at the end of it.

As always: one change at a time, then check the result (Part 6). If a removal ever looks wrong, restoring the previous version (Part 7.2) brings it straight back.

### 5.13 Edit the Outreach page

- **File to edit:** `_pages/outreach.md`

This page lives at madisonrittinger.org/outreach/ and is deliberately kept OUT of the top menu, so visitors only reach it if you send them the link. It is still fully public, so treat it as visible.

It is the easiest page in the site to edit: 33 lines, no `<style>` block, no photos, just three headings with a paragraph under each. **It was drafted from Madi's CV rather than written by her**, so the first edit here should be a read-through to make it sound like her.

1. Open `_pages/outreach.md` for editing (section 3.2; use **Go to file** and type `outreach`).
2. Below the settings zone you will see a line in grey that starts `<!-- DRAFT`. That is a note to yourself, invisible to visitors. Delete the whole line once you have reviewed the page, or leave it; either is fine.
3. Edit the paragraphs freely. They are ordinary sentences with no formatting to preserve.
4. Leave the `{: .mossy-section}` line that sits directly under each `## ` heading exactly where it is. It looks like a typo and it is not: it is what draws the short gold divider line above that section on the page. Deleting it removes the divider and closes up the spacing.
5. To add a section, copy an existing heading plus its `{: .mossy-section}` line plus its paragraph, paste the copy below, and rewrite all three. Keep the `## ` and the space after it at the start of the heading.
6. Commit (section 3.2, steps 4 to 7) and check madisonrittinger.org/outreach/ (Part 6).

**If you would rather this page were in the top menu:** that is a one-word change (`nav: false` to `nav: true` in the settings zone) plus a menu-position number, but it also shifts every other menu item along. Worth handing to technical help so the menu order stays sensible.

---

## Part 6: After every change - how to know it worked

Same four steps after every single change. Total wait is usually 15 to 20 minutes, most of it doing nothing.

1. **Watch the robot.** Go to https://github.com/madiritt/madiritt.github.io/actions (or click the **Actions** tab along the top of the repo page). Expected result: a list of runs, newest at the top. The top row carries your commit message, so you can confirm it is yours.
   - A spinning **yellow-brown dot** means it is still building. This takes 3 to 7 minutes. Refresh the page every couple of minutes.
   - A **green check mark** means the new version is published.
   - A **red X** means the build failed. The live site is unharmed and still showing the previous version. Go to Part 7.1.
2. **Wait out the cache.** After the green check, wait about 10 more minutes. Nothing to do in this step. The internet is still handing out saved copies of the old page, and there is no way to hurry it. Cutting this wait short is the number one reason people think an edit did not work.
3. **Hard refresh.** Open the page on the live site and force it to fetch a fresh copy: Windows `Ctrl+F5`, Mac `Cmd+Shift+R`. A normal refresh is not always enough. On a phone, close the tab completely and open the site in a new one.
4. **Look at your change.** Expected result: the new text or photo is there and the rest of the page looks normal. If the change is missing, go back to step 2 and wait longer. If the page looks broken, go to Part 7.2 and restore the previous version.

---

## Part 7: When something breaks

Stay calm: every version of every file is saved forever. Nothing is ever lost.

### 7.1 The build failed (red X in Actions)

**First, the reassurance: the live site is still up and still showing the previous version.** A failed build publishes nothing. There is no rush and no visitor sees a problem. Nine times out of ten the cause is a formatting slip in the settings zone: a missing quote mark, a missing comma, a deleted colon, or indentation done with Tab instead of spaces.

You have two choices. If you can guess the typo, do the quick fix. If you cannot, skip straight to restoring (7.2), which always works.

**Quick fix, if you know what you typed:**

1. Open the file you just edited and compare your change against the recipe's pattern, character by character. Check the colon, the space after the colon, the quote marks in pairs, and the indentation.
2. Fix it and commit. Committing anything at all starts a fresh build automatically; there is no separate retry button to press.

**If you want to see what the robot is complaining about:**

1. In the Actions tab, click the top row (the one with the red X).
2. On the left side of the page that opens, click the job name. Expected result: a long list of steps, most with green checks, one with a red X.
3. Click the step with the red X to expand it. Expected result: a wall of text, most of it meaningless.
4. Scroll to the very BOTTOM of that text. The real error is almost always in the last few red lines.
5. Skim those lines for a file name you recognize, like `gallery.md` or `papers.bib`. You do not need to understand the message. You only need to know which file to fix or restore.
6. Fix that file, or restore it with 7.2.

### 7.2 Restore a previous version of a file (the universal undo)

This works in the browser for any file, and it is the answer to almost every "I broke something" moment. The idea is simple: find the last good version of the file, copy its text, and paste it over the current broken version. You are not deleting history; you are adding a new commit that happens to contain the old text.

1. On the repo page, open the file you broke (click through the folders, or use **Go to file**, then click the file name so you are viewing it).
2. Near the top right of the file box, click **History**. Expected result: a list of every change ever made to just this one file, newest at the top. Each row shows one change with its date and its commit message.
3. Find the row for your bad change, which is normally the very top one. Click the row **directly BELOW** it. That is the version of the file from just before the problem. Expected result: a page showing what that older change did, with red and green highlighted lines.
4. Near the top right of the file box on that page, click the **...** (three dots) button, then click **View file**. Expected result: you are now looking at the complete old, good version of the file on its own page. Check the top of the page says the file name you expect.
5. Copy the whole file. The reliable way: near the top right of the file box, hover over the small icons until you find the one labeled **Copy raw file**, and click it. Expected result: nothing visible happens, or a brief "Copied!" tooltip. That is correct; the text is on your clipboard.
   - If you cannot find that icon, click the **Raw** button instead. The page turns into plain unformatted text. Then press `Ctrl+A` (Mac `Cmd+A`) and `Ctrl+C` (Mac `Cmd+C`).
   - Do NOT use `Ctrl+A` on the normal formatted file view. It grabs the page's menus and line numbers along with the code.
6. Now open the file's current broken version: go back to the repo, click through to the file, and click the **pencil icon** to edit it.
7. Click into the text, press `Ctrl+A` (Mac `Cmd+A`) to select all of it, and press Delete. Expected result: a completely empty editor. This looks alarming and is fine.
8. Press `Ctrl+V` (Mac `Cmd+V`) to paste the good version in.
9. Click the green **Commit changes...** button, type a message like `Restore previous version of gallery.md`, leave **"Commit directly to the `main` branch"** selected, and click the green **Commit changes** button.
10. Check it (Part 6). Expected result: a green check in Actions, and after the cache wait the page looks the way it did before you broke it.

### 7.3 Build is green but the site won't update

**First, before anything else:** did you wait a full 10 minutes after the green check and then do a HARD refresh (`Ctrl+F5`, Mac `Cmd+Shift+R`)? That is the answer 9 times out of 10. Go do that before reading on.

If it has been an hour and truly nothing changed, make the robot run again:

1. Go to https://github.com/madiritt/madiritt.github.io/actions
2. Click the top row, the most recent run, which is named **Deploy site**.
3. Near the top right of that page, click **Re-run all jobs**. If a small confirmation box appears, click the green **Re-run jobs** button in it.
4. Expected result: the run restarts with a spinning yellow-brown dot. Wait for the green check, then do the cache wait and hard refresh again (Part 6, steps 2 and 3).
5. This works because GitHub's publishing step occasionally times out and stalls; a re-run clears it. It is safe to do more than once.

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

### 7.6 Quick diagnosis: what the symptom usually means

Find your symptom on the left before reading anything else.

| What you're seeing | Most likely cause | Go to |
|---|---|---|
| Change isn't on the site, Actions shows a green check | You didn't wait 10 minutes, or you did a normal refresh instead of a hard refresh | Part 6, steps 2 and 3 |
| Change isn't on the site, Actions shows NO new run at all | Nothing was ever saved: in VS Code you committed but never pushed, or in the browser you never clicked the final **Commit changes** | Part 4.4 step 4, or Part 3.2 step 7 |
| Red X in Actions | A typo in the settings zone: missing quote, missing comma, deleted colon, or a Tab used for indenting | Part 7.1 |
| A page looks scrambled or half-empty | Indentation broken in that page's settings zone | Part 7.2, restore the file |
| A photo shows as a broken-image icon | The file name in the entry doesn't match the uploaded file exactly, including capital letters and `.jpg` vs `.jpeg` | The relevant recipe in Part 5 |
| A photo you uploaded doesn't appear anywhere | You uploaded the image but never added its entry | 5.4 (gallery) or 5.3 Part 2 (publication) |
| Two versions of the same photo in the folder | The replacement file name differed from the original | Part 3.3, "To replace an existing file" |
| Publications page is missing papers after an edit | A comma or a closing `}` is missing in `papers.bib` | Part 7.2, restore the file |
| Whole site is unreachable | GitHub outage, or a domain/DNS problem | Part 7.4 |
| Site is fine but not appearing in Google | Normal indexing delay, nothing is broken | Part 7.5 |

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
4. **Don't edit machinery.** Folders `_layouts`, `_sass`, `_includes`, `.github`, and the file `purgecss.config.js` are the site's engine room. The ONLY exception you'll ever need is the credits list in `_includes/publication-credits.html` (recipe 5.3). Root files `CNAME`, `Gemfile`, `Gemfile.lock`, `package.json`, `package-lock.json`, `requirements.txt` must not be deleted or renamed.
5. **One change at a time.** Make an edit, commit it, watch it go green, look at the site. Small steps make mistakes easy to find and undo.
6. **Log what you change.** The file `CHANGELOG.md` at the repo root is the site's diary. Adding a dated line about what you changed is good practice, not mandatory for small content edits.

---

## Appendix: file map cheat sheet

Section 5.0 is the version of this keyed by what you see on a page. This one is keyed by file, for when you already know the name of the thing.

| To change... | Which page it shows on | Edit... | Recipe |
|---|---|---|---|
| "Currently" status | Homepage | `_pages/about.md` (the `current:` line) | 5.1 |
| Bio paragraph | Homepage | `_pages/about.md` (text below the second `---`) | 5.6 |
| Subtitle under the name | Homepage | `_pages/about.md` (`subtitle:`) | 5.11 |
| News | Homepage (newest 5) and /news/ (all) | new file in `_news/` | 5.2 |
| Publications | /publications/, plus homepage if `selected` | `_bibliography/papers.bib` | 5.3 |
| Publication thumbnails | Same as above | image in `assets/img/publication_preview/` + `preview={...}` in the entry | 5.3 |
| Photo credits on thumbnails | Same as above | `_includes/publication-credits.html` (the credits list) | 5.3 |
| Gallery | /gallery/ | `_pages/gallery.md` (photos list) + image in `assets/img/` | 5.4 |
| CV | /cv/ | PDF in `assets/pdf/` (+ `cv_pdf:` in `_pages/cv.md` if renamed) | 5.5 |
| Research cards and pages | /research/ | files in `_projects/`, NOT `_pages/research.md` | 5.8 |
| Teaching / Mentoring | /teaching/ | `_pages/teaching.md` (words, photos, captions, sides) | 5.9 |
| Outreach | /outreach/ (not in the menu) | `_pages/outreach.md` | 5.13 |
| Social icons | Homepage | `_data/socials.yml` | 5.7 |
| Contact note under icons | Homepage | `_config.yml` (`contact_note:`, on the indented line below it) | 5.11 |
| Profile photo | Homepage | `assets/img/prof_pic.jpg` (replace, keep name) | 5.10 |
| Browser-tab icon | Every page | `assets/img/favicon.png` (replace, keep name) | 5.10 |
| Summary Google shows | Every page | `_config.yml` (`description:`, on the indented line below it) | 5.11 |
| Remove a news item / photo / publication | Wherever it appeared | delete the file or its entry | 5.12 |
| Domain / DNS / renewal | Everything | Cloudflare dashboard | Part 8 |
| Search visibility (not showing in Google) | n/a | Google Search Console | Part 7.5 |

Two section numbers worth remembering: **3.6** to practice safely, **7.6** when something is wrong and you do not know what.

**Live site:** https://madisonrittinger.org
**Repo:** https://github.com/madiritt/madiritt.github.io
**Build status:** https://github.com/madiritt/madiritt.github.io/actions
