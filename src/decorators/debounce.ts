export function debounce(timeoutMs: number) {
  return (proto, method, descriptor) => {
    let debouncer ;
    const origin = proto[method];
    descriptor.value = function () {
      if (debouncer) {
        clearTimeout(debouncer);
      }
      debouncer = setTimeout(origin.bind(this), timeoutMs);
    };
  };
}
