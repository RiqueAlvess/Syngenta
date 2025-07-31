"use client";

import {
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
} from "lucide-react";
import { Watermark } from "@/components/ui/watermark";

// DADOS REAIS - Status dos documentos baseados nos dados fornecidos
const statusData = [
  {
    label: "Documentos Válidos",
    value: "10",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    label: "Vencidos",
    value: "6",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    label: "Vencendo (30 dias)",
    value: "0",
    icon: AlertTriangle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    label: "Total de Documentos",
    value: "16",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
];

export function StatusDocumentos() {
  // Cálculos baseados nos dados reais
  const totalDocumentos = 16;
  const documentosValidos = 10;
  const documentosVencidos = 6;
  const percentualValidos = ((documentosValidos / totalDocumentos) * 100).toFixed(1);
  const percentualVencidos = ((documentosVencidos / totalDocumentos) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl border shadow-sm relative overflow-hidden">
      <Watermark />
      
      <div className="relative z-10 flex flex-col gap-6 p-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <h3 className="leading-none font-semibold">Status dos Documentos</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            Situação atual dos documentos por categoria (PGR, LTCAT, PPR, L.I, L.P, PCMSO, R.A)
          </p>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {statusData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${item.bgColor}`}>
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Análise resumida */}
        <div className="grid grid-cols-2 gap-4">
          {/* Percentual válidos */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-center">
              <div className="text-xl font-bold text-green-700">
                {percentualValidos}%
              </div>
              <div className="text-sm text-green-600">
                Documentos Válidos
              </div>
            </div>
          </div>

          {/* Percentual vencidos */}
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-center">
              <div className="text-xl font-bold text-red-700">
                {percentualVencidos}%
              </div>
              <div className="text-sm text-red-600">
                Documentos Vencidos
              </div>
            </div>
          </div>
        </div>

        {/* Status por unidade */}
        <div className="mt-4">
          <h4 className="font-medium text-sm mb-3">Distribuição por Unidade:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>Unidade 655296</span>
              <span className="text-green-600">3 válidos, 2 vencidos</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>Unidade 655298</span>
              <span className="text-green-600">6 válidos, 3 vencidos</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>Unidade 768872</span>
              <span className="text-green-600">1 válido</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>Grupo Syngenta</span>
              <span className="text-red-600">1 vencido</span>
            </div>
          </div>
        </div>

        {/* Observações */}
        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <h4 className="font-medium text-sm mb-2 text-orange-800">Ações Necessárias:</h4>
          <ul className="text-xs text-orange-700 space-y-1">
            <li>• {documentosVencidos} documentos vencidos precisam ser renovados urgentemente</li>
            <li>• Unidade 655298 tem o maior número de documentos vencidos (3)</li>
            <li>• Meta: manter pelo menos 85% dos documentos válidos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
