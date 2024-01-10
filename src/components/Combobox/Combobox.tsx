import {
  forwardRef,
  type FocusEvent,
  type ForwardedRef,
  type MouseEvent,
  useRef,
  useState,
  type KeyboardEvent,
  useEffect,
  useId,
  type ReactNode,
} from "react";
import classNames from "classnames";
import { ChevronDown, ChevronUp } from "@this/icons";
import {
  Dropdown,
  type DropdownPopupProps,
  type DropdownToggleProps,
} from "../Dropdown";
import { ListBox, ListBoxOption, type ListBoxOptionProps } from "../ListBox";
import { type ComboboxProps } from "./types";

export const Combobox = forwardRef(function ForwardedCombobox<T = string>(
  {
    options = [],
    leadingIcon,
    className,
    name,
    value,
    getOptionValue = defaultDataValueGetter,
    getOptionText = defaultDataTextGetter,
    renderOption = defaultOptionRenderer,
    onChange,
    onClick,
    onKeyDown,
    onBlur,
    ...props
  }: ComboboxProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const comboboxRef = useRef<HTMLInputElement>();
  const listboxRef = useRef<HTMLDivElement>(null);
  const [activeOption, setActiveOption] = useState<T>();
  const optionId = useId();

  useEffect(autoSelectFirstOption, [value, options, onChange]);

  return <Dropdown renderToggle={renderToggle} renderPopup={renderPopup} />;

  function autoSelectFirstOption(): void {
    if (!value && options.length && onChange) {
      setActiveOption(options[0]);
      onChange(options[0]);
    }
  }

  function renderToggle({
    toggle,
    onToggle,
    ...toggleProps
  }: DropdownToggleProps<HTMLInputElement>): ReactNode {
    return (
      <div className={classNames(className, "group relative")}>
        <input
          {...props}
          {...toggleProps}
          value={value ? getOptionText(value) : ""}
          readOnly
          ref={getRef}
          size={1}
          aria-haspopup="listbox"
          aria-activedescendant={
            toggle && activeOption ? getOptionId(activeOption) : undefined
          }
          className={classNames(
            "outline-none appearance-none flex min-w-48",
            "bg-white text-gray-900 border border-gray-300 placeholder:text-gray-500",
            "shadow-sm rounded-lg py-2.5 pr-[2.625rem] text-base h-11",
            "focus:border-primary-300 focus:ring-4 focus:ring-primary-100",
            "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
            "invalid:border-error-300",
            "invalid:focus:border-error-300 invalid:focus:ring-error-100",
            {
              "pl-[2.625rem]": leadingIcon !== undefined,
              "pl-3.5": leadingIcon === undefined,
            },
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />

        <input
          type="hidden"
          name={name}
          value={value && getOptionValue(value)}
        />

        {leadingIcon !== undefined && (
          <div
            aria-hidden="true"
            className={classNames(
              "absolute top-0 bottom-0 left-3.5",
              "flex shrink-0 items-center justify-center w-5 text-gray-500",
              "pointer-events-none",
            )}
          >
            {leadingIcon}
          </div>
        )}

        <div
          aria-hidden="true"
          className={classNames(
            "absolute top-0 bottom-0 right-3.5",
            "flex shrink-0 items-center justify-center w-5 text-gray-500",
            "pointer-events-none",
            "group-has-[:invalid]:text-error-500",
          )}
        >
          {toggle ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
    );

    function getRef(element: HTMLInputElement): void {
      comboboxRef.current = element;

      if (typeof ref === "function") {
        ref(element);
      }
    }

    function handleClick(event: MouseEvent<HTMLInputElement>): void {
      onClick && onClick(event);

      onToggle();
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
      onKeyDown && onKeyDown(event);

      let selectedOption: T | undefined;

      switch (event.key) {
        case "Down":
        case "ArrowDown":
          event.preventDefault();
          if (toggle) {
            selectedOption = findNextOption();
          } else {
            onToggle();
          }
          break;
        case "Up":
        case "ArrowUp":
          event.preventDefault();
          if (toggle) {
            if (event.altKey) {
              if (activeOption && onChange) {
                onChange(activeOption);
              }
              onToggle();
            } else {
              selectedOption = findPreviousOption();
            }
          } else {
            onToggle();
            selectedOption = findFirstOption();
          }
          break;

        case "Home":
          event.preventDefault();
          if (!toggle) {
            onToggle();
          }
          selectedOption = findFirstOption();
          break;
        case "End":
          event.preventDefault();
          if (!toggle) {
            onToggle();
          }
          selectedOption = findLastOption();
          break;

        case "PageUp":
          event.preventDefault();
          if (toggle) {
            selectedOption = jumpUp10();
          }
          break;
        case "PageDown":
          event.preventDefault();
          if (toggle) {
            selectedOption = jumpDown10();
          }
          break;

        case "Enter":
        case " ":
          if (!toggle) {
            onToggle();
          } else {
            if (activeOption && onChange) {
              onChange(activeOption);
            }
            onToggle();
          }
          break;
        case "Tab":
          if (toggle) {
            if (activeOption && onChange) {
              onChange(activeOption);
            }
            onToggle();
          }
          break;

        case "Escape":
          if (toggle) {
            selectedOption = value;
            onToggle();
          }
          break;
      }

      if (selectedOption) {
        setActiveOption(selectedOption);
      }

      setTimeout(
        keepActiveOptionVisible,
        undefined,
        selectedOption ?? activeOption,
      );
    }
  }

  function keepActiveOptionVisible(option: T): void {
    if (listboxRef.current) {
      const optionId = getOptionId(option);
      const listboxOption = listboxRef.current.querySelector<HTMLElement>(
        `#${optionId.replaceAll(":", "\\:")}`,
      );

      if (!listboxOption) {
        return;
      }

      const { offsetHeight, offsetTop } = listboxOption;
      const { offsetHeight: parentOffsetHeight, scrollTop } =
        listboxRef.current;

      const isAbove = offsetTop < scrollTop;
      const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

      if (isAbove) {
        listboxRef.current.scrollTo(0, offsetTop);
      } else if (isBelow) {
        listboxRef.current.scrollTo(
          0,
          offsetTop - parentOffsetHeight + offsetHeight,
        );
      }
    }
  }

  function renderPopup({
    open,
    close,
    className,
    ...props
  }: DropdownPopupProps<HTMLDivElement>): ReactNode {
    return (
      <ListBox
        {...props}
        ref={listboxRef}
        aria-modal={undefined}
        aria-activedescendant={activeOption && getOptionId(activeOption)}
        tabIndex={-1}
        className={classNames(
          className,
          "w-full max-h-[12.5rem] shadow-lg rounded-lg overflow-x-hidden",
        )}
        value={value && getOptionValue(value)}
        onChange={handleListBoxChange}
      >
        {options.map(mapOption)}
      </ListBox>
    );

    function handleListBoxChange(value: string): void {
      const option = findOption(value);
      setActiveOption(option);
      option && onChange && onChange(option);

      close();
      comboboxRef.current?.focus();
    }

    function mapOption(option: T): ReactNode {
      return renderOption({
        key: getOptionValue(option),
        id: getOptionId(option),
        value: getOptionValue(option),
        children: getOptionText(option),
        tabIndex: -1,
      });
    }
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>): void {
    onBlur && onBlur(event);

    event.currentTarget.checkValidity();
  }

  function getOptionId(option: T): string {
    return `${optionId}:${getOptionValue(option)}`;
  }

  function findOption(value: string): T | undefined {
    return options.find((option) => getOptionValue(option) === value);
  }

  function findNextOption(): T | undefined {
    if (activeOption) {
      const index = options.findIndex((option) => option === activeOption);
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

  function findPreviousOption(): T | undefined {
    if (activeOption) {
      const index = options.findIndex((option) => option === activeOption);
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

  function jumpUp10(): T | undefined {
    if (options.length && activeOption) {
      const index = options.findIndex((option) => option === activeOption);
      if (index >= 0) {
        return options[Math.max(0, index - 10)];
      }
    }
    return undefined;
  }

  function jumpDown10(): T | undefined {
    if (options.length && activeOption) {
      const index = options.findIndex((option) => option === activeOption);
      if (index >= 0) {
        return options[Math.min(options.length - 1, index + 10)];
      }
    }
    return undefined;
  }

  function findFirstOption(): T | undefined {
    if (options.length) {
      return options[0];
    }
    return undefined;
  }

  function findLastOption(): T | undefined {
    if (options.length) {
      return options[options.length - 1];
    }
    return undefined;
  }
});

function defaultDataValueGetter<T>(option: T): string {
  return String(option);
}

function defaultDataTextGetter<T>(option: T): string {
  return String(option);
}

function defaultOptionRenderer(props: ListBoxOptionProps): ReactNode {
  return <ListBoxOption {...props} ref={undefined} />;
}
