"use client";
import { Navbar } from "@/components/shared/Navbar";
import TablaInventarioRefacciones from "./components/TablaInventarioRefacciones/TablaInventarioRefacciones";
import AgregarProductoRefacciones from "./components/AgregarProductoRefacciones/AgregarProductoRefacciones";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function page() {
    
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="relative bg-[#7] min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Título con margen adaptativo */}
      <div className="mt-16 md:mt-24 lg:mt-32 mb-8 px-4">
        <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold text-center">
          VISTA DE GESTION DE REFACCIONES
        </h1>
        <TablaInventarioRefacciones/>
        
        <div className="p-4">
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Dar de alta nuevo producto
      </button>

      <AgregarProductoRefacciones isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
    
      </div>
    </div>
  )
}
