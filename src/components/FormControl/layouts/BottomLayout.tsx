import clsx from "clsx";
import { type LayoutProps } from "../types";
import { type Ref, forwardRef } from "react";

export const BottomLayout = forwardRef(function ForwardedBottomLayout(
  { label, hint, children, className, ...props }: LayoutProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx("flex flex-col gap-1.5", className)}
    >
      {children}
      <div className="flex flex-col gap-0.5">
        {label}
        {hint}
      </div>
    </div>
  );
});
