import { type Ref, forwardRef } from "react";
import classNames from "classnames";
import type { NavMenuItemProps } from "./types";

export const NavMenuItem = forwardRef(function ForwardedNavMenuItem(
  { text, className, ...props }: NavMenuItemProps,
  ref: Ref<HTMLLIElement>,
) {
  return (
    <li {...props} ref={ref} role="none" className={className}>
      <a
        href="#"
        role="menuitem"
        className={classNames("p-3 rounded-lg hover:bg-gray-50")}
      >
        <span className="text-md font-medium text-gray-900">{text}</span>
      </a>
    </li>
  );
});
