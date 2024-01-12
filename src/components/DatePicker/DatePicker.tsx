"use client";

import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import classNames from "classnames";
import { ChevronLeft, ChevronRight } from "@this/icons";
import { MonthPicker } from "../MonthPicker";
import { YearPicker } from "../YearPicker";
import { Button } from "../Button";
import { DatePickerProps } from "./types";

export function DatePicker({
  autofocus = false,
  locale = "en-US",
  value,
  onChange,
}: DatePickerProps) {
  const today = new Date();
  const [date, setDate] = useState<Date>(value ?? today);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [canChangeFocus, setCanChangeFocus] = useState(false);
  const selectedDayRef = useRef<HTMLButtonElement>(null);

  const weekDays = getWeekDays(locale);
  const monthDays = getMonthDays(date, locale);

  const calendarLabelId = useId();

  useEffect(
    function changeFocus() {
      canChangeFocus && selectedDayRef.current?.focus();
    },
    [date, canChangeFocus],
  );

  useEffect(
    function setFocusOnAutofocus() {
      selectedDayRef.current?.focus();
    },
    [autofocus],
  );

  if (showMonthPicker) {
    return (
      <MonthPicker
        locale={locale}
        value={date.getMonth()}
        onChange={handleMonthPickerChange}
        onClose={handleMonthPickerClose}
      />
    );
  }

  if (showYearPicker) {
    return (
      <YearPicker
        value={date.getFullYear()}
        onChange={handleYearPickerChange}
        onClose={handleYearPickerClose}
      />
    );
  }

  return (
    <div className="p-4 bg-white rounded-2xl flex flex-col gap-4 min-w-fit shadow-lg">
      <div className="grid grid-flow-row grid-cols-7 gap-1 text-gray-600">
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="aspect-square rounded-full h-10 flex items-center justify-center"
            onClick={handlePreviousMonthClick}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-6" aria-hidden="true" />
          </button>
        </div>

        <div
          id={calendarLabelId}
          className="col-span-5 flex items-center justify-center gap-2 font-semibold h-10"
          aria-live="polite"
        >
          <button
            type="button"
            className="col-span-5"
            onClick={handleMonthPickerClick}
          >
            {date.toLocaleString(locale, { month: "long" })}
          </button>

          <button
            type="button"
            className="col-span-5"
            onClick={handleYearPickerClick}
          >
            {date.toLocaleString(locale, { year: "numeric" })}
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="button"
            className="aspect-square rounded-full h-10 flex items-center justify-center"
            onClick={handleNextMonthClick}
            aria-label="Next month"
          >
            <ChevronRight className="h-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <table
        role="grid"
        className="w-full border-spacing-2"
        aria-labelledby={calendarLabelId}
      >
        <thead>
          <tr>
            {weekDays.map((weekDay) => (
              <th
                key={weekDay.toISOString()}
                scope="col"
                className="font-medium h-10 text-gray-700 text-sm"
                abbr={weekDay.toLocaleString(locale, {
                  weekday: "long",
                })}
              >
                {weekDay.toLocaleString(locale, {
                  weekday: "short",
                })}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: monthDays.length / 7 }).map((_, weekIndex) => (
            <tr key={weekIndex}>
              {monthDays
                .slice(weekIndex * 7, weekIndex * 7 + 7)
                .map((weekDay) => (
                  <td key={weekDay.toISOString()} className="text-center gap-2">
                    <button
                      ref={equals(weekDay, date) ? selectedDayRef : undefined}
                      type="button"
                      tabIndex={equals(weekDay, date) ? 0 : -1}
                      className={classNames(
                        "rounded-full aspect-square h-10",
                        "text-sm",
                        "outline-none",
                        {
                          "text-gray-400":
                            weekDay.getMonth() != date.getMonth(),
                          "bg-gray-100 hover:bg-gray-200":
                            equals(weekDay, today) && !equals(weekDay, date),
                          "text-white bg-primary-600 hover:bg-primary-700":
                            equals(weekDay, date),
                          "hover:bg-primary-50 hover:text-primary-700":
                            !equals(weekDay, date) && !equals(weekDay, today),
                        },
                      )}
                      aria-disabled={weekDay.getMonth() != date.getMonth()}
                      aria-selected={equals(weekDay, value)}
                      onClick={monthDayClickHandler(weekDay)}
                      onKeyDown={monthDayKeyDownHandler(weekDay)}
                    >
                      {weekDay.toLocaleString(locale, {
                        day: "numeric",
                      })}
                    </button>
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handlePreviousMonthClick() {
    setDate(getPreviousDateByMonth);
  }

  function handleNextMonthClick() {
    setDate(getNextDateByMonth);
  }

  function handleMonthPickerClick() {
    setShowMonthPicker(true);
  }

  function handleYearPickerClick() {
    setShowYearPicker(true);
  }

  function handleMonthPickerChange(month: number) {
    setDate(setCurrentDateByMonth(month));
    setShowMonthPicker(false);
  }

  function handleMonthPickerClose() {
    setShowMonthPicker(false);
    // Forces focus
    setDate((current) => new Date(current));
  }

  function handleYearPickerClose() {
    setShowYearPicker(false);
    // Forces focus
    setDate((current) => new Date(current));
  }

  function handleYearPickerChange(year: number) {
    setDate(setCurrentDateByYear(year));
    setShowYearPicker(false);
  }

  function monthDayClickHandler(monthDay: Date) {
    return function handleMonthDayClick() {
      setDate(monthDay);
      onChange && onChange(monthDay);
    };
  }

  function monthDayKeyDownHandler(monthDay: Date) {
    return function handleMonthDayKeyDown(
      event: KeyboardEvent<HTMLButtonElement>,
    ) {
      let newDate = new Date(monthDay);

      switch (event.key) {
        case "Escape":
          newDate = value ?? today;
          break;

        case " ":
        case "Enter":
          onChange && onChange(newDate);
          return;

        case "Up":
        case "ArrowUp":
          newDate.setDate(newDate.getDate() - 7);
          break;
        case "Right":
        case "ArrowRight":
          newDate.setDate(newDate.getDate() + 1);
          break;
        case "Down":
        case "ArrowDown":
          newDate.setDate(newDate.getDate() + 7);
          break;
        case "Left":
        case "ArrowLeft":
          newDate.setDate(newDate.getDate() - 1);
          break;

        case "Home":
          const [firstDay] = getWeekDays(locale, newDate);
          newDate = firstDay;
          break;
        case "End":
          const [lastDay] = getWeekDays(locale, newDate).reverse();
          newDate = lastDay;
          break;

        case "PageUp":
          if (event.shiftKey) {
            newDate = getPreviousDateByYear(monthDay);
          } else {
            newDate = getPreviousDateByMonth(monthDay);
          }
          break;
        case "PageDown":
          if (event.shiftKey) {
            newDate = getNextDateByYear(monthDay);
          } else {
            newDate = getNextDateByMonth(monthDay);
          }
          break;
      }

      setDate(newDate);
      setCanChangeFocus(true);
    };
  }
}

function getFirstWeekDay(tag: string) {
  const locale = new Intl.Locale(tag);

  let firstDay = 1;

  if ("weekInfo" in locale) {
    firstDay = (locale.weekInfo as { firstDay: number }).firstDay;
  }

  return firstDay;
}

function getWeekDays(tag: string, relativeDate?: Date) {
  const firstWeekDay = getFirstWeekDay(tag) % 7;

  const current = new Date(relativeDate ?? new Date());

  const offset =
    firstWeekDay > current.getDay() ? firstWeekDay - 7 : firstWeekDay;

  current.setDate(current.getDate() - current.getDay() + offset);

  return Array.from({ length: 7 }).map(() => {
    const day = new Date(current);
    current.setDate(current.getDate() + 1);
    return day;
  });
}

function getMonthDays(date: Date, tag: string) {
  const firstDay = new Date(date);
  firstDay.setMilliseconds(0);
  firstDay.setSeconds(0);
  firstDay.setMinutes(0);
  firstDay.setHours(0);
  firstDay.setDate(1);
  firstDay.setDate(
    firstDay.getDate() - firstDay.getDay() + (getFirstWeekDay(tag) % 7),
  );

  const lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 7);
  while (lastDay.getMonth() == date.getMonth()) {
    lastDay.setDate(lastDay.getDate() + 7);
  }

  const current = new Date(firstDay);

  const monthDays = [];
  while (
    current.getTime() >= firstDay.getTime() &&
    current.getTime() < lastDay.getTime()
  ) {
    monthDays.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return monthDays;
}

function equals(date1?: Date, date2?: Date) {
  if (!date1 || !date2) return false;

  return (
    date1.getFullYear() == date2.getFullYear() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getDate() == date2.getDate()
  );
}

function getDateByMonth(month: number, date: Date) {
  const newDate = new Date(date);
  newDate.setMonth(month);
  if (
    newDate.getMonth() === date.getMonth() ||
    newDate.getMonth() === date.getMonth() + 2
  ) {
    newDate.setDate(0);
  }
  return newDate;
}

function setCurrentDateByMonth(month: number) {
  return getDateByMonth.bind(undefined, month);
}

function getPreviousDateByMonth(date: Date) {
  return getDateByMonth(date.getMonth() - 1, date);
}

function getNextDateByMonth(date: Date) {
  return getDateByMonth(date.getMonth() + 1, date);
}

function getDateByYear(year: number, date: Date) {
  const newDate = new Date(date);
  newDate.setFullYear(year);
  if (newDate.getMonth() !== date.getMonth()) {
    newDate.setDate(0);
  }
  return newDate;
}

function setCurrentDateByYear(year: number) {
  return getDateByYear.bind(undefined, year);
}

function getPreviousDateByYear(date: Date) {
  return getDateByYear(date.getFullYear() - 1, date);
}

function getNextDateByYear(date: Date) {
  return getDateByYear(date.getFullYear() + 1, date);
}
