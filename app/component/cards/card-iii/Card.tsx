"use client";

import { useState } from "react";
import { Heart, Zap } from "lucide-react";
import { useCardRotation } from "@hooks";
import { cn } from "@util";

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
}

export const CharacterCardIII = ({ character }: CharacterCardProps) => {
  const { rotation, handleMouseMove, resetRotation } = useCardRotation();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-8">
      <div
        className="relative"
        style={{ perspective: "1500px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={cn(
            "relative w-96 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl overflow-hidden transition-all duration-300 ease-out border border-slate-700/50",
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
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Status accent bar */}
            <div
              className={cn(
                "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
                statusColor
              )}
            />

            {/* Favorite button */}
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="absolute top-5 right-5 w-11 h-11 bg-slate-900/80 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-slate-700/50 hover:border-blue-500/50"
              style={{ transform: "translateZ(40px)" }}
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-all",
                  isFavorited
                    ? "fill-rose-500 stroke-rose-500"
                    : "stroke-slate-300"
                )}
              />
            </button>

            {/* Character name overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6"
              style={{ transform: "translateZ(30px)" }}
            >
              <h2 className="text-3xl font-bold text-white mb-2">{name}</h2>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <p className="text-slate-300 text-sm font-medium">
                  {species}
                  {type && ` • ${type}`}
                </p>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div
            className="p-6 space-y-5"
            style={{ transform: "translateZ(20px)" }}
          >
            {/* Status and info row */}
            <div className="flex items-center justify-between text-sm gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full bg-gradient-to-br",
                    statusColor
                  )}
                />
                <span className="text-slate-300 font-medium">{status}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
                <span className="text-slate-400">{episode.length}</span>
                <span className="text-slate-500 text-xs">episodes</span>
              </div>
              <span className="text-slate-400 ml-auto">{gender}</span>
            </div>

            {/* Location info */}
            <div className="space-y-3 text-sm border-t border-slate-700/50 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-slate-500 min-w-fit">Origin</span>
                <span className="text-slate-200 font-medium truncate">
                  {origin.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 min-w-fit">Location</span>
                <span className="text-slate-200 font-medium truncate">
                  {location.name}
                </span>
              </div>
            </div>

            {/* Action button */}
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-3 font-semibold text-sm hover:from-blue-500 hover:to-blue-600 transition-all active:scale-95 border border-blue-500/30"
              style={{ transform: "translateZ(10px)" }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
