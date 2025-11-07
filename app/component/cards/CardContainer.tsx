"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import { useInViewport } from "@hooks";
import { cn } from "@util";
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
  cardFadeInDuration = 900,
  cardFadeInDelay = 0,
  viewportThreshold = 0.1,
  viewportRootMargin = "400px",
  children,
}: CardContainerProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const initialLoadRef = useRef(true);
  const loadTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const skeletonDelayTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const skeletonStartTimeRef = useRef<number | null>(null);
  const { elementRef, isInViewport } = useInViewport({
    threshold: viewportThreshold,
    rootMargin: viewportRootMargin,
  });

  const handleImageLoad = (loaded: boolean, isCached: boolean) => {
    if (!loaded || hasLoadedOnce) {
      return;
    }

    setImageLoaded(true);
    setHasLoadedOnce(true);

    if (isCached && initialLoadRef.current) {
      initialLoadRef.current = false;
      setInitialLoadComplete(true);
      setShowCard(true);
      setHideSkeleton(true);
      return;
    }

    // Ensure we have a skeleton start timestamp even if it was never set
    if (skeletonStartTimeRef.current === null) {
      skeletonStartTimeRef.current = Date.now();
    }

    const skeletonVisibleTime = Date.now() - skeletonStartTimeRef.current;

    const remainingTime = Math.max(
      0,
      minSkeletonVisibility - skeletonVisibleTime
    );

    skeletonDelayTimeoutRef.current = setTimeout(() => {
      setHideSkeleton(true);

      loadTimeoutRef.current = setTimeout(() => {
        setShowCard(true);
      }, skeletonFadeOutDuration);
    }, remainingTime);
  };

  // Mark that we're past initial load after entering viewport
  useEffect(() => {
    const timer = setTimeout(() => {
      initialLoadRef.current = false;
      setInitialLoadComplete(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!initialLoadComplete || !isInViewport || hasLoadedOnce) {
      return;
    }

    if (skeletonStartTimeRef.current === null) {
      skeletonStartTimeRef.current = Date.now();
    }
  }, [initialLoadComplete, isInViewport, hasLoadedOnce]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
      if (skeletonDelayTimeoutRef.current) {
        clearTimeout(skeletonDelayTimeoutRef.current);
      }
    };
  }, []);

  const shouldShowSkeleton =
    !hasLoadedOnce && isInViewport && initialLoadComplete;

  return (
    <div ref={elementRef} className={cn("relative", className)}>
      {/* Lazy load image */}
      <LazyImage
        src={imageUrl}
        alt={imageAlt}
        isInViewport={isInViewport}
        onLoad={handleImageLoad}
        mode="preload"
      />

      {/* Skeleton with fade out */}
      {shouldShowSkeleton && (
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
    </div>
  );
};
