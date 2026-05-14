"use client";

import Image from "next/image";
import { useState } from "react";

/*
  BACKUP: la versión anterior del carrusel con tres imágenes y flechas
  está preservada íntegramente en FabricGallery.backup.tsx.
  Para restaurarla: cp FabricGallery.backup.tsx FabricGallery.tsx
*/

/* Imagen que se muestra cuando ningún botón está activo */
const DEFAULT_IMAGE = "/images/Tela2.png";

const FABRICS = [
  {
    id: "japon",
    label: "Japón",
    title: "Japón",
    description:
      "Nuestras telas azules se elaboran siguiendo el proceso tradicional conocido como Aizome, una técnica de teñido milenaria que impregna cada fibra de historia y precisión artesanal.",
    image: "/images/Tela17.png",
  },
  {
    id: "francia",
    label: "Francia",
    title: "Francia",
    description:
      "Cultivar lino es un arte dominado por los agricultores franceses desde hace siglos. Francia ocupa un lugar privilegiado en la industria textil mundial gracias a la calidad incomparable de su fibra.",
    image: "/images/Tela10.png",
  },
  {
    id: "italia",
    label: "Italia",
    title: "Italia",
    description:
      "Para nuestras prendas de invierno, contamos con la colaboración de la legendaria sastrería Lanieri y sus décadas de experiencia en la selección y tratamiento de lanas nobles.",
    image: "/images/Tela15.png",
  },
];

export default function FabricGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="px-10 py-16 bg-brand-white">
      {/* ── Cabecera ── */}
      <div className="flex justify-between items-end mb-10">
        <h2 className="font-canon italic text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.01em] text-brand-black">
          Tejidos que<br />merecen su origen.
        </h2>
        <p className="font-america text-[11px] text-brand-black/40 max-w-[210px] leading-[1.7] text-right">
          Cada fibra cuenta una historia.<br />
          Japón, Italia y Francia.
        </p>
      </div>

      {/* ── Layout: botones izquierda + imagen derecha ── */}
      <div className="flex gap-2.5 items-start">

        {/* ── Columna izquierda: botones expandibles — 1 de 4 columnas ── */}
        <div className="flex-1 flex flex-col border-t border-brand-black/12">
          {FABRICS.map((fabric, i) => {
            const isActive = i === active;
            return (
              <button
                key={fabric.id}
                onClick={() => setActive(isActive ? null : i)}
                className={`w-full text-left border-b border-brand-black/12 transition-colors duration-300 ${
                  !isActive ? "hover:bg-brand-offwhite/60" : "bg-white"
                }`}
              >
                {/* Fila de etiqueta */}
                <div className="flex items-center justify-between px-6 py-5">
                  <span
                    className="font-canon italic text-[1.1rem] tracking-[-0.01em] transition-colors duration-300"
                    style={{ color: isActive ? "#181A1A" : "rgba(24,26,26,0.45)" }}
                  >
                    {fabric.label}
                  </span>

                  {/* Indicador + / × */}
                  <span
                    className="font-america text-[20px] leading-none select-none transition-all duration-300"
                    style={{
                      display: "inline-block",
                      color: isActive ? "#181A1A" : "rgba(24,26,26,0.25)",
                      transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </div>

                {/* Contenido expandido */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: isActive ? "220px" : "0px" }}
                >
                  <div className="px-6 pb-8">
                    <p className="font-america text-[13px] text-brand-black/60 leading-[1.75]">
                      {fabric.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Columna derecha: imagen — 3 de 4 columnas ── */}
        <div className="flex-[3] relative h-[480px] overflow-hidden">
          {/* Imagen por defecto — visible solo cuando active === null */}
          <Image
            src={DEFAULT_IMAGE}
            alt=""
            fill
            className="object-cover object-center"
            style={{
              opacity: active === null ? 1 : 0,
              transform: active === null ? "translateX(0px)" : "translateX(-32px)",
              transition: "opacity 700ms ease, transform 700ms ease",
            }}
            sizes="60vw"
            priority
          />

          {/* Imágenes de cada tela */}
          {FABRICS.map((fabric, i) => (
            <Image
              key={fabric.id}
              src={fabric.image}
              alt={fabric.label}
              fill
              className="object-cover object-center"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? "translateX(0px)" : "translateX(-32px)",
                transition: "opacity 700ms ease, transform 700ms ease",
              }}
              sizes="60vw"
              priority={i === 0}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
