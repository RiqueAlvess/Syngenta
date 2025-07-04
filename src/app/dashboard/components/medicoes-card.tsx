"use client";

import { TrendingUp } from "lucide-react";
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

const medicoesData = [
  { unidade: "CROP", solicitadas: 25, realizadas: 23, percentual: 92 },
  { unidade: "SEEDS-R&D", solicitadas: 18, realizadas: 17, percentual: 94.4 },
  { unidade: "SEEDS", solicitadas: 22, realizadas: 20, percentual: 90.9 },
  { unidade: "DIGITAL", solicitadas: 20, realizadas: 16, percentual: 80 },
];

const tiposMedicoes = [
  { tipo: "Ruído Ocupacional", realizadas: 32, total: 35 },
  { tipo: "Agentes Químicos", realizadas: 28, total: 30 },
  { tipo: "Temperatura/Calor", realizadas: 16, total: 20 },
];

const chartConfig = {
  solicitadas: { label: "Solicitadas", color: "#94a3b8" },
  realizadas: { label: "Realizadas", color: "#22c55e" },
} satisfies ChartConfig;

export function MedicoesCard() {
  const totalSolicitadas = medicoesData.reduce(
    (acc, item) => acc + item.solicitadas,
    0
  );
  const totalRealizadas = medicoesData.reduce(
    (acc, item) => acc + item.realizadas,
    0
  );
  const percentualGeral = ((totalRealizadas / totalSolicitadas) * 100).toFixed(
    1
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medições Ambientais</CardTitle>
        <CardDescription>
          Total de medições solicitadas vs realizadas por unidade
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">
              {totalSolicitadas}
            </div>
            <div className="text-sm text-green-600">Solicitadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">
              {totalRealizadas}
            </div>
            <div className="text-sm text-green-600">Realizadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">
              {percentualGeral}%
            </div>
            <div className="text-sm text-green-600">Taxa Execução</div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Por Unidade</h4>
          <ChartContainer config={chartConfig} className="w-full">
            <BarChart data={medicoesData} margin={{ left: 12, right: 12 }}>
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
              <Bar
                dataKey="solicitadas"
                fill="var(--color-solicitadas)"
                radius={4}
              />
              <Bar
                dataKey="realizadas"
                fill="var(--color-realizadas)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Por Tipo de Medição</h4>
          <div className="space-y-3">
            {tiposMedicoes.map((item) => {
              const percentual = ((item.realizadas / item.total) * 100).toFixed(
                1
              );
              return (
                <div
                  key={item.tipo}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-sm">{item.tipo}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.realizadas}/{item.total} realizadas
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-lg font-bold ${
                        Number(percentual) >= 90
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {percentual}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          +5.2% em relação ao mês anterior <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Meta: ≥ 90% das medições solicitadas realizadas
        </div>
      </CardFooter>
    </Card>
  );
}
