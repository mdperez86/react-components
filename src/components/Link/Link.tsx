import { type MouseEvent, type Ref, forwardRef } from "react";
import classNames from "classnames";
import { type LinkProps } from "./types";

export const Link = forwardRef(function ForwardedLink(
  { destructive = false, disabled, className, onClick, ...props }: LinkProps,
  ref: Ref<HTMLAnchorElement>,
) {
  const isDisabled = disabled ?? props["aria-disabled"];

  return (
    <a
      {...props}
      ref={ref}
      aria-disabled={isDisabled}
      className={classNames(
        className,
        "outline-none underline underline-offset-2",
        "focus:border-b-4 focus:ring-offset-2",
        "aria-disabled:cursor-not-allowed",
        {
          "focus:border-primary-100": !destructive,
          "focus:border-error-100": destructive,

          "text-primary-600 hover:text-primary-700": !destructive,
          "aria-disabled:text-primary-200": !destructive,
          "text-error-600 hover:text-error-700": destructive,
          "aria-disabled:text-error-200": destructive,
        },
      )}
      onClick={handleClick}
    />
  );

  function handleClick(event: MouseEvent<HTMLAnchorElement>): void {
    if (isDisabled) {
      event.preventDefault();
    }

    if (onClick !== undefined) onClick(event);
  }
});
