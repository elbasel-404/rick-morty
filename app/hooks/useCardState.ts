"use client";

import { useInViewport } from "@hooks";
import { useEffect, useRef, useState } from "react";

interface UseCardStateProps {
  hasLoadedOnce: boolean;
  onLoad: () => void;
  minSkeletonVisibility?: number;
  skeletonFadeOutDuration?: number;
  viewportThreshold?: number;
  viewportRootMargin?: string;
}

export const useCardState = ({
  hasLoadedOnce,

  onLoad,

  minSkeletonVisibility = 1000,

  viewportThreshold = 0.1,

  viewportRootMargin = "400px",
}: UseCardStateProps) => {
  const [hasBeenInViewport, setHasBeenInViewport] = useState(false);

  const [imageLoaded, setImageLoaded] = useState(hasLoadedOnce);

  const [showCard, setShowCard] = useState(false);

  const [hideSkeleton, setHideSkeleton] = useState(false);

  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const skeletonDelayTimeoutRef = useRef<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);

  const skeletonStartTimeRef = useRef<number | null>(null);

  const { elementRef, isInViewport } = useInViewport({
    threshold: viewportThreshold,

    rootMargin: viewportRootMargin,
  });

  useEffect(() => {
    if (isInViewport && !hasBeenInViewport) {
      setHasBeenInViewport(true);
    }
  }, [isInViewport, hasBeenInViewport]);

  const handleImageLoad = (loaded: boolean, isCached: boolean) => {
    if (!loaded) {
      return;
    }

    onLoad();

    setImageLoaded(true);

    if (isCached) {
      setShowCard(true);

      setHideSkeleton(true);

      return;
    }

    const skeletonVisibleTime =
      Date.now() - (skeletonStartTimeRef.current || Date.now());

    const remainingTime = Math.max(
      0,
      minSkeletonVisibility - skeletonVisibleTime,
    );

    // Clear any existing timeouts to prevent multiple calls

    if (skeletonDelayTimeoutRef.current) {
      clearTimeout(skeletonDelayTimeoutRef.current);
    }

    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }

    skeletonDelayTimeoutRef.current = setTimeout(() => {
      setHideSkeleton(true);

      setShowCard(true);
    }, remainingTime);
  };

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
    !hasLoadedOnce && !imageLoaded && hasBeenInViewport;

  return {
    elementRef,

    showCard,

    hideSkeleton,

    shouldShowSkeleton,

    isInViewport,

    handleImageLoad,

    imageLoaded,
  };
};
