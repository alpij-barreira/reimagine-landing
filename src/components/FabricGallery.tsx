"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    id: 1,
    country: "Japon",
    title: "Japon",
    copy: "Nuestras telas azules se elaboran siguiendo el proceso\ntradicional conocido como Aizome, técnica de teñido milenaria",
    center: "/images/Tela17.png",
    left: "/images/Tela1.png",
    right: "/images/Tela2.png",
    leftTop: "22%",
    leftRotate: "-2.8deg",
    rightBottom: "14%",
    rightRotate: "2.5deg",
  },
  {
    id: 2,
    country: "Francia",
    title: "Francia",
    copy: "Cultivar lino es un arte dominado por los agricultores y en\nFrancia, un lugar privilegiado en la industria textil",
    center: "/images/Tela10.png",
    left: "/images/Tela9.png",
    right: "/images/Tela6.png",
    leftTop: "38%",
    leftRotate: "-1.4deg",
    rightBottom: "4%",
    rightRotate: "4.2deg",
  },
  {
    id: 3,
    country: "Italia",
    title: "Italia",
    copy: "Para nuestras prendas de invierno, contamos con la colaboración\nde la legendaria sastrería Lanieri y sus años de experiencia",
    center: "/images/Tela15.png",
    left: "/images/Tela13.png",
    right: "/images/Tela11.png",
    leftTop: "12%",
    leftRotate: "-4.1deg",
    rightBottom: "20%",
    rightRotate: "1.6deg",
  },
];

const CLIP_LEFT  = "polygon(3% 0%, 98% 2%, 97% 100%, 0% 98%)";
const CLIP_RIGHT = "polygon(1% 2%, 100% 0%, 98% 98%, 2% 100%)";

/*
  Separación respecto a la imagen central (350px ancho, centrada):
  - Imagen izq.: su borde derecho queda a 20px del borde izq. de la central
      left = calc(50% - 175px - 20px - 165px) = calc(50% - 360px)
  - Imagen der.: su borde izq. queda a 20px del borde der. de la central
      right = calc(container - (50% + 175px + 20px + 155px)) = calc(50% - 350px)
*/
const POS_LEFT  = "calc(50% - 360px)";
const POS_RIGHT = "calc(50% - 350px)";

export default function FabricGallery() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const go = (idx: number) => setCurrent((idx + SLIDES.length) % SLIDES.length);

  /* Auto-avance: 5 400 ms (4 500 × 1.2). Se pausa al hacer hover y se
     reinicia desde cero tras cada cambio manual o automático. */
  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(
      () => setCurrent((c) => (c + 1) % SLIDES.length),
      5400
    );
    return () => clearTimeout(timer);
  }, [current, isPaused]);

  /* Transición compartida: fade + deslizamiento vertical suave.
     Slides inactivos reposan 14px abajo; al activarse suben a 0. */
  const slideStyle = (i: number) => ({
    opacity: i === current ? 1 : 0,
    transform: i === current ? "translateY(0px)" : "translateY(14px)",
    transition: "opacity 800ms cubic-bezier(0.4,0,0.2,1), transform 800ms cubic-bezier(0.4,0,0.2,1)",
    pointerEvents: (i === current ? "auto" : "none") as React.CSSProperties["pointerEvents"],
  });

  return (
    <section className="px-10 py-20 bg-brand-white">
      {/* ── Cabecera ── */}
      <div className="flex justify-between items-end mb-10">
        <h2 className="font-canon italic text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.01em] text-brand-black">
          Tejidos que<br />merecen su origen.
        </h2>
        <p className="font-america text-[11px] text-brand-black/40 max-w-[210px] leading-[1.7] text-right">
          Cada fibra cuenta una historia.<br />
          Japon, Italia, Francia — los tres<br />
          pilares de nuestra cadena textil.
        </p>
      </div>

      {/* ── Composición con flechas laterales ── */}
      <div
        className="group relative h-[580px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides */}
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className="absolute inset-0 flex items-center justify-center"
            style={slideStyle(i)}
          >
            {/* Imagen lateral izquierda */}
            <div
              style={{
                position: "absolute",
                left: POS_LEFT,
                top: slide.leftTop,
                width: "165px",
                height: "220px",
                transform: `rotate(${slide.leftRotate})`,
                clipPath: CLIP_LEFT,
                overflow: "hidden",
                zIndex: 2,
                boxShadow: "3px 5px 18px rgba(0,0,0,0.14)",
              }}
            >
              <Image
                src={slide.left}
                alt=""
                fill
                className="object-cover"
                sizes="165px"
                priority={i === 0}
              />
              <span
                className="absolute font-america text-[8px] tracking-[0.25em] uppercase text-white/70 select-none"
                style={{
                  right: "-28px",
                  bottom: "32px",
                  transform: "rotate(90deg)",
                  transformOrigin: "bottom right",
                  whiteSpace: "nowrap",
                }}
              >
                {slide.country}
              </span>
            </div>

            {/* Imagen central */}
            <div
              style={{
                position: "relative",
                width: "350px",
                height: "500px",
                flexShrink: 0,
                zIndex: 1,
                overflow: "hidden",
              }}
            >
              <Image
                src={slide.center}
                alt={slide.title}
                fill
                className="object-cover"
                sizes="350px"
                priority={i === 0}
              />
            </div>

            {/* Imagen lateral derecha */}
            <div
              style={{
                position: "absolute",
                right: POS_RIGHT,
                bottom: slide.rightBottom,
                width: "155px",
                height: "205px",
                transform: `rotate(${slide.rightRotate})`,
                clipPath: CLIP_RIGHT,
                overflow: "hidden",
                zIndex: 2,
                boxShadow: "-3px 5px 18px rgba(0,0,0,0.13)",
              }}
            >
              <Image
                src={slide.right}
                alt=""
                fill
                className="object-cover"
                sizes="155px"
                priority={i === 0}
              />
            </div>
          </div>
        ))}

        {/* ── Flechas laterales — visibles solo en hover ── */}
        <button
          onClick={() => go(current - 1)}
          aria-label="Anterior"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                     w-9 h-9 rounded-full border border-brand-black/25 bg-white/70 backdrop-blur-sm
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100
                     hover:border-brand-black hover:bg-white
                     transition-all duration-300"
        >
          <span className="font-america text-[12px] text-brand-black/60 hover:text-brand-black">←</span>
        </button>

        <button
          onClick={() => go(current + 1)}
          aria-label="Siguiente"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                     w-9 h-9 rounded-full border border-brand-black/25 bg-white/70 backdrop-blur-sm
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100
                     hover:border-brand-black hover:bg-white
                     transition-all duration-300"
        >
          <span className="font-america text-[12px] text-brand-black/60 hover:text-brand-black">→</span>
        </button>
      </div>

      {/* ── Texto del slide ── */}
      <div className="relative h-[44px] flex items-center justify-center mt-4">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className="absolute inset-0 flex items-center justify-center"
            style={slideStyle(i)}
          >
            <h3 className="font-canon italic text-[1.85rem] leading-none tracking-[-0.01em] text-brand-black text-center">
              {slide.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
