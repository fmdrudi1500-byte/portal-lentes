import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

interface PresentationViewerProps {
  lensId: string;
  onClose: () => void;
}

export default function PresentationViewer({ lensId, onClose }: PresentationViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slides, setSlides] = useState<string[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    // Carregar lista de slides disponíveis
    const loadSlides = async () => {
      try {
        const response = await fetch(`/presentations/${lensId}/slide_state.json`);
        if (response.ok) {
          const data = await response.json();
          // Verificar se tem outline (novo formato)
          if (data.outline && Array.isArray(data.outline)) {
            const slideFiles = data.outline.map((s: any) => `${s.id}.html`);
            setSlides(slideFiles);
            setTotalSlides(slideFiles.length);
          } else if (data.slides && Array.isArray(data.slides)) {
            // Formato antigo com array de slides
            const slideFiles = data.slides.map((s: any) => s.file);
            setSlides(slideFiles);
            setTotalSlides(slideFiles.length);
          } else {
            // Fallback
            setTotalSlides(19);
          }
        } else {
          // Fallback: tentar carregar slides numerados
          setTotalSlides(19);
        }
      } catch (error) {
        console.error("Erro ao carregar slides:", error);
        setTotalSlides(19); // Fallback
      }
    };

    loadSlides();
  }, [lensId]);

  // Suporte a gestos touch para mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        if (isFullscreen) {
          exitFullscreen();
        } else {
          onClose();
        }
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, isFullscreen]);

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getSlideUrl = (slideNumber: number) => {
    if (slides.length > 0 && slides[slideNumber - 1]) {
      return `/presentations/${lensId}/${slides[slideNumber - 1]}`;
    }
    
    // Fallback para nomenclatura padrão
    const num = slideNumber.toString().padStart(2, '0');
    const slideNames = [
      'title', 'intro', 'solution', 'technology', 'defocus_curve',
      'visual_acuity', 'refractive_accuracy', 'spectacle_independence', 'comparison',
      'longterm_satisfaction', 'complications', 'intensity_study', 'portfolio',
      'portfolio_cont', 'support', 'sales_arguments', 'value_proposition',
      'value_proposition_cont', 'references', 'next_steps', 'closing'
    ];
    
    const slideName = slideNames[slideNumber - 1] || 'slide';
    return `/presentations/${lensId}/slide_${num}_${slideName}.html`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 h-12 w-12 md:h-10 md:w-10"
            >
              <X className="w-6 h-6 md:w-5 md:h-5" />
            </Button>
            <span className="text-white font-medium text-sm md:text-base">
              Slide {currentSlide} de {totalSlides}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/20 h-12 w-12 md:h-10 md:w-10 hidden md:flex"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Slide Content */}
      <div className="w-full h-full flex items-center justify-center p-2 md:p-4 pt-16 md:pt-20 pb-24 md:pb-20">
        <iframe
          key={currentSlide}
          src={getSlideUrl(currentSlide)}
          className="w-full h-full border-0 rounded-lg shadow-2xl"
          title={`Slide ${currentSlide}`}
        />
      </div>

      {/* Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className="text-white hover:bg-white/20 disabled:opacity-30 h-12 w-12 md:h-10 md:w-10"
          >
            <ChevronLeft className="w-7 h-7 md:w-6 md:h-6" />
          </Button>
          
          <div className="flex gap-1 overflow-x-auto max-w-[200px] md:max-w-none scrollbar-hide">
            {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentSlide(num)}
                className={`rounded-full transition-all shrink-0 ${
                  num === currentSlide
                    ? "bg-white w-8 h-3 md:w-8 md:h-2"
                    : "bg-white/40 hover:bg-white/60 w-2 h-3 md:w-2 md:h-2"
                }`}
                aria-label={`Ir para slide ${num}`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            className="text-white hover:bg-white/20 disabled:opacity-30 h-12 w-12 md:h-10 md:w-10"
          >
            <ChevronRight className="w-7 h-7 md:w-6 md:h-6" />
          </Button>
        </div>
        
        <p className="text-center text-white/60 text-xs mt-2 hidden md:block">
          Use as setas ← → ou espaço para navegar | ESC para sair | F para tela cheia
        </p>
        <p className="text-center text-white/60 text-xs mt-2 md:hidden">
          Deslize para navegar entre os slides
        </p>
      </div>
    </div>
  );
}
