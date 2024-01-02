import { type Ref, forwardRef } from "react";
import classNames from "classnames";
import { type InputFieldProps } from "./types";

export const InputField = forwardRef(function ForwardedInputField(
  { className, onClick, ...props }: InputFieldProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      ref={ref}
      className={classNames(
        className,
        "bg-white text-gray-900 border border-gray-300 placeholder:text-gray-500",
        "shadow-sm rounded-lg py-2.5 px-3.5 text-base h-11 outline-none",
        "focus:border-primary-300 focus:ring-4 focus:ring-primary-100",
        "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
      )}
    />
  );
});
