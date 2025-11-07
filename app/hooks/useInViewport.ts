"use client";
import { useEffect, useState, useRef } from "react";

interface UseInViewportOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useInViewport = (options: UseInViewportOptions = {}) => {
  const [isInViewport, setIsInViewport] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? "200px", // Preload when 200px away
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return { elementRef, isInViewport };
};
