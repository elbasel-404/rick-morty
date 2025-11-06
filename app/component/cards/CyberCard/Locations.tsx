interface LocationsProps {
  origin: string;
  location: string;
}

export const Locations = ({ origin, location }: LocationsProps) => {
  return (
    <div
      className="space-y-3 sm:space-y-3.5 md:space-y-4"
      style={{ transform: "translateZ(15px)" }}
    >
      <div className="relative border-l-3 sm:border-l-4 md:border-l-5 border-cyan-500 p-3 sm:p-4 md:p-5 clip-corner-small overflow-hidden transition-all [box-shadow:0_0_20px_rgba(6,182,212,0.3),inset_0_0_15px_rgba(6,182,212,0.05)]">
        <p className="text-cyan-400 text-xs sm:text-sm md:text-base uppercase tracking-wider mb-1 font-bold flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse" />
          Origin
        </p>
        <p className="text-white font-semibold text-xs sm:text-sm md:text-base truncate">
          {origin}
        </p>
      </div>

      <div className="relative border-l-3 sm:border-l-4 md:border-l-5 border-pink-500 p-3 sm:p-4 md:p-5 clip-corner-small overflow-hidden transition-all [box-shadow:0_0_20px_rgba(236,72,153,0.3),inset_0_0_15px_rgba(236,72,153,0.05)]">
        <p className="text-pink-400 text-xs sm:text-sm md:text-base uppercase tracking-wider mb-1 font-bold flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full animate-pulse" />
          Last Location
        </p>
        <p className="text-white font-semibold text-xs sm:text-sm md:text-base truncate">
          {location}
        </p>
      </div>
    </div>
  );
};
