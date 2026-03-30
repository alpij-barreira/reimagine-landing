"use client";

import Image from "next/image";
import { useState } from "react";
import CTA from "./CTA";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Anorak Corto Azul",         price: 185, images: ["/images/ropaHor1.png", "/images/Ropa8.png"] },
  { id: 2, name: "Camiseta Manga Larga Miles", price: 95,  images: ["/images/Ropa3.png",    "/images/Ropa1.png"] },
  { id: 3, name: "Pantalon Ciclista Aria",     price: 135, images: ["/images/Ropa4.png",    "/images/Ropa9.png"] },
  { id: 4, name: "Camiseta Lagos Noir",        price: 85,  images: ["/images/Ropa5.png",    "/images/Ropa10.png"] },
  { id: 5, name: "Sudadera Contour White",     price: 165, images: ["/images/Ropa6.png",    "/images/Ropa2.png"] },
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
  const total = product.images.length;

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setIdx((i) => (i - 1 + total) % total);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setIdx((i) => (i + 1) % total);
  };

  return (
    <div className={`group flex flex-col ${wrapperClass}`}>
      <div className={`relative overflow-hidden ${containerClass}`}>
        {/* Imágenes apiladas: crossfade con opacity */}
        {product.images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? product.name : ""}
            fill
            className={`object-cover object-top transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0"}`}
            sizes={sizes}
            priority={i === 0}
          />
        ))}

        {/* Flechas laterales — solo visibles en hover */}
        <button
          onClick={prev}
          aria-label="Imagen anterior"
          className="absolute left-2 inset-y-0 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-10"
        >
          <span
            className="text-[26px] leading-none select-none text-white mix-blend-difference"
          >
            ‹
          </span>
        </button>

        <button
          onClick={next}
          aria-label="Imagen siguiente"
          className="absolute right-2 inset-y-0 flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-10"
        >
          <span
            className="text-[26px] leading-none select-none text-white mix-blend-difference"
          >
            ›
          </span>
        </button>
      </div>

      <ProductInfo product={product} />
    </div>
  );
}

/* ── Componente principal ── */
export default function FeaturedProducts() {
  return (
    <section className="px-10 py-16">
      {/* Cabecera */}
      <div className="flex justify-between items-end mb-8">
        <h2 className="font-canon italic text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.01em] text-brand-black">
          Descubre<br />tu nuevo camino.
        </h2>
        <p className="font-america text-[11px] text-brand-black/40 max-w-[180px] leading-[1.7] text-right">
          Prendas de temporada en tejidos<br />
          de Japón, Italia y Francia.
        </p>
      </div>

      {/* ── Layout 4 columnas: 2×2 izquierda + grande derecha ── */}
      <div className="flex gap-2.5">
        {/* Izquierda: grid 2×2 */}
        <div className="flex-1 grid grid-cols-2 gap-2.5">
          {[PRODUCTS[1], PRODUCTS[2], PRODUCTS[3], PRODUCTS[4]].map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              containerClass="aspect-[4/5]"
              sizes="25vw"
            />
          ))}
        </div>

        {/* Derecha: tarjeta grande */}
        <ProductCard
          product={PRODUCTS[0]}
          containerClass="flex-1 min-h-0"
          wrapperClass="flex-1"
          sizes="50vw"
        />
      </div>

      {/* CTA final */}
      <div className="flex justify-center mt-10">
        <CTA label="Descubrir mas" href="/colecciones" />
      </div>
    </section>
  );
}
