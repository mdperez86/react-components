import {
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
} from "react";
import clsx from "clsx";
import { ListBoxOption } from "./ListBoxOption";
import { getOptionId } from "./utils";
import type { ListBoxGroupProps, ListBoxOptionProps } from "./types";

export const ListBoxGroup = forwardRef(function ForwardedListBoxGroup(
  {
    header,
    value,
    role = "group",
    selectOnFocus,
    className,
    children,
    onChange,
    ...props
  }: ListBoxGroupProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const headerId = useId();
  const optionId = useId();

  return (
    <div
      {...props}
      role={role}
      ref={ref}
      aria-labelledby={header ? headerId : props["aria-labelledby"]}
      className={clsx(className, {
        "border-b border-b-gray-100 last:border-b-0": role === "group",
      })}
    >
      {header && (
        <ListBoxOption
          id={headerId}
          role="none"
          className={clsx("border-b border-b-gray-100 font-medium", {
            "text-xs text-gray-900 bg-gray-50": role === "group",
          })}
        >
          {header}
        </ListBoxOption>
      )}

      {Children.map(children, mapChild)}
    </div>
  );

  function mapChild(child: ReactNode, index: number): ReactNode {
    if (
      isValidElement<ListBoxGroupProps>(child) &&
      child.type === ListBoxGroup
    ) {
      return cloneElement(child, {
        value,
        selectOnFocus,
        "aria-activedescendant": props["aria-activedescendant"],
        onChange: listBoxGroupChangeHandler(child),
      });
    }

    if (
      isValidElement<ListBoxOptionProps>(child) &&
      child.type === ListBoxOption
    ) {
      const id = getOptionId(
        optionId,
        child.props.value ?? String(index),
        child.props.id,
      );

      return cloneElement<ListBoxOptionProps>(child, {
        id,
        selectOnFocus,
        focused: props["aria-activedescendant"] === id,
        "aria-selected": Boolean(value) && value === child.props.value,
        onSelect: listBoxOptionSelectHandler(child),
      });
    }

    return child;
  }

  function listBoxGroupChangeHandler(
    listBoxGroup: ReactElement<ListBoxGroupProps>,
  ) {
    return function handleListBoxGroupChange(value: string) {
      listBoxGroup.props.onChange && listBoxGroup.props.onChange(value);

      onChange && onChange(value);
    };
  }

  function listBoxOptionSelectHandler(
    listBoxOption: ReactElement<ListBoxOptionProps>,
  ) {
    return function handleListBoxOptionSelect(value: string) {
      listBoxOption.props.onSelect && listBoxOption.props.onSelect(value);

      onChange && onChange(value);
    };
  }
});
