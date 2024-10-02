import { type ReactNode, useId } from "react";
import classNames from "classnames";
import { type ProgressCircleProps } from "./types";

const OFFSET = 32;
const STROKE_WIDTH = 6;
const RADIUS = OFFSET - STROKE_WIDTH / 2;

export function ProgressCircle({
  size = "md",
  start = 90,
  min = 0,
  max = 100,
  locale = "en-US",
  value,
  className,
  renderLabel,
  ...props
}: ProgressCircleProps): ReactNode {
  const indeterminate = value === undefined;
  const formattedValue = getFormattedValue(value, locale);
  const labelId = useId();
  const label = renderLabel?.({ formattedValue, value: getValueNow(value) });

  return (
    <div
      {...props}
      role="progressbar"
      aria-valuemin={indeterminate ? undefined : min}
      aria-valuemax={indeterminate ? undefined : max}
      aria-valuenow={getValueNow(value)}
      aria-valuetext={indeterminate ? undefined : formattedValue}
      aria-labelledby={label ? labelId : undefined}
      className={classNames(className, "flex flex-col gap-1 items-center")}
    >
      <div className="relative" aria-hidden="true">
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classNames("aspect-square", {
            "animate-spin": indeterminate,
            "w-4": size === "xs",
            "w-8": size === "sm",
            "w-12": size === "md",
            "w-16": size === "lg",
            "w-20": size === "xl",
            "w-24": size === "2xl",
          })}
        >
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-primary-50"
          />
          <path
            d={getD(indeterminate ? 20 : getOffsetValue(value), start)}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-primary-600"
          />
        </svg>

        {size !== "xs" && size !== "sm" && formattedValue && (
          <span
            className={classNames(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "font-medium text-gray-700",
              {
                "text-xs": size === "md",
                "text-sm": size === "lg",
                "text-base": size === "xl",
                "text-lg": size === "2xl",
              },
            )}
          >
            {formattedValue}
          </span>
        )}
      </div>

      {label && (
        <div
          id={labelId}
          className="font-medium text-xs text-gray-500 text-center"
        >
          {label}
        </div>
      )}
    </div>
  );

  function getValueNow(value?: number): number | undefined {
    if (value === undefined) return undefined;

    if (value < min) return min;

    return Math.min(value, max);
  }

  function getFormattedValue(
    value?: number,
    locale: string = "en-US",
  ): string | undefined {
    if (value === undefined) return undefined;

    const formatter = new Intl.NumberFormat(locale, { style: "percent" });

    return formatter.format(getOffsetValue(value) / 100);
  }

  function getOffsetValue(value: number): number {
    const validValue = getValueNow(value) ?? min;
    return (100 * (validValue - min)) / (max - min);
  }
}

function getD(value: number, start: number): string {
  const offsetMin = 0;
  const offsetMax = 100;
  const offsetValue = value;
  const step = 100 / 4;

  let current = offsetMin;
  const [X, Y] = getPoint(current, start);
  let d = `M${X} ${Y}`;

  if (offsetMin > offsetValue) {
    d += getA(offsetMin, start);
  } else {
    const fixedMax = Math.min(offsetValue, offsetMax);
    while (current <= fixedMax || current < fixedMax + step) {
      if (current > offsetMax) {
        d += getA(offsetMax, start);
      } else {
        d += getA(Math.min(offsetValue, current), start);
      }
      current += step;
    }
  }

  return d;
}

function getA(angle: number, start: number): string {
  const [X, Y] = getPoint(angle, start);
  return `A${RADIUS} ${RADIUS} ${angle} 0 1 ${X} ${Y}`;
}

function getPoint(
  value: number,
  start: number,
  radius: number = RADIUS,
): string[] {
  const startRad = getRadians(start);
  const angleRad = getRadians((value * 360) / 100) - startRad;
  const X = radius * Math.cos(angleRad) + OFFSET;
  const Y = radius * Math.sin(angleRad) + OFFSET;
  return [X.toPrecision(4), Y.toPrecision(4)];
}

function getRadians(angle: number): number {
  return (angle / 180) * Math.PI;
}
