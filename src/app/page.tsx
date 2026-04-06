import type { Metadata } from "next";
import Image from "next/image";
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
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 py-20 sm:py-28">
        {/* Decorative rings */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-white/5" />
          <div className="absolute -right-16 top-24 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute right-48 -bottom-16 h-48 w-48 rounded-full bg-brand-900/40" />
        </div>

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">
                {homePage.heroEyebrow}
              </p>
              <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {homePage.heroHeading}
              </h1>
              <p className="mt-6 max-w-lg text-lg text-brand-100/90">
                {homePage.heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={homePage.heroPrimaryButtonHref} variant="white">{homePage.heroPrimaryButtonText}</Button>
                <Button href={homePage.heroSecondaryButtonHref} variant="ghost">
                  {homePage.heroSecondaryButtonText}
                </Button>
              </div>
            </div>

            {/* Logo blended into hero */}
            <div className="hidden lg:flex items-center justify-center" aria-hidden="true">
              <div className="relative flex h-72 w-72 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-white/5" />
                <div className="absolute inset-8 rounded-full bg-white/5" />
                <div className="absolute inset-16 rounded-full bg-white/10" />
                <Image
                  src="/logo-inverted.png"
                  alt=""
                  width={180}
                  height={180}
                  className="relative"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-50/60 py-16 sm:py-20">
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
        <section className="bg-gradient-to-r from-brand-700 to-brand-600 py-12 sm:py-16">
          <Container>
            <div className="grid gap-8 text-center sm:grid-cols-3">
              {trustStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-bold tracking-tight text-white">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-brand-100">{stat.label}</p>
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