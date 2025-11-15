import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import ProfileSelector from "@/components/ProfileSelector";
import { preConfiguredProfiles, type PreConfiguredProfile } from "@/lib/preConfiguredProfiles";
import type { QuizScores } from "@/lib/lensRecommendation";

interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

interface QuizOption {
  id: string;
  text: string;
  scores: {
    monofocal: number;
    toric: number;
    edof: number;
    multifocal: number;
    trifocal: number;
  };
  astigmatismFlag?: boolean;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual é sua principal necessidade visual após a cirurgia?",
    options: [
      {
        id: "1a",
        text: "Ver bem de longe (dirigir, TV, paisagens)",
        scores: { monofocal: 3, toric: 0, edof: 1, multifocal: 0, trifocal: 0 }
      },
      {
        id: "1b",
        text: "Ver bem de perto (leitura, celular)",
        scores: { monofocal: 0, toric: 0, edof: 1, multifocal: 2, trifocal: 2 }
      },
      {
        id: "1c",
        text: "Ver bem no computador (distância intermediária)",
        scores: { monofocal: 0, toric: 0, edof: 3, multifocal: 1, trifocal: 1 }
      },
      {
        id: "1d",
        text: "Ver bem em todas as distâncias",
        scores: { monofocal: 0, toric: 0, edof: 2, multifocal: 5, trifocal: 5 }
      }
    ]
  },
  {
    id: 2,
    question: "Com que frequência você trabalha com computador ou faz leituras prolongadas?",
    options: [
      {
        id: "2a",
        text: "Muito (mais de 6 horas por dia)",
        scores: { monofocal: 0, toric: 0, edof: 4, multifocal: 2, trifocal: 2 }
      },
      {
        id: "2b",
        text: "Moderado (2-6 horas por dia)",
        scores: { monofocal: 1, toric: 0, edof: 3, multifocal: 3, trifocal: 3 }
      },
      {
        id: "2c",
        text: "Pouco (menos de 2 horas por dia)",
        scores: { monofocal: 2, toric: 0, edof: 1, multifocal: 1, trifocal: 1 }
      }
    ]
  },
  {
    id: 3,
    question: "Você dirige à noite com frequência?",
    options: [
      {
        id: "3a",
        text: "Sim, frequentemente",
        scores: { monofocal: 5, toric: 0, edof: 3, multifocal: -2, trifocal: -2 }
      },
      {
        id: "3b",
        text: "Ocasionalmente",
        scores: { monofocal: 2, toric: 0, edof: 2, multifocal: 1, trifocal: 1 }
      },
      {
        id: "3c",
        text: "Não dirijo ou raramente à noite",
        scores: { monofocal: 0, toric: 0, edof: 1, multifocal: 3, trifocal: 3 }
      }
    ]
  },
  {
    id: 4,
    question: "Você tem astigmatismo? (seu médico informou ou você usa óculos para astigmatismo)",
    options: [
      {
        id: "4a",
        text: "Sim, tenho astigmatismo",
        scores: { monofocal: 0, toric: 10, edof: 0, multifocal: 0, trifocal: 0 },
        astigmatismFlag: true
      },
      {
        id: "4b",
        text: "Não tenho astigmatismo",
        scores: { monofocal: 0, toric: 0, edof: 0, multifocal: 0, trifocal: 0 }
      },
      {
        id: "4c",
        text: "Não sei / Preciso verificar",
        scores: { monofocal: 0, toric: 2, edof: 0, multifocal: 0, trifocal: 0 }
      }
    ]
  },
  {
    id: 5,
    question: "Qual é sua maior prioridade?",
    options: [
      {
        id: "5a",
        text: "Independência total de óculos",
        scores: { monofocal: 0, toric: 0, edof: 2, multifocal: 5, trifocal: 5 }
      },
      {
        id: "5b",
        text: "Melhor qualidade visual possível",
        scores: { monofocal: 5, toric: 0, edof: 3, multifocal: 1, trifocal: 1 }
      },
      {
        id: "5c",
        text: "Equilíbrio entre qualidade e independência",
        scores: { monofocal: 1, toric: 0, edof: 4, multifocal: 2, trifocal: 2 }
      },
      {
        id: "5d",
        text: "Custo-benefício",
        scores: { monofocal: 3, toric: 0, edof: 1, multifocal: 0, trifocal: 0 }
      }
    ]
  },
  {
    id: 6,
    question: "Você se incomoda facilmente com halos ou brilhos ao redor de luzes à noite?",
    options: [
      {
        id: "6a",
        text: "Sim, sou muito sensível",
        scores: { monofocal: 5, toric: 0, edof: 2, multifocal: -3, trifocal: -3 }
      },
      {
        id: "6b",
        text: "Um pouco sensível",
        scores: { monofocal: 3, toric: 0, edof: 3, multifocal: 1, trifocal: 1 }
      },
      {
        id: "6c",
        text: "Não me incomoda",
        scores: { monofocal: 1, toric: 0, edof: 2, multifocal: 3, trifocal: 3 }
      }
    ]
  },
  {
    id: 7,
    question: "Como você descreveria seu estilo de vida?",
    options: [
      {
        id: "7a",
        text: "Muito ativo (esportes, viagens, atividades variadas)",
        scores: { monofocal: 0, toric: 0, edof: 2, multifocal: 4, trifocal: 4 }
      },
      {
        id: "7b",
        text: "Moderadamente ativo",
        scores: { monofocal: 1, toric: 0, edof: 3, multifocal: 2, trifocal: 2 }
      },
      {
        id: "7c",
        text: "Mais caseiro / rotina tranquila",
        scores: { monofocal: 2, toric: 0, edof: 2, multifocal: 1, trifocal: 1 }
      }
    ]
  }
];

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuizOption>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showProfileSelector, setShowProfileSelector] = useState(false);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;
  const canProceed = answers[currentQuestion] !== undefined;

  const handleOptionSelect = (option: QuizOption) => {
    setSelectedOption(option.id);
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleNext = () => {
    console.log('handleNext called', { currentQuestion, isLastQuestion, canProceed, answersCount: Object.keys(answers).length });
    
    if (!canProceed) {
      console.log('Cannot proceed - no answer selected');
      return;
    }
    
    if (isLastQuestion) {
      // Calcular resultados e navegar para página de resultados
      console.log('Last question - calculating scores...');
      const scores = calculateScores();
      console.log('Scores calculated:', scores);
      const url = `/quiz-results?scores=${encodeURIComponent(JSON.stringify(scores))}`;
      console.log('Navigating to:', url);
      setLocation(url);
    } else {
      console.log('Moving to next question:', currentQuestion + 1);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1]?.id || null);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]?.id || null);
    }
  };

  const handleSelectProfile = (profile: PreConfiguredProfile) => {
    // Preencher respostas com base no perfil selecionado
    const profileAnswers: Record<number, QuizOption> = {};
    
    Object.entries(profile.answers).forEach(([questionIndex, optionId]) => {
      const qIndex = parseInt(questionIndex);
      const question = quizQuestions[qIndex];
      const option = question.options.find(opt => opt.id === optionId);
      if (option) {
        profileAnswers[qIndex] = option;
      }
    });
    
    setAnswers(profileAnswers);
    setCurrentQuestion(0);
    setSelectedOption(profileAnswers[0]?.id || null);
    
    // Navegar diretamente para resultados
    const scores = calculateScoresFromAnswers(profileAnswers);
    setLocation(`/quiz-results?scores=${encodeURIComponent(JSON.stringify(scores))}&profile=${encodeURIComponent(profile.name)}`);
  };

  const calculateScoresFromAnswers = (answersData: Record<number, QuizOption>): QuizScores => {
    const totalScores = {
      monofocal: 0,
      toric: 0,
      edof: 0,
      multifocal: 0,
      trifocal: 0,
      hasAstigmatism: false
    };

    Object.values(answersData).forEach((answer) => {
      totalScores.monofocal += answer.scores.monofocal;
      totalScores.toric += answer.scores.toric;
      totalScores.edof += answer.scores.edof;
      totalScores.multifocal += answer.scores.multifocal;
      totalScores.trifocal += answer.scores.trifocal;

      if (answer.astigmatismFlag) {
        totalScores.hasAstigmatism = true;
      }
    });

    return totalScores;
  };

  const calculateScores = () => {
    const totalScores = {
      monofocal: 0,
      toric: 0,
      edof: 0,
      multifocal: 0,
      trifocal: 0
    };

    let hasAstigmatism = false;

    Object.values(answers).forEach(answer => {
      totalScores.monofocal += answer.scores.monofocal;
      totalScores.toric += answer.scores.toric;
      totalScores.edof += answer.scores.edof;
      totalScores.multifocal += answer.scores.multifocal;
      totalScores.trifocal += answer.scores.trifocal;
      
      if (answer.astigmatismFlag) {
        hasAstigmatism = true;
      }
    });

    return { ...totalScores, hasAstigmatism };
  };

  const question = quizQuestions[currentQuestion];

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

      {/* Progress Bar */}
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
        </div>
      </div>

      {/* Question */}
      <main className="container pb-16">
        <div className="max-w-3xl mx-auto">
          <Card className="border-slate-200/60 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                {question.question}
              </h2>

              <div className="space-y-4">
                {question.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                      selectedOption === option.id
                        ? "border-blue-600 bg-blue-50 shadow-md"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-slate-900 font-medium">
                        {option.text}
                      </span>
                      {selectedOption === option.id && (
                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 ml-4" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
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
