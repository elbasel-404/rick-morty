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

export const CharacterCardI = ({ character }: CharacterCardProps) => {
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

    return Array.from({ length: 8 }, (_, i) => ({
      left: seededRandom(i * 2) * 100,
      top: seededRandom(i * 2 + 1) * 100,
      duration: 3 + seededRandom(i * 3) * 4,
      delay: seededRandom(i * 4) * 2,
      depth: 50 + seededRandom(i * 5) * 50,
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

  const statusColor =
    {
      Alive: "bg-green-500",
      Dead: "bg-red-500",
      unknown: "bg-gray-500",
    }[status] || "bg-gray-500";

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div
        className="relative"
        style={{ perspective: "1000px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative w-72 bg-linear-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden transition-all duration-300 ease-out"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
              isHovered ? "scale(1.05)" : "scale(1)"
            }`,
            transformStyle: "preserve-3d",
            boxShadow: isHovered
              ? "0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : "0 15px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Top edge highlight for 3D effect */}
          <div
            className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none z-30"
            style={{ transform: "translateZ(50px)" }}
          />

          {/* Side edge highlights */}
          <div
            className="absolute top-0 left-0 bottom-0 w-px bg-linear-to-b from-white/10 via-white/5 to-transparent pointer-events-none z-30"
            style={{ transform: "translateZ(50px)" }}
          />
          <div
            className="absolute top-0 right-0 bottom-0 w-px bg-linear-to-b from-transparent via-black/20 to-black/10 pointer-events-none z-30"
            style={{ transform: "translateZ(50px)" }}
          />

          {/* Glossy overlay effect */}
          <div
            className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none z-20"
            style={{ transform: "translateZ(20px)" }}
          />

          {/* Metallic corner accents */}
          <div
            className="absolute top-0 left-0 w-16 h-16 bg-linear-to-br from-purple-400/20 to-transparent rounded-br-full pointer-events-none z-25"
            style={{ transform: "translateZ(35px)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-16 h-16 bg-linear-to-tl from-blue-400/20 to-transparent rounded-tl-full pointer-events-none z-25"
            style={{ transform: "translateZ(35px)" }}
          />

          {/* Image section with 3D depth */}
          <div
            className="relative h-56 overflow-hidden"
            style={{ transform: "translateZ(30px)" }}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent" />

            {/* Holographic scan line effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 92, 246, 0.1) 2px, rgba(139, 92, 246, 0.1) 4px)",
                transform: "translateZ(45px)",
              }}
            />

            {/* Status badge floating with depth */}
            <div
              className="absolute top-3 right-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10"
              style={{
                transform: "translateZ(55px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div
                className={`w-2 h-2 rounded-full ${statusColor} animate-pulse shadow-lg`}
                style={{ boxShadow: `0 0 8px currentColor` }}
              />
              <span className="text-white font-semibold text-xs">{status}</span>
            </div>

            {/* ID badge in top left */}
            <div
              className="absolute top-3 left-3 bg-linear-to-r from-purple-600/80 to-blue-600/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-white text-xs font-mono font-bold border border-white/20"
              style={{
                transform: "translateZ(55px)",
                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)",
              }}
            >
              #{character.id}
            </div>
          </div>

          {/* Content section with layered depth */}
          <div
            className="p-4 space-y-3"
            style={{ transform: "translateZ(20px)" }}
          >
            <div style={{ transform: "translateZ(30px)" }}>
              <h2 className="text-2xl font-bold text-white mb-0.5 tracking-tight">
                {name}
              </h2>
              <p className="text-purple-300 text-xs font-medium">
                {species} {type && `• ${type}`}
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-2"
              style={{ transform: "translateZ(25px)" }}
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2.5 border border-purple-500/20 shadow-inner">
                <p className="text-purple-400 text-[10px] uppercase tracking-wide mb-0.5">
                  Gender
                </p>
                <p className="text-white font-semibold text-sm">{gender}</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2.5 border border-purple-500/20 shadow-inner">
                <p className="text-purple-400 text-[10px] uppercase tracking-wide mb-0.5">
                  Episodes
                </p>
                <p className="text-white font-semibold text-sm">
                  {episode.length}
                </p>
              </div>
            </div>

            <div
              className="space-y-2"
              style={{ transform: "translateZ(15px)" }}
            >
              <div className="bg-linear-to-r from-blue-900/40 to-transparent rounded-lg p-2.5 border-l-2 border-blue-500 shadow-lg">
                <p className="text-blue-300 text-[10px] uppercase tracking-wide mb-0.5">
                  Origin
                </p>
                <p className="text-white font-medium text-xs line-clamp-1">
                  {origin.name}
                </p>
              </div>

              <div className="bg-linear-to-r from-emerald-900/40 to-transparent rounded-lg p-2.5 border-l-2 border-emerald-500 shadow-lg">
                <p className="text-emerald-300 text-[10px] uppercase tracking-wide mb-0.5">
                  Location
                </p>
                <p className="text-white font-medium text-xs line-clamp-1">
                  {location.name}
                </p>
              </div>
            </div>
          </div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {isMounted &&
              particles.map((particle, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-40"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    animation: `float ${particle.duration}s ease-in-out infinite`,
                    animationDelay: `${particle.delay}s`,
                    transform: `translateZ(${particle.depth}px)`,
                  }}
                />
              ))}
          </div>

          {/* Bottom edge shadow for depth */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-black/40 to-transparent pointer-events-none"
            style={{ transform: "translateZ(5px)" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateZ(50px); }
          50% { transform: translateY(-20px) translateZ(60px); }
        }
      `}</style>
    </div>
  );
};
