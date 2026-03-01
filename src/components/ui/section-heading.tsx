type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : "text-left"}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-slate-600">{description}</p> : null}
    </div>
  );
}
