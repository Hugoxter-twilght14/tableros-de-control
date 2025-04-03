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

export function TablaUsuarios({ refrescar }: { refrescar?: boolean }) {
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
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full text-sm border-collapse bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-[#1e3a5f] text-white">
          <tr>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Correo</th>
            <th className="p-3 text-left">Rol</th>
            <th className="p-3 text-left">Teléfono</th>
            <th className="p-3 text-left">Registrado</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user: any) => (
            <tr key={user.id} className="border-b bg-[#424242] hover:bg-gray-400 hover:text-black transition">
              <td className="p-3">{user.nombre}</td>
              <td className="p-3">{user.correo}</td>
              <td className="p-3">{user.rol}</td>
              <td className="p-3">{user.telefono || "-"}</td>
              <td className="p-3">{new Date(user.createdAt).toLocaleString()}</td>
              <td className="p-3 text-center">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}