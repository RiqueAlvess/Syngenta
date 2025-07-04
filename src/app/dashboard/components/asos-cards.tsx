"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";

const asosData = [
  {
    label: "Válidos",
    value: "156",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    valueColor: "text-green-700",
  },
  {
    label: "Pendentes",
    value: "15",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    valueColor: "text-blue-700",
  },
  {
    label: "Vencendo (30 dias)",
    value: "23",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    valueColor: "text-yellow-700",
  },
  {
    label: "Vencidos",
    value: "8",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    valueColor: "text-red-700",
  },
];

export function AsosCards() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <CardTitle>ASOS - Atestados de Saúde Ocupacional</CardTitle>
        </div>
        <CardDescription>
          Controle de atestados pendentes, vencendo e vencidos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {asosData.map((item) => (
            <div
              key={item.label}
              className={`p-6 rounded-lg border ${item.bgColor} text-center`}
            >
              <div className={`text-3xl font-bold ${item.valueColor} mb-2`}>
                {item.value}
              </div>
              <div className={`text-sm font-medium ${item.textColor}`}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
