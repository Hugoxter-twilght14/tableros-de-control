import { NextResponse } from "next/server";
import { spawn, spawnSync } from "child_process";
import path from "path";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
type Dato = {
  mes: string;
  totalExistencias: number;
};

// Detecta si 'python3' o 'python' está disponible
function findPythonCmd(): string {
  const cmds = ["python3", "python"];
  for (const cmd of cmds) {
    const result = spawnSync(cmd, ["--version"]);
    if (!result.error) return cmd;
  }
  throw new Error("No se encontró Python en el PATH");
}

function runPythonScript(payload: any): Promise<Response> {
  return new Promise((resolve, reject) => {
    const pythonCmd = findPythonCmd();

    // Ruta absoluta al script Python (modifica si tu carpeta difiere)
    const scriptPath = path.resolve(process.cwd(), "python-model", "arima_predict.py");

    const py = spawn(pythonCmd, [scriptPath]);

    py.stdin.write(JSON.stringify(payload));
    py.stdin.end();

    let resultado = "";

    py.stdout.on("data", (data) => {
      resultado += data.toString();
      console.log("🐍 Mensaje Python:", data.toString());
    });

    py.on("close", () => {
      try {
        const respuesta = JSON.parse(resultado);
        resolve(
          NextResponse.json(respuesta, {
            headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
          })
        );
      } catch (e) {
        console.error("❌ Error al parsear JSON del script:", e);
        resolve(
          NextResponse.json(
            { mensaje: "Error al procesar la predicción" },
            { headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" } }
          )
        );
      }
    });

    py.on("error", (err) => {
      console.error("💥 Error ejecutando Python:", err);
      reject(
        NextResponse.json(
          { mensaje: "Error interno del servidor" },
          { headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" } }
        )
      );
    });
  });
}

export async function GET(): Promise<Response> {
  try {
    const hoy = new Date();
    const currentMonth = hoy.toISOString().slice(0, 7); // formato YYYY-MM

    // Obtener datos históricos acumulados (PostgreSQL)
    const datosMensuales = await db.$queryRawUnsafe<Dato[]>(`
      SELECT
        to_char("fechaIngreso", 'YYYY-MM') AS mes,
        SUM("existenciaFisica") AS "totalExistencias"
      FROM refacciones_l3
      WHERE to_char("fechaIngreso", 'YYYY-MM') < '${currentMonth}'
      GROUP BY mes
      ORDER BY mes;
    `);

    if (!Array.isArray(datosMensuales) || datosMensuales.length < 3) {
      return NextResponse.json(
        { mensaje: "No hay datos suficientes para predecir." },
        { headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" } }
      );
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

    // Obtener valores reales futuros alineados con la predicción (PostgreSQL)
    const valoresReales = await db.$queryRawUnsafe<Dato[]>(`
      SELECT
        to_char("fechaIngreso", 'YYYY-MM') AS mes,
        SUM("existenciaFisica") AS "totalExistencias"
      FROM refacciones_l3
      WHERE to_char("fechaIngreso", 'YYYY-MM') >= (
        SELECT to_char(MAX("fechaIngreso") + interval '1 month', 'YYYY-MM')
        FROM refacciones_l3
      )
      GROUP BY mes
      ORDER BY mes
      LIMIT 7;
    `);

    const payload = {
      historico: datosAcumulados,
      reales: valoresReales,
    };

    return await runPythonScript(payload);
  } catch (error) {
    console.error("🔥 Fallo en la predicción general:", error);
    return NextResponse.json(
      { mensaje: "Error general del servidor" },
      { headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" } }
    );
  }
}
