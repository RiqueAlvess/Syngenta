"use client";

import { Building2 } from "lucide-react";
import { Watermark } from "@/components/ui/watermark";

const visitasData = [
  { unidade: "SYNGENTA CROP", realizadas: 45, pendentes: 3 },
  { unidade: "SYNGENTA SEEDS-R&D", realizadas: 38, pendentes: 5 },
  { unidade: "SYNGENTA SEEDS", realizadas: 32, pendentes: 2 },
  { unidade: "SYNGENTA DIGITAL", realizadas: 27, pendentes: 4 },
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
            {totalRealizadas} realizadas, {totalPendentes} pendentes
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {visitasData.map((item) => {
            const percentualExecucao = (
              (item.realizadas / (item.realizadas + item.pendentes)) *
              100
            ).toFixed(1);
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
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {item.pendentes} pendentes
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
      </div>
    </div>
  );
}
