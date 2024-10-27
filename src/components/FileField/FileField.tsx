import {
  type ChangeEvent,
  type FocusEvent,
  type ForwardedRef,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from "react";
import clsx from "clsx";
import { AlertCircleIcon, HelpCircleIcon } from "@this/icons";
import { mergeRefs } from "@this/utils";
import type { FileFieldProps } from "./types";

export const FileField = forwardRef(function ForwardedFileField(
  {
    leadingIcon,
    helpIcon = false,
    className,
    placeholder,
    value,
    onChange,
    onBlur,
    ...props
  }: FileFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const controlRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>();

  useEffect(addFormResetListener, []);
  useEffect(watchValue, [value]);

  return (
    <div
      className={clsx(
        className,
        "group relative",
        "outline-none appearance-none flex min-w-48 w-full",
        "bg-white text-gray-900 border border-gray-300 placeholder:text-gray-500",
        "shadow-xs rounded-lg py-2.5 text-base h-11",
        "focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-100",
        "has-[:disabled]:bg-gray-50 has-[:disabled]:text-gray-500",
        "has-[:invalid]:border-error-300",
        "has-[:invalid]:focus-within:border-error-300 has-[:invalid]:focus-within:ring-error-100",
        {
          "pl-[2.625rem]": leadingIcon !== undefined,
          "pl-3.5": leadingIcon === undefined,
          "pr-[2.625rem]": helpIcon,
          "pr-3.5": !helpIcon,
        },
      )}
    >
      <span
        className={clsx("overflow-hidden text-ellipsis", {
          "text-gray-500": !fileName && placeholder,
        })}
        aria-hidden="true"
      >
        {fileName ?? placeholder}
      </span>

      <input
        {...props}
        ref={mergeRefs(ref, controlRef)}
        type="file"
        className={clsx(
          "absolute z-0 top-0 left-0 h-full w-full opacity-0",
          "appearance-none",
          "focus:outline-none disabled:cursor-not-allowed",
        )}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {leadingIcon !== undefined && (
        <div
          className={clsx(
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
          className={clsx(
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

  function watchValue(): void {
    if (controlRef.current && !value) {
      controlRef.current.value = "";
      setFileName(undefined);
    }
  }

  function addFormResetListener(): undefined | (() => void) {
    const form = controlRef.current?.form;

    if (form) {
      form.addEventListener("reset", handleFormReset);

      return function removeFormResetListener() {
        form.removeEventListener("reset", handleFormReset);
      };
    }

    function handleFormReset(): void {
      setFileName(undefined);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const target = event.currentTarget;

    if (target.files?.length) {
      let displayName = target.files.item(0)?.name ?? "";
      if (target.files.length > 1) {
        displayName = `${displayName} +${target.files.length - 1}`;
      }
      setFileName(displayName);
    }

    onChange?.(event);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>): void {
    event.currentTarget.checkValidity();

    onBlur?.(event);
  }
});
