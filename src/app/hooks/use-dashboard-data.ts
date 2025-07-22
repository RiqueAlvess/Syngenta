import { useState, useEffect, useMemo } from 'react';

interface DashboardData {
  metadata: {
    ultimaAtualizacao: string;
    versao: string;
    fontesDados: string[];
  };
  filtros: {
    subgrupos: string[];
    unidades: Array<{
      codigo: string;
      nome: string;
    }>;
    periodos: string[];
  };
  indicadores: {
    seguranca: {
      kpis: {
        visitasRealizadas: any;
        documentosValidos: any;
        pppEmitidos: any;
        medicoesRealizadas: any;
      };
      visitas: any;
      documentos: any;
      conformidade: any;
    };
    saude: {
      kpis: {
        asoValidos: any;
        examesAlterados: any;
        taxaAbsenteismo: any;
        consultasTecnicas: any;
      };
      asos: any;
      exames: any;
      absenteismo: any;
      absenteismoPorDoenca: any;
      consultasTecnicas: any;
      conformidade: any;
    };
  };
}

// Função para filtrar dados por período
function filtrarPorPeriodo(dados: any[], periodo: string) {
  if (!dados || !Array.isArray(dados)) return dados;
  
  const diasFiltro = parseInt(periodo);
  const hoje = new Date();
  
  return dados.filter(item => {
    if (!item.periodo) return true; // Se não tem campo período, mantém o item
    
    const itemPeriodo = parseInt(item.periodo);
    return itemPeriodo <= diasFiltro;
  });
}

// Função para filtrar dados por unidade
function filtrarPorUnidade(dados: any[], unidade: string) {
  if (!dados || !Array.isArray(dados) || unidade === 'todas') return dados;
  
  return dados.filter(item => {
    if (!item.unidade) return true; // Se não tem campo unidade, mantém o item
    return item.unidade === unidade;
  });
}

export function useDashboardData(
  subgrupo: string = "todos", 
  unidade: string = "todas", 
  periodo: string = "30"
) {
  const [rawData, setRawData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/syngenta-dashboard-data.json');
        if (!response.ok) {
          throw new Error('Erro ao carregar dados');
        }
        const jsonData = await response.json();
        setRawData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Aplicar filtros aos dados
  const filteredData = useMemo(() => {
    if (!rawData) return null;

    // Clonar os dados para não modificar o original
    const filtered = JSON.parse(JSON.stringify(rawData));

    // Aplicar filtros de período nos dados que têm evolução temporal
    if (filtered.indicadores.seguranca.visitas.evolucaoMensal) {
      filtered.indicadores.seguranca.visitas.evolucaoMensal = 
        filtrarPorPeriodo(filtered.indicadores.seguranca.visitas.evolucaoMensal, periodo);
    }

    if (filtered.indicadores.saude.absenteismo.evolucaoMensal) {
      filtered.indicadores.saude.absenteismo.evolucaoMensal = 
        filtrarPorPeriodo(filtered.indicadores.saude.absenteismo.evolucaoMensal, periodo);
    }

    if (filtered.indicadores.saude.absenteismoPorDoenca.evolucaoMensal) {
      filtered.indicadores.saude.absenteismoPorDoenca.evolucaoMensal = 
        filtrarPorPeriodo(filtered.indicadores.saude.absenteismoPorDoenca.evolucaoMensal, periodo);
    }

    // Aplicar filtros de unidade
    if (unidade !== 'todas') {
      // Filtrar visitas por unidade
      if (filtered.indicadores.seguranca.visitas.porUnidade) {
        filtered.indicadores.seguranca.visitas.porUnidade = 
          filtered.indicadores.seguranca.visitas.porUnidade.filter((item: any) => 
            item.unidade === unidade
          );
      }

      // Filtrar documentos por unidade  
      if (filtered.indicadores.seguranca.documentos.porUnidade) {
        filtered.indicadores.seguranca.documentos.porUnidade = 
          filtered.indicadores.seguranca.documentos.porUnidade.filter((item: any) => 
            item.unidade === unidade
          );
      }

      // Filtrar exames por unidade
      if (filtered.indicadores.saude.exames.porUnidade) {
        filtered.indicadores.saude.exames.porUnidade = 
          filtered.indicadores.saude.exames.porUnidade.filter((item: any) => 
            item.unidade === unidade
          );
      }

      // Filtrar absenteísmo por unidade
      if (filtered.indicadores.saude.absenteismo.porUnidade) {
        filtered.indicadores.saude.absenteismo.porUnidade = 
          filtered.indicadores.saude.absenteismo.porUnidade.filter((item: any) => 
            item.unidade === unidade
          );
      }

      // Recalcular KPIs baseado nos dados filtrados
      recalcularKPIs(filtered, unidade);
    }

    return filtered;
  }, [rawData, subgrupo, unidade, periodo]);

  return { data: filteredData, loading, error };
}

// Função para recalcular KPIs baseado nos dados filtrados
function recalcularKPIs(data: any, unidade: string) {
  if (unidade === 'todas') return;

  // Recalcular visitas realizadas para a unidade específica
  const visitasUnidade = data.indicadores.seguranca.visitas.porUnidade.find(
    (item: any) => item.unidade === unidade
  );
  if (visitasUnidade) {
    data.indicadores.seguranca.kpis.visitasRealizadas.valor = visitasUnidade.realizadas;
    data.indicadores.seguranca.kpis.visitasRealizadas.pendentes = visitasUnidade.pendentes;
  }

  // Recalcular documentos para a unidade específica
  const documentsUnidade = data.indicadores.seguranca.documentos.porUnidade.find(
    (item: any) => item.unidade === unidade
  );
  if (documentsUnidade) {
    data.indicadores.seguranca.kpis.documentosValidos.valor = documentsUnidade.validos;
    data.indicadores.seguranca.kpis.documentosValidos.vencendoEm30Dias = documentsUnidade.vencendo;
  }

  // Recalcular exames para a unidade específica
  const examesUnidade = data.indicadores.saude.exames.porUnidade.find(
    (item: any) => item.unidade === unidade
  );
  if (examesUnidade) {
    const percentualAlterados = ((examesUnidade.alterados / examesUnidade.total) * 100).toFixed(1);
    data.indicadores.saude.kpis.examesAlterados.valor = parseFloat(percentualAlterados);
    data.indicadores.saude.kpis.examesAlterados.alterados = examesUnidade.alterados;
    data.indicadores.saude.kpis.examesAlterados.total = examesUnidade.total;
  }

  // Recalcular absenteísmo para a unidade específica
  const absenteismoUnidade = data.indicadores.saude.absenteismo.porUnidade.find(
    (item: any) => item.unidade === unidade
  );
  if (absenteismoUnidade) {
    data.indicadores.saude.kpis.taxaAbsenteismo.valor = absenteismoUnidade.taxa;
  }
}
