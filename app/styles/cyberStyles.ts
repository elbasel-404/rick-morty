const CYBER_STATUS_CONFIGS = {
  Alive: {
    bg: "bg-cyan-400",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.6)]",
    text: "text-cyan-400",
  },
  Dead: {
    bg: "bg-red-500",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.6)]",
    text: "text-red-500",
  },
  unknown: {
    bg: "bg-yellow-400",
    glow: "shadow-[0_0_20px_rgba(250,204,21,0.6)]",
    text: "text-yellow-400",
  },
};

export const getCyberStatusConfig = (status: string) => {
  return (
    CYBER_STATUS_CONFIGS[status as keyof typeof CYBER_STATUS_CONFIGS] || {
      bg: "bg-gray-500",
      glow: "shadow-[0_0_20px_rgba(107,114,128,0.6)]",
      text: "text-gray-500",
    }
  );
};
