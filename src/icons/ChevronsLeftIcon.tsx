import { type Ref, forwardRef } from "react";
import { getIconDimensions } from "./utils";
import { type IconProps } from "./types";

export const ChevronsLeftIcon = forwardRef(function ForwardedChevronsLeftIcon(
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
        d="M11 17L6 12L11 7M18 17L13 12L18 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
