import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Contact Me"
          description="Contact form and enquiry workflow will be implemented in Phase 6."
        />
      </Container>
    </section>
  );
}
