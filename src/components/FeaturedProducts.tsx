"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CTA from "./CTA";

/* Intervalo del carrusel automático al hacer hover (ms) */
const AUTO_INTERVAL_MS = 1400;

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Conjunto deportivo verde Bastereti", price: 220, images: ["/images/bigModel.jpg"] },
  { id: 2, name: "Conjunto deportivo negro Aria", price: 135, images: ["/images/Aria1.png", "/images/Aria3.png"] },
  { id: 3, name: "Chaqueta técnica Lagos",     price: 185, images: ["/images/Lagos1.png",   "/images/Lagos2.jpg"] },
  { id: 4, name: "Chaleco deportivo Ada",      price: 125, images: ["/images/vest1.jpg",    "/images/vest2.jpg"] },
  { id: 5, name: "Camiseta transpirable Harper", price: 70,  images: ["/images/verde1.jpg",  "/images/verde2.jpg"] },
  { id: 6, name: "Parka Vestido Air",          price: 245, images: ["/images/ropaHor2.png", "/images/Ropa11.png"] },
];

/* ── Info debajo de la imagen ── */
function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-1.5 mt-1.5">
      <span className="font-america text-[11px] text-brand-black leading-none">{product.name}</span>
      <span className="font-america text-[11px] text-brand-black/60 leading-none">&euro;{product.price}</span>
    </div>
  );
}

/* ── Tarjeta de producto con carrusel de imágenes ── */
function ProductCard({
  product,
  containerClass,
  sizes,
  wrapperClass = "",
}: {
  product: Product;
  containerClass: string;
  sizes: string;
  wrapperClass?: string;
}) {
  const [idx, setIdx] = useState(0);
  const [hovering, setHovering] = useState(false);
  const total = product.images.length;

  /* Al hacer hover, avanza inmediatamente a la siguiente imagen.
     Si el ratón se mantiene encima, continúa el carrusel automático.
     Al salir del hover, vuelve a la primera imagen. */
  useEffect(() => {
    if (!hovering || total <= 1) return;
    setIdx((i) => (i + 1) % total);
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % total);
    }, AUTO_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [hovering, total]);

  useEffect(() => {
    if (!hovering) setIdx(0);
  }, [hovering]);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setIdx((i) => (i - 1 + total) % total);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setIdx((i) => (i + 1) % total);
  };

  return (
    <div
      className={`group flex flex-col ${wrapperClass}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className={`relative overflow-hidden ${containerClass}`}>
        {/* Imágenes apiladas: crossfade con opacity.
            Cuando solo hay una imagen, aplicamos un suave zoom en hover. */}
        {product.images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? product.name : ""}
            fill
            className={
              total === 1
                ? "object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                : `object-cover object-top transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0"}`
            }
            sizes={sizes}
            priority={i === 0}
          />
        ))}

        {/* Flechas laterales — solo visibles en mobile y cuando hay más de una imagen.
            En desktop el avance es automático en hover. */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Imagen anterior"
              className="md:hidden absolute left-2 inset-y-0 flex items-center justify-center z-10"
            >
              <span className="text-[26px] leading-none select-none text-white mix-blend-difference">
                ‹
              </span>
            </button>

            <button
              onClick={next}
              aria-label="Imagen siguiente"
              className="md:hidden absolute right-2 inset-y-0 flex items-center justify-center z-10"
            >
              <span className="text-[26px] leading-none select-none text-white mix-blend-difference">
                ›
              </span>
            </button>
          </>
        )}
      </div>

      <ProductInfo product={product} />
    </div>
  );
}

/* ── Componente principal ── */
export default function FeaturedProducts() {
  return (
    <section className="px-5 py-12 md:px-10 md:py-16">
      {/* Cabecera */}
      <div className="flex flex-col gap-3 mb-6 md:flex-row md:justify-between md:items-end md:gap-0 md:mb-8">
        <h2 className="font-canon italic text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.01em] text-brand-black">
          Descubre<br />tu nuevo camino.
        </h2>
        <p className="font-america text-[11px] text-brand-black/40 max-w-[180px] leading-[1.7] md:text-right">
          Prendas de temporada en tejidos<br />
          de Japón, Italia y Francia.
        </p>
      </div>

      {/* ── Layout: en móvil, tarjeta grande arriba + 2x2 debajo;
           en desktop, 2x2 izquierda + grande a la derecha ── */}
      <div className="flex flex-col gap-2.5 md:flex-row">
        {/* Tarjeta grande (en móvil aparece primero) */}
        <ProductCard
          product={PRODUCTS[0]}
          containerClass="aspect-[4/5] md:aspect-auto md:flex-1 md:min-h-0"
          wrapperClass="md:flex-1 md:order-2"
          sizes="(min-width: 768px) 50vw, 100vw"
        />

        {/* Grid 2x2 */}
        <div className="grid grid-cols-2 gap-2.5 md:flex-1 md:order-1">
          {[PRODUCTS[1], PRODUCTS[2], PRODUCTS[3], PRODUCTS[4]].map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              containerClass="aspect-[4/5]"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
          ))}
        </div>
      </div>

      {/* CTA final */}
      <div className="flex justify-center mt-8 md:mt-10">
        <CTA label="Descubrir mas" href="/colecciones" />
      </div>
    </section>
  );
}
