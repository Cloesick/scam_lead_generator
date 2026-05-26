# scam_lead_generator

Static demo + landing pages for lead-generation campaigns.

## Documentation

- `docs/README.md`

## Quick start (local)

From the repo root:

```powershell
npx --yes http-server -p 5173
```

Open:

- `http://127.0.0.1:5173/demo/index.html`
- `http://127.0.0.1:5173/demo/ad-preview.html`
- `http://127.0.0.1:5173/landing/spray-foam/index.html#lead`

## Deploy (Vercel)

This repo is static and deploys cleanly on Vercel.

- Framework preset: **Other**
- Build command: **none**
- Output directory: **root**

`vercel.json` redirects `/` to `/demo/index.html`.

## SEO

- Keyword library: `SEO-WORDBOOK.md` (see also `docs/seo/README.md`)
- Technical SEO basics:
  - `robots.txt`
  - `sitemap.xml`

After deploying, replace `YOUR-VERCEL-DOMAIN` placeholders inside:

- `robots.txt`
- `sitemap.xml`

Then submit the sitemap in Google Search Console:

- `https://YOUR-VERCEL-DOMAIN/sitemap.xml`

## Tracking / Analytics

See `TRACKING-SETUP.md` (see also `docs/technical/README.md`) for:

- Google Tag Manager + GA4 setup
- Google Ads conversion tracking (via GTM)
- Meta Pixel (via GTM)

## User guide

- `VERCEL-DEMO-GUIDE.md` (see also `docs/how-to/README.md`)
