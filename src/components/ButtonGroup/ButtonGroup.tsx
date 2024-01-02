import {
  Children,
  type ReactElement,
  type ReactNode,
  type Ref,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
} from "react";
import classNames from "classnames";
import { Button, type ButtonProps } from "@this/components/Button";
import { type ButtonGroupProps } from "./types";

export const ButtonGroup = forwardRef(function ForwardedButtonGroup(
  {
    size,
    hierarchy,
    destructive,
    icon,
    disabled,
    className,
    children,
    ...props
  }: ButtonGroupProps,
  ref: Ref<HTMLDivElement>,
) {
  const buttonChildren = useMemo(getButtonChildren, [children]);

  return (
    <div
      {...props}
      ref={ref}
      role="group"
      className={classNames(className, "inline-flex")}
    >
      {buttonChildren.map(setupChild)}
    </div>
  );

  function getButtonChildren(): ReactNode[] {
    return Children.toArray(children).filter(filterChild);

    function filterChild(child: ReactNode): boolean {
      return isValidElement<ButtonProps>(child) && child.type === Button;
    }
  }

  function setupChild(
    child: ReactNode,
    index: number,
  ): ReactElement<ButtonProps> {
    const button = child as ReactElement<ButtonProps>;
    return cloneElement<ButtonProps>(button, {
      size,
      hierarchy: hierarchy ?? button.props.hierarchy,
      destructive: destructive ?? button.props.destructive,
      icon: button.props.icon ?? icon,
      disabled: disabled ?? button.props.disabled,
      className: classNames(
        button.props.className,
        "focus:relative focus:z-10",
        "first:rounded-r-none last:rounded-l-none",
        "first:border-r-0 last:border-l-0",
        {
          "rounded-none border-l-0 border-r-0":
            index > 0 && index < buttonChildren.length - 1,
        },
      ),
    });
  }
});
