const cache = new Map<string, Promise<any>>();

export const deduplicate = <T>(
  key: string,
  fn: () => Promise<T>,
  ttl = 5000
): Promise<T> => {
  const cached = cache.get(key) as Promise<T> | undefined;
  if (cached) return cached;

  const promise = fn().finally(() => {
    setTimeout(() => cache.delete(key), ttl);
  }) as Promise<T>;

  cache.set(key, promise);
  return promise;
};

export const clearRequestCache = () => cache.clear();
