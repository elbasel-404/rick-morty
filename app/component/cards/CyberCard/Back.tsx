import { cn } from "@util";

interface BackProps {
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

export const Back = ({ character, statusConfig, isHovered }: BackProps) => {
  return (
    <div className="relative w-full h-full">
      {/* Full Background Image */}
      <img
        src={character.image}
        alt={character.name}
        className="absolute inset-0 w-full h-full object-cover filter-[contrast(1.15)_saturate(1.3)_brightness(0.75)]"
      />

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Top Bar - Status & ID */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
        {/* ID Badge - Left */}
        <div className="flex items-center gap-2 px-3 py-1.5">
          <span className="text-pink-400 font-black text-lg uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            #{character.id.toString().padStart(3, "0")}
          </span>
        </div>

        {/* Status Badge - Right */}
        <div className="flex items-center gap-2 px-3 py-1.5">
          <div
            className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              statusConfig.bg,
              statusConfig.glow
            )}
          />
          <span
            className={cn(
              "font-black text-base uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,1)]",
              statusConfig.text
            )}
          >
            {character.status}
          </span>
        </div>
      </div>

      {/* Main Content - Centered Layout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 py-16">
        {/* Character Name - Center */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-pink-400 to-cyan-400 uppercase tracking-tighter leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,1)] mb-3 wrap-break-word hyphens-auto">
            {character.name}
          </h2>
          <div className="flex items-center justify-center gap-3 text-lg">
            <span className="text-cyan-300 font-bold uppercase tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
              {character.species}
            </span>
            {character.type && (
              <>
                <span className="text-pink-400 text-2xl">•</span>
                <span className="text-pink-300 font-bold uppercase tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
                  {character.type}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Info Grid - 2x2 Layout */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
          {/* Gender */}
          <div className="p-4 text-center">
            <p className="text-cyan-400 text-sm uppercase tracking-widest mb-2 font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
              Gender
            </p>
            <p className="text-white font-black text-2xl uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              {character.gender}
            </p>
          </div>

          {/* Episodes */}
          <div className="p-4 text-center">
            <p className="text-pink-400 text-sm uppercase tracking-widest mb-2 font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
              Episodes
            </p>
            <p className="text-white font-black text-2xl uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              {character.episode.length}
            </p>
          </div>

          {/* Origin */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]" />
              <p className="text-cyan-400 text-xs uppercase tracking-widest font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
                Origin
              </p>
            </div>
            <p className="text-white font-semibold text-sm truncate drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              {character.origin.name}
            </p>
          </div>

          {/* Location */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse drop-shadow-[0_0_4px_rgba(236,72,153,0.8)]" />
              <p className="text-pink-400 text-xs uppercase tracking-widest font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
                Location
              </p>
            </div>
            <p className="text-white font-semibold text-sm truncate drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              {character.location.name}
            </p>
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-400/60" />
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-pink-400/60" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-pink-400/60" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-400/60" />
    </div>
  );
};
