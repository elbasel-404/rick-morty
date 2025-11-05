"use client";

import { useState } from "react";

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

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
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
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div
        className="relative"
        style={{ perspective: "1000px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative w-96 bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden transition-all duration-300 ease-out"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
              isHovered ? "scale(1.05)" : "scale(1)"
            }`,
            transformStyle: "preserve-3d",
            boxShadow: isHovered
              ? "0 40px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)"
              : "0 20px 40px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Glossy overlay effect */}
          <div
            className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none z-20"
            style={{ transform: "translateZ(20px)" }}
          />

          {/* Image section with 3D depth */}
          <div
            className="relative h-80 overflow-hidden"
            style={{ transform: "translateZ(30px)" }}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />

            {/* Status badge floating */}
            <div
              className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full"
              style={{ transform: "translateZ(40px)" }}
            >
              <div
                className={`w-3 h-3 rounded-full ${statusColor} animate-pulse`}
              />
              <span className="text-white font-semibold text-sm">{status}</span>
            </div>
          </div>

          {/* Content section with layered depth */}
          <div
            className="p-6 space-y-4"
            style={{ transform: "translateZ(20px)" }}
          >
            <div style={{ transform: "translateZ(30px)" }}>
              <h2 className="text-3xl font-bold text-white mb-1">{name}</h2>
              <p className="text-purple-300 text-sm font-medium">
                {species} {type && `• ${type}`}
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-3"
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 border border-purple-500/20">
                <p className="text-purple-400 text-xs uppercase tracking-wide mb-1">
                  Gender
                </p>
                <p className="text-white font-semibold">{gender}</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 border border-purple-500/20">
                <p className="text-purple-400 text-xs uppercase tracking-wide mb-1">
                  Episodes
                </p>
                <p className="text-white font-semibold">{episode.length}</p>
              </div>
            </div>

            <div
              className="space-y-3"
              style={{ transform: "translateZ(15px)" }}
            >
              <div className="bg-linear-to-r from-blue-900/30 to-transparent rounded-lg p-3 border-l-4 border-blue-500">
                <p className="text-blue-300 text-xs uppercase tracking-wide mb-1">
                  Origin
                </p>
                <p className="text-white font-medium text-sm">{origin.name}</p>
              </div>

              <div className="bg-linear-to-r from-emerald-900/30 to-transparent rounded-lg p-3 border-l-4 border-emerald-500">
                <p className="text-emerald-300 text-xs uppercase tracking-wide mb-1">
                  Last Location
                </p>
                <p className="text-white font-medium text-sm">
                  {location.name}
                </p>
              </div>
            </div>
          </div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${
                    3 + Math.random() * 4
                  }s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                  transform: `translateZ(${50 + Math.random() * 50}px)`,
                }}
              />
            ))}
          </div>
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
