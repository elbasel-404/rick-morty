import { gradients } from "@styles";

export const Overlay = () => {
  return (
    <>
      {/* Gradient overlay - dark at bottom for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: gradients.bottomDark }}
      />

      {/* Holographic scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: gradients.scanLine }}
      />
    </>
  );
};
