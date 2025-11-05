import { CyberImage } from "./CyberImage";
import { CyberStatusBadge } from "./CyberStatusBadge";
import { CyberIDBadge } from "./CyberIDBadge";
import { CyberCharacterName } from "./CyberCharacterName";
import { CyberStats } from "./CyberStats";
import { CyberLocations } from "./CyberLocations";

interface CyberCardBackProps {
  character: {
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
  };
  statusConfig: {
    bg: string;
    glow: string;
    text: string;
  };
  isHovered: boolean;
}

export const CyberCardBack = ({
  character,
  statusConfig,
  isHovered,
}: CyberCardBackProps) => {
  return (
    <div className="relative w-full h-full bg-black flex flex-col overflow-y-auto">
        {/* Image Section */}
        <div className="relative">
          <CyberImage
            src={character.image}
            alt={character.name}
            isHovered={isHovered}
          />
          <CyberStatusBadge status={character.status} statusConfig={statusConfig} />
          <CyberIDBadge id={character.id} />
        </div>

        {/* Content Section */}
        <div
          className="flex-1 px-6 sm:px-8 md:px-12 lg:px-14 py-5 sm:py-6 md:py-8 space-y-4 sm:space-y-5 md:space-y-6 overflow-y-auto"
          style={{ transform: "translateZ(20px)" }}
        >
          <CyberCharacterName
            name={character.name}
            species={character.species}
            type={character.type}
          />
          <CyberStats
            gender={character.gender}
            episodeCount={character.episode.length}
          />
          <CyberLocations
            origin={character.origin.name}
            location={character.location.name}
          />
        </div>
    </div>
  );
};
