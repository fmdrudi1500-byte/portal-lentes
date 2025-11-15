import type { QuizScores, LensRecommendation } from "./lensRecommendation";

export interface QuizResult {
  id: string;              // Código único de 6 dígitos (ex: "A3K9M2")
  timestamp: number;       // Data/hora da conclusão
  profileName?: string;    // Nome do perfil (se foi pré-configurado)
  patientName?: string;    // Nome do paciente (opcional)
  scores: QuizScores;      // Pontuações calculadas
  recommendations: LensRecommendation[];  // Top 3 lentes recomendadas
}

const STORAGE_KEY = "quiz_results";

/**
 * Salva um resultado de questionário no localStorage
 */
export function saveQuizResult(result: QuizResult): void {
  try {
    const existingResults = getAllQuizResults();
    existingResults.push(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingResults));
  } catch (error) {
    console.error("Erro ao salvar resultado:", error);
  }
}

/**
 * Busca um resultado por código único
 */
export function getQuizResultByCode(code: string): QuizResult | null {
  try {
    const results = getAllQuizResults();
    return results.find(r => r.id === code.toUpperCase()) || null;
  } catch (error) {
    console.error("Erro ao buscar resultado:", error);
    return null;
  }
}

/**
 * Retorna todos os resultados salvos
 */
export function getAllQuizResults(): QuizResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as QuizResult[];
  } catch (error) {
    console.error("Erro ao carregar resultados:", error);
    return [];
  }
}

/**
 * Verifica se um código já existe
 */
export function codeExists(code: string): boolean {
  const results = getAllQuizResults();
  return results.some(r => r.id === code.toUpperCase());
}

/**
 * Limpa todos os resultados (usar com cuidado!)
 */
export function clearAllResults(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Erro ao limpar resultados:", error);
  }
}

/**
 * Retorna resultados ordenados por data (mais recente primeiro)
 */
export function getRecentResults(limit?: number): QuizResult[] {
  const results = getAllQuizResults();
  const sorted = results.sort((a, b) => b.timestamp - a.timestamp);
  return limit ? sorted.slice(0, limit) : sorted;
}
