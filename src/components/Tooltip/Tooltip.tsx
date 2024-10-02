import { type Ref, forwardRef, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { type InfotipProps, Infotip } from "../Infotip";
import { type TooltipProps } from "./types";

export const Tooltip = forwardRef(function ForwardedTooltip<
  T extends HTMLElement = HTMLDivElement,
>(
  {
    renderTrigger,
    position = "top",
    className,
    children,
    ...props
  }: TooltipProps<T>,
  ref: Ref<HTMLDivElement>,
) {
  const infotipId = useId();
  const triggerRef = useRef<T>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      {renderTrigger({
        ref: triggerRef,
        "aria-describedby": open ? infotipId : undefined,
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
            {...getInfotipPlacement()}
            id={infotipId}
            ref={ref}
            position={position}
            className={className}
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

  function getInfotipPlacement(): Pick<InfotipProps, "x" | "y"> | undefined {
    const triggerBounds = triggerRef.current?.getBoundingClientRect();

    if (!triggerBounds) return undefined;

    const triggerPlacement = {
      left: triggerBounds.left + window.scrollX,
      right: triggerBounds.right + window.scrollX,
      top: triggerBounds.top + window.scrollY,
      bottom: triggerBounds.bottom + window.scrollY,
      width: triggerBounds.width,
      height: triggerBounds.height,
    };

    const center = {
      x: triggerPlacement.left + triggerPlacement.width / 2,
      y: triggerPlacement.top + triggerPlacement.height / 2,
    };

    switch (position) {
      case "right":
      case "left":
        return {
          ...center,
          x: triggerPlacement[position],
        };
      case "top":
      case "bottom":
        return {
          ...center,
          y: triggerPlacement[position],
        };
      case "top right":
      case "top left":
      default:
        return {
          ...center,
          y: triggerPlacement.top,
        };
    }
  }
});
