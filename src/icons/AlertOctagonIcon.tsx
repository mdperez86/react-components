import { type Ref, forwardRef } from "react";
import { getIconDimensions } from "./utils";
import { type IconProps } from "./types";

export const AlertOctagonIcon = forwardRef(function ForwardedAlertCircleIcon(
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
        d="M12 8V12M12 16H12.01M7.86 2H16.14L22 7.86V16.14L16.14 22H7.86L2 16.14V7.86L7.86 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
