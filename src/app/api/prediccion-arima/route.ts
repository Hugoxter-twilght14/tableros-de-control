import { NextResponse } from "next/server";
import { spawn } from "child_process";
import { db } from "@/lib/db";

type Dato = {
  mes: string;
  totalExistencias: number;
};

export async function GET() {
  try {
    const hoy = new Date();
    const currentMonth = hoy.toISOString().slice(0, 7); // formato YYYY-MM

    // Obtener existencias físicas agrupadas por mes de ingreso
    const datosMensuales = await db.$queryRawUnsafe<Dato[]>(`
      SELECT
        DATE_FORMAT(fechaIngreso, '%Y-%m') AS mes,
        SUM(existenciaFisica) AS totalExistencias
      FROM refacciones_l3
      WHERE DATE_FORMAT(fechaIngreso, '%Y-%m') < '${currentMonth}'
      GROUP BY mes
      ORDER BY mes;
    `);

    if (!Array.isArray(datosMensuales) || datosMensuales.length < 3) {
      return NextResponse.json({ mensaje: "No hay datos suficientes para predecir." }, {
        headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" }
      });
    }

    // Calcular acumulado mensual
    const datosAcumulados: Dato[] = [];
    let acumulado = 0;

    for (const fila of datosMensuales) {
      const cantidad = Number(fila.totalExistencias);
      acumulado += cantidad;
      datosAcumulados.push({
        mes: fila.mes,
        totalExistencias: acumulado,
      });
    }

    console.log("📤 Enviando a Python (acumulado):", datosAcumulados);

    const py = spawn("python", ["./python-model/arima_predict.py"]);
    py.stdin.write(JSON.stringify(datosAcumulados));
    py.stdin.end();

    let resultado = "";

    py.stdout.on("data", (data) => {
      resultado += data.toString();
    });

    return await new Promise((resolve, reject) => {
      py.on("close", () => {
        try {
          const respuesta = JSON.parse(resultado);
          resolve(NextResponse.json(respuesta, {
            headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" }
          }));
        } catch (e) {
          console.error("❌ Error al parsear JSON del script:", e);
          resolve(NextResponse.json({ mensaje: "Error al procesar la predicción" }, {
            headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" }
          }));
        }
      });

      py.on("error", (err) => {
        console.error("💥 Error ejecutando Python:", err);
        reject(NextResponse.json({ mensaje: "Error interno del servidor" }, {
          headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" }
        }));
      });
    });

  } catch (error) {
    console.error("🔥 Fallo en la predicción general:", error);
    return NextResponse.json({ mensaje: "Error general del servidor" }, {
      headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" }
    });
  }
}
