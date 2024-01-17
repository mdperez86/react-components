import {
  type CSSProperties,
  type ForwardedRef,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { Infotip } from "../Infotip";
import { type TooltipProps } from "./types";

export const Tooltip = forwardRef(function ForwardedTooltip<T = HTMLDivElement>(
  {
    renderTrigger,
    position = "top",
    className,
    children,
    ...props
  }: TooltipProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const tooltipId = useId();
  const tooltipRef = useRef<HTMLDivElement>();
  const triggerRef = useRef<T>(null);
  const [open, setOpen] = useState(false);
  const [tooltipBounds, setTooltipBounds] = useState<DOMRect>();

  useEffect(getTooltipBounds, [open]);

  return (
    <>
      {renderTrigger({
        ref: triggerRef,
        "aria-describedby": open ? tooltipId : undefined,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onTouchStart: handleFocus,
      })}

      {open &&
        createPortal(
          <Infotip
            {...props}
            id={tooltipId}
            ref={getRef}
            position={position}
            className={classNames(className, "absolute z-10")}
            style={{ ...getTooltipPlacement() }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </Infotip>,
          document.body,
        )}
    </>
  );

  function handleFocus(): void {
    setOpen(true);
  }

  function handleBlur(): void {
    setOpen(false);
  }

  function handleMouseEnter(): void {
    setOpen(true);
  }

  function handleMouseLeave(): void {
    setOpen(false);
  }

  function getRef(element: HTMLDivElement): void {
    tooltipRef.current = element;

    if (typeof ref === "function") {
      ref(element);
    }
  }

  function getTooltipBounds(): void {
    if (!open || !tooltipRef.current) return undefined;

    const tooltipBounds = tooltipRef.current.getBoundingClientRect();
    setTooltipBounds(tooltipBounds);
  }

  function getTooltipPlacement(): CSSProperties | undefined {
    const triggerBounds = (
      triggerRef.current as HTMLDivElement
    )?.getBoundingClientRect();

    if (!tooltipBounds || !triggerBounds) return undefined;

    const triggerCenter = {
      x: triggerBounds.width / 2,
      y: triggerBounds.height / 2,
    };

    const tooltipCenter = {
      x: tooltipBounds.width / 2,
      y: tooltipBounds.height / 2,
    };

    const offset = 0;

    const placementCenter = {
      x: triggerBounds.left + triggerCenter.x - tooltipCenter.x,
      y: triggerBounds.top + triggerCenter.y - tooltipCenter.y,
    };

    switch (position) {
      case "top left":
        return {
          top: triggerBounds.top - tooltipBounds.height - offset,
          left: triggerBounds.left + 12,
        };
      case "top right":
        return {
          top: triggerBounds.top - tooltipBounds.height - offset,
          right: triggerBounds.left + 12,
        };
      case "right":
        return {
          top: placementCenter.y,
          left: triggerBounds.right + offset,
        };
      case "bottom":
        return {
          top: triggerBounds.top + triggerBounds.height + offset,
          left: placementCenter.x,
        };
      case "left":
        return {
          top: placementCenter.y,
          right: triggerBounds.right + offset,
        };
      default:
        return {
          top: triggerBounds.top - tooltipBounds.height - offset,
          left: placementCenter.x,
        };
    }
  }
});
