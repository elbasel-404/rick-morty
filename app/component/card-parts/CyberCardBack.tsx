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
    <div className="relative w-full h-full">
      {/* Full Background Image */}
      <img
        src={character.image}
        alt={character.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "contrast(1.1) saturate(1.2) brightness(0.85)",
        }}
      />
      
      {/* Gradient Overlays for text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40" />
      
      {/* Status Badge - Top Right */}
      <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/50 backdrop-blur-md bg-black/60">
        <div
          className={`w-2.5 h-2.5 rounded-full ${statusConfig.bg} ${statusConfig.glow} animate-pulse`}
        />
        <span className={`${statusConfig.text} font-bold text-sm uppercase tracking-wider`}>
          {character.status}
        </span>
      </div>

      {/* ID Badge - Top Left */}
      <div className="absolute top-4 left-4 px-4 py-2 rounded-lg border border-pink-500/50 backdrop-blur-md bg-black/60">
        <span className="text-pink-400 font-bold text-sm uppercase tracking-wider">
          #{character.id.toString().padStart(3, "0")}
        </span>
      </div>

      {/* Character Name - Top Center */}
      <div className="absolute top-16 left-0 right-0 px-6 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-pink-400 to-cyan-400 uppercase tracking-tight leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          {character.name}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2 text-sm sm:text-base">
          <span className="text-cyan-300 font-semibold uppercase tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            {character.species}
          </span>
          {character.type && (
            <>
              <span className="text-pink-500">•</span>
              <span className="text-pink-300 font-semibold uppercase tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                {character.type}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Stats Grid - Bottom Left */}
      <div className="absolute bottom-20 left-6 grid grid-cols-2 gap-3 w-64">
        <div className="border border-cyan-500/40 rounded-lg p-3 backdrop-blur-sm bg-black/50">
          <p className="text-cyan-400 text-xs uppercase tracking-wider mb-1 font-semibold">
            Gender
          </p>
          <p className="text-white font-bold text-base uppercase">
            {character.gender}
          </p>
        </div>

        <div className="border border-pink-500/40 rounded-lg p-3 backdrop-blur-sm bg-black/50">
          <p className="text-pink-400 text-xs uppercase tracking-wider mb-1 font-semibold">
            Episodes
          </p>
          <p className="text-white font-bold text-base uppercase">
            {character.episode.length}
          </p>
        </div>
      </div>

      {/* Locations - Bottom Right */}
      <div className="absolute bottom-6 right-6 space-y-2 w-80">
        <div className="border-l-4 border-cyan-500 rounded-r-lg p-3 backdrop-blur-sm bg-black/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <p className="text-cyan-400 text-xs uppercase tracking-wider font-semibold">
              Origin
            </p>
          </div>
          <p className="text-white font-medium text-sm truncate">
            {character.origin.name}
          </p>
        </div>

        <div className="border-l-4 border-pink-500 rounded-r-lg p-3 backdrop-blur-sm bg-black/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <p className="text-pink-400 text-xs uppercase tracking-wider font-semibold">
              Location
            </p>
          </div>
          <p className="text-white font-medium text-sm truncate">
            {character.location.name}
          </p>
        </div>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/40" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-pink-500/40" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-pink-500/40" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/40" />
    </div>
  );
};
