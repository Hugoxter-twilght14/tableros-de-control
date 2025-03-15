import { Navbar } from "@/components/shared/Navbar";
import { GestionAlmacen } from "./(routes)/(home)/components/GestionAlmacen";
import { HistorialMovimiento } from "./(routes)/(home)/components/HistorialMovimiento";
import { ControlUsuarios } from "./(routes)/(home)/components/ControlUsuarios";

export default function Home() {
  return (
    <div className="relative bg-[#2b2b2b]">
      <Navbar/>
       {/* Contenedor para centrar el título y los componentes en pantallas grandes */}
      <div className=" lg:mt-42 lg:mb-[-100px] px-4">
        <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold text-center">
          ADMINISTRADOR
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full h-[80vw] md:h-[56.25vw] lg:h-[45vw]">
        <GestionAlmacen />
        <ControlUsuarios />
        <HistorialMovimiento />
      </div>
    </div>
  )
}
