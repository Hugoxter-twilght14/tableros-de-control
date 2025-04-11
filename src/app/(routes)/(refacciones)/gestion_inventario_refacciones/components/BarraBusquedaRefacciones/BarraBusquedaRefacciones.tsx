"use client"

import { useState, useEffect } from "react"
import axios from "axios"

interface Props {
  onResultados: (data: any[], query: string) => void
  onLimpiar: () => void
}

export function BarraBusquedaRefacciones({ onResultados, onLimpiar }: Props) {
  const [busqueda, setBusqueda] = useState("")

  useEffect(() => {
    const fetchFiltrado = async () => {
      if (busqueda.trim() === "") {
        onLimpiar()
        return
      }

      try {
        const res = await axios.get(`/api/refacciones/buscar?query=${busqueda}`)
        onResultados(res.data, busqueda)
      } catch (error) {
        console.error("Error al filtrar refacciones:", error)
      }
    }

    const timeout = setTimeout(fetchFiltrado, 200)
    return () => clearTimeout(timeout)
  }, [busqueda, onResultados, onLimpiar])

  return (
    <div className="mb-6 flex justify-center w-full">
      <input
        type="number"
        placeholder="Buscar por código de refacción"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full max-w-xl px-4 py-2 border rounded-full bg-white text-black"
      />
    </div>
  )
}
