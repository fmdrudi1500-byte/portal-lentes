import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SlideCarouselProps {
  lensId: string;
  onClose: () => void;
}

export default function SlideCarousel({ lensId, onClose }: SlideCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(12);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Detectar número total de slides
  useEffect(() => {
    // Para Hanita Intensity, FullRange, Alcon Vivity, TECNIS PureSee e Biotech XTENSE temos 12 slides verticais mobile
    if (lensId === "hanita-intensity" || lensId === "hanita-fullrange" || lensId === "alcon-vivity" || lensId === "tecnis-puresee" || lensId === "biotech-xtense" || lensId === "bvi-isopure" || lensId === "tecnis-toric") {
      setTotalSlides(12);
    }
  }, [lensId]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "Escape") {
        onClose();
      } else if (e.key === "+" || e.key === "=") {
        zoomIn();
      } else if (e.key === "-" || e.key === "_") {
        zoomOut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, zoom]);

  // Gestos touch para swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
      setZoom(1); // Reset zoom ao mudar de slide
    }
  };

  const prevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
      setZoom(1); // Reset zoom ao mudar de slide
    }
  };

  const zoomIn = () => {
    if (zoom < 3) {
      setZoom(Math.min(zoom + 0.25, 3));
    }
  };

  const zoomOut = () => {
    if (zoom > 1) {
      setZoom(Math.max(zoom - 0.25, 1));
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const goToSlide = (slideNumber: number) => {
    setCurrentSlide(slideNumber);
    setZoom(1);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex flex-col"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        maxHeight: '-webkit-fill-available'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4 md:p-6">
        <div className="flex items-center justify-between">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20 w-12 h-12 md:w-10 md:h-10"
          >
            <X className="w-6 h-6 md:w-5 md:h-5" />
          </Button>

          {/* Slide Counter */}
          <div className="text-white font-semibold text-base md:text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            Slide {currentSlide} de {totalSlides}
          </div>

          {/* Zoom & Fullscreen Controls (Desktop only) */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={zoomOut}
              disabled={zoom <= 1}
              className="text-white hover:bg-white/20 disabled:opacity-30"
            >
              <ZoomOut className="w-5 h-5" />
            </Button>
            <span className="text-white text-sm font-medium min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={zoomIn}
              disabled={zoom >= 3}
              className="text-white hover:bg-white/20 disabled:opacity-30"
            >
              <ZoomIn className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20 ml-2"
            >
              <Maximize2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile: Just fullscreen */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20 w-12 h-12"
            >
              <Maximize2 className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-2 md:p-8">
        <div className="relative w-[90%] h-[90%]">
          <img
            ref={imageRef}
            src={`/slides-mobile/${lensId}/slide_${currentSlide.toString().padStart(2, '0')}.jpg`}
            alt={`Slide ${currentSlide}`}
            className="w-full h-full object-contain transition-transform duration-300 ease-out"
            style={{
              transform: `scale(${zoom})`,
              cursor: zoom > 1 ? 'grab' : 'default'
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
        <div className="flex flex-col gap-4">
          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              disabled={currentSlide === 1}
              className="text-white hover:bg-white/20 disabled:opacity-30 w-14 h-14 md:w-12 md:h-12"
            >
              <ChevronLeft className="w-8 h-8 md:w-6 md:h-6" />
            </Button>

            <div className="text-white text-sm md:hidden">
              Deslize para navegar
            </div>
            <div className="text-white text-sm hidden md:block">
              Use as setas do teclado para navegar
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              disabled={currentSlide === totalSlides}
              className="text-white hover:bg-white/20 disabled:opacity-30 w-14 h-14 md:w-12 md:h-12"
            >
              <ChevronRight className="w-8 h-8 md:w-6 md:h-6" />
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide max-w-full">
            <div className="flex gap-2 px-4">
              {Array.from({ length: totalSlides }, (_, i) => i + 1).map((slideNum) => (
                <button
                  key={slideNum}
                  onClick={() => goToSlide(slideNum)}
                  className={`shrink-0 transition-all duration-300 rounded-full ${
                    slideNum === currentSlide
                      ? 'w-10 h-3 md:w-8 md:h-2.5 bg-white'
                      : 'w-3 h-3 md:w-2.5 md:h-2.5 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Ir para slide ${slideNum}`}
                />
              ))}
            </div>
          </div>

          {/* Mobile Zoom Controls */}
          <div className="md:hidden flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={zoomOut}
              disabled={zoom <= 1}
              className="text-white hover:bg-white/20 disabled:opacity-30 w-12 h-12"
            >
              <ZoomOut className="w-6 h-6" />
            </Button>
            <span className="text-white text-base font-medium min-w-[4rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={zoomIn}
              disabled={zoom >= 3}
              className="text-white hover:bg-white/20 disabled:opacity-30 w-12 h-12"
            >
              <ZoomIn className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
