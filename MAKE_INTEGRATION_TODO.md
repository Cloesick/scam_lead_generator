# Make.com Full Integration — Master TODO Checklist

**Project:** Insulation Claims Campaign  
**Client:** Carter Langfold  
**Date:** 25 February 2026  
**Status:** Ready for implementation

---

## How to Use This Document

This is your **step-by-step checklist** for getting everything live. Work through each phase in order. Each task has a checkbox — tick it off as you go. Some tasks depend on earlier ones, so don't skip ahead.

**Estimated total setup time:** 4–6 hours (with all accounts already created)

---

## PHASE 1: ACCOUNTS & ACCESS (Prerequisites)

> Get all the accounts and permissions in place before building anything.

### 1.1 — Make.com
- [ ] Create a Make.com account at [make.com](https://www.make.com/) (free tier works to start; Operations plan recommended for production)
- [ ] Note your Make.com **team/org URL** for future reference

### 1.2 — Google Account & Sheets
- [ ] Ensure you have a Google account with Google Sheets and Google Drive access
- [ ] Create a new Google Sheet called **"Insulation Campaign — Master"**
- [ ] Share the sheet with the email address Make.com will use (you'll get this when you add the Google Sheets connection in Make.com)

### 1.3 — Meta Business Suite (Facebook & Instagram)
- [ ] Create or log into [Meta Business Suite](https://business.facebook.com/)
- [ ] Create a **Facebook Page** for the campaign (or use existing one)
- [ ] Connect an **Instagram Professional Account** (Business or Creator) to the Facebook Page
  - Instagram → Settings → Account → Switch to Professional Account
  - Then link it: Facebook Page → Settings → Linked Accounts → Instagram
- [ ] Ensure the Facebook Page has **publish permissions** enabled
- [ ] Note the **Facebook Page ID** (Page → About → Page ID, or from the URL)

### 1.4 — LinkedIn
- [ ] Log into [LinkedIn](https://www.linkedin.com/)
- [ ] Create a **LinkedIn Company Page** (or use existing one)
- [ ] Ensure you have **Admin** or **Content Admin** access to the page
- [ ] Note the **LinkedIn Organization ID** (Admin view → URL contains the ID)

### 1.5 — Canva
- [ ] Create or log into [Canva](https://www.canva.com/) (Pro recommended for API access)
- [ ] Create templates for each post format (use `Canva_Design_Brief_Insulation_Campaign.md` as your guide)
- [ ] Note each **Canva Template ID** — found in the Canva URL: `canva.com/design/DAGxxxxxxxx/edit` → copy `DAGxxxxxxxx`
- [ ] Enable **Canva Connect API** in your Canva account settings (requires Canva Pro/Teams)

### 1.6 — Hosting (for Assessment Tools)
- [ ] Choose a hosting provider: **Vercel** (free), **Netlify** (free), or your existing web host
- [ ] Upload all 5 `canvablog1-5.html` files
- [ ] Upload `demo-showcase.html` (optional, for internal demos)
- [ ] Note the **live URLs** for each tool (e.g. `https://your-domain.com/canvablog1.html`)

### 1.7 — Optional: Slack
- [ ] Create a Slack workspace (or use existing)
- [ ] Create a **#leads** channel for lead notifications
- [ ] Create a **#social-posts** channel for publish confirmations (optional)

### 1.8 — Optional: CRM
- [ ] If using HubSpot: note your **API key** or set up a Private App
- [ ] If using Pipedrive: note your **API token** (Settings → Personal preferences → API)

---

## PHASE 2: GOOGLE SHEETS SETUP

> Build your single source of truth.

### 2.1 — Import Content CSVs
- [ ] Open "Insulation Campaign — Master" Google Sheet
- [ ] Create tab: **Facebook Feed** → Import `make_canva_sheets/01_facebook_feed.csv`
- [ ] Create tab: **Instagram Feed** → Import `make_canva_sheets/02_instagram_feed.csv`
- [ ] Create tab: **Instagram Stories** → Import `make_canva_sheets/03_instagram_stories.csv`
- [ ] Create tab: **Instagram Reels** → Import `make_canva_sheets/04_instagram_reels.csv`
- [ ] Create tab: **LinkedIn** → Import `make_canva_sheets/05_linkedin.csv`
- [ ] Create tab: **Canva Blog Widgets** → Import `make_canva_sheets/06_canva_blog_widgets.csv`

### 2.2 — Replace Placeholders in Every Content Tab
- [ ] Replace `[canva_template_id]` with your actual Canva template IDs
- [ ] Replace `[your_image_url]` with direct URLs to hosted images
- [ ] Replace `[landing_page_url]` with your live landing page URL
- [ ] Replace all `canvablogX.html` URLs with actual hosted URLs

### 2.3 — Add Control Columns to Each Content Tab
- [ ] Add column: **status** (values: `draft`, `approved`, `published`, `paused`)
- [ ] Add column: **publish_date** (format: `YYYY-MM-DD HH:MM`)
- [ ] Add column: **published_url** (auto-filled by Make.com after publishing)

### 2.4 — Create the Leads Tab
- [ ] Create tab: **Leads**
- [ ] Add these column headers in row 1:

```
timestamp | source_tool | name | phone | email | address | postcode | property_type | insulation_location | install_year | installer | installer_name | surveyor | issues | ownership | urgency | contact_method | referral_source | quiz_result | quiz_score | lead_status | notes
```

- [ ] Set `lead_status` column data validation to: `new, notified, contacted, qualified, booked, closed`
- [ ] Freeze row 1 (View → Freeze → 1 row)
- [ ] Apply conditional formatting: green for "qualified"/"booked", red for "closed"

---

## PHASE 3: MAKE.COM CONNECTIONS

> Wire up all the external services inside Make.com.

### 3.1 — Add Connections in Make.com
- [ ] **Google Sheets** → Add connection → Authorize with your Google account
- [ ] **Google Drive** → Add connection → Authorize (same account)
- [ ] **Facebook Pages** → Add connection → Authorize via Meta login → Grant page publish permissions
- [ ] **Instagram Business** → Add connection → Authorize via Meta login (uses same Meta app as Facebook)
- [ ] **LinkedIn** → Add connection → Authorize → Grant organization post permissions
- [ ] **Canva** → Add connection → Authorize via Canva account (requires Canva Pro)
- [ ] **Email** (SMTP or Gmail) → Add connection for sending lead alert emails
- [ ] **Slack** (optional) → Add connection → Authorize → Select workspace

### 3.2 — Verify Each Connection
- [ ] Test Google Sheets: can Make.com read/write to your Master sheet?
- [ ] Test Facebook: can Make.com see your Page and post to it?
- [ ] Test Instagram: can Make.com see your IG account linked to the Facebook Page?
- [ ] Test LinkedIn: can Make.com see your Company Page?
- [ ] Test Canva: can Make.com access your templates?
- [ ] Test Email: send a test email to yourself
- [ ] Test Slack: send a test message to #leads

---

## PHASE 4: SCENARIO 1 — SHEET → CANVA → DRIVE (Image Generation)

> Auto-generate social media images from your content sheets using Canva templates.

### 4.1 — Create Scenario
- [ ] New scenario in Make.com → name it: **"1 — Generate Post Images"**
- [ ] **Trigger:** Google Sheets → Watch Rows (select "Facebook Feed" tab, filter: `status = approved` AND `published_url = empty`)
- [ ] **Module 2:** Canva → Create a Design (map template ID from sheet, map headline/body text to Canva text fields)
- [ ] **Module 3:** Canva → Export Design as PNG
- [ ] **Module 4:** Google Drive → Upload File (save PNG to a "Campaign Images" folder)
- [ ] **Module 5:** Google Sheets → Update Row (write the Google Drive image URL back to the `published_url` column)

### 4.2 — Repeat for Each Platform
- [ ] Duplicate the scenario for **Instagram Feed** tab (different template dimensions: 1080×1080)
- [ ] Duplicate for **Instagram Stories** tab (1080×1920)
- [ ] Duplicate for **LinkedIn** tab (1200×627)
- [ ] Or: use a Router module in a single scenario to branch by platform

### 4.3 — Test
- [ ] Set one row in Facebook Feed to `status = approved`
- [ ] Run the scenario manually
- [ ] Verify: Canva image generated → saved to Drive → URL written back to sheet
- [ ] Check image quality and text rendering

---

## PHASE 5: SCENARIO 2 — SHEET → SOCIAL PUBLISH (Auto-Publishing)

> Publish approved posts to Facebook, Instagram, and LinkedIn on schedule.

### 5.1 — Facebook Publishing
- [ ] New scenario: **"2 — Publish to Facebook"**
- [ ] **Trigger:** Google Sheets → Watch Rows (Facebook Feed tab, filter: `status = approved`, `publish_date <= now`)
- [ ] **Module 2:** Facebook Pages → Create a Post
  - Map: `message` ← body text from sheet
  - Map: `link` ← landing page URL or canvablog URL
  - Map: `picture` ← image URL from Drive (from Scenario 1)
- [ ] **Module 3:** Google Sheets → Update Row (set `status = published`, write Facebook post URL to `published_url`)

### 5.2 — Instagram Publishing
- [ ] Add to scenario or create new: **"2b — Publish to Instagram"**
- [ ] **Module:** Instagram Business → Create a Photo Post
  - Map: `image_url` ← hosted image URL (must be publicly accessible)
  - Map: `caption` ← caption + hashtags from sheet
- [ ] **Important:** Instagram API requires images to be hosted on a public URL (not Google Drive private links). Use a public Drive folder or upload to an image host.
- [ ] For **Instagram Stories**: use Instagram → Create a Story module
- [ ] For **Instagram Reels**: Reels require video content — these are script-only in the sheet, so manual creation is needed unless you add video generation

### 5.3 — LinkedIn Publishing
- [ ] Add to scenario or create new: **"2c — Publish to LinkedIn"**
- [ ] **Module:** LinkedIn → Create a Post (Organization)
  - Map: `text` ← post body from sheet
  - Map: `content.contentEntities[0].entityLocation` ← link URL
  - Map: Organization ID from your LinkedIn Company Page

### 5.4 — Schedule
- [ ] Set scenario scheduling: run every **1 hour** (or as desired)
- [ ] Alternatively: use Make.com's built-in scheduler module with specific times
- [ ] Recommended posting schedule:
  - Facebook: Mon/Wed/Fri at 9am, Tue/Thu at 12pm
  - Instagram Feed: Mon/Wed/Fri at 11am, Tue/Thu at 6pm
  - Instagram Stories: Daily at 8am
  - LinkedIn: Tue/Thu at 8:30am

### 5.5 — Test
- [ ] Set one Facebook post to `status = approved` with `publish_date` = now
- [ ] Run scenario manually → verify post appears on Facebook Page
- [ ] Repeat for Instagram and LinkedIn
- [ ] Check image quality, text formatting, and link preview

---

## PHASE 6: SCENARIO 3 — WEBHOOK → LEAD SHEET (Lead Capture)

> Capture every form submission from the 5 canvablog widgets into your Google Sheet.

### 6.1 — Create Webhook
- [ ] New scenario: **"3 — Capture Leads"**
- [ ] **Trigger:** Webhooks → Custom Webhook → Create a webhook
- [ ] **Copy the webhook URL** — you'll need it in the next step
- [ ] Name it: "Insulation Campaign Lead Webhook"

### 6.2 — Update All 5 Canvablog Files with the Webhook URL
- [ ] Open `canvablog1.html` → find `var WH=''` near the top of the `<script>` → paste your webhook URL between the quotes
- [ ] Open `canvablog2.html` → same: update `var WH=''`
- [ ] Open `canvablog3.html` → same: update `var WH=''`
- [ ] Open `canvablog4.html` → same: update `var WH=''`
- [ ] Open `canvablog5.html` → same: update `var WH=''`
- [ ] Re-upload updated files to your hosting provider
- [ ] **Test:** Submit a test form on canvablog1 → check that Make.com receives the data (look at the scenario's execution log)

### 6.3 — Map Webhook Data to Google Sheets
- [ ] **Module 2:** Google Sheets → Add Row (select "Leads" tab)
- [ ] Map every webhook field to the corresponding column:

| Webhook Field | Sheet Column |
|--------------|-------------|
| `{{timestamp}}` or use Make's `now` | timestamp |
| `{{source}}` | source_tool |
| `{{name}}` | name |
| `{{phone}}` | phone |
| `{{email}}` | email |
| `{{address}}` | address |
| `{{postcode}}` | postcode |
| `{{property_type}}` | property_type |
| `{{insulation_location}}` | insulation_location |
| `{{install_year}}` | install_year |
| `{{installer}}` | installer |
| `{{installer_name}}` | installer_name |
| `{{surveyor}}` | surveyor |
| `{{issues}}` | issues |
| `{{ownership}}` | ownership |
| `{{urgency}}` | urgency |
| `{{contact_method}}` | contact_method |
| `{{referral}}` | referral_source |
| `{{quiz_result}}` | quiz_result |
| `{{quiz_score}}` | quiz_score |
| (hardcode) "new" | lead_status |

### 6.4 — Test End-to-End
- [ ] Go to your live canvablog1 URL
- [ ] Fill in the full form with test data
- [ ] Submit
- [ ] Check: Make.com execution log shows success
- [ ] Check: Google Sheet "Leads" tab has the new row with all data
- [ ] Repeat for canvablog2, 3, 4, and 5

---

## PHASE 7: SCENARIO 4 — LEAD → NOTIFICATIONS + CRM (Lead Routing)

> Alert your team instantly and push leads into your CRM.

### 7.1 — Email Alerts
- [ ] New scenario: **"4 — Route Leads"**
- [ ] **Trigger:** Google Sheets → Watch Rows (Leads tab, filter: `lead_status = new`)
- [ ] **Module 2:** Email → Send an Email
  - **To:** your sales team email (e.g. leads@carterlangfold.com)
  - **Subject:** `New Lead: {{name}} — {{urgency}} — from {{source_tool}}`
  - **Body:** Format a clear summary:
    ```
    NEW INSULATION CLAIM LEAD
    
    Name: {{name}}
    Phone: {{phone}}
    Email: {{email}}
    Address: {{address}}, {{postcode}}
    
    Property: {{property_type}}
    Insulation: {{insulation_location}} (installed {{install_year}})
    Issues: {{issues}}
    Urgency: {{urgency}}
    
    Assessment result: {{quiz_result}} (score: {{quiz_score}})
    Source: {{source_tool}}
    Preferred contact: {{contact_method}}
    ```
- [ ] **Module 3:** Google Sheets → Update Row (set `lead_status` to `notified`)

### 7.2 — Urgent Lead Priority Routing
- [ ] Add a **Router** after the trigger
- [ ] **Route 1 (Urgent):** Filter: `urgency = urgent_sale_remortgage`
  - Send email with subject prefix: `🔴 URGENT:`
  - Optionally: send SMS via Twilio or call alert
- [ ] **Route 2 (Normal):** All other leads → standard email alert

### 7.3 — Slack Notifications (Optional)
- [ ] Add module: **Slack → Create a Message**
  - Channel: `#leads`
  - Text:
    ```
    🏠 *New Lead* from {{source_tool}}
    *{{name}}* — {{phone}} — {{postcode}}
    Urgency: {{urgency}} | Result: {{quiz_result}}
    ```

### 7.4 — CRM Integration (Optional)

**If using HubSpot:**
- [ ] Add module: HubSpot → Create a Contact
  - Map: firstname, lastname (split from `name`), email, phone, address, city, zip
- [ ] Add module: HubSpot → Create a Deal
  - Map: deal name = "Insulation Claim — {{name}}", pipeline, stage

**If using Pipedrive:**
- [ ] Add module: Pipedrive → Create a Person
  - Map: name, email, phone
- [ ] Add module: Pipedrive → Create a Deal
  - Map: title, person_id (from previous module), value (from quiz_score mapping)

### 7.5 — Test
- [ ] Submit a test lead with `urgency = urgent_sale_remortgage`
- [ ] Verify: urgent email received with priority flag
- [ ] Submit a normal lead → verify standard email received
- [ ] Check Slack #leads channel for notification
- [ ] Check CRM for new contact + deal (if configured)

---

## PHASE 8: SCENARIO 5 — SCHEDULER (Automated Cadence)

> Set up daily/weekly automation triggers.

### 8.1 — Daily Publishing Run
- [ ] Edit Scenario 2 scheduling: set to run at specific times (e.g. 9am, 12pm, 6pm)
- [ ] Or use Make.com's **Schedule** trigger module to fire at exact times

### 8.2 — Weekly Content Check
- [ ] Create scenario: **"5 — Weekly Content Audit"**
- [ ] **Trigger:** Schedule → Every Monday at 8am
- [ ] **Module:** Google Sheets → Search Rows (count rows where `status = draft` and `publish_date` is in the coming week)
- [ ] **Module:** Email → Send summary: "You have X posts scheduled this week, Y posts still in draft"

### 8.3 — Lead Follow-Up Reminders
- [ ] Create scenario: **"5b — Lead Follow-Up"**
- [ ] **Trigger:** Schedule → Daily at 9am
- [ ] **Module:** Google Sheets → Search Rows (filter: `lead_status = notified` AND `timestamp` is older than 24 hours)
- [ ] **Module:** Email → Send reminder: "These leads haven't been contacted yet: ..."

---

## PHASE 9: META BUSINESS SUITE — CROSS-PLATFORM SETUP

> Ensure Facebook and Instagram are fully connected for cross-posting.

### 9.1 — Facebook Page Setup
- [ ] Go to [Meta Business Suite](https://business.facebook.com/)
- [ ] Verify the Facebook Page is published and active
- [ ] Add a **Call to Action** button on the Page: "Get Quote" → link to your landing page
- [ ] Upload a profile picture and cover photo matching the campaign branding
- [ ] Add the assessment tool links to the Page's **About** section

### 9.2 — Instagram Business Account
- [ ] Verify Instagram is set to **Business Account** (not Creator — Business gives better API access)
- [ ] Confirm it's linked to the Facebook Page (Settings → Linked Accounts)
- [ ] Add campaign link to Instagram **bio** (or use Linktree with all 5 tool links)
- [ ] Set up **Instagram Shopping** link (optional, not required for this campaign)

### 9.3 — Meta API Permissions
- [ ] In Meta Business Suite → Settings → Business Settings → System Users
- [ ] Create a system user (or use your admin account)
- [ ] Generate an **Access Token** with these permissions:
  - `pages_manage_posts` — to publish Facebook posts
  - `pages_read_engagement` — to read post metrics
  - `instagram_basic` — basic IG access
  - `instagram_content_publish` — to publish IG posts
  - `instagram_manage_insights` — to read IG metrics
- [ ] Copy the **long-lived access token** (valid 60 days — set a calendar reminder to refresh)
- [ ] Use this token in Make.com's Facebook/Instagram connection

### 9.4 — Cross-Posting Configuration
- [ ] In Meta Business Suite → Content → Create Post
- [ ] Test a manual cross-post (Facebook + Instagram simultaneously)
- [ ] In Make.com: after Facebook publish module, optionally add an Instagram publish module using the same image/caption
- [ ] **Or:** use Make.com's Router to post to Facebook AND Instagram in parallel from the same trigger

### 9.5 — Facebook Pixel / Conversions API (Optional but Recommended)
- [ ] Create a **Facebook Pixel** in Meta Events Manager
- [ ] Add the pixel code to each canvablog HTML file (in the `<head>` section)
- [ ] Set up **Standard Events**: `Lead` (on form submit), `ViewContent` (on page load)
- [ ] This enables: retargeting visitors who didn't convert, Lookalike audiences, conversion tracking for ads

---

## PHASE 10: TESTING & GO-LIVE

### 10.1 — Full End-to-End Test
- [ ] Post a test to Facebook via Make.com → verify it appears
- [ ] Post a test to Instagram via Make.com → verify it appears
- [ ] Post a test to LinkedIn via Make.com → verify it appears
- [ ] Submit a test lead on each canvablog (1-5) → verify all 5 arrive in Google Sheets
- [ ] Verify email alert received for each test lead
- [ ] Verify Slack notification (if configured)
- [ ] Verify CRM entry (if configured)
- [ ] Check that urgent leads get priority routing

### 10.2 — Content Approval Workflow
- [ ] Review all 39 posts in the Google Sheet
- [ ] Set approved posts to `status = approved` with desired `publish_date`
- [ ] Leave others as `draft` until ready

### 10.3 — Go Live
- [ ] Turn on all Make.com scenarios (toggle the switch on each)
- [ ] Set Scenario 2 (publishing) to your desired schedule
- [ ] Set Scenario 3 (lead capture) to **"Immediately"** (real-time webhook)
- [ ] Set Scenario 4 (lead routing) to **"Every 1 minute"** (near real-time alerts)
- [ ] Monitor the first 24 hours for any errors in Make.com execution logs

### 10.4 — Ongoing Monitoring
- [ ] Check Make.com execution logs daily for the first week
- [ ] Monitor Google Sheets "Leads" tab for incoming leads
- [ ] Refresh Meta access token every 55 days (before it expires at 60)
- [ ] Add new content rows to the sheet as needed
- [ ] Review post performance in Meta Business Suite insights weekly

---

## QUICK REFERENCE: SCENARIO SUMMARY

| # | Scenario Name | Trigger | Frequency | What It Does |
|---|--------------|---------|-----------|-------------|
| 1 | Generate Post Images | Sheet row approved | On demand / hourly | Creates Canva images, saves to Drive |
| 2 | Publish to Social | Sheet row scheduled | 3x daily | Posts to Facebook, Instagram, LinkedIn |
| 3 | Capture Leads | Webhook (real-time) | Immediately | Writes form data to Leads sheet |
| 4 | Route Leads | New lead in sheet | Every 1 min | Sends email, Slack, CRM notifications |
| 5 | Scheduler & Audits | Cron schedule | Daily/weekly | Content audits, follow-up reminders |

---

## QUICK REFERENCE: ALL URLs YOU'LL NEED

| Item | URL / Value | Where to Get It |
|------|------------|----------------|
| Make.com webhook URL | `https://hook.eu1.make.com/xxx...` | Scenario 3 → Webhook trigger |
| Facebook Page ID | Numeric ID | Page → About → Page ID |
| Instagram Business Account ID | Numeric ID | Meta Business Suite → Settings |
| LinkedIn Organization ID | Numeric ID | LinkedIn Company Page admin URL |
| Canva Template IDs | `DAGxxxxxxxx` | Canva design URL |
| Google Sheet ID | Long alphanumeric string | Google Sheets URL between `/d/` and `/edit` |
| Hosted canvablog URLs | `https://your-domain.com/canvablog1.html` etc. | Your hosting provider |
| Landing page URL | `https://your-domain.com/insulation-claims/` | Your hosting provider |

---

*This checklist was generated on 25 February 2026 as part of the Insulation Claims Campaign project (ref: CL-INSULATION-2026).*
