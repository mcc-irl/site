import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type ContactPageProps = {
  searchParams?: {
    service?: string;
  };
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const selectedService = searchParams?.service?.trim();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Contact Me"
          description={
            selectedService
              ? `You are enquiring about: ${selectedService}. Contact form and full enquiry workflow will be implemented in Phase 6.`
              : "Contact form and enquiry workflow will be implemented in Phase 6."
          }
        />
      </Container>
    </section>
  );
}
