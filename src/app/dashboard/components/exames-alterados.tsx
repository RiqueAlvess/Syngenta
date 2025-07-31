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

// DADOS REAIS - Exames por unidade (filtrados para mostrar apenas as principais unidades)
const examesData = [
  { 
    unidade: "SYNGENTA PROTEÇÃO DE CULTIVOS", 
    normais: 14534, 
    alterados: 1399, 
    total: 15933 
  },
  { 
    unidade: "SYNGENTA SEEDS LTDA - DIVISÃO", 
    normais: 3215, 
    alterados: 44, 
    total: 3259 
  },
  { 
    unidade: "SYNGENTA SEEDS LTDA", 
    normais: 2057, 
    alterados: 47, 
    total: 2104 
  },
  { 
    unidade: "SYNGENTA DIVISÃO AGRICOLA CROP", 
    normais: 919, 
    alterados: 20, 
    total: 939 
  },
  { 
    unidade: "SYNGENTA COMERCIAL AGRÍCOLA", 
    normais: 655, 
    alterados: 27, 
    total: 682 
  },
  { 
    unidade: "AGRO JANGADA LTDA", 
    normais: 489, 
    alterados: 16, 
    total: 505 
  },
  { 
    unidade: "AGROCERRADO PRODUTOS AGRÍCOLAS", 
    normais: 407, 
    alterados: 5, 
    total: 412 
  },
  { 
    unidade: "DIPAGRO LTDA", 
    normais: 324, 
    alterados: 1, 
    total: 325 
  },
  { 
    unidade: "SYNGENTA DIGITAL LTDA", 
    normais: 272, 
    alterados: 2, 
    total: 274 
  },
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

  // Dados de resumo baseados nos totais reais
  const resumoExames = {
    total: 24514, // Total informado nos dados originais
    alterados: 1561, // Soma dos alterados das principais unidades
    normais: 22953 // Diferença
  };

  const percentualGeralAlterados = ((resumoExames.alterados / resumoExames.total) * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exames Alterados por Unidade</CardTitle>
        <CardDescription>
          Distribuição de exames normais vs alterados (Total: {resumoExames.total.toLocaleString()} exames)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-700">
              {percentualGeralAlterados}%
            </div>
            <div className="text-sm text-orange-600">
              {resumoExames.alterados.toLocaleString()} de {resumoExames.total.toLocaleString()} exames alterados
            </div>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="w-full">
          <BarChart data={examesData} margin={{ left: 12, right: 12, bottom: 60 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="unidade"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 10 }}
              interval={0}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tickMargin={8} 
              tick={{ fontSize: 10 }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent 
                  indicator="dashed"
                  formatter={(value, name) => [
                    `${Number(value).toLocaleString()}`,
                    name === "normais" ? "Normais" : "Alterados"
                  ]}
                />
              }
            />
            <Bar dataKey="normais" fill="var(--color-normais)" radius={4} />
            <Bar dataKey="alterados" fill="var(--color-alterados)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {percentualGeralAlterados}% de exames alterados <TrendingDown className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Meta: manter abaixo de 10% de exames alterados | Tipos de exames distintos: 68
        </div>
      </CardFooter>
    </Card>
  );
}
