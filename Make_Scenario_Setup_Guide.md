# Make.com Scenario Setup Guide — Insulation Claims Campaign

> Complete, step-by-step instructions to orchestrate **Google Sheets**, **Canva post generation**, **social media publishing**, and **lead gathering** using Make.com scenarios.

---

## OVERVIEW — 3 PILLARS

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        MAKE.COM ORCHESTRATION                           │
│                                                                         │
│  PILLAR 1: SHEETS          PILLAR 2: POSTS         PILLAR 3: LEADS     │
│  ────────────────          ─────────────────        ────────────────     │
│  Google Sheets as          Canva template           Webhook receives     │
│  the single source         generation +             form submissions     │
│  of truth for all          auto-publish to          from canvablog       │
│  post content,             Facebook, Instagram,     widgets → routes     │
│  scheduling, and           LinkedIn, etc.           to Sheets, CRM,     │
│  status tracking.                                   email & Slack.       │
└──────────────────────────────────────────────────────────────────────────┘
```

**You will create 5 Make.com scenarios total:**

| # | Scenario | Purpose |
|---|----------|---------|
| 1 | Sheet → Canva → Drive | Batch-generate post images from sheet data |
| 2 | Sheet → Social Publish | Auto-publish approved posts to social platforms |
| 3 | Webhook → Lead Sheet | Capture form submissions into a Leads sheet |
| 4 | Lead → CRM + Notification | Route new leads to CRM, email, and Slack |
| 5 | Scheduler | Daily/weekly trigger to publish scheduled posts |

---

# PILLAR 1: GOOGLE SHEETS SETUP

## Step 1.1 — Create the Master Google Sheet

Create a single Google Sheet called: **"Insulation Campaign — Master"**

This sheet will have **7 tabs**. Create each one:

| Tab name | Source CSV file | Purpose |
|----------|----------------|---------|
| Facebook Feed | `01_facebook_feed.csv` | 10 Facebook post variations |
| Instagram Feed | `02_instagram_feed.csv` | 10 Instagram feed posts |
| Instagram Stories | `03_instagram_stories.csv` | 8 Instagram Story cards |
| Instagram Reels | `04_instagram_reels.csv` | 6 Reels/TikTok scripts |
| LinkedIn | `05_linkedin.csv` | 5 LinkedIn posts |
| Canva Blog Widgets | `06_canva_blog_widgets.csv` | 5 interactive widget references |
| Leads | (create manually — see Pillar 3) | Incoming lead submissions |

## Step 1.2 — Import the CSV Data

For each of the 6 content tabs:

1. Open the tab in Google Sheets
2. Go to **File → Import → Upload** → select the CSV file from `make_canva_sheets/`
3. Choose **"Replace current sheet"** and **"Detect automatically"** for separator
4. The columns will auto-populate with all the post content

**Alternatively**: Open each CSV in a text editor, select all, copy, and paste into cell A1 of the corresponding tab.

## Step 1.3 — Fill In Your Placeholders

After importing, you must replace these placeholder values in every tab:

| Placeholder | Replace with | Where to find it |
|-------------|-------------|-------------------|
| `[canva_template_id]` | Your actual Canva template ID | Canva URL: `canva.com/design/DAGxxxxxxxx/edit` → copy `DAGxxxxxxxx` |
| `[your_image_url]` | Direct URL to your hosted image | Upload images to Google Drive → right-click → Get link → convert to direct link, OR use an image hosting service |
| `[landing_page_url]` | Your deployed landing page URL | e.g. `https://your-domain.com/insulation-claims/` |

## Step 1.4 — Add Control Columns

Add these 3 extra columns to the **right side** of each content tab (Facebook Feed, Instagram Feed, etc.):

| Column | Values | Purpose |
|--------|--------|---------|
| `scheduled_date` | Date in `YYYY-MM-DD` format | When this post should go live |
| `scheduled_time` | Time in `HH:MM` format (24hr) | What time to publish |
| `status` | `draft` / `approved` / `published` / `failed` | Workflow tracking |

**Initial setup:** Set all rows to `status = draft`. Change to `approved` when you've reviewed and want them queued for publishing.

## Step 1.5 — Create the Leads Tab

Create a tab called **"Leads"** with these column headers in row 1:

```
A: submitted_at
B: source
C: full_name
D: phone
E: email
F: address
G: postcode
H: property_type
I: foam_location
J: install_year
K: installer
L: installer_name
M: surveyor_pre_check
N: issues
O: ownership
P: urgency
Q: preferred_contact
R: referral_source
S: risk_level (or severity_level, eligibility_level, etc.)
T: extra_data (JSON string of any additional quiz/calculator data)
U: lead_status
V: assigned_to
W: notes
```

Set `U` (lead_status) to default: `new`. You'll update this as leads are processed.

---

# PILLAR 2: POST GENERATION & PUBLISHING

## Scenario 1 — Batch Generate Post Images

**Purpose:** Read rows from your Google Sheet → generate Canva designs → export as images → save to Google Drive.

### Prerequisites
- Canva Pro account
- Make.com account (free tier works for testing)
- Google Sheets + Google Drive connected to Make.com

### Build the Scenario

```
┌─────────────┐    ┌──────────┐    ┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│ Google       │    │ Filter:  │    │ Canva:      │    │ Canva:       │    │ Google Drive: │
│ Sheets:      │ →  │ status = │ →  │ Create      │ →  │ Export       │ →  │ Upload File   │
│ Search Rows  │    │ approved │    │ Design      │    │ Design (PNG) │    │               │
└─────────────┘    └──────────┘    └─────────────┘    └──────────────┘    └──────────────┘
                                                                                │
                                                                                ▼
                                                                       ┌──────────────┐
                                                                       │ Google Sheets:│
                                                                       │ Update Row    │
                                                                       │ status →      │
                                                                       │ "generated"   │
                                                                       └──────────────┘
```

### Module 1: Google Sheets — Search Rows

1. In Make.com, click **"+"** to add a module → search **"Google Sheets"**
2. Select **"Search Rows"**
3. **Connection:** Click "Add" → authorise your Google account
4. **Spreadsheet:** Select "Insulation Campaign — Master"
5. **Sheet:** Select "Facebook Feed" (you'll clone this scenario for other tabs later)
6. **Filter:** Set filter: Column `status` → **Text operators: Equal to** → Value: `approved`
7. **Sort order:** Column `scheduled_date` → Ascending
8. **Maximum number of returned rows:** `5` (start small for testing)

### Module 2: Canva — Create a Design

1. Add module → search **"Canva"** → select **"Create a Design"**
2. **Connection:** Click "Add" → you'll be redirected to Canva to authorise
3. **Brand Template ID:** Map to the `template_id` column from Module 1:
   - Click the field → click the Google Sheets module output → select `template_id`
4. **Autofill text data — click "Add item" for each:**

   | Canva placeholder | Map to Sheet column |
   |-------------------|---------------------|
   | `headline` | `headline` from Module 1 |
   | `subheadline` | `subheadline` from Module 1 |
   | `cta_text` | `cta_text` from Module 1 |

5. **Image data (if your Canva plan supports it):**
   - **Image placeholder name:** `background` (or whatever you named it in the template)
   - **Image URL:** Map to `image_url` from Module 1

### Module 3: Canva — Export a Design

1. Add module → **"Canva"** → **"Export a Design"**
2. **Design ID:** Map from Module 2 output (the design ID created in previous step)
3. **Format:** `PNG`
4. **Quality:** `high` (or `regular` to save space)
5. **Pages:** `1`

### Module 4: Google Drive — Upload a File

1. Add module → **"Google Drive"** → **"Upload a File"**
2. **Connection:** Your Google account
3. **Folder:** Create and select: `Insulation Campaign/Generated/Facebook Feed/`
4. **File name:** Build with formula:
   ```
   {{Module1.platform}}_{{Module1.row}}_{{Module1.content_angle}}_{{formatDate(now; "YYYY-MM-DD")}}.png
   ```
5. **File data:** Map from Module 3 output (the exported PNG binary)

### Module 5: Google Sheets — Update a Row

1. Add module → **"Google Sheets"** → **"Update a Row"**
2. **Spreadsheet:** Same as Module 1
3. **Sheet:** Same tab
4. **Row number:** Map from Module 1 output (`__ROW_NUMBER__` or the row identifier)
5. **status column:** Set to `generated`

### Test It

1. Set ONE row in your Facebook Feed tab to `status = approved`
2. Click **"Run once"** in Make.com
3. Verify:
   - A PNG appears in your Google Drive folder
   - The sheet row status changed to `generated`
   - The image looks correct with your headline/subheadline/CTA

### Clone for Other Platforms

Right-click the scenario → **"Clone"** → change:
- Module 1: Switch to "Instagram Feed" sheet
- Module 4: Change Drive folder to `Insulation Campaign/Generated/Instagram Feed/`
- Repeat for Instagram Stories, LinkedIn, etc.

---

## Scenario 2 — Auto-Publish to Social Media

**Purpose:** Take generated images and publish them to Facebook, Instagram, and LinkedIn automatically.

```
┌─────────────┐    ┌──────────┐    ┌─────────────────┐
│ Google       │    │ Router   │    │ Facebook Pages:  │
│ Sheets:      │ →  │          │ →  │ Create a Post    │
│ Search Rows  │    │          │    └─────────────────┘
│ (status =    │    │          │    ┌─────────────────┐
│  generated)  │    │          │ →  │ Instagram:       │
│              │    │          │    │ Create a Post    │
│              │    │          │    └─────────────────┘
│              │    │          │    ┌─────────────────┐
│              │    │          │ →  │ LinkedIn:        │
│              │    │          │    │ Create a Post    │
└─────────────┘    └──────────┘    └─────────────────┘
                                          │
                                          ▼
                                   ┌──────────────┐
                                   │ Google Sheets:│
                                   │ Update status │
                                   │ → "published" │
                                   └──────────────┘
```

### Module 1: Google Sheets — Search Rows

- **Sheet:** "Facebook Feed" (or use a combined "Publishing Queue" tab)
- **Filter:** `status = generated` AND `scheduled_date <= today`
- **Max rows:** `3` (social platforms rate-limit; don't bulk-post too many)

### Module 2: Router

Add a **Router** module. This splits the flow based on the `platform` column:

- **Route 1 filter:** `platform = facebook_feed`
- **Route 2 filter:** `platform = instagram_feed`
- **Route 3 filter:** `platform = linkedin`

### Route 1 — Facebook Pages: Create a Post

1. Add module → **"Facebook Pages"** → **"Create a Post"**
2. **Connection:** Connect your Facebook Page (you need a Facebook Page + Business account)
3. **Page:** Select your business page
4. **Message:** Map to `primary_text` column (this is the post body)
5. **Link:** Map to `landing_url` column
6. **Photo URL:** Map to the generated image URL (from Google Drive) OR attach the file directly

**To get the Google Drive image URL:**
- In a prior step, use **Google Drive → Get a Share Link** module to make the file public
- Map that public URL as the photo

### Route 2 — Instagram: Create a Post

1. Add module → **"Instagram"** (via Facebook/Instagram Business API)
2. **Connection:** Same Facebook Business connection
3. **Instagram Account:** Select your Instagram business account
4. **Caption:** Map to `caption` column + append `hashtags` column:
   ```
   {{Module1.caption}}

   {{Module1.hashtags}}
   ```
5. **Image URL:** The public Google Drive URL of the generated image

**Important:** Instagram API requires images hosted at a publicly accessible URL. Google Drive share links work, or use a CDN/image host.

### Route 3 — LinkedIn: Create a Post

1. Add module → **"LinkedIn"** → **"Create a User Post"** (or Company Post)
2. **Connection:** Authorise your LinkedIn account
3. **Text:** Map to `post_text` column + append `hashtags`:
   ```
   {{Module1.post_text}}

   {{Module1.hashtags}}
   ```
4. **Image:** Upload from Google Drive output
5. **Visibility:** `PUBLIC`

### Module 3: Google Sheets — Update Row

After each successful publish:
- Update `status` → `published`
- Optionally store the post URL in a new column `published_url`

### Schedule

- Set the scenario trigger to run **daily at your preferred time** (e.g., 10:00 AM UK time)
- Or run **3x daily** (morning, afternoon, evening) with 1 post per run

---

# PILLAR 3: LEAD GATHERING

## How It Works

```
┌───────────────┐    ┌─────────────┐    ┌──────────────────┐
│ canvablog1-5   │    │ Make.com    │    │ Google Sheets:   │
│ .html forms    │ →  │ Webhook     │ →  │ Add row to       │
│ (user submits) │    │ (receives   │    │ "Leads" tab      │
│                │    │  JSON POST) │    │                  │
└───────────────┘    └─────────────┘    └──────────────────┘
                                               │
                          ┌────────────────────┤
                          ▼                    ▼
                   ┌──────────────┐    ┌──────────────┐
                   │ Email:       │    │ Slack:       │
                   │ Send alert   │    │ Post to      │
                   │ to sales     │    │ #leads       │
                   │ team         │    │ channel      │
                   └──────────────┘    └──────────────┘
```

## Scenario 3 — Webhook → Lead Sheet

This is the most important scenario. It captures every form submission from your canvablog widgets.

### Step 3.1 — Create the Webhook

1. In Make.com, create a **new scenario**
2. Click **"+"** → search **"Webhooks"** → select **"Custom webhook"**
3. Click **"Add"** → give it a name: `Insulation Lead Capture`
4. Make.com will generate a **webhook URL** like:
   ```
   https://hook.eu1.make.com/xxxxxxxxxxxxxxxxxxxx
   ```
5. **Copy this URL** — you'll paste it into your canvablog HTML files

### Step 3.2 — Update Your canvablog Files with the Webhook URL

In each of the 5 canvablog HTML files (`canvablog1.html` through `canvablog5.html`), find this line near the top of the `<script>` block:

```javascript
var WEBHOOK='';    // canvablog1
var WH='';         // canvablog2-5
```

Replace the empty string with your Make.com webhook URL:

```javascript
var WEBHOOK='https://hook.eu1.make.com/xxxxxxxxxxxxxxxxxxxx';
var WH='https://hook.eu1.make.com/xxxxxxxxxxxxxxxxxxxx';
```

**Do this for all 5 files.** After this change, every form submission will POST a JSON payload to Make.com.

### Step 3.3 — Determine the Data Structure

Click **"Run once"** on your Make.com scenario, then open one of your canvablog forms in a browser and submit a test entry. Make.com will capture the JSON payload and auto-detect all the fields.

The payload from each form includes:

```json
{
  "source": "canva_health_check",
  "submitted_at": "2026-02-25T13:00:00.000Z",
  "full_name": "John Smith",
  "phone": "07700 900000",
  "email": "john@example.com",
  "address": "12 High Street",
  "postcode": "B1 1BB",
  "property_type": "semi",
  "foam_location": "loft_underside",
  "install_year": "3-5",
  "installer": "company_known",
  "installer_name": "ABC Insulation Ltd",
  "surveyor_pre_check": "no",
  "issues": ["damp", "mould", "mortgage_blocked"],
  "ownership": "owner_occupier",
  "urgency": "urgent_sale",
  "preferred_contact": "phone",
  "referral_source": "facebook",
  "risk_level": "urgent",
  "referrer": "https://facebook.com/..."
}
```

### Step 3.4 — Add Google Sheets Module

1. After the Webhook module, add **"Google Sheets"** → **"Add a Row"**
2. **Spreadsheet:** "Insulation Campaign — Master"
3. **Sheet:** "Leads"
4. **Map each column:**

| Sheet column | Map to webhook field |
|---|---|
| A: submitted_at | `submitted_at` |
| B: source | `source` |
| C: full_name | `full_name` |
| D: phone | `phone` |
| E: email | `email` |
| F: address | `address` |
| G: postcode | `postcode` |
| H: property_type | `property_type` |
| I: foam_location | `foam_location` |
| J: install_year | `install_year` |
| K: installer | `installer` |
| L: installer_name | `installer_name` |
| M: surveyor_pre_check | `surveyor_pre_check` |
| N: issues | Use `join({{webhook.issues}}; ", ")` to flatten the array into a comma-separated string |
| O: ownership | `ownership` |
| P: urgency | `urgency` |
| Q: preferred_contact | `preferred_contact` |
| R: referral_source | `referral_source` |
| S: risk_level | `risk_level` (or `severity_level` / `eligibility_level` depending on the form) |
| T: extra_data | Use `toString({{webhook}})` to capture the full JSON as a string for any extra fields |
| U: lead_status | Hardcode: `new` |
| V: assigned_to | Leave empty (filled manually or by a later automation) |
| W: notes | Leave empty |

### Step 3.5 — Test the Webhook

1. Click **"Run once"** in Make.com
2. Open `canvablog1.html` in your browser (via the local server or deployed URL)
3. Fill in the form with test data and submit
4. Go back to Make.com — you should see a green checkmark showing the scenario executed
5. Check your Google Sheet "Leads" tab — the test data should appear as a new row

---

## Scenario 4 — Lead Notifications & CRM

**Purpose:** When a new lead arrives, instantly alert your sales team and optionally push to a CRM.

```
┌─────────────┐    ┌──────────┐    ┌─────────────┐    ┌──────────────┐
│ Google       │    │ Router   │    │ Email:       │    │ Slack:       │
│ Sheets:      │ →  │          │ →  │ Send to      │ →  │ Post to      │
│ Watch New    │    │          │    │ sales team   │    │ #leads       │
│ Rows (Leads) │    │          │    └─────────────┘    └──────────────┘
└─────────────┘    └──────────┘           │
                        │                 │
                        ▼                 ▼
                 ┌──────────────┐  ┌──────────────┐
                 │ CRM:         │  │ Google Sheets:│
                 │ Create       │  │ Update status │
                 │ Contact      │  │ → "notified"  │
                 │ (HubSpot /   │  └──────────────┘
                 │  Pipedrive)  │
                 └──────────────┘
```

### Module 1: Google Sheets — Watch New Rows

1. Add module → **"Google Sheets"** → **"Watch New Rows"**
2. **Spreadsheet:** "Insulation Campaign — Master"
3. **Sheet:** "Leads"
4. **Trigger:** This polls for new rows at your chosen interval
5. Set interval to **every 5 minutes** (or 1 minute on paid Make.com plans)

### Module 2: Router — Split by Urgency

Add a Router to handle leads differently based on urgency:

- **Route 1 (URGENT):** Filter: `urgency = urgent_sale`
  - Sends immediate email + Slack alert
- **Route 2 (NORMAL):** Filter: all other values
  - Sends regular email notification only

### Module 3a: Email — Send Urgent Alert

1. Add module → **"Email"** → **"Send an Email"** (or use Gmail / Outlook module)
2. **To:** `sales@your-company.com` (or multiple recipients)
3. **Subject:**
   ```
   🚨 URGENT LEAD: {{full_name}} — {{postcode}} — Sale/Remortgage in Progress
   ```
4. **Body (HTML):**
   ```html
   <h2>New Urgent Lead</h2>
   <table>
     <tr><td><b>Name:</b></td><td>{{full_name}}</td></tr>
     <tr><td><b>Phone:</b></td><td>{{phone}}</td></tr>
     <tr><td><b>Email:</b></td><td>{{email}}</td></tr>
     <tr><td><b>Address:</b></td><td>{{address}}, {{postcode}}</td></tr>
     <tr><td><b>Property:</b></td><td>{{property_type}}</td></tr>
     <tr><td><b>Insulation:</b></td><td>{{foam_location}}</td></tr>
     <tr><td><b>Installed:</b></td><td>{{install_year}}</td></tr>
     <tr><td><b>Installer:</b></td><td>{{installer}} {{installer_name}}</td></tr>
     <tr><td><b>Survey done?</b></td><td>{{surveyor_pre_check}}</td></tr>
     <tr><td><b>Issues:</b></td><td>{{issues}}</td></tr>
     <tr><td><b>Ownership:</b></td><td>{{ownership}}</td></tr>
     <tr><td><b>Urgency:</b></td><td>{{urgency}}</td></tr>
     <tr><td><b>Source:</b></td><td>{{source}}</td></tr>
     <tr><td><b>Contact pref:</b></td><td>{{preferred_contact}}</td></tr>
     <tr><td><b>Heard via:</b></td><td>{{referral_source}}</td></tr>
   </table>
   <p><b>⚠️ This lead is URGENT — sale or remortgage in progress. Call within 1 hour.</b></p>
   ```

### Module 3b: Email — Normal Lead

Same as above but with a less urgent subject line:
```
New Lead: {{full_name}} — {{postcode}} — {{source}}
```

### Module 4: Slack — Post to Channel

1. Add module → **"Slack"** → **"Create a Message"**
2. **Connection:** Authorise your Slack workspace
3. **Channel:** `#leads` (create this channel first)
4. **Text:**
   ```
   📋 *New Lead*
   *Name:* {{full_name}}
   *Phone:* {{phone}}
   *Postcode:* {{postcode}}
   *Property:* {{property_type}}
   *Issues:* {{issues}}
   *Urgency:* {{urgency}}
   *Source:* {{source}} ({{referral_source}})
   ```

### Module 5 (Optional): CRM — Create Contact

If you use HubSpot, Pipedrive, or another CRM:

**HubSpot example:**
1. Add module → **"HubSpot"** → **"Create a Contact"**
2. Map fields:
   - First name / Last name: Split from `full_name`
   - Email: `email`
   - Phone: `phone`
   - Address: `address`
   - Postcode: `postcode`
3. Add custom properties for:
   - `property_type`, `foam_location`, `install_year`, `urgency`, `issues`

**Pipedrive example:**
1. Add module → **"Pipedrive"** → **"Create a Person"** + **"Create a Deal"**
2. Person: name, phone, email
3. Deal: title = `Insulation Claim — {{full_name}} — {{postcode}}`, value = based on urgency

### Module 6: Google Sheets — Update Lead Status

1. Add module → **"Google Sheets"** → **"Update a Row"**
2. Set `lead_status` column to `notified`

---

## Scenario 5 — Daily Post Scheduler

**Purpose:** Automatically trigger post generation and publishing on a schedule.

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Schedule:     │    │ HTTP:        │    │ (triggers    │
│ Every day     │ →  │ Make a       │ →  │  Scenario 1  │
│ at 09:00 UK   │    │ Request to   │    │  and/or 2)   │
│              │    │ run Scenario │    │              │
│              │    │ 1 & 2        │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
```

### Option A: Simple — Schedule directly on Scenarios 1 & 2

1. Open Scenario 1 (Batch Generate)
2. Click the **clock icon** (scheduling) at the bottom
3. Set: **"At regular intervals"** → every **1 day** → at **09:00**
4. Do the same for Scenario 2 (Auto-Publish) but set it for **10:00** (1 hour after generation)

### Option B: Advanced — Master Scheduler

Create a separate scenario that triggers the others:

1. **Trigger:** Schedule module → daily at 09:00
2. **Module 2:** HTTP → Make a Request
   - URL: The webhook URL of Scenario 1 (you can add a webhook trigger to Scenario 1)
   - Method: POST
   - Body: `{"action": "generate"}`
3. **Module 3:** Wait 30 minutes (use the Sleep/Delay module)
4. **Module 4:** HTTP → Make a Request → trigger Scenario 2

---

# DEPLOYMENT CHECKLIST

## Phase 1: Sheets (30 minutes)

| # | Task | Status |
|---|------|--------|
| 1 | Create Google Sheet "Insulation Campaign — Master" | ☐ |
| 2 | Create 7 tabs (6 content + 1 Leads) | ☐ |
| 3 | Import CSV data into each content tab | ☐ |
| 4 | Add `scheduled_date`, `scheduled_time`, `status` columns | ☐ |
| 5 | Create Leads tab with column headers | ☐ |
| 6 | Create Canva Pro account (if not already) | ☐ |
| 7 | Build Canva templates (see `Canva_Make_Automation_Instructions.md`) | ☐ |
| 8 | Copy template IDs into `template_id` column in each tab | ☐ |
| 9 | Upload images → paste URLs into `image_url` column | ☐ |
| 10 | Replace `[landing_page_url]` with your actual URL | ☐ |

## Phase 2: Post Generation (45 minutes)

| # | Task | Status |
|---|------|--------|
| 11 | Create Make.com account → connect Google Sheets | ☐ |
| 12 | Connect Canva to Make.com | ☐ |
| 13 | Connect Google Drive to Make.com | ☐ |
| 14 | Create Google Drive folder structure (see below) | ☐ |
| 15 | Build Scenario 1 (Sheet → Canva → Drive) | ☐ |
| 16 | Test with 1 row → verify image output | ☐ |
| 17 | Clone scenario for each platform tab | ☐ |
| 18 | Connect Facebook Page to Make.com | ☐ |
| 19 | Connect Instagram Business account | ☐ |
| 20 | Connect LinkedIn to Make.com | ☐ |
| 21 | Build Scenario 2 (Auto-Publish) | ☐ |
| 22 | Test with 1 post per platform | ☐ |
| 23 | Set up scheduling (Scenario 5 or direct) | ☐ |

## Phase 3: Lead Gathering (30 minutes)

| # | Task | Status |
|---|------|--------|
| 24 | Build Scenario 3 (Webhook → Lead Sheet) | ☐ |
| 25 | Copy webhook URL into all 5 canvablog HTML files | ☐ |
| 26 | Deploy/host canvablog HTML files | ☐ |
| 27 | Test: submit form → verify row in Leads tab | ☐ |
| 28 | Build Scenario 4 (Lead → Email + Slack) | ☐ |
| 29 | Connect email (Gmail/Outlook/SMTP) | ☐ |
| 30 | Connect Slack → create #leads channel | ☐ |
| 31 | Test: submit form → verify email + Slack alert | ☐ |
| 32 | Optional: Connect CRM (HubSpot/Pipedrive) | ☐ |
| 33 | Set all scenarios to active (ON) | ☐ |

## Google Drive Folder Structure

Create this in your Google Drive:

```
Insulation Campaign/
├── Generated/
│   ├── Facebook Feed/
│   ├── Instagram Feed/
│   ├── Instagram Stories/
│   ├── Instagram Reels/
│   ├── LinkedIn/
│   └── Display Banners/
├── Approved/
│   ├── Facebook Feed/
│   ├── Instagram Feed/
│   └── ...
├── Source Images/
│   ├── Damage Photos/
│   ├── Before-After/
│   └── Stock/
└── A-B Tests/
    ├── Version A/
    └── Version B/
```

---

# TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| Canva module says "Template not found" | Make sure you're using a **Brand Template** (saved via File → Save as Template), not a regular design. Also verify the template ID from the URL. |
| Instagram publish fails | Instagram API requires a **Business Account** linked to a **Facebook Page**. Images must be at a publicly accessible URL (not a private Google Drive link). |
| Webhook not receiving data | Check that the webhook URL is correctly pasted in the canvablog HTML files (no trailing spaces, correct `https://`). Open browser DevTools → Console to see if there's a fetch error. |
| Google Sheets "Add Row" puts data in wrong columns | Re-run the webhook with test data so Make.com detects the correct field structure. Then re-map the columns. |
| Leads sheet shows `[object Object]` for issues | Use `join({{webhook.issues}}; ", ")` in the mapping to flatten the array. |
| Scheduled scenario doesn't run | Check Make.com's scheduling settings and ensure your plan supports the polling interval. Free tier = 15-minute minimum interval. |
| Rate limiting on social platforms | Facebook: max ~25 posts/day per page. Instagram: max ~25 posts/day. LinkedIn: max ~100 posts/day. Space out your publishing. |
| Canva export times out | Large or complex templates can take time. Add a **Sleep** module (10 seconds) between Create and Export. |

---

# COST ESTIMATES

| Service | Plan needed | Approx. cost |
|---------|------------|-------------|
| Make.com | Pro (10,000 ops/month) | ~$9/month |
| Canva | Pro (API access) | ~$12/month |
| Google Sheets | Free (Google Workspace) | $0 |
| Google Drive | Free (15GB) | $0 |
| Facebook/Instagram | Free (Business account) | $0 |
| LinkedIn | Free (Company page) | $0 |
| Slack | Free tier | $0 |
| **Total** | | **~$21/month** |

For higher volume (50+ posts/week, 100+ leads/month), upgrade Make.com to Teams (~$29/month).
