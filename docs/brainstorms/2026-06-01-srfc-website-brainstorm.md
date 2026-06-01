---
date: 2026-06-01
topic: srfc-website
---

# SRFC Website Brainstorm

## What We're Building
A professional Node.js (Next.js) website for SRFC (Shri Raghavendra Financial Consultancy) featuring a dynamic UI that matches the provided reference screenshot (dark header, bold hero image, and overlapping service cards with a red color scheme). It will use a JSON configuration file to easily manage team, services, company details, client testimonials, and client logos. The site will include a contact form powered by a standard Gmail SMTP, integrate a Google Maps location, and be packaged with Docker for straightforward deployment to a private VPS. A dedicated social proof section (Client Logos and Testimonials) will be integrated directly above the footer.

## Why This Approach
- **Simplicity vs Flexibility**: Next.js provides the robust framework required, while using a JSON config file removes the need to build and maintain a complex admin dashboard. This makes the system extremely simple to manage directly via code/file replacements.
- **SQLite**: Using SQLite aligns with the requirement for a free, lightweight open-source database without the overhead of maintaining a separate DB server on the VPS.
- **Docker**: Containerizing the app with Docker ensures that deployment to the private VPS is reproducible and isolated.
- **Gmail SMTP**: A cost-effective and immediate solution for low-volume contact form submissions.

## Key Decisions
- **Stack**: Next.js (React), Prisma (SQLite), Tailwind CSS.
- **Data Management**: Services, Team Members, and About Us content will live in a `data/config.json` file.
- **Logo**: Managed as a static file (`public/logo.png`) that can be replaced directly.
- **Email Delivery**: Nodemailer configured with standard Gmail SMTP.
- **Design System**: Persisted in `design-system/srfc/MASTER.md`. Dark Mode (OLED) style with Primary: `#0F0F23`, Secondary: `#1E1B4B`, CTA: `#E11D48`. Typography: Lexend (Heading) and Source Sans 3 (Body). Overlapping cards for the services section.

## Open Questions
- None.

## Next Steps
- Generate implementation plan and transition to `/ia-plan`.

<details>
<summary>Q&A Interview Log</summary>

**Q: Lightweight SQL database:** Would SQLite work for you?
**A:** Would SQLite work

**Q: Dynamic Company Data:** Would you be open to using a simple JSON configuration file instead of an `.env` file for arrays of data?
**A:** JSON configuration file instead

**Q: Email Trigger:** Standard SMTP using Gmail?
**A:** Gmail (auditsrfc@gmail.com) via standard SMTP

**Q: Logo Updating:** Through an Admin Dashboard or replacing an image file?
**A:** Skip logo update (replace file directly)

**Q: UI/UX Aesthetics:** Any specific colors, competitor websites?
**A:** UI and UX i attached the Screen shot (Dark theme, Red accents, Hero image, Overlapping service cards)

**Q: Docker Deployment:** Preferred hosting provider?
**A:** I have a private VS (VPS) please plan accordingly

</details>
