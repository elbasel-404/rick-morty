import { textShadow } from "@styles";

interface CharacterNameProps {
  name: string;
  species: string;
  type?: string;
}

export const CharacterName = ({ name, species, type }: CharacterNameProps) => {
  return (
    <div
      className="absolute bottom-3 left-3 right-3 z-30 text-center px-5 py-4"
      style={{ transform: "translateZ(30px)" }}
    >
      <h2
        className="text-2xl font-black text-white tracking-tight leading-tight mb-1"
        style={{ textShadow: textShadow.strong }}
      >
        {name}
      </h2>
      <p
        className="text-white text-sm font-medium"
        style={{ textShadow: textShadow.light }}
      >
        {species} {type && `• ${type}`}
      </p>
    </div>
  );
};
