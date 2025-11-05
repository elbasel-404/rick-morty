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
    <div className="relative w-full h-full min-h-[400px]">
      <div
        className="relative w-full h-full min-h-[400px]"
        style={{ perspective: "1000px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative w-full h-full bg-linear-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden transition-all duration-300 ease-out"
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
          {/* Full-height background image with minimal overlay */}
          <div className="absolute inset-0">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />

            {/* Gradient overlay - dark at bottom for readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom, 
                  rgba(15, 23, 42, 0.2) 0%, 
                  transparent 30%, 
                  transparent 60%,
                  rgba(15, 23, 42, 0.6) 85%,
                  rgba(15, 23, 42, 0.9) 100%)`,
              }}
            />

            {/* Holographic scan line effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 92, 246, 0.1) 2px, rgba(139, 92, 246, 0.1) 4px)",
              }}
            />
          </div>

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

          {/* Status badge floating with depth */}
          <div
            className="absolute top-3 right-3 flex items-center gap-2 px-2 py-1 z-40 transition-all duration-500 ease-out"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateZ(55px) translateY(0)" : "translateZ(55px) translateY(-10px)",
            }}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${statusColor} animate-pulse shadow-lg`}
              style={{ boxShadow: `0 0 10px currentColor` }}
            />
            <span className="text-white font-bold text-base tracking-wide" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 4px rgba(0, 0, 0, 0.8)' }}>{status}</span>
          </div>

          {/* ID badge in top left */}
          <div
            className="absolute top-3 left-3 px-2 py-1 text-white text-base font-bold z-40 transition-all duration-500 ease-out"
            style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 4px rgba(0, 0, 0, 0.8)',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateZ(55px) translateY(0)" : "translateZ(55px) translateY(-10px)",
            }}
          >
            #{character.id}
          </div>

          {/* Name at bottom - full width */}
          <div
            className="absolute bottom-3 left-3 right-3 z-30 text-center px-5 py-4"
            style={{ transform: "translateZ(30px)" }}
          >
            <h2 className="text-2xl font-black text-white tracking-tight leading-tight mb-1" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)' }}>
              {name}
            </h2>
            <p className="text-white text-sm font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 4px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.5)' }}>
              {species} {type && `• ${type}`}
            </p>
          </div>

          {/* Gender and Episodes - top right below status */}
          <div
            className="absolute top-16 right-3 flex flex-col gap-2.5 z-40 transition-all duration-500 ease-out"
            style={{ 
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateZ(45px) translateX(0)" : "translateZ(45px) translateX(20px)",
            }}
          >
            <div className="text-center px-3 py-2">
              <p className="text-white/80 text-[10px] uppercase tracking-wider font-medium mb-1" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.9), 0 0 12px rgba(0, 0, 0, 0.4)' }}>
                Gender
              </p>
              <p className="text-white font-bold text-base" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 4px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.5)' }}>{gender}</p>
            </div>

            <div className="text-center px-3 py-2">
              <p className="text-white/80 text-[10px] uppercase tracking-wider font-medium mb-1" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.9), 0 0 12px rgba(0, 0, 0, 0.4)' }}>
                Episodes
              </p>
              <p className="text-white font-bold text-base" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 4px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.5)' }}>
                {episode.length}
              </p>
            </div>
          </div>

          {/* Origin and Location - bottom */}
          <div
            className="absolute bottom-24 left-3 right-3 flex gap-2.5 z-40 transition-all duration-500 ease-out delay-100"
            style={{ 
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateZ(35px) translateY(0)" : "translateZ(35px) translateY(20px)",
            }}
          >
            <div className="flex-1 text-center px-3 py-2">
              <p className="text-white/80 text-[10px] uppercase tracking-wider font-medium mb-1" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.9), 0 0 12px rgba(0, 0, 0, 0.4)' }}>
                Origin
              </p>
              <p className="text-white font-bold text-sm line-clamp-1" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 4px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.5)' }}>
                {origin.name}
              </p>
            </div>

            <div className="flex-1 text-center px-3 py-2">
              <p className="text-white/80 text-[10px] uppercase tracking-wider font-medium mb-1" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.9), 0 0 12px rgba(0, 0, 0, 0.4)' }}>
                Location
              </p>
              <p className="text-white font-bold text-sm line-clamp-1" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 4px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.5)' }}>
                {location.name}
              </p>
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
