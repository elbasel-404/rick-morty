"use client";

import { useEffect, useRef, useState } from "react";

interface UseSkeletonFadeOptions {
  imageLoaded: boolean;
  isInViewport: boolean;
  fadeOutDuration?: number; // Duration in ms for skeleton fade out
}

interface UseSkeletonFadeReturn {
  showSkeleton: boolean;
  showCard: boolean;
  skeletonOpacity: number;
  cardOpacity: number;
}

const INITIAL_VIEWPORT_DELAY_MS = 100;

export const useSkeletonFade = ({
  imageLoaded,
  isInViewport,
  fadeOutDuration = 800,
}: UseSkeletonFadeOptions): UseSkeletonFadeReturn => {
  const [showCard, setShowCard] = useState(false);
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const initialLoadRef = useRef(true);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    if (imageLoaded && !hasLoadedOnce) {
      // Mark as loaded once
      setHasLoadedOnce(true);

      // If this is the first render and image loaded instantly (cached),
      // skip the skeleton animation entirely
      if (initialLoadRef.current) {
        initialLoadRef.current = false;
        setShowCard(true);
        setHideSkeleton(true);
        return;
      }

      // Otherwise do the normal fade animation
      // First fade out skeleton
      setHideSkeleton(true);
      // Then after skeleton fades, show card
      loadTimeoutRef.current = setTimeout(
        () => setShowCard(true),
        fadeOutDuration,
      );

      return () => {
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current);
        }
      };
    }
  }, [imageLoaded, fadeOutDuration, hasLoadedOnce]);

  // After initial render, mark that we're no longer in initial state
  useEffect(() => {
    if (isInViewport) {
      const timer = setTimeout(() => {
        initialLoadRef.current = false;
      }, INITIAL_VIEWPORT_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [isInViewport]);

  // Only show skeleton if we haven't loaded yet AND we're in viewport
  const _showContent = isLoaded;
  const showSkeleton = !isLoaded;
  const skeletonOpacity = showSkeleton && !hideSkeleton ? 1 : 0;
  const cardOpacity = hasLoadedOnce || showCard ? 1 : 0;

  return {
    showSkeleton,
    showCard,
    skeletonOpacity,
    cardOpacity,
  };
};
