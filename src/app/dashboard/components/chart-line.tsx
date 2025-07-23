"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
  { mes: "Jan", visitas: 32, meta: 38 },
  { mes: "Fev", visitas: 35, meta: 38 },
  { mes: "Mar", visitas: 39, meta: 38 },
  { mes: "Abr", visitas: 42, meta: 38 },
  { mes: "Mai", visitas: 38, meta: 38 },
  { mes: "Jun", visitas: 42, meta: 38 },
];

const chartConfig = {
  visitas: { label: "Realizadas", color: "#22c55e" },
  meta: { label: "Meta", color: "#94a3b8" },
} satisfies ChartConfig;

export function ChartLineVisitas() {
  const mediaVisitas =
    chartData.reduce((acc, item) => acc + item.visitas, 0) / chartData.length;
  const metaMensal = chartData[0].meta;
  const atingimentoMeta = ((mediaVisitas / metaMensal) * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendência de Visitas</CardTitle>
        <CardDescription>Visitas realizadas vs meta mensal</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="visitas"
              type="monotone"
              stroke="var(--color-visitas)"
              strokeWidth={3}
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
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Atingimento da meta: {atingimentoMeta}%{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Meta mensal: {metaMensal} visitas | Média realizada:{" "}
              {mediaVisitas.toFixed(1)}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
