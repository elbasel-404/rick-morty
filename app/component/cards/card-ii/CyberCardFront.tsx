interface CyberCardFrontProps {
  characterImage: string;
  characterName: string;
}

export const CyberCardFront = ({
  characterImage,
  characterName,
}: CyberCardFrontProps) => {
  return (
    <div className="relative w-full h-full">
      {/* Character image - brighter with minimal overlay */}
      <img
        src={characterImage}
        alt={characterName}
        className="w-full h-full object-cover"
        style={{
          filter: "contrast(1.1) saturate(1.3) brightness(1.05)",
        }}
      />

      {/* Subtle gradient overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

      {/* Light cyber effects */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-pink-500/10 mix-blend-overlay" />

      {/* Character name at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] uppercase tracking-tight">
          {characterName}
        </h2>
      </div>

      {/* Holographic scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full h-1 bg-linear-to-r from-transparent via-cyan-400/50 to-transparent"
          style={{
            animation: "scan 4s linear infinite",
          }}
        />
      </div>
    </div>
  );
};
