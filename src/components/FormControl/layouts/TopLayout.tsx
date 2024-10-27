import clsx from "clsx";
import { type LayoutProps } from "../types";
import { type Ref, forwardRef } from "react";

export const TopLayout = forwardRef(function ForwardedTopLayout(
  { label, hint, children, className, ...props }: LayoutProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx("flex flex-col gap-1.5", className)}
    >
      {label}
      {children}
      {hint}
    </div>
  );
});
