"use client";

import { TrendingDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// DADOS REAIS - Taxa Anual exata por unidade
const absenteismoPorUnidade = [
  { 
    unidade: "SYNGENTA DIGITAL LTDA", 
    taxa: 25.576923076923073
  },
  { 
    unidade: "AGRO JANGADA LTDA", 
    taxa: 23.076923076923077
  },
  { 
    unidade: "SYNGENTA PROTECAO DE CULTIVOS LTDA", 
    taxa: 4.514669391329733
  },
  { 
    unidade: "SYNGENTA SEEDS LTDA", 
    taxa: 3.279220779220779
  },
  { 
    unidade: "SYNGENTA SEEDS LTDA - DIVISÃO AGRICOLA", 
    taxa: 3.129370629370629
  },
  { 
    unidade: "SYNGENTA DIVISÃO AGRICOLA CROP", 
    taxa: 2.6223776223776225
  },
];

export function AbsenteismoCard() {
  // Cálculos baseados nos dados reais
  const mediaGeral = 10.37; // Taxa média geral fornecida
  const taxaMaxima = 25.58; // Taxa máxima fornecida
  const taxaMinima = 2.62; // Taxa mínima fornecida

  return (
    <Card>
      <CardHeader>
        <CardTitle>Absenteísmo por Doença</CardTitle>
        <CardDescription>
          Taxa anual por unidade - Base: 739 funcionários com registro de absenteísmo (de 2,036 registros válidos)
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
            <div className="text-xl font-bold text-red-700">{taxaMaxima}%</div>
            <div className="text-sm text-red-600">Taxa Máxima</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-red-700">{taxaMinima}%</div>
            <div className="text-sm text-red-600">Taxa Mínima</div>
          </div>
        </div>

        {/* Nota importante sobre os dados */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Importante:</strong> Os dados referem-se apenas aos <strong>739 funcionários que tiveram registros de absenteísmo</strong>, 
            não ao total de funcionários das empresas.
          </p>
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
                </div>
                <div className="text-right">
                  <div
                    className={`text-lg font-bold ${
                      item.taxa <= 4.0 ? "text-green-600" : 
                      item.taxa <= 10.0 ? "text-yellow-600" : "text-red-600"
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
          Faixa de variação: {taxaMinima}% - {taxaMaxima}%{" "}
          <TrendingDown className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Meta: manter abaixo de 4% ao ano | Análise de 739 funcionários com absenteísmo de 16 empresas
        </div>
      </CardFooter>
    </Card>
  );
}
