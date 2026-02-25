# Insulation Claims Campaign — Project Documentation

**Prepared for:** Carter Langfold
**Date:** 25 February 2026
**Version:** 1.0

---

## What Is This Project?

This project is a complete digital marketing and lead generation system designed to help homeowners in **England, Wales, and Northern Ireland** who have been affected by wrongly installed insulation — particularly spray foam and cavity wall insulation.

When insulation is installed without a proper survey, it can cause serious problems: damp, mould, timber rot, crumbling render, blocked mortgages, and reduced property values. Many of these installations were done under government schemes like ECO and Green Deal, and the homeowners may be entitled to compensation.

This system does three things:

1. **Attracts** potential claimants through social media posts
2. **Qualifies** them through interactive online assessment tools
3. **Captures** their details so your team can follow up

---

## How Does It Work?

Here's the journey a potential customer takes:

```
They see a social media post on Facebook, Instagram, or LinkedIn
        ↓
They click through to one of our interactive assessment tools
        ↓
The tool asks them questions about their property and insulation
        ↓
They see a result (e.g. "You likely have a strong claim")
        ↓
They fill in their contact details and property information
        ↓
Their details are automatically sent to your Google Sheet
        ↓
Your team gets an email and/or Slack alert
        ↓
You call them back to arrange an assessment
```

**Scotland is excluded.** The system automatically detects Scottish postcodes and blocks submissions from Scotland, showing a clear message: *"Sorry — we currently only serve England, Wales & Northern Ireland."*

---

## What's Been Built?

### 1. Five Interactive Assessment Tools

These are the heart of the system. Each one is a standalone web page that works on any device (phone, tablet, desktop). They each take a different angle to attract different types of homeowners:

| Tool | File | What It Does |
|------|------|-------------|
| **Home Insulation Health Check** | canvablog1.html | Quick 3-question check — do you have spray foam? Planning to sell? How old is the property? Shows a risk level and opens the full form. |
| **Cavity Wall Claim Checker** | canvablog2.html | An 8-point checklist. The user ticks every statement that applies (e.g. "I have damp patches", "No survey was done"). Shows claim strength based on how many apply. |
| **Damp & Mould Damage Assessment** | canvablog3.html | A 5-question quiz with a severity meter. Asks about location of damp, how long it's been there, whether insulation was involved, and if it's getting worse. Shows a severity score from Minor to Critical. |
| **Government Scheme Eligibility Checker** | canvablog4.html | User selects which scheme their insulation was installed under (ECO, Green Deal, HHCRO, Warm Front, etc.), then answers follow-up questions. Shows whether they're likely eligible for a claim. |
| **Property Value Impact Calculator** | canvablog5.html | User enters their property value, insulation type, and damage severity. Shows estimated devaluation, removal costs, repair costs, and potential claim value in pounds. |

**Every tool ends with the same comprehensive form** that captures all the details your team needs to assess the lead.

### 2. The Lead Capture Form

After the interactive assessment, the user is asked to fill in a detailed form. This form captures everything needed to qualify a lead:

**Personal details:**
- Full name
- Phone number (validated as a UK number)
- Email address (validated format)
- Street address
- Postcode (validated as a UK postcode, Scotland blocked)

**Property details:**
- Property type (detached, semi-detached, terrace, bungalow, flat, other)
- Where the insulation is located (loft underside, between joists, both, cavity walls, external wall)
- When it was installed (less than 1 year ago through to 10+ years)
- Who installed it (named company, unknown company, energy company/scheme, previous owner)
- Installer company name (appears only if they know the company name)
- Whether a surveyor inspected before installation

**Issues experienced (tick all that apply):**
- Mortgage or remortgage blocked/delayed
- Property valuation reduced
- Surveyor flagged the insulation
- Damp or condensation
- Mould growth
- Timber rot in roof structure
- Cold spots / not warming properly
- External render cracking or falling
- Musty or chemical smell
- Sale fallen through
- No issues yet (proactive check)

**Situation details:**
- Ownership status (owner-occupier, landlord, buyer, tenant)
- Urgency (urgent sale/remortgage, soon, just concerned, gathering info)
- Preferred contact method (phone, email, no preference)
- How they heard about you (Facebook, Instagram, Google, friend, leaflet, news, other)

### 3. Error Handling

The forms are designed to be easy to use, even for people who aren't comfortable with technology:

- **Each field has its own error message** — instead of a vague "please fill in all fields", the user sees exactly what's wrong: *"Please enter a valid UK phone number (10–11 digits)"*
- **Problem fields are highlighted in red** so the user can see at a glance what needs fixing
- **The page scrolls to the first problem** so they don't have to hunt for it
- **Errors disappear as soon as the user fixes them** — no need to re-submit to clear the red
- **A count is shown** — e.g. *"Please fix the 3 highlighted fields above"*
- **Scotland postcodes are caught in real time** — a warning appears as they type, before they even try to submit

### 4. Social Media Content (39 Posts)

We've created ready-to-use content for 5 platforms:

| Platform | Number of Posts | Format |
|----------|----------------|--------|
| **Facebook** | 10 posts | Image + body text + headline + CTA |
| **Instagram Feed** | 10 posts | Image + caption + hashtags |
| **Instagram Stories** | 8 stories | Image + headline + swipe-up CTA |
| **Instagram Reels** | 6 scripts | Video script + caption + hashtags |
| **LinkedIn** | 5 posts | Professional tone + article-style text |

Each post has a different **content angle** to appeal to different people:

- *"Is your insulation causing damage?"* — general awareness
- *"Spray foam blocking your sale?"* — targeting people trying to sell
- *"Still living with damp?"* — targeting people who've had problems for years
- *"Was your home ever suitable for cavity wall insulation?"* — targeting exposed/older properties
- *"Time is running out"* — urgency-driven
- *"Your free insulation could be destroying your home"* — targeting government scheme recipients

### 5. Landing Page

A dedicated web page for the insulation claims campaign. This is where social media ads can link to. It includes:

- Clear messaging about the insulation scandal
- A multi-step lead capture form
- RICS compliance references
- Urgency triggers
- Mobile-friendly design
- Works on all browsers

### 6. Automation System (Make.com)

We've designed a complete automation system using Make.com (an online automation tool, similar to Zapier). When set up, it will:

- **Generate social media images automatically** from your content using Canva templates
- **Publish posts to Facebook, Instagram, and LinkedIn** on a schedule
- **Capture leads from the forms** and add them to your Google Sheet
- **Send email alerts** to your sales team when a new lead comes in
- **Send Slack messages** to a #leads channel for instant visibility
- **Route urgent leads** (people with a sale or remortgage in progress) with priority alerts

Full setup instructions are provided in the **Make.com Scenario Setup Guide**.

---

## What Files Have Been Delivered?

Here's everything in the project, explained in plain English:

### Assessment Tools (the pages your customers see)

| File | What It Is |
|------|-----------|
| `canvablog1.html` | Home Insulation Health Check tool |
| `canvablog2.html` | Cavity Wall Claim Checker tool |
| `canvablog3.html` | Damp & Mould Damage Assessment tool |
| `canvablog4.html` | Government Scheme Eligibility Checker tool |
| `canvablog5.html` | Property Value Impact Calculator tool |

**These are standalone files.** Each one is a single file that contains everything it needs — you can open it in any web browser. No special software required.

### Social Media Content Sheets

These are in the `make_canva_sheets/` folder:

| File | What It Contains |
|------|-----------------|
| `01_facebook_feed.csv` | 10 Facebook post ideas with headlines, body text, and CTAs |
| `02_instagram_feed.csv` | 10 Instagram feed posts with captions and hashtags |
| `03_instagram_stories.csv` | 8 Instagram Story card ideas |
| `04_instagram_reels.csv` | 6 Instagram Reels/TikTok video scripts |
| `05_linkedin.csv` | 5 LinkedIn posts with professional messaging |
| `06_canva_blog_widgets.csv` | References to the 5 assessment tools above |
| `README.md` | Instructions for importing these into Google Sheets |

**CSV files** are spreadsheet files. You can open them in Excel, Google Sheets, or any spreadsheet tool.

### Strategy & Setup Documents

| File | What It Is | Who It's For |
|------|-----------|-------------|
| `Make_Scenario_Setup_Guide.md` | Step-by-step instructions to set up the Make.com automations | Whoever sets up the automation (technical) |
| `Canva_Make_Automation_Instructions.md` | How to create the Canva templates and connect them to Make.com | Whoever designs the social media images |
| `Canva_Design_Brief_Insulation_Campaign.md` | Detailed design specifications for each social media template | Your graphic designer |
| `Insulation_Claims_Marketing_Campaign.md` | The overall marketing strategy and campaign plan | Campaign manager / marketing team |

### Landing Page & Demo

Inside the `scam_lead_generator/` folder:

| Item | What It Is |
|------|-----------|
| `landing/insulation-claims/` | The main insulation claims landing page |
| `landing/spray-foam/` | The spray foam removal landing page |
| `demo/` | An internal test dashboard for previewing and testing the tools |

### Other Files

| File | What It Is |
|------|-----------|
| `invoice.html` | The project invoice |
| `vercel.json` | Configuration for website hosting (technical) |

---

## Service Area & Scotland Blocking

The system is configured to serve **England, Wales, and Northern Ireland only**.

Every form automatically checks the postcode when the user types it. If the postcode starts with any of the following prefixes, it is identified as Scottish and the submission is blocked:

> AB, DD, DG, EH, FK, G, HS, IV, KA, KW, KY, ML, PA, PH, TD, ZE

When a Scottish postcode is detected:
1. A red warning box appears immediately below the postcode field: *"Sorry — we currently only serve England, Wales & Northern Ireland. Scotland is not covered."*
2. If they try to submit anyway, the form refuses and shows an error message
3. No data is sent — the lead is not captured

This happens across all 5 assessment tools and the landing page.

---

## What Information Is Captured Per Lead?

When someone completes a form, the following data is recorded:

| Category | Fields |
|----------|--------|
| **Contact** | Full name, phone, email, street address, postcode |
| **Property** | Type (detached/semi/etc.), insulation location, install year |
| **Installer** | Who installed it, company name (if known) |
| **Survey** | Whether a surveyor visited before installation |
| **Problems** | All issues ticked (damp, mould, mortgage blocked, etc.) |
| **Situation** | Ownership status, urgency level |
| **Marketing** | Preferred contact method, how they heard about you |
| **Tool data** | Which assessment tool they used, their score/result |
| **Technical** | Timestamp, referring page URL |

This gives your sales team everything they need to prioritise and qualify the lead before making the first call.

---

## How Leads Reach You

There are several ways the leads can be delivered, depending on how you set up the automation:

### Option 1: Google Sheets (Recommended)
All leads go into a Google Sheet automatically. You can view, sort, filter, and assign them from your phone or computer. The sheet has columns for lead status and notes so your team can track progress.

### Option 2: Email Alerts
Every new lead triggers an email to your sales team. Urgent leads (sale or remortgage in progress) get a separate, higher-priority email alert.

### Option 3: Slack Messages
If your team uses Slack, each new lead posts to a dedicated #leads channel with a summary of the key details.

### Option 4: CRM Integration
The system can also push leads directly into CRM tools like HubSpot or Pipedrive, creating contacts and deals automatically.

**All of these can work simultaneously.** A single form submission can go to your Google Sheet AND send an email AND post to Slack AND create a CRM contact — all at once.

---

## How to Use the Assessment Tools

### Sharing on Social Media
Each tool is a single web page. Once hosted (uploaded to your website), you'll have a URL for each one, e.g.:
- `https://your-website.com/canvablog1.html`
- `https://your-website.com/canvablog2.html`
- etc.

You can share these URLs:
- As the link in Facebook/Instagram posts
- In your link-in-bio (Linktree, etc.)
- In email campaigns
- In WhatsApp messages to potential leads
- On your website as embedded tools or linked buttons

### Hosting the Tools
The files need to be uploaded to a web server so people can access them via a URL. Options:
- **Your existing website** — upload the HTML files to your web hosting
- **Vercel** (free) — the project is already configured for this
- **Netlify** (free) — drag and drop the files
- **Any web hosting** — just upload the files

### Testing Before Going Live
1. Open any of the `canvablog1.html` through `canvablog5.html` files in your web browser (double-click the file)
2. Go through the assessment questions
3. Fill in the form with test data
4. Check that the submission works (it will log to the browser console until the webhook URL is configured)

---

## Ongoing Management

### Adding New Post Content
Open your Google Sheet → go to the relevant tab (e.g. "Facebook Feed") → add a new row with the headline, caption, CTA, etc. The automation will pick it up on the next run.

### Changing the Assessment Questions
The questions in each tool can be modified by editing the HTML files. This requires someone comfortable with editing code, or you can request changes.

### Updating the Webhook URL
When you set up Make.com, you'll receive a webhook URL. This URL needs to be pasted into each of the 5 canvablog files (there's a clearly marked line near the top of each file). Instructions are in the Make.com setup guide.

### Monitoring Leads
Check your Google Sheet "Leads" tab regularly. Update the `lead_status` column as your team works through them:
- **new** — just arrived, nobody has looked at it
- **notified** — email/Slack alert was sent
- **contacted** — someone on your team has called/emailed the lead
- **qualified** — confirmed as a genuine case
- **booked** — assessment visit scheduled
- **closed** — case resolved or lead not suitable

---

## Key Numbers

| Metric | Value |
|--------|-------|
| Assessment tools built | 5 |
| Social media posts created | 39 |
| Platforms covered | Facebook, Instagram (Feed + Stories + Reels), LinkedIn |
| Lead form fields | 18 (11 required, 7 optional) |
| Issue checkboxes | 11 |
| Countries served | England, Wales, Northern Ireland |
| Country excluded | Scotland |
| Scottish postcode prefixes blocked | 16 |

---

## Glossary

| Term | What It Means |
|------|--------------|
| **Lead** | A person who has filled in the form — a potential customer |
| **Widget / Tool** | The interactive assessment pages (canvablog1–5) |
| **Webhook** | A web address that receives data automatically when someone submits a form |
| **Make.com** | An online tool that connects different apps together and automates tasks (like a digital assistant that moves data between systems) |
| **Canva** | An online design tool for creating social media images, flyers, etc. |
| **Google Sheets** | Google's free online spreadsheet tool (like Excel, but in your browser) |
| **CSV** | A simple spreadsheet file format that can be opened in Excel or Google Sheets |
| **CTA** | "Call to Action" — the button text that tells people what to do (e.g. "Get Free Assessment") |
| **Landing page** | A dedicated web page designed to convert visitors into leads |
| **Postcode validation** | The system checking that a postcode is real and not in Scotland |
| **CRM** | Customer Relationship Management — software for tracking customers and sales (e.g. HubSpot, Pipedrive) |
| **Vercel / Netlify** | Free services for hosting websites |
| **ECO / Green Deal / HHCRO** | UK government energy efficiency schemes that funded insulation installations |
| **RICS** | Royal Institution of Chartered Surveyors — the professional body whose standards determine whether insulation is acceptable to mortgage lenders |

---

## Support & Next Steps

If you need help with any of the following, please get in touch:

- Setting up Make.com automations
- Connecting the webhook to your forms
- Hosting the assessment tools on your website
- Modifying questions or form fields
- Creating additional assessment tools
- Designing Canva templates from the design brief
- Connecting to your CRM
- Training your team on using the Google Sheet

---

*This document was prepared on 25 February 2026 as part of the Insulation Claims Campaign project (ref: CL-INSULATION-2026).*
