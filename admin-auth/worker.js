/**
 * OAuth broker for madisonrittinger.org/admin
 * =============================================================================
 * WHY THIS EXISTS
 * GitHub's OAuth flow hands back a short-lived `code` that must be swapped for
 * an access token, and that swap needs the app's client secret. A secret cannot
 * live in browser JavaScript, and GitHub Pages serves only static files, so
 * there is no server on our side to hold it. This Worker is that server, and
 * doing nothing else keeps it small enough to audit in one sitting.
 *
 * WHAT IT DOES NOT DO
 * It performs no authorisation of its own. Anyone may complete the sign-in and
 * receive a token for their own GitHub account. Whether that account can change
 * the site is decided by GitHub, which rejects a commit from anyone without
 * push access to madiritt/madiritt.github.io. Two accounts have it today.
 *
 * ENDPOINTS
 *   GET /auth      Starts the flow. Redirects to GitHub's consent screen.
 *   GET /callback  GitHub returns here. Swaps the code, hands the token to the
 *                  editor window that opened the popup, and closes it.
 *
 * SECRETS (set with `wrangler secret put`, never committed)
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 */

/* Only these origins may receive a token. Anything else is refused, so the
   Worker cannot be used as a token relay for some other site. */
const ALLOWED_ORIGINS = [
  "https://madisonrittinger.org",
  "https://www.madisonrittinger.org",
  "http://localhost:4000", // local `jekyll serve` for testing
];

/* The repo is public, so `public_repo` is enough to commit to it. This is
   deliberately NOT `repo`: that would also hand over write access to every
   private repository the signed-in person can reach. */
const SCOPE = "public_repo";

const COOKIE = "adminauthstate";

function html(body, status = 200) {
  return new Response(`<!doctype html><meta charset="utf-8">${body}`, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

/** A short random string, used to tie /callback back to the /auth that began it. */
function newState() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function readCookie(request, name) {
  const jar = request.headers.get("Cookie") || "";
  const hit = jar.split(/;\s*/).find((c) => c.startsWith(name + "="));
  return hit ? hit.slice(name.length + 1) : null;
}

/**
 * The page returned to the popup. The editor listens for a postMessage from
 * this window, so the popup announces itself, waits for the editor to answer,
 * then sends the token to that exact origin.
 */
function relayPage(payload, targetOrigin) {
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");
  return html(`<title>Signing in</title>
<p style="font-family:system-ui;padding:2rem;text-align:center">Signing you in...</p>
<script>
  (function () {
    var message = 'authorization:github:${payload.token ? "success" : "error"}:' + ${JSON.stringify(json)};
    var target = ${JSON.stringify(targetOrigin)};

    function send() {
      if (window.opener) { window.opener.postMessage(message, target); }
    }
    // The editor replies once it is listening; send the token only to it.
    window.addEventListener('message', function (e) {
      if (e.origin === target) { send(); }
    }, false);
    // Announce that this popup is ready.
    if (window.opener) { window.opener.postMessage('authorizing:github', target); }
    // Belt and braces: some browsers deliver the reply before the listener is
    // attached, so send once more shortly after.
    setTimeout(send, 500);
  })();
</script>`);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    /* ---- start the flow ------------------------------------------------- */
    if (url.pathname === "/auth") {
      /* Which editor page opened the popup? Sveltia does not send its origin
         in the query string (its `site_id` param is a bare domain, and from
         localhost it is literally "cms.netlify.com", a Netlify-era relic), so
         the reliable signal is the Referer header: browsers send at least the
         origin on cross-site navigations under the default referrer policy.
         Fall back to the production origin if the header is absent. The token
         is only ever postMessage'd to this origin, so a wrong guess fails
         closed: the message is simply not delivered. */
      let origin = ALLOWED_ORIGINS[0];
      const referer = request.headers.get("Referer");
      if (referer) {
        try {
          const refOrigin = new URL(referer).origin;
          if (ALLOWED_ORIGINS.includes(refOrigin)) origin = refOrigin;
        } catch {
          /* unparseable Referer: keep the default */
        }
      }

      if (!env.GITHUB_CLIENT_ID) {
        return html("<p>This Worker is missing GITHUB_CLIENT_ID. See SETUP-ADMIN.md Part 3.</p>", 500);
      }

      const state = newState();
      const to = new URL("https://github.com/login/oauth/authorize");
      to.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
      to.searchParams.set("scope", SCOPE);
      to.searchParams.set("state", state);
      to.searchParams.set("redirect_uri", `${url.origin}/callback`);

      return new Response(null, {
        status: 302,
        headers: {
          Location: to.toString(),
          // Pairs this request with its callback. HttpOnly so page scripts
          // cannot read it; SameSite=Lax survives GitHub's redirect back.
          "Set-Cookie": `${COOKIE}=${state}|${encodeURIComponent(origin)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
        },
      });
    }

    /* ---- GitHub sends the visitor back here ----------------------------- */
    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      const jar = readCookie(request, COOKIE);

      /* The state cookie is one-time-use: whatever happens next, expire it so
         a stale value cannot be replayed within its 10-minute window. */
      const clearState = (response) => {
        response.headers.append(
          "Set-Cookie",
          `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
        );
        return response;
      };

      if (!code || !state || !jar) {
        return html("<p>Sign-in did not complete. Close this window and try again.</p>", 400);
      }

      const [wantState, rawOrigin] = jar.split("|");
      const origin = decodeURIComponent(rawOrigin || "");

      if (state !== wantState) {
        return clearState(html("<p>Sign-in could not be verified. Close this window and try again.</p>", 400));
      }
      if (!ALLOWED_ORIGINS.includes(origin)) {
        return clearState(html("<p>That site is not allowed to use this sign-in.</p>", 403));
      }

      /* A thrown fetch (network trouble between Cloudflare and GitHub) would
         otherwise surface as a bare Worker exception page; catch it and tell
         the editor instead, which shows the message on the sign-in screen. */
      let data;
      try {
        const res = await fetch("https://github.com/login/oauth/access_token", {
          method: "POST",
          headers: { "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: `${url.origin}/callback`,
          }),
        });
        if (!res.ok) {
          return clearState(relayPage({ error: "GitHub refused the sign-in. Try again." }, origin));
        }
        data = await res.json();
      } catch {
        return clearState(
          relayPage({ error: "Could not reach GitHub to finish signing in. Try again." }, origin)
        );
      }

      if (data.error || !data.access_token) {
        return clearState(relayPage(
          { error: data.error_description || "GitHub did not return a token." },
          origin
        ));
      }

      /* OAuth Apps return only access_token. GitHub Apps (which use these
         same two endpoints) can also return refresh_token when user-token
         expiration is enabled. Sveltia's auth client understands an optional
         refreshToken key, so pass it through when present; for OAuth Apps
         this branch simply never fires. */
      const payload = { token: data.access_token, provider: "github" };
      if (data.refresh_token) payload.refreshToken = data.refresh_token;

      return clearState(relayPage(payload, origin));
    }

    /* ---- anything else -------------------------------------------------- */
    return html(
      `<title>Admin sign-in</title>
       <p style="font-family:system-ui;padding:2rem;max-width:44ch;margin:auto">
         This address only handles signing in to the editor for
         madisonrittinger.org. There is nothing to see here.
         <a href="https://madisonrittinger.org/admin/">Open the editor</a>.
       </p>`,
      404
    );
  },
};
