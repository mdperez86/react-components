import { type Ref, forwardRef, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { type ColorFieldProps } from "./types";
import { mergeRefs } from "@this/utils";
import { Tooltip } from "../Tooltip";

export const ColorField = forwardRef(function ForwardedColorField(
  { className, ...props }: ColorFieldProps,
  ref: Ref<HTMLInputElement>,
) {
  const controlRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState<string | undefined>("#000000");

  useEffect(addEventListener, []);

  return (
    <Tooltip
      renderTrigger={(attrs) => (
        <div
          {...attrs}
          className={classNames(className, "group w-fit h-fit relative flex")}
        >
          <input
            {...props}
            type="color"
            ref={mergeRefs(ref, controlRef)}
            className={classNames(
              "peer cursor-pointer disabled:cursor-not-allowed",
              "outline-none appearance-none opacity-0",
              "absolute z-[1] top-0 right-0 w-full h-full",
            )}
          />

          <div
            role="presentation"
            className={classNames(
              "relative z-0 w-11 aspect-square p-2",
              "rounded-md shadow-xs",
              "flex items-center justify-center",
              "bg-white border border-gray-300",
              "peer-hover:border-primary-600 peer-hover:bg-primary-50",
              "peer-focus:border-primary-300 peer-focus:peer-hover:border-primary-600 peer-focus:ring-4 peer-focus:ring-primary-100",
              "peer-checked:border-primary-600 peer-checked:peer-focus:border-primary-600",
              "peer-indeterminate:border-primary-600 peer-focus:peer-indeterminate:border-primary-600",
              "peer-disabled:border-gray-200 peer-disabled:bg-gray-100",
              "peer-invalid:border-error-300",
              "peer-invalid:peer-focus:border-error-300 peer-invalid:peer-focus:ring-error-100",
            )}
          >
            <div
              className="w-full h-full rounded border border-gray-300"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
      )}
    >
      {color}
    </Tooltip>
  );

  function addEventListener(): undefined | (() => void) {
    const control = controlRef.current;

    if (!control) return;

    control.addEventListener("change", onChange);

    return function unsubscribe() {
      control.removeEventListener("change", onChange);
    };

    function onChange(event: Event): void {
      const element = event.target as HTMLInputElement;
      if (element?.value) {
        setColor(element.value);
      } else {
        setColor(undefined);
      }
    }
  }
});
