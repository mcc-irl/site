import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children?: ReactNode;
};

export function Card({ title, children }: CardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
      <div className="h-1 bg-gradient-to-r from-brand-500 to-brand-300" />
      <div className="p-6">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{children}</p>
      </div>
    </article>
  );
}
