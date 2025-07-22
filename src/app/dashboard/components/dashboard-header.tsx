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
  data: any;
}

export function DashboardHeader({
  onSubgrupoChange,
  onUnidadeChange,
  onPeriodoChange,
  data,
}: DashboardHeaderProps) {
  // Formatação da data de atualização
  const formatarData = (dataISO: string) => {
    const data = new Date(dataISO);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Esquerda: Logo + título e data */}
        <div className="flex items-center gap-6">
          {/* Logo da Syngenta */}
          <div className="flex-shrink-0">
            <img
              src="https://www.syngenta.com/themes/custom/themekit/logo.svg"
              alt="Syngenta"
              className="h-12 w-auto object-contain"
            />
          </div>
          
          {/* Título e Data */}
          <div>
            <h2 className="text-2xl font-bold leading-tight text-gray-900">
              Dashboard Gerencial
            </h2>
            <p className="text-sm text-muted-foreground">
              Última atualização: {formatarData(data.metadata.ultimaAtualizacao)}
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
              {data.filtros.subgrupos.map((subgrupo: string) => (
                <SelectItem key={subgrupo} value={subgrupo}>
                  {subgrupo === 'todos' ? 'Todos' : 
                   subgrupo === 'seguranca' ? 'Segurança' : 
                   subgrupo === 'saude' ? 'Saúde' : subgrupo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="30" onValueChange={onPeriodoChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              {data.filtros.periodos.map((periodo: string) => (
                <SelectItem key={periodo} value={periodo}>
                  {periodo} dias
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="todas" onValueChange={onUnidadeChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Unidade" />
            </SelectTrigger>
            <SelectContent>
              {data.filtros.unidades.map((unidade: any) => (
                <SelectItem key={unidade.codigo} value={unidade.codigo}>
                  {unidade.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
