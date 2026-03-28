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
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="About"
            title="Michelle Carter"
            description="Experienced healthcare trainer and consultant supporting teams to deliver safe, compassionate, person-centred care."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr] lg:items-start">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex aspect-[4/5] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-center">
                <p className="px-6 text-sm text-slate-500">Professional headshot placeholder</p>
              </div>
            </div>

            <div className="space-y-5 text-slate-700">
              {introParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
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
                className="rounded-xl border border-slate-200 bg-white p-5 text-slate-700"
              >
                {qualification}
              </li>
            ))}
          </ul>
        </Container>
      </section>

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
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-3 text-slate-600">{value.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
