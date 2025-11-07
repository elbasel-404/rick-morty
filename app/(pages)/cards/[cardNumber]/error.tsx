"use client";

import { useEffect } from "react";

type CardPageErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const CardPageError = ({ error, reset }: CardPageErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 py-12 text-white">
      <div className="w-full max-w-md space-y-4 text-center">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-sm text-slate-300">
          There was a problem loading this card view. You can try again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default CardPageError;
