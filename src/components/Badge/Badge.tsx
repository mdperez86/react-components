import { type Ref, forwardRef } from "react";
import clsx from "clsx";
import type { BadgeProps } from "./types";

export const Badge = forwardRef(function ForwardedBadge(
  { size = "md", className, ...props }: BadgeProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(
        className,
        "inline-flex gap-1 items-center rounded-full py-0.5 min-h-[1ch]",
        "bg-gray-100 text-gray-700 font-medium",
        {
          "text-xs px-1.5": size === "xs",
          "text-sm px-2": size === "sm",
          "text-md px-2.5": size === "md",
          "text-lg px-3": size === "lg",
          "text-xl px-3.5": size === "xl",
          "text-2xl px-4": size === "2xl",
        },
      )}
    />
  );
});
