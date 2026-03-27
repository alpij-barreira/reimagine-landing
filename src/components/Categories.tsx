import Image from "next/image";
import Link from "next/link";
import CTA from "./CTA";

/*
  Mural de categorias: 5 columnas iguales, sin separacion entre celdas.
  El texto se centra vertical y horizontalmente sobre la imagen.
  Los margenes laterales (px-10) se mantienen en la seccion exterior.
*/
const CATEGORIES = [
  /* ── Fila 1 ── */
  { id: "mujer",       label: "COLECCION FEMENINA",  title: "Mujer",       image: "/images/Ropa1.png",  href: "/mujer" },
  { id: "hombre",      label: "COLECCION MASCULINA", title: "Hombre",      image: "/images/Ropa8.png",  href: "/hombre" },
  { id: "colecciones", label: "EDICIONES ESPECIALES",title: "Colecciones", image: "/images/Ropa9.png",  href: "/colecciones" },
  { id: "esenciales",  label: "LO QUE NUNCA FALTA",  title: "Esenciales",  image: "/images/Ropa10.png", href: "/esenciales" },
  { id: "accesorios",  label: "LOS ULTIMOS DETALLES",title: "Accesorios",  image: "/images/Ropa7.png",  href: "/accesorios" },

  /* ── Fila 2 ── */
  { id: "novedades",   label: "RECIEN LLEGADO",       title: "Novedades",   image: "/images/Ropa2.png",  href: "/novedades" },
  { id: "camisetas",   label: "BASICOS DE TEMPORADA", title: "Camisetas",   image: "/images/Ropa3.png",  href: "/camisetas" },
  { id: "pantalones",  label: "CORTE DE AUTOR",        title: "Pantalones",  image: "/images/Ropa4.png",  href: "/pantalones" },
  { id: "sudaderas",   label: "CONFORT SIN RENUNCIA",  title: "Sudaderas",   image: "/images/Ropa5.png",  href: "/sudaderas" },
  { id: "chaquetas",   label: "LA CAPA EXTERIOR",      title: "Chaquetas",   image: "/images/Ropa6.png",  href: "/chaquetas" },
];

export default function Categories() {
  return (
    <section className="px-10 py-16">
      {/* Titulo + copy */}
      <div className="flex justify-between items-end mb-10">
        <h2 className="font-canon italic text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.01em] text-brand-black">
          Sumérgete<br />en nuestro universo.
        </h2>
        <p className="font-america text-[11px] text-brand-black/40 max-w-[210px] leading-[1.7] text-right">
          Cinco universos, una sola firma.<br />
          Mujer, hombre, colecciones,<br />
          esenciales y accesorios.
        </p>
      </div>

      {/* Mural — sin gap, celdas iguales */}
      <div className="grid grid-cols-5">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group relative overflow-hidden block aspect-[2/3]"
          >
            {/* Imagen */}
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="20vw"
            />

            {/* Overlay uniforme para legibilidad */}
            <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/40" />

            {/* Texto centrado */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <p className="font-america text-[7.5px] tracking-[0.28em] uppercase text-white/50">
                {cat.label}
              </p>
              <h3 className="font-canon italic text-white text-[clamp(1.1rem,1.8vw,1.65rem)] leading-none tracking-[-0.01em]">
                {cat.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10">
        <CTA label="Ver todas" href="/colecciones" />
      </div>
    </section>
  );
}
