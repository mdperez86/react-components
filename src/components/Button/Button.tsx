import { type MouseEvent, type Ref, forwardRef } from "react";
import classNames from "classnames";
import { type ButtonProps } from "./types";

export const Button = forwardRef(function ForwardedButton(
  {
    size = "md",
    hierarchy = "secondary",
    destructive = false,
    icon,
    disabled,
    className,
    onClick,
    ...props
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <button
      aria-disabled={disabled}
      {...props}
      ref={ref}
      className={classNames(
        className,
        "font-medium rounded-lg outline-none",
        "inline-flex items-center justify-center",
        "focus:ring-4",
        "aria-disabled:cursor-not-allowed",
        {
          "h-9 px-3 text-sm": size === "sm" && icon !== "only",
          "h-9": size === "sm" && icon === "only",
          "h-10 px-4 text-sm": size === "md" && icon !== "only",
          "h-10": size === "md" && icon === "only",
          "h-11 px-5 text-base": size === "lg" && icon !== "only",
          "h-11": size === "lg" && icon === "only",
          "h-12 px-6 text-base": size === "xl" && icon !== "only",
          "h-12": size === "xl" && icon === "only",
          "h-14 px-7 text-lg": size === "2xl" && icon !== "only",
          "h-14": size === "2xl" && icon === "only",

          "focus:ring-primary-100": hierarchy !== "secondary" && !destructive,
          "focus:ring-gray-100": hierarchy === "secondary" && !destructive,
          "focus:ring-error-100": destructive,

          "text-white border shadow-sm": hierarchy === "primary",
          "border-primary-600 bg-primary-600":
            hierarchy === "primary" && !destructive,
          "border-error-600 bg-error-600":
            hierarchy === "primary" && destructive,
          "hover:border-primary-700 hover:bg-primary-700":
            hierarchy === "primary" && !destructive,
          "hover:border-error-700 hover:bg-error-700":
            hierarchy === "primary" && destructive,
          "aria-disabled:border-primary-200 aria-disabled:bg-primary-200":
            hierarchy === "primary" && !destructive,
          "aria-disabled:border-error-200 aria-disabled:bg-error-200":
            hierarchy === "primary" && destructive,

          "border shadow-sm bg-white": hierarchy === "secondary",
          "text-gray-700 border-gray-300":
            hierarchy === "secondary" && !destructive,
          "text-error-700 border-error-300":
            hierarchy === "secondary" && destructive,
          "hover:text-gray-800 hover:bg-gray-50":
            hierarchy === "secondary" && !destructive,
          "hover:text-error-800 hover:border-error-300 hover:bg-error-50":
            hierarchy === "secondary" && destructive,
          "aria-disabled:text-gray-300 aria-disabled:border-gray-200":
            hierarchy === "secondary" && !destructive,
          "aria-disabled:text-error-300 aria-disabled:border-error-200":
            hierarchy === "secondary" && destructive,

          "border border-transparent bg-transparent": hierarchy === "tertiary",
          "text-primary-700": hierarchy === "tertiary" && !destructive,
          "text-error-700": hierarchy === "tertiary" && destructive,
          "hover:border-primary-50 hover:bg-primary-50":
            hierarchy === "tertiary" && !destructive,
          "hover:border-error-50 hover:bg-error-50":
            hierarchy === "tertiary" && destructive,
          "aria-disabled:text-gray-300":
            hierarchy === "tertiary" && !destructive,
          "aria-disabled:text-error-300":
            hierarchy === "tertiary" && destructive,

          "gap-2": Boolean(icon),
          "flex-row-reverse": icon === "trailing",
          "aspect-square": icon === "only",
        },
      )}
      onClick={handleClick}
    />
  );

  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    if (disabled ?? false) {
      event.preventDefault();
    }

    if (onClick !== undefined) onClick(event);
  }
});
