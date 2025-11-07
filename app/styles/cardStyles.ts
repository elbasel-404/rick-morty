const STATUS_COLORS: Record<string, string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
  unknown: "bg-gray-500",
};

export const getStatusColor = (status: string): string => {
  return STATUS_COLORS[status] || "bg-gray-500";
};

export const textShadow = {
  strong:
    "0 4px 12px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)",
  medium:
    "0 2px 8px rgba(0, 0, 0, 0.95), 0 0 4px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.5)",
  light:
    "0 2px 8px rgba(0, 0, 0, 0.9), 0 0 4px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.5)",
  subtle: "0 2px 6px rgba(0, 0, 0, 0.9), 0 0 12px rgba(0, 0, 0, 0.4)",
  base: "0 2px 8px rgba(0, 0, 0, 0.9), 0 0 4px rgba(0, 0, 0, 0.8)",
};

export const gradients = {
  bottomDark: `linear-gradient(to bottom, 
    rgba(15, 23, 42, 0.2) 0%, 
    transparent 30%, 
    transparent 60%,
    rgba(15, 23, 42, 0.6) 85%,
    rgba(15, 23, 42, 0.9) 100%)`,
  scanLine:
    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 92, 246, 0.1) 2px, rgba(139, 92, 246, 0.1) 4px)",
};
