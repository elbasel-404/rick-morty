import NextImage from "next/image";
import { cn } from "@util";

interface ImageProps {
  src: string;
  alt: string;
  isInViewport: boolean;
  imageLoaded: boolean;
  onLoad: () => void;
}

export const Image = ({
  src,
  alt,
  isInViewport,
  imageLoaded,
  onLoad,
}: ImageProps) => {
  return (
    <NextImage
      width={300}
      height={300}
      src={src}
      alt={alt}
      className={cn(
        "w-full h-full object-cover transition-all duration-700",
        imageLoaded
          ? "opacity-100 blur-0 scale-100"
          : "opacity-0 blur-2xl scale-110"
      )}
      loading="lazy"
      unoptimized
      onLoad={onLoad}
      style={{ background: "#1e293b" }}
    />
  );
};
