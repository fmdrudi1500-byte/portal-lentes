import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Lens } from "@/types/lens";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";

interface LensCardProps {
  lens: Lens;
}

export default function LensCard({ lens }: LensCardProps) {
  return (
    <Link href={`/lens/${lens.id}`}>
      <div className="group relative">
        {/* Glow effect on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
        
        <Card className="relative h-full hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border-slate-200/60 bg-white">
          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30">
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src={lens.image}
              alt={lens.name}
              className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            
            {/* Floating badge */}
            <div className="absolute top-4 right-4">
              <Badge 
                variant="default" 
                className="bg-white/90 backdrop-blur-sm text-blue-700 border-blue-200 shadow-lg font-semibold px-3 py-1"
              >
                {lens.type}
              </Badge>
            </div>
          </div>

          <CardHeader className="pb-4 pt-6">
            <div className="flex items-start justify-between gap-3 mb-2">
              <CardTitle className="text-2xl font-bold group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                {lens.name}
              </CardTitle>
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                <ArrowRight className="w-4 h-4 text-blue-700" />
              </div>
            </div>
            <CardDescription className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {lens.manufacturer}
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-6">
            <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
              {lens.description}
            </p>
            
            {/* Features tags */}
            <div className="flex flex-wrap gap-2">
              {lens.keyFeatures.slice(0, 2).map((feature, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors px-3 py-1"
                >
                  {feature.length > 28 ? feature.substring(0, 28) + "..." : feature}
                </Badge>
              ))}
              {lens.keyFeatures.length > 2 && (
                <Badge 
                  variant="secondary" 
                  className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1"
                >
                  +{lens.keyFeatures.length - 2} mais
                </Badge>
              )}
            </div>

            {/* Hover indicator */}
            <div className="mt-4 pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-sm font-semibold text-blue-700 flex items-center gap-2">
                Ver detalhes completos
                <ArrowRight className="w-4 h-4" />
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
