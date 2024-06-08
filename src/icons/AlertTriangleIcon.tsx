import { type Ref, forwardRef } from "react";
import { getIconDimensions } from "./utils";
import { type IconProps } from "./types";

export const AlertTriangleIcon = forwardRef(function ForwardedAlertCircleIcon(
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
        d="M11.9998 7.99996V12M11.9998 16H12.0098M10.2898 2.85996L1.81978 17C1.64514 17.3024 1.55274 17.6453 1.55177 17.9945C1.55079 18.3437 1.64127 18.6871 1.8142 18.9905C1.98714 19.2939 2.2365 19.5467 2.53748 19.7238C2.83847 19.9009 3.18058 19.9961 3.52978 20H20.4698C20.819 19.9961 21.1611 19.9009 21.4621 19.7238C21.7631 19.5467 22.0124 19.2939 22.1854 18.9905C22.3583 18.6871 22.4488 18.3437 22.4478 17.9945C22.4468 17.6453 22.3544 17.3024 22.1798 17L13.7098 2.85996C13.5315 2.56607 13.2805 2.32308 12.981 2.15444C12.6814 1.98581 12.3435 1.89722 11.9998 1.89722C11.656 1.89722 11.3181 1.98581 11.0186 2.15444C10.7191 2.32308 10.468 2.56607 10.2898 2.85996Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
