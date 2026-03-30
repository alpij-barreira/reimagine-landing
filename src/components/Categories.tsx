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
  { id: "mujer",       title: "Mujer",       image: "/images/Ropa1.png",   href: "/mujer" },
  { id: "hombre",      title: "Hombre",      image: "/images/Ropa8.png",   href: "/hombre" },
  { id: "colecciones", title: "Colecciones", image: "/images/Ropa9.png",   href: "/colecciones" },
  { id: "esenciales",  title: "Esenciales",  image: "/images/Ropa10.png",  href: "/esenciales" },
];

const ROW2 = [
  { id: "accesorios",  title: "Accesorios",  image: "/images/Ropa7.png",   href: "/accesorios" },
  { id: "novedades",   title: "Novedades",   image: "/images/Ropa2.png",   href: "/novedades" },
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
    <section className="px-10 py-16">
      {/* Título + copy */}
      <div className="flex justify-between items-end mb-10">
        <h2 className="font-canon italic text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.01em] text-brand-black">
          Sumérgete<br />en nuestro universo.
        </h2>
        <p className="font-america text-[11px] text-brand-black/40 max-w-[210px] leading-[1.7] text-right">
          Cinco universos, una sola firma.<br />
          Mujer, hombre, esenciales y accesorios.
        </p>
      </div>

      {/* Fila 1: 4 columnas */}
      <div className="grid grid-cols-4 gap-2.5">
        {ROW1.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} aspectClass="aspect-[3/4]" sizes="25vw" />
        ))}
      </div>

      {/* Fila 2: 2 columnas */}
      <div className="grid grid-cols-2 gap-2.5 mt-2.5">
        {ROW2.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} aspectClass="aspect-[3/2]" sizes="50vw" />
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10">
        <CTA label="Ver todas" href="/colecciones" />
      </div>
    </section>
  );
}
