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
      {/* Character image with dark overlay */}
      <img
        src={characterImage}
        alt={characterName}
        className="w-full h-full object-cover"
        style={{
          filter: "contrast(1.1) saturate(1.2) brightness(0.7)",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />

      {/* Cyber effects */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-transparent to-blue-500/20 mix-blend-overlay" />

      {/* Character name at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
        <h2>{characterName}</h2>
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
