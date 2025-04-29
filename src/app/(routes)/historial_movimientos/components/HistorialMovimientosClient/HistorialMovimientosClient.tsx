"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TablaRefacciones } from "../TablaRefacciones/TablaRefacciones"
import { ButtonRegresar } from "../ButtonRegresar"
import { BarraBusquedaRefacciones } from "../BarraBusquedaRefacciones/BarraBusquedaRefacciones"
import { BarraBusquedaNoParte } from "../BarraBusquedaNoParte/BarraBusquedaNoParte"

export function HistorialMovimientosClient() {
  const [refrescar] = useState<number>(0)

  const [filtroCodigo, setFiltroCodigo] = useState<any[] | null>(null)
  const [codigoActivo, setCodigoActivo] = useState("")

  const [filtroNoParte, setFiltroNoParte] = useState<any[] | null>(null)
  const [noParteActivo, setNoParteActivo] = useState("")

  

  const limpiarFiltros = () => {
    setFiltroCodigo(null)
    setCodigoActivo("")
    setFiltroNoParte(null)
    setNoParteActivo("")
  }

  return (
    <div className="w-full">
     <div className="flex flex-col items-center gap-4">
  <div className="flex flex-wrap justify-center gap-4">
    <div className="flex flex-col items-start">
      <label className="text-white mb-1">Filtrar por Código</label>
      <BarraBusquedaRefacciones
        onResultados={(res, query) => {
          setFiltroCodigo(res)
          setCodigoActivo(query)
          setFiltroNoParte(null)
          setNoParteActivo("")
        }}
        onLimpiar={() => {
          setFiltroCodigo(null)
          setCodigoActivo("")
        }}
      />
    </div>

    <div className="flex flex-col items-start">
      <label className="text-white mb-1">Filtrar por No. Parte</label>
      <BarraBusquedaNoParte
        onResultados={(res, query) => {
          setFiltroNoParte(res)
          setNoParteActivo(query)
          setFiltroCodigo(null)
          setCodigoActivo("")
        }}
        onLimpiar={() => {
          setFiltroNoParte(null)
          setNoParteActivo("")
        }}
      />
    </div>
  </div>
</div>


      {/*Componente de TablaRefacciones */}
      <div className="px-2 sm:px-4 md:px-6">
        <TablaRefacciones
          refrescar={refrescar}
          datosFiltradosCodigo={filtroCodigo}
          datosFiltradosNoParte={filtroNoParte}
          busquedaCodigo={codigoActivo}
          busquedaNoParte={noParteActivo}
        />
      </div>
    </div>
  )
}
