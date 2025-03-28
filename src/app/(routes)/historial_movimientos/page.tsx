"use client";
import { Navbar } from "./components/Navbar";

export default function page() {
  return (
    <div className="relative bg-[#2b2b2b] min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Título con margen adaptativo */}
      <div className="mt-16 md:mt-24 lg:mt-32 mb-8 px-4">
        <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold text-center">
          VISTA DE HISTORIAL DE MOVIMIENTOS
        </h1>
      </div>
    </div>
  );
}
