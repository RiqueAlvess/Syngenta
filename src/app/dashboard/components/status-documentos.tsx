"use client";

import {
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
} from "lucide-react";
import { Watermark } from "@/components/ui/watermark";

const statusData = [
  {
    label: "Documentos Válidos",
    value: "234",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    label: "Vencendo (30 dias)",
    value: "18",
    icon: AlertTriangle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    label: "Vencidos",
    value: "7",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    label: "Pendentes de Entrega",
    value: "43",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
];

export function StatusDocumentos() {
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
            Situação atual dos documentos por categoria
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
      </div>
    </div>
  );
}
