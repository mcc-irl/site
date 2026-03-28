import type { Metadata } from "next";
import services from "../../../content/services.json";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type Service = {
  title: string;
};

type ContactPageProps = {
  searchParams?: {
    service?: string;
  };
};

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Michelle Carter Consultancy for healthcare training and consultancy enquiries.",
  openGraph: {
    title: "Contact | Michelle Carter Consultancy",
    description: "Get in touch with Michelle Carter Consultancy for healthcare training and consultancy enquiries.",
    url: "https://michellecarter.ie/contact",
    type: "website",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const selectedService = searchParams?.service?.trim();
  const serviceOptions = (services as Service[]).map((service) => service.title);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Contact Me"
          description={
            selectedService
              ? `You are enquiring about: ${selectedService}. Complete the form below and Michelle will follow up.`
              : "Complete the form below to enquire about training and consultancy services."
          }
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <ContactForm services={serviceOptions} initialService={selectedService} />

          <aside className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900">Contact details</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>
                <p className="font-medium text-slate-900">Email</p>
                <a href="mailto:michellecarterconsultancy@outlook.ie" className="transition-colors hover:text-brand-700">
                  michellecarterconsultancy@outlook.ie
                </a>
              </li>
              <li>
                <p className="font-medium text-slate-900">Phone</p>
                <a href="tel:0874255819" className="transition-colors hover:text-brand-700">
                  0874255819
                </a>
              </li>
              <li>
                <p className="font-medium text-slate-900">Location</p>
                <p>Dublin, Ireland</p>
              </li>
              <li>
                <p className="font-medium text-slate-900">LinkedIn</p>
                <a
                  href="https://ie.linkedin.com/in/michelle-carter-47b5482a9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-700"
                >
                  ie.linkedin.com/in/michelle-carter-47b5482a9
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}
