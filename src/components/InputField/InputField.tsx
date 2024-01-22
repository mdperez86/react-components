import { type Ref, forwardRef, type FocusEvent } from "react";
import classNames from "classnames";
import { AlertCircleIcon, HelpCircleIcon } from "@this/icons";
import { type InputFieldProps } from "./types";

export const InputField = forwardRef(function ForwardedInputField(
  {
    leadingIcon,
    helpIcon = false,
    className,
    onBlur,
    ...props
  }: InputFieldProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <div className={classNames(className, "group relative")}>
      <input
        {...props}
        ref={ref}
        size={1}
        className={classNames(
          "outline-none appearance-none flex min-w-48 w-full",
          "bg-white text-gray-900 border border-gray-300 placeholder:text-gray-500",
          "shadow-sm rounded-lg py-2.5 pr-[2.625rem] text-base h-11",
          "focus:border-primary-300 focus:ring-4 focus:ring-primary-100",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
          "invalid:border-error-300",
          "invalid:focus:border-error-300 invalid:focus:ring-error-100",
          {
            "pl-[2.625rem]": leadingIcon !== undefined,
            "pl-3.5": leadingIcon === undefined,
          },
        )}
        onBlur={handleBlur}
      />

      {leadingIcon !== undefined && (
        <div
          className={classNames(
            "absolute top-0 bottom-0 left-3.5",
            "flex shrink-0 items-center justify-center w-5 text-gray-500",
            "pointer-events-none",
          )}
        >
          {leadingIcon}
        </div>
      )}

      {helpIcon && (
        <div
          className={classNames(
            "absolute top-0 bottom-0 right-3.5",
            "flex shrink-0 items-center justify-center w-5 text-gray-500",
            "pointer-events-none",
            "group-has-[:invalid]:text-error-500",
          )}
        >
          <HelpCircleIcon className="h-4 aspect-square group-has-[:invalid]:hidden" />
          <AlertCircleIcon className="h-4 aspect-square hidden group-has-[:invalid]:block" />
        </div>
      )}
    </div>
  );

  function handleBlur(event: FocusEvent<HTMLInputElement>): void {
    onBlur && onBlur(event);

    event.currentTarget.checkValidity();
  }
});
