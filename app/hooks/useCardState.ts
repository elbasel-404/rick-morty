
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useInViewport } from "@hooks";

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
  skeletonFadeOutDuration = 800,
  viewportThreshold = 0.1,
  viewportRootMargin = "400px",
}: UseCardStateProps) => {
  const [imageLoaded, setImageLoaded] = useState(hasLoadedOnce);
  const [showCard, setShowCard] = useState(false);
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const initialLoadRef = useRef(true);
  const loadTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const skeletonDelayTimeoutRef = useRef<NodeJS.Timeout | undefined>(
    undefined
  );
  const skeletonStartTimeRef = useRef<number | null>(null);
  const { elementRef, isInViewport } = useInViewport({
    threshold: viewportThreshold,
    rootMargin: viewportRootMargin,
  });



  const handleImageLoad = useCallback(
    (loaded: boolean, isCached: boolean) => {
      if (!loaded) {
        return;
      }

      onLoad();
      setImageLoaded(true);

      if (isCached && initialLoadRef.current) {
        initialLoadRef.current = false;
        setInitialLoadComplete(true);
        setShowCard(true);
        setHideSkeleton(true);
        return;
      }

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
    },
    [
      hasLoadedOnce,
      onLoad,
      minSkeletonVisibility,
      skeletonFadeOutDuration,
    ]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      initialLoadRef.current = false;
      setInitialLoadComplete(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
    !hasLoadedOnce &&
    !imageLoaded &&
    isInViewport &&
    initialLoadComplete;

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
