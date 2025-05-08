import React from 'react'

export default function ManualUsuario() {
  return (
    <div className='gap-2 flex flex-col justify-center'>
      <label htmlFor="contrato-informatico" className="text-white text-lg font-bold mb-2">
        Descargar el manual de usuario
      </label>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all">
        <a href="/pdfs/manual-usuario-tablerosdecontrol.pdf" download>
          Descargar
        </a>
      </button>
    </div>
  )
}
