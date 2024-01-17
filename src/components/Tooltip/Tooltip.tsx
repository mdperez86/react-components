import { type Ref, forwardRef, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { type InfotipProps, Infotip } from "../Infotip";
import { type TooltipProps } from "./types";

export const Tooltip = forwardRef(function ForwardedTooltip<T = HTMLDivElement>(
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
    const triggerBounds = (
      triggerRef.current as HTMLDivElement
    )?.getBoundingClientRect();

    if (!triggerBounds) return undefined;

    const placementCenter = {
      x: triggerBounds.left + triggerBounds.width / 2,
      y: triggerBounds.top + triggerBounds.height / 2,
    };

    switch (position) {
      case "right":
        return {
          x: triggerBounds.right,
          y: placementCenter.y,
        };
      case "bottom":
        return {
          x: placementCenter.x,
          y: triggerBounds.bottom,
        };
      case "left":
        return {
          x: triggerBounds.left,
          y: placementCenter.y,
        };
      case "top right":
      case "top left":
      default:
        return {
          x: placementCenter.x,
          y: triggerBounds.top,
        };
    }
  }
});
