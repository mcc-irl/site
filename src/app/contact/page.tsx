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
  const serviceOptions = [...(contactPage?.serviceInterestOptions ?? [])];
  const contactDetails = contactPage?.contactDetails ?? [];
  const params = await searchParams;
  const selectedService = params?.service?.trim();

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
            eyebrow="Contact"
            title="Contact"
            description={
              selectedService
                ? `You are enquiring about: ${selectedService}. Complete the form below and Michelle will follow up.`
                : (contactPage?.pageDescription ?? "Complete the form below to enquire about training and consultancy services.")
            }
            inverted
          />
        </Container>
      </section>

      {/* Form + contact details */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <ContactForm services={serviceOptions} initialService={selectedService} />

            <aside className="overflow-hidden rounded-xl border border-brand-100 bg-brand-50 shadow-xs">
              <div className="h-1 bg-gradient-to-r from-brand-500 to-brand-300" />
              <div className="p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-slate-900">Contact details</h3>
                <ul className="mt-4 space-y-4 text-sm text-slate-700">
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
                      <li key={field} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                            <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
                          </svg>
                        </span>
                        <div>
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
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}