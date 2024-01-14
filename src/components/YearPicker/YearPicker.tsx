import {
  type KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "@this/icons";
import { Button } from "../Button";
import { type YearPickerProps } from "./types";

const RANGE_SIZE = 10;
const RANGE_PAGE_SIZE = 9;

export function YearPicker({
  value,
  onChange,
  onClose,
}: YearPickerProps): ReactNode {
  const [yearRange, setYearRange] = useState<number>();
  const [currentRange, setCurrentRange] = useState<number>();
  const currentRangeRef = useRef<HTMLButtonElement>(null);
  const [rangePage, setRangePage] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>();
  const currentYearRef = useRef<HTMLButtonElement>(null);
  const rangeTitleId = useId();
  const yearTitleId = useId();

  const yearRanges = useMemo(
    function calcRange() {
      return getYearRanges(rangePage, value);
    },
    [rangePage, value],
  );

  useEffect(
    function findRange() {
      setCurrentRange((current) => {
        return current ?? yearRanges.find(isValueInRange);
      });
    },
    [yearRanges],
  );

  useEffect(
    function initialYear() {
      if (yearRange) {
        if (isValueInRange(yearRange)) {
          setCurrentYear(value);
        } else {
          setCurrentYear(yearRange);
        }
      }
    },
    [value, yearRange],
  );

  useEffect(
    function changeFocus() {
      currentRangeRef.current?.focus();
    },
    [currentRange],
  );

  useEffect(
    function changeFocus() {
      currentYearRef.current?.focus();
    },
    [currentYear],
  );

  return (
    <div className="p-4 bg-secondary-50 rounded-2xl flex flex-col gap-4 min-w-fit shadow-lg text-gray-600">
      {yearRange ? (
        <>
          <div className="flex gap-4 items-center justify-between h-10">
            <Button
              type="button"
              hierarchy="tertiary"
              icon="only"
              className="aspect-square rounded-full h-10"
              onClick={handleBackClick}
            >
              <ChevronLeft className="h-6 aspect-square" aria-hidden="true" />
            </Button>

            <div className="col-span-5 flex items-center justify-center gap-2 font-semibold">
              <p id={rangeTitleId} className="font-semibold text-center">
                Select a year
              </p>
            </div>

            <div className="shrink-0 h-full aspect-square" />
          </div>

          <ol
            aria-labelledby={rangeTitleId}
            className="grid grid-flow-col grid-rows-5 grid-cols-2 gap-1"
          >
            {Array.from({ length: RANGE_SIZE }).map((_, index) => (
              <li key={yearRange + index}>
                <Button
                  ref={
                    currentYear === yearRange + index
                      ? currentYearRef
                      : undefined
                  }
                  type="button"
                  hierarchy={
                    value === yearRange + index
                      ? "secondary"
                      : currentYear === yearRange + index
                        ? "primary"
                        : "tertiary"
                  }
                  className="w-full"
                  tabIndex={currentYear === yearRange + index ? 0 : -1}
                  aria-selected={value === yearRange + index}
                  onClick={yearClickHandler(yearRange + index)}
                  onKeyDown={yearKeyDownHandler(yearRange + index)}
                >
                  {yearRange + index}
                </Button>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <>
          <div className="flex gap-4 items-center justify-between h-10">
            <Button
              type="button"
              hierarchy="tertiary"
              icon="only"
              className="aspect-square rounded-full h-10"
              onClick={handlePreviousRangeClick}
            >
              <ChevronLeft className="h-6 aspect-square" aria-hidden="true" />
            </Button>

            <div className="col-span-5 flex items-center justify-center gap-2 font-semibold">
              <p id={yearTitleId} className="font-semibold text-center">
                Select a range
              </p>
            </div>

            <Button
              type="button"
              hierarchy="tertiary"
              icon="only"
              className="aspect-square rounded-full h-10"
              onClick={handleNextRangeClick}
            >
              <ChevronRight className="h-6 aspect-square" aria-hidden="true" />
            </Button>
          </div>

          <ol
            aria-labelledby={yearTitleId}
            className="grid grid-flow-col grid-rows-3 gap-1"
          >
            {yearRanges.map((range) => (
              <li key={range}>
                <Button
                  ref={currentRange === range ? currentRangeRef : undefined}
                  type="button"
                  hierarchy={
                    isValueInRange(range)
                      ? "secondary"
                      : currentRange === range
                        ? "primary"
                        : "tertiary"
                  }
                  className="w-full inline-flex h-fit py-2"
                  tabIndex={currentRange === range ? 0 : -1}
                  aria-selected={isValueInRange(range)}
                  onClick={yearRangeClickHandler(range)}
                  onKeyDown={yearRangeKeyDownHandler(range)}
                >
                  <div className="flex flex-col">
                    <div>{range}</div>
                    <div>{range + RANGE_SIZE - 1}</div>
                  </div>
                </Button>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );

  function getNextRangePage(page: number): number {
    return page + RANGE_PAGE_SIZE * RANGE_SIZE;
  }

  function getPreviousRangePage(page: number): number {
    return page - RANGE_PAGE_SIZE * RANGE_SIZE;
  }

  function handleNextRangeClick(): void {
    setRangePage(getNextRangePage);
    setCurrentRange((current) => current && getNextRangePage(current));
  }

  function handlePreviousRangeClick(): void {
    setRangePage(getPreviousRangePage);
    setCurrentRange((current) => current && getPreviousRangePage(current));
  }

  function handleBackClick(): void {
    setYearRange(undefined);
  }

  function yearRangeClickHandler(yearRange: number): () => void {
    return function handleYearRangeClick() {
      setYearRange(yearRange);
    };
  }

  function yearRangeKeyDownHandler(
    range: number,
  ): (event: KeyboardEvent<HTMLButtonElement>) => void {
    return function handleYearRangeKeyDown(
      event: KeyboardEvent<HTMLButtonElement>,
    ) {
      const firstRange = yearRanges[0];
      const lastRange = yearRanges[yearRanges.length - 1];
      let newRange = range;

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
          setYearRange(range);
          return;

        case "Up":
        case "ArrowUp":
          newRange = range - RANGE_SIZE;
          break;
        case "Right":
        case "ArrowRight":
          newRange = range + RANGE_SIZE * 3;
          break;
        case "Down":
        case "ArrowDown":
          newRange = range + RANGE_SIZE;
          break;
        case "Left":
        case "ArrowLeft":
          newRange = range - RANGE_SIZE * 3;
          break;

        case "Home":
          newRange = firstRange;
          break;
        case "End":
          newRange = lastRange;
          break;

        case "PageUp":
          newRange = range - RANGE_PAGE_SIZE * RANGE_SIZE;
          break;
        case "PageDown":
          newRange = range + RANGE_PAGE_SIZE * RANGE_SIZE;
          break;
      }

      setCurrentRange(newRange);

      if (newRange < firstRange) {
        setRangePage(getPreviousRangePage);
      }

      if (newRange > lastRange) {
        setRangePage(getNextRangePage);
      }
    };
  }

  function yearClickHandler(year: number): () => void {
    return function handleYearClick() {
      onChange && onChange(year);
    };
  }

  function yearKeyDownHandler(
    year: number,
  ): (event: KeyboardEvent<HTMLButtonElement>) => void {
    return function handleYearKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
      let newYear = year;

      switch (event.key) {
        case "Escape":
          event.preventDefault();
          event.stopPropagation();
          setYearRange(undefined);
          return;

        case " ":
        case "Enter":
          event.preventDefault();
          event.stopPropagation();
          onChange && onChange(year);
          return;

        case "Up":
        case "ArrowUp":
          newYear--;
          break;
        case "Right":
        case "ArrowRight":
          newYear += 5;
          break;
        case "Down":
        case "ArrowDown":
          newYear++;
          break;
        case "Left":
        case "ArrowLeft":
          newYear -= 5;
          break;

        case "Home":
          if (yearRange) newYear = yearRange;
          break;
        case "End":
          if (yearRange) newYear = yearRange + RANGE_SIZE - 1;
          break;

        case "PageUp":
          newYear -= RANGE_SIZE;
          break;
        case "PageDown":
          newYear += RANGE_SIZE;
          break;
      }

      setCurrentYear(newYear);

      if (yearRange) {
        if (newYear < yearRange) {
          setYearRange((current) => current && current - RANGE_SIZE);
        }

        if (newYear > yearRange + RANGE_SIZE - 1) {
          setYearRange((current) => current && current + RANGE_SIZE);
        }
      }
    };
  }

  function isValueInRange(yearFrom: number): boolean {
    if (!value) return false;

    const yearTo = yearFrom + RANGE_SIZE - 1;
    return yearFrom <= value && value <= yearTo;
  }
}

function getYearRanges(page: number, year?: number): number[] {
  const current = new Date();
  if (year) {
    current.setFullYear(year);
  }
  current.setFullYear(
    current.getFullYear() -
      (current.getFullYear() % (RANGE_PAGE_SIZE * RANGE_SIZE)),
  );
  current.setFullYear(current.getFullYear() + page);

  return Array.from({ length: RANGE_PAGE_SIZE }).map(() => {
    const year = new Date(current);
    current.setFullYear(current.getFullYear() + RANGE_SIZE);
    return year.getFullYear();
  });
}
