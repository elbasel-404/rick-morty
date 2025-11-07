"use client";

import { ReactNode, CSSProperties } from "react";

interface FadeInProps {
  /** Whether the element should be visible */
  isVisible: boolean;
  /** Duration in milliseconds */
  duration?: number;
  /** Delay before starting animation in milliseconds */
  delay?: number;
  /** Easing function */
  easing?: string;
  /** Additional className */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Content to fade in */
  children: ReactNode;
}

export const FadeIn = ({
  isVisible,
  duration = 900,
  delay = 0,
  easing = "cubic-bezier(0.4, 0.0, 0.2, 1)",
  className = "",
  style = {},
  children,
}: FadeInProps) => {
  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ${easing} ${delay}ms`,
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
