import { type Ref, forwardRef } from "react";
import classNames from "classnames";
import { AlertCircle, HelpCircle } from "@this/icons";
import { type InputFieldProps } from "./types";

export const InputField = forwardRef(function ForwardedInputField(
  {
    leadingIcon,
    helpIcon = false,
    className,
    onClick,
    ...props
  }: InputFieldProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <div
      className={classNames(
        className,
        "group flex gap-2 min-w-48 justify-stretch",
        "bg-white text-gray-900 border border-gray-300 placeholder:text-gray-500",
        "shadow-sm rounded-lg py-2.5 px-3.5 text-base h-11 outline-none",
        "focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-100",
        "has-[:disabled]:bg-gray-50 has-[:disabled]:text-gray-500 has-[:disabled]:cursor-not-allowed",
        "has-[:invalid]:border-error-300",
        "has-[:invalid]:focus-within:border-error-300 has-[:invalid]:focus-within:ring-error-100",
      )}
    >
      {leadingIcon !== undefined && (
        <div className="flex shrink-0 items-center justify-center h-5 min-w-5 text-gray-500">
          {leadingIcon}
        </div>
      )}

      <input
        {...props}
        ref={ref}
        size={1}
        className={classNames(
          "outline-none appearance-none flex w-full bg-transparent",
          "disabled:bg-inherit disabled:text-inherit disabled:cursor-[inherit]",
        )}
      />

      {helpIcon && (
        <div
          className={classNames(
            "flex shrink-0 items-center justify-center w-4 text-gray-400",
            "group-has-[:invalid]:text-error-500",
          )}
        >
          <HelpCircle className="h-4 aspect-square group-has-[:invalid]:hidden" />
          <AlertCircle className="h-4 aspect-square hidden group-has-[:invalid]:block" />
        </div>
      )}
    </div>
  );
});
