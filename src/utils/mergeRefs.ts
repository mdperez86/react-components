import type { ForwardedRef } from "react";

export function mergeRefs<T>(...refs: Array<ForwardedRef<T>>) {
  return function setRefs(element: T) {
    refs.forEach(setRef);

    function setRef(ref: ForwardedRef<T>): void {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(element);
      } else {
        ref.current = element;
      }
    }
  };
}
