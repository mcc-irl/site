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
