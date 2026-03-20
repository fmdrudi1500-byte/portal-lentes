/**
 * IOL Recommendation Engine v2
 * Base científica: ESCRS/ASCRS Guidelines 2024
 * Algoritmo versão 2.0.1
 */

export interface IOLScores {
  Trifocal: number;
  EDOF: number;
  MonofocalPlus: number;
  isTorica: boolean;
  hasMedicalAlert: boolean;
}

/** @deprecated Use IOLScores */
export type QuizScores = IOLScores;

export interface IOLCategoryRecommendation {
  categoryKey: "Trifocal" | "EDOF" | "MonofocalPlus";
  categoryLabel: string; // includes "Tórica" suffix when applicable
  score: number;
  isPrimary: boolean;
  lenses: Array<{ id: string; name: string; category: string }>;
  reason: string;
}

export interface LensRecommendation {
  lensId: string;
  lensName: string;
  category: string;
  score: number;
  reason: string;
  priority: number;
}

const LENS_MAPPING: Record<
  "Trifocal" | "EDOF" | "MonofocalPlus",
  Array<{ id: string; name: string; category: string }>
> = {
  Trifocal: [
    { id: "hanita-intensity", name: "Hanita Intensity", category: "Trifocal" }
  ],
  EDOF: [
    { id: "alcon-vivity", name: "Alcon Vivity", category: "EDOF" },
    { id: "tecnis-puresee", name: "TECNIS PureSee", category: "EDOF" },
    { id: "biotech-xtense", name: "BIOTECH XTENSE", category: "EDOF" }
  ],
  MonofocalPlus: [
    { id: "tecnis-asferica", name: "TECNIS Asférica", category: "Monofocal Plus" },
    { id: "bvi-isopure", name: "BVI ISOPURE", category: "Monofocal Plus" }
  ]
};

function generateReason(categoryKey: string, scores: IOLScores): string {
  const reasons: Record<string, string> = {
    Trifocal:
      "Ideal para quem busca independência total dos óculos em todas as distâncias (longe, intermediário e perto), com estilo de vida ativo e hobbies que exigem visão de precisão.",
    EDOF:
      "Perfeita para uso intenso de computador e ambientes digitais, oferecendo excelente visão intermediária com menor risco de halos noturnos.",
    MonofocalPlus:
      "Recomendada para quem prioriza a máxima qualidade de visão e contraste, especialmente em atividades que exigem percepção perfeita de cores e nitidez."
  };

  let reason = reasons[categoryKey] || "Lente de alta qualidade adequada ao seu perfil.";

  if (scores.isTorica) {
    reason += " Versão Tórica indicada para correção do astigmatismo.";
  }

  if (scores.hasMedicalAlert && categoryKey === "MonofocalPlus") {
    reason +=
      " Especialmente indicada considerando sua condição ocular — consulte um especialista em retina/glaucoma.";
  }

  return reason;
}

/**
 * Retorna as duas categorias com maior score acumulado (top_2_regra).
 * Adiciona sufixo "Tórica" se trigger_torica for true (torica_regra).
 */
export function calculateIOLRecommendations(scores: IOLScores): IOLCategoryRecommendation[] {
  const categories = (
    ["Trifocal", "EDOF", "MonofocalPlus"] as Array<"Trifocal" | "EDOF" | "MonofocalPlus">
  ).map((key) => ({ key, score: scores[key] }));

  categories.sort((a, b) => b.score - a.score);

  const top2 = categories.slice(0, 2);

  return top2.map((item, index) => {
    const suffix = scores.isTorica ? " Tórica" : "";
    const lenses = LENS_MAPPING[item.key].map((l) => ({
      ...l,
      category: l.category + suffix
    }));

    return {
      categoryKey: item.key,
      categoryLabel: item.key + suffix,
      score: item.score,
      isPrimary: index === 0,
      lenses,
      reason: generateReason(item.key, scores)
    };
  });
}

/**
 * Compatibilidade: retorna top 3 lentes individuais para uso legado.
 */
export function calculateLensRecommendations(scores: IOLScores): LensRecommendation[] {
  const recs = calculateIOLRecommendations(scores);
  const result: LensRecommendation[] = [];

  recs.forEach((rec, recIndex) => {
    rec.lenses.slice(0, recIndex === 0 ? 2 : 1).forEach((lens) => {
      result.push({
        lensId: lens.id,
        lensName: lens.name,
        category: lens.category,
        score: rec.score,
        reason: rec.reason,
        priority: recIndex + 1
      });
    });
  });

  return result.slice(0, 3);
}

export function generateProfileSummary(scores: IOLScores): string {
  const top = calculateIOLRecommendations(scores)[0];

  const summaries: Record<string, string> = {
    Trifocal: "perfil que busca independência total de óculos com estilo de vida ativo",
    EDOF: "perfil digital/profissional com uso intenso de dispositivos",
    MonofocalPlus: "perfil que prioriza máxima qualidade visual e contraste"
  };

  let summary = `Identificamos um ${summaries[top?.categoryKey] || "perfil equilibrado"}.`;

  if (scores.isTorica) {
    summary += " Correção de astigmatismo incluída na indicação.";
  }

  if (scores.hasMedicalAlert) {
    summary +=
      " Atenção: condição ocular especial detectada — consulte um especialista em retina/glaucoma.";
  }

  return summary;
}
