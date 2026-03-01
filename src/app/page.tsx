import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import reviews from "../../content/reviews.json";

type Review = {
  name: string;
  role: string;
  organisation: string;
  quote: string;
  rating: number;
  featured?: boolean;
};

const services = [
  {
    title: "Mandatory Clinical Skills Training",
    description:
      "Practical, evidence-based sessions tailored to frontline teams across residential and community care settings.",
  },
  {
    title: "Leadership & Staff Development",
    description:
      "Support for care leaders to strengthen supervision, communication, and consistent high standards of care delivery.",
  },
  {
    title: "Quality & Compliance Readiness",
    description:
      "Training and guidance aligned with regulatory expectations to help services stay inspection-ready and confident.",
  },
  {
    title: "Bespoke On-Site Programmes",
    description:
      "Flexible consultancy and education programmes designed around your organisation's goals, schedules, and teams.",
  },
];

const trustStats = [
  { label: "Years in Healthcare Education", value: "15+" },
  { label: "Care Teams Supported", value: "100+" },
  { label: "Training Programmes Delivered", value: "250+" },
];

export default function Home() {
  const reviewList = reviews as Review[];
  const featuredReview = reviewList.find((review) => review.featured) ?? reviewList[0];

  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-20 sm:py-24">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Healthcare Training</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Professional healthcare training that helps teams deliver safe, confident, person-centred care.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            Michelle Carter Consultancy partners with healthcare providers to build workforce capability through
            practical learning, clear standards, and compassionate leadership.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">Get In Touch</Button>
            <Button href="/services" variant="secondary">
              View Services
            </Button>
          </div>

          {featuredReview ? (
            <article className="mt-10 max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Featured Testimonial</p>
              <p className="mt-3 text-base leading-7 text-slate-700">“{featuredReview.quote}”</p>
              <div className="mt-4">
                <p className="font-semibold text-slate-900">{featuredReview.name}</p>
                <p className="text-sm text-slate-600">
                  {featuredReview.role}, {featuredReview.organisation}
                </p>
              </div>
            </article>
          ) : null}
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="What We Do"
            title="Training and consultancy for modern healthcare teams"
            description="Focused support that improves confidence, quality, and day-to-day practice across your service."
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

      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="rounded-xl bg-brand-700 px-6 py-10 text-white sm:px-10">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to strengthen your team’s training programme?
            </h2>
            <p className="mt-3 max-w-2xl text-brand-100">
              Let&apos;s discuss your service needs and build a practical training plan that fits your team.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
