interface IdBadgeProps {
  id: number;
}

export const IdBadge = ({ id }: IdBadgeProps) => {
  return (
    <div
      className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 bg-black/80 backdrop-blur-md px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border border-pink-500/50 clip-corner"
      style={{ transform: "translateZ(40px)" }}
    >
      <span className="text-pink-400 font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider">
        ID: {id.toString().padStart(3, "0")}
      </span>
    </div>
  );
};
