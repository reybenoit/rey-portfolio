# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page portfolio website — pure HTML5 and CSS3, no JavaScript framework, no build tools, no dependencies. Everything lives in `index.html` (31KB).

## Development

No build step required. Open `index.html` directly in a browser or serve it locally:

```bash
python3 -m http.server 8000
# or
npx serve .
```

## Deployment

Hosted on **Netlify**, auto-deployed from this GitHub repo. Production is the `main` branch.

To avoid metered production builds for in-progress work, use the **PR deploy preview** flow — never commit directly to `main`:

1. Work on the `develop` branch (or a feature branch).
2. Commit and push to that branch.
3. Open a **pull request** into `main`. Netlify builds a free, unlimited **Deploy Preview** at `deploy-preview-<#>--<site>.netlify.app` and posts the link in the PR. Each subsequent push updates the same preview — no production deploy.
4. When the preview looks right, **merge the PR into `main`** → triggers the single production deploy.

```bash
# on develop
git add -A && git commit -m "..." && git push   # updates the PR's Deploy Preview only
# after merging the PR on GitHub:
git checkout main && git pull
git checkout develop && git merge main && git push   # keep develop in sync
```

Netlify dashboard settings (Site configuration → Build & deploy): **Deploy Previews** enabled for PRs; **Branch deploys** set to **None** (so plain `develop` pushes don't trigger metered builds — only PR previews, which are free).

`netlify.toml` pins `publish = "."` with no build command (static site, no build step).

## Architecture

All code is in a single `index.html` file with embedded `<style>` and no external JS.

**Page sections** (in order, linked via anchor IDs):
- `#home` — Hero with fade-in animation and CTA
- `#about` — Two-column bio + philosophy
- Values — Three-column card grid
- Impact — Dark background stat grid
- `#work` — Case study cards (metadata left, description right)
- `#contact` — CTA + email link
- Footer

**Design system** (CSS custom properties at the top of `<style>`):

| Variable     | Value       | Usage                        |
|--------------|-------------|------------------------------|
| `--bg`       | `#F7F6F2`   | Light cream background       |
| `--bg-dark`  | `#1A1A2E`   | Dark navy sections           |
| `--accent`   | `#3A6BC4`   | Blue accent (borders, links) |
| `--font-d`   | Epilogue    | Display/headings             |
| `--font-b`   | Inter       | Body text                    |
| `--max`      | `1200px`    | Container max-width          |
| `--pad`      | `80px`      | Standard section padding     |

**Responsive breakpoints:**
- `≤900px` — tablets: single-column layouts, nav links hidden
- `≤600px` — mobile: additional padding/font reductions

Typography uses `clamp()` throughout for fluid scaling between breakpoints.

**Recurring patterns:**
- Dark sections use a CSS grid texture overlay (radial-gradient dot pattern)
- Glass-morphism nav: `backdrop-filter: blur`
- Fade-up entry animations with staggered `animation-delay`
- Case study cards: accent `border-top` + two-column grid (metadata | description)
