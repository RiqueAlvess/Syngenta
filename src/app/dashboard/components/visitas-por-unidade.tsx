"use client";

import { Building2 } from "lucide-react";
import { Watermark } from "@/components/ui/watermark";

// DADOS REAIS - Visitas por unidade/localidade
const visitasData = [
  { unidade: "HOLAMBRA", realizadas: 4, pendentes: 0 },
  { unidade: "INDAIATUBA", realizadas: 3, pendentes: 1 },
  { unidade: "ESCRITÓRIO CENTRAL", realizadas: 1, pendentes: 0 },
];

export function VisitasPorUnidade() {
  const totalRealizadas = visitasData.reduce(
    (acc, item) => acc + item.realizadas,
    0
  );
  const totalPendentes = visitasData.reduce(
    (acc, item) => acc + item.pendentes,
    0
  );

  return (
    <div className="bg-white rounded-xl border shadow-sm relative overflow-hidden">
      <Watermark />
      
      <div className="relative z-10 flex flex-col gap-6 p-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            <h3 className="leading-none font-semibold">Visitas por Unidade</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            Distribuição de visitas realizadas e pendentes - Total:{" "}
            {totalRealizadas} realizadas
            {totalPendentes > 0 && `, ${totalPendentes} pendentes`}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {visitasData.map((item) => {
            const totalUnidade = item.realizadas + item.pendentes;
            const percentualExecucao = totalUnidade > 0 ? (
              (item.realizadas / totalUnidade) * 100
            ).toFixed(1) : "100.0";
            
            return (
              <div key={item.unidade} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="font-medium text-sm">{item.unidade}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      {item.realizadas} realizadas
                    </span>
                    {item.pendentes > 0 && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {item.pendentes} pendentes
                      </span>
                    )}
                    {item.pendentes === 0 && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Concluído
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.pendentes === 0 ? 'bg-green-600' : 'bg-blue-600'
                    }`}
                    style={{ width: `${percentualExecucao}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground text-right">
                  {percentualExecucao}% concluído
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumo adicional */}
        {totalRealizadas > 0 && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-center">
              <div className="text-lg font-bold text-green-700">
                {totalRealizadas}
              </div>
              <div className="text-sm text-green-600">
                Total de visitas realizadas no período
              </div>
              {totalPendentes === 0 && (
                <div className="text-xs text-green-500 mt-1">
                  ✓ Todas as visitas foram concluídas
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
