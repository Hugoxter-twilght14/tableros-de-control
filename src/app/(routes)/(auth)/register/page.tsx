import Link from "next/link";
import { RegisterForm } from "./RegisterForm";
import { Navbar } from './components/Navbar';

export default function page() {
  return (
    
    <div>
        <div>
            <Navbar/>
        </div>
        <div>
        <p className='text-3xl font-bold text-left mb-7 text-[#20232d]'>
            CREAR CUENTA
        </p>

        <RegisterForm/>
        </div>
        

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
