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
    const añoActual = hoy.getFullYear();
    const mesActual = (hoy.getMonth() + 1).toString().padStart(2, "0");

    const datos = await db.$queryRawUnsafe<Dato[]>(`
      SELECT
        DATE_FORMAT(fechaIngreso, '%Y-%m') AS mes,
        SUM(existenciaFisica) AS totalExistencias
      FROM refacciones_l3
      WHERE fechaIngreso < '${añoActual}-${mesActual}-01'
      GROUP BY mes
      ORDER BY mes;
    `);

    console.log("🔍 Datos recuperados de BD:", datos);

    if (!Array.isArray(datos) || datos.length < 3) {
      return NextResponse.json({ mensaje: "No hay datos suficientes para predecir." }, {
        headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" }
      });
    }

    const py = spawn("python", ["./python-model/arima_predict.py"]);
    const jsonData = JSON.stringify(datos);

    console.log("📤 Enviando a Python:", jsonData);
    py.stdin.write(jsonData);
    py.stdin.end();

    let resultado = "";

    py.stdout.on("data", (data) => {
      resultado += data.toString();
    });

    return await new Promise((resolve, reject) => {
      py.on("close", () => {
        try {
          console.log("📥 Resultado del script:", resultado);
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
    console.error("🔥 Fallo en el backend:", error);
    return NextResponse.json({ mensaje: "Error general del servidor" }, {
      headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" }
    });
  }
}
