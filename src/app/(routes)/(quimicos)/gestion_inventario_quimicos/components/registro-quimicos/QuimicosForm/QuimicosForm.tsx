"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { quimicosSchema } from "./QuimicosForm.form"
import { z } from "zod"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

type FormValues = z.infer<typeof quimicosSchema>

interface Props {
  onSuccess?: () => void
}

export function QuimicosForm({ onSuccess }: Props) {
  const { data: session } = useSession()

  const form = useForm<FormValues>({
    resolver: zodResolver(quimicosSchema),
    defaultValues: {
      codigo: 0,
      descripcion: "",
      noLote: "",
      proveedores: "",
      fechaIngreso: "",
      unidadMedidaId: "PZ",
      ubicacionId: 0,
      cantidad: 1,
      existenciaSistema: 0,
      reportadoPorId: 0, // Este campo debe seguir siendo solo el ID numérico
    }
  })

  const [ubicaciones, setUbicaciones] = useState([])

  useEffect(() => {
    const fetchUbicaciones = async () => {
      try {
        const res = await axios.get("/api/ubicaciones/get")
        setUbicaciones(res.data)
        console.log("Ubicaciones cargadas:", res.data)
      } catch (error) {
        console.error("Error al cargar ubicaciones:", error)
      }
    }

    fetchUbicaciones()
  }, [])

  useEffect(() => {
    const userId = Number(session?.user?.id)
    const userName = session?.user?.name || "Usuario no disponible"
    const userIdWithName = `${userId} - ${userName}` //aqui se concatena el id con el nombre

    console.log("👤 ID del usuario logueado:", userId)

    if (!isNaN(userId) && userId > 0) {
      form.setValue("reportadoPorId", userId) // Aquí se pasa el ID del usuario
    }
  }, [session?.user?.id, session?.user?.name, form])

  const onSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      movimiento: "NUEVO_INGRESO"
    }

    console.log("Enviando quimico:", payload)

    try {
      const res = await axios.post("/api/refacciones", payload)
      toast({ title: "Quimico registrado correctamente" })
      console.log("Registro exitoso:", res.data)
      onSuccess?.()
    } catch (error: any) {
      console.error("Error al registrar:", error)
      toast({
        title: "Error al registrar",
        description: error?.response?.data || "Datos faltantes o inválidos",
        variant: "destructive"
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {[["codigo", "Código"], ["descripcion", "Descripción"], ["noLote", "No. Lote"], ["proveedores", "Proveedor"], ["cantidad", "Cantidad"]]
          .map(([name, label]) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof FormValues}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">{label}</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-black bg-white w-full rounded-md px-3 py-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

        <FormField
          control={form.control}
          name="fechaIngreso"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Fecha de Ingreso</FormLabel>
              <FormControl>
                <Input type="date" {...field} className="text-black bg-white w-full rounded-md px-3 py-2" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="existenciaSistema"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Existencia en sistema</FormLabel>
              <FormControl>
                <Input type="number" {...field} className="text-black bg-white w-full rounded-md px-3 py-2" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unidadMedidaId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Unidad de Medida</FormLabel>
              <FormControl>
                <select {...field} className="text-black bg-white w-full rounded-md p-2 border">
                  <option value="PZ">Pz</option>
                  <option value="KG">Kg</option>
                  <option value="LTS">Lts</option>
                  <option value="MTS">Mts</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ubicacionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Ubicación</FormLabel>
              <FormControl>
                <select {...field} className="text-black bg-white w-full rounded-md p-2 border">
                  <option value="">Selecciona una ubicación</option>
                  {ubicaciones.map((ubi: any) => (
                    <option key={ubi.id} value={ubi.id}>
                      Rack {ubi.rack} - Fila {ubi.fila} - Posición {ubi.posicion}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo oculto de debug (mostrar ID y nombre del usuario) */}
        <FormField
          control={form.control}
          name="reportadoPorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">ID Usuario Logueado</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  readOnly
                  value={session?.user?.id ? `${session?.user?.id} - ${session?.user?.name}` : ""} // Mostrar ID y nombre concatenados
                  className="text-black bg-zinc-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón registrar */}
        <div className="lg:col-span-3 flex justify-center mt-4">
          <Button type="submit"  className="bg-[#1e3a5f] text-white hover:bg-green-600 h-10 px-10 rounded-full w-full sm:w-auto"
          >
            Registrar quimico
          </Button>
        </div>
      </form>
    </Form>
  )
}
