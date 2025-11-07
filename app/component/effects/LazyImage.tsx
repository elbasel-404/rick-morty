"use client";

import { type ImgHTMLAttributes, useEffect, useRef, useState } from "react";

interface LazyImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "onLoad"> {
  /** Image source URL */
  src: string;
  /** Alt text */
  alt: string;
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
  isInViewport,
  onLoad,
  mode = "preload",
  className = "",
  ...imgProps
}: LazyImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isInViewport && imgRef.current && !isLoaded) {
      const img = imgRef.current;

      // Check if image is already cached
      if (img.complete && img.naturalHeight !== 0) {
        setIsLoaded(true);
        onLoad?.(true, true); // loaded, cached
        return;
      }

      // Handle load event
      const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.(true, false); // loaded, not cached
      };

      img.addEventListener("load", handleLoad);
      return () => img.removeEventListener("load", handleLoad);
    }
  }, [isInViewport, isLoaded, onLoad]);

  // Don't render anything if not in viewport
  if (!isInViewport) return null;

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={mode === "preload" ? "hidden" : className}
      aria-hidden={mode === "preload" ? "true" : undefined}
      {...imgProps}
    />
  );
};
