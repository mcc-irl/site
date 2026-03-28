import type { Metadata } from "next";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type ContactPageProps = {
  searchParams?: Promise<{ service?: string }>;
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

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const reader = createReader(process.cwd(), keystaticConfig);
  const contactPage = await reader.singletons.contactPage.read();
  const serviceOptions = contactPage?.serviceInterestOptions ?? [];
  const contactDetails = contactPage?.contactDetails ?? [];
  const params = await searchParams;
  const selectedService = params?.service?.trim();

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
              {contactDetails.map(({ field, detail }) => {
                const isEmail = detail.includes("@");
                const isUrl = detail.startsWith("http");
                const isPhone = /^[\d\s+()-]+$/.test(detail.trim());
                const href = isEmail
                  ? `mailto:${detail}`
                  : isUrl
                  ? detail
                  : isPhone
                  ? `tel:${detail.replace(/\s/g, "")}`
                  : null;
                return (
                  <li key={field}>
                    <p className="font-medium text-slate-900">{field}</p>
                    {href ? (
                      <a
                        href={href}
                        {...(isUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="transition-colors hover:text-brand-700"
                      >
                        {isUrl ? detail.replace(/^https?:\/\//, "") : detail}
                      </a>
                    ) : (
                      <span>{detail}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}
