"use client";

import { useState, useEffect, useMemo } from "react";

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

export const CharacterCardII = ({ character }: CharacterCardProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate deterministic random values based on character ID
  const particles = useMemo(() => {
    const seed = character.id;
    const seededRandom = (index: number) => {
      const x = Math.sin(seed * index * 12.9898 + index * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    return Array.from({ length: 12 }, (_, i) => ({
      left: seededRandom(i * 2) * 100,
      top: seededRandom(i * 2 + 1) * 100,
      duration: 2 + seededRandom(i * 3) * 3,
      delay: seededRandom(i * 4) * 2,
      depth: 50 + seededRandom(i * 5) * 50,
      isCyan: i % 2 === 0,
    }));
  }, [character.id]);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const statusConfig = {
    Alive: {
      bg: "bg-cyan-400",
      glow: "shadow-[0_0_20px_rgba(34,211,238,0.6)]",
      text: "text-cyan-400",
    },
    Dead: {
      bg: "bg-red-500",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.6)]",
      text: "text-red-500",
    },
    unknown: {
      bg: "bg-yellow-400",
      glow: "shadow-[0_0_20px_rgba(250,204,21,0.6)]",
      text: "text-yellow-400",
    },
  }[status] || {
    bg: "bg-gray-500",
    glow: "shadow-[0_0_20px_rgba(107,114,128,0.6)]",
    text: "text-gray-500",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-6 md:p-8">
      <div
        className="relative w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl"
        style={{ perspective: "1000px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative bg-black rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ease-out border-2 border-cyan-500/30"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
              isHovered ? "scale(1.02) sm:scale(1.05)" : "scale(1)"
            }`,
            transformStyle: "preserve-3d",
            boxShadow: isHovered
              ? "0 0 60px rgba(6, 182, 212, 0.4), 0 0 100px rgba(236, 72, 153, 0.2), inset 0 0 60px rgba(6, 182, 212, 0.1)"
              : "0 0 30px rgba(6, 182, 212, 0.2), inset 0 0 30px rgba(6, 182, 212, 0.05)",
          }}
        >
          {/* Cyber grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.3) 25%, rgba(6, 182, 212, 0.3) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.3) 75%, rgba(6, 182, 212, 0.3) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.3) 25%, rgba(6, 182, 212, 0.3) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.3) 75%, rgba(6, 182, 212, 0.3) 76%, transparent 77%, transparent)
              `,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Scan line effect */}
          <div
            className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
            style={{ transform: "translateZ(5px)" }}
          >
            <div
              className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
              style={{
                animation: "scan 3s linear infinite",
              }}
            />
          </div>

          {/* Glowing corner accents */}
          <div className="absolute top-0 left-0 w-16 sm:w-20 h-16 sm:h-20 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
          <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 border-t-2 border-r-2 border-pink-500 pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-16 sm:h-20 border-b-2 border-l-2 border-pink-500 pointer-events-none z-20" />
          <div className="absolute bottom-0 right-0 w-16 sm:w-20 h-16 sm:h-20 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-20" />

          {/* Image section with cyberpunk effects */}
          <div
            className="relative h-48 sm:h-64 md:h-80 overflow-hidden"
            style={{ transform: "translateZ(30px)" }}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              style={{
                filter: "contrast(1.1) saturate(1.2)",
              }}
            />
            {/* Cyber gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10 mix-blend-overlay" />

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

            {/* Status badge - cyberpunk style */}
            <div
              className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 border border-cyan-500/50 clip-corner"
              style={{ transform: "translateZ(40px)" }}
            >
              <div
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${statusConfig.bg} ${statusConfig.glow} animate-pulse`}
              />
              <span
                className={`${statusConfig.text} font-bold text-xs sm:text-sm uppercase tracking-wider`}
              >
                {status}
              </span>
            </div>

            {/* ID Badge */}
            <div
              className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black/80 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 border border-pink-500/50 clip-corner"
              style={{ transform: "translateZ(40px)" }}
            >
              <span className="text-pink-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
                ID: {character.id.toString().padStart(3, "0")}
              </span>
            </div>
          </div>

          {/* Content section */}
          <div
            className="p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gradient-to-b from-black/50 to-black"
            style={{ transform: "translateZ(20px)" }}
          >
            {/* Name section */}
            <div className="relative" style={{ transform: "translateZ(30px)" }}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-cyan-400 mb-1 uppercase tracking-tight leading-tight">
                {name}
              </h2>
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <span className="text-cyan-300 font-bold uppercase tracking-wide">
                  {species}
                </span>
                {type && (
                  <>
                    <span className="text-pink-500">•</span>
                    <span className="text-pink-300 font-bold uppercase tracking-wide">
                      {type}
                    </span>
                  </>
                )}
              </div>
              {/* Underline glow */}
              <div className="h-0.5 w-20 sm:w-24 bg-gradient-to-r from-cyan-400 to-pink-500 mt-2 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            </div>

            {/* Stats grid */}
            <div
              className="grid grid-cols-2 gap-2 sm:gap-3"
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="relative bg-gradient-to-br from-cyan-950/50 to-black border border-cyan-500/30 p-2.5 sm:p-3 clip-corner group hover:border-cyan-400/60 transition-all">
                <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/5 transition-all" />
                <p className="text-cyan-400 text-[10px] sm:text-xs uppercase tracking-wider mb-1 font-bold">
                  Gender
                </p>
                <p className="text-white font-black text-sm sm:text-base uppercase">
                  {gender}
                </p>
              </div>

              <div className="relative bg-gradient-to-br from-pink-950/50 to-black border border-pink-500/30 p-2.5 sm:p-3 clip-corner group hover:border-pink-400/60 transition-all">
                <div className="absolute inset-0 bg-pink-400/0 group-hover:bg-pink-400/5 transition-all" />
                <p className="text-pink-400 text-[10px] sm:text-xs uppercase tracking-wider mb-1 font-bold">
                  Episodes
                </p>
                <p className="text-white font-black text-sm sm:text-base uppercase">
                  {episode.length}
                </p>
              </div>
            </div>

            {/* Location info */}
            <div
              className="space-y-2 sm:space-y-3"
              style={{ transform: "translateZ(15px)" }}
            >
              <div className="relative bg-gradient-to-r from-cyan-950/30 via-black to-black border-l-2 sm:border-l-4 border-cyan-500 p-2.5 sm:p-3 group hover:from-cyan-950/50 transition-all clip-corner-small overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-all" />
                <p className="text-cyan-400 text-[10px] sm:text-xs uppercase tracking-wider mb-1 font-bold flex items-center gap-1.5 sm:gap-2">
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse" />
                  Origin
                </p>
                <p className="text-white font-semibold text-xs sm:text-sm truncate">
                  {origin.name}
                </p>
              </div>

              <div className="relative bg-gradient-to-r from-pink-950/30 via-black to-black border-l-2 sm:border-l-4 border-pink-500 p-2.5 sm:p-3 group hover:from-pink-950/50 transition-all clip-corner-small overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all" />
                <p className="text-pink-400 text-[10px] sm:text-xs uppercase tracking-wider mb-1 font-bold flex items-center gap-1.5 sm:gap-2">
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full animate-pulse" />
                  Last Location
                </p>
                <p className="text-white font-semibold text-xs sm:text-sm truncate">
                  {location.name}
                </p>
              </div>
            </div>
          </div>

          {/* Digital particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {isMounted &&
              particles.map((particle, i) => (
                <div
                  key={i}
                  className={`absolute w-0.5 sm:w-1 h-0.5 sm:h-1 ${
                    particle.isCyan ? "bg-cyan-400" : "bg-pink-400"
                  } rounded-full opacity-60`}
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    animation: `cyber-float ${particle.duration}s ease-in-out infinite`,
                    animationDelay: `${particle.delay}s`,
                    transform: `translateZ(${particle.depth}px)`,
                    boxShadow: `0 0 10px ${
                      particle.isCyan
                        ? "rgba(6, 182, 212, 0.8)"
                        : "rgba(236, 72, 153, 0.8)"
                    }`,
                  }}
                />
              ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cyber-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) translateZ(50px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) translateX(10px) translateZ(60px);
            opacity: 1;
          }
        }

        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }

        .clip-corner {
          clip-path: polygon(
            0 0,
            calc(100% - 12px) 0,
            100% 12px,
            100% 100%,
            12px 100%,
            0 calc(100% - 12px)
          );
        }

        .clip-corner-small {
          clip-path: polygon(
            0 0,
            calc(100% - 8px) 0,
            100% 8px,
            100% 100%,
            0 100%
          );
        }

        @media (max-width: 640px) {
          .clip-corner {
            clip-path: polygon(
              0 0,
              calc(100% - 8px) 0,
              100% 8px,
              100% 100%,
              8px 100%,
              0 calc(100% - 8px)
            );
          }

          .clip-corner-small {
            clip-path: polygon(
              0 0,
              calc(100% - 6px) 0,
              100% 6px,
              100% 100%,
              0 100%
            );
          }
        }
      `}</style>
    </div>
  );
};
