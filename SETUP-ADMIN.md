# Setting up the editor at madisonrittinger.org/admin

**For: Trevor. One-time setup.**
**Written: July 2026.**

This turns on a web editor at https://madisonrittinger.org/admin so Madi can
change the site through forms instead of editing files. It does not change the
site itself, and the manual route in `MAINTENANCE-GUIDE.md` keeps working
exactly as it does now.

**Nothing is live yet.** Everything is on the `admin-cms` branch. The site only
rebuilds on pushes to `main`, so until you do Part 5 nothing reaches visitors.

---

## What you are building

Three pieces:

1. `admin/index.html` and `admin/config.yml` in this repo. The editor itself.
   Already written.
2. A **GitHub OAuth app**, which is what lets someone sign in. You create this.
3. A **Cloudflare Worker**, about 200 lines, already written in `admin-auth/`.
   It exists for one reason: GitHub's sign-in needs a secret that cannot be put
   in a web page, so the secret lives in the Worker instead. You deploy this.

Part 0 tests piece 1 by itself, on this computer, with no accounts. Pieces 2
and 3 exist only for the sign-in button, and there is a documented Plan B near
the end of this file that skips them both.

Who can edit is decided by GitHub, not by anything here: only accounts with
push access to `madiritt/madiritt.github.io` can save a change. Right now that
is exactly two accounts, `madiritt` and `AbysulGaming`. On top of that, the
Worker carries its own copy of that list (`ALLOWED_USERS` in
`admin-auth/wrangler.toml`) and refuses to complete a sign-in for anyone else,
so a stranger is turned away at the door instead of at their first save. To
add or remove an editor later: change the repo's Collaborators list on GitHub,
edit the `ALLOWED_USERS` line to match, and run `wrangler deploy` in the
`admin-auth` folder.

**Time needed:** about 40 minutes, most of it waiting for a build, plus about
20 minutes for the Part 0 test.

---

## Part 0: Test the whole editor first, with no accounts at all

Do this before anything else. The editor has a local mode that reads and writes
the files in `C:\Repos\madiritt.github.io` directly, with no sign-in, no OAuth
app, and no Worker. It proves every form works before you create any accounts.
The only thing this cannot test is the GitHub sign-in popup itself.

You must use **Microsoft Edge or Google Chrome** for this part. The local mode
needs a feature Firefox does not have.

1. Open PowerShell.
2. Type this and press Enter:
   `cd C:\Repos\madiritt.github.io`
   Expected result: the prompt changes to that folder. Nothing else prints.
3. Type this and press Enter:
   `git checkout admin-cms`
   Expected result: `Switched to branch 'admin-cms'`, or `Already on
   'admin-cms'`. Both are fine.
4. Type this and press Enter:
   `bundle exec jekyll serve --config _config.yml,_config.dev.yml`
   Expected result: after a few seconds, a line reading
   `Server address: http://127.0.0.1:4000/`. Leave this window open; the server
   runs until you close it or press Ctrl+C.
5. Open Edge and go to: `http://localhost:4000/admin/`
   Expected result: a dark page titled **Sveltia CMS** with a blue button
   labelled **Work with Local Repository**.
6. Click **Work with Local Repository**.
   Expected result: a folder-picker window opens.
7. Pick the folder `C:\Repos\madiritt.github.io` and click **Select Folder**.
   Edge then asks for permission to view and save changes to the folder; click
   the button that allows it.
   Expected result: the editor loads with a sidebar listing Homepage, News,
   Gallery, Research, Publications (advanced), Outreach, Teaching / Mentoring,
   CV, and Links and contact.
8. Click through every sidebar item and open the entry (or one entry) inside
   each. Expected result: every form shows the site's real current content in
   its boxes. A form showing empty boxes where content should be means that
   collection's config is wrong; stop and tell me which one.
9. While you are in the **Homepage** form: check that the **Portrait** field
   shows a small preview of the real headshot photo. A blank or broken
   preview there means the photo path mapping is wrong; tell me, but keep
   going with the rest of the test.
10. Now the round-trip test on the riskiest file. Open **Publications
    (advanced)**, click into the **BibTeX** box, go to the very end of the
    text, and press Enter once to add one blank line at the bottom.
11. Click the **Save** button (top right).
    Expected result: the button finishes without an error message. In local
    mode, Save writes straight to the file on disk; nothing is committed to
    git, so nothing can reach the live site from here.
12. Now the create-a-new-entry test. In the sidebar click **News**, then the
    button for creating a new entry (labelled **Create** or **New news
    update**, top right).
13. In the new form, leave the date as it is (today is filled in), and in the
    **What happened** box type exactly:
    `Test item, will be deleted.`
14. Click **Save**.
    Expected result: it saves without an error and the item appears in the
    News list. This tests the one thing editing cannot: what filename the
    editor invents for a brand-new item (our news files have no title, which
    is unusual, and the filename recipe leans on one).
15. Back in PowerShell: open a SECOND PowerShell window (the first one is busy
    running the server), and type this, then press Enter:
    `cd C:\Repos\madiritt.github.io`
16. Type this and press Enter:
    `git status --short`
    Expected result: a few lines starting with ` M` (files you saved), plus
    one line starting with `??` for a NEW file inside `_news\`. Look at that
    new file's name: PASS if it starts with today's date, like
    `2026-07-31-something.md`. If it is named something odd like
    `untitled.md` instead, the test still passes; just tell me the exact
    name and I will fix the filename recipe before go-live.
17. Look inside the new file. Type this, replacing BOTH `FILENAME.md` parts
    with the actual name from step 16, and press Enter:
    `Get-Content _news\FILENAME.md`
    Expected result: a block like the existing news items:
    `---`, a `layout: post` line, a `date:` line ending in
    `09:00:00-0600`, `inline: true`, `related_posts: false`, `---`, a blank
    line, then your test sentence. If the `date:` line looks different
    (for example a bare date with no time, or a `T` in the middle), the
    test still passes; tell me exactly what the line says and I will fix
    the date recipe before go-live.
18. Type this and press Enter:
    `git diff`
    Expected result for a PASS: the only changes are the ones you made on
    purpose (the blank line in `_bibliography/papers.bib`). Whitespace-only
    noise (a trailing newline) is also a pass.
    A FAIL looks like: reordered keys, deleted `#` comment lines you did not
    touch, mangled BibTeX, or changes in files you never opened. If you see
    that, copy the diff output and show me; that collection gets fixed or
    removed before go-live.
19. Type this and press Enter to throw away the edits to existing files:
    `git checkout -- .`
    Expected result: nothing prints. That is correct.
20. Type this and press Enter to delete the test news item (checkout cannot
    remove it, because it is a new file git was never told about):
    `git clean -fd _news`
    Expected result: one line starting with `Removing _news/`.
21. Type this and press Enter to confirm the repo is clean again:
    `git status`
    Expected result: `nothing to commit, working tree clean`.

If all of that passed, every form, hidden field, and file mapping is proven.
Everything after this point exists only to replace "Work with Local Repository"
with a GitHub sign-in that works from any computer.

---

## Part 1: Create the GitHub OAuth app

**Before doing this part, consider Part 1-ALT below instead.** Both produce the
same two values (a Client ID and a client secret) and everything after Part 1
is identical for both. Part 1-ALT is tighter: its app can touch only the one
site repo, while this Part's app gets whichever public repos the signed-in
account can push to. Part 1-ALT is also the experimental one; the sign-in
endpoints are identical and should behave the same, but no CMS documents it,
so treat it as try-and-see. If Part 5 step 6 fails on the Part 1-ALT app, come
back and do this Part 1 instead; the failure section at the end says how to
swap cleanly.

1. Open https://github.com/settings/developers in a browser.
2. Sign in as `madiritt` if you are not already. Use her login here, not
   `AbysulGaming`, so the site and its sign-in belong to the same account.
3. In the left sidebar, click **OAuth Apps**.
4. Click the green **New OAuth App** button.
5. In the box labelled **Application name**, type:
   `madisonrittinger.org editor`
6. In the box labelled **Homepage URL**, type:
   `https://madisonrittinger.org`
7. Leave **Application description** empty.
8. In the box labelled **Authorization callback URL**, type this for now:
   `https://example.com/callback`
   You will come back and correct this in Part 3, step 9, once the Worker exists
   and you know its real address. GitHub will not let you save the form empty.
9. Leave **Enable Device Flow** unticked.
10. Click the green **Register application** button.
11. You land on the app's settings page. Near the top it shows **Client ID**,
    a string of about 20 characters. Copy it into a scratch note. You need it in
    Part 3, step 5.
12. Below that, click the **Generate a new client secret** button. You may be
    asked for your password or 2FA code.
13. A secret appears, about 40 characters, shown **once**. Copy it into the same
    scratch note. If you lose it before Part 3 you can generate another; the old
    one stops working.
14. Leave this browser tab open. You come back to it in Part 3, step 9.

---

## Part 1-ALT: Create a GitHub App instead (the experiment, preferred if it works)

Do either this or Part 1, not both. Why this one is better if it works: a
GitHub App is installed on exactly one repository with exactly one permission
(this repo, contents), so a leaked token cannot touch anything else at all,
and to revoke everything at once you uninstall the app. The sign-in screens
GitHub shows are almost identical either way.

These steps name the form fields as they exist in July 2026; GitHub moves
labels around occasionally, so if a field is missing look for a similar name
before assuming the recipe is wrong.

1. Open https://github.com/settings/apps/new in a browser.
2. Sign in as `madiritt` if you are not already. Use her login, not
   `AbysulGaming`, so the site and its sign-in belong to the same account.
3. In the box labelled **GitHub App name**, type:
   `madisonrittinger.org editor`
4. In the box labelled **Homepage URL**, type:
   `https://madisonrittinger.org`
5. In the section **Identifying and authorizing users**, in the box labelled
   **Callback URL**, type this for now:
   `https://example.com/callback`
   You will correct it in Part 3, step 9, exactly as with the Part 1 route.
6. Still in that section, UNTICK the box labelled
   **Expire user authorization tokens**. It is ticked by default. Unticking it
   makes the app behave exactly like the Part 1 app for our purposes. (Leaving
   it ticked is a possible later hardening: tokens then die after 8 hours and
   the editor must refresh them. The Worker already passes the refresh token
   through if this is ever turned on, but that mode is untested; start with
   the box unticked.)
7. Leave **Request user authorization (OAuth) during installation** unticked.
8. Scroll to the section headed **Webhook**. UNTICK the box labelled
   **Active**. This matters: with it ticked, the form demands a webhook URL we
   do not have, and will not save.
9. Scroll to **Permissions**. Click **Repository permissions** to expand it.
10. Find the row named **Contents**. In its dropdown (which reads
    **No access**), choose **Read and write**.
    Expected result: a note appears saying **Metadata** was set to read-only
    automatically. That is correct; change nothing else.
11. At the question **Where can this GitHub App be installed?**, choose
    **Only on this account**.
12. Click the green **Create GitHub App** button.
13. You land on the app's settings page. Near the top it shows **Client ID**
    (for GitHub Apps it starts with `Iv`). Copy it into a scratch note. It
    plays the same role as Part 1 step 11's Client ID in everything that
    follows.
14. Under the heading **Client secrets**, click **Generate a new client
    secret**. You may be asked for your password or 2FA code. Copy the secret
    shown into the same scratch note; it is shown once, and plays the same
    role as Part 1 step 13's secret.
15. The app now exists but is installed nowhere, so it can reach nothing. In
    the LEFT sidebar of the app's settings page, click **Install App**.
16. A row appears for the `madiritt` account. Click its green **Install**
    button.
17. On the next screen, choose **Only select repositories**, open the
    repository dropdown, and tick `madiritt/madiritt.github.io`.
18. Click the green **Install** button.
    Expected result: you land on the installation's settings page. The app is
    now allowed to touch that one repo and nothing else.
19. Leave the browser tab open. Part 3, step 9 comes back here: the callback
    URL box for this route lives at
    https://github.com/settings/apps -> your app -> **General**.

One honest unknown, flagged: when YOU sign in (as `AbysulGaming`, a
collaborator rather than the app's owner), GitHub may show an extra approval
screen the first time. Approve it; if saving as AbysulGaming then fails where
it worked for madiritt, tell me exactly what the error says. That is the
try-and-see part of this experiment.

---

## Part 2: Install the Cloudflare command-line tool

Skip to Part 3 if `wrangler --version` already prints a version number.

1. Open PowerShell.
2. Type this and press Enter:
   `npm install -g wrangler`
   Expected result: a few lines of install output, ending without the word
   `ERR!`. It takes a minute or two.
3. Type this and press Enter:
   `wrangler --version`
   Expected result: a version number prints. If instead you get
   "not recognized", close PowerShell, open a new one, and try again; the PATH
   needs a fresh shell.

---

## Part 3: Deploy the Worker

1. In PowerShell, type this and press Enter:
   `cd C:\Repos\madiritt.github.io\admin-auth`
   Expected result: the prompt now ends with `admin-auth>`. Nothing else prints.
2. Type this and press Enter:
   `wrangler login`
   Expected result: a browser window opens asking you to authorise Wrangler for
   your Cloudflare account. Click **Allow**. The browser then says you may close
   the tab, and PowerShell prints that you are logged in.
3. Type this and press Enter:
   `wrangler deploy`
   Expected result: several lines of output ending with a URL of the form
   `https://madiritt-admin-auth.SOMETHING.workers.dev`, where `SOMETHING` is
   your own Cloudflare subdomain. **Copy that whole URL into your scratch note.**
   This is the Worker's real address.
4. The Worker is deployed but has no secrets yet, so it cannot work. The next two
   steps fix that.
5. Type this and press Enter:
   `wrangler secret put GITHUB_CLIENT_ID`
   Expected result: it prompts for a value. Paste the **Client ID** from your
   scratch note (Part 1 step 11, or Part 1-ALT step 13) and press Enter. It
   prints that the secret was uploaded. The value is not echoed to the screen
   as you paste; that is correct.
6. Type this and press Enter:
   `wrangler secret put GITHUB_CLIENT_SECRET`
   Expected result: same prompt. Paste the **client secret** from your scratch
   note (Part 1 step 13, or Part 1-ALT step 14) and press Enter.
7. Type this and press Enter to confirm both landed:
   `wrangler secret list`
   Expected result: a short list naming `GITHUB_CLIENT_ID` and
   `GITHUB_CLIENT_SECRET`. The values are never shown, only the names. That is
   correct and is the point.
8. Open the Worker URL from step 3 in a browser. Expected result: a plain page
   reading "This address only handles signing in to the editor". That means the
   Worker is alive. Seeing a Cloudflare error page instead means the deploy
   failed; re-read step 3's output for the reason.
9. Go back to the GitHub browser tab from Part 1 (the box is labelled
   **Authorization callback URL**) or Part 1-ALT (labelled **Callback URL**,
   on the app's **General** page). Delete `https://example.com/callback` and
   type your Worker URL followed by `/callback`. For example, if step 3 printed
   `https://madiritt-admin-auth.trevor.workers.dev`, then type:
   `https://madiritt-admin-auth.trevor.workers.dev/callback`
10. Click the green **Update application** button at the bottom of that GitHub
    page. Expected result: the page reloads showing your new callback URL.

---

## Part 4: Point the editor at your Worker

1. Open `C:\Repos\madiritt.github.io\admin\config.yml` in VS Code.
2. Find this line, near the top, inside the `backend:` block:
   `  base_url: https://madiritt-admin-auth.WORKERS-SUBDOMAIN.workers.dev`
3. Replace that whole address with the Worker URL from Part 3 step 3, with **no**
   `/callback` on the end and **no** trailing slash. The line should end up
   looking like:
   `  base_url: https://madiritt-admin-auth.trevor.workers.dev`
4. Save the file with `Ctrl+S`.
5. In PowerShell, type this and press Enter:
   `cd C:\Repos\madiritt.github.io`
6. Type this and press Enter:
   `git add admin/config.yml`
7. Type this and press Enter:
   `git commit -m "Admin: point the editor at the deployed OAuth worker"`
   Expected result: one line confirming one file changed.

---

## Part 5: Go live

This is the step that puts the editor on the real site.

1. In PowerShell, type this and press Enter:
   `git checkout main`
2. Type this and press Enter:
   `git merge admin-cms`
   Expected result: a summary listing the added files. No conflicts, because
   nothing on `main` has touched these files.
3. Type this and press Enter:
   `git push origin main`
4. Open https://github.com/madiritt/madiritt.github.io/actions and wait for the
   top row to show a green check. This takes 3 to 7 minutes.
5. Open https://madisonrittinger.org/admin/ in a browser. Expected result: a
   sign-in screen with a button offering to sign in with GitHub.
6. Click that button. A popup opens on github.com asking you to authorise
   `madisonrittinger.org editor`. Click the green **Authorize** button.
7. Expected result: the popup closes and the editor loads, showing a sidebar
   with Homepage, News, Gallery, Research, Publications (advanced), Outreach,
   Teaching / Mentoring, CV, and Links and contact.
8. Make one small real edit to prove the whole chain works: open **Homepage**,
   change the Currently line, and click the **Save** button (top right). In
   this signed-in mode, Save commits straight to the repo, which is what
   triggers the site to rebuild.
9. Watch the Actions tab again for a green check, then hard-refresh
   https://madisonrittinger.org with `Ctrl+F5`. Expected result: your change is
   on the homepage. The editor is working.
10. Have Madi repeat steps 5 to 7 on her own computer with her own login. She
    should see the same thing. If she does, both of you are set up and you are
    finished.

---

## Part 6: Optional hardening, a second gate in front of the sign-in

Do this only AFTER Part 5 works end to end, so you are never debugging two new
systems at once. It puts Cloudflare's own login screen (a one-time code sent
by email) in front of the Worker, so nobody even reaches the GitHub sign-in
without first proving they own one of two email addresses. It costs nothing on
the free plan.

Written from Cloudflare's docs as of July 2026 but NOT yet exercised by us, so
treat labels as approximate and expect small differences: the feature is the
**Enable Cloudflare Access** button on the Worker's workers.dev route.

1. Open https://dash.cloudflare.com and sign in.
2. In the left sidebar, click **Workers & Pages**.
3. Click the Worker named `madiritt-admin-auth`.
4. Go to **Settings**, then **Domains & Routes**.
5. On the `workers.dev` row, click **Enable Cloudflare Access**.
   Expected result: Access turns on with an auto-created policy named
   `madiritt-admin-auth - Production`.
6. Click **Manage Cloudflare Access** (or open the Zero Trust dashboard and
   find that policy under Access > Policies).
7. Edit the policy so the ONLY include rule is **Emails**, listing exactly:
   `trevornoelb@gmail.com` and Madi's email (confirm with her which one she
   wants to use; her GitHub commits use `mrittinger44@gmail.com`).
8. Save the policy.
9. Test the gate alone: open the Worker URL in a private/incognito window.
   Expected result: a Cloudflare Access page asking for an email, not the
   Worker's own "This address only handles signing in" page. Enter your email,
   get the code from your inbox, enter it, and THEN the Worker page shows.
10. Test the whole chain: open https://madisonrittinger.org/admin/ and sign
    in. Expected result: the popup shows the Access email step first (only
    when its session has expired, roughly daily by default), then the usual
    GitHub authorisation, then the editor.

Note for the future: with Access in front, the sign-in popup's first hop goes
through Cloudflare's login, which can strip the Referer the Worker uses to
learn which page opened it. In production that is harmless (the fallback IS
the production site); it only matters if someone someday tries the full
GitHub sign-in from localhost, which nothing in our workflow does (local
editing uses Part 0's local mode instead).

To back it out: same Settings page, disable Access on the route. The sign-in
returns to GitHub-only.

---

## Plan B: skip the OAuth pieces entirely (access token sign-in)

The editor's sign-in screen has a third button, **Sign In Using Access Token**.
It works with no OAuth app and no Worker: you paste a GitHub token instead of
clicking through a popup. This means Parts 1 to 3 are OPTIONAL. If the Worker
ever fights us, or you want the editor live today, this path works now:

1. Sign in to GitHub in a browser as the account that will edit (`madiritt` for
   Madi, `AbysulGaming` for you).
2. Go to https://github.com/settings/personal-access-tokens/new
3. In **Token name**, type: `madisonrittinger.org editor`
4. Under **Expiration**, pick **No expiration** (or 1 year if you prefer; an
   expired token just means repeating this list).
5. Under **Repository access**, choose **Only select repositories**, then pick
   `madiritt/madiritt.github.io`. (For the AbysulGaming account this is under
   the madiritt owner; if the repo is not listed, the account lacks access.)
6. Under **Permissions**, expand **Repository permissions**, find **Contents**,
   and set it to **Read and write**. Leave everything else at No access.
7. Click **Generate token** and copy the token shown (it starts with
   `github_pat_`). It is shown once; store it in a password manager.
8. On the /admin sign-in screen, click **Sign In Using Access Token**, paste
   it, and confirm. The editor loads exactly as it would after OAuth.

Trade-off, stated plainly: the OAuth route is one click forever; this route
means keeping a token somewhere safe and pasting it when the browser forgets
it. Fine for you; worse for Madi day-to-day. A fine-grained token scoped this
way can touch ONLY this one repo's contents, which is actually tighter than
the OAuth app's `public_repo` scope.

---

## If it does not work

**The sign-in popup opens and closes but the editor stays on the sign-in screen.**
This is the most likely failure and it is nearly always the callback URL. Check
that Part 3 step 9 has the Worker address with `/callback` on the end, and that
Part 4 step 3 has the same address **without** `/callback`. One with, one
without. Also open the browser console (`F12`) on the /admin page and read the
red lines; a mismatch usually names the origin it refused.

**GitHub says "The redirect_uri MUST match the registered callback URL".**
Part 3 step 9 does not exactly match what the Worker sends. Re-copy the Worker
URL from Part 3 step 3, add `/callback`, and save the GitHub form again.

**You used Part 1-ALT and sign-in or saving fails in a way nothing above
explains.** The experiment did not pan out; swap to the boring route. The swap
is clean because everything except the app itself is identical: (1) do Part 1
and get its Client ID and secret; (2) re-run Part 3 steps 5 and 6 to overwrite
the two Worker secrets with the new values; (3) do Part 3 step 9 on the NEW
app's form; (4) on https://github.com/settings/apps, open the old GitHub App,
scroll to the **Danger zone**, and click **Delete GitHub App**. Nothing else
changes and nothing needs rebuilding.

**The sign-in ends with: The account "..." is not one of this site's editors.**
Working as designed if the account really is a stranger. If it is YOUR account
being refused, the name is missing from the `ALLOWED_USERS` line in
`admin-auth/wrangler.toml`: fix the line, then run `wrangler deploy` in that
folder. The comparison ignores capital letters, so capitalisation is never the
problem.

**The editor loads but saving fails with a permissions error.**
The signed-in account lacks push access. Check
https://github.com/madiritt/madiritt.github.io/settings/access and confirm the
account is listed.

**A page on the site breaks after an edit in the editor.**
Use Part 7.2 of `MAINTENANCE-GUIDE.md` to restore the previous version of that
file, then tell me which field caused it. The likeliest cause is a front-matter
key that exists in the file but is not declared in `admin/config.yml`, which
means the editor dropped it on save. The fix is to add it there as a hidden
field.

## Backing it out completely

If you decide against the whole thing:

1. `git rm -r admin` then commit and push. The `/admin` page stops existing.
2. In the `admin-auth` folder, `wrangler delete`. The Worker stops existing.
3. Delete the app you registered: for the Part 1 route, on
   https://github.com/settings/developers open the OAuth app and click
   **Delete application**; for the Part 1-ALT route, on
   https://github.com/settings/apps open the GitHub App and use
   **Delete GitHub App** in the Danger zone.

The site itself is untouched by all three, because nothing about the published
site depends on the editor.
