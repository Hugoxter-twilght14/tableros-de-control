import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const filtro = url.searchParams.get("filtro");

    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7); // 'YYYY-MM'

    const datosKPI: any[] = await db.$queryRawUnsafe(`
      SELECT
        SUM("existenciaFisica") AS "totalExistencias",
        AVG("existenciaFisica") AS "promedioExistencias",
        SUM(CASE WHEN "existenciaFisica" = 0 THEN 1 ELSE 0 END) AS "existenciasCero",
        SUM(CASE WHEN "existenciaFisica" BETWEEN 1 AND 5 THEN 1 ELSE 0 END) AS "existenciasCriticas",
        COUNT(CASE WHEN "existenciaFisica" < 10 THEN 1 ELSE NULL END) AS "existenciasBajo10"
      FROM refacciones_l3;
    `);

    const {
      totalExistencias,
      promedioExistencias,
      existenciasCero,
      existenciasCriticas,
      existenciasBajo10
    } = datosKPI[0] ?? {};

    const resultKPI = {
      totalExistencias: Number(totalExistencias) ?? 0,
      promedio: Number(promedioExistencias) ?? 0,
      existenciasCero: Number(existenciasCero) ?? 0,
      existenciasCriticas: Number(existenciasCriticas) ?? 0,
      existenciasBajo10: Number(existenciasBajo10) ?? 0
    };

    // Construcción de condición para filtro con sintaxis PostgreSQL
    let condicion = `WHERE to_char("fechaIngreso", 'YYYY-MM') < '${currentMonth}'`;

    if (filtro) {
      if (/^\d{4}$/.test(filtro)) {
        condicion = `WHERE EXTRACT(YEAR FROM "fechaIngreso") = ${filtro}`;
      } else if (/^\d{4}-\d{2}$/.test(filtro)) {
        condicion = `WHERE to_char("fechaIngreso", 'YYYY-MM') = '${filtro}'`;
      } else if (/^\d{2}$/.test(filtro)) {
        condicion = `WHERE to_char("fechaIngreso", 'MM') = '${filtro}'`;
      } else {
        condicion = `WHERE "codigo" = '${filtro}'`;
      }
    }

    const datosHistoricos: any[] = await db.$queryRawUnsafe(`
      SELECT
        to_char("fechaIngreso", 'YYYY-MM') AS mes,
        SUM("existenciaFisica") AS "totalMes",
        MAX("codigo") AS codigo,
        MAX(descripcion) AS descripcion
      FROM refacciones_l3
      ${condicion}
      GROUP BY mes
      ORDER BY mes;
    `);

    const etiquetas: string[] = [];
    const valoresAcumulados: number[] = [];
    const valoresPorMes: number[] = [];
    const meta = [];
    let acumulado = 0;

    for (const fila of datosHistoricos) {
      const totalMes = Number(fila.totalMes);
      acumulado += totalMes;
      etiquetas.push(fila.mes);
      valoresAcumulados.push(acumulado);
      valoresPorMes.push(totalMes);
      meta.push({
        existencia: totalMes,
        codigo: fila.codigo,
        descripcion: fila.descripcion
      });
    }

    if (!filtro) {
      const valorMesActual = Number(totalExistencias) - acumulado;
      etiquetas.push(currentMonth);
      valoresPorMes.push(valorMesActual);
      valoresAcumulados.push(Number(totalExistencias));
      meta.push({ existencia: valorMesActual, codigo: 'TOTAL', descripcion: 'Total acumulado' });
    }

    const chartDataset = {
      labels: etiquetas,
      datasets: [
        {
          label: "Existencias Totales Acumuladas",
          data: valoresAcumulados,
          meta,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: false
        }
      ]
    };

    return NextResponse.json({
      kpi: resultKPI,
      barChart: chartDataset,
      lineChart: chartDataset
    });
  } catch (error) {
    console.error("Error al obtener los datos", error);
    return NextResponse.json({
      mensaje: "Error al obtener datos",
      error: (error as Error).message
    });
  }
}
