"use client";

import { MessageSquare } from "lucide-react";
import { Watermark } from "@/components/ui/watermark";

// DADOS REAIS - Baseado no KPI de 7 consultas técnicas
const consultasData = [
  { label: "Total de Consultas", value: "7", color: "text-gray-700" },
  { label: "Respondidas", value: "7", color: "text-green-600" },
  { label: "Pendentes", value: "0", color: "text-gray-400" },
];

export function ResumoConsultas() {
  return (
    <div className="bg-white rounded-xl border shadow-sm relative overflow-hidden">
      <Watermark />
      
      <div className="relative z-10 flex flex-col gap-6 p-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <h3 className="leading-none font-semibold">Resumo de Consultas Técnicas</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            Situação das consultas técnicas recebidas
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {consultasData.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="font-medium text-gray-700">{item.label}</span>
              <span className={`text-2xl font-bold ${item.color}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Status resumido */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-center">
            <div className="text-xl font-bold text-green-700">
              100%
            </div>
            <div className="text-sm text-green-600">
              Consultas Respondidas
            </div>
            <div className="text-xs text-green-500 mt-1">
              ✓ Todas as 7 consultas foram atendidas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
