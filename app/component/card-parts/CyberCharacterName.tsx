interface CyberCharacterNameProps {
  name: string;
  species: string;
  type: string;
}

export const CyberCharacterName = ({
  name,
  species,
  type,
}: CyberCharacterNameProps) => {
  return (
    <div className="relative" style={{ transform: "translateZ(30px)" }}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-pink-400 to-cyan-400 mb-1 uppercase tracking-tight leading-tight">
        {name}
      </h2>
      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm md:text-base">
        <span className="text-cyan-300 font-bold uppercase tracking-wide">
          {species}
        </span>
        {type && (
          <>
            <span className="text-pink-500">•</span>
            <span className="text-pink-300 font-bold uppercase tracking-wide">
              {type}
            </span>
          </>
        )}
      </div>
      {/* Underline glow */}
      <div className="h-1 w-24 sm:w-32 md:w-40 bg-linear-to-r from-cyan-400 to-pink-500 mt-2 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
    </div>
  );
};
