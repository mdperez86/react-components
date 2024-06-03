import { type Ref, forwardRef } from "react";
import classNames from "classnames";
import { Badge } from "@this/components/Badge";
import type { NavMenuItemProps } from "./types";

export const NavMenuItem = forwardRef(function ForwardedNavMenuItem(
  {
    text,
    badge,
    supportingText,
    featuredIcon,
    className,
    renderIcon,
    ...props
  }: NavMenuItemProps,
  ref: Ref<HTMLAnchorElement>,
) {
  return (
    <li role="none">
      <a
        {...props}
        ref={ref}
        role="menuitem"
        className={classNames(
          className,
          "flex flex-col gap-1 p-3 rounded-lg hover:bg-gray-50",
        )}
      >
        <div className="flex gap-4">
          {renderIcon && (
            <div className="flex justify-center" role="none">
              <div
                className={classNames({
                  "rounded-full w-12 aspect-square bg-primary-100 flex items-center justify-center":
                    featuredIcon,
                })}
                role="none"
              >
                {renderIcon({ size: "lg", className: "text-primary-600" })}
              </div>
            </div>
          )}

          <div className="flex flex-col justify-center gap-1">
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

            {supportingText && (
              <p className="text-sm text-gray-500">{supportingText}</p>
            )}
          </div>
        </div>
      </a>
    </li>
  );
});
