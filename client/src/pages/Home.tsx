import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LensCard from "@/components/LensCard";
import type { Lens, LensesData } from "@/types/lens";
import { Search, Calculator, GitCompare, Eye, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const [lenses, setLenses] = useState<Lens[]>([]);
  const [filteredLenses, setFilteredLenses] = useState<Lens[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/lenses_data.json")
      .then((res) => res.json())
      .then((data: LensesData) => {
        setLenses(data.lenses);
        setFilteredLenses(data.lenses);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar lentes:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = lenses;

    if (searchTerm) {
      filtered = filtered.filter(
        (lens) =>
          lens.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lens.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lens.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lens.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((lens) => lens.type === selectedType);
    }

    if (selectedManufacturer) {
      filtered = filtered.filter((lens) => lens.manufacturer === selectedManufacturer);
    }

    setFilteredLenses(filtered);
  }, [searchTerm, selectedType, selectedManufacturer, lenses]);

  const types = Array.from(new Set(lenses.map((lens) => lens.type)));
  const manufacturers = Array.from(new Set(lenses.map((lens) => lens.manufacturer)));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header Premium */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 sticky top-0 z-50 shadow-sm">
        <div className="container py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl blur-lg opacity-20"></div>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                  <Eye className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent">
                  Portal de Lentes
                </h1>
                <p className="text-sm text-slate-600 font-medium">Catálogo Premium de Lentes Intraoculares</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/">
                <Button 
                  variant="ghost" 
                  size="default"
                  className="text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Questionário
                </Button>
              </Link>
              <Link href="/compare">
                <Button 
                  variant="outline" 
                  size="default"
                  className="border-slate-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <GitCompare className="w-4 h-4 mr-2" />
                  Comparar
                </Button>
              </Link>
              <Link href="/calculator">
                <Button 
                  variant="outline" 
                  size="default"
                  className="border-slate-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculadora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Premium */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-amber-500/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 text-blue-700 text-sm font-semibold mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Tecnologia de Ponta em Oftalmologia
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent leading-tight">
              Encontre a Lente Ideal
            </h2>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Explore nosso catálogo completo com lentes intraoculares premium, 
              incluindo informações técnicas, dados clínicos e estudos científicos.
            </p>

            {/* Search Bar Premium */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative flex items-center bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
                  <Search className="w-5 h-5 text-slate-400 ml-6" />
                  <Input
                    placeholder="Buscar por nome, fabricante ou tipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-0 focus-visible:ring-0 text-lg py-7 px-4 bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-y border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <div className="container">
          <div className="flex flex-wrap gap-8 items-start">
            {/* Tipo de Lente */}
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Tipo de Lente</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedType === null ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    selectedType === null 
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md" 
                      : "hover:bg-slate-100 hover:border-slate-400"
                  }`}
                  onClick={() => setSelectedType(null)}
                >
                  Todas
                </Badge>
                {types.map((type) => (
                  <Badge
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      selectedType === type 
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md" 
                        : "hover:bg-slate-100 hover:border-slate-400"
                    }`}
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Fabricante */}
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Fabricante</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedManufacturer === null ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    selectedManufacturer === null 
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md" 
                      : "hover:bg-slate-100 hover:border-slate-400"
                  }`}
                  onClick={() => setSelectedManufacturer(null)}
                >
                  Todos
                </Badge>
                {manufacturers.map((manufacturer) => (
                  <Badge
                    key={manufacturer}
                    variant={selectedManufacturer === manufacturer ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      selectedManufacturer === manufacturer 
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md" 
                        : "hover:bg-slate-100 hover:border-slate-400"
                    }`}
                    onClick={() => setSelectedManufacturer(manufacturer)}
                  >
                    {manufacturer}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 flex-1">
        <div className="container">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900">
              {filteredLenses.length} {filteredLenses.length === 1 ? "Lente" : "Lentes"}
            </h3>
            <p className="text-slate-600 mt-1">
              {selectedType || selectedManufacturer || searchTerm
                ? "Resultados filtrados"
                : "Catálogo completo disponível"}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600 font-medium">Carregando lentes...</p>
              </div>
            </div>
          ) : filteredLenses.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">Nenhuma lente encontrada</h4>
              <p className="text-slate-600">Tente ajustar os filtros ou termo de busca</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLenses.map((lens) => (
                <LensCard key={lens.id} lens={lens} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white/50 backdrop-blur-sm py-8 mt-auto">
        <div className="container">
          <div className="text-center">
            <p className="text-slate-700 font-semibold mb-1">Portal de Lentes - Catálogo Completo de Lentes Intraoculares</p>
            <p className="text-sm text-slate-600">
              Informações baseadas em estudos científicos e publicações peer-reviewed
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
