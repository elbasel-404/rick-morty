interface FrontProps {
  characterImage: string;
  characterName: string;
}

export const Front = ({ characterImage, characterName }: FrontProps) => {
  // Accept imageLoaded as prop for fade-in effect
  // For now, fallback to always visible if not provided
  // You may need to pass imageLoaded from parent CardContainer
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      <img
        src={characterImage}
        alt={characterName}
        className="absolute inset-0 h-full w-full object-cover filter-[contrast(1.1)_saturate(1.3)_brightness(1.05)] transition-all duration-700 opacity-100"
        style={{ background: '#0f172a' }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/15 via-transparent to-pink-500/15 mix-blend-overlay" />
      <div className="relative z-10 flex h-full flex-col justify-end px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">
        <div className="flex flex-col gap-3 max-w-72 sm:max-w-88">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] uppercase">
            {characterName}
          </h2>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-6 bottom-8 sm:inset-x-10 sm:bottom-10">
        <div className="h-1 w-full bg-linear-to-r from-transparent via-cyan-400/50 to-transparent animate-[scan_4s_linear_infinite]" />
      </div>
    </div>
  );
};
