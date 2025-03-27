"use client"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"

import { BellRing, Menu, Search } from "lucide-react";
import { itemsNavbar } from "@/data/itemsNavbar";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export function NavbarMobile() {
  return (
    <div className="p-4 flex justify-between items-center bg-black text-white shadow-md fixed top-0 left-0 right-0 z-50">
        <p className="text-lg font-bold">INELAC</p>
        <Sheet>
          <SheetTrigger>
            <Menu className="text-white cursor-pointer" size={24}/>
          </SheetTrigger>
          <SheetContent side="left" className="bg-neutral-900 text-white z-50">
            {/* Mapeo de las opciones de navegación de PC a teléfono */}
            <div className="flex flex-col gap-4 ml-4 mt-4">
              {itemsNavbar.map((item) => (
                <Link key={item.name} href={item.link} 
                  className="hover:text-green-500 transition-all duration-300 text-lg"> 
                    {item.name} 
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Logo/>
            </div>
          </SheetContent>
        </Sheet>
    </div>
  )
}

