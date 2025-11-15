import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Lens, LensesData } from "@/types/lens";
import { ArrowLeft, CheckCircle2, Info, Microscope, Award, FileText, Presentation, Sparkles, GitCompare, Calculator } from "lucide-react";
import SlideCarousel from "@/components/SlideCarousel";

export default function LensDetail() {
  const [, params] = useRoute("/lens/:id");
  const [lens, setLens] = useState<Lens | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPresentation, setShowPresentation] = useState(false);

  useEffect(() => {
    fetch("/lenses_data.json")
      .then((res) => res.json())
      .then((data: LensesData) => {
        const foundLens = data.lenses.find((l) => l.id === params?.id);
        setLens(foundLens || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar lente:", error);
        setLoading(false);
      });
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Carregando detalhes...</p>
        </div>
      </div>
    );
  }

  if (!lens) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
          <Info className="w-10 h-10 text-slate-400" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Lente não encontrada</h2>
          <p className="text-slate-600 mb-6">A lente solicitada não existe no catálogo</p>
          <Link href="/catalog">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Catálogo
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header Premium */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 sticky top-0 z-40 shadow-sm">
        <div className="container py-4">
          <Link href="/catalog">
            <Button 
              variant="ghost" 
              size="default"
              className="hover:bg-blue-50 hover:text-blue-700 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Catálogo
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section Premium */}
      <section className="relative py-16 overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-amber-500/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Container Premium */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative aspect-square bg-white rounded-3xl p-12 flex items-center justify-center shadow-2xl border border-slate-200/60">
                <img
                  src={lens.image}
                  alt={lens.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 px-4 py-1.5 text-sm font-semibold shadow-lg">
                  {lens.type}
                </Badge>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent leading-tight">
                  {lens.name}
                </h1>
                
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <p className="text-xl font-semibold text-slate-700">{lens.manufacturer}</p>
                </div>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 text-blue-700 text-sm font-semibold mb-6 backdrop-blur-sm">
                  {lens.tagline}
                </div>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed">
                {lens.description}
              </p>

              {/* Action Buttons Premium */}
              <div className="flex flex-wrap gap-4 pt-4">
                {(lens.id === "hanita-intensity" || lens.id === "hanita-fullrange" || lens.id === "alcon-vivity" || lens.id === "tecnis-puresee" || lens.id === "biotech-xtense" || lens.id === "bvi-isopure" || lens.id === "tecnis-toric" || lens.id === "tecnis-asferica") && (
                  <Button 
                    onClick={() => setShowPresentation(true)} 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Presentation className="w-5 h-5 mr-2" />
                    Ver Apresentação
                  </Button>
                )}
                <Link href="/compare">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-slate-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <GitCompare className="w-5 h-5 mr-2" />
                    Comparar com Outras
                  </Button>
                </Link>
                <Link href="/calculator">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-slate-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculadora de LIO
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Premium */}
      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-12 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-slate-200/60">
              <TabsTrigger value="features" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300">
                Características
              </TabsTrigger>
              <TabsTrigger value="technology" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300">
                Tecnologia
              </TabsTrigger>
              <TabsTrigger value="clinical" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300">
                Dados Clínicos
              </TabsTrigger>
              <TabsTrigger value="specs" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300">
                Especificações
              </TabsTrigger>
              <TabsTrigger value="advantages" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300">
                Vantagens
              </TabsTrigger>
              <TabsTrigger value="indications" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300">
                Indicações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <Card className="border-slate-200/60 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    Características Principais
                  </CardTitle>
                  <CardDescription className="text-base">
                    Principais recursos e diferenciais desta lente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {lens.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-transparent hover:from-blue-50 transition-colors duration-300">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technology">
              <Card className="border-slate-200/60 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                      <Microscope className="w-5 h-5 text-white" />
                    </div>
                    {lens.technology.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed text-lg p-6 rounded-xl bg-gradient-to-r from-blue-50/50 to-transparent">
                    {lens.technology.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clinical">
              <Card className="border-slate-200/60 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                      <Info className="w-5 h-5 text-white" />
                    </div>
                    Dados Clínicos e Estudos
                  </CardTitle>
                  <CardDescription className="text-base">
                    Resultados de estudos científicos e dados clínicos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(lens.clinicalData).map(([key, value], index) => (
                      <div key={index} className="p-6 rounded-xl bg-gradient-to-r from-blue-50/50 to-transparent">
                        <h4 className="font-bold text-lg mb-3 text-slate-900 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h4>
                        {Array.isArray(value) ? (
                          <ul className="space-y-2">
                            {value.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2"></div>
                                <span className="text-slate-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-slate-600 leading-relaxed">{value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs">
              <Card className="border-slate-200/60 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    Especificações Técnicas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(lens.specifications).map(([key, value], index) => (
                      <div key={index} className="p-6 rounded-xl bg-gradient-to-r from-blue-50/50 to-transparent hover:from-blue-50 transition-colors duration-300">
                        <h4 className="font-bold text-sm uppercase tracking-wide text-slate-500 mb-2">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h4>
                        <p className="text-lg font-semibold text-slate-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advantages">
              <Card className="border-slate-200/60 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    Vantagens e Benefícios
                  </CardTitle>
                  <CardDescription className="text-base">
                    Principais vantagens desta lente intraocular
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {lens.advantages.map((advantage, index) => (
                      <div key={index} className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-50/50 to-transparent hover:from-blue-50 transition-colors duration-300">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shrink-0">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-700 font-medium leading-relaxed">{advantage}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="indications">
              <Card className="border-slate-200/60 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    Indicações e Perfil do Paciente
                  </CardTitle>
                  <CardDescription className="text-base">
                    Para quem esta lente é mais indicada
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {lens.indications.map((indication, index) => (
                      <li key={index} className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-50/50 to-transparent hover:from-blue-50 transition-colors duration-300">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-700 leading-relaxed text-lg">{indication}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white/50 backdrop-blur-sm py-8 mt-12">
        <div className="container">
          <div className="text-center">
            <p className="text-slate-700 font-semibold mb-1">Portal de Lentes - Catálogo Completo de Lentes Intraoculares</p>
            <p className="text-sm text-slate-600">
              Informações baseadas em estudos científicos e publicações peer-reviewed
            </p>
          </div>
        </div>
      </footer>

      {/* Presentation Viewer */}
      {showPresentation && (lens.id === "hanita-intensity" || lens.id === "hanita-fullrange" || lens.id === "alcon-vivity" || lens.id === "tecnis-puresee" || lens.id === "biotech-xtense" || lens.id === "bvi-isopure" || lens.id === "tecnis-toric" || lens.id === "tecnis-asferica") && (
        <SlideCarousel
          lensId={lens.id}
          onClose={() => setShowPresentation(false)}
        />
      )}
    </div>
  );
}
