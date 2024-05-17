import { type Ref, forwardRef, type FocusEvent } from "react";
import classNames from "classnames";
import { AlertCircleIcon, HelpCircleIcon } from "@this/icons";
import { type TextAreaFieldProps } from "./types";

export const TextAreaField = forwardRef(function ForwardedTextAreaField(
  {
    leadingIcon,
    helpIcon = false,
    className,
    onBlur,
    ...props
  }: TextAreaFieldProps,
  ref: Ref<HTMLTextAreaElement>,
) {
  return (
    <div
      className={classNames(
        className,
        "group relative overflow-hidden",
        "shadow-sm rounded-lg",
        "border border-gray-300",
        "focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-100",
        "has-[:invalid]:border-error-300",
        "has-[:invalid]:focus-within:border-error-300 has-[:invalid]:focus-within:ring-error-100",
      )}
    >
      <textarea
        rows={4}
        {...props}
        ref={ref}
        className={classNames(
          "outline-none appearance-none flex min-w-48 min-h-11 w-full",
          "bg-white text-gray-900 placeholder:text-gray-500",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
          "py-2.5 text-base",
          {
            "pl-[2.625rem]": leadingIcon !== undefined,
            "pl-3.5": leadingIcon === undefined,
            "pr-[2.625rem]": helpIcon,
            "pr-3.5": !helpIcon,
          },
        )}
        onBlur={handleBlur}
      />

      {leadingIcon !== undefined && (
        <div
          className={classNames(
            "absolute top-0 h-11 left-3.5",
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

  function handleBlur(event: FocusEvent<HTMLTextAreaElement>): void {
    onBlur && onBlur(event);

    event.currentTarget.checkValidity();
  }
});
