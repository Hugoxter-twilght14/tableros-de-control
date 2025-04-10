"use client";
import ContratoInformatico from "./components/ContratoInformatico/ContratoInformatico";
import ManualInstalacion from "./components/ManualInstalacion/ManualInstalacion";
import ManualUsuario from "./components/ManualUsuario/ManualUsuario";
import { Navbar } from "./components/Navbar";

export default function pag() {
  return (
    <div className="relative bg-[#2b2b2b] min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Título con margen adaptativo */}
      <div className="mt-16 md:mt-24 lg:mt-32 mb-8 px-4">
        <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold text-center my-6">
          ACUERDO DE PRIVAVIDAD
        </h1>
        <p className="text-xl font-bold mb-6 text-right mx-10 mt-6"> 
          Última actualización: 09 de abril de 2025
        </p>

        <p className="text-xl font-bold mx-10">1. Identidad del responsable</p>
          <p className="my-2 text-justify mx-10">
            El responsable del tratamiento de tus datos personales es Industrial Envasadora de Lácteos y Derivados S.A.P.I. de C.V. – (INELAC), con domicilio en [Dirección física]. <br/>
            Puedes contactarnos a través del correo electrónico [Insertar correo] o llamando al número [insertar número teléfono].
          </p>

          <p className="text-xl font-bold mt-6 mx-10">2. Datos Personales Recopilados</p>
          <p className="my-2 mx-10">Para brindarte el mejor servicio, recopilamos los siguientes datos personales:</p>
          <li className="mx-15">Al crear una cuenta nueva: Nombre completo, teléfono, correo electrónico, rol o puesto, y contraseña.</li>

          <p className="text-xl font-bold mt-6 mx-10">3. Finalidades del Tratamiento de Datos</p>
          <p className="my-2 mx-10">Los datos personales serán utilizados para las siguientes finalidades:</p>
            <li className="mx-20">Crear y gestionar tu cuenta de usuario.</li>
            <li className="mx-20">Mostrar un saludo personalizado en la interfaz de la aplicación.</li>
            <li className="mx-20">Enviar notificaciones relacionadas productos que están a productos próximos a vencer o ya están vencidos (Químicos o Refacciones).</li>
            <li className="mx-20">Generar etiquetas con la información correspondiente.</li>

          <p className="text-xl font-bold mt-6 mx-10">4.	Transferencia de Datos</p>
          <p className="my-2 mx-10">Tus datos personales no serán transferidos a terceros sin tu consentimiento, salvo en los siguientes casos:</p>
            <li className="mx-20">Para cumplir con obligaciones legales.</li>
            <li className="mx-20">En colaboración con terceros proveedores de servicios tecnológicos estrictamente necesarios para el funcionamiento de la aplicación.</li>
 
          <p className="text-xl font-bold mt-6 mx-10">5.	Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)</p>
          <p className="my-2 mx-10">Como titular de tus datos personales, tienes derecho a:</p>
            <li className="mx-20">Acceder a los datos que hemos recopilado.</li>
            <li className="mx-20">Rectificar datos incorrectos o desactualizados.</li>
            <li className="mx-20">Cancelar tus datos personales, cuando sea aplicable.</li>
            <li className="mx-20">Oponerte al uso de tus datos para ciertas finalidades.</li>

          <p className="my-2 mx-10">Puedes ejercer estos derechos contactándonos en [Insertar página web] o al correo [Insertar correo].</p>

          <p className="text-xl font-bold mt-6 mx-10">6.	Medidas de Seguridad</p>
          <p className="my-2 mx-10">Implementamos medidas técnicas y administrativas para proteger tus datos personales de accesos no autorizados, 
            pérdida, alteración o uso indebido.
          </p>

          <p className="text-xl font-bold mt-6 mx-10">7.	Uso de Cookies</p>
          <p className="my-2 mx-10">
            Nuestra aplicación puede utilizar cookies para mejorar tu experiencia de usuario. <br/>
            Estas cookies no recopilan datos personales, 
            pero puedes desactivarlas en la configuración de tu navegador.
          </p>

          <p className="text-xl font-bold mt-6 mx-10">8.	Modificaciones al Acuerdo de Privacidad</p>
          <p className="my-2 mx-10">Nos reservamos el derecho de actualizar este acuerdo de privacidad. Te notificaremos cualquier cambio mediante correos oficiales como: 
            [Insertar correo 1] o [Insertar correo 2]</p>

          <p className="text-xl font-bold mt-6 mx-10">9.	Contacto</p>
          <p className="my-2 mx-10">Si tienes preguntas sobre este aviso de privacidad o deseas ejercer tus derechos ARCO, contáctanos en:</p>
          <p className="mx-10"> Correo: [insertar correo]</p>
          <p className="mx-10"> Teléfono: [insertar teléfono]</p>

        <div className="mt-16 md:mt-24 lg:mt-12 mb-8 px-4 mx-10">
          <ContratoInformatico/>
        </div>
        <div className="mt-16 md:mt-24 lg:mt-12 mb-8 px-4 mx-10">
          <ManualInstalacion/>
        </div>
        <div className="mt-16 md:mt-24 lg:mt-12 mb-8 px-4 mx-10">
          <ManualUsuario/>
        </div>


      </div>
    </div>
  );
}
