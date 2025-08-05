// src/hooks/useDashboardData.ts
import { useState, useMemo } from 'react';

// Tipos de dados baseados no JSON fornecido
export interface DashboardData {
  kpis: {
    seguranca: {
      consultas_tecnicas: { value: number; unit: string; description: string; target: number; status: string };
      documentos_validos: { value: number; unit: string; description: string; target: number; status: string };
      conformidade_geral: { value: number; unit: string; description: string; target: number; status: string };
    };
    saude: {
      aso_validos: { value: number; unit: string; description: string; target: number; status: string };
      exames_alterados: { value: number; unit: string; description: string; target: number; status: string };
      taxa_absenteismo: { value: number; unit: string; description: string; target: number; status: string };
      visitas_realizadas: { value: number; unit: string; description: string; target: number; status: string };
    };
  };
  raw_data: {
    absenteismo: Record<string, any>;
    aso_validos: Record<string, any>;
    exames_alterados: Record<string, any>;
    visitas_medicas: Record<string, any>;
    consultas_tecnicas: Record<string, any>;
  };
  charts: Record<string, any>;
  filters: {
    companies: {
      empresas_disponiveis: Array<{ code: number; name: string }>;
    };
  };
}

// Dados reais do JSON - versão simplificada para desenvolvimento
const mockData: DashboardData = {
  kpis: {
    seguranca: {
      consultas_tecnicas: { value: 7, unit: "consultas", description: "Total de consultas técnicas realizadas", target: 20, status: "warning" },
      documentos_validos: { value: 10, unit: "documentos", description: "Documentos válidos atualmente", target: 16, status: "warning" },
      conformidade_geral: { value: 62.5, unit: "%", description: "Taxa geral de conformidade documental", target: 95.0, status: "danger" }
    },
    saude: {
      aso_validos: { value: 4521, unit: "ASOs", description: "Atestados de Saúde Ocupacional válidos", target: 5000, status: "success" },
      exames_alterados: { value: 3122, unit: "exames", description: "Total de exames com alterações", target: 1000, status: "danger" },
      taxa_absenteismo: { value: 6.50, unit: "%", description: "Taxa de absenteísmo por doença", target: 3.0, status: "danger" },
      visitas_realizadas: { value: 7, unit: "visitas", description: "Visitas realizadas no período", target: 30, status: "warning" }
    }
  },
  raw_data: {
    absenteismo: {
      "30_days": {
        "taxa_absenteismo": 6.50,
        "absenteismo_por_empresa": {
          "SYNGENTA DIGITAL LTDA": 25.58,
          "AGRO JANGADA LTDA": 23.08,
          "SYNGENTA PROTECAO DE CULTIVOS LTDA": 4.51,
          "SYNGENTA SEEDS LTDA": 3.28,
          "SYNGENTA SEEDS LTDA - DIVISÃO AGRICOLA": 3.13,
          "SYNGENTA DIVISÃO AGRICOLA CROP": 2.62
        }
      }
    },
    aso_validos: {
      "30_days": {
        "asos_validos": 4521,
        "asos_vencidos": 1273,
        "asos_por_empresa": {
          "SYNGENTA PROTEÇÃO DE CULTIVOS LTDA": 2717,
          "SYNGENTA SEEDS LTDA": 936,
          "DIPAGRO LTDA": 294,
          "SYNGENTA SEEDS LTDA – DIVISÃO AGRÍCOLA": 288
        },
        "status_distribution": {
          "A vencer": 3847,
          "Vencido": 1273,
          "A vencer em 60 dias": 674
        }
      }
    },
    exames_alterados: {
      "30_days": {
        "total_exames": 24514,
        "exames_alterados": 3122,
        "alterados_por_empresa": {
          "SYNGENTA PROTEÇÃO DE CULTIVOS": 14534,
          "SYNGENTA SEEDS LTDA - DIVISÃO": 3215,
          "SYNGENTA SEEDS LTDA": 2057,
          "SYNGENTA DIVISÃO AGRICOLA CROP": 919,
          "SYNGENTA COMERCIAL AGRÍCOLA": 655
        }
      }
    },
    visitas_medicas: {
      "30_days": {
        "total_visitas": 7,
        "visitas_por_unidade": {
          "HOLAMBRA": 4,
          "INDAIATUBA": 3,
          "ESCRITÓRIO CENTRAL": 1
        }
      }
    },
    consultas_tecnicas: {
      "30_days": {
        "total_consultas": 7,
        "consultas_por_unidade": {
          "Unidade A": 3,
          "Unidade B": 2,
          "Unidade C": 2
        }
      }
    }
  },
  charts: {},
  filters: {
    companies: {
      empresas_disponiveis: [
        { code: 655296, name: "SYNGENTA PROTEÇÃO DE CULTIVOS LTDA" },
        { code: 655298, name: "SYNGENTA SEEDS LTDA" },
        { code: 768872, name: "SYNGENTA DIVISÃO AGRÍCOLA CROP" },
        { code: 1468876, name: "SYNGENTA DIGITAL LTDA" },
        { code: 940622, name: "SYNGENTA SEEDS LTDA – DIVISÃO AGRÍCOLA" }
      ]
    }
  }
};

export const useDashboardData = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'30' | '60' | '90'>('30');
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'seguranca' | 'saude'>('todos');
  const [selectedCompany, setSelectedCompany] = useState<string>('todas');

  const filteredData = useMemo(() => {
    const periodKey = `${selectedPeriod}_days`;
    
    // Filtra dados baseado no período selecionado
    const processedData = {
      ...mockData,
      raw_data: {
        absenteismo: mockData.raw_data.absenteismo[periodKey] || mockData.raw_data.absenteismo["30_days"],
        aso_validos: mockData.raw_data.aso_validos[periodKey] || mockData.raw_data.aso_validos["30_days"],
        exames_alterados: mockData.raw_data.exames_alterados[periodKey] || mockData.raw_data.exames_alterados["30_days"],
        visitas_medicas: mockData.raw_data.visitas_medicas[periodKey] || mockData.raw_data.visitas_medicas["30_days"],
        consultas_tecnicas: mockData.raw_data.consultas_tecnicas[periodKey] || mockData.raw_data.consultas_tecnicas["30_days"]
      }
    };

    return processedData;
  }, [selectedPeriod, selectedCategory, selectedCompany]);

  const availableCompanies = mockData.filters.companies.empresas_disponiveis;

  return {
    data: filteredData,
    selectedPeriod,
    selectedCategory,
    selectedCompany,
    setSelectedPeriod,
    setSelectedCategory,
    setSelectedCompany,
    availableCompanies
  };
};
