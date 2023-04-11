export interface CancelablePromise<T> extends Promise<T> {
  // timeout: NodeJS.Timeout;
  cancel: () => void;
}

export function delay(timeoutMs: number) {
  return function <T>(target, key, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args) {
      let timeoutId = null;
      let _resolve, _reject;
      const promise = <CancelablePromise<T>>new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;

        // Set up a timeout to execute the original method
        timeoutId = setTimeout(async () => {
          try {
            const result = await originalMethod.apply(this, args);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, timeoutMs);
      });

      // Attach the timeout ID to the returned promise
      // promise.timeout = timeoutId;
      promise.cancel = function () {
        clearTimeout(timeoutId);
        timeoutId = undefined;
        _reject?.();
      };

      return promise;
    };

    return descriptor;
  };
}

export const timeout = delay;
