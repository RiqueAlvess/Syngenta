"use client";

import { useState } from "react";
import { useDashboardData } from "@/hooks/use-dashboard-data";
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
  const [subgrupo, setSubgrupo] = useState("todos");
  const [unidade, setUnidade] = useState("todas");
  const [periodo, setPeriodo] = useState("30");
  
  // Agora o hook recebe os parâmetros de filtro
  const { data, loading, error } = useDashboardData(subgrupo, unidade, periodo);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados do dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">
            Filtros: {subgrupo} | {unidade} | {periodo} dias
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar dados: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Dados para reutilização - Conformidade
  const conformidadeData = [
    { name: "Conforme", value: data.indicadores.seguranca.conformidade.percentualGeral, fill: "#22c55e" },
    { name: "Não Conforme", value: 100 - data.indicadores.seguranca.conformidade.percentualGeral, fill: "#ef4444" },
  ];

  const conformidadeSaudeData = [
    { name: "Conforme", value: data.indicadores.saude.conformidade.percentualGeral, fill: "#22c55e" },
    { name: "Não Conforme", value: 100 - data.indicadores.saude.conformidade.percentualGeral, fill: "#ef4444" },
  ];

  // Dados para reutilização - Avaliações Ambientais (usar dados de visitas como base)
  const avaliacoesData = data.indicadores.seguranca.visitas.evolucaoMensal.map((item: any) => ({
    mes: item.mes,
    programado: item.meta,
    executado: item.visitas,
    naoExecutado: Math.max(0, item.meta - item.visitas)
  }));

  // Dados para reutilização - PPP (simulado baseado nos dados reais)
  const pppData = data.indicadores.seguranca.visitas.evolucaoMensal.map((item: any) => ({
    month: item.mes,
    desktop: Math.round(item.visitas * 1.2), // Simula solicitações
    mobile: item.visitas // Simula entregas
  }));

  const renderTodosContent = () => (
    <>
      {/* Título da seção Segurança */}
      <div className="py-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-600" />
          Indicadores de Segurança
          {unidade !== 'todas' && (
            <span className="text-sm font-normal text-gray-500">
              - {data.filtros.unidades.find(u => u.codigo === unidade)?.nome}
            </span>
          )}
        </h3>

        {/* KPIs Segurança */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard
            title="Visitas Realizadas"
            value={data.indicadores.seguranca.kpis.visitasRealizadas.valor.toString()}
            subtitle={`${data.indicadores.seguranca.kpis.visitasRealizadas.pendentes} pendentes`}
            info={data.indicadores.seguranca.kpis.visitasRealizadas.variacao}
            icon={Users}
            iconColor="text-emerald-600"
          />
          <KpiCard
            title="Documentos Válidos"
            value={data.indicadores.seguranca.kpis.documentosValidos.valor.toString()}
            subtitle={`${data.indicadores.seguranca.kpis.documentosValidos.vencendoEm30Dias} vencendo em 30 dias`}
            icon={FileText}
            iconColor="text-yellow-500"
          />
          <KpiCard
            title="PPP Emitidos"
            value={data.indicadores.seguranca.kpis.pppEmitidos.valor.toString()}
            subtitle={`${data.indicadores.seguranca.kpis.pppEmitidos.solicitacoesPendentes} solicitações pendentes`}
            icon={Shield}
            iconColor="text-blue-600"
          />
          <KpiCard
            title="Medições Realizadas"
            value={`${data.indicadores.seguranca.kpis.medicoesRealizadas.valor}%`}
            subtitle={`${data.indicadores.seguranca.kpis.medicoesRealizadas.realizadas}/${data.indicadores.seguranca.kpis.medicoesRealizadas.total} medições`}
            icon={BarChart3}
            iconColor="text-green-600"
          />
        </div>
      </div>

      {/* Título da seção Saúde */}
      <div className="py-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="h-6 w-6 text-green-600" />
          Indicadores de Saúde
          {unidade !== 'todas' && (
            <span className="text-sm font-normal text-gray-500">
              - {data.filtros.unidades.find(u => u.codigo === unidade)?.nome}
            </span>
          )}
        </h3>

        {/* KPIs Saúde */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard
            title="ASO Válidos"
            value={data.indicadores.saude.kpis.asoValidos.valor.toString()}
            subtitle={`${data.indicadores.saude.kpis.asoValidos.vencendoEm30Dias} vencendo em 30 dias`}
            icon={UserCheck}
            iconColor="text-green-600"
          />
          <KpiCard
            title="Exames Alterados"
            value={`${data.indicadores.saude.kpis.examesAlterados.valor}%`}
            subtitle={`${data.indicadores.saude.kpis.examesAlterados.alterados}/${data.indicadores.saude.kpis.examesAlterados.total} exames`}
            icon={Activity}
            iconColor="text-orange-600"
          />
          <KpiCard
            title="Taxa Absenteísmo"
            value={`${data.indicadores.saude.kpis.taxaAbsenteismo.valor}%`}
            subtitle={data.indicadores.saude.kpis.taxaAbsenteismo.variacao}
            info={`Meta: < ${data.indicadores.saude.kpis.taxaAbsenteismo.meta}%`}
            icon={Calendar}
            iconColor="text-green-600"
          />
          <KpiCard
            title="Consultas Técnicas"
            value={data.indicadores.saude.kpis.consultasTecnicas.valor.toString()}
            subtitle={`${data.indicadores.saude.kpis.consultasTecnicas.pendentes} pendentes`}
            icon={Phone}
            iconColor="text-blue-600"
          />
        </div>
      </div>

      {/* Primeira linha de gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <ChartLineVisitas data={data} />
        <ChartBarDocumentos data={data} />
      </div>

      {/* Segunda linha de gráficos - Conformidade */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <ChartPieDonut
          title="Conformidade Segurança"
          description="Indicadores de segurança do trabalho"
          data={conformidadeData}
          centerValue={`${data.indicadores.seguranca.conformidade.percentualGeral}%`}
          metaText={`Meta: ≥ ${data.indicadores.seguranca.conformidade.meta}%`}
          footerText="Baseado em visitas, documentos, PPP e medições"
        />
        <ChartPieDonut
          title="Conformidade Saúde"
          description="Indicadores de saúde ocupacional"
          data={conformidadeSaudeData}
          centerValue={`${data.indicadores.saude.conformidade.percentualGeral}%`}
          metaText={`Meta: ≥ ${data.indicadores.saude.conformidade.meta}%`}
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
        <ExamesAlterados data={data} />
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
        <VisitasPorUnidade data={data} />
        <StatusDocumentos data={data} />
      </div>

      {/* Sexta linha: ASOS (full width) */}
      <div className="py-6">
        <AsosCards data={data} />
      </div>

      {/* Sétima linha: Análises e Consultas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <AnalisesProdutos />
        <ResumoConsultas data={data} />
      </div>

      {/* Oitava linha: Medições e Absenteísmo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <MedicoesCard data={data} />
        <AbsenteismoCard data={data} />
      </div>
    </>
  );

  // ... resto do código permanece igual
  const renderSegurancaContent = () => (
    <>
      {/* Cards principais - Segurança (4 KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
        <KpiCard
          title="Visitas Realizadas"
          value={data.indicadores.seguranca.kpis.visitasRealizadas.valor.toString()}
          subtitle={`${data.indicadores.seguranca.kpis.visitasRealizadas.pendentes} pendentes`}
          info={data.indicadores.seguranca.kpis.visitasRealizadas.variacao}
          icon={Users}
          iconColor="text-emerald-600"
        />
        <KpiCard
          title="Documentos Válidos"
          value={data.indicadores.seguranca.kpis.documentosValidos.valor.toString()}
          subtitle={`${data.indicadores.seguranca.kpis.documentosValidos.vencendoEm30Dias} vencendo em 30 dias`}
          icon={FileText}
          iconColor="text-yellow-500"
        />
        <KpiCard
          title="PPP Emitidos"
          value={data.indicadores.seguranca.kpis.pppEmitidos.valor.toString()}
          subtitle={`${data.indicadores.seguranca.kpis.pppEmitidos.solicitacoesPendentes} solicitações pendentes`}
          icon={Shield}
          iconColor="text-blue-600"
        />
        <KpiCard
          title="Medições Realizadas"
          value={`${data.indicadores.seguranca.kpis.medicoesRealizadas.valor}%`}
          subtitle={`${data.indicadores.seguranca.kpis.medicoesRealizadas.realizadas}/${data.indicadores.seguranca.kpis.medicoesRealizadas.total} medições`}
          icon={BarChart3}
          iconColor="text-green-600"
        />
      </div>

      {/* Primeira linha de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartLineVisitas data={data} />
        <ChartBarDocumentos data={data} />
      </div>

      {/* Segunda linha de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <ChartPieDonut
          title="Conformidade Segurança"
          description="Cálculo automático baseado em indicadores de segurança"
          data={conformidadeData}
          centerValue={`${data.indicadores.seguranca.conformidade.percentualGeral}%`}
          metaText={`Meta: ≥ ${data.indicadores.seguranca.conformidade.meta}%`}
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
        <VisitasPorUnidade data={data} />
        <StatusDocumentos data={data} />
      </div>

      {/* Quinta linha: Medições */}
      <div className="py-6">
        <MedicoesCard data={data} />
      </div>
    </>
  );

  const renderSaudeContent = () => (
    <>
      {/* Cards principais - Saúde (4 KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
        <KpiCard
          title="ASO Válidos"
          value={data.indicadores.saude.kpis.asoValidos.valor.toString()}
          subtitle={`${data.indicadores.saude.kpis.asoValidos.vencendoEm30Dias} vencendo em 30 dias`}
          icon={UserCheck}
          iconColor="text-green-600"
        />
        <KpiCard
          title="Exames Alterados"
          value={`${data.indicadores.saude.kpis.examesAlterados.valor}%`}
          subtitle={`${data.indicadores.saude.kpis.examesAlterados.alterados}/${data.indicadores.saude.kpis.examesAlterados.total} exames`}
          icon={Activity}
          iconColor="text-orange-600"
        />
        <KpiCard
          title="Taxa Absenteísmo"
          value={`${data.indicadores.saude.kpis.taxaAbsenteismo.valor}%`}
          subtitle={data.indicadores.saude.kpis.taxaAbsenteismo.variacao}
          info={`Meta: < ${data.indicadores.saude.kpis.taxaAbsenteismo.meta}%`}
          icon={Calendar}
          iconColor="text-green-600"
        />
        <KpiCard
          title="Consultas Técnicas"
          value={data.indicadores.saude.kpis.consultasTecnicas.valor.toString()}
          subtitle={`${data.indicadores.saude.kpis.consultasTecnicas.pendentes} pendentes`}
          icon={Phone}
          iconColor="text-blue-600"
        />
      </div>

      {/* Primeira linha de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartLineVisitas data={data} />
        <ChartBarDocumentos data={data} />
      </div>

      {/* Segunda linha de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <ChartPieDonut
          title="Conformidade Saúde"
          description="Cálculo automático baseado em indicadores de saúde"
          data={conformidadeSaudeData}
          centerValue={`${data.indicadores.saude.conformidade.percentualGeral}%`}
          metaText={`Meta: ≥ ${data.indicadores.saude.conformidade.meta}%`}
          footerText="Baseado em ASO, exames, absenteísmo e consultas"
        />
        <ExamesAlterados data={data} />
      </div>

      {/* Terceira linha: ASOS (full width) */}
      <div className="py-6">
        <AsosCards data={data} />
      </div>

      {/* Quarta linha: Análises e Consultas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <AnalisesProdutos />
        <ResumoConsultas data={data} />
      </div>

      {/* Quinta linha: Absenteísmo */}
      <div className="py-6">
        <AbsenteismoCard data={data} />
      </div>
    </>
  );

  const renderContent = () => {
    switch (subgrupo) {
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
        onSubgrupoChange={setSubgrupo}
        onUnidadeChange={setUnidade}
        onPeriodoChange={setPeriodo}
        data={data}
      />

      {/* Indicador dos filtros ativos */}
      {(unidade !== 'todas' || periodo !== '30') && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Filtros ativos:</strong> 
            {unidade !== 'todas' && (
              <span className="ml-2 bg-blue-100 px-2 py-1 rounded text-xs">
                {data.filtros.unidades.find(u => u.codigo === unidade)?.nome}
              </span>
            )}
            {periodo !== '30' && (
              <span className="ml-2 bg-blue-100 px-2 py-1 rounded text-xs">
                {periodo} dias
              </span>
            )}
          </p>
        </div>
      )}

      {renderContent()}
    </>
  );
}
