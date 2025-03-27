"use client"
import { cn } from '@/lib/utils'
import { BellRing } from 'lucide-react'
import React from 'react'
import { itemsNavbar } from '@/data/itemsNavbar'
import Link from 'next/link'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { Logo } from '@/components/shared/Logo'

export function NavbarDesktop() {
    const scrollPosition = useScrollPosition();

    return (
        <div className={cn("z-30 left-0 right-0 top-0 h-16 fixed w-full transition-all duration-300",
            scrollPosition > 20 ? "bg-black text-white" : "bg-transparent text-white"
        )}>
            <div className='px-[4%] mx-auto h-full flex items-center justify-between bg-black'>
                <div className='flex items-center'>
                    <p className='font-bold'>INELAC</p>
                    <div className='ml-10 flex gap-4'>
                        {itemsNavbar.map((item) => (
                            <Link key={item.name} href={item.link}
                                className='hover:text-green-500 transition-all duration-300'>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
