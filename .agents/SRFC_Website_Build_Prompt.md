# 🏗️ SRFC Financial Consultancy — Full-Stack Website Build Prompt

> Use this prompt with any AI coding assistant (Claude Code, GitHub Copilot, Cursor, etc.) or hand it directly to a developer. Every requirement, constraint, and detail is covered below.

---

## 🎯 PROJECT OVERVIEW

Build a **complete, production-ready financial consultancy website** for **SRFC (Shri Raghavendra Financial Consultancy)**. The project must be fully containerised, config-driven, and ready to deploy with a single command.

---

## 🛠️ TECH STACK

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14+ (App Router, TypeScript) |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Backend / API** | Next.js API Routes (Node.js) |
| **Database** | PostgreSQL (free, open-source) via Docker |
| **ORM** | Prisma |
| **Email** | Nodemailer (SMTP – works with Gmail App Password) |
| **Containerisation** | Docker + Docker Compose |
| **Maps** | Google Maps Embed API (no billing required for basic embed) |
| **Form Validation** | React Hook Form + Zod |
| **Animation** | Framer Motion |

---

## 📁 REQUIRED PROJECT STRUCTURE

```
srfc-website/
├── app/                          # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx                  # Home / Landing page
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── contact/page.tsx
│   └── api/
│       ├── contact/route.ts      # Contact form → email trigger + DB save
│       └── health/route.ts       # Health check for Docker
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── TeamSection.tsx
│   │   └── StatsSection.tsx
│   ├── about/
│   │   └── AboutContent.tsx
│   ├── services/
│   │   └── ServiceCard.tsx
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   └── GoogleMapEmbed.tsx
│   └── ui/                       # shadcn/ui components
├── config/
│   └── company.ts                ← ✅ SINGLE SOURCE OF TRUTH for all company data
├── lib/
│   ├── prisma.ts
│   ├── mailer.ts
│   └── validations.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   ├── logo/
│   │   └── logo.png              ← ✅ Drop new logo here + update config
│   └── images/
├── .env                          ← ✅ All secrets & config (gitignored)
├── .env.example                  ← ✅ Template committed to git
├── docker-compose.yml
├── Dockerfile
├── next.config.ts
└── README.md                     ← ✅ Full setup, deployment & update guide
```

---

## ⚙️ ENVIRONMENT FILE — `.env`

Create `.env` (gitignored) and `.env.example` (committed). **Every value below must be read from environment variables — never hardcoded.**

```env
# ─── App ───────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ─── Company (all consumed by config/company.ts) ───
NEXT_PUBLIC_COMPANY_NAME="SRFC"
NEXT_PUBLIC_COMPANY_FULL_NAME="Shri Raghavendra Financial Consultancy"
NEXT_PUBLIC_COMPANY_TAGLINE="Your Trusted Partner in Financial Excellence"
NEXT_PUBLIC_COMPANY_EMAIL="auditsrfc@gmail.com"
NEXT_PUBLIC_COMPANY_PHONE="+91-8088692737"
NEXT_PUBLIC_COMPANY_ADDRESS="MALHARI, Plot No. 15, Chandrikalayout, Lakamanahalli, Dharwad"
NEXT_PUBLIC_COMPANY_CITY="Dharwad"
NEXT_PUBLIC_COMPANY_STATE="Karnataka"
NEXT_PUBLIC_COMPANY_PINCODE="580008"
NEXT_PUBLIC_COMPANY_FOUNDED_YEAR="2018"

# ─── Social (optional, leave blank to hide) ────────
NEXT_PUBLIC_SOCIAL_LINKEDIN=""
NEXT_PUBLIC_SOCIAL_TWITTER=""
NEXT_PUBLIC_SOCIAL_FACEBOOK=""
NEXT_PUBLIC_SOCIAL_INSTAGRAM=""
NEXT_PUBLIC_SOCIAL_WHATSAPP="+918088692737"

# ─── Logo (relative to /public/logo/) ──────────────
NEXT_PUBLIC_LOGO_FILE="logo.png"
NEXT_PUBLIC_LOGO_ALT="SRFC Logo"

# ─── Team (JSON array string) ──────────────────────
NEXT_PUBLIC_TEAM='[{"name":"Pratik Belavanki","role":"Founder","bio":"CA with over a decade of expertise in audit, taxation, and corporate compliance.","image":"/images/team/pratik.jpg"},{"name":"Purnima Belavanki","role":"Co-founder & Director","bio":"Specialist in GST compliance, MCA filings, and client relationship management.","image":"/images/team/purnima.jpg"}]'

# ─── Services (JSON array string) ──────────────────
NEXT_PUBLIC_SERVICES='[{"id":"audit","title":"Audit & Accounting","icon":"BookOpen","description":"Comprehensive financial preparations, accounting solutions, and bookkeeping via Tally.","items":["Financial Statements Preparation","Accounting Solutions","Bookkeeping (Tally)"]},{"id":"tax","title":"Income Tax & GST","icon":"FileText","description":"End-to-end tax compliance services for individuals and businesses.","items":["Income Tax Returns","GST Monthly Compliances","GST Annual Compliances"]},{"id":"mca","title":"MCA Compliances","icon":"Building2","description":"Company and LLP formation, director services, and ongoing statutory compliance.","items":["OPC, LLP, Pvt & Partnership Formation","Director KYC & DSC","Other MCA Services"]},{"id":"hr","title":"PF, PT & ESIC","icon":"Users","description":"Complete payroll and statutory HR compliance management.","items":["Provident Fund (PF)","Professional Tax (PT)","ESIC Registration & Returns"]},{"id":"legal","title":"Notices & Appeals","icon":"Scale","description":"Expert end-to-end representation for tax notices and appellate proceedings.","items":["Income Tax Notices","GST Notices","Appeals & Representations"]},{"id":"web","title":"Website Building & Hosting","icon":"Globe","description":"Full-cycle web development and hosting solutions for businesses.","items":["Website Design & Development","Domain & Hosting Setup","End-to-End Maintenance"]}]'

# ─── Google Maps embed URL ──────────────────────────
# Generate from: https://maps.google.com → Share → Embed a map → Copy src URL
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.0!2d75.0!3d15.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sChandrikalayout%2C+Lakamanahalli%2C+Dharwad!5e0!3m2!1sen!2sin!4v1234567890"

# ─── Database ──────────────────────────────────────
DATABASE_URL="postgresql://srfc_user:srfc_pass@postgres:5432/srfc_db"

# ─── Email (SMTP via Gmail App Password) ───────────
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="auditsrfc@gmail.com"
SMTP_PASS="your_gmail_app_password_here"
SMTP_FROM="SRFC Website <auditsrfc@gmail.com>"
CONTACT_FORM_TO="auditsrfc@gmail.com"
```

---

## 🗂️ CONFIG FILE — `config/company.ts`

This is the **single source of truth** for all company data. It reads from environment variables and exports typed objects used across the entire app. **No component should hardcode any company data.**

```typescript
// config/company.ts
// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — update values in .env only
// ─────────────────────────────────────────────────────────────

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: string[];
}

function parseJsonEnv<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(process.env[key] ?? "") as T;
  } catch {
    return fallback;
  }
}

export const company = {
  name:         process.env.NEXT_PUBLIC_COMPANY_NAME        ?? "SRFC",
  fullName:     process.env.NEXT_PUBLIC_COMPANY_FULL_NAME   ?? "Shri Raghavendra Financial Consultancy",
  tagline:      process.env.NEXT_PUBLIC_COMPANY_TAGLINE     ?? "Your Trusted Partner in Financial Excellence",
  email:        process.env.NEXT_PUBLIC_COMPANY_EMAIL       ?? "auditsrfc@gmail.com",
  phone:        process.env.NEXT_PUBLIC_COMPANY_PHONE       ?? "+91-8088692737",
  address:      process.env.NEXT_PUBLIC_COMPANY_ADDRESS     ?? "Dharwad, Karnataka",
  city:         process.env.NEXT_PUBLIC_COMPANY_CITY        ?? "Dharwad",
  state:        process.env.NEXT_PUBLIC_COMPANY_STATE       ?? "Karnataka",
  pincode:      process.env.NEXT_PUBLIC_COMPANY_PINCODE     ?? "",
  foundedYear:  process.env.NEXT_PUBLIC_COMPANY_FOUNDED_YEAR ?? "2018",
  siteUrl:      process.env.NEXT_PUBLIC_SITE_URL            ?? "http://localhost:3000",

  logo: {
    file: process.env.NEXT_PUBLIC_LOGO_FILE ?? "logo.png",
    alt:  process.env.NEXT_PUBLIC_LOGO_ALT  ?? "SRFC Logo",
    src:  `/logo/${process.env.NEXT_PUBLIC_LOGO_FILE ?? "logo.png"}`,
  },

  social: {
    linkedin:  process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN  ?? "",
    twitter:   process.env.NEXT_PUBLIC_SOCIAL_TWITTER   ?? "",
    facebook:  process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK  ?? "",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "",
    whatsapp:  process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP  ?? "",
  },

  team: parseJsonEnv<TeamMember[]>("NEXT_PUBLIC_TEAM", []),
  services: parseJsonEnv<Service[]>("NEXT_PUBLIC_SERVICES", []),

  maps: {
    embedUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ?? "",
  },
} as const;

export type Company = typeof company;
```

---

## 📄 PAGES TO BUILD

### 1. 🏠 Home Page (`/`)
- **Hero Section**: Full-viewport hero with animated gradient background (gold/navy), company name, tagline, and two CTAs ("Our Services" and "Contact Us"). Include a floating trust badge (e.g., "10+ Years of Excellence").
- **Services Section**: Grid of all 6 service cards with icons, title, short description and a "Learn More" hover effect.
- **Why Choose Us / Stats Section**: Animated counters — e.g., "500+ Clients Served", "10+ Years Experience", "100% Compliance Rate", "6 Service Verticals".
- **Team Section**: Profile cards for each team member (from env/config) with name, role, bio, and photo.
- **CTA Banner**: Full-width banner — "Ready to simplify your finances? Let's talk." with a button linking to `/contact`.
- **Footer**: Logo, nav links, services list, contact details, social icons, copyright.

### 2. 👥 About Page (`/about`)
- Company story and mission (content driven from config).
- Team cards (reused component).
- Values/philosophy section (e.g., Integrity, Expertise, Trust, Client-First).
- Timeline of milestones (configurable from env or config).

### 3. 🛠️ Services Page (`/services`)
- Each service rendered as a detailed card/section (data from `company.services` in config).
- Each card shows title, icon, full description, and bullet list of sub-services.
- Sticky sidebar or tab navigation for quick jump between services.

### 4. 📞 Contact Page (`/contact`)
- **Contact form** (see Contact Form section below).
- **Google Maps embed** (src from `company.maps.embedUrl`).
- **Contact details** card: phone, email, address — all from config.
- **Office hours** section.

---

## 📬 CONTACT FORM SPECIFICATION

### Fields
| Field | Type | Validation |
|---|---|---|
| Full Name | Text input | Required, min 2 chars |
| Email | Email input | Required, valid email format |
| Mobile Number | Tel input | Required, 10-digit Indian mobile |
| Service | Dropdown select | Required; options auto-generated from `company.services` |
| Message | Textarea | Required, min 20 chars |
| Submit | Button | Shows loading spinner during submission |

### Dropdown Service Options (auto-generated from config)
```
Audit & Accounting
Income Tax & GST
MCA Compliances
PF, PT & ESIC
Notices & Appeals
Website Building & Hosting
Other / General Enquiry
```

### On Submit — API Route: `POST /api/contact`
1. **Validate** request body with Zod schema.
2. **Save** submission to PostgreSQL via Prisma (`ContactSubmission` table).
3. **Send email to company** (`CONTACT_FORM_TO`) with all form details in a professional HTML template.
4. **Send confirmation email to user** acknowledging receipt.
5. **Return** `{ success: true, message: "We'll get back to you within 24 hours." }`.
6. Show a styled **success toast / confirmation message** on the frontend.
7. On error, show an **error toast** with a fallback prompt to call/email directly.

### Email HTML Template (company notification)
```
Subject: New Enquiry from [Full Name] — SRFC Website

New contact form submission received:

Name:    [Full Name]
Email:   [Email]
Mobile:  [Mobile Number]
Service: [Selected Service]
Message: [Message]

Received at: [timestamp]
IP Address:  [request IP]
```

---

## 🗄️ DATABASE SCHEMA — `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model ContactSubmission {
  id        String   @id @default(cuid())
  fullName  String
  email     String
  mobile    String
  service   String
  message   String
  ipAddress String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("contact_submissions")
}
```

---

## 🎨 UI / UX DESIGN REQUIREMENTS

### Color Palette
```css
--color-primary:       #1B2A5E;   /* Deep Navy Blue — Trust & Authority */
--color-primary-light: #2A3F8F;   /* Lighter Navy — Hover states */
--color-accent:        #C9A84C;   /* Warm Gold — Prestige & Warmth */
--color-accent-light:  #E8C76A;   /* Light Gold — Highlights */
--color-surface:       #F8F7F4;   /* Warm Off-white — Background */
--color-text:          #1A1A2E;   /* Near Black — Primary text */
--color-text-muted:    #64748B;   /* Slate — Secondary text */
--color-success:       #16A34A;   /* Green — Success states */
--color-error:         #DC2626;   /* Red — Error states */
--color-white:         #FFFFFF;
```

### Typography
- **Display / Headings**: `Playfair Display` — serif, conveys authority and heritage (Google Fonts)
- **Body / UI**: `DM Sans` — clean, modern, highly readable (Google Fonts)
- **Accent / Labels**: `DM Mono` — for numbers, stats, codes

### Design Principles
- **Professional luxury** aesthetic — feels like a top-tier chartered accountancy firm.
- Generous whitespace — never cramped.
- Subtle gold dividers, section separators, and icon accents.
- Smooth page transitions and scroll-triggered animations (Framer Motion).
- All images use `next/image` with blur placeholders.
- Fully **responsive** — mobile-first. Hamburger menu on mobile.
- **Accessible** — ARIA labels, sufficient contrast ratios, keyboard navigable.
- Sticky navigation with backdrop blur on scroll.
- Back-to-top button on long pages.
- Custom 404 page with nav back to home.

---

## 🐳 DOCKER CONFIGURATION

### `Dockerfile` (Multi-stage, production-optimised)
```dockerfile
# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 3: Production runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

### `docker-compose.yml`
```yaml
version: "3.9"

services:
  postgres:
    image: postgres:16-alpine
    container_name: srfc_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: srfc_user
      POSTGRES_PASSWORD: srfc_pass
      POSTGRES_DB: srfc_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U srfc_user -d srfc_db"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: srfc_app
    restart: unless-stopped
    env_file: .env
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
    command: >
      sh -c "npx prisma migrate deploy && node server.js"

volumes:
  postgres_data:
```

### `.dockerignore`
```
node_modules
.next
.env
*.md
.git
.gitignore
```

---

## 📘 README.md — MUST BE GENERATED

The README must include **all of the following sections** with clear, copy-paste-ready commands:

```markdown
# SRFC Website — Developer Guide

## Table of Contents
1. Prerequisites
2. Quick Start (Local Dev)
3. Environment Variables Reference
4. How to Update Company Information
5. How to Update / Replace the Logo
6. How to Add / Remove a Team Member
7. How to Add / Remove a Service
8. Contact Form & Email Setup (Gmail App Password)
9. Google Maps Embed — How to Update
10. Docker Deployment (Production)
11. Database Management (Prisma)
12. Folder Structure
13. Troubleshooting
```

### Key README Sections to Detail

**Section 4 — Updating Company Info:**
> Open `.env` and change any `NEXT_PUBLIC_COMPANY_*` value. Restart the dev server or rebuild Docker. No code changes needed.

**Section 5 — Updating the Logo:**
> 1. Prepare your logo file (PNG recommended, transparent background, min 400×400px).
> 2. Drop it into `public/logo/` — e.g., `public/logo/logo-new.png`.
> 3. In `.env`, set `NEXT_PUBLIC_LOGO_FILE=logo-new.png`.
> 4. Restart / rebuild. Done.

**Section 6 — Adding a Team Member:**
> Edit the `NEXT_PUBLIC_TEAM` JSON in `.env`. Add a new object to the array following the existing format. Add the photo to `public/images/team/`.

**Section 7 — Adding a Service:**
> Edit the `NEXT_PUBLIC_SERVICES` JSON in `.env`. Add a new object with id, title, icon, description, and items. The contact form dropdown auto-updates.

**Section 8 — Email Setup:**
> 1. Go to Google Account → Security → 2-Step Verification → App Passwords.
> 2. Generate a password for "Mail".
> 3. Set `SMTP_PASS=your_16_char_app_password` in `.env`.

---

## ✅ DEVELOPER CHECKLIST

Before delivering the project, verify every item below:

### Functionality
- [ ] All 4 pages render without errors (`/`, `/about`, `/services`, `/contact`)
- [ ] Navbar links work and active state is highlighted correctly
- [ ] Contact form validates all fields client-side (React Hook Form + Zod)
- [ ] Contact form API route saves to PostgreSQL and triggers both emails
- [ ] Success / error states shown after form submission
- [ ] Google Maps embed loads on contact page
- [ ] All text/data sourced from `config/company.ts` (no hardcoded company data)
- [ ] Logo swappable by changing `.env` + dropping file in `public/logo/`
- [ ] Team members render from `NEXT_PUBLIC_TEAM` env var
- [ ] Services render from `NEXT_PUBLIC_SERVICES` env var
- [ ] `/api/health` returns `{ status: "ok" }`

### UI / UX
- [ ] Fully responsive on mobile (375px), tablet (768px), desktop (1280px+)
- [ ] Framer Motion animations on hero, service cards, stats counters
- [ ] Sticky navbar with blur effect on scroll
- [ ] Custom 404 page
- [ ] Back-to-top button visible on scroll

### DevOps
- [ ] `docker-compose up --build` starts both services
- [ ] Prisma migrations run automatically on container start
- [ ] `.env.example` committed (no secrets)
- [ ] `.env` in `.gitignore`
- [ ] Multi-stage Dockerfile produces a slim production image

### Documentation
- [ ] `README.md` covers all 13 sections listed above
- [ ] Instructions for logo swap, team edit, service edit are copy-paste ready
- [ ] Gmail App Password setup instructions included

---

## 💡 ADDITIONAL IMPLEMENTATION NOTES

1. **Next.js output**: Set `output: "standalone"` in `next.config.ts` for Docker optimised build.
2. **Prisma in Docker**: Run `npx prisma generate` at build time, `npx prisma migrate deploy` at container startup.
3. **Database URL**: In Docker Compose the host is `postgres` (service name), not `localhost`.
4. **SMTP rate limiting**: Add basic IP-based rate limiting on `POST /api/contact` (e.g., `upstash/ratelimit` or in-memory map) to prevent spam.
5. **Image domains**: Add your domain to `next.config.ts` `images.domains` if serving team photos from external URLs.
6. **SEO**: Add `metadata` exports to all pages using company name, tagline, and page-specific descriptions.
7. **Favicon**: Use the logo file to generate a favicon and add to `app/layout.tsx`.
8. **Loading states**: Use Next.js `loading.tsx` files for skeleton loaders on each route.
9. **Error boundary**: Add `error.tsx` files to handle runtime errors gracefully.
10. **Environment validation**: Add a startup check (using `zod` or manual check) that throws if required env vars are missing, so misconfiguration fails fast.

---

## 📞 CLIENT REFERENCE

| Detail | Value |
|---|---|
| Company | Shri Raghavendra Financial Consultancy (SRFC) |
| Founder | Pratik Belavanki |
| Co-founder & Director | Purnima Belavanki |
| Email | auditsrfc@gmail.com |
| Phone | +91-8088692737 |
| Address | MALHARI, Plot No. 15, Chandrikalayout, Lakamanahalli, Dharwad |

---

*This prompt was prepared for the SRFC website project. All company data should be managed via `.env` — never hardcoded. The project is designed for non-technical administrators to update content without touching source code.*
