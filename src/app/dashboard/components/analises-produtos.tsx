"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FlaskConical } from "lucide-react";

const analisesData = [
  { label: "Solicitadas", value: "45", color: "text-gray-700" },
  { label: "Concluídas", value: "38", color: "text-green-600" },
  { label: "Em Andamento", value: "5", color: "text-blue-600" },
];

export function AnalisesProdutos() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5" />
          <CardTitle>Análises de Produtos Químicos</CardTitle>
        </div>
        <CardDescription>
          Status das análises químicas solicitadas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {analisesData.map((item) => (
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
