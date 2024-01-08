import {
  FocusEvent,
  ForwardedRef,
  KeyboardEvent,
  MouseEvent,
  forwardRef,
  useState,
} from "react";
import classNames from "classnames";
import { ListBoxGroup } from "./ListBoxGroup";
import { ListBoxProps } from "./types";

export const ListBox = forwardRef(function ForwardedListBox(
  {
    selectOnFocus,
    value,
    className,
    children,
    onChange,
    onKeyDown,
    onClick,
    onFocus,
    onBlur,
    ...props
  }: ListBoxProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [activeDescendant, setActiveDescendant] = useState<HTMLDivElement>();

  return (
    <ListBoxGroup
      tabIndex={0}
      {...props}
      selectOnFocus={selectOnFocus}
      value={value}
      ref={ref}
      role="listbox"
      className={classNames(
        className,
        "group min-w-40",
        "rounded-lg shadow-lg",
        "outline-none focus:ring-4 focus:ring-gray-100",
      )}
      aria-activedescendant={
        activeDescendant?.id ?? props["aria-activedescendant"]
      }
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
    </ListBoxGroup>
  );

  function findNextOption(element: HTMLDivElement): HTMLDivElement | undefined {
    const options = getOptions(element);

    if (activeDescendant) {
      const index = options.findIndex((option) => option === activeDescendant);
      if (index < options.length - 1) {
        return options[index + 1];
      }
      return undefined;
    }

    if (options.length) {
      return options[0];
    }
    return undefined;
  }

  function findPreviousOption(
    element: HTMLDivElement,
  ): HTMLDivElement | undefined {
    const options = getOptions(element);

    if (activeDescendant) {
      const index = options.findIndex((option) => option === activeDescendant);
      if (index > 0) {
        return options[index - 1];
      }
      return undefined;
    }

    if (options.length) {
      return options[options.length - 1];
    }
    return undefined;
  }

  function findFirstOption(
    element: HTMLDivElement,
  ): HTMLDivElement | undefined {
    const options = getOptions(element);

    if (options.length) {
      return options[0];
    }
    return undefined;
  }

  function findLastOption(element: HTMLDivElement): HTMLDivElement | undefined {
    const options = getOptions(element);

    if (options.length) {
      return options[options.length - 1];
    }
    return undefined;
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    onKeyDown && onKeyDown(event);

    let focusedOption: HTMLDivElement | undefined;

    switch (event.key) {
      case "Down":
      case "ArrowDown":
        event.preventDefault();
        focusedOption = findNextOption(event.currentTarget);
        break;
      case "Up":
      case "ArrowUp":
        event.preventDefault();
        focusedOption = findPreviousOption(event.currentTarget);
        break;

      case "Home":
        event.preventDefault();
        focusedOption = findFirstOption(event.currentTarget);
        break;
      case "End":
        event.preventDefault();
        focusedOption = findLastOption(event.currentTarget);
        break;

      case " ":
        event.preventDefault();
        if (!selectOnFocus && activeDescendant && onChange) {
          const currentValue = activeDescendant.dataset["value"];
          currentValue && onChange(currentValue);
        }
        break;
    }

    if (focusedOption) {
      setActiveDescendant(focusedOption);
    }
  }

  function handleClick(event: MouseEvent<HTMLDivElement>): void {
    onClick && onClick(event);

    const target = event.target as HTMLDivElement;
    if (target.role === "option") {
      setActiveDescendant(target);
      return;
    }

    const parentOption = target.closest<HTMLDivElement>("[role=option]");
    if (parentOption) {
      setActiveDescendant(parentOption);
      return;
    }
  }

  function handleFocus(event: FocusEvent<HTMLDivElement>) {
    onFocus && onFocus(event);

    if (value) {
      const selectedOption = event.target.querySelector<HTMLDivElement>(
        `[data-value="${value}"]`,
      );

      if (selectedOption) {
        setActiveDescendant(selectedOption);
      }
    }
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    onBlur && onBlur(event);

    setActiveDescendant(undefined);
  }
});

function getOptions(element: HTMLDivElement): HTMLDivElement[] {
  return Array.from<HTMLDivElement>(element.querySelectorAll("[role=option]"));
}
