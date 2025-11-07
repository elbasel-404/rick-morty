import { useCardState } from "@hooks";
import { cn } from "@util";
import type { ReactNode } from "react";
import { FadeIn } from "../effects/FadeIn";
import { FadeOut } from "../effects/FadeOut";
import { LazyImage } from "../effects/LazyImage";
import { SkeletonLoader } from "../SkeletonLoader";

interface CardContainerProps {
  imageUrl: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  hasLoadedOnce: boolean;
  onLoad: () => void;
  skeletonVariant?: "card-i" | "card-ii" | "default";
  skeletonClassName?: string;
  className?: string;
  minSkeletonVisibility?: number;
  skeletonFadeOutDuration?: number;
  cardFadeInDuration?: number;
  cardFadeInDelay?: number;
  viewportThreshold?: number;
  viewportRootMargin?: string;
  children: (props: { isVisible: boolean; imageLoaded: boolean }) => ReactNode;
}

export const CardContainer = ({
  imageUrl,
  imageAlt,
  imageWidth,
  imageHeight,
  hasLoadedOnce,
  onLoad,
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
  const {
    elementRef,
    imageLoaded,
    showCard,
    hideSkeleton,
    shouldShowSkeleton,
    isInViewport,
    handleImageLoad,
  } = useCardState({
    hasLoadedOnce,
    onLoad,
    minSkeletonVisibility,
    skeletonFadeOutDuration,
    viewportThreshold,
    viewportRootMargin,
  });

  return (
    <div ref={elementRef} className={cn("relative min-h-[448px]", className)}>
      <LazyImage
        src={imageUrl}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        isInViewport={isInViewport}
        onLoad={handleImageLoad}
        mode="preload"
      />

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

      <FadeIn
        isVisible={hasLoadedOnce || showCard}
        duration={cardFadeInDuration}
        delay={cardFadeInDelay}
      >
        {children({ isVisible: hasLoadedOnce || showCard, imageLoaded })}
      </FadeIn>
    </div>
  );
};
