import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "white";
};

export function Button({ href, children, variant = "primary" }: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-brand-600 text-white hover:bg-brand-700"
      : variant === "white"
      ? "bg-white text-brand-700 hover:bg-brand-50"
      : "border border-brand-200 bg-white text-brand-700 hover:bg-brand-50";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition-colors duration-200 ${styles}`}
    >
      {children}
    </Link>
  );
}
