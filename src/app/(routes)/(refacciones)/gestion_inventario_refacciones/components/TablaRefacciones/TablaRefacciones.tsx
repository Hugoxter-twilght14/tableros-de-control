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

export function TablaRefacciones({ refrescar }: Props) {
  const [refacciones, setRefacciones] = useState([])
  const [refaccionSeleccionada, setRefaccionSeleccionada] = useState<{ codigo: number; descripcion: string } | null>(null)

  const fetchRefacciones = async () => {
    try {
      const { data } = await axios.get("/api/refacciones/get")
      setRefacciones(data)
    } catch (error) {
      toast({
        title: "Error al cargar refacciones",
        description: "No se pudieron obtener los datos.",
        variant: "destructive"
      })
    }
  }

  const eliminarRefaccion = async (codigo: number, descripcion: string) => {
    try {
      await axios.delete(`/api/refacciones/get?codigo=${codigo}`)
      toast({
        title: "Refacción eliminada",
        description: `La refacción "${descripcion}" fue eliminada correctamente.`,
      })
      fetchRefacciones()
    } catch (error) {
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar la refacción.",
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    fetchRefacciones()
  }, [])

  useEffect(() => {
    if (refrescar) fetchRefacciones()
  }, [refrescar])

  return (
    <div className="overflow-x-auto mt-6">
      <div className="max-h-[calc(100vh-300px)] overflow-y-auto rounded-lg shadow">
        <table className="min-w-full text-sm border-collapse bg-white">
          <thead className="bg-[#1e3a5f] text-white sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left">Código</th>
              <th className="p-3 text-left">Descripción</th>
              <th className="p-3 text-left">No. Parte</th>
              <th className="p-3 text-left">Exist. Fís.</th>
              <th className="p-3 text-left">Exist. Sist.</th>
              <th className="p-3 text-left">Diferencias</th>
              <th className="p-3 text-left">Proveedor</th>
              <th className="p-3 text-left">Entrada</th>
              <th className="p-3 text-left">Salida</th>
              <th className="p-3 text-left">Ingreso</th>
              <th className="p-3 text-left">Vencimiento</th>
              <th className="p-3 text-left">Movimiento</th>
              <th className="p-3 text-left">Unidad</th>
              <th className="p-3 text-left">Ubicación</th>
              <th className="p-3 text-left">Reportado por</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {refacciones.map((item: any) => (
              <tr key={item.codigo} className="border-b bg-[#424242] text-white hover:bg-gray-400 hover:text-black transition">
                <td className="p-2">{item.codigo}</td>
                <td className="p-2">{item.descripcion}</td>
                <td className="p-2">{item.noParte}</td>
                <td className="p-2">{item.existenciaFisica}</td>
                <td className="p-2">{item.existenciaSistema}</td>
                <td className="p-2">{item.diferencias}</td>
                <td className="p-2">{item.proveedores}</td>
                <td className="p-2">{item.cantidadEntrada}</td>
                <td className="p-2">{item.cantidadSalida}</td>
                <td className="p-2">{new Date(item.fechaIngreso).toLocaleDateString()}</td>
                <td className="p-2">{new Date(item.fechaVencimiento).toLocaleDateString()}</td>
                <td className="p-2">{item.movimiento}</td>
                <td className="p-2">{item.unidadMedidaId}</td>
                <td className="p-2">
                  Rack {item.ubicacion?.rack}, Fila {item.ubicacion?.fila}, Pos. {item.ubicacion?.posicion}
                </td>
                <td className="p-2">{item.usuarioReportado?.nombre || `ID ${item.reportadoPorId}`}</td>
                <td className="p-2 text-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        onClick={() =>
                          setRefaccionSeleccionada({ codigo: item.codigo, descripcion: item.descripcion })}
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                      >
                        Eliminar
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Estás a punto de eliminar la refacción{" "}
                          <strong>{refaccionSeleccionada?.descripcion}</strong>. Esta acción no se puede
                          revertir.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="hover:bg-white hover:text-black transition-all">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            if (refaccionSeleccionada)
                              eliminarRefaccion(refaccionSeleccionada.codigo, refaccionSeleccionada.descripcion)
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
    </div>
  )
  
}
