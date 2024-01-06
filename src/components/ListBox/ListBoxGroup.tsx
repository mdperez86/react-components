import {
  AriaAttributes,
  Children,
  ForwardedRef,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
} from "react";
import classNames from "classnames";
import { ListBoxGroupProps } from "./types";
import { ListBoxOption } from "./ListBoxOption";

export const ListBoxGroup = forwardRef(function ForwardedListBoxGroup(
  { header, role = "group", className, children, ...props }: ListBoxGroupProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const headerId = useId();

  return (
    <div
      {...props}
      role={role}
      ref={ref}
      aria-labelledby={header ? headerId : props["aria-labelledby"]}
      className={classNames(className, {
        "border-b border-b-gray-100 last:border-b-0": role === "group",
      })}
    >
      {header && (
        <ListBoxOption
          id={headerId}
          role="none"
          className={classNames("border-b border-b-gray-100 font-medium", {
            "text-xs text-gray-900 bg-gray-50": role === "group",
          })}
        >
          {header}
        </ListBoxOption>
      )}

      {Children.map(children, mapChild)}
    </div>
  );

  function mapChild(child: ReactNode): ReactNode {
    if (isValidElement<HTMLElement & AriaAttributes>(child)) {
      if (
        (child.type === ListBoxGroup && role === "listbox") ||
        child.type === ListBoxOption
      ) {
        if (props["aria-activedescendant"]) {
          return cloneElement(child, {
            "aria-activedescendant": props["aria-activedescendant"],
          });
        }
        return child;
      }
    }
    return null;
  }
});
