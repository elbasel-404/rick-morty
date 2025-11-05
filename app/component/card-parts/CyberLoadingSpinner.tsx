export const CyberLoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-50">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-24 h-24 border-4 border-transparent border-t-cyan-400 border-r-cyan-400 rounded-full animate-spin" />

        {/* Middle rotating ring - opposite direction */}
        <div className="absolute inset-2 w-20 h-20 border-4 border-transparent border-b-blue-500 border-l-blue-500 rounded-full animate-spin-reverse" />

        {/* Inner pulsing circle */}
        <div className="absolute inset-6 w-12 h-12 bg-cyan-400/20 rounded-full animate-pulse" />

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
        </div>

        {/* Scanning lines */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div
            className="absolute w-full h-0.5 bg-cyan-400/50"
            style={{
              animation: "scanVertical 2s linear infinite",
            }}
          />
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute mt-32">
        <p className="text-cyan-400 font-bold text-sm uppercase tracking-widest animate-pulse">
          Loading Data...
        </p>
      </div>

      <style>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        @keyframes scanVertical {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
};
