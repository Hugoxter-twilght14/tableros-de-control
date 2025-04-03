"use client"

import { useState } from "react"
import { RefaccionesForm } from "../registro-refacciones/RefaccionesForm"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function BotonNuevaRefaccion() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-900 text-white hover:bg-green-600 px-6 py-2 rounded-full text-sm sm:text-base">
          Nueva Refacción
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl w-full !rounded-xl !border-none shadow-xl bg-[#2b2b2b] text-white">
        <p className="text-2xl font-semibold mb-4 text-center">Registrar Refacción</p>
        <RefaccionesForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
