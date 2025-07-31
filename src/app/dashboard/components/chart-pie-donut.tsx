"use client";

import { Shield, Activity, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChartPieDonutProps {
  title: string;
  description: string;
  data: Array<{
    name: string;
    value: number;
    fill: string;
  }>;
  centerValue?: string;
  footerText?: string;
  metaText?: string;
}

export function ChartPieDonut({
  title,
  description,
  data,
  centerValue,
  footerText,
  metaText,
}: ChartPieDonutProps) {
  // Determina o ícone baseado no título
  const isSeguranca = title.toLowerCase().includes('segurança');
  const IconComponent = isSeguranca ? Shield : Activity;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      {/* X Vermelho para indicar falta de dados */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-red-100 rounded-full p-2">
          <X className="h-6 w-6 text-red-600" />
        </div>
      </div>

      <CardContent className="flex-1 pb-0">
        {/* Indicador de sem dados */}
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <IconComponent className="h-8 w-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Dados não disponíveis
          </h4>
          <p className="text-gray-500 text-sm mb-6">
            Dados para cálculo de conformidade não foram fornecidos.
          </p>
          
          {/* Placeholder do gráfico circular */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-lg font-bold">--%</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-gray-500">
          Aguardando dados para cálculo
        </div>
        <div className="text-muted-foreground leading-none text-center">
          {footerText || "Indicadores necessários para conformidade não disponíveis"}
        </div>
      </CardFooter>
    </Card>
  );
}
