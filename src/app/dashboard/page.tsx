"use client";

import { useState } from "react";
import { DashboardHeader } from "./components/dashboard-header";
import { KpiCard } from "./components/kpi-card";
import { useDashboardData } from "@/hooks/useDashboardData";
import {
  Users,
  FileText,
  Phone,
  Calendar,
  BarChart3,
  Shield,
  Activity,
  UserCheck,
} from "lucide-react";

export default function DashboardPage() {
  const {
    data,
    selectedCategory,
    selectedPeriod,
    selectedCompany,
    setSelectedCategory,
    setSelectedPeriod,
    setSelectedCompany,
    availableCompanies,
  } = useDashboardData();

  const renderTodosContent = () => (
    <>
      <div className="py-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-600" />
          Indicadores de Segurança
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard
            title="Consultas Técnicas"
            value={data.kpis.seguranca.consultas_tecnicas.value}
            subtitle="Período atual"
            icon={Phone}
            status={data.kpis.seguranca.consultas_tecnicas.status as any}
            target={data.kpis.seguranca.consultas_tecnicas.target}
            unit={data.kpis.seguranca.consultas_tecnicas.unit}
          />
          <KpiCard
            title="Documentos Válidos"
            value={data.kpis.seguranca.documentos_validos.value}
            subtitle="6 vencidos"
            icon={FileText}
            status={data.kpis.seguranca.documentos_validos.status as any}
            target={data.kpis.seguranca.documentos_validos.target}
            unit={data.kpis.seguranca.documentos_validos.unit}
          />
          <KpiCard
            title="Conformidade Geral"
            value={data.kpis.seguranca.conformidade_geral.value}
            subtitle="Taxa de conformidade"
            icon={Shield}
            status={data.kpis.seguranca.conformidade_geral.status as any}
            target={data.kpis.seguranca.conformidade_geral.target}
            unit={data.kpis.seguranca.conformidade_geral.unit}
          />
          <KpiCard
            title="Medições Realizadas"
            value="Sem dados"
            subtitle="Aguardando informações"
            icon={BarChart3}
            status="warning"
          />
        </div>
      </div>

      <div className="py-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="h-6 w-6 text-green-600" />
          Indicadores de Saúde
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard
            title="ASO Válidos"
            value={data.kpis.saude.aso_validos.value}
            subtitle="674 vencendo, 1,273 vencidos"
            icon={UserCheck}
            status={data.kpis.saude.aso_validos.status as any}
            target={data.kpis.saude.aso_validos.target}
            unit={data.kpis.saude.aso_validos.unit}
          />
          <KpiCard
            title="Exames Alterados"
            value={data.kpis.saude.exames_alterados.value}
            subtitle="Total de exames com alteração"
            icon={Activity}
            status={data.kpis.saude.exames_alterados.status as any}
            target={data.kpis.saude.exames_alterados.target}
            unit={data.kpis.saude.exames_alterados.unit}
          />
          <KpiCard
            title="Taxa Absenteísmo"
            value={data.kpis.saude.taxa_absenteismo.value}
            subtitle="Taxa atual"
            icon={Calendar}
            status={data.kpis.saude.taxa_absenteismo.status as any}
            target={data.kpis.saude.taxa_absenteismo.target}
            unit={data.kpis.saude.taxa_absenteismo.unit}
          />
          <KpiCard
            title="Visitas Realizadas"
            value={data.kpis.saude.visitas_realizadas.value}
            subtitle="Período atual"
            icon={Users}
            status={data.kpis.saude.visitas_realizadas.status as any}
            target={data.kpis.saude.visitas_realizadas.target}
            unit={data.kpis.saude.visitas_realizadas.unit}
          />
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch (selectedCategory) {
      case "seguranca":
      case "saude":
      default:
        return renderTodosContent();
    }
  };

  return (
    <>
      <DashboardHeader
        selectedCategory={selectedCategory}
        selectedPeriod={selectedPeriod}
        selectedCompany={selectedCompany}
        availableCompanies={availableCompanies}
        onCategoryChange={setSelectedCategory}
        onPeriodChange={setSelectedPeriod}
        onCompanyChange={setSelectedCompany}
      />

      {renderContent()}
    </>
  );
}
