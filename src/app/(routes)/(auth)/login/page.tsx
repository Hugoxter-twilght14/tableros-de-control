import Link from 'next/link'
import React from 'react'
import { Checkbox } from "@/components/ui/checkbox";
import { LoginForm } from './loginForm';
import { Navbar } from './components/Navbar';

export default async function page() {
    
  return (
    <div>
        <div>
        <Navbar/>
        </div>
        <p className='text-3xl font-bold text-left mb-7 text-[#20232d]'>INICIAR SESIÓN</p>
        <LoginForm/>

        <div className='mt-5 text-center'>
            <Link href="/" className='hover:underline hover:opacity-70 text-[#20232d]'>
                ¿Olvidaste tu contraseña?
            </Link>
        </div>
        <div className='mt-4 flex gap-1'>
            <label className='text-[#20232d] opacity-70'>¿Todavía no tienes cuenta?</label>
            <Link href="/register" className='hover:underline hover:opacity-70 text-[#20232d]'>
                Creala aquí
            </Link>
        </div>
        <div className='items-center space-x-2 mt-4 text-center'>
            <Checkbox id='terms' className='border-[#20232d] items-center'/>
            <label className=" text-[#20232d] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-center">
                Recuérdame
            </label>
        </div>
    </div>
  );
}
