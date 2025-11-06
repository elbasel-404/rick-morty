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
  if (!isInViewport) {
    return <div className="w-full h-full bg-slate-800" />;
  }

  return (
    <NextImage
      width={300}
      height={300}
      src={src}
      alt={alt}
      className={cn(
        "w-full h-full object-cover transition-all duration-700",
        imageLoaded ? "blur-0 scale-100" : "blur-2xl scale-110"
      )}
      loading="lazy"
      unoptimized
      onLoad={onLoad}
    />
  );
};
