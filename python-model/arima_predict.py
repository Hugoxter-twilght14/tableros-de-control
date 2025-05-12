import sys
import json
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

try:
    data = json.load(sys.stdin)

    if not data or len(data) < 3:
        print(json.dumps({"error": "No hay datos suficientes para predecir."}))
        sys.exit()

    df = pd.DataFrame(data)
    df['mes'] = pd.to_datetime(df['mes'])
    df.set_index('mes', inplace=True)
    df = df.asfreq('MS')  # frecuencia mensual
    df.fillna(0, inplace=True)

    df['totalExistencias'] = pd.to_numeric(df['totalExistencias'], errors='coerce')  # 🔧 aseguramos que sea numérico
    df.dropna(inplace=True)  # quitamos filas con NaN si las hubo tras la conversión


    modelo = ARIMA(df['totalExistencias'], order=(1, 1, 1))
    modelo_fit = modelo.fit()

    n_predicciones = 7
    pred = modelo_fit.forecast(steps=n_predicciones)

    inicio = df.index[-1] + pd.DateOffset(months=1)
    fechas = [inicio + pd.DateOffset(months=i) for i in range(n_predicciones)]
    fechas_str = [f.strftime('%B') for f in fechas]

    print(json.dumps({
    "meses": fechas_str,
    "valores": [float(v) for v in pred.tolist()],
    "actual": int(df['totalExistencias'].iloc[-1])
    }))


except Exception as e:
    print(json.dumps({"error": f"Python error: {str(e)}"}))
    sys.exit()
