type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  inverted?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  inverted = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center" : "text-left"} ${className}`}>
      {eyebrow ? (
        <p className={`text-xs font-semibold uppercase tracking-widest ${inverted ? "text-brand-200" : "text-brand-600"}`}>{eyebrow}</p>
      ) : null}
      <h2 className={`mt-2 text-2xl font-semibold tracking-tight sm:text-3xl ${inverted ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {description ? <p className={`mt-4 max-w-2xl ${inverted ? "text-brand-100/80" : "text-slate-600"}`}>{description}</p> : null}
    </div>
  );
}
