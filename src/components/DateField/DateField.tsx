import {
  type ChangeEvent,
  type ForwardedRef,
  type KeyboardEvent,
  forwardRef,
  useRef,
  useState,
  useEffect,
} from "react";
import classNames from "classnames";
import { DatePicker } from "../DatePicker";
import { Dropdown } from "../Dropdown";
import { InputField } from "../InputField";
import { type DateFieldProps } from "./types";

export const DateField = forwardRef(function ForwardedDateField(
  {
    locale = "en-US",
    name,
    className,
    value,
    onChange,
    ...props
  }: DateFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const inputFieldRef = useRef<HTMLInputElement>();
  const [inputValue, setInputValue] = useState("");

  useEffect(setFormattedValue, [locale, value]);

  return (
    <Dropdown<HTMLInputElement>
      renderToggle={({ expanded, toggle, ...toggleProps }) => (
        <>
          <InputField
            {...props}
            {...toggleProps}
            ref={getInputFieldRef}
            type="text"
            value={inputValue}
            className={classNames(toggleProps.className, className)}
            aria-autocomplete="none"
            role="combobox"
            onChange={handleInputChange}
            onClick={toggle}
            onBlur={handleInputFieldBlur}
            onKeyDown={inputFieldKeyDownHandler(expanded, toggle)}
          />
          <input type="hidden" name={name} value={getHiddenValue()} />
        </>
      )}
      renderPopup={({ expanded, collapse, ...props }) => (
        <dialog
          {...props}
          open={expanded}
          aria-label="Choose a date"
          tabIndex={-1}
          onKeyDown={dialogKeyDownHandler(collapse)}
        >
          <DatePicker
            autofocus
            locale={locale}
            value={value}
            onChange={onChange}
          />
        </dialog>
      )}
    />
  );

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value);
  }

  function getInputFieldRef(element: HTMLInputElement): void {
    if (ref) {
      if (typeof ref === "function") ref(element);
      else ref.current = element;
    }
    inputFieldRef.current = element;
  }

  function setFormattedValue(): void {
    setInputValue((value && toLocalDateString(value, locale)) ?? "");
  }

  function handleInputFieldBlur(event: ChangeEvent<HTMLInputElement>): void {
    if (!onChange) return;

    const valueAsDate = toDate(event.target.value);
    onChange(valueAsDate);
  }

  function inputFieldKeyDownHandler(
    toggle: boolean,
    onToggle: () => void,
  ): (event: KeyboardEvent<HTMLInputElement>) => void {
    return function handleInputFieldKeyDown(
      event: KeyboardEvent<HTMLInputElement>,
    ) {
      switch (event.key) {
        case "Down":
        case "ArrowDown":
          if (inputValue) {
            onChange && onChange(toDate(inputValue));
          }
          !toggle && onToggle();
          break;
      }
    };
  }

  function getHiddenValue(): string {
    return value ? toDateOnly(value).toISOString() : "";
  }

  function dialogKeyDownHandler(
    onClose: () => void,
  ): (event: KeyboardEvent<HTMLDialogElement>) => void {
    return function handleDialogKeyDown(
      event: KeyboardEvent<HTMLDialogElement>,
    ) {
      switch (event.key) {
        case "Enter":
        case "Escape":
          onClose();
          inputFieldRef.current?.focus();
          break;
      }
    };
  }
});

function toDateOnly(date: Date): Date {
  const dateOnly = new Date(date);

  dateOnly.setHours(0);
  dateOnly.setMinutes(0);
  dateOnly.setMilliseconds(0);

  return dateOnly;
}

function toDate(value: string): Date | undefined {
  const localDate = new Date(value.trim());

  if (isNaN(localDate.valueOf())) return undefined;

  return localDate;
}

function toLocalDateString(date: Date, locale?: string): string {
  return toDateOnly(date).toLocaleDateString(locale);
}
