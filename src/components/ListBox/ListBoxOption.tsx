import {
  type ForwardedRef,
  type MouseEvent,
  forwardRef,
  useEffect,
} from "react";
import clsx from "clsx";
import { CheckIcon } from "@this/icons";
import { type ListBoxOptionProps } from "./types";

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
        className={clsx(
          className,
          "py-2.5 px-3.5 flex gap-3",
          "text-sm text-gray-900",
          "aria-disabled:text-gray-200",
          {
            "group-has-[[data-role=icon]]:pl-[2.625rem]":
              role === "option" && !icon,
            "bg-primary-25": focused ?? selected,
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
            className="w-5 flex shrink-0 items-center justify-center"
          >
            {icon}
          </div>
        )}

        <div className="flex flex-auto items-center overflow-hidden">
          <div className="truncate">{children}</div>
        </div>

        {selected && (
          <div
            aria-hidden="true"
            className="w-4 flex shrink-0 items-center justify-center text-primary-600"
          >
            <CheckIcon />
          </div>
        )}
      </div>
    </div>
  );

  function autoSelectOnFocus(): void {
    if (selectOnFocus && focused && value && onSelect) {
      onSelect(value);
    }
  }

  function handleClick(event: MouseEvent<HTMLDivElement>): void {
    onClick && onClick(event);

    value && onSelect && onSelect(value);
  }
});
