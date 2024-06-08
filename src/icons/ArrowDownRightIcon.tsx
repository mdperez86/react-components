import { type Ref, forwardRef } from "react";
import { getIconDimensions } from "./utils";
import { type IconProps } from "./types";

export const ArrowDownRightIcon = forwardRef(function ForwardedAlertCircleIcon(
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
        d="M7 7L17 17M17 17V7M17 17H7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
