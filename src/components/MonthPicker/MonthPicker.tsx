"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import classNames from "classnames";
import { type MonthPickerProps } from "./types";

export function MonthPicker({
  locale = "en-US",
  value,
  onChange,
  onClose,
}: MonthPickerProps) {
  const [selectedMonth, setSelectedMonth] = useState<number>(value ?? 1);
  const selectedMonthRef = useRef<HTMLButtonElement>(null);
  const monthLabelId = useId();

  const months = getMonths(locale);

  useEffect(
    function changeFocus() {
      selectedMonthRef.current?.focus();
    },
    [selectedMonth]
  );

  return (
    <div className="p-4 bg-secondary-50 rounded-2xl flex flex-col gap-4 min-w-fit border border-secondary-400/60">
      <div className="shrink-0 h-10 flex items-center justify-between">
        <button
          type="button"
          className="aspect-square rounded-full bg-secondary-200 h-10"
          aria-label="Close"
          onClick={onClose}
        >
          {"<"}
        </button>

        <p id={monthLabelId} className="font-semibold">
          Select a month
        </p>

        <div className="shrink-0 aspect-square h-10" />
      </div>

      <ol
        className="grid grid-flow-col grid-rows-6 gap-1"
        aria-labelledby={monthLabelId}
      >
        {months.map((name, month) => (
          <li key={name}>
            <button
              ref={selectedMonth == month ? selectedMonthRef : undefined}
              type="button"
              className={classNames("rounded-xl px-3 py-1 w-full text-center", {
                "border-2 border-dashed border-accent-600": value == month,
                "bg-accent-600 text-secondary-200": selectedMonth == month,
              })}
              tabIndex={selectedMonth == month ? 0 : -1}
              aria-selected={value == month}
              onClick={monthDayClickHandler(month)}
              onKeyDown={monthDayKeyDownHandler(month)}
            >
              {name}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );

  function monthDayClickHandler(month: number) {
    return function handleMonthDayClick() {
      onChange && onChange(month);
    };
  }

  function monthDayKeyDownHandler(month: number) {
    return function handleMonthDayKeyDown(
      event: KeyboardEvent<HTMLButtonElement>
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

function getMonths(locales?: Intl.LocalesArgument) {
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
