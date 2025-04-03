"use client"

import { useState } from "react"
import { RefaccionesForm } from "../registro-refacciones/RefaccionesForm"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TablaRefacciones } from "../TablaRefacciones/TablaRefacciones"
import { ButtonRegresar } from "../ButtonRegresar"

export function ControlRefaccionesClient() {
  const [open, setOpen] = useState(false)
  const [refrescar, setRefrescar] = useState<number>(0)

  const manejarRegistroExitoso = () => {
    setOpen(false)
    setRefrescar(Date.now()) // fuerza nuevo valor único cada vez
  }

  return (
    <div className="w-full">
      <div className="my-6 flex justify-center gap-4 flex-wrap">
        <ButtonRegresar/>

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
        <TablaRefacciones refrescar={refrescar} />
      </div>
    </div>
  )
}
