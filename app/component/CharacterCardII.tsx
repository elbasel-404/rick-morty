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
        {/* Loading State */}
        {isInViewport && !imageLoaded && (
          <div className="absolute inset-0 bg-black rounded-xl sm:rounded-2xl border-4 sm:border-6 border-cyan-500/30">
            <CyberLoadingSpinner />
          </div>
        )}

        {/* Preload image */}
        {isInViewport && (
          <img
            src={character.image}
            alt={character.name}
            onLoad={handleImageLoad}
            className="hidden"
          />
        )}

        {/* Flip Card Container */}
        {imageLoaded && (
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.6s cubic-bezier(.5,.3,.3,1)",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
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
