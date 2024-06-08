import { type Ref, forwardRef } from "react";
import { getIconDimensions } from "./utils";
import { type IconProps } from "./types";

export const BatteryIcon = forwardRef(function ForwardedAlertCircleIcon(
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
        d="M23 13V11M3 6H17C18.1046 6 19 6.89543 19 8V16C19 17.1046 18.1046 18 17 18H3C1.89543 18 1 17.1046 1 16V8C1 6.89543 1.89543 6 3 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
