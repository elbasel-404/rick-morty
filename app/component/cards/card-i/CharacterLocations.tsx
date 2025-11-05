import { textShadow } from "@styles";

interface CharacterLocationsProps {
  origin: string;
  location: string;
  isHovered: boolean;
}

export const CharacterLocations = ({
  origin,
  location,
  isHovered,
}: CharacterLocationsProps) => {
  return (
    <div
      className="absolute bottom-24 left-3 right-3 flex gap-2.5 z-40 transition-all duration-500 ease-out delay-100"
      style={{
        opacity: isHovered ? 1 : 0,
        transform: isHovered
          ? "translateZ(35px) translateY(0)"
          : "translateZ(35px) translateY(20px)",
      }}
    >
      <div className="flex-1 text-center px-3 py-2">
        <p
          className="text-white/80 text-[10px] uppercase tracking-wider font-medium mb-1"
          style={{ textShadow: textShadow.subtle }}
        >
          Origin
        </p>
        <p
          className="text-white font-bold text-sm line-clamp-1"
          style={{ textShadow: textShadow.medium }}
        >
          {origin}
        </p>
      </div>

      <div className="flex-1 text-center px-3 py-2">
        <p
          className="text-white/80 text-[10px] uppercase tracking-wider font-medium mb-1"
          style={{ textShadow: textShadow.subtle }}
        >
          Location
        </p>
        <p
          className="text-white font-bold text-sm line-clamp-1"
          style={{ textShadow: textShadow.medium }}
        >
          {location}
        </p>
      </div>
    </div>
  );
};
