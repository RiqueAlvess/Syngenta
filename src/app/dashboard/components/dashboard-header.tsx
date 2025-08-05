"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardHeaderProps {
  selectedCategory: 'todos' | 'seguranca' | 'saude';
  selectedPeriod: '30' | '60' | '90';
  selectedCompany: string;
  availableCompanies: Array<{ code: number; name: string }>;
  onCategoryChange: (category: 'todos' | 'seguranca' | 'saude') => void;
  onPeriodChange: (period: '30' | '60' | '90') => void;
  onCompanyChange: (company: string) => void;
}

export function DashboardHeader({
  selectedCategory,
  selectedPeriod,
  selectedCompany,
  availableCompanies,
  onCategoryChange,
  onPeriodChange,
  onCompanyChange,
}: DashboardHeaderProps) {
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
              Última atualização: 05/08/2025, 02:04:26
            </p>
          </div>
        </div>

        {/* Direita: filtros */}
        <div className="flex items-center gap-2">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="seguranca">Segurança</SelectItem>
              <SelectItem value="saude">Saúde</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={onPeriodChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 dias</SelectItem>
              <SelectItem value="60">60 dias</SelectItem>
              <SelectItem value="90">90 dias</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCompany} onValueChange={onCompanyChange}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Empresa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as empresas</SelectItem>
              {availableCompanies.map((company) => (
                <SelectItem key={company.code} value={company.code.toString()}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
