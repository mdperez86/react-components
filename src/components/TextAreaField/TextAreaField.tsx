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
        "group flex gap-2 min-w-48 justify-stretch",
        "bg-white text-gray-900 border border-gray-300 placeholder:text-gray-500",
        "shadow-sm rounded-lg py-2.5 px-3.5 text-base outline-none",
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

      <textarea
        rows={4}
        {...props}
        ref={ref}
        className={classNames(
          "outline-none appearance-none flex w-full bg-transparent",
          "disabled:bg-inherit disabled:text-inherit disabled:cursor-[inherit]",
        )}
        onBlur={handleBlur}
      />

      {helpIcon && (
        <div
          className={classNames(
            "flex shrink-0 items-center justify-center w-4 text-gray-400",
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
