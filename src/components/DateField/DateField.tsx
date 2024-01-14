"use client";

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
  ref: ForwardedRef<HTMLInputElement>
) {
  const inputFieldRef = useRef<HTMLInputElement>();
  const inputValue = useMemo(getInputValue, [locale, value]);

  return (
    <Dropdown<HTMLInputElement>
      toggle={({ toggle, onToggle, ...toggleProps }) => (
        <InputField
          {...props}
          {...toggleProps}
          ref={getInputFieldRef}
          type="text"
          defaultValue={inputValue}
          className={classNames(toggleProps.className, className)}
          aria-autocomplete="none"
          role="combobox"
          onClick={onToggle}
          onBlur={handleInputFieldBlur}
          onKeyDown={inputFieldKeyDownHandler(toggle, onToggle)}
        />
      )}
      popup={({ close: onClose, ...props }) => (
        <dialog
          {...props}
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

  function getInputFieldRef(element: HTMLInputElement) {
    if (ref) {
      if (typeof ref === "function") ref(element);
      else ref.current = element;
    }
    inputFieldRef.current = element;
  }

  function getInputValue() {
    return value && toLocalDateString(value, locale);
  }

  function handleInputFieldBlur(event: ChangeEvent<HTMLInputElement>) {
    if (!onChange) return;

    const valueAsDate = toDate(event.target.value);
    onChange(valueAsDate);
  }

  function inputFieldKeyDownHandler(toggle: boolean, onToggle: () => void) {
    return function handleInputFieldKeyDown(
      event: KeyboardEvent<HTMLInputElement>
    ) {
      switch (event.key) {
        case "Down":
        case "ArrowDown":
          !toggle && onToggle();
          break;
      }
    };
  }

  function dialogKeyDownHandler(onClose: () => void) {
    return function handleDialogKeyDown(
      event: KeyboardEvent<HTMLDialogElement>
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

function toDate(value: string) {
  const localDate = new Date(value.trim());

  if (isNaN(localDate.valueOf())) return undefined;

  return localDate;
}

function toLocalDateString(date: Date, locale?: string) {
  return date.toLocaleDateString(locale);
}
