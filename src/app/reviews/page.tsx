import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Read client testimonials and feedback from healthcare teams supported by Michelle Carter Consultancy.",
  openGraph: {
    title: "Reviews | Michelle Carter Consultancy",
    description: "Read client testimonials and feedback from healthcare teams supported by Michelle Carter Consultancy.",
    url: "https://michellecarter.ie/reviews",
    type: "website",
  },
  alternates: {
    canonical: "/reviews",
  },
};

export default async function ReviewsPage() {
  const reader = createReader(process.cwd(), keystaticConfig);
  const [reviewsPage, entries] = await Promise.all([
    reader.singletons.reviewsPage.read(),
    reader.collections.reviews.all(),
  ]);
  const reviewList = entries
    .filter((e) => e.entry !== null)
    .map((e) => e.entry!);

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
            eyebrow="Testimonials"
            title="Reviews"
            description={reviewsPage?.pageDescription ?? "Feedback from organisations and care teams supported by Michelle Carter Consultancy."}
            inverted
          />
        </Container>
      </section>

      {/* Reviews grid */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {reviewList.map((review, index) => (
              <article
                key={`${review.name}-${review.organisation}-${index}`}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs"
              >
                <div className="h-1 bg-gradient-to-r from-brand-500 to-brand-300" />
                <div className="p-6">
                  <div className="flex gap-0.5" aria-label={`${review.rating ?? 5} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < (review.rating ?? 5) ? "text-brand-500" : "text-slate-200"}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-base leading-7 text-slate-700">&ldquo;{review.quote}&rdquo;</blockquote>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="font-semibold text-slate-900">{review.name}</p>
                    <p className="text-sm text-slate-500">
                      {review.role}, {review.organisation}
                    </p>
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