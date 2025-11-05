import Image from "next/image";
import { cn } from "@util";

interface CardImageProps {
  src: string;
  alt: string;
  isInViewport: boolean;
  imageLoaded: boolean;
  onLoad: () => void;
}

export const CardImage = ({
  src,
  alt,
  isInViewport,
  imageLoaded,
  onLoad,
}: CardImageProps) => {
  if (!isInViewport) {
    return <div className="w-full h-full bg-slate-800" />;
  }

  return (
    <Image
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
