import { type Ref, forwardRef, useRef, useEffect } from "react";
import clsx from "clsx";
import { CheckIcon, MinusIcon } from "@this/icons";
import { mergeRefs } from "@this/utils";
import { type CheckBoxProps } from "./types";

export const CheckBox = forwardRef(function ForwardedCheckBox(
  { className, indeterminate, ...props }: CheckBoxProps,
  ref: Ref<HTMLInputElement>,
) {
  const controlRef = useRef<HTMLInputElement>(null);

  useEffect(setIndeterminate, [indeterminate]);

  return (
    <div className={clsx(className, "group w-fit h-fit relative flex")}>
      <input
        {...props}
        type="checkbox"
        ref={mergeRefs(ref, controlRef)}
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
          "rounded-md shadow-xs",
          "flex items-center justify-center",
          "bg-white border border-gray-300",
          "peer-hover:border-primary-600 peer-hover:bg-primary-50",
          "peer-focus:border-primary-300 peer-focus:peer-hover:border-primary-600 peer-focus:ring-4 peer-focus:ring-primary-100",
          "peer-checked:border-primary-600 peer-checked:peer-focus:border-primary-600",
          "peer-indeterminate:border-primary-600 peer-focus:peer-indeterminate:border-primary-600",
          "peer-disabled:border-gray-200 peer-disabled:bg-gray-100",
        )}
      >
        <CheckIcon
          className={clsx(
            "hidden group-has-[:checked]:block",
            "w-3.5 aspect-square",
            "text-primary-600",
            "group-has-[:disabled]:text-gray-200",
          )}
        />

        <MinusIcon
          className={clsx(
            "hidden group-has-[:indeterminate]:block",
            "w-3.5 aspect-square",
            "text-primary-600",
            "group-has-[:disabled]:text-gray-200",
          )}
        />
      </div>
    </div>
  );

  function setIndeterminate(): void {
    if (controlRef.current) {
      controlRef.current.indeterminate = Boolean(indeterminate);
    }
  }
});
