import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export default function ReviewsPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Reviews"
          description="Testimonials and client reviews will be added in Phase 5."
        />
      </Container>
    </section>
  );
}
