import { textShadow } from "@styles";

interface IDBadgeProps {
  id: number;
  isHovered: boolean;
}

export const IDBadge = ({ id, isHovered }: IDBadgeProps) => {
  return (
    <div
      className="absolute top-3 left-3 px-2 py-1 text-white text-base font-bold z-40 transition-all duration-500 ease-out"
      style={{
        textShadow: textShadow.base,
        opacity: isHovered ? 1 : 0,
        transform: isHovered
          ? "translateZ(55px) translateY(0)"
          : "translateZ(55px) translateY(-10px)",
      }}
    >
      #{id}
    </div>
  );
};
