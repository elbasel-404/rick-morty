import { cva, type VariantProps } from "class-variance-authority";

/**
 * Status-related variants using CVA
 */

export const statusColorVariants = cva("", {
  variants: {
    status: {
      alive: "bg-green-500",
      dead: "bg-red-500",
      unknown: "bg-gray-500",
    },
  },
  defaultVariants: {
    status: "unknown",
  },
});

/**
 * Legacy helper for backward compatibility
 * @deprecated Use statusColorVariants instead
 */
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown: "bg-gray-500",
  };
  return statusColors[status] || "bg-gray-500";
};

/**
 * Text shadow variants using CVA
 */

export const textShadowVariants = cva("", {
  variants: {
    intensity: {
      strong:
        "[text-shadow:0_4px_12px_rgba(0,0,0,0.95),0_2px_6px_rgba(0,0,0,0.9),0_0_8px_rgba(0,0,0,0.8),0_0_20px_rgba(0,0,0,0.6)]",
      medium:
        "[text-shadow:0_2px_8px_rgba(0,0,0,0.95),0_0_4px_rgba(0,0,0,0.8),0_0_16px_rgba(0,0,0,0.5)]",
      light:
        "[text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_0_4px_rgba(0,0,0,0.8),0_0_16px_rgba(0,0,0,0.5)]",
      subtle:
        "[text-shadow:0_2px_6px_rgba(0,0,0,0.9),0_0_12px_rgba(0,0,0,0.4)]",
      base: "[text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_0_4px_rgba(0,0,0,0.8)]",
    },
  },
  defaultVariants: {
    intensity: "base",
  },
});

/**
 * Legacy text shadow object for backward compatibility
 * @deprecated Use textShadowVariants instead
 */
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

/**
 * Gradient variants using CVA
 */

export const gradientVariants = cva("", {
  variants: {
    type: {
      bottomDark:
        "bg-linear-to-b from-slate-900/20 via-transparent to-slate-900/90",
      scanLine:
        "bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(139,92,246,0.1)_2px,rgba(139,92,246,0.1)_4px)]",
    },
  },
});

/**
 * Legacy gradients object for backward compatibility
 * @deprecated Use gradientVariants instead
 */
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

export type StatusColorVariants = VariantProps<typeof statusColorVariants>;
export type TextShadowVariants = VariantProps<typeof textShadowVariants>;
export type GradientVariants = VariantProps<typeof gradientVariants>;
