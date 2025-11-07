"use client";

import Image from "next/image";
import { useRef, useEffect, useState, ImgHTMLAttributes } from "react";

interface LazyImageProps
  extends Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    "onLoad" | "width" | "height"
  > {
  /** Image source URL */
  src: string;
  /** Alt text */
  alt: string;
  /** Image width */
  width: number;
  /** Image height */
  height: number;
  /** Whether the image is in viewport (triggers loading) */
  isInViewport: boolean;
  /** Callback when image loads */
  onLoad?: (loaded: boolean, isCached: boolean) => void;
  /** Whether to show image inline or just preload */
  mode?: "inline" | "preload";
  /** Additional className */
  className?: string;
}

export const LazyImage = ({
  src,
  alt,
  width,
  height,
  isInViewport,
  onLoad,
  mode = "preload",
  className = "",
  ...imgProps
}: LazyImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isInViewport || isLoaded) {
      return;
    }

    let currentImage: HTMLImageElement | null = null;

    if (mode === "preload") {
      currentImage = new window.Image();
      currentImage.src = src;
    } else if (imgRef.current) {
      currentImage = imgRef.current;
    }

    if (currentImage) {
      // Check if image is already cached
      if (currentImage.complete && currentImage.naturalHeight !== 0) {
        setIsLoaded(true);
        onLoad?.(true, true); // loaded, cached
        return;
      }

      // Handle load event
      const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.(true, false); // loaded, not cached
      };

      currentImage.addEventListener("load", handleLoad);
      return () => currentImage?.removeEventListener("load", handleLoad);
    }
  }, [isInViewport, isLoaded, onLoad, src, mode]);

  // Don't render anything if not in viewport and not in inline mode
  if (!isInViewport && mode !== "inline") return null;

  if (mode === "preload") {
    return null; // Don't render anything, just preload
  }

  return (
    <Image
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      {...imgProps}
    />
  );
};
