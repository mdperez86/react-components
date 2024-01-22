import {
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { ChevronLeftIcon } from "@this/icons";
import { Button, type ButtonProps } from "../Button";
import { type MonthPickerProps } from "./types";

export function MonthPicker({
  locale = "en-US",
  value,
  onChange,
  onClose,
}: MonthPickerProps): ReactNode {
  const [selectedMonth, setSelectedMonth] = useState<number>(value ?? 0);
  const selectedMonthRef = useRef<HTMLButtonElement>(null);
  const monthLabelId = useId();

  const months = getMonths(locale);

  useEffect(changeFocus, [selectedMonth]);

  return (
    <div className="p-4 flex flex-col gap-4 min-w-max">
      <div className="shrink-0 h-10 flex gap-4 items-center justify-between">
        <div className="shrink-0 w-10">
          {onClose && (
            <Button
              type="button"
              hierarchy="tertiary"
              icon="only"
              rounded="full"
              className="aspect-square rounded-full h-10"
              aria-label="Close"
              onClick={handleCloseButtonClick}
            >
              <ChevronLeftIcon size="md" className="h-6 aspect-square" />
            </Button>
          )}
        </div>

        <p id={monthLabelId} className="font-semibold text-gray-600 shrink-0">
          Select a month
        </p>

        <div className="shrink-0 w-10" />
      </div>

      <ol
        className="grid grid-flow-col grid-rows-6 gap-1 grid-cols-2"
        aria-labelledby={monthLabelId}
      >
        {months.map((name, month) => (
          <li key={name}>
            <Button
              ref={selectedMonth === month ? selectedMonthRef : undefined}
              type="button"
              hierarchy={getMonthButtonHierarchy(month)}
              className="w-full font-normal"
              tabIndex={selectedMonth === month ? 0 : -1}
              aria-selected={value === month}
              onClick={monthDayClickHandler(month)}
              onKeyDown={monthDayKeyDownHandler(month)}
            >
              {name}
            </Button>
          </li>
        ))}
      </ol>
    </div>
  );

  function changeFocus(): void {
    selectedMonthRef.current?.focus();
  }

  function handleCloseButtonClick(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    onClose && onClose();
  }

  function getMonthButtonHierarchy(month: number): ButtonProps["hierarchy"] {
    if (month === value) {
      return "primary";
    }

    if (month === selectedMonth) {
      return "secondary color";
    }

    return "tertiary";
  }

  function monthDayClickHandler(
    month: number,
  ): (event: MouseEvent<HTMLButtonElement>) => void {
    return function handleMonthDayClick(event: MouseEvent<HTMLButtonElement>) {
      event.preventDefault();

      onChange && onChange(month);
    };
  }

  function monthDayKeyDownHandler(
    month: number,
  ): (event: KeyboardEvent<HTMLButtonElement>) => void {
    return function handleMonthDayKeyDown(
      event: KeyboardEvent<HTMLButtonElement>,
    ) {
      switch (event.key) {
        case "Escape":
          event.preventDefault();
          event.stopPropagation();
          onClose && onClose();
          return;

        case " ":
        case "Enter":
          event.preventDefault();
          event.stopPropagation();
          onChange && onChange(month);
          return;

        case "Up":
        case "ArrowUp":
          if (month > 0) {
            setSelectedMonth(month - 1);
          }
          break;
        case "Right":
        case "ArrowRight":
          if (month < 6) {
            setSelectedMonth(month + 6);
          }
          break;
        case "Down":
        case "ArrowDown":
          if (month < 11) {
            setSelectedMonth(month + 1);
          }
          break;
        case "Left":
        case "ArrowLeft":
          if (month >= 6) {
            setSelectedMonth(month - 6);
          }
          break;

        case "Home":
          setSelectedMonth(0);
          break;
        case "End":
          setSelectedMonth(11);
          break;
      }
    };
  }
}

function getMonths(locales?: Intl.LocalesArgument): string[] {
  const current = new Date();
  current.setMonth(0);
  current.setDate(1);

  return Array.from({ length: 12 }).map(() => {
    const month = new Date(current);
    current.setMonth(current.getMonth() + 1);
    return month.toLocaleString(locales, {
      month: "long",
    });
  });
}
