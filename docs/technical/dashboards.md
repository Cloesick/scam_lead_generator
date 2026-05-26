# Dashboards (Traffic + Leads)

This guide explains a simple dashboard stack for a static Vercel site.

## Tools

- Google Analytics 4 (GA4)
- Google Search Console (GSC)
- Looker Studio (dashboarding)

## Step 1: Ensure tracking events exist

Minimum:

- GA4 `page_view`

Recommended:

- Event: `cta_click`
- Event: `generate_lead` (triggered from `lead_submit`)

See `../../TRACKING-SETUP.md`.

## Step 2: Google Search Console

- Add a property for your deployed domain
- Submit sitemap: `/sitemap.xml`

Track:

- Queries (what you rank for)
- Pages (which URLs earn impressions)
- CTR
- Average position

## Step 3: GA4 reports to rely on

- Reports -> Acquisition -> Traffic acquisition
  - Primary dimension: Session source/medium
- Reports -> Engagement -> Pages and screens
- Explore -> Free Form
  - Add dimensions:
    - Landing page
    - Session source / medium
    - Session campaign
  - Add metrics:
    - Sessions
    - Conversions (or Event count for `generate_lead`)

## Step 4: Looker Studio dashboard (recommended)

Create 2 pages:

### Page A: Executive overview

- Sessions (last 7/28/90 days)
- Leads (`generate_lead`)
- Conversion rate = leads / sessions
- Top channels (Organic, Paid Search, Paid Social)

### Page B: SEO performance

Blend GA4 + Search Console:

- Top queries by impressions
- Top pages by clicks
- CTR and position trends

### Page C: Paid + UTM performance

From GA4:

- Sessions by `session_campaign`
- Leads by `session_campaign`
- Leads by `utm_content` (creative placement)

## Step 5: UTM governance (so dashboards stay clean)

Pick one canonical schema and enforce it.

Example:

- `utm_source`: `google` | `meta`
- `utm_medium`: `cpc`
- `utm_campaign`: `spray_foam` | `national_claim`
- `utm_content`: `fb_feed` | `ig_story` | `carousel`

If you change naming every week, reporting becomes unusable.
