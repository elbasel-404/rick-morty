import { textShadow } from "../utils/cardStyles";

interface StatusBadgeProps {
  status: string;
  statusColor: string;
  isHovered: boolean;
}

export const StatusBadge = ({
  status,
  statusColor,
  isHovered,
}: StatusBadgeProps) => {
  return (
    <div
      className="absolute top-3 right-3 flex items-center gap-2 px-2 py-1 z-40 transition-all duration-500 ease-out"
      style={{
        opacity: isHovered ? 1 : 0,
        transform: isHovered
          ? "translateZ(55px) translateY(0)"
          : "translateZ(55px) translateY(-10px)",
      }}
    >
      <div
        className={`w-2.5 h-2.5 rounded-full ${statusColor} animate-pulse shadow-lg`}
        style={{ boxShadow: `0 0 10px currentColor` }}
      />
      <span
        className="text-white font-bold text-base tracking-wide"
        style={{ textShadow: textShadow.base }}
      >
        {status}
      </span>
    </div>
  );
};
