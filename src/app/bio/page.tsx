import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";

export const metadata: Metadata = {
  title: "Bio",
  description:
    "Learn more about Michelle Carter, her healthcare training background, qualifications, and consultancy values.",
  openGraph: {
    title: "Bio | Michelle Carter Consultancy",
    description:
      "Learn more about Michelle Carter, her healthcare training background, qualifications, and consultancy values.",
    url: "https://michellecarter.ie/bio",
    type: "website",
  },
  alternates: {
    canonical: "/bio",
  },
};

export default async function BioPage() {
  const reader = createReader(process.cwd(), keystaticConfig);
  const bio = await reader.singletons.bio.read();

  const introParagraphs = [bio?.bio1, bio?.bio2, bio?.bio3].filter(Boolean) as string[];
  const qualifications = bio?.qualifications ?? [];
  const values = bio?.values ?? [];

  return (
    <>
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 to-brand-600 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5" />
          <div className="absolute left-1/3 bottom-0 h-48 w-48 rounded-full bg-brand-900/30" />
        </div>
        <Container className="relative">
          <SectionHeading
            eyebrow="About"
            title="Michelle Carter"
            description={bio?.pageDescription ?? "Experienced healthcare trainer and consultant supporting teams to deliver safe, compassionate, person-centred care."}
            inverted
          />
        </Container>
      </section>

      {/* Bio intro + photo */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:items-start">
            {/* Photo placeholder */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 shadow-md ring-1 ring-brand-200">
              <div className="flex aspect-[4/5] flex-col items-center justify-center gap-4 p-6">
                {/* Silhouette */}
                <svg viewBox="0 0 80 90" className="h-40 w-auto text-brand-400" fill="currentColor" aria-hidden="true">
                  <circle cx="40" cy="22" r="18" />
                  <path d="M4 88c0-19.88 16.12-36 36-36s36 16.12 36 36" />
                </svg>
                <p className="text-center text-xs font-medium text-brand-600">Professional photo coming soon</p>
              </div>
            </div>

            <div className="space-y-5 text-slate-700">
              {introParagraphs.map((paragraph, i) => (
                <p key={i} className="leading-7">{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Qualifications */}
      <section className="bg-brand-50/60 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Credentials"
            title="Qualifications & Professional Development"
            description="A strong clinical and educational foundation that supports evidence-based, practical training delivery."
          />

          <ul
            className="mt-10 grid gap-4 sm:grid-cols-2"
            aria-label="Qualifications and credentials"
          >
            {qualifications.map((qualification, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-brand-100 bg-white p-5"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600" aria-hidden="true">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
                  </svg>
                </span>
                <span className="text-slate-700">{qualification}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Mission"
            title="Values-led consultancy"
            description="Michelle's approach is grounded in quality improvement, collaboration, and person-centred care."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value, i) => (
              <article
                key={i}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs"
              >
                <div className="h-1 bg-gradient-to-r from-brand-500 to-brand-300" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
                  <p className="mt-3 text-slate-600">{value.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
