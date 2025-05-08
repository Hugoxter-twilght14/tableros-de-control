"use client"
import React from 'react'

export default function AvisoPrivacidad() {
  return (
    <div className='gap-2 flex flex-col justify-center'>
      <label htmlFor="contrato-informatico" className="text-white text-lg font-bold mb-2">
        Descargar este aviso de privacidad
      </label>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 shadow-md transition-all rounded-full">
        <a href="/pdfs/Acuerdo_de_Privacidad_INELAC_TABLEROSCONTROL.pdf" download>
          Descargar
        </a>
      </button>
    </div>
  )
}
