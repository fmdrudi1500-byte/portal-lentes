import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Lens, LensesData } from "@/types/lens";
import { ArrowLeft, X } from "lucide-react";

export default function Compare() {
  const [lenses, setLenses] = useState<Lens[]>([]);
  const [selectedLenses, setSelectedLenses] = useState<Lens[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/lenses_data.json")
      .then((res) => res.json())
      .then((data: LensesData) => {
        setLenses(data.lenses);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar lentes:", error);
        setLoading(false);
      });
  }, []);

  const handleToggleLens = (lens: Lens) => {
    if (selectedLenses.find((l) => l.id === lens.id)) {
      setSelectedLenses(selectedLenses.filter((l) => l.id !== lens.id));
    } else {
      if (selectedLenses.length < 3) {
        setSelectedLenses([...selectedLenses, lens]);
      }
    }
  };

  const handleRemoveLens = (lensId: string) => {
    setSelectedLenses(selectedLenses.filter((l) => l.id !== lensId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container py-4">
          <Link href="/catalog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Catálogo
            </Button>
          </Link>
        </div>
      </header>

      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Comparar Lentes</h1>
          <p className="text-muted-foreground">
            Selecione até 3 lentes para comparar suas características, especificações e vantagens lado a lado.
          </p>
        </div>

        {selectedLenses.length === 0 ? (
          <Card className="mb-8">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Nenhuma lente selecionada. Escolha até 3 lentes abaixo para começar a comparação.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="mb-8 overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-max">
              {selectedLenses.map((lens) => (
                <Card key={lens.id} className="w-full md:w-80">
                  <CardHeader className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => handleRemoveLens(lens.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <div className="aspect-square bg-white rounded-lg p-4 mb-4">
                      <img
                        src={lens.image}
                        alt={lens.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <CardTitle className="text-lg">{lens.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{lens.manufacturer}</p>
                    <Badge className="w-fit mt-2">{lens.type}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Características</h4>
                      <ul className="space-y-1">
                        {lens.keyFeatures.slice(0, 3).map((feature, index) => (
                          <li key={index} className="text-xs text-muted-foreground">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Tecnologia</h4>
                      <p className="text-xs text-muted-foreground">{lens.technology.title}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Especificações</h4>
                      <div className="space-y-1">
                        {Object.entries(lens.specifications).slice(0, 3).map(([key, value]) => (
                          <div key={key} className="text-xs">
                            <span className="font-medium capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>{" "}
                            <span className="text-muted-foreground">
                              {Array.isArray(value) ? value[0] : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Principais Vantagens</h4>
                      <ul className="space-y-1">
                        {lens.advantages.slice(0, 3).map((advantage, index) => (
                          <li key={index} className="text-xs text-muted-foreground">
                            • {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href={`/lens/${lens.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Ver Detalhes Completos
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>
              Selecione Lentes para Comparar ({selectedLenses.length}/3)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lenses.map((lens) => {
                const isSelected = selectedLenses.find((l) => l.id === lens.id);
                const isDisabled = !isSelected && selectedLenses.length >= 3;

                return (
                  <div
                    key={lens.id}
                    className={`flex items-start gap-3 p-4 border rounded-lg transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:border-primary/50 cursor-pointer"
                    }`}
                    onClick={() => !isDisabled && handleToggleLens(lens)}
                  >
                    <Checkbox
                      checked={!!isSelected}
                      disabled={isDisabled}
                      onCheckedChange={() => handleToggleLens(lens)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3">
                        <img
                          src={lens.image}
                          alt={lens.name}
                          className="w-16 h-16 object-contain bg-white rounded p-1"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-1">{lens.name}</h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {lens.manufacturer}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {lens.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
