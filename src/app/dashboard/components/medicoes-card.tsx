"use client";

import { BarChart3, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function MedicoesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medições Ambientais</CardTitle>
        <CardDescription>
          Total de medições solicitadas vs realizadas por unidade
        </CardDescription>
      </CardHeader>
      
      {/* X Vermelho para indicar falta de dados */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-red-100 rounded-full p-2">
          <X className="h-6 w-6 text-red-600" />
        </div>
      </div>

      <CardContent className="space-y-6">
        {/* Indicador de sem dados */}
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <BarChart3 className="h-8 w-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Dados não disponíveis
          </h4>
          <p className="text-gray-500 text-sm">
            Nenhum dado de medições ambientais foi fornecido para este período.
          </p>
        </div>

        {/* Placeholder para estrutura */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">--</div>
            <div className="text-sm text-gray-500">Solicitadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">--</div>
            <div className="text-sm text-gray-500">Realizadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">--%</div>
            <div className="text-sm text-gray-500">Taxa Execução</div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-gray-500">
          Aguardando dados de medições ambientais
        </div>
        <div className="text-muted-foreground leading-none">
          Meta: ≥ 90% das medições solicitadas realizadas
        </div>
      </CardFooter>
    </Card>
  );
}
