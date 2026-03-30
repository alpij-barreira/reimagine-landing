"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS_LEFT = [
  { href: "/mujer", label: "Mujer" },
  { href: "/hombre", label: "Hombre" },
  { href: "/colecciones", label: "Colecciones" },
];

const LINKS_RIGHT = [
  { href: "/esenciales", label: "Esenciales" },
  { href: "/nosotros", label: "Nosotros" },
];

const ALL_LINKS = [...LINKS_LEFT, ...LINKS_RIGHT];

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative inline-flex items-center font-america text-[11px] tracking-[0.12em] uppercase leading-none"
    >
      {children}
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-0.5 h-px stitch-line"
      />
    </Link>
  );
}

function CartIcon({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/carrito"
      aria-label="Carrito"
      onClick={onClick}
      className="group relative inline-flex items-center justify-center leading-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-0.5 h-px stitch-line"
      />
    </Link>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col justify-center items-center w-5 h-5 gap-[5px]">
      <span
        className="block h-px w-5 bg-current transition-all duration-300 origin-center"
        style={open ? { transform: "translateY(6px) rotate(45deg)" } : {}}
      />
      <span
        className="block h-px w-5 bg-current transition-all duration-300"
        style={open ? { opacity: 0, transform: "scaleX(0)" } : {}}
      />
      <span
        className="block h-px w-5 bg-current transition-all duration-300 origin-center"
        style={open ? { transform: "translateY(-6px) rotate(-45deg)" } : {}}
      />
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const threshold = window.innerHeight * 0.75;
    const handler = () => setScrolled(window.scrollY > threshold);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Bloquear scroll del body cuando el menú está abierto */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b navbar-enter navbar-scroll-transition"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.80)" : "transparent",
          borderColor: scrolled ? "rgba(0,0,0,0.06)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          color: scrolled ? "#181A1A" : "#FFFFFF",
        }}
      >
        {/* ── Desktop nav ── */}
        <nav className="hidden md:grid grid-cols-3 items-center px-10 h-[52px]">
          {/* Izquierda */}
          <div className="flex items-center gap-8">
            {LINKS_LEFT.map((l) => (
              <NavLink key={l.href} href={l.href}>{l.label}</NavLink>
            ))}
          </div>

          {/* Centro — logo */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="font-canon italic text-[22px] leading-none tracking-[-0.01em] transition-opacity duration-500"
              style={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? "auto" : "none" }}
            >
              Reimagine
            </Link>
          </div>

          {/* Derecha */}
          <div className="flex items-center justify-end gap-8">
            {LINKS_RIGHT.map((l) => (
              <NavLink key={l.href} href={l.href}>{l.label}</NavLink>
            ))}
            <CartIcon />
          </div>
        </nav>

        {/* ── Mobile nav ── */}
        <nav className="flex md:hidden items-center justify-between px-5 h-[52px]">
          {/* Hamburguesa */}
          <button
            aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center justify-center w-8 h-8 -ml-1"
          >
            <HamburgerIcon open={menuOpen} />
          </button>

          {/* Logo centrado */}
          <Link
            href="/"
            className="font-canon italic text-[20px] leading-none tracking-[-0.01em]"
            onClick={close}
          >
            Reimagine
          </Link>

          {/* Carrito */}
          <CartIcon onClick={close} />
        </nav>
      </header>

      {/* ── Mobile drawer overlay ── */}
      <div
        aria-hidden={!menuOpen}
        onClick={close}
        className="fixed inset-0 z-40 bg-black/40 md:hidden mobile-overlay-transition"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
      />

      {/* ── Mobile drawer panel ── */}
      <div
        role="dialog"
        aria-label="Menu de navegacion"
        aria-modal="true"
        className="fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-brand-black text-white flex flex-col pt-[52px] md:hidden mobile-menu-transition"
        style={{ transform: menuOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <nav className="flex flex-col px-8 pt-10 gap-7">
          {ALL_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className="group relative font-america text-[13px] tracking-[0.14em] uppercase text-white/70 hover:text-white transition-colors duration-200 w-fit"
            >
              {l.label}
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-0.5 h-px stitch-line"
              />
            </Link>
          ))}
        </nav>

        {/* Separador + carrito */}
        <div className="mx-8 mt-8 pt-8 border-t border-white/10">
          <Link
            href="/carrito"
            onClick={close}
            className="group relative font-america text-[13px] tracking-[0.14em] uppercase text-white/70 hover:text-white transition-colors duration-200 w-fit flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Carrito
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-0.5 h-px stitch-line"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
