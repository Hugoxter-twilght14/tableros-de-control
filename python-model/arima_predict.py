import sys
import json
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA

# Configura consola para UTF-8 (Windows)
try:
    sys.stdout.reconfigure(encoding='utf-8')
except:
    pass

try:
    input_data = json.load(sys.stdin)

    historico = input_data.get("historico", [])
    if not historico or len(historico) < 10:
        json.dump({"error": "No hay suficientes datos históricos para validar."}, sys.stdout)
        sys.exit()

    # Crear DataFrame y rellenar huecos
    df = pd.DataFrame(historico)
    df['mes'] = pd.to_datetime(df['mes'], errors='coerce')
    df.set_index('mes', inplace=True)
    df = df.asfreq('MS')  # frecuencia mensual
    df['totalExistencias'] = pd.to_numeric(df['totalExistencias'], errors='coerce')
    df['totalExistencias'].fillna(method='ffill', inplace=True)
    df.dropna(inplace=True)

    ultimos_meses = df.index[-7:]
    resultados = []

    for mes_objetivo in ultimos_meses:
        datos_entrenamiento = df[df.index < mes_objetivo]

        if len(datos_entrenamiento) < 3:
            print(f"[Aviso] Saltando {mes_objetivo.strftime('%Y-%m')} por historial insuficiente", file=sys.stderr)
            continue

        try:
            modelo = ARIMA(datos_entrenamiento['totalExistencias'], order=(2, 1, 2))
            modelo_fit = modelo.fit()
            prediccion = float(modelo_fit.forecast(steps=1)[0])

            real = df.loc[mes_objetivo, 'totalExistencias']
            efectividad = max(0, 100 - abs(real - prediccion) / real * 100)

            resultados.append({
                "mes": mes_objetivo.strftime('%B %Y'),
                "valor_real": float(real),
                "valor_predicho": round(prediccion, 2),
                "efectividad": round(efectividad, 2)
            })

        except Exception as model_error:
            print(f"[Error] Fallo al modelar {mes_objetivo.strftime('%Y-%m')}: {model_error}", file=sys.stderr)

    # Mostrar efectividad como tabla clara en consola
    if resultados:
        print("\n📊 Efectividad histórica por mes:", file=sys.stderr)
        print(f"{'Mes':<20} {'Real':>10} {'Predicho':>12} {'Efectividad':>14}", file=sys.stderr)
        print("-" * 60, file=sys.stderr)
        for r in resultados:
            print(f"{r['mes']:<20} {r['valor_real']:>10.2f} {r['valor_predicho']:>12.2f} {r['efectividad']:>13.2f}%", file=sys.stderr)
    else:
        print("⚠️  No se pudo calcular efectividad para ningún mes.", file=sys.stderr)

    # Predicción hacia el futuro
    modelo_final = ARIMA(df['totalExistencias'], order=(2, 1, 2))
    modelo_final_fit = modelo_final.fit()
    n_predicciones = 7
    forecast = modelo_final_fit.forecast(steps=n_predicciones)

    inicio = df.index[-1] + pd.DateOffset(months=1)
    fechas = [inicio + pd.DateOffset(months=i) for i in range(n_predicciones)]
    fechas_str = [f.strftime('%B') for f in fechas]

    # Salida final JSON para el backend/frontend
    json.dump({
        "efectividades_historicas": resultados,
        "actual": int(df['totalExistencias'].iloc[-1]),
        "meses": fechas_str,
        "valores": [float(v) for v in forecast.tolist()]
    }, sys.stdout)

except Exception as e:
    json.dump({"error": f"Python error: {str(e)}"}, sys.stdout)
    sys.exit()
