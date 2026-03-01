import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-20 sm:py-24">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Healthcare Training</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Professional, practical healthcare training for teams that deliver care with confidence.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            Welcome to Michelle Carter Consultancy. This foundation setup includes your branded design system,
            reusable components, and CMS-ready structure for the next content phases.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">Contact Me</Button>
            <Button href="/services" variant="secondary">
              View Services
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Phase 1 Complete"
            title="Project foundation is ready"
            description="Global layout, logo-driven colours, UI primitives, and MDX content support are all configured."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Card title="Reusable UI Components">Button, container, heading, and card components are in place.</Card>
            <Card title="Branded Visual Theme">Palette is derived from your logo and mapped as design tokens.</Card>
            <Card title="CMS-Ready Structure">MDX support is enabled for content-led pages in upcoming phases.</Card>
          </div>
        </Container>
      </section>
    </>
  );
}
