import { MouseEvent, Ref, forwardRef } from "react";
import classNames from "classnames";
import { ButtonProps } from "./types";

export const Button = forwardRef(function ForwardedButton(
  {
    size = "md",
    hierarchy = "secondary",
    disabled,
    className,
    onClick,
    ...props
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      aria-disabled={disabled}
      {...props}
      ref={ref}
      className={classNames(
        className,
        "rounded-lg outline-none",
        "focus:ring-4 focus:ring-primary-100",
        "aria-disabled:cursor-not-allowed",
        {
          "h-9 py-1 px-3 text-sm font-medium": size == "sm",
          "h-10 py-2 px-4 text-sm font-medium": size == "md",
          "h-11 py-2 px-4 text-base font-medium": size == "lg",
          "h-12 py-3 px-5 text-base font-medium": size == "xl",
          "h-14 py-3 px-7 text-lg font-medium": size == "2xl",

          "text-white border border-primary-600 bg-primary-600":
            hierarchy == "primary",
          "hover:border-primary-700 hover:bg-primary-700":
            hierarchy == "primary",
          "aria-disabled:border-primary-200 aria-disabled:bg-primary-200":
            hierarchy == "primary",

          "text-primary-700 border border-primary-50 bg-primary-50":
            hierarchy == "secondary",
          "hover:border-primary-100 hover:bg-primary-100":
            hierarchy == "secondary",
          "aria-disabled:text-primary-300 aria-disabled:border-primary-25 aria-disabled:bg-primary-25":
            hierarchy == "secondary",

          "text-primary-700 border border-transparent bg-transparent":
            hierarchy == "tertiary",
          "hover:border-primary-50 hover:bg-primary-50":
            hierarchy == "tertiary",
          "aria-disabled:text-gray-300": hierarchy == "tertiary",
        }
      )}
      onClick={handleClick}
    />
  );

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (disabled) {
      event.preventDefault();
    }

    onClick && onClick(event);
  }
});
