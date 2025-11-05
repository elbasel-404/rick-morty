import { useState } from "react";

export const useImageLoad = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return { imageLoaded, handleImageLoad };
};
