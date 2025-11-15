import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calculator as CalcIcon, Info } from "lucide-react";
import { toast } from "sonner";

export default function Calculator() {
  const [formula, setFormula] = useState<string>("srkt");
  const [k1, setK1] = useState<string>("");
  const [k2, setK2] = useState<string>("");
  const [axl, setAxl] = useState<string>("");
  const [acd, setAcd] = useState<string>("");
  const [aConstant, setAConstant] = useState<string>("118.5");
  const [targetRefraction, setTargetRefraction] = useState<string>("0");
  const [result, setResult] = useState<number | null>(null);

  const calculateSRKT = (k1Val: number, k2Val: number, axlVal: number, aConstVal: number, target: number): number => {
    // Fórmula SRK/T simplificada
    const kAvg = (k1Val + k2Val) / 2;
    const cornealPower = 337.5 / kAvg;
    
    // Cálculo simplificado da potência da LIO
    const power = aConstVal - 2.5 * axlVal - 0.9 * cornealPower + target;
    
    return Math.round(power * 2) / 2; // Arredonda para 0.5 D
  };

  const calculateHolladay = (k1Val: number, k2Val: number, axlVal: number, acdVal: number, target: number): number => {
    // Fórmula Holladay 1 simplificada
    const kAvg = (k1Val + k2Val) / 2;
    const cornealPower = 337.5 / kAvg;
    
    // Estimativa da posição efetiva da lente (ELP)
    const elp = acdVal + 0.05 * axlVal;
    
    // Cálculo simplificado
    const power = 118.0 - 2.3 * axlVal - 0.85 * cornealPower - 0.3 * elp + target;
    
    return Math.round(power * 2) / 2;
  };

  const calculateBarrett = (k1Val: number, k2Val: number, axlVal: number, acdVal: number, target: number): number => {
    // Fórmula Barrett Universal II simplificada
    const kAvg = (k1Val + k2Val) / 2;
    const cornealPower = 337.5 / kAvg;
    
    // Cálculo mais sofisticado da ELP
    const elp = 3.5 + 0.1 * acdVal + 0.05 * axlVal - 0.02 * kAvg;
    
    // Cálculo da potência
    const power = 119.0 - 2.4 * axlVal - 0.9 * cornealPower - 0.4 * elp + target;
    
    return Math.round(power * 2) / 2;
  };

  const handleCalculate = () => {
    const k1Val = parseFloat(k1);
    const k2Val = parseFloat(k2);
    const axlVal = parseFloat(axl);
    const acdVal = parseFloat(acd);
    const aConstVal = parseFloat(aConstant);
    const targetVal = parseFloat(targetRefraction);

    // Validações
    if (isNaN(k1Val) || isNaN(k2Val) || isNaN(axlVal)) {
      toast.error("Por favor, preencha K1, K2 e AXL");
      return;
    }

    if (k1Val < 35 || k1Val > 55 || k2Val < 35 || k2Val > 55) {
      toast.error("Valores de K devem estar entre 35 e 55 D");
      return;
    }

    if (axlVal < 18 || axlVal > 35) {
      toast.error("AXL deve estar entre 18 e 35 mm");
      return;
    }

    let calculatedPower: number;

    switch (formula) {
      case "srkt":
        if (isNaN(aConstVal)) {
          toast.error("Por favor, preencha a Constante A");
          return;
        }
        calculatedPower = calculateSRKT(k1Val, k2Val, axlVal, aConstVal, targetVal);
        break;
      case "holladay":
        if (isNaN(acdVal)) {
          toast.error("Por favor, preencha a ACD para a fórmula Holladay");
          return;
        }
        calculatedPower = calculateHolladay(k1Val, k2Val, axlVal, acdVal, targetVal);
        break;
      case "barrett":
        if (isNaN(acdVal)) {
          toast.error("Por favor, preencha a ACD para a fórmula Barrett");
          return;
        }
        calculatedPower = calculateBarrett(k1Val, k2Val, axlVal, acdVal, targetVal);
        break;
      default:
        calculatedPower = calculateSRKT(k1Val, k2Val, axlVal, aConstVal, targetVal);
    }

    setResult(calculatedPower);
    toast.success("Cálculo realizado com sucesso!");
  };

  const handleReset = () => {
    setK1("");
    setK2("");
    setAxl("");
    setAcd("");
    setAConstant("118.5");
    setTargetRefraction("0");
    setResult(null);
  };

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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
              <CalcIcon className="w-10 h-10 text-primary" />
              Calculadora de LIO
            </h1>
            <p className="text-muted-foreground">
              Calcule a potência da lente intraocular usando diferentes fórmulas biométricas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Card */}
            <Card>
              <CardHeader>
                <CardTitle>Dados Biométricos</CardTitle>
                <CardDescription>
                  Insira as medidas do paciente para calcular a potência da LIO
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="formula">Fórmula de Cálculo</Label>
                  <Select value={formula} onValueChange={setFormula}>
                    <SelectTrigger id="formula">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="srkt">SRK/T</SelectItem>
                      <SelectItem value="holladay">Holladay 1</SelectItem>
                      <SelectItem value="barrett">Barrett Universal II</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="k1">K1 (D)</Label>
                    <Input
                      id="k1"
                      type="number"
                      step="0.01"
                      placeholder="43.50"
                      value={k1}
                      onChange={(e) => setK1(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="k2">K2 (D)</Label>
                    <Input
                      id="k2"
                      type="number"
                      step="0.01"
                      placeholder="44.00"
                      value={k2}
                      onChange={(e) => setK2(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="axl">Comprimento Axial (mm)</Label>
                  <Input
                    id="axl"
                    type="number"
                    step="0.01"
                    placeholder="23.50"
                    value={axl}
                    onChange={(e) => setAxl(e.target.value)}
                  />
                </div>

                {(formula === "holladay" || formula === "barrett") && (
                  <div>
                    <Label htmlFor="acd">Profundidade da Câmara Anterior (mm)</Label>
                    <Input
                      id="acd"
                      type="number"
                      step="0.01"
                      placeholder="3.20"
                      value={acd}
                      onChange={(e) => setAcd(e.target.value)}
                    />
                  </div>
                )}

                {formula === "srkt" && (
                  <div>
                    <Label htmlFor="aConstant">Constante A</Label>
                    <Input
                      id="aConstant"
                      type="number"
                      step="0.1"
                      placeholder="118.5"
                      value={aConstant}
                      onChange={(e) => setAConstant(e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="target">Refração Alvo (D)</Label>
                  <Input
                    id="target"
                    type="number"
                    step="0.25"
                    placeholder="0.00"
                    value={targetRefraction}
                    onChange={(e) => setTargetRefraction(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCalculate} className="flex-1">
                    <CalcIcon className="w-4 h-4 mr-2" />
                    Calcular
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Limpar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Result Card */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resultado</CardTitle>
                  <CardDescription>Potência calculada da LIO</CardDescription>
                </CardHeader>
                <CardContent>
                  {result !== null ? (
                    <div className="text-center py-8">
                      <p className="text-sm text-muted-foreground mb-2">Potência da LIO</p>
                      <p className="text-6xl font-bold text-primary mb-2">
                        {result > 0 ? "+" : ""}
                        {result.toFixed(2)}
                      </p>
                      <p className="text-lg text-muted-foreground">Dioptrias</p>
                      <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
                        <p className="text-sm">
                          <span className="font-semibold">Fórmula:</span>{" "}
                          {formula === "srkt"
                            ? "SRK/T"
                            : formula === "holladay"
                            ? "Holladay 1"
                            : "Barrett Universal II"}
                        </p>
                        <p className="text-sm mt-1">
                          <span className="font-semibold">K Médio:</span>{" "}
                          {k1 && k2 ? ((parseFloat(k1) + parseFloat(k2)) / 2).toFixed(2) : "-"} D
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <CalcIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                      <p>Preencha os dados e clique em Calcular</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Informações Importantes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong>SRK/T:</strong> Fórmula de terceira geração, adequada para a maioria dos
                    casos. Requer a Constante A específica da lente.
                  </p>
                  <p>
                    <strong>Holladay 1:</strong> Considera a profundidade da câmara anterior para
                    melhor predição da posição efetiva da lente.
                  </p>
                  <p>
                    <strong>Barrett Universal II:</strong> Fórmula de última geração com alta
                    precisão, especialmente em olhos com comprimento axial extremo.
                  </p>
                  <p className="text-xs mt-4 pt-4 border-t">
                    <strong>Nota:</strong> Esta calculadora fornece estimativas baseadas em fórmulas
                    simplificadas. Para cálculos clínicos precisos, utilize equipamentos biométricos
                    profissionais e softwares dedicados.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
