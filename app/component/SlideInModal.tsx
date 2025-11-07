"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { cn } from "@util";

interface SlideInModalProps {
  children: ReactNode;
  title?: string;
  returnHref?: string;
}

const MODAL_ANIMATION_MS = 250;

export const SlideInModal = ({
  children,
  title,
  returnHref,
}: SlideInModalProps) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [prefersReducedMotion]);

  const previousOverflow = useRef<string | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (isVisible) {
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previousOverflow.current ?? "";
        previousOverflow.current = null;
      };
    }

    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    } else {
      document.body.style.overflow = "";
    }
  }, [isVisible]);

  const dismiss = useCallback(() => {
    const animationDuration = prefersReducedMotion ? 0 : MODAL_ANIMATION_MS;
    setIsVisible(false);

    window.setTimeout(() => {
      if (returnHref) {
        router.replace(returnHref, { scroll: false });
        return;
      }

      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back();
        return;
      }

      router.replace("/cards/1", { scroll: false });
    }, animationDuration);
  }, [prefersReducedMotion, returnHref, router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dismiss]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm transition-opacity duration-200",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      onClick={dismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Modal"}
        className={cn(
          "relative flex h-full w-full max-w-xs sm:max-w-sm flex-col overflow-hidden border border-slate-800/70 bg-white/5 text-slate-100 shadow-2xl",
          prefersReducedMotion
            ? ""
            : "transition-transform duration-300 ease-out",
          isVisible ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex-1 overflow-y-auto pb-3">{children}</div>
      </div>
    </div>
  );
};
