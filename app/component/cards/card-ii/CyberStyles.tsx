export const CyberStyles = () => {
  return (
    <style>{`
      .backface-hidden {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }

      @keyframes cyber-float {
        0%, 100% {
          transform: translateY(0px) translateX(0px) translateZ(50px);
          opacity: 0.6;
        }
        50% {
          transform: translateY(-30px) translateX(10px) translateZ(60px);
          opacity: 1;
        }
      }

      @keyframes scan {
        0% { top: -10%; }
        100% { top: 110%; }
      }

      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      .clip-corner {
        clip-path: polygon(
          0 0,
          calc(100% - 12px) 0,
          100% 12px,
          100% 100%,
          12px 100%,
          0 calc(100% - 12px)
        );
      }

      .clip-corner-small {
        clip-path: polygon(
          0 0,
          calc(100% - 8px) 0,
          100% 8px,
          100% 100%,
          0 100%
        );
      }

      @media (max-width: 640px) {
        .clip-corner {
          clip-path: polygon(
            0 0,
            calc(100% - 8px) 0,
            100% 8px,
            100% 100%,
            8px 100%,
            0 calc(100% - 8px)
          );
        }

        .clip-corner-small {
          clip-path: polygon(
            0 0,
            calc(100% - 6px) 0,
            100% 6px,
            100% 100%,
            0 100%
          );
        }
      }
    `}</style>
  );
};
