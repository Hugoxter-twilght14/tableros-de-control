"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { formSchema } from "./LoginForm.form"
import { useState } from "react"
import FormError from "./formError/FormError"
import { login } from "../../../../../../actions/login"
import { toast } from "../../../../../hooks/use-toast"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        correo: "",
        password:"",
      },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = await login(values)
  
      setError(data?.error)
  
      if (data?.success && data.redirectTo) {
        toast({
          title: "Inicio de sesión exitoso",
        })
        router.push(data.redirectTo)
      }
    } catch (error) {
      console.error(error)
    }
  }
  

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
         className="w-full gap-3 flex flex-col">
          <FormField
            control={form.control}
            name="correo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#20232d] lg:text-left text-center">Email*</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu correo" {...field} className="h-10 text-black border-[#20232d]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#20232d] lg:text-left text-center">Contraseña*</FormLabel>
                <FormControl>
                  <Input placeholder="Escribe tu contraseña" {...field} type="password" className="h-10 text-black border-[#20232d]" />
                </FormControl>
                <FormDescription className="text-black">
                  * campos obligatorios.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error}/>
          <Button type="submit" className="w-full bg-[#1e3a5f] text-white hover:text-black  hover:bg-green-700 h-10 rounded-2xl">
              Ingresar
          </Button>
        </form>
      </Form>
  );
}

