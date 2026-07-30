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

Who can edit is decided by GitHub, not by anything here. Anyone can reach the
sign-in page and sign in; only accounts with push access to
`madiritt/madiritt.github.io` can actually save a change. Right now that is
exactly two accounts, `madiritt` and `AbysulGaming`. To add or remove an editor
later, change the repo's Collaborators list and nothing else.

**Time needed:** about 40 minutes, most of it waiting for a build.

---

## Part 1: Create the GitHub OAuth app

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
   Expected result: it prompts for a value. Paste the **Client ID** from Part 1
   step 11 and press Enter. It prints that the secret was uploaded. The value is
   not echoed to the screen as you paste; that is correct.
6. Type this and press Enter:
   `wrangler secret put GITHUB_CLIENT_SECRET`
   Expected result: same prompt. Paste the **client secret** from Part 1 step 13
   and press Enter.
7. Type this and press Enter to confirm both landed:
   `wrangler secret list`
   Expected result: a short list naming `GITHUB_CLIENT_ID` and
   `GITHUB_CLIENT_SECRET`. The values are never shown, only the names. That is
   correct and is the point.
8. Open the Worker URL from step 3 in a browser. Expected result: a plain page
   reading "This address only handles signing in to the editor". That means the
   Worker is alive. Seeing a Cloudflare error page instead means the deploy
   failed; re-read step 3's output for the reason.
9. Go back to the GitHub browser tab from Part 1. In the
   **Authorization callback URL** box, delete `https://example.com/callback` and
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
   with Homepage, News, Gallery, Research, Outreach, CV, and Links and contact.
8. Make one small real edit to prove the whole chain works: open **Homepage**,
   change the Currently line, and click the publish button.
9. Watch the Actions tab again for a green check, then hard-refresh
   https://madisonrittinger.org with `Ctrl+F5`. Expected result: your change is
   on the homepage. The editor is working.
10. Have Madi repeat steps 5 to 7 on her own computer with her own login. She
    should see the same thing. If she does, both of you are set up and you are
    finished.

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
3. On https://github.com/settings/developers, open the OAuth app and click
   **Delete application**.

The site itself is untouched by all three, because nothing about the published
site depends on the editor.
