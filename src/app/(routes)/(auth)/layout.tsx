export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="h-screen w-full relative overflow-hidden">
      {/* Fondo oscuro y la imagen */}
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-black">
          <div className="h-full w-full bg-[url('/inelac_fondo_login.jpg')] bg-cover bg-no-repeat bg-center opacity-30" />
        </div>
      </div>
      <div className="flex lg:justify-start justify-center items-center h-full w-full pl-4 pr-8 py-5">
      <div className="ml-6 bg-[#ffffff] px-6 md:px-8 py-6 md:py-8 mt-15 rounded-2xl shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
