"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@util";

interface SlideInModalProps {
  children: ReactNode;
  title?: string;
}

const MODAL_ANIMATION_MS = 250;

export const SlideInModal = ({ children, title }: SlideInModalProps) => {
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

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const dismiss = useCallback(() => {
    const animationDuration = prefersReducedMotion ? 0 : MODAL_ANIMATION_MS;
    setIsVisible(false);

    window.setTimeout(() => {
      router.back();
    }, animationDuration);
  }, [prefersReducedMotion, router]);

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
        "fixed inset-0 z-50 flex justify-end bg-slate-950/75 backdrop-blur-sm transition-opacity duration-200",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      onClick={dismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Modal"}
        className={cn(
          "relative flex h-full w-full max-w-2xl flex-col overflow-hidden border border-slate-800/70 bg-slate-950 text-slate-100 shadow-2xl",
          prefersReducedMotion
            ? ""
            : "transition-transform duration-300 ease-out",
          isVisible ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-6 py-4">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full border border-slate-700/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-300 hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          >
            Close
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
};
