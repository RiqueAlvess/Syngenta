"use client";

import { FlaskConical, X } from "lucide-react";
import { Watermark } from "@/components/ui/watermark";

export function AnalisesProdutos() {
  return (
    <div className="bg-white rounded-xl border shadow-sm relative overflow-hidden">
      <Watermark />
      
      {/* X Vermelho para indicar falta de dados */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-red-100 rounded-full p-2">
          <X className="h-6 w-6 text-red-600" />
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col gap-6 p-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            <h3 className="leading-none font-semibold">Análises de Produtos Químicos</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            Status das análises químicas solicitadas
          </p>
        </div>

        {/* Content - Sem dados */}
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <FlaskConical className="h-8 w-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Dados não disponíveis
          </h4>
          <p className="text-gray-500 text-sm">
            Nenhum dado de análises de produtos químicos foi fornecido para este período.
          </p>
        </div>
      </div>
    </div>
  );
}
