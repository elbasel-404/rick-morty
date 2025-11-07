export const extractNextPage = (nextUrl: string | null): number | null => {
  if (!nextUrl) return null;

  try {
    const parsedUrl = new URL(nextUrl);
    const pageParam = parsedUrl.searchParams.get("page");
    if (!pageParam) return null;

    const nextPage = Number(pageParam);
    return Number.isNaN(nextPage) ? null : nextPage;
  } catch (error) {
    console.error("Failed to parse next page from url", nextUrl, error);
    return null;
  }
};
