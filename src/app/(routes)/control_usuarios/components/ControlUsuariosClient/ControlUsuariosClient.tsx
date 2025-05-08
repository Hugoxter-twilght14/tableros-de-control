"use client"

import { useState } from "react"
import { RegisterForm } from "../register/RegisterForm"
import { TablaUsuarios } from "../TablaUsuarios"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ButtonRegresar } from "../ButtonRegresar"

export function ControlUsuariosClient() {
  const [open, setOpen] = useState(false)
  const [refrescar, setRefrescar] = useState<number>(0)

  const manejarRegistroExitoso = () => {
    setOpen(false)
    setRefrescar(Date.now()) // <-- número diferente cada vez
  }

  return (
      <div className="w-full">
        <div className="my-6 flex justify-center gap-4 flex-wrap">
          <ButtonRegresar/>
  
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold bg-[#426689] transition-all duration-200 hover:bg-gradient-to-b hover:from-green-700 hover:to-green-500">
                Nuevo Usuario
              </button>
            </DialogTrigger>
  
            <DialogContent className="max-w-6xl w-full !rounded-xl !border-none shadow-xl bg-[#2b2b2b] text-white">
              <p className="text-2xl font-semibold mb-4 text-center">Registrar Usuario</p>
              <RegisterForm onSuccess={manejarRegistroExitoso} />
            </DialogContent>
          </Dialog>
        </div>
  
        <div className="px-2 sm:px-4 md:px-6">
          <TablaUsuarios refrescar={refrescar} />
        </div>
      </div>
    )
}
