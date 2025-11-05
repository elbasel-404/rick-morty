import { cn } from "@util";

interface CyberStatusBadgeProps {
  status: string;
  statusConfig: {
    bg: string;
    glow: string;
    text: string;
  };
}

export const CyberStatusBadge = ({
  status,
  statusConfig,
}: CyberStatusBadgeProps) => {
  return (
    <div
      className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 flex items-center gap-3 bg-black/80 backdrop-blur-md px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border border-cyan-500/50 clip-corner"
      style={{ transform: "translateZ(40px)" }}
    >
      <div
        className={cn(
          "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full animate-pulse",
          statusConfig.bg,
          statusConfig.glow
        )}
      />
      <span
        className={cn(
          "font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider",
          statusConfig.text
        )}
      >
        {status}
      </span>
    </div>
  );
};
