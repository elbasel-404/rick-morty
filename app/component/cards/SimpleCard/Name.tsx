import { textShadow } from "@styles";

interface NameProps {
  name: string;
  species: string;
  type?: string;
}

export const Name = ({ name, species, type }: NameProps) => {
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
