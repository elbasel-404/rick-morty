"use client";

import { ReactNode, useRef, useEffect } from "react";
import { useInViewport } from "./useInViewport";
import { useImageLoad } from "./hooks/useImageLoad";
import { useSkeletonFade } from "./hooks/useSkeletonFade";
import { SkeletonLoader } from "./card-parts/SkeletonLoader";

interface CardContainerProps {
  /** Image URL to preload */
  imageUrl: string;
  /** Alt text for image (for accessibility) */
  imageAlt: string;
  /** Skeleton variant to display during loading */
  skeletonVariant?: "card-i" | "card-ii" | "default";
  /** Additional className for skeleton */
  skeletonClassName?: string;
  /** Container className */
  className?: string;
  /** Fade out duration in ms */
  fadeOutDuration?: number;
  /** Viewport threshold (0-1) */
  viewportThreshold?: number;
  /** Viewport root margin */
  viewportRootMargin?: string;
  /** Card content - receives cardOpacity for fade in */
  children: (props: { cardOpacity: number; imageLoaded: boolean }) => ReactNode;
}

export const CardContainer = ({
  imageUrl,
  imageAlt,
  skeletonVariant = "default",
  skeletonClassName = "",
  className = "",
  fadeOutDuration = 800,
  viewportThreshold = 0.1,
  viewportRootMargin = "400px",
  children,
}: CardContainerProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Custom hooks
  const { imageLoaded, handleImageLoad, checkIfImageCached } = useImageLoad();
  const { elementRef, isInViewport } = useInViewport({
    threshold: viewportThreshold,
    rootMargin: viewportRootMargin,
  });
  const { showSkeleton, skeletonOpacity, cardOpacity } = useSkeletonFade({
    imageLoaded,
    isInViewport,
    fadeOutDuration,
  });

  // Check if image is already cached when entering viewport
  useEffect(() => {
    if (isInViewport && imgRef.current && !imageLoaded) {
      checkIfImageCached(imgRef.current);
    }
  }, [isInViewport, imageLoaded, checkIfImageCached]);

  return (
    <div ref={elementRef} className={className}>
      {/* Preload image - only when in viewport */}
      {isInViewport && (
        <img
          ref={imgRef}
          src={imageUrl}
          alt={imageAlt}
          onLoad={handleImageLoad}
          className="hidden"
          aria-hidden="true"
        />
      )}

      {/* Skeleton Loading State */}
      {showSkeleton && (
        <SkeletonLoader
          opacity={skeletonOpacity}
          variant={skeletonVariant}
          className={skeletonClassName}
        />
      )}

      {/* Card Content */}
      {children({ cardOpacity, imageLoaded })}
    </div>
  );
};
