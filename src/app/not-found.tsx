import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-xs sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">404</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Page not found</h1>
          <p className="mt-4 text-slate-600">
            The page you are looking for isn&apos;t available. Return to the home page or contact us directly.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/">Back to home</Button>
            <Button href="/contact" variant="secondary">
              Contact me
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}