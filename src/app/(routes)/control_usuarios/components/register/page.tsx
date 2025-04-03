import Link from "next/link";
import { RegisterForm } from "./RegisterForm";

export default function page() {
  return (
    
    <div>
        <div>
        <p className='text-3xl font-bold text-left mb-7 text-[#20232d]'>
            CREAR CUENTA
        </p>

        <RegisterForm/>
        </div>
    </div>
  );
}
