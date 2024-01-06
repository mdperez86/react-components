import {
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
    className,
    children,
    value,
    onChange,
    onKeyDown,
    onClick,
    ...props
  }: ListBoxProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [activeDescendant, setActiveDescendant] = useState<HTMLDivElement>();

  return (
    <ListBoxGroup
      tabIndex={0}
      {...props}
      ref={ref}
      role="listbox"
      className={classNames(
        className,
        "group min-w-40",
        "rounded-lg shadow-lg",
        "outline-none focus:ring-4 focus:ring-gray-100",
      )}
      aria-activedescendant={activeDescendant?.id}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
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

    let selectedOption: HTMLDivElement | undefined;

    switch (event.key) {
      case "Down":
      case "ArrowDown":
        event.preventDefault();
        selectedOption = findNextOption(event.currentTarget);
        break;
      case "Up":
      case "ArrowUp":
        event.preventDefault();
        selectedOption = findPreviousOption(event.currentTarget);
        break;

      case "Home":
        event.preventDefault();
        selectedOption = findFirstOption(event.currentTarget);
        break;
      case "End":
        event.preventDefault();
        selectedOption = findLastOption(event.currentTarget);
        break;
    }

    if (selectedOption) {
      setActiveDescendant(selectedOption);
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
});

function getOptions(element: HTMLDivElement): HTMLDivElement[] {
  return Array.from<HTMLDivElement>(element.querySelectorAll("[role=option]"));
}
