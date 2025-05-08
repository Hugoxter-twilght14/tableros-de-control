"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { formSchema } from "./RegisterForm.form"

export function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      correo: "",
      imagen: "",
      rol: "ADMINISTRADOR",
      telefono: "",
      password: "",
      repitPassword: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { repitPassword, ...dataToSend } = values
    try {
      await axios.post("/api/auth/register", dataToSend)
      toast({ title: "Usuario registrado exitosamente" })
      onSuccess?.() // Cierra modal si existe
    } catch (error: any) {
      toast({
        title: "Error en el registro",
        description: error?.response?.data || "Intenta más tarde",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField control={form.control} name="nombre" render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre*</FormLabel>
            <FormControl><Input placeholder="Tu nombre" {...field} className="text-black bg-white" /></FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )} />

        <FormField control={form.control} name="correo" render={({ field }) => (
          <FormItem>
            <FormLabel>Email*</FormLabel>
            <FormControl><Input placeholder="Escribe tu correo" {...field} className="text-black bg-white" /></FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )} />

        <FormField control={form.control} name="imagen" render={({ field }) => (
          <FormItem>
            <FormLabel>URL de imagen</FormLabel>
            <FormControl><Input placeholder="Opcional: una URL de foto" {...field} className="text-black bg-white" /></FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )} />

        <FormField control={form.control} name="telefono" render={({ field }) => (
          <FormItem>
            <FormLabel>Teléfono*</FormLabel>
            <FormControl><Input placeholder="Opcional: tu teléfono" {...field} className="text-black bg-white" /></FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )} />

        <FormField control={form.control} name="rol" render={({ field }) => (
          <FormItem>
            <FormLabel>Rol*</FormLabel>
            <FormControl>
              <select {...field} className="border p-2 rounded-md text-black bg-white">
                <option value="ADMINISTRADOR">Administrador</option>
                <option value="SUPERVISOR_REFACCIONES">Supervisor refacciones</option>
                <option value="SUPERVISOR_QUIMICOS">Supervisor químicos</option>
                <option value="DESPACHADOR">Despachador</option>
              </select>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )} />

        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Contraseña*</FormLabel>
            <FormControl><Input type="password" placeholder="Escribe una contraseña" {...field} className="text-black bg-white" /></FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )} />

        <FormField control={form.control} name="repitPassword" render={({ field }) => (
          <FormItem>
            <FormLabel>Repetir contraseña*</FormLabel>
            <FormControl><Input type="password" placeholder="Repite la contraseña" {...field} className="text-black bg-white" /></FormControl>
            <FormDescription>* Campos obligatorios</FormDescription>
            <FormMessage  className="text-red-500" />
          </FormItem>
        )} />

        <div className="sm:col-span-2">
          <Button type="submit"  className="w-full h-10 text-white px-4 py-2 rounded-2xl text-sm sm:text-base font-semibold bg-[#426689] transition-all duration-200 hover:bg-gradient-to-b hover:from-green-700 hover:to-green-500">
            Crear cuenta
          </Button>
        </div>
      </form>
    </Form>
  )
}
