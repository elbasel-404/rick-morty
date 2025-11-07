"server-only";

export const getApiRootUrl = () => {
  const apiRootUrl = process.env.API_ROOT_URL;
  if (!apiRootUrl) {
    console.error(
      "API_ROOT_URL is not defined in environment variables, falling back to 'https://rickandmortyapi.com/api'",
    );
    return "https://rickandmortyapi.com/api";
  }
  return apiRootUrl;
};
