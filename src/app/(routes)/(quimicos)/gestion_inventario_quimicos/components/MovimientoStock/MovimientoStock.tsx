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
import { set } from "date-fns";

interface Quimico {
  codigo: number;
  descripcion: string;
  noLote: string;
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
  const [noLote, setNoLote] = useState("");
  const [stock, setStock] = useState("");
  const [quimico, setQuimico] = useState<Quimico | null>(null);

  const buscarPorCodigo = async () => {
    if (!codigo) return;
    try {
      const res = await fetch(`/api/refacciones/buscar-entrada-salida?codigo=${codigo}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setQuimico(data);
    } catch {
      toast({ title: "No encontrado", description: "Código no válido", variant: "destructive" });
      setQuimico(null);
    }
  };

  const buscarPorNoLote = async () => {
    if (!noLote) return;
    try {
      const res = await fetch(`/api/refacciones/buscar-entrada-salida?noParte=${noLote}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setQuimico(data);
    } catch {
      toast({ title: "No encontrado", description: "Número de Lote no válido", variant: "destructive" });
      setQuimico(null);
    }
  };

  const actualizarStock = async (tipo: "ENTRADA" | "SALIDA") => {
    if (!quimico) return;
    const cantidad = parseInt(stock);
    if (isNaN(cantidad) || cantidad <= 0) {
      toast({ title: "Cantidad inválida", variant: "destructive" });
      return;
    }

    const nuevaExistencia = tipo === "ENTRADA"
      ? quimico.existenciaFisica + cantidad
      : quimico.existenciaFisica - cantidad;

    const nuevasDiferencias = Math.abs(nuevaExistencia - quimico.existenciaSistema);

    try {
      const res = await fetch(`/api/refacciones/movimiento/${quimico.codigo}`, {
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
      setQuimico(null);
      setCodigo("");
      setNoLote("");
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
            <Button onClick={buscarPorCodigo} className="rounded-[5px] bg-[#426689] hover:bg-[#567798dd] text-white" >Buscar</Button>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Buscar por Nº Lote" value={noLote} onChange={(e) => setNoLote(e.target.value)} />
            <Button onClick={buscarPorNoLote} className="rounded-[5px] bg-[#426689] hover:bg-[#567798dd] text-white" >Buscar</Button>
          </div>

          {quimico && (
            <div className="bg-[#2b2b2b] p-4 rounded-md shadow-md space-y-1">
              <p><strong>Código:</strong> {quimico.codigo}</p>
              <p><strong>Descripción:</strong> {quimico.descripcion}</p>
              <p><strong>No. Lote:</strong> {quimico.noLote}</p>
              <p><strong>Existencia física:</strong> {quimico.existenciaFisica}</p>
              <p><strong>Existencia sistema:</strong> {quimico.existenciaSistema}</p>
              <p><strong>Diferencias:</strong> {quimico.diferencias}</p>
              <p><strong>Movimiento:</strong> {quimico.movimiento}</p>

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
