import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <Container className="flex flex-col gap-1 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Michelle Carter Consultancy.</p>
        <p>Healthcare training and consultancy.</p>
      </Container>
    </footer>
  );
}
