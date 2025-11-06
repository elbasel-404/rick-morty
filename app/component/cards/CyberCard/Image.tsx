interface ImageProps {
  src: string;
  alt: string;
  isHovered: boolean;
}

export const Image = ({ src, alt, isHovered }: ImageProps) => {
  return (
    <div
      className="relative w-full h-48 sm:h-56 md:h-64 lg:h-80 overflow-hidden"
      style={{ transform: "translateZ(30px)" }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover filter-[contrast(1.1)_saturate(1.2)]"
      />
      {/* Cyber gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-pink-500/10 mix-blend-overlay" />

      {/* Glitch effect on hover */}
      {isHovered && (
        <>
          <div
            className="absolute inset-0 bg-cyan-500/5 animate-pulse"
            style={{ animationDuration: "0.1s" }}
          />
          <div
            className="absolute inset-0 bg-pink-500/5 animate-pulse"
            style={{
              animationDuration: "0.15s",
              animationDelay: "0.05s",
            }}
          />
        </>
      )}
    </div>
  );
};
