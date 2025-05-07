"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut, useSession } from "next-auth/react"
import { User2 } from "lucide-react"

export function UserProfileCard() {
  const { data: session, status } = useSession()

  console.log('Session Data:', session) // Depura la sesión para verificar los valores

  if (status === "loading") {
    return <div className="animate-pulse w-8 h-8 rounded-full bg-white/40" />
  }

  if (!session?.user) {
    return null // Si no hay usuario en la sesión, no se muestra nada
  }

  // Asegúrate de que `session.user.image` esté disponible
  const imageUrl = session.user.image || "" // Si no hay imagen, usa una cadena vacía

  console.log('User Image URL:', imageUrl) // Verifica la URL de la imagen

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Avatar className="cursor-pointer border-2 border-white hover:border-blue-500 transition">
            {imageUrl ? (
              <AvatarImage src={imageUrl} alt="avatar" />
            ) : (
              <AvatarFallback>
                <User2 size={20} />
              </AvatarFallback>
            )}
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60 bg-[#2266ff] text-white mr-2 mt-2 shadow-lg z-50">
        <DropdownMenuLabel className="text-center uppercase text-sm font-bold">
          {session.user.name}
        </DropdownMenuLabel>
        <div className="text-center text-xs px-2">{session.user.email}</div>
        <div className="text-center text-[10px] uppercase mt-1 px-2">{session.user.rol}</div>

        <DropdownMenuSeparator className="bg-white/30 my-2" />

        <DropdownMenuItem
          className="justify-center bg-red-600 hover:bg-red-700 text-white rounded-md text-xs cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
