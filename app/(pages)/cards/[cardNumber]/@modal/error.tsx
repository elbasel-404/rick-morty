"use client";

import { useEffect } from "react";

type ModalErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ModalErrorBoundary = ({ error, reset }: ModalErrorBoundaryProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-slate-900 p-6 text-center text-white">
      <h3 className="text-lg font-semibold">Unable to open character</h3>
      <p className="text-sm text-slate-300">
        We couldn&apos;t load this character preview. Please try again.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
      >
        Try again
      </button>
    </div>
  );
};

export default ModalErrorBoundary;
