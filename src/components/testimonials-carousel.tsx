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
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 to-brand-700 py-16 sm:py-20">
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute right-8 -top-8 h-48 w-48 rounded-full bg-white/5" />
      </div>

      <Container className="relative">
        <SectionHeading eyebrow={eyebrow} title={heading} inverted />
        <div className="mt-10 flex flex-col items-center">
          <div className="relative w-full max-w-2xl rounded-xl bg-white/10 p-8 text-center backdrop-blur-sm ring-1 ring-white/20">
            {/* Decorative opening quote */}
            <svg className="absolute left-6 top-4 h-10 w-10 text-brand-300/50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            {/* Decorative closing quote */}
            <svg className="absolute bottom-4 right-6 h-10 w-10 rotate-180 text-brand-300/50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>

            <div className="mb-4 flex justify-center gap-0.5" aria-label={`${current.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${i < current.rating ? "text-brand-300" : "text-white/20"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-base leading-7 text-white/90">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="font-semibold text-white">{current.name}</p>
              <p className="text-sm text-brand-200">
                {current.role}, {current.organisation}
              </p>
            </div>
          </div>

          {reviews.length > 1 && (
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="rounded-full border border-white/30 bg-white/10 p-2 text-white transition-colors hover:bg-white/20 hover:border-white/50"
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
                      i === index ? "bg-white" : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className="rounded-full border border-white/30 bg-white/10 p-2 text-white transition-colors hover:bg-white/20 hover:border-white/50"
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
