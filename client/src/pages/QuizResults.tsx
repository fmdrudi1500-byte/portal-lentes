import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Lens, LensesData } from "@/types/lens";
import { calculateLensRecommendations, generateProfileSummary, type QuizScores, type LensRecommendation } from "@/lib/lensRecommendation";
import { CheckCircle2, ArrowRight, RotateCcw, Sparkles, Eye, Copy, Check } from "lucide-react";
import { generateUniqueCode } from "@/lib/codeGenerator";
import { saveQuizResult, codeExists, type QuizResult } from "@/lib/storageManager";

export default function QuizResults() {
  const [location] = useLocation();
  const [recommendations, setRecommendations] = useState<LensRecommendation[]>([]);
  const [lensesData, setLensesData] = useState<Lens[]>([]);
  const [profileSummary, setProfileSummary] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [uniqueCode, setUniqueCode] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Extrair scores da URL usando window.location.search
    const params = new URLSearchParams(window.location.search);
    const scoresParam = params.get("scores");
    
    console.log('QuizResults mounted', { search: window.location.search, scoresParam });
    
    if (!scoresParam) {
      window.location.href = "/";
      return;
    }

    try {
      const scores: QuizScores = JSON.parse(decodeURIComponent(scoresParam));
      
      // Calcular recomendações
      const recs = calculateLensRecommendations(scores);
      setRecommendations(recs);
      
      // Gerar resumo do perfil
      const summary = generateProfileSummary(scores);
      setProfileSummary(summary);
      
      // Gerar código único
      let code = generateUniqueCode();
      // Garantir que o código é único
      while (codeExists(code)) {
        code = generateUniqueCode();
      }
      setUniqueCode(code);
      
      // Carregar dados das lentes
      fetch("/lenses_data.json")
        .then((res) => res.json())
        .then((data: LensesData) => {
          setLensesData(data.lenses);
          
          // Salvar resultado no localStorage
          const profileName = params.get("profile") || undefined;
          const result: QuizResult = {
            id: code,
            timestamp: Date.now(),
            profileName,
            scores,
            recommendations: recs
          };
          saveQuizResult(result);
          
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao carregar lentes:", error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Erro ao processar resultados:", error);
      window.location.href = "/";
    }
  }, []); // Executar apenas uma vez no mount

  const getLensDetails = (lensId: string): Lens | undefined => {
    return lensesData.find(lens => lens.id === lensId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
          {/* Profile Summary */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Análise Completa!
                  </h2>
                  <p className="text-lg text-slate-700">
                    {profileSummary}
                  </p>
                  <p className="text-slate-600 mt-2">
                    Selecionamos as <strong>{recommendations.length} melhores opções</strong> de lentes para o seu perfil.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Unique Code Card */}
          {uniqueCode && (
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white shadow-lg mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        Seu Código de Acesso
                      </h3>
                      <p className="text-sm text-slate-600 mb-3">
                        Compartilhe este código com seu oftalmologista para que ele possa visualizar seus resultados.
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
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommended Lenses */}
          <div className="space-y-6 mb-8">
            {recommendations.map((rec, index) => {
              const lens = getLensDetails(rec.lensId);
              if (!lens) return null;

              return (
                <Card 
                  key={rec.lensId}
                  className="border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Lens Image */}
                    <div className="md:w-1/3 bg-gradient-to-br from-slate-50 to-white p-8 flex items-center justify-center relative">
                      {index === 0 && (
                        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Melhor Match
                        </Badge>
                      )}
                      <img
                        src={lens.image}
                        alt={lens.name}
                        className="w-full h-48 object-contain"
                      />
                    </div>

                    {/* Lens Details */}
                    <div className="md:w-2/3 p-6">
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <CardTitle className="text-2xl text-slate-900 mb-2">
                              {lens.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {rec.category}
                              </Badge>
                              <span className="text-sm text-slate-600">
                                ✨ {lens.manufacturer}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-0">
                        {/* Why Recommended */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <div className="flex items-start gap-2">
                            <Eye className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-green-900 mb-1">
                                Por que recomendamos:
                              </p>
                              <p className="text-sm text-green-800">
                                {rec.reason}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Key Features */}
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-slate-700 mb-2">
                            Principais Características:
                          </p>
                          <ul className="space-y-1">
                            {lens.keyFeatures.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Button */}
                        <Link href={`/lens/${lens.id}`}>
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 gap-2">
                            Ver Detalhes Completos
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* CTA to Catalog */}
          <Card className="border-slate-200/60 shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Quer explorar mais opções?
              </h3>
              <p className="text-slate-600 mb-6">
                Navegue pelo catálogo completo com todas as {lensesData.length} lentes disponíveis e compare especificações técnicas.
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
              <strong>Importante:</strong> Estas recomendações são baseadas em suas respostas e servem apenas como orientação educacional. 
              A escolha final da lente intraocular deve ser feita em consulta presencial com seu oftalmologista, 
              que realizará exames clínicos completos e considerará suas características oculares individuais, 
              histórico médico e expectativas visuais específicas.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
