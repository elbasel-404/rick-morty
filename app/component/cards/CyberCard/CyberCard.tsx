"use client";

import { useCardRotation } from "@hooks";
import { getCyberStatusConfig } from "@styles";
import { DEFAULT_ANIMATION_TIMINGS } from "@util";
import { useState } from "react";
import { CardContainer } from "../CardContainer";
import { Back } from "./Back";
import Image from "next/image";

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
  const [_isHovered, setIsHovered] = useState(false);

  const { rotation, resetRotation } = useCardRotation();

  const statusConfig = getCyberStatusConfig(character.status);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    resetRotation();
    setIsHovered(false);
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
      {({ imageLoaded }) => (
        <>
          <button
            type="button"
            tabIndex={0}
            className="relative w-full h-104 lg:h-112"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative h-full w-full"
              style={{
                transform: `rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`,
              }}
            >
              {imageLoaded && (
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              )}
              <Back character={character} statusConfig={statusConfig} />
            </div>
          </button>

          {/* Styles for the cyber card are defined in ./Styles.tsx; omitted here to avoid duplicate injection. */}
        </>
      )}
    </CardContainer>
  );
};
