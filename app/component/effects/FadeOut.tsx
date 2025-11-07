"use client";

import type { CSSProperties, ReactNode } from "react";

interface FadeOutProps {
  /** Whether the element should be hidden (faded out) */
  isHidden: boolean;
  /** Duration in milliseconds */
  duration?: number;
  /** Delay before starting animation in milliseconds */
  delay?: number;
  /** Easing function */
  easing?: string;
  /** Whether to remove from DOM when hidden */
  unmountOnHide?: boolean;
  /** Additional className */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Content to fade out */
  children: ReactNode;
}

export const FadeOut = ({
  isHidden,
  duration = 800,
  delay = 0,
  easing = "cubic-bezier(0.4, 0.0, 0.2, 1)",
  unmountOnHide = true,
  className = "",
  style = {},
  children,
}: FadeOutProps) => {
  // Don't render at all if hidden and unmountOnHide is true
  if (isHidden && unmountOnHide) return null;

  return (
    <div
      className={className}
      style={{
        opacity: isHidden ? 0 : 1,
        transition: `opacity ${duration}ms ${easing} ${delay}ms`,
        pointerEvents: isHidden ? "none" : "auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
