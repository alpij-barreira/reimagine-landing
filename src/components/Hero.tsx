"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGES = [
  { src: "/images/Ropa11.png", alt: "Reimagine — running de autor" },
  { src: "/images/ropaHor2.png", alt: "Reimagine — moda deportiva" },
];

const INTERVAL_MS = 5000;
const TRANSITION_MS = 1200;

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Imágenes en crossfade */}
      {IMAGES.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlay oscuro sutil */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Contenido centrado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
        {/* Logo — entra primero */}
        <h1
          className="font-canon italic text-white leading-none tracking-[-0.02em] select-none"
          style={{
            fontSize: "clamp(3.25rem, 14vw, 13rem)",
            animation: "fade-up 1.36s cubic-bezier(0.16, 1, 0.3, 1) 0.43s both",
          }}
        >
          Reimagine
        </h1>

        {/* Tagline — entra despues */}
        <p
          className="font-america text-white uppercase tracking-[0.22em] text-[10px] md:text-[11px] select-none"
          style={{
            animation: "fade-up 1.19s cubic-bezier(0.16, 1, 0.3, 1) 1.62s both",
          }}
        >
          Moda para deportistas introspectivos
        </p>
      </div>
    </section>
  );
}
