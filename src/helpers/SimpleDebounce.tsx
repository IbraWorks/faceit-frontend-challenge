export const simpleDebounce = (fn: (...args: any) => void, delay: number) => {
  let timeout: number;
  return function(...args: any) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
