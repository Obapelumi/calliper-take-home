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

export const nextYear = () => {
  const date = new Date();
  date.setFullYear(new Date().getFullYear() + 1);
  return date;
};

export const lastMonth = () => {
  const date = new Date();
  date.setMonth(new Date().getMonth() - 1);
  return date;
};
