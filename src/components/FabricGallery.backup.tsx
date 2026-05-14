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
    rightBottom: "18%",
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

const POS_LEFT  = "calc(50% - 360px)";
const POS_RIGHT = "calc(50% - 350px)";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

export default function FabricGallery() {
  const [{ current, animKey }, setState] = useState({ current: 0, animKey: 0 });
  const [isPaused, setIsPaused] = useState(false);

  /*
    current y animKey se actualizan juntos en un único setState,
    garantizando un solo render por cambio de slide y eliminando
    el parpadeo que causaba el useEffect asíncrono anterior.
  */
  /* Sufijo a/b que alterna en cada cambio de slide.
     Al cambiar el nombre de la animación CSS, el browser la reinicia desde `from`
     sin necesidad de remontar el elemento (evita el destello por recreación del DOM). */
  const animSuffix = animKey % 2 === 0 ? "a" : "b";

  const go = (idx: number) =>
    setState((s) => ({
      current: (idx + SLIDES.length) % SLIDES.length,
      animKey: s.animKey + 1,
    }));

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(
      () => setState((s) => ({ current: (s.current + 1) % SLIDES.length, animKey: s.animKey + 1 })),
      5400
    );
    return () => clearTimeout(timer);
  }, [current, isPaused]);

  const slideStyle = (i: number) => ({
    opacity: i === current ? 1 : 0,
    transition: "opacity 800ms cubic-bezier(0.4,0,0.2,1)",
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
        {SLIDES.map((slide, i) => {
          const isActive = i === current;

          return (
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
                  ["--r" as string]: slide.leftRotate,
                  transform: `rotate(${slide.leftRotate})`,
                  clipPath: CLIP_LEFT,
                  overflow: "hidden",
                  zIndex: 0,
                  boxShadow: "3px 5px 18px rgba(0,0,0,0.14)",
                  animation: isActive
                    ? `fabric-left-in-${animSuffix} 0.65s ${EASE} 0.65s both`
                    : undefined,
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
                  ["--r" as string]: slide.rightRotate,
                  transform: `rotate(${slide.rightRotate})`,
                  clipPath: CLIP_RIGHT,
                  overflow: "hidden",
                  zIndex: 0,
                  boxShadow: "-3px 5px 18px rgba(0,0,0,0.13)",
                  animation: isActive
                    ? `fabric-right-in-${animSuffix} 0.65s ${EASE} 0.65s both`
                    : undefined,
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
          );
        })}

        {/* ── Flechas laterales — visibles solo en hover ── */}
        <button
          onClick={() => go(current - 1)}
          aria-label="Anterior"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <span
            className="font-america text-brand-black/55 text-[28px] leading-none select-none"
            style={{ textShadow: "0 1px 3px rgba(255,255,255,0.6)" }}
          >
            ‹
          </span>
        </button>

        <button
          onClick={() => go(current + 1)}
          aria-label="Siguiente"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <span
            className="font-america text-brand-black/55 text-[28px] leading-none select-none"
            style={{ textShadow: "0 1px 3px rgba(255,255,255,0.6)" }}
          >
            ›
          </span>
        </button>
      </div>

      {/* ── Texto del slide ── */}
      <div className="relative h-[64px] flex items-center justify-center mt-4">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className="absolute inset-0 flex flex-col items-center justify-start gap-1.5"
            style={slideStyle(i)}
          >
            <h3 className="font-canon italic text-[1.85rem] leading-none tracking-[-0.01em] text-brand-black">
              {slide.title}
            </h3>
            <p className="font-america text-[11px] tracking-[0.08em] text-brand-black/45 whitespace-pre-line text-center">
              {slide.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
