"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
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
      Alive: "bg-emerald-500",
      Dead: "bg-rose-500",
      unknown: "bg-gray-400",
    }[status] || "bg-gray-400";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div
        className="relative"
        style={{ perspective: "1500px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={cn(
            "relative w-96 bg-white rounded-3xl overflow-hidden transition-all duration-300 ease-out",
            isHovered
              ? "[box-shadow:0_30px_60px_rgba(0,0,0,0.15),0_0_0_12px_rgba(255,255,255,0.8)]"
              : "[box-shadow:0_20px_40px_rgba(0,0,0,0.1),0_0_0_12px_rgba(255,255,255,0.6)]"
          )}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
              isHovered ? "translateY(-8px)" : "translateY(0)"
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
              className="w-full h-full object-cover"
            />

            {/* Gradient overlay at bottom */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

            {/* Favorite button */}
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="absolute top-5 right-5 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{ transform: "translateZ(40px)" }}
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-all",
                  isFavorited
                    ? "fill-rose-500 stroke-rose-500"
                    : "stroke-gray-700"
                )}
              />
            </button>

            {/* Character name overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6"
              style={{ transform: "translateZ(30px)" }}
            >
              <h2 className="text-4xl font-bold text-white mb-1">{name}</h2>
              <p className="text-white/80 text-base font-medium">
                {species}
                {type && ` • ${type}`}
              </p>
            </div>
          </div>

          {/* Content section */}
          <div
            className="p-6 space-y-4"
            style={{ transform: "translateZ(20px)" }}
          >
            {/* Status and info row */}
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", statusColor)} />
                <span className="text-sm font-medium">{status}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">from</span>
                <span className="text-black font-semibold text-lg">
                  {episode.length} eps
                </span>
              </div>
              <div className="ml-auto">
                <span className="text-sm font-medium">{gender}</span>
              </div>
            </div>

            {/* Location info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-gray-500">Origin:</span>
                <span className="text-gray-900 font-medium flex-1">
                  {origin.name}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-500">Location:</span>
                <span className="text-gray-900 font-medium flex-1">
                  {location.name}
                </span>
              </div>
            </div>

            {/* Action button */}
            <button
              className="w-full bg-black text-white rounded-full py-4 font-semibold text-base hover:bg-gray-900 transition-all active:scale-98"
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
