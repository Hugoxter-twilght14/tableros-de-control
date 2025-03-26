import Link from "next/link";
import { RegisterForm } from "./RegisterForm";

export default function page() {
  return (
    <div>
        <p className='text-3xl font-bold text-left mb-7 text-[#20232d]'>
            CREAR CUENTA
        </p>

        <RegisterForm/>

        <div className="mt-4 flex gap-1">
            <p  className="text-black opacity-70">
                ¿Ya tienes una cuenta?
            </p>
            <Link href="login" className='hover:underline hover:opacity-70 text-[#20232d]'>
                Inicia sesión aquí
            </Link>
        </div>
    </div>
  );
}
