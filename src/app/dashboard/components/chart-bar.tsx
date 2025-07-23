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

const chartData = [
  { unidade: "CROP", validos: 89, vencendo: 8, vencidos: 3 },
  { unidade: "SEEDS-R&D", validos: 65, vencendo: 6, vencidos: 2 },
  { unidade: "SEEDS", validos: 78, vencendo: 5, vencidos: 2 },
  { unidade: "DIGITAL", validos: 45, vencendo: 4, vencidos: 1 },
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
  const percentualValidos = ((totalValidos / totalDocumentos) * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos por Unidade</CardTitle>
        <CardDescription>
          Status atual dos documentos (PGR, LTCAT, PPR, L.I, L.P, PCMSO, R.A)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="unidade"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
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
          Total de {totalDocumentos} documentos monitorados
        </div>
      </CardFooter>
    </Card>
  );
}
