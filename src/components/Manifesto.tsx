"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LINES = [
  "Para los que no publican sus kilómetros.",
  "Para los que correr es una forma de estar en el mundo.",
  "Para los que ven el deporte como un proceso de autocuidado.",
];

const BLUR_DURATION = 2187; // ms por elemento
const BLUR_STEP     = 777;  // ms de diferencia entre elementos

export default function Manifesto() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [animationsComplete, setAnimationsComplete] = useState(false);

  const sectionRef  = useRef<HTMLElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  /* ── Activación de animaciones al entrar en viewport ── */
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Temporizador de fin de animaciones ── */
  useEffect(() => {
    if (!revealed) return;
    const TOTAL = BLUR_DURATION + LINES.length * BLUR_STEP;
    const timer = setTimeout(() => setAnimationsComplete(true), TOTAL);
    return () => clearTimeout(timer);
  }, [revealed]);

  /*
    Bloqueo de scroll descendente SOLO cuando el borde inferior de la sección
    alcanza el borde inferior del viewport (el usuario ha visto todo el contenido
    y quiere seguir bajando hacia el footer).
    Se libera cuando todas las animaciones de blur han terminado.
  */
  useEffect(() => {
    if (!revealed || animationsComplete) return;

    const blockDown = (e: WheelEvent) => {
      if (e.deltaY <= 0) return;
      const section = sectionRef.current;
      if (!section) return;
      const sectionBottom = section.getBoundingClientRect().bottom;
      if (sectionBottom <= window.innerHeight + 10) {
        e.preventDefault();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const blockTouchDown = (e: TouchEvent) => {
      const dy = touchStartY.current - e.touches[0].clientY;
      if (dy <= 0) return;
      const section = sectionRef.current;
      if (!section) return;
      const sectionBottom = section.getBoundingClientRect().bottom;
      if (sectionBottom <= window.innerHeight + 10) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", blockDown, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", blockTouchDown, { passive: false });

    return () => {
      window.removeEventListener("wheel", blockDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", blockTouchDown);
    };
  }, [revealed, animationsComplete]);

  const blurStyle = (index: number): React.CSSProperties => ({
    filter: revealed ? "blur(0px)" : "blur(10px)",
    transition: `filter ${BLUR_DURATION}ms ease ${index * BLUR_STEP}ms`,
  });

  return (
    <section ref={sectionRef} className="flex min-h-screen bg-brand-black">
      {/* Imagen izquierda */}
      <div className="relative w-1/2 min-h-screen">
        <Image
          src="/images/Ropa1.png"
          alt="Reimagine"
          fill
          className="object-cover object-top"
          sizes="50vw"
        />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-brand-black" />
      </div>

      {/* Panel derecho */}
      <div ref={panelRef} className="w-1/2 flex flex-col justify-center px-16 py-20">
        {/* Líneas del manifiesto */}
        <div className="space-y-4 mb-20">
          {LINES.map((line, i) => (
            <p
              key={i}
              className="font-canon italic text-white leading-[1.2] tracking-[-0.01em]"
              style={{
                fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                ...blurStyle(i),
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <p
            className="font-canon italic text-white/80 text-[1.15rem] mb-6 tracking-[-0.01em]"
            style={blurStyle(LINES.length)}
          >
            Forma parte del ritual.
          </p>

          {submitted ? (
            <p className="font-america text-[11px] tracking-[0.12em] uppercase text-white/40">
              Bienvenido al ritual.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubmitted(true);
              }}
              className="flex items-end gap-0 border-b border-white/20 pb-2 max-w-sm"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electronico"
                className="flex-1 bg-transparent font-america text-[12px] tracking-[0.06em] text-white placeholder:text-white/25 outline-none"
              />
              <button
                type="submit"
                className="group relative font-america text-[10px] tracking-[0.22em] uppercase text-white/50 hover:text-white transition-colors duration-300 ml-4 shrink-0"
              >
                Unirme
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-2 h-px stitch-line"
                />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
