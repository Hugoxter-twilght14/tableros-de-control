"use client"
import { useRouter } from "next/navigation";

export function GestionAlmacen() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/almacenes");
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Contenedor principal con imagen y bordes múltiples */}
      <div
      className="relative w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition duration-300 
      shadow-[0_0_0_4px_#007bff,0_0_0_8px_black,0_0_0_12px_white]"
       onClick={handleNavigation} // Click en la imagen manda a Gestion de Almacenes
      >
        {/* Imagen de almacén */}
        <img src="/iconos/gestion_almacenes.png" alt="Gestión de Almacenes" className="w-60 h-60 rounded-full" />
      </div>

      {/* Texto debajo del círculo */}
      <p className="text-white text-center mt-2 font-semibold">Gestión de almacenes</p>
    </div>
  );
}
