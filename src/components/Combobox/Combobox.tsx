import {
  type FocusEvent,
  type ForwardedRef,
  type MouseEvent,
  type KeyboardEvent,
  type ReactNode,
  forwardRef,
  useRef,
  useEffect,
  useId,
  useReducer,
  type ChangeEvent,
} from "react";
import classNames from "classnames";
import { ChevronDown, ChevronUp } from "@this/icons";
import {
  Dropdown,
  type DropdownPopupProps,
  type DropdownToggleProps,
} from "../Dropdown";
import { ListBox, ListBoxOption } from "../ListBox";
import { reducer } from "./reducer";
import { type ComboboxOptionProps, type ComboboxProps } from "./types";

export const Combobox = forwardRef(function ForwardedCombobox<T = string>(
  {
    type = "select only",
    options = [],
    leadingIcon,
    className,
    name,
    value,
    getOptionValue = defaultDataValueGetter,
    getOptionText = defaultDataTextGetter,
    renderOption = defaultOptionRenderer,
    onChange,
    onSearch,
    onClick,
    onKeyDown,
    onBlur,
    ...props
  }: ComboboxProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const comboboxRef = useRef<HTMLInputElement>();
  const listboxRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<number>();
  const searchStringRef = useRef<string>("");
  const optionId = useId();

  const [state, dispatch] = useReducer(reducer<T>, {
    options: [],
  });

  useEffect(setOptions, [options, type, state.inputValue]);
  useEffect(autoSelectFirstOption, [type, value, state.options, onChange]);
  useEffect(setInputValue, [value, getOptionText]);
  useEffect(scrollIntoViewActiveOption, [state.activeOption]);

  return (
    <Dropdown
      renderToggle={renderToggle}
      renderPopup={renderPopup}
      onExpanded={handleDropdownExpanded}
    />
  );

  function setOptions(): void {
    dispatch({ type: "OPTIONS_CHANGE", payload: { options } });

    if (type === "autocomplete" && state.inputValue?.length) {
      dispatch({ type: "FOCUS_FIRST_OPTION" });
    }
  }

  function autoSelectFirstOption(): void {
    if (
      type === "select only" &&
      value === undefined &&
      state.options.length &&
      onChange
    ) {
      dispatch({ type: "FOCUS_FIRST_OPTION" });
      onChange(options[0]);
    }
  }

  function setInputValue(): void {
    if (value !== undefined) {
      dispatch({
        type: "ON_INPUT",
        payload: { inputValue: getOptionText(value) },
      });
    }
  }

  function renderToggle({
    expanded,
    toggle,
    ...toggleProps
  }: DropdownToggleProps<HTMLInputElement>): ReactNode {
    return (
      <div className={classNames(className, "group relative")}>
        <input
          {...props}
          {...toggleProps}
          type="text"
          value={getInputValue()}
          readOnly={type === "select only"}
          ref={getRef}
          size={1}
          role="combobox"
          aria-autocomplete={type === "autocomplete" ? "list" : undefined}
          aria-haspopup="listbox"
          aria-activedescendant={
            expanded && state.activeOption
              ? getOptionId(state.activeOption)
              : undefined
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
          onChange={handleChange}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />

        <input type="hidden" name={name} value={getHiddenValue()} />

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
          {expanded ? <ChevronUp size="md" /> : <ChevronDown size="md" />}
        </div>
      </div>
    );

    function getRef(element: HTMLInputElement): void {
      comboboxRef.current = element;

      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    }

    function getHiddenValue(): string {
      return (value && getOptionValue(value)) ?? "";
    }

    function getInputValue(): string {
      return state.inputValue ?? "";
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
      const inputValue = event.currentTarget.value;

      dispatch({
        type: "ON_INPUT",
        payload: { inputValue },
      });

      onSearch && onSearch(inputValue);
      onChange && onChange();

      !expanded && toggle();

      dispatch({
        type: "FOCUS_OPTION",
        payload: { activeOption: undefined },
      });
    }

    function handleClick(event: MouseEvent<HTMLInputElement>): void {
      onClick && onClick(event);

      toggle();
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
      onKeyDown && onKeyDown(event);

      switch (event.key) {
        case "Down":
        case "ArrowDown":
          event.preventDefault();
          if (expanded) {
            if (state.activeOption) {
              dispatch({
                type: "FOCUS_NEXT_OPTION",
                payload: { loop: type === "autocomplete" },
              });
            } else {
              dispatch({ type: "FOCUS_FIRST_OPTION" });
            }
          } else {
            toggle();
            if (type === "autocomplete" && !event.altKey) {
              dispatch({ type: "FOCUS_FIRST_OPTION" });
            }
          }
          break;
        case "Up":
        case "ArrowUp":
          event.preventDefault();
          if (expanded) {
            if (event.altKey) {
              if (state.activeOption && onChange) {
                onChange(state.activeOption);
              }
              toggle();
            } else {
              dispatch({
                type: "FOCUS_PEVIOUS_OPTION",
                payload: { loop: type === "autocomplete" },
              });
            }
          } else {
            toggle();
            if (type === "autocomplete") {
              dispatch({ type: "FOCUS_LAST_OPTION" });
            } else {
              dispatch({ type: "FOCUS_FIRST_OPTION" });
            }
          }
          break;

        case "Home":
          if (type === "select only") {
            event.preventDefault();
            if (!expanded) {
              toggle();
            }
            dispatch({ type: "FOCUS_FIRST_OPTION" });
          }
          break;
        case "End":
          if (type === "select only") {
            event.preventDefault();
            if (!expanded) {
              toggle();
            }
            dispatch({ type: "FOCUS_LAST_OPTION" });
          }
          break;

        case "PageUp":
          event.preventDefault();
          if (expanded) {
            dispatch({ type: "FOCUS_PREVIOUS_10TH_OPTION" });
          }
          break;
        case "PageDown":
          event.preventDefault();
          if (expanded) {
            dispatch({ type: "FOCUS_NEXT_10TH_OPTION" });
          }
          break;

        case "Enter":
          if (type === "autocomplete" && expanded) {
            toggle();
            if (state.activeOption) {
              const inputValue = getOptionText(state.activeOption);
              dispatch({
                type: "ON_INPUT",
                payload: { inputValue },
              });
              onChange && onChange(state.activeOption);
              onSearch && onSearch(inputValue);
            }
            break;
          }
        // eslint-disable-next-line no-fallthrough
        case " ":
          if (type === "select only") {
            if (expanded) {
              if (state.activeOption && onChange) {
                onChange(state.activeOption);
              }
            }
            toggle();
          }
          break;
        case "Tab":
          if (expanded) {
            toggle();
            if (state.activeOption) {
              const inputValue = getOptionText(state.activeOption);
              dispatch({
                type: "ON_INPUT",
                payload: { inputValue },
              });
              onChange && onChange(state.activeOption);
              onSearch && onSearch(inputValue);
            }
          }
          break;

        case "Escape":
          if (expanded) {
            dispatch({
              type: "FOCUS_OPTION",
              payload: { activeOption: value },
            });

            toggle();
          } else if (type === "autocomplete") {
            dispatch({
              type: "ON_INPUT",
              payload: { inputValue: "" },
            });
            onChange && onChange();
            onSearch && onSearch("");
          }
          break;

        default:
          if (type === "select only" && isTyping(event)) {
            !expanded && toggle();

            const option = searchOptionByChar(event.key, state.activeOption);

            if (option) {
              dispatch({
                type: "FOCUS_OPTION",
                payload: { activeOption: option },
              });
            }
          }
          break;
      }
    }

    function searchOptionByChar(char: string, activeOption?: T): T | undefined {
      const searchString = getSearchString(char);
      const activeOptionIndex = activeOption
        ? state.options.findIndex(
            (option) => getOptionValue(option) === getOptionValue(activeOption),
          )
        : -1;
      const index = (activeOptionIndex === -1 ? 0 : activeOptionIndex) + 1;
      const orderedOptions = [
        ...state.options.slice(index),
        ...state.options.slice(0, index),
      ];

      let option = searchOption(orderedOptions, searchString);

      if (!option && allSameCharacters(Array.from(searchString))) {
        option = searchOption(orderedOptions, searchString[0]);
      }

      if (!option) {
        window.clearTimeout(searchTimeoutRef.current);
        searchStringRef.current = "";
      }

      return option;

      function allSameCharacters(chars: string[]): boolean {
        return chars.every((char) => char === chars[0]);
      }
    }

    function getSearchString(char: string): string {
      if (searchTimeoutRef.current !== undefined) {
        window.clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = window.setTimeout(() => {
        searchStringRef.current = "";
      }, 500);

      searchStringRef.current += char;
      return searchStringRef.current;
    }

    function searchOption(options: T[], searchString: string): T | undefined {
      return options.find(matchesOption);

      function matchesOption(option: T): boolean {
        return (
          getOptionText(option)
            .toLowerCase()
            .indexOf(searchString.toLowerCase()) === 0
        );
      }
    }
  }

  function handleDropdownExpanded(): void {
    scrollIntoViewActiveOption();
  }

  function scrollIntoViewActiveOption(): void {
    if (!listboxRef.current || !state.activeOption) {
      return;
    }

    const optionId = getOptionId(state.activeOption);
    const listboxOption = listboxRef.current.querySelector<HTMLElement>(
      `#${optionId.replaceAll(":", "\\:")}`,
    );

    if (!listboxOption) {
      return;
    }

    const { offsetHeight, offsetTop } = listboxOption;
    const { offsetHeight: parentOffsetHeight, scrollTop } = listboxRef.current;

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

  function renderPopup({
    expanded: open,
    collapse: close,
    className,
    ...props
  }: DropdownPopupProps<HTMLDivElement>): ReactNode {
    return (
      <div
        className={classNames(
          className,
          "w-full overflow-hidden rounded-lg shadow-lg",
        )}
        role="none"
      >
        <ListBox
          {...props}
          ref={listboxRef}
          aria-modal={undefined}
          aria-activedescendant={
            state.activeOption && getOptionId(state.activeOption)
          }
          tabIndex={-1}
          className="w-full max-h-[12.5rem] rounded-lg overflow-x-hidden"
          value={value && getOptionValue(value)}
          onChange={handleListBoxChange}
        >
          {state.options.map(mapOption)}
        </ListBox>
      </div>
    );

    function handleListBoxChange(value: string): void {
      const activeOption = findOption(value);

      if (activeOption) {
        dispatch({ type: "FOCUS_OPTION", payload: { activeOption } });
        onChange && onChange(activeOption);
      }

      close();
      comboboxRef.current?.focus();
    }

    function mapOption(option: T): ReactNode {
      return renderOption({
        option,
        id: getOptionId(option),
        value: getOptionValue(option),
        text: getOptionText(option),
        tabIndex: -1,
      });
    }
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>): void {
    onBlur && onBlur(event);

    event.currentTarget.checkValidity();
  }

  function getOptionId(option: T): string {
    const optionValue = getOptionValue(option);
    return `${optionId}${normalizeValue(optionValue)}`;

    function normalizeValue(value: string): string {
      return value.toLowerCase().replaceAll(/[^a-z0-9]/g, "");
    }
  }

  function findOption(value: string): T | undefined {
    return state.options.find((option) => getOptionValue(option) === value);
  }
});

function defaultDataValueGetter<T>(option: T): string {
  return String(option);
}

function defaultDataTextGetter<T>(option: T): string {
  return String(option);
}

function defaultOptionRenderer<T>({
  option,
  text,
  ...props
}: ComboboxOptionProps<T>): ReactNode {
  return (
    <ListBoxOption {...props} key={props.value}>
      {text}
    </ListBoxOption>
  );
}

function isTyping(event: KeyboardEvent<HTMLInputElement>): boolean {
  return (
    event.key === "Backspace" ||
    event.key === "Clear" ||
    (event.key.length === 1 &&
      event.key !== " " &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey)
  );
}
