import { Navbar } from "@/components/shared/Navbar"
import { auth } from "../../../../../auth"
import { redirect } from "next/navigation"
import { ControlRefaccionesClient } from "./components/ControlRefaccionesClient"

export default async function page() {
  const session = await auth()

  if (!session || !session.user) {
    redirect("/login")
  }

  return (
    <div className="relative bg-[#2b2b2b] min-h-screen overflow-hidden">
      <Navbar />

      <div className="mt-16 px-4">
        <h1 className="text-white text-3xl font-bold text-center">CONTROL DE REFACCIONES</h1>

        <ControlRefaccionesClient />
      </div>
    </div>
  )
}
