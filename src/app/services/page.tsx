import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore healthcare training and consultancy services tailored to your team and organisation.",
  openGraph: {
    title: "Services | Michelle Carter Consultancy",
    description: "Explore healthcare training and consultancy services tailored to your team and organisation.",
    url: "https://michellecarter.ie/services",
    type: "website",
  },
  alternates: {
    canonical: "/services",
  },
};

export default async function ServicesPage() {
  const reader = createReader(process.cwd(), keystaticConfig);
  const entries = await reader.collections.services.all();
  const serviceList = entries
    .filter((e) => e.entry !== null)
    .map((e) => ({ ...e.entry!, slug: e.slug }));

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title="Services"
          description="Healthcare training and consultancy services designed to strengthen capability, confidence, and quality across your team."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {serviceList.map((service) => (
            <article key={service.slug} className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-semibold text-slate-900">{service.title}</h3>
                {service.icon ? (
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-lg"
                    aria-hidden="true"
                  >
                    {service.icon}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
              <div className="mt-5">
                <Button href={`/contact?service=${encodeURIComponent(service.title ?? '')}`} variant="secondary">
                  Enquire about this service
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
