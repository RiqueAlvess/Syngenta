"use client";

import { Users, X } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ChartLineVisitas() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendência de Visitas</CardTitle>
        <CardDescription>Visitas realizadas vs meta mensal</CardDescription>
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
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Dados não disponíveis
          </h4>
          <p className="text-gray-500 text-sm mb-4">
            Dados históricos de visitas não foram fornecidos.
          </p>
          
          {/* Dados disponíveis */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">7</div>
              <div className="text-sm text-blue-600">Total de Visitas Realizadas</div>
              <div className="text-xs text-blue-500 mt-1">
                (Período atual - sem histórico mensal)
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium text-gray-500">
              Apenas total disponível: 7 visitas
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Histórico mensal não fornecido
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
