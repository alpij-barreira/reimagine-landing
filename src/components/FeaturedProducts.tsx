import Image from "next/image";
import Link from "next/link";
import CTA from "./CTA";

const SIZES = ["XS", "S", "M", "L", "XL"];

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Anorak Corto Azul",         price: 185, image: "/images/Ropa2.png", colors: ["#2B3D6B", "#1A1A1A", "#6B5C4E"] },
  { id: 2, name: "Camiseta Manga Larga Miles", price: 95,  image: "/images/Ropa3.png", colors: ["#F0EDE8", "#2B3D6B"] },
  { id: 3, name: "Pantalon Ciclista Aria",     price: 135, image: "/images/Ropa4.png", colors: ["#1A1A1A", "#8A8A8A"] },
  { id: 4, name: "Camiseta Lagos Noir",        price: 85,  image: "/images/Ropa5.png", colors: ["#1A1A1A", "#F0EDE8"] },
  { id: 5, name: "Sudadera Contour White",     price: 165, image: "/images/Ropa6.png", colors: ["#C84832", "#1A1A1A", "#F0EDE8"] },
  { id: 6, name: "Parka Vestido Air",          price: 245, image: "/images/Ropa7.png", colors: ["#F0EDE8", "#8A8A8A"] },
];

const EDITORIAL: {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}[] = [
  {
    id: "femenina",
    label: "TEMPORADA 2026",
    title: "Coleccion\nFemenina",
    subtitle: "Prendas de autor para moverte sin limites.",
    image: "/images/Ropa1.png",
    href: "/mujer",
  },
  {
    id: "masculina",
    label: "NUEVA TEMPORADA",
    title: "Coleccion\nMasculina",
    subtitle: "Tejidos de origen. Corte de precision.",
    image: "/images/Ropa8.png",
    href: "/hombre",
  },
];

/* ── Hover panel con tallas ── */
function HoverPanel() {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm px-3 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
      <div className="flex items-center gap-1.5 mb-2.5">
        {SIZES.map((s) => (
          <span
            key={s}
            className="font-america text-[9px] tracking-wider uppercase px-2 py-0.5 border border-brand-black/25 hover:border-brand-black transition-colors cursor-pointer select-none"
          >
            {s}
          </span>
        ))}
      </div>
      <CTA label="Anadir al carrito" href="/carrito" />
    </div>
  );
}

/* ── Info debajo de la imagen ── */
function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="pt-2 pb-0.5">
      <div className="flex gap-1.5 mb-1.5">
        {product.colors.map((c) => (
          <span
            key={c}
            className="w-2.5 h-2.5 rounded-full border border-black/10 flex-shrink-0"
            style={{ background: c }}
          />
        ))}
      </div>
      <div className="flex justify-between items-baseline gap-2">
        <span className="font-america text-[11px] text-brand-black leading-tight">{product.name}</span>
        <span className="font-america text-[11px] text-brand-black whitespace-nowrap">€{product.price}</span>
      </div>
    </div>
  );
}

/* ── Componente principal ── */
export default function FeaturedProducts() {
  return (
    <section className="px-10 py-16">
      {/* Cabecera */}
      <div className="flex justify-between items-start mb-8">
        <h2 className="font-canon italic text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.01em] text-brand-black">
          Descubre<br />tu nuevo camino.
        </h2>
        <p className="font-america text-[11px] text-brand-black/40 max-w-[180px] leading-[1.7] text-right">
          Prendas de la temporada actual.<br />
          Tejidos de Japon, Italia y Francia,<br />
          seleccionados a mano.
        </p>
      </div>

      {/* ── Franja superior: 2 imágenes editoriales ── */}
      <div className="grid grid-cols-2 gap-2.5">
        {EDITORIAL.map((hero) => (
          <div key={hero.id} className="group relative h-[520px] overflow-hidden">
            <Image
              src={hero.image}
              alt={hero.title}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="font-america text-[8.5px] tracking-[0.24em] uppercase text-white/45 mb-3">
                {hero.label}
              </p>
              <h3 className="font-canon italic text-white text-[2rem] leading-[1.1] tracking-[-0.01em] mb-2 whitespace-pre-line">
                {hero.title}
              </h3>
              <p className="font-america text-[11px] text-white/60 mb-6 leading-[1.65]">
                {hero.subtitle}
              </p>
              {/* CTA blanco — mismo patron que CTA.tsx pero sobre fondo oscuro */}
              <Link
                href={hero.href}
                className="group/cta relative inline-flex items-center gap-2 font-america text-[11px] tracking-widest uppercase text-white"
              >
                <span>Ver ahora</span>
                <span aria-hidden className="transition-transform duration-200 group-hover/cta:translate-x-0.5">→</span>
                <span aria-hidden className="absolute inset-x-0 -bottom-0.5 h-px stitch origin-left scale-x-0 transition-transform duration-300 group-hover/cta:scale-x-100" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ── Franja inferior: [wide] [card] [card] [wide] ──
           Las 4 imágenes van en row-start-1 y los textos en row-start-2.
           Las tarjetas anchas definen la altura de la fila mediante aspect-[8/5];
           las centrales no tienen aspect propio y el grid las estira hasta esa altura. */}
      <div className="grid grid-cols-6 gap-x-2.5 gap-y-0 mt-2.5">

        {/* Imagen ancha izquierda */}
        <div className="col-span-2 row-start-1 group relative aspect-[8/5] overflow-hidden">
          <Image src={PRODUCTS[0].image} alt={PRODUCTS[0].name} fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="33vw" />
          <HoverPanel />
        </div>

        {/* Imagen central izquierda — sin aspect, se estira a la altura de la fila */}
        <div className="col-span-1 row-start-1 group relative overflow-hidden">
          <Image src={PRODUCTS[2].image} alt={PRODUCTS[2].name} fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="17vw" />
          <HoverPanel />
        </div>

        {/* Imagen central derecha */}
        <div className="col-span-1 row-start-1 group relative overflow-hidden">
          <Image src={PRODUCTS[3].image} alt={PRODUCTS[3].name} fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="17vw" />
          <HoverPanel />
        </div>

        {/* Imagen ancha derecha */}
        <div className="col-span-2 row-start-1 group relative aspect-[8/5] overflow-hidden">
          <Image src={PRODUCTS[5].image} alt={PRODUCTS[5].name} fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="33vw" />
          <HoverPanel />
        </div>

        {/* Textos — fila 2 */}
        <div className="col-span-2 row-start-2 pt-1 pb-0.5"><ProductInfo product={PRODUCTS[0]} /></div>
        <div className="col-span-1 row-start-2 pt-1 pb-0.5"><ProductInfo product={PRODUCTS[2]} /></div>
        <div className="col-span-1 row-start-2 pt-1 pb-0.5"><ProductInfo product={PRODUCTS[3]} /></div>
        <div className="col-span-2 row-start-2 pt-1 pb-0.5"><ProductInfo product={PRODUCTS[5]} /></div>

      </div>

      {/* CTA final */}
      <div className="flex justify-center mt-10">
        <CTA label="Descubrir mas" href="/colecciones" />
      </div>
    </section>
  );
}
