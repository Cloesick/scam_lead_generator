# Vercel Demo Guide (scam_lead_generator)

This Vercel deployment hosts a set of **static demo pages** (HTML/CSS/JS) for previewing ad creatives and a landing page flow.

## Start here

- Demo home (recommended):
  - `https://YOUR-VERCEL-DOMAIN/`
  - This redirects to: `https://YOUR-VERCEL-DOMAIN/demo/index.html`

## Pages included

### 1) Interactive demo (device mockups)

- `https://YOUR-VERCEL-DOMAIN/demo/index.html`

**What to do**

- Switch between the Facebook/Instagram mockups.
- Click the CTA elements.

**What to verify**

- CTAs navigate to the landing page.
- The landing page URL includes:
  - UTM parameters (example: `utm_content=fb_feed`, `ig_story`, `carousel`)
  - The `#lead` anchor

### 2) Ad preview page (static)

- `https://YOUR-VERCEL-DOMAIN/demo/ad-preview.html`

**What to verify**

- CTA buttons route to the landing page with UTMs + `#lead`.

### 3) Landing page (lead capture)

- `https://YOUR-VERCEL-DOMAIN/landing/spray-foam/index.html#lead`

**What to verify**

- Consequences block (remortgage / release equity / sell)
- Progress percentage + progress bar + milestone chips above the form
- Footer includes:
  - Developed by Saspire (link)
  - © 2026 Carter Langfold. All Rights Reserved.

## Notes / troubleshooting

- Use the deployed URLs (or local `http://127.0.0.1:PORT/...`) instead of opening files via `file://...`.
- If you don’t see updates after a redeploy:
  - Hard refresh the browser (Ctrl+F5)
  - Or open in an incognito/private window.

## Local demo (optional)

From the repo root, you can run a local static server:

```powershell
npx --yes http-server -p 5173
```

Then open:

- `http://127.0.0.1:5173/demo/index.html`
- `http://127.0.0.1:5173/demo/ad-preview.html`
- `http://127.0.0.1:5173/landing/spray-foam/index.html#lead`
