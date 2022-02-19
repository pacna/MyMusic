export const isEmpty = (value: string | any[]) => {
  return value?.length === 0;
};

export const debounce = (
  func: Function,
  timeoutInMs: number = 300
): ((...args: any[]) => void) => {
  let timer;
  return (...args: any[]): void => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeoutInMs);
  };
};
