import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Healthcare training and consultancy that helps teams deliver safe, confident, person-centred care.",
  openGraph: {
    title: "Michelle Carter Consultancy | Healthcare Training",
    description:
      "Healthcare training and consultancy that helps teams deliver safe, confident, person-centred care.",
    url: "https://michellecarter.ie",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const reader = createReader(process.cwd(), keystaticConfig);

  const [homePage, reviewEntries, serviceEntries] = await Promise.all([
    reader.singletons.homePage.read(),
    reader.collections.reviews.all(),
    reader.collections.services.all(),
  ]);

  const carouselReviews = reviewEntries
    .filter((e) => e.entry !== null && e.entry.showInCarousel)
    .map((e) => ({
      name: e.entry!.name ?? e.slug,
      role: e.entry!.role,
      organisation: e.entry!.organisation,
      quote: e.entry!.quote,
      rating: e.entry!.rating ?? 5,
    }));

  const services = serviceEntries
    .filter((e) => e.entry !== null && e.entry.title != null)
    .map((e) => ({ title: e.entry!.title as unknown as string, description: e.entry!.description }));

  if (!homePage) return null;

  const trustStats = homePage.trustStats ?? [];

  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-20 sm:py-24">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            {homePage.heroEyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {homePage.heroHeading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            {homePage.heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={homePage.heroPrimaryButtonHref}>{homePage.heroPrimaryButtonText}</Button>
            <Button href={homePage.heroSecondaryButtonHref} variant="secondary">
              {homePage.heroSecondaryButtonText}
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={homePage.servicesEyebrow}
            title={homePage.servicesHeading}
            description={homePage.servicesDescription}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card key={service.title} title={service.title}>
                {service.description}
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {trustStats.length > 0 && (
        <section className="border-y border-slate-200 bg-slate-50 py-10 sm:py-12">
          <Container>
            <div className="grid gap-8 text-center sm:grid-cols-3">
              {trustStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-semibold tracking-tight text-slate-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {carouselReviews.length > 0 && (
        <TestimonialsCarousel
          reviews={carouselReviews}
          eyebrow={homePage.testimonialsEyebrow}
          heading={homePage.testimonialsHeading}
        />
      )}

      <section className="pb-16 sm:pb-20 pt-16 sm:pt-20">
        <Container>
          <div className="rounded-xl bg-brand-700 px-6 py-10 text-white sm:px-10">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {homePage.ctaHeading}
            </h2>
            <p className="mt-3 max-w-2xl text-brand-100">
              {homePage.ctaDescription}
            </p>
            <div className="mt-6">
              <Button href={homePage.ctaButtonHref} variant="white">
                {homePage.ctaButtonText}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}