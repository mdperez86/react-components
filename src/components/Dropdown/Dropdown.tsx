import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { type DropdownProps } from "./types";

export function Dropdown<T = HTMLButtonElement, M = HTMLDialogElement>({
  renderToggle,
  renderPopup,
  onCollapsed,
  onExpanded,
  onToggled,
}: DropdownProps<T, M>): ReactNode {
  const [expanded, setExpanded] = useState(false);
  const popupId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(registerListeners, []);
  useEffect(triggerEvents, [expanded, onCollapsed, onExpanded, onToggled]);

  return (
    <div ref={wrapperRef} className="relative flex flex-col">
      {renderToggle({
        expanded,
        toggle,
        "aria-expanded": expanded || undefined,
        "aria-haspopup": "dialog",
        "aria-controls": expanded ? popupId : undefined,
      })}

      {expanded &&
        renderPopup({
          id: popupId,
          expanded,
          collapse,
          className: "mt-2 absolute top-full left-0 z-10",
        })}
    </div>
  );

  function registerListeners(): () => void {
    document.addEventListener("click", onClick);

    return function removeListeners() {
      document.removeEventListener("click", onClick);
    };

    function onClick(event: MouseEvent): void {
      const target = event.target as HTMLElement;

      if (!wrapperRef.current?.contains(target)) {
        collapse();
      }
    }
  }

  function triggerEvents(): void {
    if (expanded) {
      onExpanded && onExpanded();
    } else {
      onCollapsed && onCollapsed();
    }

    onToggled && onToggled(expanded);
  }

  function toggle(): void {
    setExpanded((current) => !current);
  }

  function collapse(): void {
    setExpanded(false);
  }
}
