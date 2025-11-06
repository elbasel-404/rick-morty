export const Effects = () => {
  return (
    <>
      {/* Top edge highlight for 3D effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none z-30 translate-z-[50px]" />

      {/* Side edge highlights */}
      <div className="absolute top-0 left-0 bottom-0 w-px bg-linear-to-b from-white/10 via-white/5 to-transparent pointer-events-none z-30 translate-z-[50px]" />
      <div className="absolute top-0 right-0 bottom-0 w-px bg-linear-to-b from-transparent via-black/20 to-black/10 pointer-events-none z-30 translate-z-[50px]" />

      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none z-20 translate-z-5" />

      {/* Metallic corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-linear-to-br from-purple-400/20 to-transparent rounded-br-full pointer-events-none z-25 translate-z-[35px]" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-linear-to-tl from-blue-400/20 to-transparent rounded-tl-full pointer-events-none z-25 translate-z-[35px]" />

      {/* Bottom edge shadow for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-black/40 to-transparent pointer-events-none translate-z-[5px]" />
    </>
  );
};
