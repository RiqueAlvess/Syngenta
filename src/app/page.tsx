"use client";

import { DashboardHeader } from "./components/dashboard-header";
import { KpiCard } from "./components/kpi-card";
import { ChartLineVisitas } from "./components/chart-line";
import { ChartBarDocumentos } from "./components/chart-bar";
import { ChartPieDonut } from "./components/chart-pie-donut";
import { ChartAreaGradient } from "./components/chart-area-gradient";
import { ChartBarLabelCustom } from "./components/chart-bar-label-custom";
import { VisitasPorUnidade } from "./components/visitas-por-unidade";
import { StatusDocumentos } from "./components/status-documentos";
import { AsosCards } from "./components/asos-cards";
import { AnalisesProdutos } from "./components/analises-produtos";
import { ResumoConsultas } from "./components/resumo-consultas";
import { ExamesAlterados } from "./components/exames-alterados";
import { AbsenteismoCard } from "./components/absenteismo-card";
import { MedicoesCard } from "./components/medicoes-card";
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

  // Dados para reutilização - Conformidade
  const conformidadeData = [
    { name: "Conforme", value: 92.5, fill: "#22c55e" },
    { name: "Não Conforme", value: 7.5, fill: "#ef4444" },
  ];

  const conformidadeSaudeData = [
    { name: "Conforme", value: 91.8, fill: "#22c55e" },
    { name: "Não Conforme", value: 8.2, fill: "#ef4444" },
  ];

  // Dados para reutilização - Avaliações Ambientais
  const avaliacoesData = [
    { mes: "Jan", programado: 25, executado: 23, naoExecutado: 2 },
    { mes: "Fev", programado: 28, executado: 25, naoExecutado: 3 },
    { mes: "Mar", programado: 30, executado: 28, naoExecutado: 2 },
    { mes: "Abr", programado: 32, executado: 30, naoExecutado: 2 },
    { mes: "Mai", programado: 29, executado: 27, naoExecutado: 2 },
    { mes: "Jun", programado: 35, executado: 33, naoExecutado: 2 },
  ];

  // Dados para reutilização - PPP
  const pppData = [
    { month: "Janeiro", desktop: 45, mobile: 42 },
    { month: "Fevereiro", desktop: 38, mobile: 35 },
    { month: "Março", desktop: 52, mobile: 48 },
    { month: "Abril", desktop: 41, mobile: 39 },
    { month: "Maio", desktop: 47, mobile: 44 },
    { month: "Junho", desktop: 39, mobile: 37 },
  ];

  const renderTodosContent = () => (
    <>
      {/* Título da seção Segurança */}
      <div className="py-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-600" />
          Indicadores de Segurança
        </h3>

        {/* KPIs Segurança - DADOS REAIS */}
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

      {/* Título da seção Saúde */}
      <div className="py-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="h-6 w-6 text-green-600" />
          Indicadores de Saúde
        </h3>

        {/* KPIs Saúde - DADOS REAIS */}
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

      {/* Primeira linha de gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <ChartLineVisitas />
        <ChartBarDocumentos />
      </div>

      {/* Segunda linha de gráficos - Conformidade */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <ChartPieDonut
          title="Conformidade Segurança"
          description="Indicadores de segurança do trabalho"
          data={conformidadeData}
          centerValue="92.5%"
          metaText="Meta: ≥ 90%"
          footerText="Baseado em visitas, documentos, PPP e medições"
        />
        <ChartPieDonut
          title="Conformidade Saúde"
          description="Indicadores de saúde ocupacional"
          data={conformidadeSaudeData}
          centerValue="91.8%"
          metaText="Meta: ≥ 90%"
          footerText="Baseado em ASO, exames, absenteísmo e consultas"
        />
      </div>

      {/* Terceira linha - Avaliações e Exames */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <ChartAreaGradient
          title="Avaliações Ambientais"
          description="Comparativo entre programado, executado e não executado"
          data={avaliacoesData}
          dataKeys={["programado", "executado", "naoExecutado"]}
          colors={["#3b82f6", "#22c55e", "#ef4444"]}
          footerText="Taxa de execução: 94.3%"
          metaText="Meta: ≥ 90% de execução das avaliações programadas"
        />
        <ExamesAlterados />
      </div>

      {/* Quarta linha - PPP (full width) */}
      <div className="py-6">
        <ChartBarLabelCustom
          title="PPP - Perfil Profissiográfico Previdenciário"
          description="Solicitações vs Entregas por mês"
          data={pppData}
          dataKey="desktop"
          labelKey="month"
          footerText="Taxa de entrega: 93.6%"
          metaText="Total de 262 solicitações e 245 entregas no período"
        />
      </div>

      {/* Quinta linha: Visitas e Status dos Documentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <VisitasPorUnidade />
        <StatusDocumentos />
      </div>

      {/* Sexta linha: ASOS (full width) */}
      <div className="py-6">
        <AsosCards />
      </div>

      {/* Sétima linha: Análises e Consultas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <AnalisesProdutos />
        <ResumoConsultas />
      </div>

      {/* Oitava linha: Medições e Absenteísmo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <MedicoesCard />
        <AbsenteismoCard />
      </div>
    </>
  );

  const renderSegurancaContent = () => (
    <>
      {/* Cards principais - Segurança (4 KPIs) - DADOS REAIS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
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

      {/* Primeira linha de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartLineVisitas />
        <ChartBarDocumentos />
      </div>

      {/* Segunda linha de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <ChartPieDonut
          title="Conformidade Segurança"
          description="Cálculo automático baseado em indicadores de segurança"
          data={conformidadeData}
          centerValue="92.5%"
          metaText="Meta: ≥ 90%"
          footerText="Baseado em visitas, documentos, PPP e medições"
        />
        <ChartAreaGradient
          title="Avaliações Ambientais"
          description="Comparativo entre programado, executado e não executado"
          data={avaliacoesData}
          dataKeys={["programado", "executado", "naoExecutado"]}
          colors={["#3b82f6", "#22c55e", "#ef4444"]}
          footerText="Taxa de execução: 94.3%"
          metaText="Meta: ≥ 90% de execução das avaliações programadas"
        />
      </div>

      {/* Terceira linha de gráfico (full width) */}
      <div className="py-6">
        <ChartBarLabelCustom
          title="PPP - Perfil Profissiográfico Previdenciário"
          description="Solicitações vs Entregas por mês"
          data={pppData}
          dataKey="desktop"
          labelKey="month"
          footerText="Taxa de entrega: 93.6%"
          metaText="Total de 262 solicitações e 245 entregas no período"
        />
      </div>

      {/* Quarta linha: Visitas e Status dos Documentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <VisitasPorUnidade />
        <StatusDocumentos />
      </div>

      {/* Quinta linha: Medições */}
      <div className="py-6">
        <MedicoesCard />
      </div>
    </>
  );

  const renderSaudeContent = () => (
    <>
      {/* Cards principais - Saúde (4 KPIs) - DADOS REAIS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
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

      {/* Primeira linha de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartLineVisitas />
        <ChartBarDocumentos />
      </div>

      {/* Segunda linha de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <ChartPieDonut
          title="Conformidade Saúde"
          description="Cálculo automático baseado em indicadores de saúde"
          data={conformidadeSaudeData}
          centerValue="91.8%"
          metaText="Meta: ≥ 90%"
          footerText="Baseado em ASO, exames, absenteísmo e consultas"
        />
        <ExamesAlterados />
      </div>

      {/* Terceira linha: ASOS (full width) */}
      <div className="py-6">
        <AsosCards />
      </div>

      {/* Quarta linha: Análises e Consultas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <AnalisesProdutos />
        <ResumoConsultas />
      </div>

      {/* Quinta linha: Absenteísmo */}
      <div className="py-6">
        <AbsenteismoCard />
      </div>
    </>
  );

  const renderContent = () => {
    switch (selectedCategory) {
      case "seguranca":
        return renderSegurancaContent();
      case "saude":
        return renderSaudeContent();
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
