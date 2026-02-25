# Canva + Make.com Automation — Insulation Campaign

> This document provides step-by-step instructions to:
> 1. Set up **Canva templates** with dynamic text/image placeholders
> 2. Connect them to **Make.com** (formerly Integromat) for automated batch generation
> 3. Auto-generate all ad creatives at scale from a single data source

---

## HOW THIS WORKS

```
Google Sheet (data) → Make.com (automation) → Canva API (design generation) → Export to Google Drive / direct upload to Meta Ads
```

1. You create **Canva templates** with placeholder text fields (e.g., `{{headline}}`, `{{description}}`)
2. You build a **Google Sheet** with rows of ad variations (headlines, descriptions, CTA text, image URLs)
3. **Make.com** reads each row, calls the Canva API to generate a design with that data, and exports the result

---

## PART 1: CANVA TEMPLATE SETUP

### Template 1 — Facebook Feed Ad (1200 x 628 px)

Create in Canva → **Custom Size: 1200 x 628 px**

**Layout:**
```
┌─────────────────────────────────────────┐
│                                         │
│          [BACKGROUND IMAGE]             │
│        (full bleed, dark overlay)       │
│                                         │
│     ┌─────────────────────────┐         │
│     │   {{headline}}          │         │
│     │   (White, Inter Bold,   │         │
│     │    40px, centred)       │         │
│     └─────────────────────────┘         │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  {{subheadline}}                │    │
│  │  (White, Inter Regular, 20px)   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌──────────────────┐                   │
│  │  {{cta_text}}     │  ← #2563EB bg   │
│  │  (White, Bold)    │    rounded rect  │
│  └──────────────────┘                   │
│                                         │
│                          [LOGO]         │
└─────────────────────────────────────────┘
```

**How to set up placeholders in Canva:**
1. Add a text box for the headline → type the placeholder text exactly: `{{headline}}`
2. Add a text box for subheadline → type: `{{subheadline}}`
3. Add a text box inside a rounded rectangle for CTA → type: `{{cta_text}}`
4. Style each text box with the correct font, size, colour, and position
5. Add your logo in the bottom-right corner (static — doesn't change)
6. Set the background image as a placeholder → this will be swapped via Make.com
7. **Save as a Canva Template** (File → Save as Template)

**Note the Template ID** — you'll need it in Make.com. Find it in the URL:
`https://www.canva.com/design/XXXXXXXXXXXXX/edit` → the `XXXXXXXXXXXXX` is your template ID.

---

### Template 2 — Instagram Feed Ad (1080 x 1080 px)

Create in Canva → **Custom Size: 1080 x 1080 px**

**Layout:**
```
┌───────────────────────────┐
│                           │
│    [BACKGROUND IMAGE]     │
│    (full bleed, slight    │
│     dark overlay)         │
│                           │
│                           │
│ ┌───────────────────────┐ │
│ │  {{headline}}         │ │
│ │  (White, Bold, 36px)  │ │
│ ├───────────────────────┤ │
│ │  {{subheadline}}      │ │
│ │  (White, Regular, 18px│ │
│ └───────────────────────┘ │
│                           │
│ ┌─────────────┐          │
│ │ {{cta_text}} │ #2563EB │
│ └─────────────┘          │
│                    [LOGO] │
└───────────────────────────┘
```

Same placeholder setup as Template 1. Save as template, note the ID.

---

### Template 3 — Instagram Story Ad (1080 x 1920 px)

Create in Canva → **Custom Size: 1080 x 1920 px**

**Layout:**
```
┌─────────────────────┐
│                     │
│  [BACKGROUND IMAGE] │
│  (full bleed, dark  │
│   overlay)          │
│                     │
│                     │
│  ┌───────────────┐  │
│  │ {{headline}}  │  │
│  │ (White, Bold, │  │
│  │  42px, centre)│  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │{{subheadline}}│  │
│  │(White, 20px,  │  │
│  │ centre)       │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │ {{cta_text}}  │  │
│  │ #2563EB btn   │  │
│  └───────────────┘  │
│                     │
│                     │
│      [LOGO]         │
└─────────────────────┘
```

Keep text in the **15%–85% vertical safe zone** (Stories UI crops top and bottom).

---

### Template 4 — Google Display Banner (728 x 90 px)

Create in Canva → **Custom Size: 728 x 90 px**

**Layout:**
```
┌──────────────────────────────────────────────────────────────────────┐
│ [LOGO]  │  {{headline}} (Bold, 16px)  │  {{cta_text}} [#2563EB btn] │
└──────────────────────────────────────────────────────────────────────┘
```

---

### Template 5 — Google Display Banner (300 x 250 px)

Create in Canva → **Custom Size: 300 x 250 px**

**Layout:**
```
┌────────────────────────┐
│ [SMALL BACKGROUND IMG] │
│                        │
│  {{headline}}          │
│  (Bold, 20px, white)   │
│                        │
│  {{subheadline}}       │
│  (Regular, 14px)       │
│                        │
│  ┌──────────────┐      │
│  │ {{cta_text}}  │     │
│  └──────────────┘      │
│              [LOGO]    │
└────────────────────────┘
```

---

## PART 2: GOOGLE SHEET DATA SOURCE

Create a Google Sheet called **"Insulation Campaign — Ad Data"**

### Sheet 1: "Facebook Ads"

| Row | headline | subheadline | cta_text | primary_text | fb_headline | fb_description | image_url | template_id | platform |
|-----|----------|-------------|----------|-------------|-------------|----------------|-----------|-------------|----------|
| 1 | Is Your Insulation Causing Damage? | Free Assessment — Book Today | Learn More | Had insulation installed under a government scheme? Millions of UK homes received cavity wall or loft insulation that was never suitable. If your home now has damp, mould, cold spots or crumbling render, you may be entitled to free removal and compensation of £10,000–£50,000+. Check if you qualify — takes 60 seconds. | Free Insulation Assessment | Safe removal. Full documentation. England, Wales & NI. | [your_image_url] | [canva_template_id] | facebook_feed |
| 2 | Spray Foam Blocking Your Sale? | Restore Your Mortgage Eligibility | Book Now | Spray foam insulation in your loft? It could be blocking your mortgage, remortgage, or sale. We provide safe, professional removal with full documentation that satisfies lenders and surveyors. Serving England, Wales & Northern Ireland. Book your free assessment today. | Spray Foam Removal Specialists | Safe. Professional. Documented. | [your_image_url] | [canva_template_id] | facebook_feed |
| 3 | Still Living With Damp? | It might be a bad insulation problem — not a damp problem. | Check Eligibility | Still dealing with damp years after having insulation installed? If a surveyor failed to assess your property correctly before installation, the installer, surveyor and scheme funder could all be liable. Don't wait — time limits apply. | Wrongly Installed Insulation? | Free eligibility check. Claims typically £10k–£50k+. | [your_image_url] | [canva_template_id] | facebook_feed |
| 4 | Free Insulation Causing Damp? | You May Have a Claim Worth £10k–£50k+ | Get Free Check | Thousands of UK homes had cavity wall insulation installed free under government schemes like ECO and Green Deal. Many were never properly surveyed. Now homeowners face penetrating damp, black mould, and structural decay. Check if you qualify — takes 60 seconds. | Insulation Damage Claim | Free eligibility check. No obligation. | [your_image_url] | [canva_template_id] | facebook_feed |
| 5 | Your Home Was Never Suitable | Not all homes should have cavity wall insulation. | Free Eligibility Check | Not all homes are suitable for cavity wall insulation. Exposed walls, older properties, and stone-built homes are often at risk. If installed without a proper survey, you may have a strong legal claim — even if it was free. Many claims worth £15,000–£40,000+. | Was Your Home Suitable? | Free check. Claims £15k–£40k+. | [your_image_url] | [canva_template_id] | facebook_feed |

### Sheet 2: "Instagram Feed"

| Row | headline | subheadline | cta_text | caption | hashtags | image_url | template_id | platform |
|-----|----------|-------------|----------|---------|----------|-----------|-------------|----------|
| 1 | Spray Foam Removal | Safe • Professional • Documented | Book Free Assessment | Spray foam causing issues with your mortgage or valuation? We provide safe, professional removal with full documentation. Serving England, Wales & Northern Ireland. Book a free assessment — link in bio. | #SprayFoamRemoval #MortgageIssues #InsulationRemoval #UKProperty | [your_image_url] | [canva_template_id] | instagram_feed |
| 2 | Your Free Insulation Could Be Destroying Your Home | Millions of UK homes affected | Check If You Qualify | Millions of UK homes had cavity wall insulation installed free under government schemes. Many were never properly surveyed. You could be entitled to free removal + compensation up to £50,000. Link in bio. | #CavityWallInsulation #DampProblems #ECOScheme #GreenDeal #InsulationClaim | [your_image_url] | [canva_template_id] | instagram_feed |
| 3 | Had Free Insulation Installed? | It could be causing hidden damage right now. | Free Assessment | Had insulation installed under ECO, Green Deal or another scheme? If your home now has damp, mould or structural damage, you may be entitled to free removal and compensation. Link in bio. | #FreeInsulation #DampWalls #MouldRemoval #UKHomeowners #InsulationClaims | [your_image_url] | [canva_template_id] | instagram_feed |

### Sheet 3: "Instagram Stories"

| Row | headline | subheadline | cta_text | image_url | template_id | platform |
|-----|----------|-------------|----------|-----------|-------------|----------|
| 1 | Is your loft spray foam causing issues? | We provide safe, professional removal with full documentation. Serving England, Wales & NI. | Swipe Up | [your_image_url] | [canva_template_id] | instagram_story |
| 2 | Free insulation causing damp? | You may have a claim worth £10k–£50k+. Free eligibility check. | Learn More | [your_image_url] | [canva_template_id] | instagram_story |
| 3 | TIME IS RUNNING OUT | Claims are time-limited. Some installers are going insolvent. Check your eligibility now. | Check Now | [your_image_url] | [canva_template_id] | instagram_story |
| 4 | Damp? Mould? Cold Spots? | Your insulation might be the problem — not the solution. | Free Check | [your_image_url] | [canva_template_id] | instagram_story |

### Sheet 4: "Display Banners"

| Row | headline | cta_text | image_url | template_id | size | platform |
|-----|----------|----------|-----------|-------------|------|----------|
| 1 | Free Insulation Causing Damp? Claim Up to £50k | Check Eligibility | [your_image_url] | [canva_template_id] | 728x90 | google_display |
| 2 | Spray Foam Blocking Your Mortgage? | Book Free Assessment | [your_image_url] | [canva_template_id] | 728x90 | google_display |
| 3 | Wrongly Installed Insulation? | Free Eligibility Check | [your_image_url] | [canva_template_id] | 300x250 | google_display |
| 4 | Cavity Wall Insulation Damage? | Check If You Qualify | [your_image_url] | [canva_template_id] | 300x250 | google_display |

---

## PART 3: MAKE.COM SCENARIO SETUP

### Prerequisites
- **Canva Pro** account (needed for Canva API / Connect access)
- **Make.com** account (free tier works for testing, Pro for volume)
- **Google Sheets** connected to Make.com
- **Google Drive** (for exporting generated images)
- Optionally: **Meta Ads** module (for direct ad upload)

---

### Scenario 1: Batch Generate Ad Creatives

```
┌─────────────┐    ┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│ Google      │    │ Canva:      │    │ Canva:       │    │ Google Drive │
│ Sheets:     │ →  │ Create      │ →  │ Export       │ →  │ Upload File  │
│ Get Rows    │    │ Design      │    │ Design (PNG) │    │              │
└─────────────┘    └─────────────┘    └──────────────┘    └──────────────┘
```

**Step-by-step in Make.com:**

#### Module 1: Google Sheets — Search Rows
- **Connection:** Your Google account
- **Spreadsheet:** "Insulation Campaign — Ad Data"
- **Sheet:** Select the sheet (e.g., "Facebook Ads")
- **Filter:** Optionally filter by `platform` column
- **Max rows:** Set to the number of ads you want to generate per run

#### Module 2: Canva — Create a Design
- **Connection:** Connect your Canva Pro account
- **Action:** "Create a Design"
- **Template ID:** Map from Google Sheet column `template_id`
- **Autofill data mapping:**
  - `headline` → `{{headline}}` placeholder in template
  - `subheadline` → `{{subheadline}}` placeholder
  - `cta_text` → `{{cta_text}}` placeholder
- **Image replacement** (if supported by your Canva plan):
  - Map `image_url` to the background image placeholder

#### Module 3: Canva — Export Design
- **Format:** PNG (for ads) or PDF (for print)
- **Quality:** High
- **Pages:** 1

#### Module 4: Google Drive — Upload a File
- **Folder:** "Insulation Campaign / Generated Ads / [platform]"
- **File name:** Use a formula: `{{platform}}_{{headline}}_{{timestamp}}.png`
- **File data:** Map from Canva export output

#### Module 5 (Optional): Meta Ads — Create Ad Creative
- **Connection:** Your Meta Business account
- **Ad Account:** Select your ad account
- **Image:** Map from Canva export
- **Primary Text:** Map from `primary_text` column
- **Headline:** Map from `fb_headline` column
- **Description:** Map from `fb_description` column
- **CTA:** Map from `cta_text` column
- **URL:** Your landing page URL

---

### Scenario 2: Auto-Generate Story Variations

```
┌─────────────┐    ┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│ Google      │    │ Iterator:   │    │ Canva:       │    │ Google Drive │
│ Sheets:     │ →  │ Process     │ →  │ Create +     │ →  │ Upload to    │
│ Get Stories │    │ Each Row    │    │ Export       │    │ Stories      │
│ Sheet       │    │             │    │              │    │ Folder       │
└─────────────┘    └─────────────┘    └──────────────┘    └──────────────┘
```

Same flow, but reads from the "Instagram Stories" sheet and uses the Story template (1080x1920).

---

### Scenario 3: A/B Test Variations (Advanced)

For each ad concept, create multiple variations automatically:

**Google Sheet structure for A/B testing:**

| Row | headline_a | headline_b | subheadline | cta_a | cta_b | image_url_a | image_url_b | template_id |
|-----|-----------|-----------|-------------|-------|-------|-------------|-------------|-------------|
| 1 | Is Your Insulation Causing Damage? | Free Insulation Ruining Your Home? | Free Assessment — Book Today | Learn More | Get Free Check | [url1] | [url2] | [template] |

**Make.com flow:**
1. Google Sheets → Get Row
2. **Router** → splits into 2 paths (version A and version B)
3. Path A: Canva Create (headline_a, cta_a, image_url_a) → Export → Google Drive (subfolder: /A/)
4. Path B: Canva Create (headline_b, cta_b, image_url_b) → Export → Google Drive (subfolder: /B/)

---

## PART 4: CANVA TEMPLATE DESIGN INSTRUCTIONS (Step-by-Step)

### Facebook Feed Template — Build Instructions

1. **Open Canva** → Create a design → Custom size → **1200 x 628 px**
2. **Background layer:**
   - Add a rectangle covering the full canvas
   - Set fill to a placeholder image (search: "damp wall" or use a solid `#1B2A4A`)
   - Add a second rectangle on top, full canvas, fill `#000000`, opacity **25%** (dark overlay)
3. **Headline text box:**
   - Position: centred horizontally, 35% from top
   - Font: Inter, Bold, 40px, colour `#FFFFFF`
   - Type exactly: `{{headline}}`
   - Canva will treat this as the replaceable field name
4. **Subheadline text box:**
   - Position: centred horizontally, directly below headline
   - Font: Inter, Regular, 20px, colour `#FFFFFF`
   - Type exactly: `{{subheadline}}`
5. **CTA button:**
   - Add a rounded rectangle: width 250px, height 50px, fill `#2563EB`, corner radius 8px
   - Position: centred, 75% from top
   - Add text inside: Inter, Bold, 18px, colour `#FFFFFF`
   - Type exactly: `{{cta_text}}`
6. **Logo:**
   - Upload your logo, position bottom-right, 60x60px, padding 20px from edges
7. **Save as template:** File → Save as Template → Name: "FB Feed — Insulation Campaign"

---

### Instagram Feed Template — Build Instructions

1. **Open Canva** → Custom size → **1080 x 1080 px**
2. **Background:** Same as Facebook — placeholder image + dark overlay
3. **Bottom third overlay:**
   - Rectangle: full width, 360px height, anchored to bottom
   - Fill: `#1B2A4A`, opacity 90%
4. **Headline text box:**
   - Inside the bottom overlay, centred, 20px from top of overlay
   - Font: Inter, Bold, 36px, colour `#FFFFFF`
   - Text: `{{headline}}`
5. **Subheadline text box:**
   - Below headline inside overlay
   - Font: Inter, Regular, 18px, colour `#FFFFFF`
   - Text: `{{subheadline}}`
6. **CTA badge:**
   - Rounded rectangle: `#2563EB`, bottom-right of overlay
   - Text inside: `{{cta_text}}`, Inter Bold, 16px, white
7. **Logo:** Top-right corner, small
8. **Save as template:** "IG Feed — Insulation Campaign"

---

### Instagram Story Template — Build Instructions

1. **Open Canva** → Custom size → **1080 x 1920 px**
2. **Background:** Placeholder image + 30% dark overlay
3. **Headline text box:**
   - Position: centred, 40% from top (within safe zone)
   - Font: Inter, Extra Bold, 42px, colour `#FFFFFF`, centre-aligned
   - Text: `{{headline}}`
4. **Subheadline text box:**
   - Below headline, centred
   - Font: Inter, Regular, 22px, colour `#FFFFFF`
   - Text: `{{subheadline}}`
5. **CTA button:**
   - Centred, 65% from top
   - Rounded rectangle `#2563EB`, text: `{{cta_text}}`
6. **Logo:** Centred, 80% from top (above the swipe-up area)
7. **Save as template:** "IG Story — Insulation Campaign"

---

### Display Banner 728x90 — Build Instructions

1. **Open Canva** → Custom size → **728 x 90 px**
2. **Background:** `#1B2A4A` solid
3. **Logo:** Left side, 70x70px, 10px padding
4. **Headline text:**
   - Right of logo, vertically centred
   - Inter, Bold, 16px, `#FFFFFF`
   - Text: `{{headline}}`
5. **CTA button:**
   - Far right, vertically centred
   - Small rounded rect `#2563EB`, text: `{{cta_text}}`, 12px, white
6. **Save as template:** "GDN 728x90 — Insulation Campaign"

---

### Display Banner 300x250 — Build Instructions

1. **Open Canva** → Custom size → **300 x 250 px**
2. **Background:** Placeholder image (small) + dark overlay
3. **Headline:** Centred, 30% from top, Inter Bold, 20px, white → `{{headline}}`
4. **CTA button:** Centred, 70% from top, `#2563EB` rounded rect → `{{cta_text}}`
5. **Logo:** Bottom-right, small
6. **Save as template:** "GDN 300x250 — Insulation Campaign"

---

## PART 5: MAKE.COM CANVA MODULE — CONNECTION GUIDE

### Step 1: Connect Canva to Make.com
1. In Make.com, create a new scenario
2. Add the **Canva** module (search for "Canva" in the module library)
3. Click **Create a connection**
4. You'll be redirected to Canva to authorise Make.com
5. Grant access → connection established

### Step 2: Find Your Template IDs
For each Canva template you saved:
1. Open the template in Canva
2. Look at the URL: `https://www.canva.com/design/DAGxxxxxxxx/edit`
3. Copy the `DAGxxxxxxxx` part — that's your template ID
4. Paste it into the corresponding `template_id` column in your Google Sheet

### Step 3: Map the Placeholders
In the Canva module in Make.com:
- **Design Template:** Select or paste the template ID
- **Text replacements:** Map each `{{placeholder}}` to the corresponding Google Sheet column:
  - `{{headline}}` → Column: `headline`
  - `{{subheadline}}` → Column: `subheadline`
  - `{{cta_text}}` → Column: `cta_text`
- **Image replacements:** Map background image to `image_url` column

### Step 4: Set Schedule
- **Manual run** for testing
- **Scheduled** (e.g., weekly) for ongoing A/B test generation
- **Webhook trigger** if you want to generate on-demand from another tool

---

## PART 6: FOLDER STRUCTURE (Google Drive)

Set up this folder structure for exported creatives:

```
Insulation Campaign/
├── Facebook Feed/
│   ├── Generated/
│   └── Approved/
├── Instagram Feed/
│   ├── Generated/
│   └── Approved/
├── Instagram Stories/
│   ├── Generated/
│   └── Approved/
├── Display Banners/
│   ├── 728x90/
│   └── 300x250/
├── A-B Tests/
│   ├── Version A/
│   └── Version B/
└── Source Images/
    ├── Damage Photos/
    └── Before-After/
```

---

## PART 7: FULL MAKE.COM SCENARIO SUMMARY

| Scenario | Trigger | Modules | Output |
|---|---|---|---|
| **1. Batch Facebook Ads** | Manual / Schedule | Sheets → Canva Create → Canva Export → Drive Upload | PNG files in Drive |
| **2. Batch Instagram Feed** | Manual / Schedule | Sheets → Canva Create → Canva Export → Drive Upload | PNG files in Drive |
| **3. Batch Instagram Stories** | Manual / Schedule | Sheets → Canva Create → Canva Export → Drive Upload | PNG files in Drive |
| **4. Batch Display Banners** | Manual / Schedule | Sheets → Canva Create → Canva Export → Drive Upload | PNG files in Drive |
| **5. A/B Test Generator** | Manual | Sheets → Router → 2x (Canva → Export → Drive) | A/B variant PNGs |
| **6. Auto-Upload to Meta** | After approval | Drive Watch → Meta Ads Create | Live ads in Meta |
| **7. Reporting** | Weekly schedule | Meta Ads Get Insights → Sheets Update → Slack Notify | Performance data |

---

## QUICK START CHECKLIST

| # | Task | Done |
|---|---|---|
| 1 | Create Canva Pro account (or confirm existing) | ☐ |
| 2 | Build 5 Canva templates (FB, IG Feed, IG Story, 2x Display) using instructions above | ☐ |
| 3 | Note down all 5 template IDs from Canva URLs | ☐ |
| 4 | Create Google Sheet with 4 tabs (data provided above) | ☐ |
| 5 | Fill in template_id column in each sheet tab | ☐ |
| 6 | Upload source images to Google Drive → paste URLs into image_url column | ☐ |
| 7 | Create Make.com account → connect Canva + Google Sheets + Google Drive | ☐ |
| 8 | Build Scenario 1 (Facebook Ads batch) → test with 1 row | ☐ |
| 9 | Verify output in Google Drive → check quality | ☐ |
| 10 | Replicate for remaining scenarios (IG Feed, Stories, Banners) | ☐ |
| 11 | Set up A/B test scenario if needed | ☐ |
| 12 | Optional: Add Meta Ads upload module | ☐ |
