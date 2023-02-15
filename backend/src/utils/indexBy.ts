export const indexBy = <T, K extends string>(
  getKey: (item: T) => K,
  items: T[],
): Record<K, T> => {
  return items.reduce((result, item) => {
    const key = getKey(item);
    return {
      ...result,
      [key]: item,
    };
  }, <Record<K, T>>{});
};
