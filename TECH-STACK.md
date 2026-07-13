# Tech stack: madiritt.github.io

> Madison Rittinger's academic website. Pulled from the repo's actual config files
> (`Gemfile` / `Gemfile.lock`, `package.json`, `requirements.txt`, `.github/workflows/deploy.yml`,
> `_config.yml`, `purgecss.config.js`) on 2026-06-24. Versions are the pinned/locked ones.

---

## At a glance

| Layer | Choice |
|---|---|
| Site generator | Jekyll 4.4.1 (Ruby) |
| Theme | al-folio, delivered as the `al_folio_core` 1.0.11 gem (+ al_folio_* companion gems) |
| Styling | Tailwind CSS v4 (`style_engine: tailwind`, entry `assets/tailwind/app.css`) + compiled SCSS `main.css` |
| Custom design | "Mossy Modernist" palette/hero in local `_sass/_mossy.scss` (overrides theme CSS vars) |
| Bibliography | jekyll-scholar 7.3.0 (BibTeX -> publications) |
| Image pipeline | jekyll-imagemagick 1.4.0 -> responsive WebP (quality 85) |
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`) |
| Hosting | GitHub Pages, served from the `gh-pages` branch |
| Source branch | `main` (push triggers build) |
| Registrar/DNS | Cloudflare (final domain madisonrittinger.org) |
| TLS | Let's Encrypt via GitHub Pages |

---

## Build toolchain (three runtimes)

The production build on GitHub Actions wires together Ruby, Python, and Node in one job:

| Runtime | CI version | Role |
|---|---|---|
| Ruby | 3.3.5 (`ruby/setup-ruby@v1`, bundler-cache) | Runs Jekyll + all `:jekyll_plugins` |
| Python | 3.13 (`actions/setup-python@v5`, pip cache) | `nbconvert` (notebooks), `rendercv`, `scholarly` |
| Node | 20 (`actions/setup-node@v4`, npm cache) | `npm ci` for dev/test deps; PurgeCSS step |
| Bundler | 4.0.6 (`BUNDLED WITH`) | Gem resolution |
| ImageMagick | apt-installed in CI | Responsive WebP generation |

Local dev mirrors this with Ruby 3.3.11 + DevKit and Node 26 (Python/ImageMagick intentionally NOT installed locally; `_config.dev.yml` disables imagemagick so no binary is needed).

---

## Ruby gems

### Jekyll core
- `jekyll` **4.4.1**
- `nokogiri` **1.19.3** (HTML/XML parsing, pulled by several plugins)

### al-folio theme gems (pinned)
- `al_folio_core` **1.0.11** (theme runtime: layouts, includes, sass, assets)
- `al_icons` **1.0.0**
- `al_folio_cv` 1.0.0
- `al_folio_distill` 1.0.2
- `al_folio_upgrade` 1.0.3
- `al_folio_bootstrap_compat` 1.0.0
- `al_cookie` 1.0.0
- `al_analytics` 1.0.0
- `al_citations` 1.0.1
- `al_ext_posts` 1.0.1
- `al_img_tools` 1.0.2
- `al_search` 1.0.2
- `al_charts` 1.0.1
- `al_math` 1.0.1
- `al_comments` 1.0.0
- `al_newsletter` 1.0.0

### Jekyll plugins (`:jekyll_plugins` group)
- `jekyll-scholar` **7.3.0** (BibTeX publications; configured to bold "Rittinger")
- `jekyll-imagemagick` **1.4.0** (responsive WebP)
- `jekyll-3rd-party-libraries`
- `jekyll-archives-v2`
- `jekyll-cache-bust`
- `jekyll-email-protect`
- `jekyll-feed`
- `jekyll-get-json`
- `jekyll-jupyter-notebook` (note: hard-crashes the build if `jupyter` is off PATH; demo notebook removed)
- `jekyll-link-attributes`
- `jekyll-minifier`
- `jekyll-paginate-v2`
- `jekyll-regex-replace`
- `jekyll-sitemap`
- `jekyll-socials`
- `jekyll-tabs`
- `jekyll-terser` (from a Git fork: RobertoJBeltran/jekyll-terser)
- `jekyll-toc`
- `jekyll-twitter-plugin`
- `jemoji`
- `classifier-reborn` (content categorization at build)

### Support gems (`:other_plugins`)
- `css_parser`, `observer` (for jekyll-scholar), `ostruct` (for jekyll-twitter-plugin)

---

## Node / npm

Node is used only for build tooling and tests, not for serving. No runtime JS framework.

### devDependencies (`package.json`)
- `@playwright/test` ^1.56.1 (visual regression tests, `test/visual/`)
- `@shopify/prettier-plugin-liquid` ^1.10.0
- `prettier` ^3.8.0 (formatting / lint)
- `pixelmatch` ^7.1.0 + `pngjs` ^7.0.0 (pixel-diffing for visual snapshots)

### Installed globally in CI
- `purgecss` (dead-CSS removal step; configured via `purgecss.config.js`)

### npm scripts
- `lint:prettier`, `lint:style-contract` (`test/style_contract.js`), `test:visual`, `test:visual:update`

---

## Python

`requirements.txt`:
- `nbconvert` (Jupyter notebook -> HTML during build)
- `pyyaml`
- `rendercv[full]` (CV rendering)
- `scholarly` (Google Scholar data)

---

## Styling architecture

- **Engine:** Tailwind CSS **v4**, built by the `al_folio_core` gem inside `jekyll build` (no separate npm build for local serve). Entry: `assets/tailwind/app.css`.
- **Two stylesheets load in `head.liquid`:** `/assets/css/tailwind.css` (Tailwind build) then `/assets/css/main.css` (compiled from the gem's SCSS pipeline) - `main.css` loads LAST, so local SCSS overrides win.
- **Palette is CSS custom properties** (`--global-bg-color`, `--global-theme-color`, `--global-hover-color`, `--global-card-bg-color`, etc.) defined in the gem's `_sass/_themes.scss`; light values in `:root`, dark in `html[data-theme="dark"]`.
- **Custom layer:** local `_sass/_mossy.scss` ("Mossy Modernist") redefines those vars and adds the 2-column hero, atmospheric gradient, pastel-orange portrait panel, "Currently" element, research-card grid, and the orb-weaver web background. Local `_layouts/about.liquid` overrides the gem's homepage layout.
- **CSS minification:** handled upstream (Tailwind ships minified; `main.scss` compiled with sass `style: compressed`). `cssminify2` is intentionally disabled. PurgeCSS strips unused classes post-build (with a safelist for runtime-injected classes like Bootstrap collapse + medium-zoom).
- **Dark mode:** enabled (`enable_darkmode: true`).

---

## Site features enabled (`_config.yml`)
- `search_enabled: true` (al_search)
- `enable_math: true` (MathJax via al_math)
- `style_engine: tailwind`
- Identity: `first_name: Madison`, `last_name: Rittinger` (`title: blank` -> full name used)
- `url: https://madisonrittinger.org`, `baseurl:` (root); repo-root `CNAME` file carries the custom domain onto gh-pages each deploy
- Responsive images: `imagemagick.enabled: true`, multiple widths, WebP at quality 85

---

## CI/CD pipeline (`deploy.yml`)

Single `Deploy site` workflow (all other al-folio workflows removed). Trigger: push/PR to `main` (or `master`) on content paths, plus manual `workflow_dispatch`.

Steps:
1. Checkout
2. Setup Ruby 3.3.5 (bundler-cache)
3. Setup Python 3.13 (pip cache)
4. Setup Node 20 (npm cache)
5. `npm ci`
6. Inject `giscus.repo` into `_config.yml` (yaml-update-action)
7. Install ImageMagick + upgrade nbconvert, then `JEKYLL_ENV=production bundle exec jekyll build`
8. PurgeCSS
9. Deploy `_site/` to `gh-pages` (`JamesIves/github-pages-deploy-action@v4`), skipped on PRs

Typical run: ~1 min observed (CLAUDE.md notes 3-7 min budget). `permissions: contents: write`.

> Known CI warning: `actions/checkout@v4`, `setup-node@v4`, `setup-python@v5` still target Node 20 (deprecating on runners; auto-forced to Node 24 for now). Bump when convenient.

---

## Files the build depends on (do NOT delete)
`Gemfile` + `Gemfile.lock`, `package.json` + `package-lock.json`, `requirements.txt`, `purgecss.config.js`, and the `giscus` key block in `_config.yml`. Audit `deploy.yml` before removing any root-level config file.
