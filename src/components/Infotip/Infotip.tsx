import { type Ref, forwardRef } from "react";
import clsx from "clsx";
import { type InfotipProps } from "./types";

export const Infotip = forwardRef(function ForwardedInfotip(
  {
    position = "top",
    x,
    y,
    style,
    className,
    children,
    ...props
  }: InfotipProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      ref={ref}
      role="none"
      tabIndex={-1}
      className={clsx(className, "absolute z-10 drop-shadow-lg", {
        "-translate-x-1/2 -translate-y-full": position === "top",
        "translate-x-0 -translate-y-1/2": position === "right",
        "-translate-x-1/2 translate-y-0": position === "bottom",
        "-translate-x-full -translate-y-1/2": position === "left",

        "-translate-x-7 -translate-y-full": position === "top right",
        "-translate-x-[calc(100%-1.75rem)] -translate-y-full":
          position === "top left",
      })}
      style={{
        ...style,
        left: x,
        top: y,
      }}
    >
      <div className="relative p-2" role="none">
        <div
          role="presentation"
          className={clsx(
            "absolute z-0 h-3 aspect-square rotate-45 rounded-[1px] bg-white dark:bg-gray-900",
            {
              "bottom-1 left-1/2 -translate-x-1/2": position === "top",
              "top-1/2 left-1 -translate-y-1/2": position === "right",
              "top-1 left-1/2 -translate-x-1/2": position === "bottom",
              "top-1/2 right-1 -translate-y-1/2": position === "left",

              "bottom-1 left-7 -translate-x-1/2": position === "top right",
              "bottom-1 right-7 translate-x-1/2": position === "top left",
            },
          )}
        />

        <div
          role="tooltip"
          className={clsx(
            "relative py-2 px-3",
            "bg-white rounded-lg",
            "text-gray-700 text-xs font-medium",
            "dark:text-white dark:bg-gray-900",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
});
