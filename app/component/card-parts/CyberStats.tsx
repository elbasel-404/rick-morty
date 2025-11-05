interface CyberStatsProps {
  gender: string;
  episodeCount: number;
}

export const CyberStats = ({ gender, episodeCount }: CyberStatsProps) => {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5"
      style={{ transform: "translateZ(20px)" }}
    >
      <div
        className="relative border border-cyan-500/40 p-3 sm:p-4 md:p-5 clip-corner transition-all"
        style={{
          boxShadow:
            "0 0 20px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.05)",
        }}
      >
        <p className="text-cyan-400 text-xs sm:text-sm md:text-base uppercase tracking-wider mb-2 font-bold">
          Gender
        </p>
        <p className="text-white font-black text-sm sm:text-base md:text-lg uppercase">
          {gender}
        </p>
      </div>

      <div
        className="relative border border-pink-500/40 p-3 sm:p-4 md:p-5 clip-corner transition-all"
        style={{
          boxShadow:
            "0 0 20px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(236, 72, 153, 0.05)",
        }}
      >
        <p className="text-pink-400 text-xs sm:text-sm md:text-base uppercase tracking-wider mb-2 font-bold">
          Episodes
        </p>
        <p className="text-white font-black text-sm sm:text-base md:text-lg uppercase">
          {episodeCount}
        </p>
      </div>
    </div>
  );
};
