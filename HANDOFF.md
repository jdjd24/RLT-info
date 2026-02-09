# RLT-info Handoff for New LLM

## Project Overview
- Project: `RLT-info`
- Repo path: `/Users/jackdai/dev/pet-projects/RLT-info`
- Site type: static HTML/CSS/JS under `docs/`
- Deploy target: Cloudflare Pages
- Canonical domain: `https://theredlightmethod.com`
- Main objective: consumer-facing red light therapy site with strong SEO + LLM discoverability and practical review/calculator UX.

## Current Navigation and IA
- Top nav includes:
  - Home
  - Benefits
  - Product Reviews (hover dropdown):
    - Panels -> `best-red-light-therapy-panel-for-home.html`
    - Masks -> `best-red-light-therapy-mask.html`
  - How long should I use my device for? -> `calculator.html`
  - Dose Science
  - Thought Leaders
  - About
- Product reviews are split:
  - Hub page: `docs/reviews.html`
  - Panels page: `docs/best-red-light-therapy-panel-for-home.html`
  - Masks page: `docs/best-red-light-therapy-mask.html`

## Key Functional Areas
- Reviews:
  - Summary rankings + detailed cards in `docs/reviews.html`
  - Long-form panel reviews in `docs/panel-reviews.html` and per-product files
  - Long-form mask reviews in `docs/mask-reviews.html` and per-product files
- Calculator:
  - UI: `docs/calculator.html`
  - Logic: `docs/assets/calculator.js`
  - Dose model currently treats `dose` as per-session J/cm2 and uses weekly total = session * frequency
  - Whole-body wellness studies show in protocol tables but are excluded from recommendation summary calculations
- Styling:
  - Global styles in `docs/assets/styles.css`
  - Dropdown hover fix already applied (no gap between trigger and menu)

## SEO / LLMO State
- Implemented:
  - Canonicals and metadata across core pages
  - Structured data on major pages
  - `docs/robots.txt`, `docs/sitemap.xml`, `docs/llms.txt`, `docs/security.txt`
  - Internal linking between core intent pages
  - Landing pages for key intents already present
- Current high-intent pages:
  - `docs/best-red-light-therapy-panel-for-home.html`
  - `docs/best-red-light-therapy-mask.html`
  - `docs/reviews.html`
  - `docs/benefits.html`
  - `docs/calculator.html`
  - `docs/research.html`

## Validation and CI
- Local checks to run before commit:
  - `python3 scripts/preflight.py`
  - `python3 scripts/validate_schema.py`
- CI:
  - GitHub Actions workflow: `.github/workflows/site-ci.yml`
  - Known prior issues included Lighthouse threshold and headless browser sandboxing in pa11y/puppeteer.

## Editing Rules from Product Owner (Important)
- Highly iterative copy/design workflow; user often gives exact text to paste.
- Preserve user-provided wording unless explicitly asked to revise.
- Prior requests:
  - keep pages consumer-friendly and scannable
  - avoid unnecessary technical over-explaining in visible copy
  - do not break image proportions in review cards
  - keep panel/mask logic clearly separated where requested

## Recent Important UX Decisions
- Removed panel-vs-mask references in some prominent spots where user found them unhelpful.
- Homepage Popular Guides now includes calculator card instead of dosing mistakes card.
- Dropdown labels simplified to `Panels` and `Masks`.
- Panels and masks content moved to dedicated pages while keeping overall review hub.

## Known Content/Logic Notes
- Calculator label was clarified:
  - protocol column: `Dose (per session)`
- Calculator includes note:
  - "This calculator is aimed at panels, not masks."

## Deployment Workflow
- Branch: `main` is production source.
- Push to `origin/main` triggers deployment workflow.
- Cloudflare Pages serves static output from `docs/`.

## Suggested First Checks for Any New Session
1. `git status` and `git log --oneline -n 8`
2. Open these files first:
   - `docs/reviews.html`
   - `docs/index.html`
   - `docs/calculator.html`
   - `docs/assets/calculator.js`
   - `docs/assets/styles.css`
3. Run:
   - `python3 scripts/preflight.py`
   - `python3 scripts/validate_schema.py`
4. If user reports UI bug, inspect desktop + mobile layout impact before patching.

## Definition of Done for Changes
- User-requested copy/layout changes applied exactly.
- No regressions in nav, review cards, calculator summary, or image rendering.
- Local preflight and schema validation pass.
- Commit message clear; push to `main`.
