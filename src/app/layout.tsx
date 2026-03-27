import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reimagine — Running de autor",
  description: "Prendas de running para quienes entienden el deporte como un ritual. Tejidos de Japon, Italia y Francia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
