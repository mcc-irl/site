import Link from "next/link";
import { Container } from "@/components/ui/container";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";

const footerLinks = [
  { href: "/bio", label: "Bio" },
  { href: "/services", label: "Services" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export async function Footer() {
  const reader = createReader(process.cwd(), keystaticConfig);
  const siteSettings = await reader.singletons.siteSettings.read();
  const tagline = siteSettings?.footerTagline ?? "Healthcare training and consultancy.";

  return (
    <footer className="bg-brand-900 text-brand-100">
      <Container className="py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold text-white">Michelle Carter Consultancy</p>
            <p className="mt-1 text-sm text-brand-300">{tagline}</p>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-brand-200">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-brand-400">
          © {new Date().getFullYear()} Michelle Carter Consultancy. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}