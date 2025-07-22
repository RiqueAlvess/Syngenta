import { useState, useEffect } from 'react';

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

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
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
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
}
