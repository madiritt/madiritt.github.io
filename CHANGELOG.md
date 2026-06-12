# Changelog

All notable changes to Madison Rittinger's academic website.
Format based on Keep a Changelog. No em-dashes anywhere (project rule).

This repo-level changelog begins at the point work moved into the repo itself
(VS Code / Claude Code). Earlier design-iteration history lives in Trevor's
Claude project outputs and is summarized in CLAUDE.md.

---

## [Unreleased]

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
- Next: Mossy Modernist design port into SCSS (Phase 4); content fill in parallel (Phase 3)

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
