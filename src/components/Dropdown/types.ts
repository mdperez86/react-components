import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactNode,
  type RefAttributes,
} from "react";

export type DropdownToggleProps<T = HTMLButtonElement> = RefAttributes<T> &
  DetailedHTMLProps<HTMLAttributes<T>, T> & {
    expanded: boolean;
    toggle: () => void;
  };

export type DropdownPopupProps<T = HTMLDialogElement> = RefAttributes<T> &
  DetailedHTMLProps<HTMLAttributes<T>, T> & {
    expanded: boolean;
    collapse: () => void;
  };

export interface DropdownProps<T = HTMLButtonElement, M = HTMLDialogElement> {
  renderToggle: (attrs: DropdownToggleProps<T>) => ReactNode;
  renderPopup: (attrs: DropdownPopupProps<M>) => ReactNode;
  onCollapsed?: () => void;
  onExpanded?: () => void;
  onToggled?: (expanded: boolean) => void;
}
