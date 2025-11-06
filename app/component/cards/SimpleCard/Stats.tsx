import { textShadow } from "@styles";

interface StatsProps {
  gender: string;
  episodeCount: number;
  isHovered: boolean;
}

export const Stats = ({ gender, episodeCount, isHovered }: StatsProps) => {
  return (
    <div
      className="absolute top-16 right-3 flex flex-col gap-2.5 z-40 transition-all duration-500 ease-out"
      style={{
        opacity: isHovered ? 1 : 0,
        transform: isHovered
          ? "translateZ(45px) translateX(0)"
          : "translateZ(45px) translateX(20px)",
      }}
    >
      <div className="text-center px-3 py-2">
        <p
          className="text-white/80 text-[10px] uppercase tracking-wider font-medium mb-1"
          style={{ textShadow: textShadow.subtle }}
        >
          Gender
        </p>
        <p
          className="text-white font-bold text-base"
          style={{ textShadow: textShadow.medium }}
        >
          {gender}
        </p>
      </div>

      <div className="text-center px-3 py-2">
        <p
          className="text-white/80 text-[10px] uppercase tracking-wider font-medium mb-1"
          style={{ textShadow: textShadow.subtle }}
        >
          Episodes
        </p>
        <p
          className="text-white font-bold text-base"
          style={{ textShadow: textShadow.medium }}
        >
          {episodeCount}
        </p>
      </div>
    </div>
  );
};
