# Demo URLs (Local)

## Start the local server

From the repo root (`c:\Users\nicol\Projects\LeadGenerator`):

```powershell
npx --yes http-server -p 5173
```

Stop the server:

- Press `CTRL + C` in the terminal

## Pages to open

### Landing page (lead capture)

- http://127.0.0.1:5173/landing/spray-foam/index.html#lead

**Verify**
- Consequences block (remortgage / release equity / sell)
- Progress % + bar + milestone chips above the form
- Footer includes:
  - Developed by Saspire (link)
  - © 2026 Carter Langfold. All Rights Reserved.

### Ad preview page (static)

- http://127.0.0.1:5173/demo/ad-preview.html

**Verify**
- Clicking CTA buttons routes to the landing page with UTMs (e.g. `utm_content=fb_feed`, `ig_story`, `carousel`) and `#lead`

### Interactive demo (device mockups)

- http://127.0.0.1:5173/demo/index.html

**Verify**
- In Facebook Feed / Instagram Feed / Instagram Story views:
  - Clicking the CTA elements routes to the landing page with UTMs and `#lead`

## Notes

- Use the `http://127.0.0.1:5173/...` URLs (not `file://...`) to avoid browser quirks/caching.
