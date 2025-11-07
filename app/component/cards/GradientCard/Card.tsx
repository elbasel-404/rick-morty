"use client";
import Image from "next/image";

import { useState } from "react";
import { Zap } from "lucide-react";
import { useCardRotation } from "@hooks";
import { DEFAULT_ANIMATION_TIMINGS, cn } from "@util";
import { CardContainer } from "../CardContainer";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  episode: string[];
  gender: string;
  location: { name: string; url: string };
  origin: { name: string; url: string };
  species: string;
  type: string;
}

interface CharacterCardProps {
  character: Character;
  hasLoadedOnce: boolean;
  onLoad: () => void;
}

export const GradientCard = ({
  character,
  hasLoadedOnce,
  onLoad,
}: CharacterCardProps) => {
  const { rotation, handleMouseMove, resetRotation } = useCardRotation();
  const [isHovered, setIsHovered] = useState(false);

  const {
    name,
    image,
    status,
    episode,
    gender,
    location,
    origin,
    species,
    type,
  } = character;

  const handleMouseLeave = () => {
    resetRotation();
    setIsHovered(false);
  };

  const statusColor =
    {
      Alive: "from-emerald-500 to-emerald-600",
      Dead: "from-rose-500 to-rose-600",
      unknown: "from-gray-500 to-gray-600",
    }[status] || "from-gray-500 to-gray-600";

  return (
    <CardContainer
      imageUrl={image}
      imageAlt={name}
      imageWidth={300}
      imageHeight={300}
      hasLoadedOnce={hasLoadedOnce}
      onLoad={onLoad}
      skeletonVariant="card-ii"
      skeletonClassName="rounded-2xl border border-cyan-500/30"
      className="relative w-full"
      minSkeletonVisibility={DEFAULT_ANIMATION_TIMINGS.minSkeletonVisibility}
      skeletonFadeOutDuration={DEFAULT_ANIMATION_TIMINGS.skeletonFadeOut}
      cardFadeInDuration={DEFAULT_ANIMATION_TIMINGS.cardFadeIn}
      cardFadeInDelay={DEFAULT_ANIMATION_TIMINGS.cardFadeInDelay}
    >
      {({ imageLoaded }) => (
        <div
          className="relative w-full"
          style={{ perspective: "1500px" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Flowing water border effect */}
          <div
            className="absolute inset-0 rounded-2xl p-1 pointer-events-none"
            style={{
              background:
                "linear-gradient(45deg, #0ea5e9, #06b6d4, #0369a1, #0ea5e9)",
              backgroundSize: "300% 300%",
              animation: "flowBorder 6s ease infinite",
              opacity: isHovered ? 1 : 0.5,
              transition: "opacity 0.3s ease",
            }}
          >
            <div className="absolute inset-1 bg-slate-900 rounded-2xl" />
          </div>

          <div
            className={cn(
              "relative w-full bg-linear-to-b from-slate-800 to-slate-900 rounded-2xl overflow-hidden transition-all duration-300 ease-out border border-slate-700/50",
              isHovered
                ? "[box-shadow:0_0_50px_rgba(59,130,246,0.4),0_20px_60px_rgba(0,0,0,0.6)]"
                : "[box-shadow:0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.1)]"
            )}
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
                isHovered ? "translateY(-12px)" : "translateY(0)"
              }`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Image section */}
            <div
              className="relative h-96 overflow-hidden"
              style={{ transform: "translateZ(20px)" }}
            >
              <Image
                width={300}
                height={300}
                src={image}
                alt={name}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-500 ease-out",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                style={{
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                }}
                loading="lazy"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Water vortex effect */}
              {isHovered && (
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 400"
                  style={{
                    opacity: 0.6,
                    animation: "spin 6s linear infinite",
                  }}
                >
                  <defs>
                    <linearGradient
                      id="vortex"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                      <stop
                        offset="50%"
                        stopColor="#06b6d4"
                        stopOpacity="0.2"
                      />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="none"
                    stroke="url(#vortex)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="130"
                    fill="none"
                    stroke="url(#vortex)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="80"
                    fill="none"
                    stroke="url(#vortex)"
                    strokeWidth="1"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="30"
                    fill="none"
                    stroke="url(#vortex)"
                    strokeWidth="0.5"
                  />
                </svg>
              )}

              {/* Status accent bar */}
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-1 bg-linear-to-r",
                  statusColor
                )}
              />

              {/* Character name overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-slate-950/95 via-slate-950/70 to-transparent backdrop-blur"
                style={{ transform: "translateZ(30px)" }}
              >
                <h2 className="text-5xl font-bold text-white mb-3">{name}</h2>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  <p className="text-slate-300 text-base font-medium">
                    {species}
                    {type && ` • ${type}`}
                  </p>
                </div>
              </div>

              {/* Details overlay */}
              <div
                className={cn(
                  "absolute inset-0 px-6 py-6 transition-opacity duration-500 flex flex-col justify-between",
                  isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                style={{ transform: "translateZ(20px)" }}
              >
                {/* Top badges and actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-900/70 backdrop-blur">
                    <div
                      className={cn(
                        "w-2.5 h-2.5 rounded-full bg-linear-to-br",
                        statusColor
                      )}
                    />
                    <span className="text-slate-200 text-sm font-semibold">
                      {status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-900/70 backdrop-blur">
                    <span className="text-slate-300 text-sm font-semibold">
                      {gender}
                    </span>
                  </div>
                  <div className="ml-auto flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-900/70 backdrop-blur">
                      <span className="text-slate-200 text-base font-semibold">
                        {episode.length}
                      </span>
                      <span className="text-white text-xs uppercase tracking-[0.18em]">
                        episodes
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location info */}
                <div className="grid gap-4 text-base">
                  <div className="rounded-xl border border-slate-700/60 bg-slate-900/70 px-4 py-3 backdrop-blur">
                    <span className="text-white text-xs uppercase tracking-[0.18em]">
                      Origin
                    </span>
                    <p className="text-slate-100 text-lg font-semibold">
                      {origin.name || "Unknown"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-700/60 bg-slate-900/70 px-4 py-3 backdrop-blur">
                    <span className="text-white text-xs uppercase tracking-[0.18em]">
                      Location
                    </span>
                    <p className="text-slate-100 text-lg font-semibold">
                      {location.name || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            @keyframes flowBorder {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          `}</style>
        </div>
      )}
    </CardContainer>
  );
};
