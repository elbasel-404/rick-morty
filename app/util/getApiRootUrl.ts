"server-only";

const FALLBACK_URL = "https://rickandmortyapi.com/api";

export const getApiRootUrl = () => {
  const apiRootUrl =
    process.env.API_ROOT_URL ??
    process.env.NEXT_API_ROOT_URL ??
    process.env.NEXT_PUBLIC_API_ROOT_URL;

  if (!apiRootUrl) {
    console.warn(
      `API root URL env vars are missing. Falling back to '${FALLBACK_URL}'.`
    );
    return FALLBACK_URL;
  }

  return apiRootUrl;
};
