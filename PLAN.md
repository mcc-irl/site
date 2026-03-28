# Michelle Carter Consultancy — Website Project Plan

**Domain:** michellecarter.ie  
**Industry:** Healthcare Training  
**Tech Stack:** Next.js 14 (App Router) + MDX content files  
**Styling:** Tailwind CSS  
**Contact Form:** Email notifications (via Resend or Nodemailer)  
**Reviews:** Editable JSON/MDX content files  
**Hosting:** TBD (Vercel recommended for Next.js)

---

## Design Principles

- **Clean & modern** — generous whitespace, crisp typography, minimal decoration
- **Professional & trustworthy** — appropriate for healthcare/training sector
- **Mobile-first** — fully responsive across all breakpoints
- **Accessible** — WCAG 2.1 AA compliant colour contrast, semantic HTML, keyboard navigation
- **Colour palette** derived from the Michelle Carter Consultancy logo

---

## Phase 1 — Project Scaffolding & Design System

**Goal:** Set up the project foundation, tooling, and reusable design tokens.

| # | Task | Detail |
|---|------|--------|
| 1.1 | Initialise Next.js 14 project | App Router, TypeScript, ESLint |
| 1.2 | Install & configure Tailwind CSS | Custom theme colours extracted from logo |
| 1.3 | Add logo & favicon | Place logo in `/public`, generate favicons |
| 1.4 | Create global layout | `<Header>`, `<Footer>`, responsive nav shell |
| 1.5 | Define typography & colour tokens | Tailwind `extend` config — primary, secondary, accent, neutral palette |
| 1.6 | Create shared UI components | `<Button>`, `<SectionHeading>`, `<Container>`, `<Card>` |
| 1.7 | Set up MDX support | `next-mdx-remote` or `@next/mdx` for content pages |

**Deliverable:** Running dev server with header/footer, logo, and consistent theming.

---

## Phase 2 — Main (Home) Page

**Goal:** Build a compelling landing page that communicates who Michelle is and what the consultancy offers.

| # | Task | Detail |
|---|------|--------|
| 2.1 | Hero section | Full-width hero with tagline, call-to-action button, subtle background |
| 2.2 | "What We Do" overview | 3–4 card grid summarising key services |
| 2.3 | Trust / stats bar | Quick stats or trust indicators (years experience, clients trained, etc.) |
| 2.4 | Featured testimonial | Pull one highlighted review from the reviews data file |
| 2.5 | CTA banner | "Get in touch" call-to-action linking to Contact page |

**Deliverable:** Fully styled, responsive home page.

---

## Phase 3 — Bio (About) Page

**Goal:** A personal, professional biography page for Michelle Carter.

| # | Task | Detail |
|---|------|--------|
| 3.1 | Bio content section | Photo placeholder + rich text bio (MDX) |
| 3.2 | Qualifications / credentials list | Styled list or timeline of certifications |
| 3.3 | Mission / values section | Short statement on consultancy ethos |

**Deliverable:** Polished About/Bio page with editable MDX content.

---

## Phase 4 — Services Page

**Goal:** Clearly present the training services offered.

| # | Task | Detail |
|---|------|--------|
| 4.1 | Services data file | JSON or MDX file listing each service (title, description, icon/image) |
| 4.2 | Services grid/list layout | Card-based responsive grid |
| 4.3 | Individual service detail (optional) | Expandable accordion or dedicated sub-pages per service |
| 4.4 | CTA per service | "Enquire about this service" linking to Contact page with pre-fill |

**Deliverable:** Services page populated from editable content files.

---

## Phase 5 — Reviews / Testimonials Page

**Goal:** Showcase client testimonials to build credibility.

| # | Task | Detail |
|---|------|--------|
| 5.1 | Reviews data file | `content/reviews.json` — array of `{ name, role, organisation, quote, rating }` |
| 5.2 | Reviews grid | Styled testimonial cards with star ratings |
| 5.3 | Home page integration | Pull featured/latest review into home page hero area |

**Deliverable:** Reviews page and integrated testimonial component.

---

## Phase 6 — Contact Me Page

**Goal:** Professional contact form with email delivery.

| # | Task | Detail |
|---|------|--------|
| 6.1 | Contact form UI | Name, email, phone (optional), service interest dropdown, message |
| 6.2 | Server-side API route | `/api/contact` — validates input, sends email via Resend (or Nodemailer) |
| 6.3 | Success / error states | Toast or inline confirmation after submission |
| 6.4 | Anti-spam | Honeypot field + basic rate limiting |
| 6.5 | Contact info sidebar | Email address, phone, location, social links |

**Deliverable:** Working contact form that delivers enquiries to Michelle's inbox.

---

## Phase 7 — Polish, SEO & Performance

**Goal:** Production-quality finishing touches.

| # | Task | Detail |
|---|------|--------|
| 7.1 | Meta tags & Open Graph | Per-page `<title>`, description, OG image |
| 7.2 | Sitemap & robots.txt | Auto-generated via `next-sitemap` |
| 7.3 | Lighthouse audit | Target 90+ on Performance, Accessibility, Best Practices, SEO |
| 7.4 | Image optimisation | Next.js `<Image>` component, WebP, lazy loading |
| 7.5 | 404 page | Custom branded not-found page |
| 7.6 | Cookie / privacy notice | GDPR-friendly cookie banner (Irish audience) |
| 7.7 | Analytics | Simple privacy-respecting analytics (Plausible or Vercel Analytics) |

**Deliverable:** Production-ready site, optimised and compliant.

---

## Phase 8 — Deployment & Go-Live

**Goal:** Ship to production on the chosen host.

| # | Task | Detail |
|---|------|--------|
| 8.1 | Choose hosting provider | Vercel (recommended), Netlify, or traditional host |
| 8.2 | Connect custom domain | `michellecarter.ie` DNS configuration |
| 8.3 | SSL certificate | Auto-provisioned via host (Let's Encrypt) |
| 8.4 | Environment variables | Email API keys, analytics IDs |
| 8.5 | CI/CD | Auto-deploy on `main` branch push |
| 8.6 | Final QA | Cross-browser testing (Chrome, Safari, Firefox, Edge + mobile) |

**Deliverable:** Live website at michellecarter.ie.

---

## Content Checklist (for Michelle to provide)

- [ ] Professional headshot / photo
- [ ] Bio text (background, experience, qualifications)
- [ ] List of services with descriptions
- [ ] 5–10 client testimonials (name, role, quote)
- [ ] Contact email and phone number
- [ ] Social media links (LinkedIn, etc.)
- [ ] Any specific brand colours or fonts beyond the logo
- [ ] Privacy policy text

---

## Estimated Effort

| Phase | Effort |
|-------|--------|
| 1 — Scaffolding & Design System | ~2–3 hours |
| 2 — Home Page | ~2–3 hours |
| 3 — Bio Page | ~1–2 hours |
| 4 — Services Page | ~2–3 hours |
| 5 — Reviews Page | ~1–2 hours |
| 6 — Contact Page | ~2–3 hours |
| 7 — Polish & SEO | ~2–3 hours |
| 8 — Deployment | ~1–2 hours |
| **Total** | **~13–21 hours** |

---

*Plan created: 1 March 2026*
