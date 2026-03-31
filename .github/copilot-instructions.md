# GitHub Copilot Instructions

## Project Overview

This is the **Michelle Carter Consultancy** website — a professional healthcare training and consultancy marketing site for `michellecarter.ie`. It is a static Next.js site with a Git-backed CMS.

## Tech Stack

- **Next.js 16** — App Router, server components, API routes
- **React 19** with **TypeScript 5** (strict mode)
- **Tailwind CSS 4** — utility-first styling via PostCSS plugin
- **Keystatic CMS** — headless, YAML/Git-backed CMS for content editing
- **MDX** (`@next/mdx`, `@mdx-js/react`) — rich content rendering
- **Netlify** — hosting and deployment (`@netlify/plugin-nextjs`)
- **Resend** — email delivery for the contact form (API key in `.env.local`)
- **ESLint 9** with `eslint-config-next/core-web-vitals` and TypeScript rules

## Project Structure

```
src/
  app/                    # Next.js App Router pages and layouts
    api/
      contact/route.ts    # Contact form POST endpoint (validation, rate-limiting, honeypot)
      keystatic/          # Keystatic CMS backend routes
    bio/                  # Bio/About page
    contact/              # Contact page
    services/             # Services page
    reviews/              # Testimonials page
    keystatic/            # CMS admin UI routes
    layout.tsx            # Root layout (Header, Footer, CookieNotice, Analytics)
    page.tsx              # Home page
    globals.css           # Global CSS + Tailwind theme tokens
  components/
    ui/                   # Atomic UI components (button, card, container, section-heading)
    layout/               # Header, Footer, MobileNav, CookieNotice, PrivacyAnalytics
    contact/              # ContactForm (client component)
    testimonials-carousel.tsx
content/                  # CMS-managed YAML content (do not edit manually)
  reviews/                # Individual review YAML files
  services/               # Individual service YAML files
  bio.yaml
  contact-page.yaml
  homepage.yaml
public/                   # Static assets (images, favicon)
keystatic.config.ts       # Keystatic CMS schema (collections + singletons)
```

## Coding Conventions

- Use the **`@/`** path alias for all imports from `src/` (e.g. `@/components/ui/button`)
- All components are **TypeScript** — always type props explicitly; avoid `any`
- Prefer **React Server Components** by default; add `"use client"` only when needed (interactivity, browser APIs, hooks)
- Use **Tailwind CSS utility classes** for all styling — avoid inline styles and CSS modules
- Follow the existing **component organisation**: pure UI primitives go in `components/ui/`, page-layout elements in `components/layout/`
- Keep API route handlers in `src/app/api/` using the Next.js Route Handler pattern (`export async function POST(req: Request)`)

## Content Management (Keystatic)

Content is stored as YAML files in `content/` and managed via the Keystatic CMS admin at `/keystatic`.

- **Collections** (multiple entries): `reviews`, `services`
- **Singletons** (single file): `homepage`, `bio`, `contact-page`

To add or change content schema, edit `keystatic.config.ts`. Do **not** manually edit files in `content/` unless making a quick one-off fix — prefer the CMS UI.

In development, Keystatic runs in **local mode** (no auth). In production it uses **GitHub OAuth**.

## Environment Variables

Stored in `.env.local` (not committed). Key variables:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend email API key for contact form |
| `CONTACT_TO_EMAIL` | Recipient address for contact form submissions |
| `KEYSTATIC_GITHUB_CLIENT_ID` | GitHub OAuth app client ID (production CMS auth) |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret |
| `KEYSTATIC_SECRET` | Random secret for Keystatic session signing |

## Deployment

- Deployed to **Netlify** via `netlify.toml`
- Build command: `next build`
- The `@netlify/plugin-nextjs` plugin handles SSR/ISR edge functions automatically
- Production branch: `main`

## Key Patterns

- The **maintenance mode** redirect is handled in `src/proxy.ts` (Next.js middleware)
- The **contact form** uses a honeypot field and server-side rate limiting — preserve these when modifying `api/contact/route.ts`
- **Analytics** are privacy-respecting (Plausible) and only load after cookie consent — see `components/layout/privacy-analytics.tsx`
- **Robots/sitemap** are generated dynamically via `src/app/robots.ts` and `src/app/sitemap.ts`
