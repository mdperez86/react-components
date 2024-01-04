import classNames from "classnames";
import { type LayoutProps } from "../types";
import { type Ref, forwardRef } from "react";

export const RightLayout = forwardRef(function ForwardedRightLayout(
  { label, hint, children, className, ...props }: LayoutProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div {...props} ref={ref} className={classNames("flex gap-3", className)}>
      <div className="shrink-0 flex items-start">{children}</div>
      <div className="flex flex-col gap-0.5">
        {label}
        {hint}
      </div>
    </div>
  );
});
