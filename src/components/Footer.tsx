import Link from "next/link";

const NAV_COLUMNS = [
  {
    label: "Comprar",
    links: [
      { title: "Mujer", href: "/mujer" },
      { title: "Hombre", href: "/hombre" },
      { title: "Colecciones", href: "/colecciones" },
      { title: "Esenciales", href: "/esenciales" },
      { title: "Accesorios", href: "/accesorios" },
    ],
  },
  {
    label: "Nosotros",
    links: [
      { title: "La marca", href: "/nosotros" },
      { title: "Materiales", href: "/materiales" },
      { title: "Proceso", href: "/proceso" },
      { title: "Sostenibilidad", href: "/sostenibilidad" },
    ],
  },
  {
    label: "Ayuda",
    links: [
      { title: "Guia de tallas", href: "/tallas" },
      { title: "Envios", href: "/envios" },
      { title: "Devoluciones", href: "/devoluciones" },
      { title: "Contacto", href: "/contacto" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      {/* Cuerpo principal */}
      <div className="px-10 pt-16 pb-12 grid grid-cols-12 gap-x-6 gap-y-10">
        {/* Columna marca */}
        <div className="col-span-5">
          <Link
            href="/"
            className="font-canon italic text-[1.65rem] leading-none tracking-[-0.01em] text-white block mb-4"
          >
            Reimagine
          </Link>
          <p className="font-america text-[11px] leading-[1.75] text-white/30 max-w-[220px]">
            Ropa tecnica para una mente activa. Tejidos<br />
            con origen, diseno con firma.
          </p>
        </div>

        {/* Columnas de navegación */}
        {NAV_COLUMNS.map((col) => (
          <div key={col.label} className="col-span-2 col-start-auto">
            <p className="font-america text-[8.5px] tracking-[0.24em] uppercase text-white/30 mb-5">
              {col.label}
            </p>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="group relative font-america text-[13px] text-white/50 hover:text-white/80 transition-colors duration-200 leading-none"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Separador */}
      <div className="mx-10 h-px bg-white/8" />

      {/* Barra legal */}
      <div className="px-10 py-5 flex items-center justify-between">
        <p className="font-america text-[10px] text-white/20 tracking-[0.04em]">
          &copy; 2026 Reimagine — Literary Sport. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-6">
          {["Privacidad", "Terminos", "Cookies"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="font-america text-[10px] text-white/20 hover:text-white/45 transition-colors duration-200 tracking-[0.04em]"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
