import {
  type Ref,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import {
  type DropDownMenuGroupProps,
  type DropDownMenuItemProps,
  type DropDownMenuProps,
} from "./types";
import { ChevronRightIcon } from "@this/icons";

export const DropDownMenu = forwardRef(function ForwardedDropDownMenu(
  { header, className, children, ...props }: DropDownMenuProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <DropDownMenuGroup
      tabIndex={0}
      {...props}
      ref={ref}
      header={header}
      role="listbox"
      className={clsx(
        className,
        "group w-60 shadow-md rounded-lg bg-white border border-gray-200",
        "outline-none focus:ring-4 focus:ring-gray-100",
      )}
    >
      {children}
    </DropDownMenuGroup>
  );
});

export const DropDownMenuGroup = forwardRef(function ForwardedDropDownMenuGroup(
  {
    header,
    role = "group",
    className,
    children,
    ...props
  }: DropDownMenuGroupProps,
  ref: Ref<HTMLDivElement>,
) {
  const headerId = useId();

  return (
    <div
      {...props}
      role={role}
      ref={ref}
      aria-labelledby={header ? headerId : props["aria-labelledby"]}
      className={clsx(className, {
        "border-b border-b-gray-100 last:border-b-0": role === "group",
      })}
    >
      {header && (
        <DropDownMenuItem
          id={headerId}
          role="none"
          className={clsx("border-b border-b-gray-100 font-medium", {
            "text-xs text-gray-900 bg-gray-50": role === "group",
          })}
        >
          {header}
        </DropDownMenuItem>
      )}

      {children}
    </div>
  );
});

export const DropDownMenuItem = forwardRef(function ForwardedDropDownMenuItem(
  {
    role = "option",
    icon,
    subMenu,
    className,
    children,
    onClick,
    ...props
  }: DropDownMenuItemProps,
  ref: Ref<HTMLDivElement>,
) {
  const [expanded, setExpanded] = useState(false);
  const popupId = useId();
  const wrapperRef = useRef<HTMLDivElement>();

  useEffect(registerListeners, []);

  return (
    <div ref={getRef} className="relative" role={role}>
      <div
        {...props}
        data-role={role}
        className={clsx(
          className,
          "py-2.5 px-3.5 flex gap-3",
          "text-sm text-gray-700",
          "aria-disabled:text-gray-200",
          "group-has-[>[role=option]:first-child]:group-[>:first-child>]:rounded-t-lg",
          "group-has-[>[role=option]:last-child]:group-[>:last-child>]:rounded-b-lg",
          "group-has-[>[role=group]:first-child]:group-[>:first-child>:first-child>]:rounded-t-lg",
          "group-has-[>[role=group]:last-child]:group-[>:last-child>:last-child>]:rounded-b-lg",
          {
            "group-has-[[data-role=icon]]:pl-[2.625rem]":
              role === "option" && !icon,
            "hover:bg-primary-50 hover:text-primary-700 cursor-pointer":
              role === "option",
          },
        )}
        onClick={handleClick}
        aria-expanded={expanded || undefined}
        aria-haspopup={expanded ? "listbox" : undefined}
        aria-controls={expanded ? popupId : undefined}
      >
        {icon && (
          <div
            role="presentation"
            data-role="icon"
            className="w-4 flex shrink-0 items-center justify-center"
          >
            {icon}
          </div>
        )}

        <div className="flex-auto truncate">{children}</div>

        {subMenu && (
          <div
            role="presentation"
            className="w-4 flex shrink-0 items-center justify-center"
          >
            <ChevronRightIcon />
          </div>
        )}
      </div>

      {expanded &&
        subMenu?.({
          id: popupId,
          className:
            "ml-2 absolute top-0 left-full z-10 shadow-md rounded-lg bg-white border border-gray-200",
        })}
    </div>
  );

  function getRef(element: HTMLDivElement): void {
    wrapperRef.current = element;
    if (typeof ref === "function") {
      ref(element);
    }
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>): void {
    onClick && onClick(event);
    if (subMenu) {
      setExpanded((current) => !current);
    }
  }

  function closePopup(): void {
    setExpanded(false);
  }

  function registerListeners(): () => void {
    document.addEventListener("click", handleDocumentClick);

    return function removeListeners() {
      document.removeEventListener("click", handleDocumentClick);
    };

    function handleDocumentClick(event: MouseEvent): void {
      const target = event.target as HTMLElement;

      if (!wrapperRef.current?.contains(target)) {
        closePopup();
      }
    }
  }
});
