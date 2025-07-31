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

// DADOS REAIS - Evolução mensal do absenteísmo
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

// DADOS REAIS - Absenteísmo por unidade
const absenteismoPorUnidade = [
  { unidade: "SYNGENTA DIGITAL LTDA", taxa: 307.16, funcionarios: 120 },
  { unidade: "AGRO JANGADA LTDA", taxa: 277.14, funcionarios: 85 },
  { unidade: "SYNGENTA PROTEÇÃO DE CULTIVOS LTDA", taxa: 54.22, funcionarios: 250 },
  { unidade: "SYNGENTA SEEDS LTDA", taxa: 39.38, funcionarios: 180 },
  { unidade: "SYNGENTA SEEDS LTDA - DIVISÃO AGRICOLA", taxa: 37.58, funcionarios: 150 },
  { unidade: "SYNGENTA DIVISÃO AGRICOLA CROP", taxa: 31.49, funcionarios: 200 },
];

const chartConfig = {
  taxa: { label: "Taxa (%)", color: "#ef4444" },
  meta: { label: "Meta (%)", color: "#94a3b8" },
} satisfies ChartConfig;

export function AbsenteismoCard() {
  const mediaGeral =
    absenteismoPorUnidade.reduce((acc, item) => acc + item.taxa, 0) /
    absenteismoPorUnidade.length;

  // Pega a taxa mais recente (Jul/25)
  const taxaAtual = absenteismoData[absenteismoData.length - 1].taxa;
  const taxaAnterior = absenteismoData[absenteismoData.length - 2].taxa;
  const variacao = ((taxaAtual - taxaAnterior) / taxaAnterior * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Absenteísmo por Doença</CardTitle>
        <CardDescription>
          Evolução da taxa de absenteísmo e distribuição por unidade
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-2">Evolução Mensal</h4>
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
          <h4 className="text-sm font-medium mb-3">Por Unidade</h4>
          <div className="space-y-3">
            {absenteismoPorUnidade.map((item) => (
              <div
                key={item.unidade}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium text-sm">{item.unidade}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.funcionarios} funcionários
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-lg font-bold ${
                      item.taxa <= 4.0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.taxa.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Média geral: {mediaGeral.toFixed(2)}%{" "}
          <TrendingDown className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Variação mensal: {variacao}% | Meta: manter abaixo de 4% ao mês
        </div>
      </CardFooter>
    </Card>
  );
}
