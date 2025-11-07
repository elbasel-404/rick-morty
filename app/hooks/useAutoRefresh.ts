"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseAutoRefreshOptions {
  intervalMs: number;
  onRefresh: () => void | Promise<void>;
  enabled?: boolean;
}

interface UseAutoRefreshReturn {
  timeLeftMs: number;
  isPaused: boolean;
  isRefreshing: boolean;
  togglePause: () => void;
  refresh: () => Promise<void>;
  reset: () => void;
}

export const useAutoRefresh = ({
  intervalMs,
  onRefresh,
  enabled = true,
}: UseAutoRefreshOptions): UseAutoRefreshReturn => {
  const [timeLeftMs, setTimeLeftMs] = useState(intervalMs);
  const [isPaused, setIsPaused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const intervalIdRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(Date.now());
  const accumulatedTimeRef = useRef<number>(0);

  // Manual refresh function
  const refresh = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      await onRefresh();
      setTimeLeftMs(intervalMs);
      accumulatedTimeRef.current = 0;
      lastTickRef.current = Date.now();
    } finally {
      setIsRefreshing(false);
    }
  }, [intervalMs, onRefresh, isRefreshing]);

  // Toggle pause state
  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Reset timer
  const reset = useCallback(() => {
    setTimeLeftMs(intervalMs);
    accumulatedTimeRef.current = 0;
    lastTickRef.current = Date.now();
  }, [intervalMs]);

  // Main timer effect
  useEffect(() => {
    if (!enabled || isPaused || isRefreshing) {
      // Clean up interval if exists
      if (intervalIdRef.current) {
        window.clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      return;
    }

    // Use more accurate timing with accumulated delta
    intervalIdRef.current = window.setInterval(() => {
      const now = Date.now();
      const deltaMs = now - lastTickRef.current;
      lastTickRef.current = now;

      accumulatedTimeRef.current += deltaMs;

      // Only update state if we've accumulated at least 100ms
      // This reduces unnecessary re-renders
      if (accumulatedTimeRef.current >= 100) {
        setTimeLeftMs((prev) => {
          const newTime = prev - accumulatedTimeRef.current;
          accumulatedTimeRef.current = 0;

          if (newTime <= 0) {
            // Trigger refresh on next tick
            void refresh();
            return intervalMs;
          }

          return newTime;
        });
      }
    }, 100); // Check every 100ms for smoother countdown

    return () => {
      if (intervalIdRef.current) {
        window.clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [enabled, isPaused, isRefreshing, refresh, intervalMs]);

  // Reset accumulated time when pausing
  useEffect(() => {
    if (isPaused) {
      accumulatedTimeRef.current = 0;
      lastTickRef.current = Date.now();
    }
  }, [isPaused]);

  return {
    timeLeftMs: Math.max(0, timeLeftMs),
    isPaused,
    isRefreshing,
    togglePause,
    refresh,
    reset,
  };
};
