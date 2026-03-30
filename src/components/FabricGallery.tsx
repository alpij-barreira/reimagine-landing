import Image from "next/image";

/*
  BACKUPS:
  - Opción A (carrusel con flechas):         FabricGallery.backup.tsx
  - Opción C (botones expandibles + imagen): FabricGallery.optionC.tsx

  Opción B (actual): cuadrícula ajedrez — grilla de 4 columnas, gap-2.5.
  Cada fila ocupa 2 col (imagen) + 2 col (texto), alternando posición.
  La imagen tiene aspect-square para ocupar 2 col × 2 filas visualmente.
*/

const FABRICS = [
  {
    id: "japon",
    label: "Japón",
    description:
      "Nuestras telas azules se elaboran siguiendo el proceso tradicional conocido como Aizome, una técnica de teñido milenaria que impregna cada fibra de historia y precisión artesanal.",
    image: "/images/Tela17.png",
  },
  {
    id: "francia",
    label: "Francia",
    description:
      "Cultivar lino es un arte dominado por los agricultores franceses desde hace siglos. Francia ocupa un lugar privilegiado en la industria textil mundial gracias a la calidad incomparable de su fibra.",
    image: "/images/Tela10.png",
  },
  {
    id: "italia",
    label: "Italia",
    description:
      "Para nuestras prendas de invierno, contamos con la colaboración de la legendaria sastrería Lanieri y sus décadas de experiencia en la selección y tratamiento de lanas nobles.",
    image: "/images/Tela15.png",
  },
];

export default function FabricGallery() {
  return (
    <section className="px-10 py-16 bg-brand-white">
      {/* ── Cabecera ── */}
      <div className="flex justify-between items-end mb-10">
        <h2 className="font-canon italic text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.01em] text-brand-black">
          Tejidos que<br />merecen su origen.
        </h2>
        <p className="font-america text-[11px] text-brand-black/40 max-w-[210px] leading-[1.7] text-right">
          Cada fibra cuenta una historia.<br />
          Japón, Italia y Francia.
        </p>
      </div>

      {/* ── Cuadrícula ajedrez ── */}
      <div className="flex flex-col gap-2.5">
        {FABRICS.map((fabric, i) => {
          const textLeft = i % 2 === 0;
          return (
            <div key={fabric.id} className="grid grid-cols-4 gap-2.5">
              {textLeft ? (
                <>
                  {/* Texto — 2 columnas izquierda */}
                  <div className="col-span-2 flex flex-col justify-center pr-16">
                    <h3 className="font-canon italic text-[clamp(1.75rem,3vw,3rem)] leading-[1.05] tracking-[-0.01em] text-brand-black mb-5">
                      {fabric.label}
                    </h3>
                    <p className="font-america text-[13px] text-brand-black/60 leading-[1.75] max-w-[340px]">
                      {fabric.description}
                    </p>
                  </div>
                  {/* Imagen — 2 columnas derecha, cuadrada */}
                  <div className="col-span-2 relative aspect-square overflow-hidden">
                    <Image
                      src={fabric.image}
                      alt={fabric.label}
                      fill
                      className="object-cover object-center"
                      sizes="50vw"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Imagen — 2 columnas izquierda, cuadrada */}
                  <div className="col-span-2 relative aspect-square overflow-hidden">
                    <Image
                      src={fabric.image}
                      alt={fabric.label}
                      fill
                      className="object-cover object-center"
                      sizes="50vw"
                    />
                  </div>
                  {/* Texto — 2 columnas derecha, alineado a la derecha */}
                  <div className="col-span-2 flex flex-col justify-center items-end text-right pl-16">
                    <h3 className="font-canon italic text-[clamp(1.75rem,3vw,3rem)] leading-[1.05] tracking-[-0.01em] text-brand-black mb-5">
                      {fabric.label}
                    </h3>
                    <p className="font-america text-[13px] text-brand-black/60 leading-[1.75] max-w-[340px]">
                      {fabric.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
