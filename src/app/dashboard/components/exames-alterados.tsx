"use client";

import { TrendingDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

const examesData = [
  { unidade: "CROP", normais: 78, alterados: 7, total: 85 },
  { unidade: "SEEDS-R&D", normais: 65, alterados: 5, total: 70 },
  { unidade: "SEEDS", normais: 82, alterados: 8, total: 90 },
  { unidade: "DIGITAL", normais: 59, alterados: 8, total: 67 },
];

const chartConfig = {
  normais: { label: "Normais", color: "#22c55e" },
  alterados: { label: "Alterados", color: "#ef4444" },
} satisfies ChartConfig;

export function ExamesAlterados() {
  const totalExames = examesData.reduce((acc, item) => acc + item.total, 0);
  const totalAlterados = examesData.reduce(
    (acc, item) => acc + item.alterados,
    0
  );
  const percentualAlterados = ((totalAlterados / totalExames) * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exames Alterados por Unidade</CardTitle>
        <CardDescription>
          Distribuição de exames normais vs alterados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-700">
              {percentualAlterados}%
            </div>
            <div className="text-sm text-orange-600">
              {totalAlterados} de {totalExames} exames alterados
            </div>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="w-full">
          <BarChart data={examesData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="unidade"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="normais" fill="var(--color-normais)" radius={4} />
            <Bar dataKey="alterados" fill="var(--color-alterados)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          -1.2% em relação ao mês anterior <TrendingDown className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Meta: manter abaixo de 10% de exames alterados
        </div>
      </CardFooter>
    </Card>
  );
}
