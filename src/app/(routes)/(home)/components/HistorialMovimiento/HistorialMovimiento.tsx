"use client";
import { useRouter } from "next/navigation";

export function HistorialMovimiento() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/historial_movimientos");
  };

  return (
    <div className="relative flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
      {/* Contenedor principal con imagen */}
      <div
        className="
          relative
          w-28 h-28 
          sm:w-36 sm:h-36 
          md:w-44 md:h-44 
          lg:w-52 lg:h-52 
          rounded-full 
          flex items-center justify-center 
          cursor-pointer 
          hover:shadow-lg transition duration-300 
          shadow-[0_0_0_4px_#007bff,0_0_0_8px_black,0_0_0_12px_white]
        "
        onClick={handleNavigation}
      >
        {/* Imagen de almacén */}
        <img
          src="/iconos/historial_icono.png"
          alt="Historial de movimientos"
          className="object-cover w-full h-full rounded-full bg-white"
        />
      </div>

      {/* Texto debajo del círculo */}
      <p className="text-white text-center mt-3 text-base sm:text-lg md:text-xl font-bold tracking-wide">
        Historial de movimientos
      </p>
    </div>
  );
}
