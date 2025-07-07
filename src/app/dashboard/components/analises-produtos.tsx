"use client";

import { FlaskConical } from "lucide-react";
import { Watermark } from "@/components/ui/watermark";

const analisesData = [
  { label: "Solicitadas", value: "45", color: "text-gray-700" },
  { label: "Concluídas", value: "38", color: "text-green-600" },
  { label: "Em Andamento", value: "5", color: "text-blue-600" },
];

export function AnalisesProdutos() {
  return (
    <div className="bg-white rounded-xl border shadow-sm relative overflow-hidden">
      <Watermark />
      
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

        {/* Content */}
        <div className="space-y-4">
          {analisesData.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="font-medium text-gray-700">{item.label}</span>
              <span className={`text-2xl font-bold ${item.color}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
