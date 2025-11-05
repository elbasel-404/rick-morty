"use client";

import { useState } from "react";
import { CardContainer } from "./CardContainer";
import { useCardRotation } from "./hooks/useCardRotation";
import { useParticles } from "./hooks/useParticles";
import { getStatusColor } from "./utils/cardStyles";
import { CardImage } from "./card-parts/CardImage";
import { CardOverlays } from "./card-parts/CardOverlays";
import { Card3DEffects } from "./card-parts/Card3DEffects";
import { FloatingParticles } from "./card-parts/FloatingParticles";
import { StatusBadge } from "./card-parts/StatusBadge";
import { IDBadge } from "./card-parts/IDBadge";
import { CharacterName } from "./card-parts/CharacterName";
import { CharacterStats } from "./card-parts/CharacterStats";
import { CharacterLocations } from "./card-parts/CharacterLocations";

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
      fadeOutDuration={800}
    >
      {({ cardOpacity, imageLoaded }) => (
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
              opacity: cardOpacity,
              transition:
                "opacity 1200ms cubic-bezier(0.4, 0.0, 0.2, 1), transform 300ms ease-out, box-shadow 300ms ease-out",
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

            {/* Particles */}
            <FloatingParticles particles={particles} />
          </div>
        </div>
      )}
    </CardContainer>
  );
};
