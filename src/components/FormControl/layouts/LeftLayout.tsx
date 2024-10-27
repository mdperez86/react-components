import clsx from "clsx";
import { type LayoutProps } from "../types";
import { type Ref, forwardRef } from "react";

export const LeftLayout = forwardRef(function ForwardedLeftLayout(
  { label, hint, children, className, ...props }: LayoutProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div {...props} ref={ref} className={clsx("flex gap-3", className)}>
      <div className="flex flex-col gap-0.5">
        {label}
        {hint}
      </div>
      <div className="shrink-0 flex items-start">{children}</div>
    </div>
  );
});
