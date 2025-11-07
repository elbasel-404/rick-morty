"use client";

import { cn } from "@util";
import { useRouter } from "next/navigation";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Modal"}
      tabIndex={-1}
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden border border-slate-800/70 bg-white/5 text-slate-100 shadow-2xl",
        prefersReducedMotion
          ? ""
          : "transition-transform duration-300 ease-out",
        isVisible ? "translate-x-0" : "translate-x-full",
      )}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Close modal"
        className={cn(
          "mr-8 mt-1 absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-sm transition",
          "hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400",
        )}
      >
        <span className="sr-only">Close modal</span>
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1l12 12M13 1 1 13"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="flex h-full flex-1 overflow-hidden">{children}</div>
    </div>
  );
};
