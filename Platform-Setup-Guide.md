# Carter Langfold Lead Generation Campaign: Platform Setup Guide

This guide covers the technical configuration required in **Meta Business Suite**, **Google Ads**, and **Google Analytics 4 (GA4)** to run the spray foam removal lead generation campaign.

---

## ⚠️ CRITICAL: Industry Scam Warning

The spray foam removal industry is plagued by fraudulent operators. To maintain legitimacy and avoid platform bans, **all advertising must avoid scam patterns**:

### Prohibited Messaging (Will Get Ads Rejected or Account Banned)
- ❌ "Your home is WORTHLESS without removal"
- ❌ "GUARANTEED mortgage approval"
- ❌ "Instant certification"
- ❌ "Act NOW or lose your home"
- ❌ "Fire hazard" claims without evidence
- ❌ Cold-call style urgency tactics

### Required Practices
- ✅ Honest assessment (removal may not always be necessary)
- ✅ Transparent pricing with written quotes
- ✅ RICS-compliant survey process
- ✅ Cooling-off period (no same-day contracts)
- ✅ Verifiable company credentials
- ✅ Certificates accepted by named lenders (TSB, Halifax, Nationwide)

### Why This Matters
- Fraudulent operators promise "instant certificates" that lenders reject
- Properties can be **permanently flagged** in lender systems due to fake paperwork
- Meta and Google actively review ads in this space due to consumer complaints
- Elderly homeowners (equity release demographic) are frequent scam targets

---

## Table of Contents

1. [Meta Business Suite Setup](#1-meta-business-suite-setup)
2. [Meta Ads Manager Configuration](#2-meta-ads-manager-configuration)
3. [Google Ads Setup](#3-google-ads-setup)
4. [Google Analytics 4 (GA4) Configuration](#4-google-analytics-4-ga4-configuration)
5. [Conversion Tracking Integration](#5-conversion-tracking-integration)
6. [CRM Webhook Configuration](#6-crm-webhook-configuration)
7. [Testing & Validation Checklist](#7-testing--validation-checklist)

---

## 1. Meta Business Suite Setup

### 1.1 Business Manager Account

1. Go to [business.facebook.com](https://business.facebook.com)
2. Create a Business Account (if not existing)
3. Add your Facebook Page and Instagram Account
4. Verify your business domain: `[PLACEHOLDER_DOMAIN]`

### 1.2 Meta Pixel Installation

1. Navigate to **Events Manager** → **Connect Data Sources** → **Web**
2. Select **Meta Pixel** → Name it `Carter Langfold Pixel`
3. Copy the Pixel ID: `[PLACEHOLDER_PIXEL_ID]`
4. Install the base code in the `<head>` of your website:

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '[PLACEHOLDER_PIXEL_ID]');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=[PLACEHOLDER_PIXEL_ID]&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

### 1.3 Conversions API (CAPI) Setup

For server-side tracking (recommended for iOS 14.5+ compliance):

1. In Events Manager → **Settings** → **Conversions API**
2. Choose integration method:
   - **Partner Integration** (HubSpot, Zapier) - Easiest
   - **Direct Integration** - Requires developer
3. Generate Access Token for API calls
4. Configure events to send: `Lead`, `CompleteRegistration`

### 1.4 Custom Conversions

Create custom conversions for lead quality tracking:

| Conversion Name | Rule | Category |
|-----------------|------|----------|
| `Lead Form Submitted` | URL contains `/thank-you` OR Event = `Lead` | Lead |
| `Qualified Lead` | Custom event from CRM webhook | Lead |
| `Assessment Booked` | Custom event from CRM | Schedule |

---

## 2. Meta Ads Manager Configuration

### 2.1 Campaign Structure

```
Campaign: Carter Langfold - Spray Foam Removal (Leads)
├── Ad Set: England - High Intent
│   ├── Ad: Video - Before/After
│   ├── Ad: Carousel - 3 Steps
│   └── Ad: Static - Problem Statement
├── Ad Set: Wales - High Intent
│   └── [Same ads]
└── Ad Set: Northern Ireland - High Intent
    └── [Same ads]
```

### 2.2 Campaign Settings

| Setting | Value |
|---------|-------|
| **Campaign Objective** | Leads |
| **Campaign Budget** | £50-100/day (start conservative) |
| **Bid Strategy** | Lowest cost (initially) → Cost cap after data |
| **Special Ad Category** | None (construction services exempt) |

### 2.3 Ad Set Configuration

#### Location Targeting (CRITICAL)

**Method 1: Positive Targeting (Recommended)**
1. Click **Edit Locations**
2. Search and add individually:
   - `England, United Kingdom`
   - `Wales, United Kingdom`
   - `Northern Ireland, United Kingdom`
3. Do NOT add `United Kingdom` as a whole

**Method 2: Exclusion**
1. Add `United Kingdom`
2. Click **Exclude** → Add `Scotland`

**Scottish Postcodes to Exclude (if using postcode targeting):**
```
AB, DD, DG, EH, FK, G, HS, IV, KA, KW, KY, ML, PA, PH, TD, ZE
```

#### Audience Targeting

| Parameter | Setting |
|-----------|---------|
| **Age** | 30-65+ |
| **Gender** | All |
| **Detailed Targeting** | Homeowners, Property, Mortgages, Home improvement |
| **Placements** | Automatic (or manual: Facebook Feed, Instagram Feed, Stories) |

#### Budget & Schedule

| Parameter | Setting |
|-----------|---------|
| **Daily Budget** | £20-30 per ad set |
| **Schedule** | Run continuously |
| **Delivery Optimization** | Leads |

### 2.4 Instant Form Configuration

1. In Ad creation, select **Instant Form** as destination
2. Click **Create Form**

**Form Settings:**

| Section | Configuration |
|---------|---------------|
| **Form Type** | More Volume (for initial testing) → Higher Intent (after optimization) |
| **Intro** | Headline: "Get Your Free Spray Foam Removal Quote" |
| | Image: Professional team photo |
| | Layout: Paragraph |
| | Body text: "Find out how much it costs to restore your home's mortgage eligibility. Free, no-obligation assessment within 24 hours." |

**Questions:**

| Field | Type | Required |
|-------|------|----------|
| Full Name | Pre-filled | Yes |
| Email | Pre-filled | Yes |
| Phone Number | Pre-filled | Yes |
| Postcode | Short Answer | Yes |
| Property Type | Multiple Choice: Detached / Semi-detached / Terraced / Bungalow / Other | Yes |
| Foam Location | Multiple Choice: Loft only / Walls only / Both / Not sure | Yes |
| Situation | Multiple Choice: Selling now / Remortgaging soon / Planning ahead / Just researching | Yes |

**Privacy Policy:**
- Link: `[PLACEHOLDER_PRIVACY_POLICY_URL]`
- Custom disclaimer: "By submitting this form, you agree to be contacted by Carter Langfold regarding your enquiry. We will not share your data with third parties."

**Completion:**
- Headline: "Thank You!"
- Description: "We'll call you within 24 hours to discuss your free assessment."
- CTA: "Visit Website" → `[PLACEHOLDER_WEBSITE]`

---

## 3. Google Ads Setup

### 3.1 Account Structure

```
Account: Carter Langfold
├── Campaign: Search - Spray Foam Removal (High Intent)
│   ├── Ad Group: Spray Foam Removal
│   ├── Ad Group: Mortgage Rejection
│   └── Ad Group: Lender Specific (TSB, Halifax)
├── Campaign: Search - Problem Aware
│   ├── Ad Group: Spray Foam Problems
│   └── Ad Group: Can't Sell House
└── Campaign: Display - Remarketing
    └── Ad Group: Website Visitors
```

### 3.2 Campaign Settings

| Setting | Value |
|---------|-------|
| **Campaign Type** | Search |
| **Goal** | Leads |
| **Networks** | Search Network only (disable Display) |
| **Locations** | England, Wales, Northern Ireland |
| **Location Exclusions** | Scotland |
| **Location Options** | "People in or regularly in your targeted locations" |
| **Language** | English |
| **Budget** | £30-50/day |
| **Bidding** | Maximize conversions (initially) → Target CPA after 30 conversions |

### 3.3 Location Configuration (Step-by-Step)

1. In Campaign Settings → **Locations**
2. Click **Enter another location**
3. Add:
   - `England, United Kingdom`
   - `Wales, United Kingdom`
   - `Northern Ireland, United Kingdom`
4. Click **Advanced search** → **Exclude**
5. Add: `Scotland, United Kingdom`
6. Under **Location options**, select:
   - ✅ "People in or regularly in your targeted locations"
   - ❌ NOT "People in, regularly in, or who've shown interest in"

### 3.4 Keyword Configuration

**Ad Group: Spray Foam Removal**

```
[spray foam removal] - Exact
[spray foam insulation removal] - Exact
"spray foam removal" - Phrase
"remove spray foam" - Phrase
spray foam removal near me - Broad Match Modifier
spray foam removal cost - Broad Match Modifier
```

**Ad Group: Mortgage Rejection**

```
[spray foam mortgage rejected] - Exact
[can't sell house spray foam] - Exact
"spray foam mortgage" - Phrase
"unmortgageable spray foam" - Phrase
TSB spray foam - Broad Match Modifier
Halifax spray foam mortgage - Broad Match Modifier
```

**Negative Keywords (Account Level):**

```
-installation
-install
-buy
-kit
-DIY
-Scotland
-Edinburgh
-Glasgow
-Aberdeen
-Dundee
```

### 3.5 Ad Copy

**Responsive Search Ad 1:**

Headlines (max 30 chars each):
1. Spray Foam Removal Experts
2. Mortgage Rejected? We Help
3. TSB Halifax Approved Certs
4. Free Survey | Fast Quotes
5. Restore Mortgage Eligibility
6. Professional Foam Removal
7. From £50/m² | Certified
8. 250,000+ UK Homes Affected
9. Can't Sell? We Fix It
10. Lender-Accepted Certificates

Descriptions (max 90 chars each):
1. Professional spray foam removal with certificates accepted by TSB, Halifax & Nationwide.
2. Over 250,000 UK homes affected. Restore your property's mortgage eligibility today.
3. Free property assessment. Certified removal. Replacement insulation included. Call now.
4. Struggling to sell or remortgage? Our certified removal restores your home's value.

**Ad Extensions:**

| Extension Type | Content |
|----------------|---------|
| **Sitelinks** | Free Quote, Our Process, FAQs, Contact Us |
| **Callouts** | Free Survey, Lender Approved, Finance Available, 24hr Response |
| **Structured Snippets** | Services: Foam Removal, Timber Inspection, Replacement Insulation |
| **Call Extension** | `[PLACEHOLDER_PHONE]` |
| **Lead Form Extension** | See below |

### 3.6 Lead Form Extension

1. In Ads & Extensions → **Extensions** → **Lead Form**
2. Create new form:

| Field | Configuration |
|-------|---------------|
| **Headline** | Get Your Free Spray Foam Removal Quote |
| **Business Name** | Carter Langfold |
| **Description** | Professional removal with lender-accepted certification. Free assessment. |
| **Questions** | Name, Email, Phone Number, Postal Code |
| **Custom Question** | "What's your situation?" - Dropdown: Selling / Remortgaging / Equity Release / Other |
| **Privacy Policy** | `[PLACEHOLDER_PRIVACY_POLICY_URL]` |
| **Background Image** | Professional team/completed work |
| **CTA** | Get Quote |
| **Post-submit Headline** | Thanks for your enquiry |
| **Post-submit Description** | We'll call you within 24 hours |
| **Post-submit CTA** | Visit Site → `[PLACEHOLDER_WEBSITE]` |

---

## 4. Google Analytics 4 (GA4) Configuration

### 4.1 Property Setup

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create new GA4 property: `Carter Langfold - Production`
3. Data Stream: Web → `[PLACEHOLDER_DOMAIN]`
4. Copy Measurement ID: `G-XXXXXXXXXX`

### 4.2 Install GA4 Tag

**Option A: Google Tag (gtag.js)**

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Option B: Google Tag Manager (Recommended)**

1. Create GTM container
2. Add GA4 Configuration tag with Measurement ID
3. Trigger: All Pages

### 4.3 Event Configuration

**Standard Events (Auto-tracked):**
- `page_view`
- `scroll`
- `click`
- `file_download`
- `form_start`
- `form_submit`

**Custom Events to Create:**

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `generate_lead` | Form submission | `lead_source`, `form_name`, `postcode` |
| `qualified_lead` | CRM webhook | `lead_id`, `qualification_status` |
| `assessment_booked` | CRM webhook | `lead_id`, `booking_date` |

### 4.4 Conversion Configuration

1. Go to **Admin** → **Conversions**
2. Click **New conversion event**
3. Add:
   - `generate_lead` ✅
   - `qualified_lead` ✅
   - `assessment_booked` ✅

### 4.5 Google Ads Linking

1. **Admin** → **Product Links** → **Google Ads**
2. Link to your Google Ads account
3. Enable:
   - ✅ Enable personalized advertising
   - ✅ Enable auto-tagging

### 4.6 Audiences for Remarketing

Create these audiences in GA4:

| Audience Name | Condition | Membership Duration |
|---------------|-----------|---------------------|
| All Website Visitors | `event_name = page_view` | 30 days |
| Form Starters | `event_name = form_start` | 14 days |
| Form Abandoners | `form_start` AND NOT `generate_lead` | 7 days |
| Converters | `event_name = generate_lead` | 540 days (exclude from prospecting) |

---

## 5. Conversion Tracking Integration

### 5.1 Meta Conversions API + GA4

For accurate cross-platform attribution:

**Zapier Integration (No-code):**
1. Trigger: New Lead in Meta Lead Ads
2. Action 1: Create/Update Contact in CRM
3. Action 2: Send event to GA4 Measurement Protocol
4. Action 3: Send event to Meta Conversions API

**Direct Integration (Code):**

```javascript
// On form submission (server-side)
const sendToMeta = async (leadData) => {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/[PIXEL_ID]/events?access_token=[ACCESS_TOKEN]`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [{
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          user_data: {
            em: hashSHA256(leadData.email),
            ph: hashSHA256(leadData.phone),
            fn: hashSHA256(leadData.firstName),
            ln: hashSHA256(leadData.lastName),
            ct: hashSHA256(leadData.city),
            zp: hashSHA256(leadData.postcode),
            country: 'gb'
          }
        }]
      })
    }
  );
};
```

### 5.2 Google Ads Conversion Import from GA4

1. In Google Ads → **Tools** → **Conversions**
2. Click **+ New conversion action**
3. Select **Import** → **Google Analytics 4 properties**
4. Select your GA4 property
5. Import: `generate_lead`, `qualified_lead`

### 5.3 Offline Conversion Import (CRM → Google Ads)

For tracking leads that convert to customers:

1. Export conversion data from CRM with GCLID
2. Format CSV:
   ```
   Google Click ID,Conversion Name,Conversion Time,Conversion Value
   abc123,Assessment Booked,2026-02-10 14:30:00,100
   ```
3. Upload in Google Ads → **Tools** → **Conversions** → **Uploads**

---

## 6. CRM Webhook Configuration

### 6.1 Meta Lead Ads → CRM

**Using Zapier:**
1. Trigger: New Lead in Facebook Lead Ads
2. Choose your Page and Form
3. Action: Create Contact in [HubSpot/Pipedrive/etc.]
4. Map fields:
   - Full Name → Contact Name
   - Email → Email
   - Phone → Phone
   - Postcode → Custom Field: Postcode
   - Property Type → Custom Field: Property Type
   - Situation → Custom Field: Lead Urgency

**Using Native Integration (HubSpot):**
1. In HubSpot → **Marketing** → **Ads**
2. Connect Facebook account
3. Select Lead Ad forms to sync
4. Map form fields to HubSpot properties

### 6.2 Google Ads Lead Forms → CRM

**Using Zapier:**
1. Trigger: New Lead Form Entry in Google Ads
2. Action: Create Contact in CRM

**Using Google Ads Webhook:**
1. In Lead Form Extension settings
2. Add webhook URL: `https://your-crm.com/webhook/google-ads`
3. Configure CRM to receive POST data

### 6.3 Lead Notification Automation

Configure immediate notifications:

| Trigger | Action | Timing |
|---------|--------|--------|
| New Lead | SMS to sales team | Immediate |
| New Lead | Email to lead (confirmation) | Immediate |
| Lead not contacted | Reminder to sales | +1 hour |
| Lead not converted | Nurture email sequence | +24 hours |

---

## 7. Testing & Validation Checklist

### Pre-Launch Checklist

**Meta:**
- [ ] Pixel installed and firing `PageView`
- [ ] Conversions API configured (if applicable)
- [ ] Custom conversions created
- [ ] Instant Form tested (submit test lead)
- [ ] Lead webhook delivering to CRM
- [ ] Location targeting excludes Scotland
- [ ] Ad creative approved

**Google Ads:**
- [ ] Conversion tracking tag installed
- [ ] GA4 linked to Google Ads
- [ ] Conversions imported from GA4
- [ ] Lead Form Extension created and tested
- [ ] Location targeting excludes Scotland
- [ ] Negative keywords added
- [ ] Ad copy approved

**GA4:**
- [ ] Data stream receiving events
- [ ] Custom events configured
- [ ] Conversions marked
- [ ] Audiences created
- [ ] Google Ads linked

**CRM:**
- [ ] Webhook receiving Meta leads
- [ ] Webhook receiving Google leads
- [ ] Auto-assignment rules configured
- [ ] Notification automations active
- [ ] Lead fields mapped correctly

### Test Procedure

1. **Meta Lead Test:**
   - Use Facebook's Lead Ads Testing Tool
   - Submit test lead
   - Verify appears in CRM within 5 minutes
   - Verify notification sent to sales

2. **Google Lead Test:**
   - Preview Lead Form Extension
   - Submit test lead
   - Verify appears in CRM
   - Verify conversion recorded in Google Ads

3. **Website Conversion Test:**
   - Visit website from ad preview
   - Submit form
   - Verify GA4 event fires
   - Verify Meta Pixel event fires
   - Verify lead appears in CRM

---

## Appendix: Placeholder Reference

Replace these placeholders before launch:

| Placeholder | Description |
|-------------|-------------|
| `[PLACEHOLDER_DOMAIN]` | Your website domain (e.g., carterlangfold.co.uk) |
| `[PLACEHOLDER_WEBSITE]` | Full website URL (e.g., https://carterlangfold.co.uk) |
| `[PLACEHOLDER_PIXEL_ID]` | Meta Pixel ID (from Events Manager) |
| `[PLACEHOLDER_PRIVACY_POLICY_URL]` | Privacy policy page URL |
| `[PLACEHOLDER_PHONE]` | Business phone number |
| `G-XXXXXXXXXX` | GA4 Measurement ID |

---

## Support & Resources

- [Meta Business Help Center](https://www.facebook.com/business/help)
- [Google Ads Help](https://support.google.com/google-ads)
- [GA4 Documentation](https://support.google.com/analytics)
- [Zapier Meta Lead Ads Integration](https://zapier.com/apps/facebook-lead-ads/integrations)

---

*Document Version: 1.0*  
*Last Updated: February 2026*  
*Author: [PLACEHOLDER]*
