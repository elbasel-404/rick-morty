import { cn } from "@util";

interface SkeletonLoaderProps {
  opacity: number;
  variant?: "card-i" | "card-ii" | "default";
  className?: string;
}

export const SkeletonLoader = ({
  opacity,
  variant = "default",
  className = "",
}: SkeletonLoaderProps) => {
  // Don't render at all if opacity is 0
  if (opacity === 0) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 bg-black rounded-xl overflow-hidden z-10",
        className,
      )}
      style={{
        opacity,
        transition: "opacity 800ms cubic-bezier(0.4, 0.0, 0.2, 1)",
        pointerEvents: "none",
      }}
    >
      {/* Animated gradient background - only for non card-i variants */}
      {variant !== "card-i" && (
        <>
          <div className="absolute inset-0 bg-linear-to-br from-slate-800 via-slate-700 to-slate-900 animate-pulse" />

          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
            <div className="h-full w-full bg-linear-to-r from-transparent via-cyan-500/10 to-transparent" />
          </div>
        </>
      )}

      {/* Skeleton content - variant specific */}
      {variant === "card-i" && <CardISkeletonContent />}
      {variant === "card-ii" && <CardIISkeletonContent />}
      {variant === "default" && <DefaultSkeletonContent />}

      {/* Corner accents - only for non card-i variants */}
      {variant !== "card-i" && (
        <>
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-400/30" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-pink-400/30" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-pink-400/30" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-400/30" />
        </>
      )}
    </div>
  );
};

// Skeleton content for CharacterCardI - Blueprint/Wireframe style
const CardISkeletonContent = () => (
  <div className="relative h-full p-6 flex flex-col bg-slate-950">
    {/* Blueprint grid background */}
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
    />

    {/* Diagonal lines overlay */}
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(168, 85, 247, 0.4) 10px,
          rgba(168, 85, 247, 0.4) 11px
        )`,
      }}
    />

    {/* Corner markers */}
    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-violet-500/60" />
    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-violet-500/60" />
    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-violet-500/60" />
    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-violet-500/60" />

    {/* Status badge wireframe - top left */}
    <div className="relative mb-4 z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-violet-500/40 rounded-lg">
        <div className="w-2 h-2 rounded-full border border-violet-400/60 animate-pulse" />
        <div className="h-3 w-16 border border-violet-400/40 rounded animate-pulse" />
      </div>
    </div>

    {/* Large wireframe rectangle for image area */}
    <div className="relative flex-1 flex items-center justify-center mb-6">
      <div className="relative w-full max-w-sm aspect-square">
        {/* Outer frame */}
        <div className="absolute inset-0 border-2 border-dashed border-violet-500/40 rounded-lg animate-pulse">
          {/* Crosshair in center */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-violet-400/30" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-violet-400/30" />

          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-violet-400/50" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-violet-400/50" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-violet-400/50" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-violet-400/50" />
        </div>

        {/* Inner scanning effect */}
        <div className="absolute inset-8 border border-violet-400/20 rounded">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-violet-500/10 to-transparent animate-[scan_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>

    {/* Character name wireframe */}
    <div className="relative space-y-3 z-10">
      {/* Name */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-8 border-2 border-violet-500/40 rounded animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-violet-500/10 to-transparent animate-[shimmer_2s_infinite]" />
        </div>
        <div className="w-12 h-8 border-2 border-fuchsia-500/40 rounded-full animate-pulse" />
      </div>

      {/* Species */}
      <div className="h-5 w-2/3 border border-violet-400/30 rounded animate-pulse" />

      {/* Stats wireframe */}
      <div className="pt-4 border-t border-violet-500/20">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-3 border border-violet-400/30 rounded animate-pulse" />
            <div className="h-2 w-3/4 border border-violet-300/20 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-3 border border-fuchsia-400/30 rounded animate-pulse" />
            <div className="h-2 w-3/4 border border-fuchsia-300/20 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>

    {/* Pulsing dots in corners */}
    <div className="absolute top-8 left-8 w-2 h-2 bg-violet-400/60 rounded-full animate-ping" />
    <div
      className="absolute top-8 right-8 w-2 h-2 bg-fuchsia-400/60 rounded-full animate-ping"
      style={{ animationDelay: "0.3s" }}
    />
    <div
      className="absolute bottom-8 left-8 w-2 h-2 bg-violet-400/60 rounded-full animate-ping"
      style={{ animationDelay: "0.6s" }}
    />
    <div
      className="absolute bottom-8 right-8 w-2 h-2 bg-fuchsia-400/60 rounded-full animate-ping"
      style={{ animationDelay: "0.9s" }}
    />
  </div>
);

// Skeleton content for CharacterCardII
const CardIISkeletonContent = () => (
  <div className="relative h-full p-6 flex flex-col">
    {/* Top badges skeleton */}
    <div className="flex justify-between items-center mb-4">
      <div className="h-6 w-16 bg-slate-600/50 rounded-full animate-pulse" />
      <div className="h-6 w-20 bg-slate-600/50 rounded-full animate-pulse" />
    </div>

    {/* Center image placeholder */}
    <div className="flex-1 flex items-center justify-center">
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-slate-600/50 animate-pulse" />
    </div>

    {/* Bottom text skeleton */}
    <div className="space-y-3">
      <div className="h-8 w-3/4 bg-slate-600/50 rounded mx-auto animate-pulse" />
      <div className="h-4 w-1/2 bg-slate-600/50 rounded mx-auto animate-pulse" />
    </div>
  </div>
);

// Default skeleton content
const DefaultSkeletonContent = () => (
  <div className="relative h-full p-6 flex flex-col justify-center items-center">
    <div className="w-32 h-32 bg-slate-600/50 rounded-full animate-pulse mb-4" />
    <div className="h-6 w-3/4 bg-slate-600/50 rounded animate-pulse mb-2" />
    <div className="h-4 w-1/2 bg-slate-600/50 rounded animate-pulse" />
  </div>
);
