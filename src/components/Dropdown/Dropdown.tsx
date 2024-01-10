import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { type DropdownProps } from "./types";

export function Dropdown<T = HTMLButtonElement, M = HTMLDialogElement>({
  renderToggle,
  renderPopup,
}: DropdownProps<T, M>): ReactNode {
  const [expanded, setExpanded] = useState(false);
  const popupId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(registerListeners, []);

  return (
    <div ref={wrapperRef} className="relative flex flex-col">
      {renderToggle({
        toggle: expanded,
        onToggle: handleToggle,
        "aria-expanded": expanded || undefined,
        "aria-haspopup": "dialog",
        "aria-controls": expanded ? popupId : undefined,
      })}

      {expanded &&
        renderPopup({
          id: popupId,
          open: expanded,
          close: closePopup,
          role: "dialog",
          "aria-modal": true,
          className: "mt-2 absolute top-full left-0 z-10",
        })}
    </div>
  );

  function handleToggle(): void {
    setExpanded((current) => !current);
  }

  function closePopup(): void {
    setExpanded(false);
  }

  function registerListeners(): () => void {
    document.addEventListener("click", onClick);

    return function removeListeners() {
      document.removeEventListener("click", onClick);
    };

    function onClick(event: MouseEvent): void {
      const target = event.target as HTMLElement;

      if (!wrapperRef.current?.contains(target)) {
        closePopup();
      }
    }
  }
}
