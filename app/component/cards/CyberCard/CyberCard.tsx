"use client";

import { useState } from "react";
import { useCardRotation } from "@hooks";
import { getCyberStatusConfig } from "@styles";
import { DEFAULT_ANIMATION_TIMINGS } from "@util";
import { CardContainer } from "../CardContainer";
import { Grid } from "./Grid";
import { ScanLine } from "./ScanLine";
import { CornerAccents } from "./CornerAccents";
import { Styles } from "./Styles";
import { Front } from "./Front";
import { Back } from "./Back";

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

interface CyberCardProps {
  character: Character;
  hasLoadedOnce: boolean;
  onLoad: () => void;
}

export const CyberCard = ({
  character,
  hasLoadedOnce,
  onLoad,
}: CyberCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

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
      imageWidth={300}
      imageHeight={448}
      hasLoadedOnce={hasLoadedOnce}
      onLoad={onLoad}
      skeletonVariant="card-ii"
      skeletonClassName="rounded-2xl border-4 sm:rounded-3xl sm:border-6 border-cyan-500/30"
      className="relative mx-auto w-full max-w-88 px-5 sm:mx-0 sm:max-w-full sm:px-0"
      minSkeletonVisibility={DEFAULT_ANIMATION_TIMINGS.minSkeletonVisibility}
      skeletonFadeOutDuration={DEFAULT_ANIMATION_TIMINGS.skeletonFadeOut}
      cardFadeInDuration={DEFAULT_ANIMATION_TIMINGS.cardFadeIn}
      cardFadeInDelay={DEFAULT_ANIMATION_TIMINGS.cardFadeInDelay}
    >
      {({ isVisible, imageLoaded }) => (
        <>
          <div
            className="relative w-full h-104 lg:h-112"
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: isHovered
                  ? "transform 120ms cubic-bezier(.22,.61,.36,1)"
                  : "transform 280ms cubic-bezier(.22,.61,.36,1)",
              }}
            >
              <div
                className="relative h-full w-full"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s cubic-bezier(.5,.3,.3,1)",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                <div
                  className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl border-4 sm:rounded-3xl sm:border-6 border-cyan-500/30"
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
                  <Grid />
                  <ScanLine />
                  <CornerAccents />
                  <Front
                    characterImage={character.image}
                    characterName={character.name}
                    imageLoaded={imageLoaded}
                  />
                </div>

                <div
                  className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl border-4 sm:rounded-3xl sm:border-6 border-cyan-500/30"
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
                  <Grid />
                  <ScanLine />
                  <CornerAccents />
                  <Back character={character} statusConfig={statusConfig} />
                </div>
              </div>
            </div>
          </div>

          <Styles />
        </>
      )}
    </CardContainer>
  );
};
