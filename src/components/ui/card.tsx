import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
};

export function Card({ title, children }: CardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{children}</p>
    </article>
  );
}
