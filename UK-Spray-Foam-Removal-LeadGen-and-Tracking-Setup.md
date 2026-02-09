# UK Spray Foam Removal Lead-Gen (Google + Meta) + Tracking Setup

## 0) Scope and non-negotiables
Goal: generate leads UK-wide **excluding Scotland** for Carter Langfold’s **spray foam removal** service (and related building/roofing work), aimed at homeowners impacted by problematic spray foam insulation that can affect valuation/mortgageability.

Non-negotiables:
- Do **not** advertise finance, credit, “monthly payments”, or “apply for finance” in ads or landing pages. (This avoids Special Ad Category / regulated-finance complications.)
- Avoid unprovable accusations like “scam” unless you have documented evidence and your legal team approves that wording.
  - Recommended phrasing: “spray foam insulation issues”, “mortgage/valuation problems linked to spray foam”, “removal and remediation”.
- No guarantees: don’t claim “we will restore mortgage eligibility” or “guaranteed valuation increase”.
- GDPR/UK PECR: explicit consent for marketing; service-contact consent can be separate.

---

## 1) Due diligence you still must do (I cannot safely ‘guess’ this)
You asked me to find the Companies House details “myself”. I attempted web lookups but did **not** get a reliable match for the exact legal entity behind `carterlangfold.com`.

Before running paid ads, you must obtain from the client (in writing):
- Legal entity name (as per Companies House)
- Company number
- Registered address
- Trading address (if different)

Why: ad platforms (and users) will treat missing/incorrect business identity as a trust risk.

---

## 2) Website readiness checklist (fix before traffic)
From the pages I was able to fetch:
- The contact page contains a **Calendly** link that appears to be a placeholder (`https://calendly.com/`).
- The phone link (`tel:`) appears inconsistent with the displayed UK number.
- Multiple pages show “ADDRESS” without clearly surfaced address content.

Landing page added in this repo:
- `landing/spray-foam/index.html`
- `landing/spray-foam/styles.css`
- `landing/spray-foam/app.js`

Must-have pages/UX:
- Contact page: real booking link, real phone link, real address
- Privacy policy + cookie policy + terms
- Consent banner (if cookies/marketing tags run)
- Dedicated service landing page for spray foam removal (not a thin “Everything about…” stub)

Landing page configuration (no secrets hardcoded):
- In `landing/spray-foam/index.html`, set `window.__LP_CONFIG__`:
  - `phoneE164` (e.g., `+441218208966`)
  - `leadWebhookUrl` (HTTPS endpoint to receive lead JSON; leave empty to disable network submission)
  - `gtmId` (e.g., `GTM-XXXXXXX`; optional)

Local preview:
- Open `landing/spray-foam/index.html` in a browser, or
- Serve the repo with any static server (recommended if you want consistent form behavior and asset loading).

---

## 3) Positioning (what you’re actually selling)
Primary offer (recommended):
- “Spray foam removal assessment + quote” (free/paid — specify)

Value propositions (compliant):
- “Safe, efficient removal of spray foam insulation”
- “Prepare loft/roof space for compliant improvements”
- “Documentation/photos for your records” (only if you actually provide)

Avoid:
- “We fix mortgage problems” (unless you have a clear, legally reviewed claim)
- “We undo a scam” (defamation/policy risk)

---

## 4) Google Ads (core acquisition)

### 4.1 Campaign type
- **Search** only to start (highest intent)

### 4.2 Locations (No Scotland)
- Target: England, Wales, Northern Ireland
- Exclude: Scotland
- Location option: **Presence: People in or regularly in your targeted locations**

### 4.3 Suggested campaign structure
Campaign: Spray Foam Removal | UK ex-Scotland

Ad group 1: Spray foam removal (high intent)
- spray foam removal
- remove spray foam insulation
- spray foam insulation removal cost
- loft spray foam removal

Ad group 2: Mortgage / valuation issue intent (careful copy)
- spray foam mortgage problem
- spray foam insulation mortgage refused
- spray foam insulation house valuation
- is spray foam insulation a problem for mortgage

Ad group 3: Local-modifiers (use broad coverage + location insertion)
- spray foam removal near me
- spray foam removal company

Negatives (starter)
- diy
- kit
- machine
- jobs
- training
- wholesale
- “spray foam install” (if you only want removals)

### 4.4 Landing page routing
- Ads should land on: `/services/spray-foam-removal-*` (a dedicated page with proof + process + CTA)
- Add clear CTA above the fold: “Book assessment” / “Get quote”

### 4.5 Ad copy constraints
- Don’t promise outcomes.
- Don’t claim to be government/insurer.

Example direction (write your own final copy):
- Headline ideas:
  - “Spray Foam Removal Specialists”
  - “Remove Problematic Loft Spray Foam”
  - “Assessment + Removal Plan (UK)”
- Description ideas:
  - “If spray foam is affecting your home, we can assess and remove safely. Book a call for next steps.”

---

## 5) Meta Ads (scale + remarketing)

### 5.1 Special Ad Category
If you avoid finance/credit wording and do not offer credit in the ad itself, this is typically **not** a Special Ad Category campaign.

### 5.2 Geo (No Scotland)
Meta geo is less deterministic than Google. Recommended:
- Target: UK
- Exclude: Scotland (regions/cities) OR use postcode include lists for England/Wales/NI.

### 5.3 Campaign structure
Campaign A: Prospecting | Leads (Website)
- Objective: Leads
- Conversion location: Website
- Ad sets:
  - Broad homeowners interests (home improvement, roofing, loft conversions)
  - Lookalikes only after you have legitimate seed data

Campaign B: Retargeting | Leads
- Audiences:
  - Website visitors 30/60/90 days
  - Engaged users (video viewers, page engagers)

### 5.4 Creative angles (compliant)
- Angle 1: “Is your loft spray foam causing issues?”
- Angle 2: “Before/after + process transparency” (only if real)
- Angle 3: “What happens during a spray foam removal assessment?”

Avoid:
- Shock content
- Calling specific companies “scammers”

---

## 6) Tracking and attribution (GTM + GA4 + Google Ads + Meta)

### 6.1 Use GTM as the deployment layer
Install via Google Tag Manager:
- GA4 configuration tag
- Google Ads conversion tag
- Meta Pixel

### 6.2 Conversion definition
Primary conversion: **Quote Request / Book Assessment**

Implementation options:
- If using Calendly or external booking:
  - Track `generate_lead` on confirmed booking page / event
- If using a contact form:
  - Track on true success state (server-confirmed), not button click

### 6.3 GA4 setup
- Create event: `generate_lead`
- Mark as Key event
- Add internal traffic filters

### 6.4 Google Ads setup
- Prefer Google Ads conversion tag (via GTM) for bidding
- Link GA4 ↔ Google Ads

### 6.5 Meta setup
- Pixel installed via GTM
- Event: `Lead` on true completion

### 6.6 UTMs (required)
Standardize UTMs across platforms:
- utm_source: google | facebook | instagram
- utm_medium: cpc | paid_social
- utm_campaign: spray_foam_removal_uk_ex_scotland
- utm_content: creative_name
- utm_term: keyword (Google only)

---

## 7) Lead quality and operational workflow
- Form fields (minimal): name, phone, email, postcode, short description
- Auto-response: confirm receipt + set expectations (no promises)
- Qualification questions (optional):
  - “Is the spray foam in the loft/roof?”
  - “Has a lender/valuer raised concerns?”

---

## 8) What I need from you to finalize ads and avoid bans
Reply with:
1) The **exact landing page URL** you want to use for spray foam removal (or confirm we’re using the existing service page).
2) Confirmation: will ad copy say **“scam”**? If yes, provide the evidence basis and legal approval path.
3) Client legal identity (company name + number + address) to place in site footer and for platform verification.
