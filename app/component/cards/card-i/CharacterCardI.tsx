"use client";

import { useState } from "react";
import { useCardRotation, useParticles } from "@hooks";
import { getStatusColor } from "@styles";
import { CardImage } from "./CardImage";
import { CardOverlays } from "./CardOverlays";
import { Card3DEffects } from "./Card3DEffects";
import { StatusBadge } from "./StatusBadge";
import { IDBadge } from "./IDBadge";
import { CharacterName } from "./CharacterName";
import { CharacterStats } from "./CharacterStats";
import { CharacterLocations } from "./CharacterLocations";
import { DEFAULT_ANIMATION_TIMINGS } from "@util";
import { CardContainer } from "../CardContainer";

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

export const CharacterCardI = ({ character }: CharacterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Custom hooks
  const { rotation, handleMouseMove, resetRotation } = useCardRotation();
  const particles = useParticles(character.id);

  const statusColor = getStatusColor(character.status);

  const handleMouseLeave = () => {
    resetRotation();
    setIsHovered(false);
  };

  return (
    <CardContainer
      imageUrl={character.image}
      imageAlt={character.name}
      skeletonVariant="card-i"
      skeletonClassName="border-4 border-purple-500/30"
      className="relative w-full h-full min-h-[400px]"
      minSkeletonVisibility={DEFAULT_ANIMATION_TIMINGS.minSkeletonVisibility}
      skeletonFadeOutDuration={DEFAULT_ANIMATION_TIMINGS.skeletonFadeOut}
      cardFadeInDuration={DEFAULT_ANIMATION_TIMINGS.cardFadeIn}
      cardFadeInDelay={DEFAULT_ANIMATION_TIMINGS.cardFadeInDelay}
    >
      {({ isVisible, imageLoaded }) => (
        <div
          className="relative w-full h-full min-h-[400px]"
          style={{ perspective: "1000px" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative w-full h-full bg-linear-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden transition-all duration-300 ease-out"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
                isHovered ? "scale(1.05)" : "scale(1)"
              }`,
              transformStyle: "preserve-3d",
              boxShadow: isHovered
                ? "0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                : "0 15px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
            }}
          >
            {/* Image and Overlays */}
            <div className="absolute inset-0">
              <CardImage
                src={character.image}
                alt={character.name}
                isInViewport={imageLoaded}
                imageLoaded={imageLoaded}
                onLoad={() => {}}
              />
              <CardOverlays />
            </div>

            {/* 3D Effects */}
            <Card3DEffects />

            {/* Badges */}
            <StatusBadge
              status={character.status}
              statusColor={statusColor}
              isHovered={isHovered}
            />
            <IDBadge id={character.id} isHovered={isHovered} />

            {/* Character Info */}
            <CharacterName
              name={character.name}
              species={character.species}
              type={character.type}
            />

            {/* Stats */}
            <CharacterStats
              gender={character.gender}
              episodeCount={character.episode.length}
              isHovered={isHovered}
            />

            {/* Locations */}
            <CharacterLocations
              origin={character.origin.name}
              location={character.location.name}
              isHovered={isHovered}
            />
          </div>
        </div>
      )}
    </CardContainer>
  );
};
