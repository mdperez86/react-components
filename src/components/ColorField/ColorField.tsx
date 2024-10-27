import {
  type ChangeEvent,
  type FocusEvent,
  type ForwardedRef,
  forwardRef,
  useState,
} from "react";
import clsx from "clsx";
import { Tooltip } from "../Tooltip";
import type { ColorFieldProps } from "./types";

export const ColorField = forwardRef(function ForwardedColorField(
  { className, onChange, onBlur, ...props }: ColorFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [internalValue, setInternalValue] = useState<string | undefined>(
    props.defaultValue as string,
  );
  const isControlled = props.value !== undefined;
  const displayColor = getDisplayColor();

  return (
    <Tooltip
      renderTrigger={(attrs) => (
        <div {...attrs} className={clsx(className, "group relative")}>
          <input
            {...props}
            ref={ref}
            type="color"
            className={clsx(
              "peer cursor-pointer disabled:cursor-not-allowed",
              "outline-none appearance-none opacity-0",
              "absolute z-[1] top-0 right-0 w-full h-full",
            )}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <div
            role="presentation"
            className={clsx(
              "relative z-0 min-w-11 min-h-11 w-full h-full p-2",
              "rounded-md shadow-xs",
              "flex items-stretch justify-stretch",
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
              className="flex-grow rounded border border-gray-300"
              style={{ backgroundColor: displayColor }}
            />
          </div>
        </div>
      )}
    >
      {displayColor}
    </Tooltip>
  );

  function getDisplayColor(): string {
    if (props.value) {
      return props.value as string;
    }

    if (internalValue) {
      return internalValue;
    }

    return "#000000";
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (!isControlled) {
      setInternalValue(event.currentTarget.value);
    }

    onChange?.(event);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>): void {
    event.currentTarget.checkValidity();
    onBlur?.(event);
  }
});
