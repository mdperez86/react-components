import { type Ref, forwardRef } from "react";
import clsx from "clsx";
import { type RadioButtonProps } from "./types";

export const RadioButton = forwardRef(function ForwardedRadioButton(
  { className, ...props }: RadioButtonProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <div className={clsx(className, "group relative flex")}>
      <input
        {...props}
        type="radio"
        ref={ref}
        className={clsx(
          "peer cursor-pointer disabled:cursor-not-allowed",
          "outline-none appearance-none",
          "absolute z-[1] top-0 right-0 bottom-0 left-0",
        )}
      />
      <div
        role="presentation"
        className={clsx(
          "relative z-0 w-5 aspect-square",
          "rounded-full shadow-xs",
          "flex items-center justify-center",
          "bg-white border border-gray-300",
          "peer-hover:border-primary-600 peer-hover:bg-primary-50",
          "peer-focus:border-primary-300 peer-focus:peer-hover:border-primary-600 peer-focus:ring-4 peer-focus:ring-primary-100",
          "peer-checked:border-primary-600 peer-focus:peer-checked:border-primary-600",
          "peer-disabled:border-gray-200 peer-disabled:bg-gray-100",
        )}
      >
        <div
          className={clsx(
            "hidden group-has-[>:checked]:block",
            "w-2 aspect-square",
            "rounded-full bg-primary-600",
            "group-has-[>:disabled]:bg-gray-200",
          )}
        />
      </div>
    </div>
  );
});
