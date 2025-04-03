import { Navbar } from "@/components/shared/Navbar";
import PorBodega from "./components/PorBodega/PorBodega";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

export default async function page() {

  const session = await auth()
  
    if (!session || !session.user) {
      redirect("/login")
    }

  return (
    <div className="relative bg-[#2b2b2b] min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Título con margen adaptativo */}
      <div className="mt-16 md:mt-24 lg:mt-32 mb-8 px-4">
        <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold text-center">
          VISTA DE DASHBOARD DE REFACCIONES
        </h1>
        <div className="flex justify-center">
            <PorBodega/>
        </div>

      </div>
    </div>
  );
}
