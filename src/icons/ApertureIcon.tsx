import { type Ref, forwardRef } from "react";
import { getIconDimensions } from "./utils";
import { type IconProps } from "./types";

export const ApertureIcon = forwardRef(function ForwardedAlertCircleIcon(
  { size = "sm", ...props }: IconProps,
  ref: Ref<SVGSVGElement>,
) {
  return (
    <svg
      {...getIconDimensions(size)}
      {...props}
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.31 8L20.05 17.94M9.69 8H21.17M7.38 12L13.12 2.06M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12L10.88 21.94M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
