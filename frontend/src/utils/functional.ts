export const indexBy = <T>(getKey: (element: T) => string, elements: T[]) => {
  const result: { [key: string]: T } = {};
  for (let element of elements) {
    const key = getKey(element);
    result[key] = element;
  }
  return result;
};

export const groupBy = <T>(getKey: (element: T) => string, elements: T[]) => {
  const result: { [key: string]: T[] } = {};
  for (let element of elements) {
    const key = getKey(element);
    result[key] = (result[key] ?? []).concat(element);
  }
  return result;
};

export const mapValues = <S, T>(
  mapper: (value: T, key: string) => S,
  object: Record<string, T>
) => {
  const result: { [key: string]: S } = {};
  for (let key in object) {
    const value = object[key];
    result[key] = mapper(value, key);
  }
  return result;
};
