export function lock(target, key, descriptor) {
  const originalMethod = descriptor.value;
  let currentPromise = null;

  descriptor.value = function (...args) {
    if (!currentPromise) {
      // If there is no current promise, create one and execute the original method
      currentPromise = (async () => {
        try {
          const result = await originalMethod.apply(this, args);
          return result;
        } finally {
          currentPromise = null; // Set currentPromise to null when the method is resolved
        }
      })();
    }

    return currentPromise; // Return the current promise instead of the previous result
  };

  return descriptor;
}
