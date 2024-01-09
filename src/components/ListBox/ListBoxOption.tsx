import { ForwardedRef, MouseEvent, forwardRef, useEffect } from "react";
import classNames from "classnames";
import { Check } from "@this/icons";
import { ListBoxOptionProps } from "./types";

export const ListBoxOption = forwardRef(function ForwardedListBoxOption(
  {
    value,
    focused,
    selectOnFocus,
    icon,
    className,
    children,
    role = "option",
    "aria-selected": selected,
    onSelect,
    onClick,
    ...props
  }: ListBoxOptionProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  useEffect(autoSelectOnFocus, [selectOnFocus, focused, value, onSelect]);

  return (
    <div
      {...props}
      ref={ref}
      role={role}
      data-value={value}
      aria-selected={selected}
      className="relative"
    >
      <div
        className={classNames(
          className,
          "py-2.5 px-3.5 flex gap-3",
          "text-sm text-gray-900",
          "aria-disabled:text-gray-200",
          "group-has-[>[role=option]:first-child]:group-[>:first-child>]:rounded-t-lg",
          "group-has-[>[role=option]:last-child]:group-[>:last-child>]:rounded-b-lg",
          "group-has-[>[role=group]:first-child]:group-[>:first-child>:first-child>]:rounded-t-lg",
          "group-has-[>[role=group]:last-child]:group-[>:last-child>:last-child>]:rounded-b-lg",
          {
            "group-has-[[data-role=icon]]:pl-[2.625rem]":
              role === "option" && !icon,
            "bg-primary-25": focused || selected,
            "hover:bg-primary-50 hover:text-primary-700 cursor-pointer":
              role === "option",
          },
        )}
        onClick={handleClick}
      >
        {icon && (
          <div
            role="presentation"
            data-role="icon"
            className="w-4 flex shrink-0 items-center justify-center"
          >
            {icon}
          </div>
        )}

        <div className="flex-auto truncate">{children}</div>

        {selected && (
          <div
            aria-hidden="true"
            className="w-4 flex shrink-0 items-center justify-center text-primary-600"
          >
            <Check />
          </div>
        )}
      </div>
    </div>
  );

  function autoSelectOnFocus() {
    if (selectOnFocus && focused && value && onSelect) {
      onSelect(value);
    }
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    onClick && onClick(event);

    value && onSelect && onSelect(value);
  }
});
