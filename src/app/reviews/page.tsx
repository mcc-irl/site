import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import reviews from "../../../content/reviews.json";

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

type Review = {
  name: string;
  role: string;
  organisation: string;
  quote: string;
  rating: number;
};

function renderStars(rating: number) {
  const safeRating = Math.max(0, Math.min(5, rating));
  return "★".repeat(safeRating) + "☆".repeat(5 - safeRating);
}

export default function ReviewsPage() {
  const reviewList = reviews as Review[];

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Reviews"
          description="Feedback from organisations and care teams supported by Michelle Carter Consultancy."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {reviewList.map((review, index) => (
            <article
              key={`${review.name}-${review.organisation}-${index}`}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs"
            >
              <p className="text-sm font-semibold tracking-wide text-amber-500" aria-label={`${review.rating} out of 5 stars`}>
                {renderStars(review.rating)}
              </p>
              <p className="mt-4 text-base leading-7 text-slate-700">“{review.quote}”</p>
              <div className="mt-5 border-t border-slate-200 pt-4">
                <p className="font-semibold text-slate-900">{review.name}</p>
                <p className="text-sm text-slate-600">
                  {review.role}, {review.organisation}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
