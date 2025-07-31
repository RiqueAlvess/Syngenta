"use client";

import { Shield } from "lucide-react";
import { Watermark } from "@/components/ui/watermark";

// DADOS REAIS - ASOs por status
const asosData = [
  {
    label: "Válidos",
    value: "3,847",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    valueColor: "text-green-700",
  },
  {
    label: "Vencendo (30 dias)",
    value: "674",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    valueColor: "text-yellow-700",
  },
  {
    label: "Vencidos",
    value: "1,273",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    valueColor: "text-red-700",
  },
  {
    label: "Total de ASOs",
    value: "5,794",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    valueColor: "text-blue-700",
  },
];

export function AsosCards() {
  // Cálculos baseados nos dados reais
  const totalAsos = 3847 + 674 + 1273;
  const percentualValidos = ((3847 / totalAsos) * 100).toFixed(1);
  const percentualVencidos = ((1273 / totalAsos) * 100).toFixed(1);

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
            Controle de atestados válidos, vencendo e vencidos
          </p>
        </div>

        {/* Cards principais */}
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

        {/* Resumo e análise */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Percentual válidos */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">
                {percentualValidos}%
              </div>
              <div className="text-sm text-green-600">
                ASOs Válidos
              </div>
            </div>
          </div>

          {/* Percentual vencidos */}
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-700">
                {percentualVencidos}%
              </div>
              <div className="text-sm text-red-600">
                ASOs Vencidos
              </div>
            </div>
          </div>

          {/* Ação necessária */}
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-700">
                1,947
              </div>
              <div className="text-sm text-orange-600">
                Precisam Atenção
              </div>
              <div className="text-xs text-orange-500 mt-1">
                (Vencendo + Vencidos)
              </div>
            </div>
          </div>
        </div>

        {/* Observações importantes */}
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-medium text-sm mb-2">Observações:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• {(674 + 1273).toLocaleString()} ASOs precisam de renovação urgente</li>
            <li>• Meta: manter acima de 80% de ASOs válidos</li>
            <li>• Recomendação: priorizar renovação dos vencidos e programar os que vencem em 30 dias</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
