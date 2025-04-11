"use client"

import { useState } from "react"
import { RefaccionesForm } from "../registro-refacciones/RefaccionesForm"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TablaRefacciones } from "../TablaRefacciones/TablaRefacciones"
import { ButtonRegresar } from "../ButtonRegresar"
import { BarraBusquedaRefacciones } from "../BarraBusquedaRefacciones/BarraBusquedaRefacciones"

export function ControlRefaccionesClient() {
  const [open, setOpen] = useState(false)
  const [refrescar, setRefrescar] = useState<number>(0)

  const [datosFiltrados, setDatosFiltrados] = useState<any[] | null>(null)
  const [busquedaActiva, setBusquedaActiva] = useState("")

  const manejarRegistroExitoso = () => {
    setOpen(false)
    setRefrescar(Date.now())
    setDatosFiltrados(null)
    setBusquedaActiva("")
  }

  const manejarResultadosFiltro = (resultados: any[], query: string) => {
    setBusquedaActiva(query)
    setDatosFiltrados(resultados)
  }
  

  const limpiarBusqueda = () => {
    setBusquedaActiva("")
    setDatosFiltrados(null)
  }

  return (
    <div className="w-full">
      <div className="my-6 flex justify-center gap-4 flex-wrap">
        <BarraBusquedaRefacciones onResultados={manejarResultadosFiltro} onLimpiar={limpiarBusqueda} />
        <ButtonRegresar />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="bg-blue-900 text-white hover:bg-green-600 px-6 py-2 rounded-full text-sm sm:text-base">
              Nueva Refacción
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-6xl w-full !rounded-xl !border-none shadow-xl bg-[#2b2b2b] text-white">
            <p className="text-2xl font-semibold mb-4 text-center">Registrar Refacción</p>
            <RefaccionesForm onSuccess={manejarRegistroExitoso} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="px-2 sm:px-4 md:px-6">
        <TablaRefacciones
          refrescar={refrescar}
          datosFiltrados={datosFiltrados}
          busquedaActiva={busquedaActiva}
        />
      </div>
    </div>
  )
}
