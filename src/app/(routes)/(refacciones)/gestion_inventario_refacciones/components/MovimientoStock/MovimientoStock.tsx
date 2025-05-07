"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Refaccion {
  codigo: number;
  descripcion: string;
  noParte: string;
  existenciaFisica: number;
  existenciaSistema: number;
  diferencias: number;
  movimiento: string;
}

interface Props {
  onSuccess?: () => void;
}

export default function MovimientoStock({ onSuccess }: Props) {

  const router = useRouter(); // ✅ Next.js App Router
  const [open, setOpen] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [noParte, setNoParte] = useState("");
  const [stock, setStock] = useState("");
  const [refaccion, setRefaccion] = useState<Refaccion | null>(null);

  const buscarPorCodigo = async () => {
    if (!codigo) return;
    try {
      const res = await fetch(`/api/refacciones/buscar-entrada-salida?codigo=${codigo}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRefaccion(data);
    } catch {
      toast({ title: "No encontrado", description: "Código no válido", variant: "destructive" });
      setRefaccion(null);
    }
  };

  const buscarPorNoParte = async () => {
    if (!noParte) return;
    try {
      const res = await fetch(`/api/refacciones/buscar-entrada-salida?noParte=${noParte}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRefaccion(data);
    } catch {
      toast({ title: "No encontrado", description: "Número de parte no válido", variant: "destructive" });
      setRefaccion(null);
    }
  };

  const actualizarStock = async (tipo: "ENTRADA" | "SALIDA") => {
    if (!refaccion) return;
    const cantidad = parseInt(stock);
    if (isNaN(cantidad) || cantidad <= 0) {
      toast({ title: "Cantidad inválida", variant: "destructive" });
      return;
    }

    const nuevaExistencia = tipo === "ENTRADA"
      ? refaccion.existenciaFisica + cantidad
      : refaccion.existenciaFisica - cantidad;

    const nuevasDiferencias = Math.abs(nuevaExistencia - refaccion.existenciaSistema);

    try {
      const res = await fetch(`/api/refacciones/movimiento/${refaccion.codigo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo,
          cantidad,
          nuevaExistencia,
          nuevasDiferencias,
        }),
      });

      if (!res.ok) throw new Error();

      toast({
        title: tipo === "ENTRADA" ? "Entrada registrada" : "Salida registrada",
        description: "Stock actualizado correctamente.",
      });

      // ✅ Refrescar tabla actual
      router.refresh();
      onSuccess?.();

      // limpiar todo y cerrar modal
      setRefaccion(null);
      setCodigo("");
      setNoParte("");
      setStock("");
      setOpen(false);
    } catch {
      toast({ title: "Error", description: "No se pudo actualizar el stock", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Entrada / Salida
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Entrada / Salida de Producto</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex gap-2">
            <Input placeholder="Buscar por código" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
            <Button onClick={buscarPorCodigo}className="bg-cyan-600 text-white px-5 py-2 rounded-full hover:bg-cyan-800 active:scale-95 transition-transform w-full sm:w-auto bg-[#426689]">Buscar</Button>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Buscar por Nº Parte" value={noParte} onChange={(e) => setNoParte(e.target.value)} />
            <Button onClick={buscarPorNoParte}className="bg-cyan-600 text-white px-5 py-2 rounded-full hover:bg-cyan-800 active:scale-95 transition-transform w-full sm:w-auto bg-[#426689]">Buscar</Button>
          </div>

          {refaccion && (
            <div className="bg-[#2b2b2b] p-4 rounded-md shadow-md space-y-1">
              <p><strong>Código:</strong> {refaccion.codigo}</p>
              <p><strong>Descripción:</strong> {refaccion.descripcion}</p>
              <p><strong>No. Parte:</strong> {refaccion.noParte}</p>
              <p><strong>Existencia física:</strong> {refaccion.existenciaFisica}</p>
              <p><strong>Existencia sistema:</strong> {refaccion.existenciaSistema}</p>
              <p><strong>Diferencias:</strong> {refaccion.diferencias}</p>
              <p><strong>Movimiento:</strong> {refaccion.movimiento}</p>

              <div className="flex items-center gap-2 mt-4">
                <Input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Cantidad"
                  className="w-40"
                />
                <Button onClick={() => actualizarStock("ENTRADA")} className="bg-green-600 text-white">
                  Dar entrada
                </Button>
                <Button onClick={() => actualizarStock("SALIDA")} className="bg-red-600 text-white">
                  Dar salida
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
