// src/app/(routes)/control_refacciones/registro-refacciones/RefaccionesForm.tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { refaccionSchema } from "./RefaccionesForm.form"
import { z } from "zod"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

type FormValues = z.infer<typeof refaccionSchema>

interface Props {
  onSuccess?: () => void
}

export function RefaccionesForm({ onSuccess }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(refaccionSchema),
    defaultValues: {
      codigo: 0,
      descripcion: "",
      noParte: "",
      proveedores: "",
      fechaIngreso: "",
      fechaVencimiento: "",
      unidadMedidaId: "PZ",
      ubicacionId: 0,
      reportadoPorId: 0,
      cantidad: 1
    }
  })

  const [ubicaciones, setUbicaciones] = useState([])

  useEffect(() => {
    const fetchUbicaciones = async () => {
      const res = await axios.get("/api/ubicaciones/get")
      setUbicaciones(res.data)
    }

    fetchUbicaciones()
  }, [])

  const onSubmit = async (values: FormValues) => {
    try {
      await axios.post("/api/refacciones", values)
      toast({ title: "Refacción registrada correctamente" })
      onSuccess?.()
    } catch (error: any) {
      toast({
        title: "Error al registrar",
        description: error?.response?.data || "Ocurrió un error inesperado",
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
        {[
          ["codigo", "Código"],
          ["descripcion", "Descripción"],
          ["noParte", "No. Parte"],
          ["proveedores", "Proveedor"],
          ["cantidad", "Cantidad"]
        ].map(([name, label]) => (
          <FormField
            key={name}
            control={form.control}
            name={name as keyof FormValues}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="text-black bg-white w-full rounded-md px-3 py-2"
                  />
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
                <Input
                  type="date"
                  {...field}
                  className="text-black bg-white w-full rounded-md px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fechaVencimiento"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Fecha de Vencimiento</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  className="text-black bg-white w-full rounded-md px-3 py-2"
                />
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
                <select
                  {...field}
                  className="text-black bg-white w-full rounded-md p-2 border"
                >
                  <option value="PZ">Piezas</option>
                  <option value="KG">Kilogramos</option>
                  <option value="LTS">Litros</option>
                  <option value="MTS">Metros</option>
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
                <select
                  {...field}
                  className="text-black bg-white w-full rounded-md p-2 border"
                >
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

        <FormField
          control={form.control}
          name="reportadoPorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">ID del usuario que reporta</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  className="text-black bg-white w-full rounded-md px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="lg:col-span-3 flex justify-center mt-4">
          <Button
            type="submit"
            className="bg-[#1e3a5f] text-white hover:bg-green-600 h-10 px-10 rounded-full w-full sm:w-auto"
          >
            Registrar refacción
          </Button>
        </div>
      </form>
    </Form>
  )
}
