import {
  type CSSProperties,
  type ReactNode,
  type Ref,
  forwardRef,
} from "react";
import classNames from "classnames";
import { Infotip, type InfotipProps } from "../Infotip";
import { type ProgressBarProps } from "./types";

export const ProgressBar = forwardRef(function ForwardedProgressBar(
  {
    min = 0,
    max = 100,
    locale = "en-US",
    value,
    labelPosition,
    className,
    renderLabel,
    ...props
  }: ProgressBarProps,
  ref: Ref<HTMLDivElement>,
) {
  const indeterminate = value === undefined;
  const currentLabelPosition = indeterminate
    ? undefined
    : labelPosition ?? "floating top";
  const currentValue = getValue();
  const formattedValue = getValueAsPercentage(
    (currentValue ?? 0) / max,
    locale,
  );
  const label = renderLabel ? renderLabel(formattedValue) : formattedValue;

  return (
    <div
      {...props}
      ref={ref}
      role="progressbar"
      className={classNames(className, "relative min-w-48", {
        "flex items-center gap-3": currentLabelPosition === "right",
        "flex flex-col items-end gap-2": currentLabelPosition === "bottom",
      })}
      aria-valuemin={indeterminate ? undefined : min}
      aria-valuemax={indeterminate ? undefined : max}
      aria-valuenow={currentValue}
      aria-valuetext={label}
    >
      <div
        className="h-2 w-full rounded-lg bg-primary-50 overflow-hidden"
        role="none"
      >
        <div
          className={classNames("h-full rounded-lg bg-primary-600", {
            "min-w-2": !indeterminate,
            "animate-pingpong": indeterminate,
          })}
          style={getIndicatorStyle(currentValue)}
        />
      </div>

      {renderText()}
    </div>
  );

  function getValue(): number | undefined {
    if (indeterminate) return undefined;

    if (min > value) {
      return min;
    }

    return Math.min(max, value);
  }

  function renderText(): ReactNode {
    switch (currentLabelPosition) {
      case "right":
      case "bottom":
        return (
          <span
            className="text-gray-700 text-sm font-medium"
            aria-hidden="true"
          >
            {label}
          </span>
        );
      case "floating bottom":
      case "floating top":
        return (
          <Infotip
            {...getInfotipProps()}
            aria-hidden="true"
            className="min-w-max"
          >
            {label}
          </Infotip>
        );
    }
  }

  function getInfotipProps(): InfotipProps | undefined {
    if (currentValue === undefined) return undefined;

    return {
      position: labelPosition === "floating top" ? "top" : "bottom",
      x: `max(4px, calc(${currentValue}% - 4px))`,
      y: labelPosition === "floating top" ? 0 : 8,
    };
  }
});

function getValueAsPercentage(
  value: number,
  locale: string = "en-US",
): string | undefined {
  const formatter = new Intl.NumberFormat(locale, { style: "percent" });

  return formatter.format(value);
}

function getIndicatorStyle(
  value?: number,
): Pick<CSSProperties, "width"> | undefined {
  if (value === undefined) return undefined;

  return { width: `${value}%` };
}
