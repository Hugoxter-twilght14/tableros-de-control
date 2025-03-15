"use client"
import React from 'react'
import { Refacciones } from './components/Refacciones'
import { Quimicos } from './components/Quimicos'
import { Navbar } from "@/components/shared/Navbar";
import { useRouter } from "next/navigation";

export default function Page() {
  
  const router = useRouter();

  return (
    <div className="relative bg-[#2b2b2b] min-h-screen overflow-hidden">
      <Navbar />

      {/* Contenedor para centrar el título y los componentes en pantallas grandes */}
      <div className="mt-10 md:mt-28 lg:mt-42 mb-10 px-4">
        <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold text-center">
          GESTIÓN DE ALMACENES
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 lg:gap-36 w-full px-4">
        <Refacciones />
        <Quimicos />
      </div>
       {/* Botón de regresar */}
       <div className="flex justify-center mt-10">
        <button
          onClick={() => router.back()} // Redirige a la página anterior
          className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-400 transition duration-300"
        >
          Regresar
        </button>
      </div>
    </div>
  );
}

