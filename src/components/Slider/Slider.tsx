import {
  type Ref,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  forwardRef,
  useRef,
} from "react";
import classNames from "classnames";
import { Infotip, type InfotipProps, type SliderType } from "../Infotip";
import { type SliderProps } from "./types";

export const Slider = forwardRef(function ForwardedSlider(
  {
    step: defaultStep = 1,
    min: defaultMin = 0,
    max: defaultMax = 100,
    value,
    labelPosition = "top floating",
    className,
    formatLabel = defaultFormatLabel,
    onChange,
    ...props
  }: SliderProps,
  ref: Ref<HTMLDivElement>,
) {
  const step = Math.max(1 / Number.MAX_SAFE_INTEGER, defaultStep);
  const min = Math.min(0, defaultMin);
  const max = Math.max(min, defaultMax);
  const offset = Math.abs(min);
  const [lower, upper] = value ?? [min, max];
  const lowerSliderX = getPercentage(lower + offset);
  const upperSliderX = getPercentage(upper + offset);
  const selectedRef = useRef<HTMLButtonElement>();
  const fillBarRef = useRef<HTMLDivElement>(null);

  return (
    <div
      {...props}
      ref={ref}
      className={classNames(
        className,
        "group flex min-w-48 w-full p-3 transition-all duration-300",
      )}
      role="none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
    >
      <div className="relative flex items-center w-full" role="none">
        <div
          aria-hidden="true"
          className="absolute w-full h-2 bg-gray-200 rounded-lg"
        />

        <div
          ref={fillBarRef}
          aria-hidden="true"
          className="absolute w-full h-2 bg-primary-600 rounded-lg"
          style={{
            left: `${lowerSliderX}%`,
            width: `${upperSliderX - lowerSliderX}%`,
          }}
        />

        {renderHandler("min")}

        {renderHandler("max")}
      </div>
    </div>
  );

  function renderHandler(type: SliderType): ReactNode {
    const sliderValue = type === "min" ? lower : upper;
    const sliderX = type === "min" ? lowerSliderX : upperSliderX;
    return (
      <button
        role="slider"
        tabIndex={0}
        aria-valuemin={min}
        aria-valuenow={sliderValue}
        aria-valuemax={max}
        data-type={type}
        className={classNames(
          "absolute w-6 aspect-square rounded-full -translate-x-3",
          "bg-white shadow-md outline-none",
          "hover:z-20 hover:bg-primary-50",
          "focus:ring-4 focus:ring-primary-100 focus:z-10",
        )}
        style={{ left: `${sliderX}%` }}
        onKeyDown={silderKeyDownHandler(type)}
        onPointerDown={handlePointerDown}
      >
        {renderLabel(sliderValue)}
      </button>
    );
  }

  function silderKeyDownHandler(type: SliderType) {
    return function handleSilderKeyDown(
      event: KeyboardEvent<HTMLButtonElement>,
    ) {
      switch (event.key) {
        case "Up":
        case "ArrowUp":
        case "Right":
        case "ArrowRight":
          event.preventDefault();
          event.stopPropagation();

          onChange?.([
            type === "min" ? Math.min(lower + step, upper) : lower,
            type === "max" ? Math.min(upper + step, max) : upper,
          ]);
          break;
        case "Down":
        case "ArrowDown":
        case "Left":
        case "ArrowLeft":
          event.preventDefault();
          event.stopPropagation();

          onChange?.([
            type === "min" ? Math.max(lower - step, min) : lower,
            type === "max" ? Math.max(upper - step, lower) : upper,
          ]);
          break;
      }
    };
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>): void {
    selectedRef.current = event.currentTarget;
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>): void {
    if (!selectedRef.current || !onChange) return;

    event.preventDefault();
    event.stopPropagation();

    const parentRect = event.currentTarget.getBoundingClientRect();
    const parentLeft = parentRect.left + 12;
    const parentWidth = parentRect.width - 24;
    const offsetX = event.pageX - parentLeft;
    const x = Math.min(Math.max((100 * offsetX) / parentWidth, 0), 100);

    moveSelectedHandler(x);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>): void {
    if (!selectedRef.current || !onChange) return;

    event.preventDefault();
    event.stopPropagation();

    const handlerElement = selectedRef.current;
    const percentage = Number.parseFloat(handlerElement.style.left);
    const type = handlerElement.dataset.type as SliderType;

    moveSelectedHandler(percentage);

    selectedRef.current = undefined;

    const x = getSteppedValue(percentage, type);
    if (type === "min") {
      onChange([x, upper]);
    } else {
      onChange([lower, x]);
    }
  }

  function moveSelectedHandler(x: number): void {
    if (!selectedRef.current || !fillBarRef.current) return;

    const handlerElement = selectedRef.current;
    const barElement = fillBarRef.current;
    const infotip = handlerElement.querySelector("[role='tooltip']");
    const type = handlerElement.dataset.type as SliderType;

    let percentage = x;

    if (type === "min") {
      percentage = Math.min(percentage, upperSliderX);
      barElement.style.left = `${percentage}%`;
      barElement.style.width = `${upperSliderX - percentage}%`;
    } else {
      percentage = Math.max(percentage, lowerSliderX);
      barElement.style.width = `${percentage - lowerSliderX}%`;
    }
    handlerElement.style.left = `${percentage}%`;

    const sliderValue = getSteppedValue(percentage, type);
    if (infotip) {
      infotip.textContent = formatLabel(sliderValue);
    }
  }

  function getPercentage(sliderValue: number): number {
    return (100 * sliderValue) / (max - min);
  }

  function getValue(percentage: number): number {
    return (percentage * (max - min)) / 100;
  }

  function getSteppedValue(percentage: number, type: SliderType): number {
    const sliderValue = getValue(percentage);
    return percentage < (type === "min" ? lowerSliderX : upperSliderX)
      ? Math.trunc(sliderValue / step) * step - offset
      : Math.ceil(sliderValue / step) * step - offset;
  }

  function renderLabel(sliderValue: number): ReactNode {
    const formattedLabel = formatLabel(sliderValue);
    if (labelPosition === "bottom") {
      return (
        <span role="tooltip" className="absolute top-7 -translate-x-1/2">
          {formattedLabel}
        </span>
      );
    }
    return <Infotip {...getInfotipProps()}>{formattedLabel}</Infotip>;
  }

  function getInfotipProps(): InfotipProps {
    if (labelPosition === "bottom floating") {
      return {
        x: 12,
        y: 24,
        position: "bottom",
      };
    }
    return {
      x: 12,
      y: 0,
      position: "top",
    };
  }
});

function defaultFormatLabel(sliderValue: number): string {
  return sliderValue.toLocaleString();
}
