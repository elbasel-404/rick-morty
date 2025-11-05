export const CornerAccents = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 border-t-2 border-r-2 border-pink-500 pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 border-b-2 border-l-2 border-pink-500 pointer-events-none z-20" />
      <div className="absolute bottom-0 right-0 w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-20" />
    </>
  );
};
