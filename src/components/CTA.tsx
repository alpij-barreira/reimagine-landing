import Link from "next/link";

interface CTAProps {
  label: string;
  href: string;
  className?: string;
}

/**
 * Patron de CTA de Reimagine:
 * texto + flecha → con underline naranja al hover
 * Nunca con fondo, siempre como texto inline.
 */
export default function CTA({ label, href, className = "" }: CTAProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-2 font-america text-sm tracking-widest uppercase text-brand-black ${className}`}
    >
      <span>{label}</span>
      <span
        aria-hidden
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        →
      </span>
      {/* Underline naranja: escala de 0 a 1 desde la izquierda */}
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-0.5 h-px stitch origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
      />
    </Link>
  );
}
