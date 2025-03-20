"use client";
import { Navbar } from "./(routes)/(home)/components/Navbar";
import { GestionAlmacen } from "./(routes)/(home)/components/GestionAlmacen";
import { HistorialMovimiento } from "./(routes)/(home)/components/HistorialMovimiento";
import { ControlUsuarios } from "./(routes)/(home)/components/ControlUsuarios";

export default function Home() {
  return (
    <div className="relative bg-[#2b2b2b] min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Título con margen adaptativo */}
      <div className="mt-16 md:mt-24 lg:mt-32 mb-8 px-4">
        <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold text-center">
          ADMINISTRADOR
        </h1>
      </div>

      {/* Contenedor principal: en móviles, apilados; en tablets/PC, en fila */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-16 w-full px-4">
        
        {/* Contenedor de cada tarjeta/ícono, 
            usando un ancho dinámico según el dispositivo */}
        <div className="flex items-center justify-center w-full md:w-1/3 lg:w-1/4">
          <GestionAlmacen />
        </div>
        <div className="flex items-center justify-center w-full md:w-1/3 lg:w-1/4">
          <ControlUsuarios />
        </div>
        <div className="flex items-center justify-center w-full md:w-1/3 lg:w-1/4">
          <HistorialMovimiento />
        </div>
      </div>
    </div>
  );
}
