import { cva, type VariantProps } from "class-variance-authority";

/**
 * Glass Card Variants
 * Replaces .glass-card, .card-glass-container, and related classes from globals.css
 */

export const glassCardVariants = cva(
  "relative w-full cursor-pointer transition-all duration-[400ms] motion-ease-spring-smooth",
  {
    variants: {
      size: {
        default: "max-w-[320px] h-[550px]",
        sm: "max-w-[280px] h-[480px]",
        lg: "max-w-[360px] h-[600px]",
      },
      animated: {
        true: "motion-safe:animate-[float-gentle_4s_ease-in-out_infinite]",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      animated: true,
    },
  }
);

export const glassContainerVariants = cva(
  [
    "relative w-full h-full rounded-3xl overflow-hidden",
    "bg-linear-to-br from-slate-800/70 to-slate-900/80",
    "backdrop-blur-xl backdrop-saturate-[1.8]",
    "border border-white/10",
    "shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.05)_inset,0_20px_60px_rgba(99,102,241,0.2)]",
    "transition-all duration-[400ms] ease-out",
  ],
  {
    variants: {
      hover: {
        true: [
          "border-white/20",
          "shadow-[0_16px_48px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset,0_30px_80px_rgba(99,102,241,0.4),0_0_60px_rgba(168,85,247,0.3)]",
        ],
        false: "",
      },
    },
    defaultVariants: {
      hover: false,
    },
  }
);

export const ambientGlowVariants = cva(
  [
    "absolute -inset-10 rounded-[30px] -z-10",
    "bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.4)_0%,rgba(168,85,247,0.35)_20%,rgba(236,72,153,0.25)_40%,rgba(59,130,246,0.2)_60%,transparent_80%)]",
    "blur-[30px]",
    "motion-safe:animate-[ambient-glow_6s_ease-in-out_infinite]",
  ],
  {
    variants: {
      hover: {
        true: "motion-safe:animate-[ambient-glow_3s_ease-in-out_infinite] blur-[40px]",
        false: "",
      },
    },
    defaultVariants: {
      hover: false,
    },
  }
);

export const cardShineVariants = cva(
  [
    "absolute inset-0 z-[15] pointer-events-none rounded-3xl",
    "bg-linear-to-br from-transparent via-white/15 to-transparent",
    "opacity-0",
  ],
  {
    variants: {
      hover: {
        true: "motion-safe:animate-[shimmer-wave_2s_ease-in-out] opacity-100",
        false: "",
      },
    },
    defaultVariants: {
      hover: false,
    },
  }
);

export const cardImageSectionVariants = cva("relative w-full overflow-hidden", {
  variants: {
    size: {
      default: "h-[320px]",
      sm: "h-[280px]",
      lg: "h-[360px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const cardMainImageVariants = cva(
  [
    "w-full h-full object-cover",
    "transition-transform duration-[600ms] motion-ease-spring-smooth",
    "motion-safe:animate-[pulse-glow_4s_ease-in-out_infinite]",
  ],
  {
    variants: {
      hover: {
        true: "scale-110 motion-safe:animate-none brightness-115 saturate-[1.2]",
        false: "",
      },
    },
    defaultVariants: {
      hover: false,
    },
  }
);

export const holographicShimmerVariants = cva(
  [
    "absolute inset-0",
    "bg-linear-to-br from-transparent via-indigo-500/15 to-transparent",
    "bg-[length:300%_300%]",
    "opacity-0 transition-opacity duration-[400ms] ease-out",
    "mix-blend-overlay",
  ],
  {
    variants: {
      hover: {
        true: "motion-safe:animate-[shimmer-wave_3s_ease-in-out_infinite] opacity-100",
        false: "",
      },
    },
    defaultVariants: {
      hover: false,
    },
  }
);

export type GlassCardVariants = VariantProps<typeof glassCardVariants>;
export type GlassContainerVariants = VariantProps<
  typeof glassContainerVariants
>;
export type AmbientGlowVariants = VariantProps<typeof ambientGlowVariants>;
export type CardShineVariants = VariantProps<typeof cardShineVariants>;
export type CardImageSectionVariants = VariantProps<
  typeof cardImageSectionVariants
>;
export type CardMainImageVariants = VariantProps<typeof cardMainImageVariants>;
export type HolographicShimmerVariants = VariantProps<
  typeof holographicShimmerVariants
>;
