# Launch Runbook (Cloudflare Pages)

## Deploy
1. Connect repository to Cloudflare Pages.
2. Build command: none.
3. Output directory: `docs`.
4. Set production branch to `main`.
5. Configure custom domain and enforce HTTPS.

## Post-deploy checks
- Confirm redirects and canonical host behavior.
- Validate headers from `docs/_headers`.
- Confirm `robots.txt` + `sitemap.xml` are reachable.
- Submit sitemap in Google Search Console and Bing Webmaster Tools.
- Verify Cloudflare Web Analytics or Plausible script receives events.

## Local preflight before push
Run these from the repo root:
- `python3 scripts/preflight.py`
- `python3 scripts/validate_schema.py`

## Rollback
- Re-deploy the previous successful commit from Pages dashboard.
- If rollback is not available, revert release commit in Git and redeploy.

## Weekly ops
- Check crawl/index coverage.
- Review Core Web Vitals and largest pages.
- Validate top affiliate links and disclosure visibility.
