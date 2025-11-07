import { Character } from "@schema";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCardV = ({ character }: CharacterCardProps) => {
  const { name, image, status, species, location, origin, gender } = character;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-lg bg-white group transition-transform hover:-translate-y-2">
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-56 sm:h-72 md:h-96 object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 p-3 sm:p-4 md:p-5 w-full">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-black">
          {name}
        </h2>
        <p className="text-lg text-black mt-1">
          {species}, {gender}. Currently in <strong>{location.name}</strong>.
        </p>
        <p className="text-lg text-black mt-1">Origin: {origin.name}</p>

        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-xs sm:text-sm text-gray-500">
          <div className="text-black text-lg">
            <span className="font-semibold ">Status:</span> {status}
          </div>
        </div>
      </div>
    </div>
  );
};
