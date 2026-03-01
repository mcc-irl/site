This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact form configuration

The contact form posts to `/api/contact` and sends notifications using Resend.

Create a `.env.local` file with:

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=your_inbox@example.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

Notes:

- `CONTACT_FROM_EMAIL` defaults to `onboarding@resend.dev` if omitted.
- Basic anti-spam is enabled using a honeypot field and simple rate limiting.

## Analytics and cookie notice

The site includes a GDPR-style cookie notice and only loads analytics after visitor consent.

To enable Plausible analytics, set:

```bash
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=michellecarterconsultancy.ie
```

If this value is not set, no analytics script is loaded.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
