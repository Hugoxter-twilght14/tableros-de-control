export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full relative bg-cover bg-center" style={{ backgroundImage: "url('/inelac_fondo_login.jpg')" }}>
      <div className="bg-[#000000] h-full min-h-screen absolute w-full -z-10">
        <div className="bg-[url('/iconos/inelac_fondo_login.jpg')] h-full opacity-40 bg-no-repeat bg-cover bg-center"/>
      </div>
      <div className="flex lg:justify-start justify-center items-center h-full w-full pl-4 pr-8 py-5">
      <div className="ml-6 bg-[#ffffff] px-6 md:px-8 py-6 md:py-8 mt-15 rounded-2xl shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
