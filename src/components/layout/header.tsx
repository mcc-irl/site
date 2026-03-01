import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/bio", label: "Bio" },
  { href: "/services", label: "Services" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact Me" },
];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="border-b border-slate-200 bg-slate-50">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2 text-xs sm:text-sm text-slate-700">
          <a
            href="https://linkedin.com/mcc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-slate-500 transition-colors hover:text-brand-700"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.26 8h4.48v14H.26V8zM8.26 8h4.3v1.92h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V22h-4.48v-6.67c0-1.59-.03-3.64-2.22-3.64-2.22 0-2.56 1.74-2.56 3.53V22H8.26V8z" />
            </svg>
            <span className="sr-only">LinkedIn</span>
          </a>

          <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2">
            <a href="mailto:mcc@outlook.ie" className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-700">
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-slate-500" aria-hidden="true" fill="currentColor">
                <path d="M2.5 4A2.5 2.5 0 000 6.5v7A2.5 2.5 0 002.5 16h15a2.5 2.5 0 002.5-2.5v-7A2.5 2.5 0 0017.5 4h-15zm0 1.5h15a1 1 0 01.64.23L10 11.9 1.86 5.73A1 1 0 012.5 5.5zm-1 2.05L7.86 12.3a2.5 2.5 0 004.28 0l6.36-4.75V13.5a1 1 0 01-1 1h-15a1 1 0 01-1-1V7.55z" />
              </svg>
              mcc@outlook.ie
            </a>

            <a href="tel:0879033289" className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-700">
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-slate-500" aria-hidden="true" fill="currentColor">
                <path d="M3.65 1.96a1.75 1.75 0 012.03-.34l2.1 1.05c.72.36 1.07 1.2.84 1.98l-.49 1.6a1 1 0 00.24.98l2.55 2.55a1 1 0 00.98.24l1.6-.49a1.75 1.75 0 011.98.84l1.05 2.1c.34.69.2 1.53-.34 2.03l-1.13 1.06c-.62.58-1.52.8-2.34.58-2.7-.72-5.2-2.25-7.3-4.35-2.1-2.1-3.63-4.6-4.35-7.3a2.25 2.25 0 01.58-2.34l1.06-1.13z" />
              </svg>
              0879033289
            </a>
          </div>
        </Container>
      </div>

      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Michelle Carter Consultancy home">
          <Image src="/logo.png" alt="Michelle Carter Consultancy" width={42} height={42} priority />
          <span className="text-sm font-semibold tracking-wide text-slate-900 sm:text-base">
            Michelle Carter Consultancy
          </span>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-brand-700">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
