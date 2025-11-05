import { useState, useCallback } from "react";

export const useImageLoad = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const checkIfImageCached = useCallback((imgElement: HTMLImageElement) => {
    // Check if image is already loaded from cache
    if (imgElement.complete && imgElement.naturalHeight !== 0) {
      setImageLoaded(true);
      return true;
    }
    return false;
  }, []);

  return { imageLoaded, handleImageLoad, checkIfImageCached };
};
