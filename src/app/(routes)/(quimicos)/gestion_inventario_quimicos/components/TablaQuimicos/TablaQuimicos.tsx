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
import { Trash2 } from "lucide-react"
import { Quimicos } from "./TablaQuimicos.types"
import { ModalEditarQuimicos } from "../ModalEditarQuimicos"

interface Props {
  refrescar?: number
  datosFiltradosCodigo?: Quimicos[] | null
  datosFiltradosNoLote?: Quimicos[] | null
  busquedaCodigo: string
  busquedaNoLote: string
}

export function TablaQuimicos({
  refrescar = 0,
  datosFiltradosCodigo = null,
  datosFiltradosNoLote = null,
  busquedaCodigo,
  busquedaNoLote,
}: Props) {
  const [Quimicos, setQuimicos] = useState<Quimicos[]>([])
  const [QuimicoSeleccionada, setQuimicoSeleccionada] = useState<Pick<Quimicos, "codigo" | "descripcion"> | null>(null)
  const [ubicaciones, setUbicaciones] = useState([])

  const fetchQuimicos = async () => {
    try {
      const { data } = await axios.get("/api/refacciones/get")
      setQuimicos(data)
    } catch (error) {
      toast({
        title: "Error al cargar refacciones",
        description: "No se pudieron obtener los datos.",
        variant: "destructive",
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
      fetchQuimicos()
    } catch (error) {
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar la refacción.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchQuimicos()
    axios.get("/api/ubicaciones/get")
      .then(res => setUbicaciones(res.data))
      .catch(err => console.error("Error al cargar ubicaciones:", err))
  }, [])

  useEffect(() => {
    if (refrescar !== 0) {
      fetchQuimicos()
    }
  }, [refrescar])

  let datosAMostrar = Quimicos

  if (busquedaCodigo.trim() !== "" && datosFiltradosCodigo) {
    datosAMostrar = datosFiltradosCodigo
  } else if (busquedaNoLote.trim() !== "" && datosFiltradosNoLote) {
    datosAMostrar = datosFiltradosNoLote
  }

  const noHayResultados =
    (busquedaCodigo.trim() !== "" && datosFiltradosCodigo?.length === 0) ||
    (busquedaNoLote.trim() !== "" && datosFiltradosNoLote?.length === 0)

  return (
    <div className="overflow-x-auto mt-6">
      <div className="max-h-[calc(100vh-300px)] overflow-y-auto rounded-lg shadow">
        <table className="min-w-full text-sm border-collapse bg-white">
          <thead className="bg-[#1e3a5f] text-white sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left">Código</th>
              <th className="p-3 text-left">Descripción</th>
              <th className="p-3 text-left">No. Lote</th>
              <th className="p-3 text-left">Exist. Fís.</th>
              <th className="p-3 text-left">Exist. Sist.</th>
              <th className="p-3 text-left">Diferencias</th>
              <th className="p-3 text-left">Unidad</th>
              <th className="p-3 text-left">Entrada</th>
              <th className="p-3 text-left">Salida</th>
              <th className="p-3 text-left">Proveedor</th>
              <th className="p-3 text-left">Ubicación</th>
              <th className="p-3 text-left">Reportado por</th>
              <th className="p-3 text-left">Ingreso</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {noHayResultados && (
              <tr>
                <td colSpan={16} className="text-center py-4 text-red-500 bg-[#424242] font-semibold">
                  No existe ningún quimico con el{" "}
                  {busquedaCodigo
                    ? `código: ${busquedaCodigo}`
                    : `número de lote: ${busquedaNoLote}`}
                </td>
              </tr>
            )}

            {datosAMostrar.map((item) => (
              <tr
                key={item.codigo}
                className="border-b bg-[#424242] text-white hover:bg-gray-400 hover:text-black transition"
              >
                <td className="p-2">{item.codigo}</td>
                <td className="p-2">{item.descripcion}</td>
                <td className="p-2">{item.noLote}</td>
                <td className="p-2">{item.existenciaFisica}</td>
                <td className="p-2">{item.existenciaSistema}</td>
                <td className="p-2">{item.diferencias}</td>
                <td className="p-2">{item.unidadMedidaId}</td>
                <td className="p-2">{item.cantidadEntrada}</td>
                <td className="p-2">{item.cantidadSalida}</td>
                <td className="p-2">{item.proveedores}</td>
                <td className="p-2">
                  Rack {item.ubicacion?.rack}, Fila {item.ubicacion?.fila}, Pos. {item.ubicacion?.posicion}
                </td>
                <td className="p-2">{item.usuarioReportado?.nombre || `ID ${item.reportadoPorId}`}</td>
                <td className="p-2">{new Date(item.fechaIngreso).toLocaleDateString()}</td>
                <td className="p-2 text-center flex justify-center gap-2">
                  {/* Botón eliminar */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        onClick={() =>
                          setQuimicoSeleccionada({ codigo: item.codigo, descripcion: item.descripcion })
                        }
                        className="bg-gradient-to-b from-[#c62828] to-[#9d4245] text-white px-3 py-1 rounded-[5px] hover:bg-red-700 transition"
                      >
                        <Trash2 />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Estás a punto de eliminar este quimico <strong>{QuimicoSeleccionada?.descripcion}</strong>. Esta acción no se puede revertir.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="hover:bg-white hover:text-black transition-all">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            if (QuimicoSeleccionada)
                              eliminarRefaccion(QuimicoSeleccionada.codigo, QuimicoSeleccionada.descripcion)
                          }}
                          className="bg-red-500 hover:bg-red-700"
                        >
                          Sí, eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* Botón editar con modal separado */}
                  <ModalEditarQuimicos
                    codigo={item.codigo}
                    ubicaciones={ubicaciones}
                    onSuccess={() => fetchQuimicos()}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
