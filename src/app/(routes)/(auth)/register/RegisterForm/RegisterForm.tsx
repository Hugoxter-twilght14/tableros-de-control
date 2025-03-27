// src/components/forms/RegisterForm.tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { formSchema } from "./RegisterForm.form"

export function RegisterForm() {
  const router = useRouter()

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
    const { repitPassword, ...dataToSend } = values // eliminamos repeatPassword
    try {
      const { data } = await axios.post("/api/auth/register", dataToSend)

      toast({ title: "Usuario registrado exitosamente" })

      switch (data.rol) {
        case "ADMINISTRADOR":
          router.push("/")
          break
        case "SUPERVISOR_REFACCIONES":
          router.push("/vista-refacciones")
          break
        case "SUPERVISOR_QUIMICOS":
          router.push("/vista-quimicos")
          break
        case "DESPACHADOR":
          router.push("/vista-despachador")
          break
        default:
          router.push("/login")
      }
    } catch (error: any) {
      console.error(error)
      toast({
        title: "Ha ocurrido un error",
        description: error?.response?.data || "Error en el registro",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField control={form.control} name="nombre" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#20232d] lg:text-left text-center">Nombre</FormLabel>
            <FormControl><Input placeholder="Tu nombre" {...field} className="text-black" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="correo" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#20232d] lg:text-left text-center">Email*</FormLabel>
            <FormControl><Input placeholder="Escribe tu correo" {...field} className="text-black" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="imagen" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#20232d] lg:text-left text-center">URL de imagen</FormLabel>
            <FormControl><Input placeholder="Opcional: una URL de foto" {...field} className="text-black" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="telefono" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#20232d] lg:text-left text-center">Teléfono</FormLabel>
            <FormControl><Input placeholder="Opcional: tu teléfono" {...field} className="text-black" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="rol" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#20232d] lg:text-left text-center">Rol*</FormLabel>
            <FormControl>
              <select {...field} className="border p-2 rounded-md text-black">
                <option value="ADMINISTRADOR">Administrador</option>
                <option value="SUPERVISOR_REFACCIONES">Supervisor refacciones</option>
                <option value="SUPERVISOR_QUIMICOS">Supervisor químicos</option>
                <option value="DESPACHADOR">Despachador</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#20232d] lg:text-left text-center">Contraseña*</FormLabel>
            <FormControl><Input type="password" placeholder="Escribe una contraseña" {...field} className="text-black" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="repitPassword" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#20232d] lg:text-left text-center">Repetir contraseña*</FormLabel>
            <FormControl><Input type="password" placeholder="Repite la contraseña" {...field} className="text-black" /></FormControl>
            <FormDescription className="text-black">* Campos obligatorios</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
        
        <div className="sm:col-span-2">
          <Button type="submit"className="w-full bg-[#1e3a5f] text-white hover:text-black hover:bg-green-700 h-10 rounded-2xl">
            Crear cuenta
            </Button>
            </div>
      </form>
    </Form>
  )
}
