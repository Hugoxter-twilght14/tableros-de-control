// ControlUsuariosClient.tsx
"use client"

import { useState } from "react"
import { RegisterForm } from "../register/RegisterForm"
import { TablaUsuarios } from "../TablaUsuarios"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function ControlUsuariosClient() {
  const [open, setOpen] = useState(false)
  const [refrescar, setRefrescar] = useState(false)

  const manejarRegistroExitoso = () => {
    setOpen(false)
    setRefrescar(true)
    setTimeout(() => setRefrescar(false), 100)
  }

  return (
    <>
      <div className="my-6 flex justify-center rounded-2xl">
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
      </div>

      <TablaUsuarios refrescar={refrescar} />
    </>
  )
}
