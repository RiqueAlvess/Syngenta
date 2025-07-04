"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardHeaderProps {
  onSubgrupoChange: (subgrupo: string) => void;
  onUnidadeChange: (unidade: string) => void;
  onPeriodoChange: (periodo: string) => void;
}

export function DashboardHeader({
  onSubgrupoChange,
  onUnidadeChange,
  onPeriodoChange,
}: DashboardHeaderProps) {
  return (
    <div className="bg-white rounded-xl px-6 py-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Esquerda: título e data */}
        <div className="flex items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold leading-tight text-gray-900">
              Dashboard Gerencial
            </h2>
            <p className="text-sm text-muted-foreground">
              Última atualização: 03/07/2025, 22:17:12
            </p>
          </div>
        </div>

        {/* Direita: filtros */}
        <div className="flex items-center gap-2">
          <Select defaultValue="todos" onValueChange={onSubgrupoChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Subgrupo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="seguranca">Segurança</SelectItem>
              <SelectItem value="saude">Saúde</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="30" onValueChange={onPeriodoChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 dias</SelectItem>
              <SelectItem value="30">30 dias</SelectItem>
              <SelectItem value="90">90 dias</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="todas" onValueChange={onUnidadeChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Unidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as unidades</SelectItem>
              <SelectItem value="crop">SYNGENTA CROP</SelectItem>
              <SelectItem value="seeds-rd">SYNGENTA SEEDS-R&D</SelectItem>
              <SelectItem value="seeds">SYNGENTA SEEDS</SelectItem>
              <SelectItem value="digital">SYNGENTA DIGITAL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
