import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Imagen de fondo */}
      <Image
        src="/images/Ropa11.png"
        alt="Reimagine — running de autor"
        fill
        priority
        className="object-cover object-top"
        sizes="100vw"
      />

      {/* Overlay oscuro sutil */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Contenido centrado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        {/* Logo — entra primero */}
        <h1
          className="font-canon italic text-white leading-none tracking-[-0.02em] select-none"
          style={{
            fontSize: "clamp(5rem, 14vw, 13rem)",
            animation: "fade-up 1.36s cubic-bezier(0.16, 1, 0.3, 1) 0.43s both",
          }}
        >
          Reimagine
        </h1>

        {/* Tagline — entra despues */}
        <p
          className="font-america text-white uppercase tracking-[0.22em] text-[11px] select-none"
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
