"use client";

import { Shield } from "lucide-react";
import { Watermark } from "@/components/ui/watermark";

interface AsosCardsProps {
  data: any;
}

export function AsosCards({ data }: AsosCardsProps) {
  const asosData = data.indicadores.saude.asos.resumo.map((item: any) => {
    // Mapear cores baseado no status
    const colorMap: { [key: string]: { bgColor: string; textColor: string; valueColor: string } } = {
      validos: {
        bgColor: "bg-green-50",
        textColor: "text-green-600", 
        valueColor: "text-green-700"
      },
      pendentes: {
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
        valueColor: "text-blue-700"
      },
      vencendo: {
        bgColor: "bg-yellow-50", 
        textColor: "text-yellow-600",
        valueColor: "text-yellow-700"
      },
      vencidos: {
        bgColor: "bg-red-50",
        textColor: "text-red-600", 
        valueColor: "text-red-700"
      }
    };

    return {
      label: item.label,
      value: item.valor.toString(),
      ...colorMap[item.status]
    };
  });

  return (
    <div className="bg-white rounded-xl border shadow-sm relative overflow-hidden">
      <Watermark />
      
      <div className="relative z-10 flex flex-col gap-6 p-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <h3 className="leading-none font-semibold">ASOS - Atestados de Saúde Ocupacional</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            Controle de atestados pendentes, vencendo e vencidos
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {asosData.map((item) => (
            <div
              key={item.label}
              className={`p-6 rounded-lg border ${item.bgColor} text-center relative overflow-hidden`}
            >
              <Watermark size="sm" className="opacity-10" />
              <div className="relative z-10">
                <div className={`text-3xl font-bold ${item.valueColor} mb-2`}>
                  {item.value}
                </div>
                <div className={`text-sm font-medium ${item.textColor}`}>
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
