"use client";

import { useState, useEffect } from "react";
import { useCardRotation } from "./hooks/useCardRotation";
import { useImageLoad } from "./hooks/useImageLoad";
import { useInViewport } from "./useInViewport";
import { getCyberStatusConfig } from "./utils/cyberStyles";
import { CyberGrid } from "./card-parts/CyberGrid";
import { ScanLine } from "./card-parts/ScanLine";
import { CornerAccents } from "./card-parts/CornerAccents";
import { CyberStyles } from "./card-parts/CyberStyles";
import { CyberLoadingSpinner } from "./card-parts/CyberLoadingSpinner";
import { CyberCardFront } from "./card-parts/CyberCardFront";
import { CyberCardBack } from "./card-parts/CyberCardBack";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  episode: string[];
  gender: string;
  location: { name: string; url: string };
  origin: { name: string; url: string };
  species: string;
  type: string;
}

interface CharacterCardProps {
  character: Character;
}

export const CharacterCardII = ({ character }: CharacterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [hideSkeleton, setHideSkeleton] = useState(false);

  // Custom hooks
  const { rotation, handleMouseMove, resetRotation } = useCardRotation();
  const { imageLoaded, handleImageLoad } = useImageLoad();
  const { elementRef, isInViewport } = useInViewport({
    threshold: 0.1,
    rootMargin: "400px",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (imageLoaded) {
      // First fade out skeleton
      setHideSkeleton(true);
      // Then after skeleton fades, show card
      const timer = setTimeout(() => setShowCard(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowCard(false);
      setHideSkeleton(false);
    }
  }, [imageLoaded]);

  const statusConfig = getCyberStatusConfig(character.status);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    resetRotation();
    setIsHovered(false);
    setIsFlipped(false);
  };

  return (
    <div ref={elementRef} className="w-full">
      <div
        className="relative w-full h-64 sm:h-80 md:h-96 lg:h-112"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Skeleton Loading State - only show when in viewport and not loaded */}
        {!isInViewport && (
          <div className="absolute inset-0 bg-black rounded-xl sm:rounded-2xl border-4 sm:border-6 border-cyan-500/30">
            <div className="w-full h-full bg-slate-800" />
          </div>
        )}

        {isInViewport && (!imageLoaded || !showCard) && (
          <div 
            className="absolute inset-0 bg-black rounded-xl sm:rounded-2xl border-4 sm:border-6 border-cyan-500/30 overflow-hidden z-10"
            style={{ 
              opacity: hideSkeleton ? 0 : 1,
              transition: 'opacity 800ms cubic-bezier(0.4, 0.0, 0.2, 1)'
            }}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-linear-to-br from-slate-800 via-slate-700 to-slate-900 animate-pulse" />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
              <div className="h-full w-full bg-linear-to-r from-transparent via-cyan-500/10 to-transparent" />
            </div>

            {/* Skeleton content structure */}
            <div className="relative h-full p-6 flex flex-col">
              {/* Top badges skeleton */}
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-16 bg-slate-600/50 rounded-full animate-pulse" />
                <div className="h-6 w-20 bg-slate-600/50 rounded-full animate-pulse" />
              </div>

              {/* Center image placeholder */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-slate-600/50 animate-pulse" />
              </div>

              {/* Bottom text skeleton */}
              <div className="space-y-3">
                <div className="h-8 w-3/4 bg-slate-600/50 rounded mx-auto animate-pulse" />
                <div className="h-4 w-1/2 bg-slate-600/50 rounded mx-auto animate-pulse" />
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-400/30" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-pink-400/30" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-pink-400/30" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-400/30" />
          </div>
        )}

        {/* Preload image - only when in viewport */}
        {isInViewport && (
          <img
            src={character.image}
            alt={character.name}
            onLoad={handleImageLoad}
            className="hidden"
          />
        )}

        {/* Flip Card Container - only render when image is loaded */}
        {isInViewport && imageLoaded && (
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.6s cubic-bezier(.5,.3,.3,1), opacity 1200ms cubic-bezier(0.4, 0.0, 0.2, 1)",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              opacity: showCard ? 1 : 0,
            }}
          >
            {/* Card Front - Character Preview */}
            <div
              className="absolute inset-0 w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border-4 sm:border-6 border-cyan-500/30"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
                transformStyle: "preserve-3d",
                boxShadow: isHovered
                  ? "0 0 60px rgba(6, 182, 212, 0.4), 0 0 100px rgba(236, 72, 153, 0.2)"
                  : "0 0 30px rgba(6, 182, 212, 0.2)",
              }}
            >
              <CyberGrid />
              <ScanLine />
              <CornerAccents />
              <CyberCardFront
                characterImage={character.image}
                characterName={character.name}
              />
            </div>

            {/* Card Back - Full Character Data */}
            <div
              className="absolute inset-0 w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border-4 sm:border-6 border-cyan-500/30"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                transformStyle: "preserve-3d",
                boxShadow: isHovered
                  ? "0 0 60px rgba(6, 182, 212, 0.4), 0 0 100px rgba(236, 72, 153, 0.2)"
                  : "0 0 30px rgba(6, 182, 212, 0.2)",
              }}
            >
              <CyberGrid />
              <ScanLine />
              <CornerAccents />
              <CyberCardBack
                character={character}
                statusConfig={statusConfig}
                isHovered={isHovered}
              />
            </div>
          </div>
        )}
      </div>

      <CyberStyles />
    </div>
  );
};
