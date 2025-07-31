"use client";

import { Shield, X } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChartBarLabelCustomProps {
  title: string;
  description: string;
  data: any[];
  dataKey: string;
  labelKey: string;
  footerText?: string;
  metaText?: string;
}

export function ChartBarLabelCustom({
  title,
  description,
  data,
  dataKey,
  labelKey,
  footerText,
  metaText,
}: ChartBarLabelCustomProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      {/* X Vermelho para indicar falta de dados */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-red-100 rounded-full p-2">
          <X className="h-6 w-6 text-red-600" />
        </div>
      </div>

      <CardContent>
        {/* Indicador de sem dados */}
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <Shield className="h-8 w-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Dados não disponíveis
          </h4>
          <p className="text-gray-500 text-sm mb-4">
            Nenhum dado de PPP foi fornecido para este período.
          </p>
          
          {/* Placeholder visual */}
          <div className="w-full max-w-md">
            <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Gráfico indisponível</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-gray-500">
          Aguardando dados de PPP
        </div>
        <div className="text-muted-foreground leading-none">
          {metaText || "Dados de solicitações e entregas não disponíveis"}
        </div>
      </CardFooter>
    </Card>
  );
}
