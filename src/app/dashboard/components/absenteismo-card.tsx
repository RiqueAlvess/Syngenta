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

const absenteismoData = [
  { mes: "Jan", taxa: 4.2, meta: 4.0 },
  { mes: "Fev", taxa: 3.8, meta: 4.0 },
  { mes: "Mar", taxa: 3.5, meta: 4.0 },
  { mes: "Abr", taxa: 3.9, meta: 4.0 },
  { mes: "Mai", taxa: 3.1, meta: 4.0 },
  { mes: "Jun", taxa: 3.2, meta: 4.0 },
];

const absenteismoPorUnidade = [
  { unidade: "SYNGENTA CROP", taxa: 2.8, funcionarios: 145 },
  { unidade: "SYNGENTA SEEDS-R&D", taxa: 3.1, funcionarios: 89 },
  { unidade: "SYNGENTA SEEDS", taxa: 3.5, funcionarios: 178 },
  { unidade: "SYNGENTA DIGITAL", taxa: 3.8, funcionarios: 112 },
];

const chartConfig = {
  taxa: { label: "Taxa (%)", color: "#ef4444" },
  meta: { label: "Meta (%)", color: "#94a3b8" },
} satisfies ChartConfig;

export function AbsenteismoCard() {
  const mediaGeral =
    absenteismoPorUnidade.reduce((acc, item) => acc + item.taxa, 0) /
    absenteismoPorUnidade.length;

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
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[0, 5]}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => [`${value}%`, name]}
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
                    {item.taxa}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Média geral: {mediaGeral.toFixed(1)}%{" "}
          <TrendingDown className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Meta: manter abaixo de 4% ao mês
        </div>
      </CardFooter>
    </Card>
  );
}
