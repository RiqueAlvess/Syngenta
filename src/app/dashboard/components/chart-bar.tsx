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

interface ChartBarDocumentosProps {
  data: any;
}

const chartConfig = {
  validos: { label: "Válidos", color: "#22c55e" },
  vencendo: { label: "Vencendo", color: "#f59e0b" },
  vencidos: { label: "Vencidos", color: "#ef4444" },
} satisfies ChartConfig;

export function ChartBarDocumentos({ data }: ChartBarDocumentosProps) {
  const chartData = data.indicadores.seguranca.documentos.porUnidade.map((item: any) => ({
    unidade: item.nomeUnidade.split(' ')[1] || item.nomeUnidade, // Pega só a segunda palavra (CROP, SEEDS, etc)
    validos: item.validos,
    vencendo: item.vencendo,
    vencidos: item.vencidos
  }));

  const totalDocumentos = chartData.reduce(
    (acc: number, item: any) => acc + item.validos + item.vencendo + item.vencidos,
    0
  );
  const totalValidos = chartData.reduce((acc: number, item: any) => acc + item.validos, 0);
  const percentualValidos = ((totalValidos / totalDocumentos) * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos por Unidade</CardTitle>
        <CardDescription>
          Status atual dos documentos ({data.indicadores.seguranca.documentos.tipos.join(', ')})
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
