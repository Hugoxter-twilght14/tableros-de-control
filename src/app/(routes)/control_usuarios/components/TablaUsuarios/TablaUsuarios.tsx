// TablaUsuarios.tsx
"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"


interface Props {
  refrescar?: number
}

export function TablaUsuarios({ refrescar }: Props) {
  const [usuarios, setUsuarios] = useState([])
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<{ id: number; nombre: string } | null>(null)

  const fetchUsuarios = async () => {
    const { data } = await axios.get("/api/usuarios/get")
    setUsuarios(data)
  }

  const eliminarUsuario = async (id: number, nombre: string) => {
    try {
      await axios.delete(`/api/usuarios/get?id=${id}`)
      toast({
        title: "Usuario eliminado",
        description: `El usuario \"${nombre}\" fue eliminado correctamente.`,
      })
      fetchUsuarios()
    } catch (error) {
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar el usuario.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  useEffect(() => {
    if (refrescar) fetchUsuarios()
  }, [refrescar])

  return (
    <div className="mt-6 bg-white rounded-lg shadow overflow-hidden max-w-full">
      {/* Encabezado */}
      <div className="grid grid-cols-6 bg-[#1e3a5f] text-white font-semibold text-sm p-3 sticky top-0 z-10">
        <div>Nombre</div>
        <div>Correo</div>
        <div>Rol</div>
        <div>Teléfono</div>
        <div>Registrado</div>
        <div className="text-center">Acciones</div>
      </div>
  
      {/* Cuerpo con scroll */}
      <div className="overflow-y-auto divide-y divide-gray-300" style={{ maxHeight: 'calc(100vh - 300px)' }}>
      {usuarios.map((user: any) => (
          <div
            key={user.id}
            className="grid grid-cols-6 p-3 text-sm bg-[#424242] text-white hover:bg-gray-400 hover:text-black transition"
          >
            <div>{user.nombre}</div>
            <div>{user.correo}</div>
            <div>{user.rol}</div>
            <div>{user.telefono || '-'}</div>
            <div>{new Date(user.createdAt).toLocaleString()}</div>
            <div className="text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    onClick={() => setUsuarioSeleccionado({ id: user.id, nombre: user.nombre })}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                  >
                    Eliminar
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Estás a punto de eliminar al usuario <strong>{usuarioSeleccionado?.nombre}</strong>. Esta acción no se puede revertir.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-white hover:text-black transition-all">Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        if (usuarioSeleccionado)
                          eliminarUsuario(usuarioSeleccionado.id, usuarioSeleccionado.nombre)
                      }}
                      className="bg-red-500 hover:bg-red-700"
                    >
                      Sí, eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  
}