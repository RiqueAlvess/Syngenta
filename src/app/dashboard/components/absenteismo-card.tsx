"use client";

import { TrendingDown } from "lucide-react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// DADOS REAIS - Evolução mensal do absenteísmo (mantendo os dados históricos já fornecidos)
const absenteismoData = [
  { mes: "Jul/24", taxa: 103.93, meta: 4.0 },
  { mes: "Set/24", taxa: 369.52, meta: 4.0 },
  { mes: "Out/24", taxa: 71.59, meta: 4.0 },
  { mes: "Nov/24", taxa: 151.27, meta: 4.0 },
  { mes: "Dez/24", taxa: 108.22, meta: 4.0 },
  { mes: "Jan/25", taxa: 41.92, meta: 4.0 },
  { mes: "Fev/25", taxa: 28.13, meta: 4.0 },
  { mes: "Mar/25", taxa: 23.09, meta: 4.0 },
  { mes: "Abr/25", taxa: 32.76, meta: 4.0 },
  { mes: "Mai/25", taxa: 23.90, meta: 4.0 },
  { mes: "Jun/25", taxa: 13.99, meta: 4.0 },
  { mes: "Jul/25", taxa: 9.43, meta: 4.0 },
];

// DADOS REAIS - Taxa Anual por unidade (DADOS CORRETOS)
const absenteismoPorUnidade = [
  { 
    unidade: "SYNGENTA DIGITAL LTDA", 
    taxa: 25.58, 
    funcionarios: 2,
    diasAfastados: 133,
    taxaAnual: 25.58
  },
  { 
    unidade: "AGRO JANGADA LTDA", 
    taxa: 23.08, 
    funcionarios: 1,
    diasAfastados: 60,
    taxaAnual: 23.08
  },
  { 
    unidade: "SYNGENTA PROTEÇÃO DE CULTIVOS LTDA", 
    taxa: 4.51, 
    funcionarios: 527,
    diasAfastados: 6186,
    taxaAnual: 4.51
  },
  { 
    unidade: "SYNGENTA SEEDS LTDA", 
    taxa: 3.28, 
    funcionarios: 154,
    diasAfastados: 1313,
    taxaAnual: 3.28
  },
  { 
    unidade: "SYNGENTA SEEDS LTDA - DIVISÃO AGRICOLA", 
    taxa: 3.13, 
    funcionarios: 44,
    diasAfastados: 358,
    taxaAnual: 3.13
  },
  { 
    unidade: "SYNGENTA DIVISÃO AGRICOLA CROP", 
    taxa: 2.62, 
    funcionarios: 11,
    diasAfastados: 75,
    taxaAnual: 2.62
  },
];

const chartConfig = {
  taxa: { label: "Taxa (%)", color: "#ef4444" },
  meta: { label: "Meta (%)", color: "#94a3b8" },
} satisfies ChartConfig;

export function AbsenteismoCard() {
  // Cálculos baseados nos dados reais
  const mediaGeral = 10.37; // Taxa média geral fornecida
  const taxaMaxima = 25.58; // Taxa máxima fornecida
  const taxaMinima = 2.62; // Taxa mínima fornecida

  // Total de funcionários e dias afastados
  const totalFuncionarios = absenteismoPorUnidade.reduce((acc, item) => acc + item.funcionarios, 0);
  const totalDiasAfastados = absenteismoPorUnidade.reduce((acc, item) => acc + item.diasAfastados, 0);

  // Pega a taxa mais recente da evolução mensal (Jul/25)
  const taxaAtual = absenteismoData[absenteismoData.length - 1].taxa;
  const taxaAnterior = absenteismoData[absenteismoData.length - 2].taxa;
  const variacao = ((taxaAtual - taxaAnterior) / taxaAnterior * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Absenteísmo por Doença</CardTitle>
        <CardDescription>
          Taxa anual por unidade e evolução mensal (dados de 2,036 registros válidos)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resumo geral */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="text-center">
            <div className="text-xl font-bold text-red-700">{mediaGeral}%</div>
            <div className="text-sm text-red-600">Taxa Média Geral</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-red-700">{totalFuncionarios}</div>
            <div className="text-sm text-red-600">Funcionários</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-red-700">{totalDiasAfastados.toLocaleString()}</div>
            <div className="text-sm text-red-600">Dias Afastados</div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Evolução Mensal (Tendência)</h4>
          <ChartContainer config={chartConfig} className="w-full h-[200px]">
            <LineChart data={absenteismoData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="mes"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 10 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[0, 400]}
                tick={{ fontSize: 10 }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => [`${Number(value).toFixed(2)}%`, name]}
                  />
                }
              />
              <Line
                dataKey="taxa"
                type="monotone"
                stroke="var(--color-taxa)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                dataKey="meta"
                type="monotone"
                stroke="var(--color-meta)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Taxa Anual por Unidade</h4>
          <div className="space-y-3">
            {absenteismoPorUnidade.map((item) => (
              <div
                key={item.unidade}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium text-sm">{item.unidade}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.funcionarios} funcionários • {item.diasAfastados} dias afastados
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-lg font-bold ${
                      item.taxa <= 4.0 ? "text-green-600" : item.taxa <= 10.0 ? "text-yellow-600" : "text-red-600"
                    }`}
                  >
                    {item.taxa.toFixed(2)}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Taxa anual
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Variação mensal: {variacao}% | Faixa: {taxaMinima}% - {taxaMaxima}%{" "}
          <TrendingDown className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Meta: manter abaixo de 4% ao ano | Base: 7.830 registros totais, 2.036 válidos
        </div>
      </CardFooter>
    </Card>
  );
}
