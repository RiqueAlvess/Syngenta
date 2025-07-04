"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const consultasData = [
  { label: "Total de Consultas", value: "67", color: "text-gray-700" },
  { label: "Respondidas", value: "58", color: "text-green-600" },
  { label: "Pendentes", value: "9", color: "text-orange-600" },
];

export function ResumoConsultas() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <CardTitle>Resumo de Consultas Técnicas</CardTitle>
        </div>
        <CardDescription>
          Situação das consultas técnicas recebidas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {consultasData.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="font-medium text-gray-700">{item.label}</span>
            <span className={`text-2xl font-bold ${item.color}`}>
              {item.value}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
