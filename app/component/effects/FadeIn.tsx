"use client";

import { ReactNode, CSSProperties, useEffect, useState } from "react";

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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }

    return undefined;
  }, []);

  const transitionValue = `${duration}ms ${easing} ${delay}ms`;
  const transition = prefersReducedMotion
    ? `opacity ${duration}ms linear ${delay}ms`
    : `opacity ${transitionValue}, transform ${transitionValue}`;
  const hiddenTransform = prefersReducedMotion
    ? "none"
    : "translate3d(0, 16px, 0) scale(0.98)";
  const visibleTransform = prefersReducedMotion
    ? "none"
    : "translate3d(0, 0, 0) scale(1)";

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transition,
        transform: isVisible ? visibleTransform : hiddenTransform,
        pointerEvents: isVisible ? "auto" : "none",
        willChange: prefersReducedMotion ? "opacity" : "opacity, transform",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
