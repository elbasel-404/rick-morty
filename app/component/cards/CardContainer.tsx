"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import { ViewportDetector } from "../effects/ViewportDetector";
import { LazyImage } from "../effects/LazyImage";
import { FadeIn } from "../effects/FadeIn";
import { FadeOut } from "../effects/FadeOut";
import { SkeletonLoader } from "../SkeletonLoader";

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
  /** Minimum time skeleton stays visible in ms (enforced even if image loads quickly) */
  minSkeletonVisibility?: number;
  /** Skeleton fade out duration in ms */
  skeletonFadeOutDuration?: number;
  /** Card fade in duration in ms */
  cardFadeInDuration?: number;
  /** Delay before card fade in starts (after skeleton fade) in ms */
  cardFadeInDelay?: number;
  /** Viewport threshold (0-1) */
  viewportThreshold?: number;
  /** Viewport root margin */
  viewportRootMargin?: string;
  /** Card content - receives visibility state */
  children: (props: { isVisible: boolean; imageLoaded: boolean }) => ReactNode;
}

export const CardContainer = ({
  imageUrl,
  imageAlt,
  skeletonVariant = "default",
  skeletonClassName = "",
  className = "",
  minSkeletonVisibility = 1000,
  skeletonFadeOutDuration = 800,
  cardFadeInDuration = 1800,
  cardFadeInDelay = 0,
  viewportThreshold = 0.1,
  viewportRootMargin = "400px",
  children,
}: CardContainerProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const initialLoadRef = useRef(true);
  const loadTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const skeletonStartTimeRef = useRef<number | null>(null);

  const handleImageLoad = (loaded: boolean, isCached: boolean) => {
    if (loaded && !hasLoadedOnce) {
      setImageLoaded(true);
      setHasLoadedOnce(true);

      // If image is cached and this is initial load, skip skeleton
      if (isCached && initialLoadRef.current) {
        initialLoadRef.current = false;
        setShowCard(true);
        setHideSkeleton(true);
        return;
      }

      // Calculate how long skeleton has been visible
      const skeletonVisibleTime = skeletonStartTimeRef.current
        ? Date.now() - skeletonStartTimeRef.current
        : 0;

      // Calculate remaining time to reach minimum visibility
      const remainingTime = Math.max(
        0,
        minSkeletonVisibility - skeletonVisibleTime
      );

      // Wait for minimum visibility time, then start skeleton fade out
      setTimeout(() => {
        setHideSkeleton(true);

        // Show card after skeleton finishes fading
        loadTimeoutRef.current = setTimeout(() => {
          setShowCard(true);
        }, skeletonFadeOutDuration);
      }, remainingTime);
    }
  };

  // Mark that we're past initial load after entering viewport
  useEffect(() => {
    const timer = setTimeout(() => {
      initialLoadRef.current = false;
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Track when skeleton becomes visible
  useEffect(() => {
    const shouldShowSkeleton = !hasLoadedOnce && !initialLoadRef.current;
    if (shouldShowSkeleton && skeletonStartTimeRef.current === null) {
      skeletonStartTimeRef.current = Date.now();
    }
  }, [hasLoadedOnce]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, []);

  return (
    <ViewportDetector
      threshold={viewportThreshold}
      rootMargin={viewportRootMargin}
      className={className}
    >
      {(isInViewport) => (
        <>
          {/* Lazy load image */}
          <LazyImage
            src={imageUrl}
            alt={imageAlt}
            isInViewport={isInViewport}
            onLoad={handleImageLoad}
            mode="preload"
          />

          {/* Skeleton with fade out */}
          {!hasLoadedOnce && isInViewport && !initialLoadRef.current && (
            <FadeOut
              isHidden={hideSkeleton}
              duration={skeletonFadeOutDuration}
              unmountOnHide={true}
              style={{ position: "absolute", inset: 0, zIndex: 10 }}
            >
              <SkeletonLoader
                opacity={1}
                variant={skeletonVariant}
                className={skeletonClassName}
              />
            </FadeOut>
          )}

          {/* Card content with fade in */}
          <FadeIn
            isVisible={showCard || hasLoadedOnce}
            duration={cardFadeInDuration}
            delay={cardFadeInDelay}
          >
            {children({ isVisible: showCard || hasLoadedOnce, imageLoaded })}
          </FadeIn>
        </>
      )}
    </ViewportDetector>
  );
};
