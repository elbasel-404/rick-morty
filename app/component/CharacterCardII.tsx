"use client";

import { useState } from "react";
import { CardContainer } from "./CardContainer";
import { useCardRotation } from "./hooks/useCardRotation";
import { getCyberStatusConfig } from "./utils/cyberStyles";
import { CyberGrid } from "./card-parts/CyberGrid";
import { ScanLine } from "./card-parts/ScanLine";
import { CornerAccents } from "./card-parts/CornerAccents";
import { CyberStyles } from "./card-parts/CyberStyles";
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
  const [isFlipped, setIsFlipped] = useState(false);

  // Custom hooks
  const { rotation, handleMouseMove, resetRotation } = useCardRotation();

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
    <CardContainer
      imageUrl={character.image}
      imageAlt={character.name}
      skeletonVariant="card-ii"
      skeletonClassName="sm:rounded-2xl border-4 sm:border-6 border-cyan-500/30"
      className="w-full"
      fadeOutDuration={800}
    >
      {({ cardOpacity, imageLoaded }) => (
        <>
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
            {/* Flip Card Container */}
            <div
              className="relative w-full h-full"
              style={{
                transformStyle: "preserve-3d",
                transition:
                  "transform 0.6s cubic-bezier(.5,.3,.3,1), opacity 1200ms cubic-bezier(0.4, 0.0, 0.2, 1)",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                opacity: cardOpacity,
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
          </div>

          <CyberStyles />
        </>
      )}
    </CardContainer>
  );
};
