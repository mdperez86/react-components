import {
  type ChangeEvent,
  type ForwardedRef,
  type KeyboardEvent,
  forwardRef,
  useMemo,
  useRef,
} from "react";
import classNames from "classnames";
import { DatePicker } from "../DatePicker";
import { Dropdown } from "../Dropdown";
import { InputField } from "../InputField";
import { type DateFieldProps } from "./types";

export const DateField = forwardRef(function ForwardedDateField(
  { locale = "en-US", className, value, onChange, ...props }: DateFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const inputFieldRef = useRef<HTMLInputElement>();
  const inputValue = useMemo(getInputValue, [locale, value]);

  return (
    <Dropdown<HTMLInputElement>
      renderToggle={({ expanded, toggle, ...toggleProps }) => (
        <InputField
          {...props}
          {...toggleProps}
          ref={getInputFieldRef}
          type="text"
          defaultValue={inputValue}
          className={classNames(toggleProps.className, className)}
          aria-autocomplete="none"
          role="combobox"
          onClick={toggle}
          onBlur={handleInputFieldBlur}
          onKeyDown={inputFieldKeyDownHandler(expanded, toggle)}
        />
      )}
      renderPopup={({ expanded, collapse: onClose, ...props }) => (
        <dialog
          {...props}
          open={expanded}
          aria-label="Choose a date"
          tabIndex={-1}
          onKeyDown={dialogKeyDownHandler(onClose)}
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

  function getInputFieldRef(element: HTMLInputElement): void {
    if (ref) {
      if (typeof ref === "function") ref(element);
      else ref.current = element;
    }
    inputFieldRef.current = element;
  }

  function getInputValue(): string | undefined {
    return value && toLocalDateString(value, locale);
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
          !toggle && onToggle();
          break;
      }
    };
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
          setTimeout(() => inputFieldRef.current?.focus());
          break;
      }
    };
  }
});

function toDate(value: string): Date | undefined {
  const localDate = new Date(value.trim());

  if (isNaN(localDate.valueOf())) return undefined;

  return localDate;
}

function toLocalDateString(date: Date, locale?: string): string {
  return date.toLocaleDateString(locale);
}
