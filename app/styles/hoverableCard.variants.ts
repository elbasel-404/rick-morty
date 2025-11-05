import { cva, type VariantProps } from "class-variance-authority";

/**
 * Hoverable Grid Card Variants
 * Replaces .hoverable-card from globals.css
 */

export const hoverableCardVariants = cva(
  ["relative z-[1]", "transition-all duration-300 motion-ease-spring-smooth"],
  {
    variants: {
      hover: {
        true: [
          "scale-[1.08] -translate-y-2 z-50",
          "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1),0_0_60px_rgba(99,102,241,0.3)]",
          "dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.2),0_0_80px_rgba(99,102,241,0.4)]",
        ],
        false: "",
      },
    },
    defaultVariants: {
      hover: false,
    },
  }
);

export type HoverableCardVariants = VariantProps<typeof hoverableCardVariants>;
