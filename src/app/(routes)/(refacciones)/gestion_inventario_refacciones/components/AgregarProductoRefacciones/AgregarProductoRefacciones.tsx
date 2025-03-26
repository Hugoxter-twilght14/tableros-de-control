import { X } from 'lucide-react'
import React, { useState } from 'react'

interface AgregarProductoRefaccionesProps {
  isOpen: boolean
  onClose: () => void
}

export default function AgregarProductoRefacciones({
  isOpen,
  onClose,
}: AgregarProductoRefaccionesProps) {
  // Estado local para los campos del formulario
  const [codigo, setCodigo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [noParte, setNoParte] = useState('')
  const [fechaIngreso, setFechaIngreso] = useState('')
  const [fechaVencimiento, setFechaVencimiento] = useState('')
  const [proveedor, setProveedor] = useState('')
  const [usuarioAlta, setUsuarioAlta] = useState('')
  const [rack, setRack] = useState('')
  const [posicion, setPosicion] = useState('')
  const [cantidad, setCantidad] = useState<number | string>('')
  const [unidadMedida, setUnidadMedida] = useState('')

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí podrías manejar la lógica de guardado:
    // Por ejemplo, enviar los datos a tu API, etc.
    console.log({
      codigo,
      descripcion,
      noParte,
      fechaIngreso,
      fechaVencimiento,
      proveedor,
      usuarioAlta,
      rack,
      posicion,
      cantidad,
      unidadMedida,
    })

    // Cierra el modal después de guardar
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50"
      onClick={onClose}
    >
      {/* Contenedor del modal */}
      <div
        className="relative w-full max-w-2xl mx-auto bg-[#6c757d] rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón para cerrar el modal */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X/>
        </button>

        <h2 className="text-xl font-bold mb-4">Dar de alta producto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Código */}
            <div>
              <label htmlFor="codigo" className="block text-sm font-medium">
                Código
              </label>
              <input
                id="codigo"
                type="text"
                className="mt-1 block w-full border border-black bg-[#fff] text-black rounded-md p-2"
                placeholder="Ingresa código de producto"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </div>

            {/* Descripción */}
            <div>
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium"
              >
                Descripción
              </label>
              <input
                id="descripcion"
                type="text"
                className="mt-1 block w-full border  border-black bg-[#fff] text-black0 rounded-md p-2"
                placeholder="Ingresa descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>

            {/* Número de parte */}
            <div>
              <label htmlFor="noParte" className="block text-sm font-medium">
                Nº de parte
              </label>
              <input
                id="noParte"
                type="text"
                className="mt-1 block w-full border  border-black bg-[#fff] text-black rounded-md p-2"
                placeholder="Ingresa Nº de parte"
                value={noParte}
                onChange={(e) => setNoParte(e.target.value)}
              />
            </div>

            {/* Fecha de ingreso */}
            <div>
              <label
                htmlFor="fechaIngreso"
                className="block text-sm font-medium"
              >
                Fecha de ingreso
              </label>
              <input
                id="fechaIngreso"
                type="date"
                className="mt-1 block w-full border  border-black bg-[#fff] text-black rounded-md p-2"
                value={fechaIngreso}
                onChange={(e) => setFechaIngreso(e.target.value)}
              />
            </div>

            {/* Fecha de vencimiento */}
            <div>
              <label
                htmlFor="fechaVencimiento"
                className="block text-sm font-medium"
              >
                Fecha de vencimiento
              </label>
              <input
                id="fechaVencimiento"
                type="date"
                className="mt-1 block w-full border border-black bg-[#fff] text-black rounded-md p-2"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
              />
            </div>

            {/* Proveedor */}
            <div>
              <label htmlFor="proveedor" className="block text-sm font-medium">
                Proveedor
              </label>
              <input
                id="proveedor"
                type="text"
                className="mt-1 block w-full border border-black bg-[#fff] text-black rounded-md p-2"
                placeholder="Ingresa proveedor"
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
              />
            </div>

            {/* Usuario que da de alta */}
            <div>
              <label
                htmlFor="usuarioAlta"
                className="block text-sm font-medium"
              >
                Usuario que da de alta
              </label>
              <input
                id="usuarioAlta"
                type="text"
                className="mt-1 block w-full border border-black bg-[#fff] text-black rounded-md p-2"
                placeholder="Reportado por"
                value={usuarioAlta}
                onChange={(e) => setUsuarioAlta(e.target.value)}
              />
            </div>

            {/* Rack */}
            <div>
              <label htmlFor="rack" className="block text-sm font-medium">
                Rack
              </label>
              <select
                id="rack"
                className="mt-1 block w-full border border-black bg-[#fff] text-black rounded-md p-2"
                value={rack}
                onChange={(e) => setRack(e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="Rack1">1</option>
                <option value="Rack2">2</option>
                <option value="Rack3">3</option>
              </select>
            </div>

            {/* Posición */}
            <div>
              <label htmlFor="posicion" className="block text-sm font-medium">
                Posición
              </label>
              <select
                id="posicion"
                className="mt-1 block w-full border border-black bg-[#fff] text-black rounded-md p-2"
                value={posicion}
                onChange={(e) => setPosicion(e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="Pos1">A</option>
                <option value="Pos2">B</option>
                <option value="Pos3">C</option>
              </select>
            </div>

            {/* Cantidad */}
            <div>
              <label htmlFor="cantidad" className="block text-sm font-medium">
                Cantidad
              </label>
              <input
                id="cantidad"
                type="number"
                className="mt-1 block w-full border border-black bg-[#fff] text-black rounded-md p-2"
                placeholder="Ingresa cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                min={0}
                required
              />
            </div>

            {/* Unidad de medida */}
            <div>
              <label
                htmlFor="unidadMedida"
                className="block text-sm font-medium"
              >
                Unidad de medida
              </label>
              <select
                id="unidadMedida"
                className="mt-1 block w-full border border-black bg-[#fff] text-black rounded-md p-2"
                value={unidadMedida}
                onChange={(e) => setUnidadMedida(e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="pz">Piezas</option>
                <option value="kg">Kilogramos</option>
                <option value="lt">Litros</option>
              </select>
            </div>
          </div>

          {/* Botón de guardar */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
              Guardar y dar de alta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

