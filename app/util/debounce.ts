export type DebounceOptions = {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
};

export type DebouncedFunction<T extends (...args: any[]) => any> = ((
  ...args: Parameters<T>
) => ReturnType<T> | undefined) & {
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
  isPending: () => boolean;
};

const now = () => Date.now();

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait = 0,
  options: DebounceOptions = {},
): DebouncedFunction<T> => {
  const waitDuration = Math.max(0, wait);
  let timerId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | undefined;
  let lastThis: ThisParameterType<T> | undefined;
  let lastCallTime: number | undefined;
  let lastInvokeTime = 0;
  let result: ReturnType<T> | undefined;

  const leading = Boolean(options.leading);
  const trailing = options.trailing ?? true;
  const maxWait = options.maxWait;
  const useMaxWait = typeof maxWait === "number";

  const startTimer = (pendingWait: number) => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(timerExpired, Math.max(0, pendingWait));
  };

  const invokeFunc = (time: number) => {
    lastInvokeTime = time;
    const args = lastArgs as Parameters<T>;
    const thisArg = lastThis as ThisParameterType<T>;

    lastArgs = lastThis = undefined;
    result = func.apply(thisArg, args) as ReturnType<T>;
    return result;
  };

  const shouldInvoke = (time: number) => {
    if (lastCallTime === undefined) {
      return true;
    }

    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    if (timeSinceLastCall >= waitDuration) {
      return true;
    }

    if (timeSinceLastCall < 0) {
      return true;
    }

    if (useMaxWait && timeSinceLastInvoke >= (maxWait as number)) {
      return true;
    }

    return false;
  };

  const remainingWait = (time: number) => {
    if (lastCallTime === undefined) {
      return waitDuration;
    }

    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = waitDuration - timeSinceLastCall;

    const computed = useMaxWait
      ? Math.min(timeWaiting, (maxWait as number) - timeSinceLastInvoke)
      : timeWaiting;

    return Math.max(computed, 0);
  };

  const leadingEdge = (time: number) => {
    lastInvokeTime = time;
    startTimer(waitDuration);
    return leading ? invokeFunc(time) : result;
  };

  const trailingEdge = (time: number) => {
    timerId = null;
    lastCallTime = undefined;

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  };

  const timerExpired = () => {
    const time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    const pendingWait = remainingWait(time);
    startTimer(pendingWait);
    return undefined;
  };

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    const time = now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === null) {
        return leadingEdge(time);
      }

      if (useMaxWait) {
        startTimer(waitDuration);
        return invokeFunc(time);
      }
    }

    if (timerId === null) {
      startTimer(waitDuration);
    }

    return result;
  } as DebouncedFunction<T>;

  debounced.cancel = () => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = null;
    lastArgs = lastThis = undefined;
    lastCallTime = undefined;
    lastInvokeTime = 0;
  };

  debounced.flush = () => {
    return timerId === null ? result : trailingEdge(now());
  };

  debounced.isPending = () => timerId !== null;

  return debounced;
};
