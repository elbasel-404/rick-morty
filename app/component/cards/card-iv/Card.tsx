import type { Character } from "@schema";
import { cn } from "@util";
import { Star } from "lucide-react";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCardIV = ({ character }: CharacterCardProps) => {
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

  // Calculate a rating based on number of episodes (just for demo)
  const rating = Math.min(5, Math.max(3.5, episode.length / 10)).toFixed(1);

  // Generate a random gradient background color
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  ];

  const gradient = gradients[Math.floor(Math.random() * gradients.length)];

  const statusColors = {
    Alive: "bg-green-400",
    Dead: "bg-red-400",
    unknown: "bg-gray-400",
  };

  return (
    <div className="glass-card group">
      <div className="card-ambient-glow" />

      <div className="relative h-full rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden shadow-2xl">
        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-20">
          <div className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white text-xs font-medium flex items-center gap-1.5">
            <div
              className={cn(
                "w-2 h-2 rounded-full shadow-lg",
                statusColors[status as keyof typeof statusColors] ||
                  statusColors.unknown,
              )}
            />
            {status}
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className="px-2.5 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white text-xs font-medium flex items-center gap-1">
            {rating}
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          </div>
        </div>

        {/* Character Image */}
        <div
          className="relative h-80 overflow-hidden"
          style={{ background: gradient }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60" />
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content Section */}
        <div className="relative p-6 bg-linear-to-b from-white/5 to-white/10 backdrop-blur-sm">
          {/* Character Name */}
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
            {name}
          </h2>

          {/* Description */}
          <p className="text-sm text-white/70 mb-4 line-clamp-2">
            {species}
            {type ? `, ${type}` : ""} • {gender} • {origin.name}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                Episodes
              </p>
              <p className="text-lg font-bold text-white">{episode.length}</p>
            </div>
            <div className="flex-1">
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                Location
              </p>
              <p className="text-lg font-bold text-white truncate">
                {location.name.split(" ")[0]}
              </p>
            </div>
          </div>

          {/* Follow Button */}
          <button className="w-full py-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};
