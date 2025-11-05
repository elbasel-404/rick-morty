"use client";

import { ReactNode } from "react";
import { useInViewport } from "../useInViewport";

interface ViewportDetectorProps {
  /** Intersection observer threshold (0-1) */
  threshold?: number;
  /** Intersection observer root margin */
  rootMargin?: string;
  /** Additional className for wrapper */
  className?: string;
  /** Render prop that receives viewport state */
  children: (isInViewport: boolean) => ReactNode;
}

export const ViewportDetector = ({
  threshold = 0.1,
  rootMargin = "400px",
  className = "",
  children,
}: ViewportDetectorProps) => {
  const { elementRef, isInViewport } = useInViewport({
    threshold,
    rootMargin,
  });

  return (
    <div ref={elementRef} className={className}>
      {children(isInViewport)}
    </div>
  );
};
