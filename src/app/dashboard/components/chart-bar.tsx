"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

// DADOS REAIS - Documentos por unidade
// Nota: Os dados originais tinham códigos numéricos, convertidos para nomes mais legíveis
const chartData = [
  { unidade: "Unidade 655296", validos: 3, vencendo: 0, vencidos: 2 },
  { unidade: "Unidade 655298", validos: 6, vencendo: 0, vencidos: 3 },
  { unidade: "Unidade 768872", validos: 1, vencendo: 0, vencidos: 0 },
  { unidade: "Grupo Syngenta", validos: 0, vencendo: 0, vencidos: 1 },
];

const chartConfig = {
  validos: { label: "Válidos", color: "#22c55e" },
  vencendo: { label: "Vencendo", color: "#f59e0b" },
  vencidos: { label: "Vencidos", color: "#ef4444" },
} satisfies ChartConfig;

export function ChartBarDocumentos() {
  const totalDocumentos = chartData.reduce(
    (acc, item) => acc + item.validos + item.vencendo + item.vencidos,
    0
  );
  const totalValidos = chartData.reduce((acc, item) => acc + item.validos, 0);
  const totalVencidos = chartData.reduce((acc, item) => acc + item.vencidos, 0);
  const percentualValidos = totalDocumentos > 0 ? ((totalValidos / totalDocumentos) * 100).toFixed(1) : "0.0";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos por Unidade</CardTitle>
        <CardDescription>
          Status atual dos documentos (PGR, LTCAT, PPR, L.I, L.P, PCMSO, R.A)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Resumo geral */}
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-700">{totalValidos}</div>
              <div className="text-xs text-green-600">Válidos</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-700">{totalVencidos}</div>
              <div className="text-xs text-red-600">Vencidos</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-700">{totalDocumentos}</div>
              <div className="text-xs text-blue-600">Total</div>
            </div>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="unidade"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent 
                  indicator="dashed"
                  formatter={(value, name) => [
                    `${Number(value)}`,
                    name === "validos" ? "Válidos" : 
                    name === "vencendo" ? "Vencendo" : "Vencidos"
                  ]}
                />
              }
            />
            <Bar dataKey="validos" fill="var(--color-validos)" radius={4} />
            <Bar dataKey="vencendo" fill="var(--color-vencendo)" radius={4} />
            <Bar dataKey="vencidos" fill="var(--color-vencidos)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {percentualValidos}% dos documentos válidos{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Total de {totalDocumentos} documentos monitorados | {totalVencidos} documentos vencidos precisam de atenção
        </div>
      </CardFooter>
    </Card>
  );
}
