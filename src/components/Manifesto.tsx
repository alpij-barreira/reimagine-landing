"use client";

import Image from "next/image";
import { useState } from "react";

const LINES = [
  "Disenamos para los que no publican sus kilometros.",
  "Para los que eligen el tejido antes que el color.",
  "Para los que entienden que correr no es un deporte.",
  "Es una forma de estar en el mundo.",
];

export default function Manifesto() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="flex min-h-screen bg-brand-black">
      {/* Imagen izquierda */}
      <div className="relative w-1/2 min-h-screen">
        <Image
          src="/images/Ropa1.png"
          alt="Reimagine"
          fill
          className="object-cover object-top"
          sizes="50vw"
        />
        {/* Gradiente sutil en el borde derecho para fundir con el panel */}
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-brand-black" />
      </div>

      {/* Panel derecho */}
      <div className="w-1/2 flex flex-col justify-center px-16 py-20">
        {/* Etiqueta */}
        <p className="font-america text-[9px] tracking-[0.28em] uppercase text-white/30 mb-12">
          Manifiesto
        </p>

        {/* Lineas del manifiesto */}
        <div className="space-y-4 mb-20">
          {LINES.map((line, i) => (
            <p
              key={i}
              className="font-canon italic text-white leading-[1.2] tracking-[-0.01em]"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Divisor */}
        <div className="w-12 h-px bg-white/15 mb-12" />

        {/* Newsletter */}
        <div>
          <p className="font-canon italic text-white/80 text-[1.15rem] mb-6 tracking-[-0.01em]">
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
                  className="absolute inset-x-0 -bottom-2 h-px stitch origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
