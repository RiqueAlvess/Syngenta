"use client";

import { MessageSquare } from "lucide-react";
import { Watermark } from "@/components/ui/watermark";

const consultasData = [
  { label: "Total de Consultas", value: "67", color: "text-gray-700" },
  { label: "Respondidas", value: "58", color: "text-green-600" },
  { label: "Pendentes", value: "9", color: "text-orange-600" },
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
      </div>
    </div>
  );
}
