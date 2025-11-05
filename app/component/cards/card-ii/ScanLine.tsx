export const ScanLine = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      style={{ transform: "translateZ(5px)" }}
    >
      <div
        className="absolute w-full h-1 bg-linear-to-r from-transparent via-cyan-400/30 to-transparent"
        style={{
          animation: "scan 3s linear infinite",
        }}
      />
    </div>
  );
};
