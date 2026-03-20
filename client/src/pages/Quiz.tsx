import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, AlertTriangle, Sparkles } from "lucide-react";
import ProfileSelector from "@/components/ProfileSelector";
import { preConfiguredProfiles, type PreConfiguredProfile } from "@/lib/preConfiguredProfiles";
import type { IOLScores } from "@/lib/lensRecommendation";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface IOLPesos {
  Trifocal: number;
  EDOF: number;
  MonofocalPlus: number;
}

interface EscalaQuestion {
  id: number;
  categoria: string;
  pergunta: string;
  tipo: "escala";
  pesos: IOLPesos;
}

interface BinaireQuestion {
  id: number;
  categoria: string;
  pergunta: string;
  tipo: "binario";
  pesos_sim: IOLPesos;
  pesos_nao?: IOLPesos;
  trigger_alerta_medico?: boolean;
}

interface OpcoesQuestion {
  id: number;
  categoria: string;
  pergunta: string;
  tipo: "opcoes";
  opcoes: Array<{
    texto: string;
    valor?: string;
    peso_ajuste?: IOLPesos;
    trigger_torica?: boolean | "check_biometria";
  }>;
}

type QuizQuestionDef = EscalaQuestion | BinaireQuestion | OpcoesQuestion;

export type QuizAnswer =
  | { type: "escala"; value: number }
  | { type: "binario"; value: boolean }
  | { type: "opcoes"; optionIndex: number };

// ─────────────────────────────────────────────
// Question definitions — based on OptiMatch IOL v2.0.1
// ─────────────────────────────────────────────

const quizQuestions: QuizQuestionDef[] = [
  {
    id: 1,
    categoria: "Independência",
    pergunta:
      "De 0 a 10, qual a importância de realizar tarefas de PERTO (leitura, celular) sem usar óculos?",
    tipo: "escala",
    pesos: { Trifocal: 1.0, EDOF: 0.4, MonofocalPlus: 0.0 }
  },
  {
    id: 2,
    categoria: "Vida Noturna",
    pergunta:
      "Com que frequência você dirige à noite ou realiza atividades em locais com luzes fortes?",
    tipo: "opcoes",
    opcoes: [
      {
        texto: "Frequentemente",
        valor: "A",
        peso_ajuste: { Trifocal: -5, EDOF: 2, MonofocalPlus: 5 }
      },
      {
        texto: "Raramente",
        valor: "B",
        peso_ajuste: { Trifocal: 2, EDOF: 1, MonofocalPlus: 0 }
      }
    ]
  },
  {
    id: 3,
    categoria: "Digital",
    pergunta: "Você passa mais de 4 horas por dia usando computador, tablet ou painéis de controle?",
    tipo: "binario",
    pesos_sim: { Trifocal: 3, EDOF: 5, MonofocalPlus: 2 },
    pesos_nao: { Trifocal: 0, EDOF: 0, MonofocalPlus: 0 }
  },
  {
    id: 4,
    categoria: "Hobbies",
    pergunta:
      "Você possui hobbies que exigem visão de precisão (costura, pintura, eletrônica)?",
    tipo: "binario",
    pesos_sim: { Trifocal: 5, EDOF: 2, MonofocalPlus: 0 },
    pesos_nao: { Trifocal: 0, EDOF: 0, MonofocalPlus: 0 }
  },
  {
    id: 5,
    categoria: "Esportes",
    pergunta: "Você pratica esportes ativos como tênis, golfe ou corrida?",
    tipo: "binario",
    pesos_sim: { Trifocal: 2, EDOF: 5, MonofocalPlus: 3 },
    pesos_nao: { Trifocal: 0, EDOF: 0, MonofocalPlus: 0 }
  },
  {
    id: 6,
    categoria: "Psicológico",
    pergunta:
      "Para ficar livre dos óculos, você aceitaria ver pequenos anéis de luz ao redor de lâmpadas à noite?",
    tipo: "binario",
    pesos_sim: { Trifocal: 5, EDOF: 2, MonofocalPlus: -5 },
    pesos_nao: { Trifocal: -10, EDOF: 1, MonofocalPlus: 5 }
  },
  {
    id: 7,
    categoria: "Contraste",
    pergunta:
      "Sua atividade profissional exige a percepção perfeita de cores e contrastes (ex: Fotógrafo, Designer)?",
    tipo: "binario",
    pesos_sim: { Trifocal: -3, EDOF: 2, MonofocalPlus: 5 },
    pesos_nao: { Trifocal: 2, EDOF: 0, MonofocalPlus: 0 }
  },
  {
    id: 8,
    categoria: "Astigmatismo",
    pergunta:
      "Você já foi diagnosticado com Astigmatismo ou usa óculos para 'visão borrada' desde jovem?",
    tipo: "opcoes",
    opcoes: [
      { texto: "Sim", trigger_torica: true },
      { texto: "Não", trigger_torica: false },
      { texto: "Não sei", trigger_torica: "check_biometria" }
    ]
  },
  {
    id: 9,
    categoria: "Segurança",
    pergunta:
      "Você possui Glaucoma, Diabetes com afetamento ocular ou Degeneração de Mácula?",
    tipo: "binario",
    trigger_alerta_medico: true,
    pesos_sim: { Trifocal: -100, EDOF: -20, MonofocalPlus: 10 }
  },
  {
    id: 10,
    categoria: "Personalidade",
    pergunta: "Como você se descreve em relação a mudanças?",
    tipo: "opcoes",
    opcoes: [
      {
        texto: "Muito perfeccionista e detalhista",
        peso_ajuste: { Trifocal: -4, EDOF: 0, MonofocalPlus: 4 }
      },
      {
        texto: "Adaptável e prático",
        peso_ajuste: { Trifocal: 4, EDOF: 2, MonofocalPlus: 0 }
      }
    ]
  },
  {
    id: 11,
    categoria: "Luz",
    pergunta:
      "Você costuma frequentar muitos ambientes com baixa iluminação (ex: restaurantes, cinemas)?",
    tipo: "binario",
    pesos_sim: { Trifocal: -2, EDOF: 3, MonofocalPlus: 5 },
    pesos_nao: { Trifocal: 0, EDOF: 0, MonofocalPlus: 0 }
  },
  {
    id: 12,
    categoria: "Prioridade Final",
    pergunta: "Se pudesse escolher apenas uma vantagem, qual seria?",
    tipo: "opcoes",
    opcoes: [
      {
        texto: "Conveniência (não usar óculos)",
        peso_ajuste: { Trifocal: 10, EDOF: 4, MonofocalPlus: -5 }
      },
      {
        texto: "Qualidade de Visão (imagem mais limpa possível)",
        peso_ajuste: { Trifocal: -5, EDOF: 3, MonofocalPlus: 10 }
      }
    ]
  }
];

// ─────────────────────────────────────────────
// Score calculation
// ─────────────────────────────────────────────

export function calculateIOLScores(answers: Record<number, QuizAnswer>): IOLScores {
  const scores: IOLScores = {
    Trifocal: 0,
    EDOF: 0,
    MonofocalPlus: 0,
    isTorica: false,
    hasMedicalAlert: false
  };

  quizQuestions.forEach((q, index) => {
    const answer = answers[index];
    if (!answer) return;

    if (q.tipo === "escala" && answer.type === "escala") {
      const pesos = (q as EscalaQuestion).pesos;
      scores.Trifocal += pesos.Trifocal * answer.value;
      scores.EDOF += pesos.EDOF * answer.value;
      scores.MonofocalPlus += pesos.MonofocalPlus * answer.value;
    } else if (q.tipo === "binario" && answer.type === "binario") {
      const bq = q as BinaireQuestion;
      if (answer.value) {
        scores.Trifocal += bq.pesos_sim.Trifocal;
        scores.EDOF += bq.pesos_sim.EDOF;
        scores.MonofocalPlus += bq.pesos_sim.MonofocalPlus;
        if (bq.trigger_alerta_medico) {
          scores.hasMedicalAlert = true;
        }
      } else if (bq.pesos_nao) {
        scores.Trifocal += bq.pesos_nao.Trifocal;
        scores.EDOF += bq.pesos_nao.EDOF;
        scores.MonofocalPlus += bq.pesos_nao.MonofocalPlus;
      }
    } else if (q.tipo === "opcoes" && answer.type === "opcoes") {
      const oq = q as OpcoesQuestion;
      const option = oq.opcoes[answer.optionIndex];
      if (!option) return;
      if (option.peso_ajuste) {
        scores.Trifocal += option.peso_ajuste.Trifocal;
        scores.EDOF += option.peso_ajuste.EDOF;
        scores.MonofocalPlus += option.peso_ajuste.MonofocalPlus;
      }
      if (option.trigger_torica === true) {
        scores.isTorica = true;
      }
    }
  });

  return scores;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuizAnswer>>({});
  const [showProfileSelector, setShowProfileSelector] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;
  const currentAnswer = answers[currentQuestion];
  const canProceed = currentAnswer !== undefined;

  // Check if medical alert should be shown on current question
  const showMedicalAlert =
    question.tipo === "binario" &&
    (question as BinaireQuestion).trigger_alerta_medico === true &&
    currentAnswer?.type === "binario" &&
    (currentAnswer as { type: "binario"; value: boolean }).value === true;

  // ── Answer handlers ───────────────────────

  const handleEscalaChange = (value: number[]) => {
    setAnswers({ ...answers, [currentQuestion]: { type: "escala", value: value[0] } });
  };

  const handleBinario = (value: boolean) => {
    setAnswers({ ...answers, [currentQuestion]: { type: "binario", value } });
  };

  const handleOpcoes = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: { type: "opcoes", optionIndex } });
  };

  // ── Navigation ────────────────────────────

  const handleNext = () => {
    if (!canProceed) return;
    if (isLastQuestion) {
      const scores = calculateIOLScores(answers);
      setLocation(`/quiz-results?scores=${encodeURIComponent(JSON.stringify(scores))}`);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSelectProfile = (profile: PreConfiguredProfile) => {
    const scores = calculateIOLScores(profile.answers);
    setLocation(
      `/quiz-results?scores=${encodeURIComponent(JSON.stringify(scores))}&profile=${encodeURIComponent(profile.name)}`
    );
  };

  // ── Render helpers ────────────────────────

  const renderEscala = (q: EscalaQuestion) => {
    const val = (currentAnswer as { type: "escala"; value: number } | undefined)?.value ?? 5;
    return (
      <div className="space-y-8">
        <div className="text-center">
          <span className="text-6xl font-bold text-blue-600">{val}</span>
          <span className="text-2xl text-slate-500"> / 10</span>
        </div>
        <Slider
          min={0}
          max={10}
          step={1}
          value={[val]}
          onValueChange={handleEscalaChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-slate-500">
          <span>0 — Nenhuma importância</span>
          <span>10 — Extremamente importante</span>
        </div>
        <div className="grid grid-cols-11 gap-1 mt-2">
          {Array.from({ length: 11 }, (_, i) => (
            <button
              key={i}
              onClick={() => handleEscalaChange([i])}
              className={`py-2 rounded-lg text-sm font-medium transition-all ${
                val === i
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-blue-100"
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderBinario = () => {
    const val = (currentAnswer as { type: "binario"; value: boolean } | undefined)?.value;
    return (
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Sim", value: true },
          { label: "Não", value: false }
        ].map(({ label, value }) => (
          <button
            key={label}
            onClick={() => handleBinario(value)}
            className={`p-6 rounded-xl border-2 text-lg font-semibold transition-all duration-300 ${
              val === value
                ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    );
  };

  const renderOpcoes = (q: OpcoesQuestion) => {
    const selectedIndex = (currentAnswer as { type: "opcoes"; optionIndex: number } | undefined)
      ?.optionIndex;
    return (
      <div className="space-y-4">
        {q.opcoes.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOpcoes(index)}
            className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
              selectedIndex === index
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"
            }`}
          >
            <span className="text-lg text-slate-900 font-medium">{option.texto}</span>
          </button>
        ))}
      </div>
    );
  };

  // ── Layout ────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 sticky top-0 z-40 shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Encontre sua Lente Ideal</h1>
              <p className="text-sm text-slate-600">Questionário de Indicação Personalizada</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowProfileSelector(true)}
                className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Testar Perfil
              </Button>
              <Button
                variant="ghost"
                onClick={() => setLocation("/catalog")}
                className="text-slate-600 hover:text-slate-900"
              >
                Pular Questionário
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="container py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              Pergunta {currentQuestion + 1} de {quizQuestions.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(progress)}% completo
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wide">
            {question.categoria}
          </p>
        </div>
      </div>

      {/* Question */}
      <main className="container pb-16">
        <div className="max-w-3xl mx-auto">
          <Card className="border-slate-200/60 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">{question.pergunta}</h2>

              {question.tipo === "escala" && renderEscala(question as EscalaQuestion)}
              {question.tipo === "binario" && renderBinario()}
              {question.tipo === "opcoes" && renderOpcoes(question as OpcoesQuestion)}

              {/* Medical alert — shown when Q9 answer is "Sim" */}
              {showMedicalAlert && (
                <div className="mt-6 p-4 bg-red-50 border border-red-300 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800 font-medium">
                    Consulte especialista em retina/glaucoma antes da escolha da lente intraocular.
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentQuestion === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 gap-2"
                >
                  {isLastQuestion ? "Ver Resultados" : "Próxima"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-900">
              <strong>Importante:</strong> Este questionário é apenas uma ferramenta educacional.
              A escolha final da lente deve ser feita em consulta com seu oftalmologista,
              considerando exames clínicos completos.
            </p>
          </div>
        </div>
      </main>

      {/* Profile Selector Modal */}
      <ProfileSelector
        open={showProfileSelector}
        onOpenChange={setShowProfileSelector}
        onSelectProfile={handleSelectProfile}
      />
    </div>
  );
}
