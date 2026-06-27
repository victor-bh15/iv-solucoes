import Link from "next/link";

/**
 * Marca da IV Soluções em texto (wordmark) — fica nítida no tema claro e no
 * escuro. Um quadrinho com o monograma "iV" + o nome ao lado.
 */
export function Logo({
  className = "",
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="IV Soluções — página inicial"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-electric via-iris to-violet shadow-sm ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-105">
        <span className="font-display text-lg font-bold leading-none text-white">
          <span className="text-white/75">i</span>V
        </span>
        <span
          className="absolute right-1 top-1 h-1 w-1 rounded-full bg-white/80"
          aria-hidden="true"
        />
      </span>
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-bold tracking-tight text-foreground">
            IV <span className="font-medium text-muted">SOLUÇÕES</span>
          </span>
        </span>
      )}
    </Link>
  );
}
