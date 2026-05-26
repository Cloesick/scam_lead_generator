# Tracking Setup (GTM + GA4 + Meta)

This repo is a **static** Vercel deployment, so the simplest way to manage tracking is to use **Google Tag Manager (GTM)**.

## Recommended approach

- Use **one GTM container** for the domain
- Configure inside GTM:
  - GA4 Configuration tag
  - GA4 Events (optional)
  - Google Ads conversion tracking
  - Meta Pixel

This keeps the repo safe to demo (no hard-coded IDs) and makes changes without code deploys.

## 1) Create a GA4 property

- In Google Analytics, create a GA4 property for the deployed domain.
- Note the **Measurement ID** (format: `G-XXXXXXXXXX`).

## 2) Create a GTM container

- In Google Tag Manager, create a Web container for the deployed domain.
- Note the **Container ID** (format: `GTM-XXXXXXX`).

## 3) Add GTM to the landing page (code)

The landing page already supports GTM injection via:

```js
window.__LP_CONFIG__ = {
  phoneE164: '+441218208966',
  leadWebhookUrl: '',
  gtmId: ''
};
```

### What to do

- Edit `landing/spray-foam/index.html`
- Set:
  - `gtmId: 'GTM-XXXXXXX'`

Deploy to Vercel.

### Verify

- Open the landing page
- In GTM Preview mode, confirm container is loaded
- In GA4 Realtime, confirm `page_view`

## 4) Configure GA4 in GTM

### Required tags

- **GA4 Configuration** tag
  - Measurement ID: `G-XXXXXXXXXX`
  - Trigger: All Pages

### Optional events (recommended)

The landing page pushes dataLayer events you can use:

- `page_view_lp`
- `cta_click`
- `lead_submit`

In GTM, create GA4 Event tags for these (trigger on Custom Event names above).

Suggested mapping:

- `lead_submit` -> GA4 event name: `generate_lead`
  - include parameters:
    - `cta` (from dataLayer)
    - `page` (from dataLayer)

## 5) Google Ads conversion tracking (via GTM)

- Link GA4 <-> Google Ads (recommended)
- Import the `generate_lead` conversion from GA4 into Google Ads

Alternative:
- Use a Google Ads Conversion tag in GTM triggered by `lead_submit`

## 6) Meta Pixel (Business Suite) via GTM

Recommended:
- Add Meta Pixel via GTM using either:
  - a template tag (if available in your GTM workspace)
  - or a Custom HTML tag

Trigger:
- All Pages (base pixel)

For lead conversion:
- Trigger on `lead_submit`
- Fire `Lead` event

## 7) Business Suite / Events Manager checks

- Confirm Pixel is receiving PageView
- Confirm Lead events fire on form submit
- Confirm domain verification (Meta)

## Notes / caveats

- The form currently runs with `leadWebhookUrl: ''`, meaning it does **not** send lead data to a server. This is good for demos.
- For production lead delivery, you’ll need:
  - a backend endpoint/webhook, or
  - a form provider, or
  - a serverless function

