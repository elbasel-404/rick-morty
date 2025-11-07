import type { Character } from "@schema";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCardV = ({ character }: CharacterCardProps) => {
  const { name, image, status, species, location, origin, gender } = character;

  return (
    <div className="relative w-72 rounded-3xl overflow-hidden shadow-lg bg-white group transition-transform hover:-translate-y-2">
      {/* Rating badge */}
      <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2 py-1 rounded-full text-sm font-semibold text-gray-800 shadow">
        4.8 ★
      </div>

      {/* Top Ribbon */}
      <div className="absolute top-0 left-4 w-8 h-10 bg-linear-to-b from-gray-700 to-gray-900 rounded-b-md flex items-center justify-center text-white text-xs font-semibold shadow-md">
        PRO
      </div>

      {/* Image */}
      <div className="relative">
        <img src={image} alt={name} className="w-full h-80 object-cover" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 p-5 w-full">
        <h2 className="text-xl font-bold text-gray-900">{name}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {species}, {gender}. Currently in <strong>{location.name}</strong>.
        </p>
        <p className="text-sm text-gray-500 mt-1">Origin: {origin.name}</p>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>
            <span className="font-semibold text-gray-800">Status:</span>{" "}
            {status}
          </div>
          <button
            type="button"
            className="px-4 py-1.5 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};
