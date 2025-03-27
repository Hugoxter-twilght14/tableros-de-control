import React from 'react'
import { NavbarDesktop } from './NavbarLoginDesktop'
import { NavbarMobile } from './NavbarLoginMobile'

export function Navbar() {
  return (
    <div>
      <nav>
        <div className="hidden mx-auto md:block">
            <NavbarDesktop/>
        </div>
        <div className='md:hidden'>
            <NavbarMobile/>
        </div>
      </nav>
    </div>
  )
}
