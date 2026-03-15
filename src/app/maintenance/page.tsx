import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Under Maintenance | Michelle Carter Consultancy",
  description: "We're currently carrying out scheduled maintenance. We'll be back shortly.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17L4.655 7.773A2.5 2.5 0 016.18 3.84l5.83 5.83" />
              </svg>
            </span>
          </div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            Scheduled Maintenance
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            We&apos;ll be back shortly
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Michelle Carter Consultancy is currently undergoing scheduled maintenance. We apologise for any inconvenience and will be back online as soon as possible.
          </p>
          <p className="mt-6 text-sm text-slate-500">
            For urgent enquiries, please email{" "}
            <a
              href="mailto:michellecarterconsultancy@outlook.ie"
              className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-600"
            >
              michellecarterconsultancy@outlook.ie
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
