import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Lens, LensesData } from "@/types/lens";
import {
  calculateIOLRecommendations,
  generateProfileSummary,
  type IOLScores,
  type IOLCategoryRecommendation
} from "@/lib/lensRecommendation";
import {
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Eye,
  Copy,
  Check,
  AlertTriangle,
  Star
} from "lucide-react";
import { generateUniqueCode } from "@/lib/codeGenerator";
import { saveQuizResult, codeExists, type QuizResult } from "@/lib/storageManager";

export default function QuizResults() {
  const [location] = useLocation();
  const [recommendations, setRecommendations] = useState<IOLCategoryRecommendation[]>([]);
  const [lensesData, setLensesData] = useState<Lens[]>([]);
  const [profileSummary, setProfileSummary] = useState<string>("");
  const [hasMedicalAlert, setHasMedicalAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uniqueCode, setUniqueCode] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scoresParam = params.get("scores");

    if (!scoresParam) {
      window.location.href = "/";
      return;
    }

    try {
      const scores: IOLScores = JSON.parse(decodeURIComponent(scoresParam));

      const recs = calculateIOLRecommendations(scores);
      setRecommendations(recs);
      setProfileSummary(generateProfileSummary(scores));
      setHasMedicalAlert(scores.hasMedicalAlert ?? false);

      let code = generateUniqueCode();
      while (codeExists(code)) code = generateUniqueCode();
      setUniqueCode(code);

      fetch("/lenses_data.json")
        .then((res) => res.json())
        .then((data: LensesData) => {
          setLensesData(data.lenses);

          const profileName = params.get("profile") || undefined;
          const result: QuizResult = {
            id: code,
            timestamp: Date.now(),
            profileName,
            scores,
            recommendations: recs.flatMap((r) =>
              r.lenses.slice(0, 1).map((l) => ({
                lensId: l.id,
                lensName: l.name,
                category: l.category,
                score: r.score,
                reason: r.reason,
                priority: r.isPrimary ? 1 : 2
              }))
            )
          };
          saveQuizResult(result);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } catch {
      window.location.href = "/";
    }
  }, []);

  const getLens = (lensId: string): Lens | undefined =>
    lensesData.find((l) => l.id === lensId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Analisando suas respostas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 sticky top-0 z-40 shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Suas Lentes Recomendadas</h1>
              <p className="text-sm text-slate-600">Baseado nas suas respostas</p>
            </div>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Refazer Questionário
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          {/* Medical alert banner */}
          {hasMedicalAlert && (
            <div className="mb-6 p-5 bg-red-50 border border-red-300 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-base font-bold text-red-800 mb-1">Atenção — Alerta Médico</p>
                <p className="text-sm text-red-700">
                  Consulte especialista em retina/glaucoma antes da escolha da lente intraocular.
                  A indicação definitiva deve considerar sua condição ocular específica.
                </p>
              </div>
            </div>
          )}

          {/* Profile Summary */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Análise Completa!</h2>
                  <p className="text-lg text-slate-700">{profileSummary}</p>
                  <p className="text-slate-600 mt-2">
                    Selecionamos as{" "}
                    <strong>{recommendations.length} categorias de lentes</strong> mais indicadas para
                    o seu perfil.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Unique Code */}
          {uniqueCode && (
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white shadow-lg mb-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Seu Código de Acesso</h3>
                    <p className="text-sm text-slate-600 mb-3">
                      Compartilhe este código com seu oftalmologista para que ele possa visualizar
                      seus resultados.
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="px-4 py-2 bg-white border-2 border-green-600 rounded-lg">
                        <span className="text-2xl font-bold text-green-700 tracking-widest">
                          {uniqueCode}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(uniqueCode);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="gap-2"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copiar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Category Recommendations — top 2 */}
          <div className="space-y-8 mb-8">
            {recommendations.map((rec) => (
              <CategoryCard
                key={rec.categoryKey}
                rec={rec}
                getLens={getLens}
              />
            ))}
          </div>

          {/* CTA to Catalog */}
          <Card className="border-slate-200/60 shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Quer explorar mais opções?</h3>
              <p className="text-slate-600 mb-6">
                Navegue pelo catálogo completo com todas as {lensesData.length} lentes disponíveis e
                compare especificações técnicas.
              </p>
              <Link href="/catalog">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Ver Catálogo Completo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-900">
              <strong>Importante:</strong> Estas recomendações são baseadas em suas respostas e servem
              apenas como orientação educacional. A escolha final da lente intraocular deve ser feita
              em consulta presencial com seu oftalmologista, que realizará exames clínicos completos e
              considerará suas características oculares individuais, histórico médico e expectativas
              visuais específicas.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────
// Category card sub-component
// ─────────────────────────────────────────────

function CategoryCard({
  rec,
  getLens
}: {
  rec: IOLCategoryRecommendation;
  getLens: (id: string) => Lens | undefined;
}) {
  return (
    <Card className="border-slate-200/60 shadow-lg overflow-hidden">
      {/* Category header */}
      <div
        className={`px-6 py-4 flex items-center gap-3 ${
          rec.isPrimary
            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
            : "bg-gradient-to-r from-slate-700 to-slate-800 text-white"
        }`}
      >
        {rec.isPrimary && <Star className="w-5 h-5 text-amber-300 fill-amber-300" />}
        <div>
          <h3 className="text-xl font-bold">{rec.categoryLabel}</h3>
          <p className="text-sm opacity-80">
            {rec.isPrimary ? "Indicação Principal" : "Alternativa Recomendada"}
          </p>
        </div>
        <Badge className="ml-auto bg-white/20 text-white border-white/30 text-sm">
          Score: {Math.round(rec.score)}
        </Badge>
      </div>

      <CardContent className="p-6">
        {/* Why recommended */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <Eye className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-900 mb-1">Por que recomendamos:</p>
              <p className="text-sm text-green-800">{rec.reason}</p>
            </div>
          </div>
        </div>

        {/* Lenses in category */}
        <p className="text-sm font-semibold text-slate-700 mb-4">
          Lentes disponíveis nesta categoria:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rec.lenses.map((lensRef) => {
            const lens = getLens(lensRef.id);
            if (!lens) return null;

            return (
              <div
                key={lensRef.id}
                className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={lens.image}
                    alt={lens.name}
                    className="w-16 h-16 object-contain rounded-lg bg-slate-50 p-1"
                  />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{lens.name}</p>
                    <p className="text-xs text-slate-500">{lens.manufacturer}</p>
                    <Badge
                      variant="outline"
                      className="mt-1 text-xs bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {lensRef.category}
                    </Badge>
                  </div>
                </div>
                <ul className="space-y-1 mb-3">
                  {lens.keyFeatures.slice(0, 2).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/lens/${lens.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    Ver Detalhes
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
