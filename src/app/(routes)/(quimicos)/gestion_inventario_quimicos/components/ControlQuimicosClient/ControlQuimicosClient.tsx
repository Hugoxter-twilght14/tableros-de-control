"use client"

import { useState } from "react"
import { QuimicosForm } from "../registro-quimicos/QuimicosForm"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TablaQuimicos } from "../TablaQuimicos/TablaQuimicos"
import { ButtonRegresar } from "../ButtonRegresar"
import { BarraBusquedaQuimicos } from "../BarraBusquedaQuimicos/BarraBusquedaQuimicos"
import { BarraBusquedaNoLote } from "../BarraBusquedaNoLote/BarraBusquedaNoLote"
import MovimientoStock from "../MovimientoStock/MovimientoStock"


export default function ControlQuimicosClient() {
  const [open, setOpen] = useState(false)
  const [refrescar, setRefrescar] = useState<number>(0)

  const [filtroCodigo, setFiltroCodigo] = useState<any[] | null>(null)
  const [codigoActivo, setCodigoActivo] = useState("")

  const [filtroNoLote, setFiltroNoLote] = useState<any[] | null>(null)
  const [noLoteActivo, setNoLoteActivo] = useState("")

  const manejarRegistroExitoso = () => {
    setOpen(false)
    setRefrescar(Date.now())
    limpiarFiltros()
  }

  const limpiarFiltros = () => {
    setFiltroCodigo(null)
    setCodigoActivo("")
    setFiltroNoLote(null)
    setNoLoteActivo("")
  }


  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-4">
          {/* filtros */}
          <div className="flex flex-col items-start">
            <label className="text-white mb-1">Buscar por código:</label>
            <BarraBusquedaQuimicos
              onResultados={(res, query) => {
                setFiltroCodigo(res)
                setCodigoActivo(query)
                setFiltroNoLote(null)
                setNoLoteActivo("")
              }}
              onLimpiar={() => {
                setFiltroCodigo(null)
                setCodigoActivo("")
              }}
            />
          </div>

          <div className="flex flex-col items-start">
            <label className="text-white mb-1">Buscar por No. Lote:</label>
            <BarraBusquedaNoLote
              onResultados={(res, query) => {
                setFiltroNoLote(res)
                setNoLoteActivo(query)
                setFiltroCodigo(null)
                setCodigoActivo("")
              }}
              onLimpiar={() => {
                setFiltroNoLote(null)
                setNoLoteActivo("")
              }}
            />
          </div>
        </div>

        <div className="mt-2 flex justify-center gap-4">
          <ButtonRegresar />

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button  className="text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold bg-[#426689] transition-all duration-200 hover:bg-gradient-to-b hover:from-green-700 hover:to-green-500">
                Nuevo Quimico
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl w-full !rounded-xl !border-none shadow-xl bg-[#2b2b2b] text-white">
              <p className="text-2xl font-semibold mb-4 text-center">Registrar Quimico</p>
              <QuimicosForm
                onSuccess={manejarRegistroExitoso}
              />
            </DialogContent>
          </Dialog>

          <div className="text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold bg-[#426689] transition-all duration-200 hover:bg-gradient-to-b hover:from-green-700 hover:to-green-500">
            <MovimientoStock onSuccess={manejarRegistroExitoso} />
          </div>
        </div>
      </div>

      <div className="px-2 sm:px-4 md:px-6">
        <TablaQuimicos
          refrescar={refrescar}
          datosFiltradosCodigo={filtroCodigo}
          datosFiltradosNoLote={filtroNoLote}
          busquedaCodigo={codigoActivo}
          busquedaNoLote={noLoteActivo}
        />
      </div>
    </div>
  )
}
