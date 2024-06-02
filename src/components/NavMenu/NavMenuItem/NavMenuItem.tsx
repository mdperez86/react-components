import { type Ref, forwardRef } from "react";
import classNames from "classnames";
import { Badge } from "@this/components/Badge";
import type { NavMenuItemProps } from "./types";

export const NavMenuItem = forwardRef(function ForwardedNavMenuItem(
  { text, badge, className, ...props }: NavMenuItemProps,
  ref: Ref<HTMLLIElement>,
) {
  return (
    <li {...props} ref={ref} role="none" className={className}>
      <a
        href="#"
        role="menuitem"
        className={classNames("flex p-3 rounded-lg hover:bg-gray-50")}
      >
        <div className="flex items-center gap-2">
          <span className="text-md font-medium text-gray-900">{text}</span>

          {badge && (
            <Badge
              size="xs"
              className="text-md font-medium text-success-700 bg-success-50"
            >
              {badge}
            </Badge>
          )}
        </div>
      </a>
    </li>
  );
});
