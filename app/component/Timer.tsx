"use client";

import { cn } from "@util";

interface TimerProps {
  formattedSecondsLeft: string;
  isAutoRefreshPaused: boolean;
  toggleAutoRefresh: () => void;
  handleManualRefresh: () => void;
  isFetching: boolean;
}

export const Timer = ({
  formattedSecondsLeft,
  isAutoRefreshPaused,
  toggleAutoRefresh,
}: TimerProps) => {
  return (
    <div className="fixed right-6 top-6 z-50 flex flex-col items-center gap-3">
      <div className="group relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-slate-500 transition-all duration-200 group-hover:border-blue-400" />
        <div
          aria-live="polite"
          className={cn(
            "pointer-events-none relative z-10 flex items-center font-mono text-slate-100 transition-opacity duration-200",
            isAutoRefreshPaused
              ? "opacity-0"
              : "opacity-100 group-hover:opacity-0",
          )}
        >
          <span className="text-3xl font-bold leading-none">
            {formattedSecondsLeft}
          </span>
        </div>
        <button
          type="button"
          onClick={toggleAutoRefresh}
          aria-label={
            isAutoRefreshPaused ? "Resume auto refresh" : "Pause auto refresh"
          }
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-full text-slate-50 transition-opacity duration-200 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
            isAutoRefreshPaused
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100",
            isAutoRefreshPaused ? "bg-emerald-500/90" : "bg-blue-500/90",
          )}
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>Play icon</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 5v14l11-7z"
            />
          </svg>
          ) : (
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>Pause icon</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 5h-1a1 1 0 00-1 1v12a1 1 0 001 1h1a1 1 0 001-1V6a1 1 0 00-1-1zm6 0h-1a1 1 0 00-1 1v12a1 1 0 001 1h1a1 1 0 001-1V6a1 1 0 00-1-1z"
            />
          </svg>
          )
        </button>
      </div>
    </div>
  );
};
