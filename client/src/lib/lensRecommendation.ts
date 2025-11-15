export interface QuizScores {
  monofocal: number;
  toric: number;
  edof: number;
  multifocal: number;
  trifocal: number;
  hasAstigmatism: boolean;
}

export interface LensRecommendation {
  lensId: string;
  lensName: string;
  category: string;
  score: number;
  reason: string;
  priority: number; // 1 = highest priority
}

/**
 * Mapeia categorias de lentes para IDs específicos no catálogo
 */
const LENS_MAPPING = {
  monofocal: [
    { id: "tecnis-asferica", name: "TECNIS Asférica", category: "Monofocal Asférica" },
    { id: "bvi-isopure", name: "BVI ISOPURE", category: "Monofocal" }
  ],
  toric: [
    { id: "tecnis-toric", name: "TECNIS Toric ZCT", category: "Monofocal Tórica" }
  ],
  edof: [
    { id: "alcon-vivity", name: "Alcon Vivity", category: "EDOF" },
    { id: "tecnis-puresee", name: "TECNIS PureSee", category: "EDOF" },
    { id: "biotech-xtense", name: "BIOTECH XTENSE", category: "EDOF" }
  ],
  multifocal: [
    { id: "hanita-fullrange", name: "Hanita FullRange", category: "Multifocal" }
  ],
  trifocal: [
    { id: "hanita-intensity", name: "Hanita Intensity", category: "Trifocal" }
  ]
};

/**
 * Gera mensagens personalizadas explicando por que cada lente foi recomendada
 */
function generateReason(category: string, scores: QuizScores): string {
  const reasons: Record<string, string> = {
    monofocal: "Ideal para quem prioriza qualidade visual de longe, dirige à noite frequentemente e busca a melhor nitidez possível com redução de halos e aberrações.",
    toric: "Recomendada especialmente para correção de astigmatismo, proporcionando visão nítida e precisa em todas as condições de iluminação.",
    edof: "Perfeita para quem trabalha com computador, busca equilíbrio entre qualidade visual e independência de óculos, com excelente visão intermediária e redução de halos noturnos.",
    multifocal: "Indicada para quem deseja independência de óculos em múltiplas distâncias, com estilo de vida ativo e não dirige à noite com frequência.",
    trifocal: "Ideal para independência total de óculos em todas as distâncias (longe, intermediário e perto), perfeita para estilo de vida muito ativo e variado."
  };

  // Personalizar razão com base em astigmatismo
  if (category === "toric" && scores.hasAstigmatism) {
    return "Essencial para correção do seu astigmatismo, garantindo visão nítida e de alta qualidade. " + reasons.toric;
  }

  return reasons[category] || "Lente de alta qualidade adequada ao seu perfil.";
}

/**
 * Calcula recomendações de lentes baseado nas pontuações do questionário
 */
export function calculateLensRecommendations(scores: QuizScores): LensRecommendation[] {
  const recommendations: LensRecommendation[] = [];

  // Se tem astigmatismo, priorizar lentes tóricas
  if (scores.hasAstigmatism && scores.toric > 0) {
    LENS_MAPPING.toric.forEach(lens => {
      recommendations.push({
        lensId: lens.id,
        lensName: lens.name,
        category: lens.category,
        score: scores.toric + 100, // Boost score for astigmatism
        reason: generateReason("toric", scores),
        priority: 1
      });
    });
  }

  // Processar outras categorias
  const categories = [
    { key: "trifocal" as const, score: scores.trifocal },
    { key: "multifocal" as const, score: scores.multifocal },
    { key: "edof" as const, score: scores.edof },
    { key: "monofocal" as const, score: scores.monofocal }
  ];

  // Ordenar categorias por pontuação
  categories.sort((a, b) => b.score - a.score);

  // Adicionar lentes das categorias com pontuação positiva
  categories.forEach((category, index) => {
    if (category.score > 0) {
      const lenses = LENS_MAPPING[category.key];
      
      // Se for a categoria top, adicionar todas as lentes
      // Caso contrário, adicionar apenas a primeira
      const lensesToAdd = index === 0 ? lenses : lenses.slice(0, 1);
      
      lensesToAdd.forEach(lens => {
        recommendations.push({
          lensId: lens.id,
          lensName: lens.name,
          category: lens.category,
          score: category.score,
          reason: generateReason(category.key, scores),
          priority: index + (scores.hasAstigmatism ? 2 : 1)
        });
      });
    }
  });

  // Ordenar por prioridade e score
  recommendations.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return b.score - a.score;
  });

  // Retornar top 3 recomendações
  return recommendations.slice(0, 3);
}

/**
 * Gera um resumo do perfil do paciente baseado nas pontuações
 */
export function generateProfileSummary(scores: QuizScores): string {
  const profiles: string[] = [];

  if (scores.hasAstigmatism) {
    profiles.push("com astigmatismo");
  }

  if (scores.monofocal > scores.multifocal && scores.monofocal > scores.edof) {
    profiles.push("que prioriza qualidade visual de longe");
  } else if (scores.multifocal > 10 || scores.trifocal > 10) {
    profiles.push("que busca independência total de óculos");
  } else if (scores.edof > 8) {
    profiles.push("que trabalha muito com computador");
  }

  if (profiles.length === 0) {
    return "Baseado nas suas respostas, selecionamos as melhores opções para você.";
  }

  return `Perfil identificado: paciente ${profiles.join(", ")}.`;
}
