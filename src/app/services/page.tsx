import type { Metadata } from "next";
import { DocumentRenderer } from "@keystatic/core/renderer";
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
  const [servicesPage, entries] = await Promise.all([
    reader.singletons.servicesPage.read(),
    reader.collections.services.all(),
  ]);
  const serviceList = (
    await Promise.all(
      entries
        .filter((e) => e.entry !== null)
        .map(async (e) => {
          const entry = e.entry!;
          return {
            slug: e.slug,
            title: e.slug,
            order: entry.order ?? 99,
            icon: entry.icon,
            description: await entry.description(),
          };
        })
    )
  ).sort((a, b) => a.order - b.order);

  return (
    <>
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 to-brand-600 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/5" />
          <div className="absolute left-1/4 -bottom-12 h-56 w-56 rounded-full bg-brand-900/30" />
        </div>
        <Container className="relative">
          <SectionHeading
            eyebrow="Our Services"
            title="Services"
            description={servicesPage?.pageDescription ?? "Healthcare training and consultancy services designed to strengthen capability, confidence, and quality across your team."}
            inverted
          />
        </Container>
      </section>

      {/* Services grid */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {serviceList.map((service) => (
              <article key={service.slug} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
                <div className="h-1 bg-gradient-to-r from-brand-500 to-brand-300" />
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    {service.icon ? (
                      <span
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-50 text-lg ring-1 ring-brand-200"
                        aria-hidden="true"
                      >
                        {service.icon}
                      </span>
                    ) : null}
                    <h3 className="text-base font-semibold text-slate-900">{service.title}</h3>
                  </div>
                  <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600 [&_ul]:mt-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:mt-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_strong]:font-semibold [&_strong]:text-slate-800 [&_a]:text-brand-600 [&_a]:underline">
                    <DocumentRenderer document={service.description} />
                  </div>
                  <div className="mt-5">
                    <Button href={`/contact?service=${encodeURIComponent(service.title ?? '')}`} variant="secondary">
                      Enquire about this service
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
