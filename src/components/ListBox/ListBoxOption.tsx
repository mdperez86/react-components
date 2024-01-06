import { ForwardedRef, forwardRef, useId } from "react";
import classNames from "classnames";
import { Check } from "@this/icons";
import { ListBoxOptionProps } from "./types";

export const ListBoxOption = forwardRef(function ForwardedListBoxOption(
  {
    role = "option",
    icon,
    className,
    children,
    "aria-activedescendant": activeDescendantId,
    onClick,
    ...props
  }: ListBoxOptionProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const optionId = useId();
  const isSelected = activeDescendantId === optionId;

  return (
    <div
      {...props}
      ref={ref}
      id={props.id ?? optionId}
      role={role}
      aria-selected={isSelected}
      className="group/option relative"
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
            "hover:bg-primary-50 hover:text-primary-700 cursor-pointer":
              role === "option",
            "group-aria-[selected=true]/option:bg-primary-25 group-aria-[selected=true]/option:hover:bg-primary-50":
              role === "option",
          },
        )}
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

        {isSelected && (
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
});
