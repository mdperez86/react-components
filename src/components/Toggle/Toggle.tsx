import { type Ref, forwardRef } from "react";
import classNames from "classnames";
import { type ToggleProps } from "./types";

export const Toggle = forwardRef(function ForwardedToggle(
  { className, ...props }: ToggleProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <div className={classNames(className, "group w-fit h-fit relative flex")}>
      <input
        {...props}
        type="checkbox"
        ref={ref}
        className={classNames(
          "peer cursor-pointer disabled:cursor-not-allowed",
          "outline-none appearance-none",
          "absolute z-[1] top-0 right-0 bottom-0 left-0",
        )}
      />
      <div
        role="presentation"
        className={classNames(
          "relative z-0 w-9 h-5",
          "rounded-full",
          "flex items-center p-0.5",
          "transition-colors",
          "bg-gray-100",
          "peer-checked:bg-primary-600",
          "peer-hover:bg-gray-200 peer-hover:peer-checked:bg-primary-600",
          "peer-focus:bg-gray-50 peer-focus:peer-checked:bg-primary-600 peer-focus:ring-4 peer-focus:ring-primary-100",
          "peer-disabled:bg-gray-100 peer-disabled:peer-checked:bg-gray-100",
        )}
      >
        <div
          className={classNames(
            "w-4 aspect-square rounded-full",
            "bg-white shadow-sm",
            "transition-transform transform-gpu",
            "translate-x-0 group-has-[:checked]:translate-x-full",
            "group-has-[:disabled]:bg-gray-50",
          )}
        />
      </div>
    </div>
  );
});
