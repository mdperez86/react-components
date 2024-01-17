import {
  type CSSProperties,
  type ForwardedRef,
  forwardRef,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import classNames from "classnames";
import { type InfotipProps } from "./types";

export const INFOTIP_PADDING = 8;

export const Infotip = forwardRef(function ForwardedInfotip(
  { position = "top", className, style, children, ...props }: InfotipProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const infotipRef = useRef<HTMLDivElement>();
  const [tooltipBounds, setTooltipBounds] = useState<DOMRect>();

  useLayoutEffect(getTooltipBounds, []);

  return (
    <div
      {...props}
      ref={getRef}
      role="tooltip"
      tabIndex={-1}
      className={classNames(className, "drop-shadow-lg")}
      style={{ ...style, padding: INFOTIP_PADDING }}
    >
      <div
        role="presentation"
        className={classNames(
          "absolute z-0 h-3 aspect-square rotate-45 rounded-[1px] bg-white dark:bg-gray-900",
        )}
        style={getTooltipArrowPlacement()}
      />

      <div
        className={classNames(
          className,
          "relative py-2 px-3",
          "bg-white rounded-lg",
          "text-gray-700 text-xs font-medium",
          "dark:text-white dark:bg-gray-900",
        )}
      >
        {children}
      </div>
    </div>
  );

  function getRef(element: HTMLDivElement): void {
    infotipRef.current = element;

    if (typeof ref === "function") {
      ref(element);
    }
  }

  function getTooltipBounds(): void {
    if (!infotipRef.current) return undefined;

    const tooltipBounds = infotipRef.current.getBoundingClientRect();
    setTooltipBounds(tooltipBounds);
  }

  function getTooltipArrowPlacement(): CSSProperties | undefined {
    if (!tooltipBounds) return undefined;

    const tooltipCenter = {
      x: tooltipBounds.width / 2 - 6,
      y: tooltipBounds.height / 2 - 6,
    };

    const offset = 4;

    switch (position) {
      case "top left":
        return {
          bottom: offset,
          left: INFOTIP_PADDING + 12,
        };
      case "top right":
        return {
          bottom: offset,
          right: INFOTIP_PADDING + 12,
        };
      case "right":
        return {
          top: tooltipCenter.y,
          left: offset,
        };
      case "bottom":
        return {
          top: offset,
          left: tooltipCenter.x,
        };
      case "left":
        return {
          top: tooltipCenter.y,
          right: offset,
        };
      default:
        return {
          bottom: offset,
          left: tooltipCenter.x,
        };
    }
  }
});
