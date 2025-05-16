'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
} from "recharts";

type Prediccion = {
  meses: string[];
  valores: number[];
  actual: number;
};

export default function PrediccionArima() {
  const router = useRouter();
  const [prediccion, setPrediccion] = useState<Prediccion | null>(null);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerPrediccion = async () => {
      try {
        const res = await fetch("/api/prediccion-arima", { cache: "no-store" });
        const data = await res.json();

        if (data?.valores && data?.meses) {
          const hoy = new Date();
          const mesesTraducidos = data.meses.map((_: string, i: number) => {
            const fecha = new Date(hoy.getFullYear(), hoy.getMonth() + 1 + i);
            return new Intl.DateTimeFormat("es-ES", {
              month: "long",
              year: "numeric",
            }).format(fecha);
          });

          setPrediccion({ ...data, meses: mesesTraducidos });
          setSeleccionados(mesesTraducidos);
        }
      } catch (error) {
        console.error("Error al obtener la predicción:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerPrediccion();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Cargando predicción...
      </div>
    );
  }

  if (!prediccion || !prediccion.meses.length) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        No hay datos suficientes para predecir.
      </div>
    );
  }

  const primerSeleccionadoIndex = prediccion.meses.findIndex((mes) =>
    seleccionados.includes(mes)
  );

  const dataGrafica = [
    {
      mes: "Actual",
      valor: parseFloat(prediccion.actual.toFixed(2)),
      tendencia: "🔵 Valor actual",
      label: "Valor actual",
    },
    ...prediccion.meses
      .map((mes: string, i: number) =>
        seleccionados.includes(mes) && i >= primerSeleccionadoIndex
          ? {
              mes,
              valor: parseFloat(prediccion.valores[i].toFixed(2)),
              tendencia:
                i === 0
                  ? "Inicio"
                  : prediccion.valores[i] > prediccion.valores[i - 1]
                  ? "⬆ Subida"
                  : prediccion.valores[i] < prediccion.valores[i - 1]
                  ? "⬇ Bajada"
                  : "— Estable",
              label: i === primerSeleccionadoIndex ? "Inicio" : "",
            }
          : null
      )
      .filter(Boolean) as { mes: string; valor: number; tendencia: string; label: string }[],
  ];

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <button
        onClick={() => router.back()}
        className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-700"
      >
        Regresar
      </button>

      <h1 className="text-3xl font-bold mb-4 text-cyan-400">
        📊 Predicción de existencias totales
      </h1>

      <div className="flex flex-wrap gap-4 mb-4">
        {prediccion.meses.map((mes: string) => (
          <label key={mes} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={seleccionados.includes(mes)}
              onChange={() =>
                setSeleccionados((prev) =>
                  prev.includes(mes)
                    ? prev.filter((m) => m !== mes)
                    : [...prev, mes]
                )
              }
              className="accent-cyan-500"
            />
            <span className="capitalize">{mes}</span>
          </label>
        ))}
      </div>

      <div className="w-full h-[calc(100vh-120px)]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataGrafica}
            margin={{ top: 20, right: 50, left: 50, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#444" />
            <XAxis dataKey="mes" stroke="#ccc" tick={{ fill: "#ccc" }} />
            <YAxis
              stroke="#ccc"
              tick={{ fill: "#ccc" }}
              tickCount={6}
              interval={0}
              domain={['auto', 'auto']}
              tickFormatter={(value) => `${Math.round(value)}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #38bdf8",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#facc15", fontWeight: "bold" }}
              formatter={(value: number, name: string, props) => {
                const tendencia = props.payload?.tendencia || "";
                return [
                  `${value.toFixed(2)} unidades`,
                  `Valor estimado ${tendencia ? `(${tendencia})` : ""}`,
                ];
              }}
            />

            <Line
              type="monotone"
              dataKey="valor"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={{
                r: 6,
                stroke: "#0ea5e9",
                strokeWidth: 2,
                fill: "#38bdf8",
              }}
              activeDot={{ r: 8, fill: "#facc15" }}
            />

            <ReferenceDot
              x="Actual"
              y={prediccion.actual}
              r={8}
              fill="#facc15"
              stroke="#fbbf24"
              label={{
                value: "📍 Hoy",
                position: "top",
                fill: "#facc15",
                fontWeight: "bold",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
