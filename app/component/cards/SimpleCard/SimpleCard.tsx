"use client";

import { useCardRotation, useParticles } from "@hooks";
import { getStatusColor } from "@styles";
import { cn, DEFAULT_ANIMATION_TIMINGS } from "@util";
import { useState } from "react";
import { CardContainer } from "../CardContainer";
import { Effects } from "./Effects";
import { IdBadge } from "./IdBadge";
import { Image } from "./Image";
import { Locations } from "./Locations";
import { Name } from "./Name";
import { Overlay } from "./Overlay";
import { Particles } from "./Particles";
import { Stats } from "./Stats";
import { Status } from "./Status";

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
  hasLoadedOnce: boolean;
  onLoad: () => void;
}

export const SimpleCard = ({
  character,
  hasLoadedOnce,
  onLoad,
}: CharacterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { rotation, resetRotation } = useCardRotation();
  const particles = useParticles(character.id);

  const statusColor = getStatusColor(character.status);

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
      imageHeight={300}
      hasLoadedOnce={hasLoadedOnce}
      onLoad={onLoad}
      skeletonVariant="card-i"
      skeletonClassName="border-4 border-purple-500/30"
      className="relative w-full h-full min-h-[400px]"
      minSkeletonVisibility={DEFAULT_ANIMATION_TIMINGS.minSkeletonVisibility}
      skeletonFadeOutDuration={DEFAULT_ANIMATION_TIMINGS.skeletonFadeOut}
      cardFadeInDuration={DEFAULT_ANIMATION_TIMINGS.cardFadeIn}
      cardFadeInDelay={DEFAULT_ANIMATION_TIMINGS.cardFadeInDelay}
    >
      {({ imageLoaded }) => (
        <button
          type="button"
          tabIndex={0}
          className="relative w-full h-full min-h-[400px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {" "}
          <div
            className={cn(
              "relative w-full h-full bg-linear-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden transition-all duration-300 ease-out",
              isHovered
                ? "[box-shadow:0_30px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(139,92,246,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
                : "[box-shadow:0_15px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]",
            )}
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
                isHovered ? "scale(1.05)" : "scale(1)"
              }`,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0">
              <Image
                src={character.image}
                alt={character.name}
                width={300} // Use the hardcoded width from CardContainer for now
                height={300} // Use the hardcoded height from CardContainer for now
                imageLoaded={imageLoaded}
                onLoad={onLoad}
              />
              <Overlay />
            </div>

            <Effects />
            <Particles particles={particles} />

            <Status
              status={character.status}
              statusColor={statusColor}
              isHovered={isHovered}
            />
            <IdBadge id={character.id} isHovered={isHovered} />

            <Name
              name={character.name}
              species={character.species}
              type={character.type}
            />

            <Stats
              gender={character.gender}
              episodeCount={character.episode.length}
              isHovered={isHovered}
            />

            <Locations
              origin={character.origin.name}
              location={character.location.name}
              isHovered={isHovered}
            />
          </div>
        </button>
      )}
    </CardContainer>
  );
};
