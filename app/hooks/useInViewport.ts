"use client";
import { useEffect, useRef, useState } from "react";

interface UseInViewportOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useInViewport = (_options: UseInViewportOptions = {}) => {
  const [isInViewport, setIsInViewport] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.25 },
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return { elementRef, isInViewport };
};
