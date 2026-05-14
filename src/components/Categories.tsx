import Image from "next/image";
import Link from "next/link";
import CTA from "./CTA";

/*
  Layout: fila de 4 + fila de 2, con gap-2.5 igual al de FeaturedProducts.
  Texto en esquina inferior izquierda. Overlay: degradado de abajo (oscuro) a arriba (transparente).
  Las dos filas tienen la misma altura: aspect-[3/4] en fila-1 y aspect-[3/2] en fila-2
  (al ser el doble de anchas, la misma altura resulta de la mitad del ratio).
*/

const ROW1 = [
  { id: "mujer",       title: "Mujer",       image: "/images/women2.jpg",  href: "/mujer" },
  { id: "hombre",      title: "Hombre",      image: "/images/mencat.jpg",  href: "/hombre" },
  { id: "colecciones", title: "Colecciones", image: "/images/colecc.jpg",  href: "/colecciones" },
  { id: "esenciales",  title: "Esenciales",  image: "/images/esencial.jpg", href: "/esenciales" },
];

const ROW2 = [
  { id: "accesorios",  title: "Accesorios",  image: "/images/accesos.jpg", href: "/accesorios" },
  { id: "novedades",   title: "Novedades",   image: "/images/women.jpg",   href: "/novedades" },
];

function CategoryCard({
  cat,
  aspectClass,
  sizes,
}: {
  cat: { id: string; title: string; image: string; href: string };
  aspectClass: string;
  sizes: string;
}) {
  return (
    <Link
      href={cat.href}
      className={`group relative overflow-hidden block ${aspectClass}`}
    >
      <Image
        src={cat.image}
        alt={cat.title}
        fill
        quality={95}
        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        sizes={sizes}
      />

      {/* Degradado: oscuro abajo, transparente arriba */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent transition-opacity duration-500 group-hover:from-black/75" />

      {/* Texto esquina inferior izquierda */}
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="font-canon italic text-white text-[clamp(1rem,1.6vw,1.5rem)] leading-none tracking-[-0.01em]">
          {cat.title}
        </h3>
      </div>
    </Link>
  );
}

export default function Categories() {
  return (
    <section className="px-5 py-12 md:px-10 md:py-16">
      {/* Título + copy */}
      <div className="flex flex-col gap-3 mb-8 md:flex-row md:justify-between md:items-end md:gap-0 md:mb-10">
        <h2 className="font-canon italic text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.01em] text-brand-black">
          Sumérgete<br />en nuestro universo.
        </h2>
        <p className="font-america text-[11px] text-brand-black/40 max-w-[210px] leading-[1.7] md:text-right">
          Cinco universos, una sola firma.<br />
          Mujer, hombre, esenciales y accesorios.
        </p>
      </div>

      {/* Fila 1: 2 columnas en móvil, 4 en desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {ROW1.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} aspectClass="aspect-[3/4]" sizes="(min-width: 768px) 25vw, 50vw" />
        ))}
      </div>

      {/* Fila 2: 1 columna en móvil, 2 en desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2.5">
        {ROW2.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} aspectClass="aspect-[3/2]" sizes="(min-width: 768px) 50vw, 100vw" />
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-8 md:mt-10">
        <CTA label="Ver todas" href="/colecciones" />
      </div>
    </section>
  );
}
