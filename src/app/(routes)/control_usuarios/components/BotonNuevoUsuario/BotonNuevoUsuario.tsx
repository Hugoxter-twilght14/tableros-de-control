"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { RegisterForm } from "../register/RegisterForm"

export function BotonNuevoUsuario() {
  const [open, setOpen] = useState(false)
  const [refrescar, setRefrescar] = useState(false)

  const manejarRegistroExitoso = () => {
    setOpen(false)
    setRefrescar(true)
    setTimeout(() => setRefrescar(false), 100)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-900 text-white hover:bg-green-600 px-6 py-2 rounded-full">
          Nuevo Usuario
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full">
        <p className="text-2xl font-semibold mb-4 text-center">Crear Cuenta</p>
        <RegisterForm onSuccess={manejarRegistroExitoso} />
      </DialogContent>
    </Dialog>
  )
}
