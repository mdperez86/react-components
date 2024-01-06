import { useEffect, useId, useRef, useState } from "react";
import { DropdownProps } from "./types";

export function Dropdown<T = HTMLButtonElement, M = HTMLDialogElement>({
  toggle,
  popup,
}: DropdownProps<T, M>) {
  const [expanded, setExpanded] = useState(false);
  const popupId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(registerListeners, []);

  return (
    <div ref={wrapperRef} className="relative flex flex-col">
      {toggle({
        toggle: expanded,
        onToggle: handleToggle,
        "aria-expanded": expanded,
        "aria-haspopup": "dialog",
        "aria-controls": popupId,
      })}

      {expanded &&
        popup({
          id: popupId,
          open: expanded,
          close: closePopup,
          role: "dialog",
          "aria-modal": true,
          className: "mt-2 absolute top-full left-0 z-10",
        })}
    </div>
  );

  function handleToggle() {
    setExpanded((current) => !current);
  }

  function closePopup() {
    setExpanded(false);
  }

  function registerListeners() {
    document.addEventListener("click", onClick);

    return function removeListeners() {
      document.removeEventListener("click", onClick);
    };

    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement;

      if (!wrapperRef.current?.contains(target)) {
        closePopup();
      }
    }
  }
}
