# Make.com + Canva — Social Media Orchestration Sheets

These CSV files are ready to import into **Google Sheets** for use with **Make.com** scenarios that auto-generate Canva social media posts.

## How to use

1. Create a Google Sheet called **"Insulation Campaign — Social Posts"**
2. For each CSV below, create a new tab with the matching name
3. Copy/paste or import the CSV contents into that tab
4. Replace `[canva_template_id]` with your actual Canva template IDs
5. Replace `[your_image_url]` with your hosted image URLs
6. Replace `[landing_page_url]` with your deployed landing page URL
7. Connect this Google Sheet to your Make.com scenario

## Sheet tabs

| File | Tab name | Platform | Posts |
|------|----------|----------|-------|
| `01_facebook_feed.csv` | Facebook Feed | Facebook | 10 posts |
| `02_instagram_feed.csv` | Instagram Feed | Instagram | 10 posts |
| `03_instagram_stories.csv` | Instagram Stories | Instagram Stories | 8 posts |
| `04_instagram_reels.csv` | Instagram Reels | Reels / TikTok | 6 posts |
| `05_linkedin.csv` | LinkedIn | LinkedIn | 5 posts |
| `06_canva_blog_widgets.csv` | Canva Blog Widgets | Embedded / Link-in-bio | 5 posts |

## Column reference

- **headline** / **subheadline** — Canva text placeholder values (`{{headline}}`, `{{subheadline}}`)
- **cta_text** — CTA button text in the Canva design
- **primary_text** — The post body text (Facebook/LinkedIn) or caption (Instagram)
- **hashtags** — Instagram/LinkedIn hashtags
- **landing_url** — The URL the post links to (landing page or canvablog widget)
- **widget_file** — The canvablog HTML file to embed or link to
- **content_angle** — The messaging angle (for filtering/A/B testing in Make.com)
- **urgency_level** — low / medium / high (for scheduling priority)
- **target_audience** — Who this post is aimed at
- **template_id** — Your Canva template ID (fill in after creating templates)
- **image_url** — Your hosted image URL (fill in after uploading assets)
- **status** — draft / approved / published (for workflow tracking)
