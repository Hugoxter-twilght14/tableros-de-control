"use client"

import { useState, useEffect } from "react"
import axios from "axios"

interface Props {
  onResultados: (data: any[]) => void
}

export function BarraBusquedaRefacciones({ onResultados }: Props) {
  const [busqueda, setBusqueda] = useState("")

  useEffect(() => {
    const fetchFiltrado = async () => {
      try {
        const res = await axios.get(`/api/refacciones/buscar?query=${busqueda}`)
        onResultados(res.data)
      } catch (error) {
        console.error("Error al filtrar refacciones:", error)
      }
    }

    if (busqueda.trim() !== "") {
      fetchFiltrado()
    } else {
      onResultados([]) // Si se borra el input, se limpia la tabla filtrada
    }
  }, [busqueda, onResultados])

  return (
    <div className="mb-6 flex justify-center w-full">
      <input
        type="text"
        placeholder="Buscar por código, descripción o número de parte"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full max-w-xl px-4 py-2 border rounded-full bg-white text-black"
      />
    </div>
  )
}
