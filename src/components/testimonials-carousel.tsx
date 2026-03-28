"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type Review = {
  name: string;
  role: string;
  organisation: string;
  quote: string;
  rating: number;
};

type TestimonialsCarouselProps = {
  reviews: Review[];
  eyebrow: string;
  heading: string;
};

export function TestimonialsCarousel({ reviews, eyebrow, heading }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);

  if (reviews.length === 0) return null;

  const current = reviews[index];
  const prev = () => setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-slate-50 border-y border-slate-200 py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={heading} />
        <div className="mt-10 flex flex-col items-center">
          <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-8 shadow-xs text-center">
            <div className="mb-4 flex justify-center gap-0.5" aria-label={`${current.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${i < current.rating ? "text-brand-500" : "text-slate-200"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-base leading-7 text-slate-700">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="font-semibold text-slate-900">{current.name}</p>
              <p className="text-sm text-slate-500">
                {current.role}, {current.organisation}
              </p>
            </div>
          </div>

          {reviews.length > 1 && (
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-xs transition-colors hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === index ? "bg-brand-600" : "bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-xs transition-colors hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
