import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`max-w-2xl ${isCenter ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-strong">
          <span className="h-1 w-1 rounded-full bg-iris" />
          {eyebrow}
        </span>
      )}
      <h2 className="display-xl mt-4 text-3xl text-foreground sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>
      )}
    </Reveal>
  );
}
