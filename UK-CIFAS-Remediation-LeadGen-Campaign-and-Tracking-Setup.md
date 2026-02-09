# UK CIFAS Remediation Lead-Gen Campaign (Google + Meta)

## Scope and guardrails (read first)
This plan is designed to generate leads from UK homeowners who believe they were misled by the Carter Langfold pseudo-legal mortgage scam and now face mortgage rejection due to a CIFAS fraud marker.

Hard requirements:
- No claims of guaranteed outcomes (e.g., “we will remove your CIFAS marker”, “guaranteed mortgage approval”).
- No impersonation or affiliation claims (do not imply partnership with CIFAS, banks, FCA, or the FOS).
- Treat this as **financial services / credit** advertising on Meta (Special Ad Category) and comply with Google Ads financial services policies.
- Collect the minimum data needed at lead capture; request DSAR documents only after a secure intake step.
- GDPR + UK PECR: marketing consent must be explicit, granular, and **unticked by default**.

Assumption: you are a legitimate provider (or you have a regulated/authorised partner) capable of delivering the promised remediation service.

---

## 1) Funnel design (high-level)

### 1.1 Primary offer
- **Free 10–15 minute eligibility / case triage call**
- Deliverable: “Next steps plan” (DSAR request guidance + marker challenge route)

### 1.2 Funnel stages
- **Stage A: High-intent capture (Google Search)**
  - Users actively searching for CIFAS marker help.
- **Stage B: Broad awareness + trust building (Meta Lead Ads / Landing Page)**
  - Broad + geo targeting due to Special Ad Category constraints.
- **Stage C: Retargeting (Meta + Google)**
  - Retarget site visitors and form openers.
- **Stage D: Qualification + offline conversion feedback loop**
  - Mark qualified leads in CRM and send offline conversions back to Google/Meta.

---

## 2) Google Ads campaign (lead capture)

### 2.1 Campaign types
- **Search (core)**
  - Goal: Leads.
  - Bidding: start with Maximize Conversions after you have stable conversion tracking; otherwise start with Manual CPC + eCPC or Max Clicks with tight negatives.
- Optional later:
  - **Performance Max** only after you have clean conversion signals + strong assets.
  - **YouTube** for trust-building if you can produce credible, compliant video.

### 2.2 Geo targeting (No Scotland)
- Target: England, Wales, Northern Ireland
- Exclude: Scotland
- Location option: **“Presence: People in or regularly in your targeted locations”** (avoid “interest”)

### 2.3 Keyword architecture (starter)
Create 3–5 tightly themed ad groups.

Ad group: CIFAS marker removal
- cifas marker removal
- remove cifas marker
- cifas first party fraud marker
- cifas misuse of facility
- cifas marker challenge

Ad group: Mortgage rejected / fraud marker
- mortgage application rejected cifas
- mortgage declined fraud marker
- why am i flagged cifas

Ad group: Scam-specific (careful tone)
- carter langfold mortgage scam
- carterlangfold cifas marker
- promissory note mortgage scam uk

Negatives (starter)
- jobs, careers, salary
- free template, pdf, download
- “do it yourself” (optional, depends on strategy)
- “freeman on the land” (optional: may attract ideology traffic, low conversion quality)

### 2.4 Ad copy principles
- Avoid sensationalism.
- Lead with empathy and clarity.
- Use compliant phrasing:
  - “case assessment”, “challenging incorrectly applied markers”, “support with complaint/appeal pathways”.

Example RSA elements (do not copy verbatim; tailor to your service)
- Headlines:
  - “CIFAS Marker Support for Misled Victims”
  - “Mortgage Declined? Get a Case Review”
  - “Understand Your CIFAS Options (UK)”
- Descriptions:
  - “If you were misled into submitting invalid ‘payment’ documents, you may have options. Book a confidential triage call.”
  - “No guarantees. We review your situation and explain possible next steps (DSAR, lender complaint, FOS route).”

### 2.5 Landing page requirements (if using LP)
- Clear identity: legal entity name, address, contact details.
- Clear service scope + disclaimers (no guaranteed outcomes).
- Privacy policy + consent controls.
- Form fields (minimal):
  - Full name
  - Email
  - Phone
  - Postcode (for geo qualification)
  - “What happened?” (short textarea)
  - Consent checkboxes (marketing optional; service contact required)

---

## 3) Meta campaign (lead capture)

### 3.1 Special Ad Category
You must declare **Special Ad Category: Credit**.

Implications:
- No targeting by age, gender, or detailed interests.
- Lookalikes are replaced by **Special Ad Audiences**.

### 3.2 Geo targeting (No Scotland)
Meta’s UK country-level targeting is not reliably divisible into “England/Wales/NI as countries.” Use one of these robust patterns:

Preferred pattern (precision):
- **Postcode targeting**: include only English/Welsh/NI postcode prefixes; exclude Scottish prefixes (e.g., EH, G, AB, DD, FK, HS, IV, KA, KW, KY, ML, PA, PH, TD, ZE).

Alternative (simpler, less precise):
- Include UK
- Exclude Scotland regions/cities via location exclusions (may require manual maintenance)

### 3.3 Campaign structure
Campaign 1: Prospecting (Lead)
- Objective: Leads
- Conversion location:
  - Option A: **Instant Form** (highest volume)
  - Option B: Website (higher quality)
- Ad sets:
  - Broad + geo only (postcodes)
  - Special Ad Audience (once you have seed data)

Campaign 2: Retargeting (Leads)
- Objective: Leads
- Audiences:
  - Website visitors (last 30/60/90 days)
  - Instant form openers (if available)
  - Video viewers (if you run video assets)

### 3.4 Creative requirements (trust-first)
Recommended formats:
- 30–45s talking head (credible spokesperson, clear disclaimers)
- Carousel (step-by-step recovery path)
- Static: simple, non-clickbait

Messaging framework:
- Problem: “Mortgage declined after being misled?”
- Context: “Some victims receive CIFAS markers after submitting invalid instruments.”
- Solution: “We can assess your situation and explain your options.”
- Disclaimer: “No guarantees; outcomes depend on your circumstances.”

### 3.5 Instant Form design (what’s possible vs not)
Meta Instant Forms do **not** allow custom JavaScript, so you cannot implement true address autocomplete or email domain suggestions inside the form.

Do this instead:
- Use Meta’s built-in prefill fields.
- Use structured questions:
  - “Where do you live?” (postcode)
  - “Did you submit a promissory note/administrative document to your lender?” (Yes/No/Not sure)
  - “Do you have a CIFAS marker?” (Yes/No/Not sure)
  - “Best time to call” (multiple choice)
- Keep 5–8 questions max.

If you need high-end UX (autocomplete, validation), use a website landing page.

---

## 4) Tracking and attribution (GA4/GTM + Google Ads + Meta)

### 4.1 Canonical approach
Use **Google Tag Manager (GTM)** as the tag deployment layer and configure:
- GA4
- Google Ads conversion tag (and enhanced conversions if applicable)
- Meta Pixel
- Optional: Meta Conversions API (CAPI)

### 4.2 UTM standard (required)
Ad links should include UTMs.

Recommended:
- utm_source = google | facebook | instagram
- utm_medium = cpc | paid_social
- utm_campaign = {campaign_name}
- utm_content = {ad_name_or_creative}
- utm_term = {keyword} (Google only)

### 4.3 Events and conversions (define once)
Define a single “Lead” conversion that means a real submission.

Website form path:
- GA4 event: `generate_lead`
- Google Ads conversion: “Lead (Form Submit)”
- Meta event: `Lead`

Instant Form path:
- Meta has native lead reporting.
- Still push leads into CRM and send **offline conversions** back (see 4.6).

### 4.4 Google Analytics 4 (GA4) configuration
- Create GA4 property
- Data stream: Web
- Ensure:
  - Cross-domain measurement (if you use multiple domains)
  - Internal traffic filters (office IPs)
  - DebugView enabled for testing
- Mark `generate_lead` as a **Key event**

### 4.5 Google Ads configuration
- Link Google Ads ↔ GA4 (Admin → Product links)
- Conversion setup options:
  - Preferred: Google Ads conversion tag via GTM (for bidding reliability)
  - Optional: import GA4 key events as conversions
- If collecting email/phone on the website, consider **Enhanced Conversions** (hashing) for better match rates.

### 4.6 Offline conversion imports (strongly recommended)
To avoid optimizing for low-quality/bot leads:
- In CRM, define stages:
  - Lead
  - Qualified Lead
  - Consult Booked
  - Case Accepted
- Send offline events back:
  - Google Ads: import “Qualified Lead” / “Consult Booked” as secondary conversions
  - Meta: send Offline Conversions or CAPI events with appropriate match keys

---

## 5) Meta platform configuration checklist

### 5.1 Business Manager basics
- Business verification (if possible)
- Ad Account created + payment method
- People/partners access configured (least privilege)

### 5.2 Pixel setup
- Create Meta Pixel
- Install via GTM (recommended) or directly
- Verify firing with Meta Pixel Helper

### 5.3 Conversions API (CAPI) (recommended)
- If you have a server/CRM integration, configure CAPI to improve signal quality.
- Ensure deduplication using `event_id` (Pixel + CAPI).

### 5.4 Domain verification + AEM
- Verify domain in Business Manager
- Configure Aggregated Event Measurement (AEM): prioritize events
  - 1) Lead
  - 2) ViewContent (optional)

### 5.5 Special Ad Category
- Ensure every campaign is flagged as **Credit**.
- Expect reduced targeting granularity; compensate with creative + conversion quality feedback (offline conversions).

---

## 6) Launch QA checklist (do not skip)
- Meta:
  - Pixel firing on all pages
  - Lead event fires only on true submit/thank-you
  - Special Ad Category set to Credit
  - Geo exclusion validated (Scotland excluded)
- Google:
  - Conversions verified in Google Ads (test lead)
  - Location setting = Presence
  - Negative keywords applied
- GA4:
  - `generate_lead` visible in DebugView
  - UTMs present and consistent
- Compliance:
  - Privacy policy accessible
  - Consent checkboxes unticked
  - No guaranteed-outcome claims in ads or landing page

---

## 7) What I still need from you to finalize this into a production-ready build
Answer these so we can tighten the plan and avoid policy/account bans:
1) Who is the service provider (legal entity) and are they regulated/authorised (FCA/solicitor) or a referral partner?
2) Are you using a website landing page, Meta Instant Forms, or both?
3) Which CRM will receive leads (HubSpot / Salesforce / custom)?
4) Do you need call tracking (dynamic number insertion) and call-as-conversion?
