import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { Navbar } from "./components/Navbar";
import { ButtonRegresar } from "./components/ButtonRegresar";

export default async function page() {
  const session = await auth();

  // Si no hay sesión, redirige al login
  if (!session || !session.user) {
    redirect("/login");
  }
  
  return (
    <div className="relative bg-[#2b2b2b] min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Título con margen adaptativo */}
      <div className="mt-16 md:mt-24 lg:mt-32 mb-8 px-4">
        <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold text-center">
          PANEL DE HISTORIAL DE MOVIMIENTOS
        </h1>
      </div>
      {/* Botón de regresar */}
      <div className="flex justify-center mt-10">
        <ButtonRegresar/>
      </div>
    </div>
  );
}
