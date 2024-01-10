import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactNode,
  type RefAttributes,
} from "react";

export type DropdownToggleProps<T = HTMLButtonElement> = RefAttributes<T> &
  DetailedHTMLProps<HTMLAttributes<T>, T> & {
    toggle: boolean;
    onToggle: () => void;
  };

export type DropdownPopupProps<T = HTMLDialogElement> = RefAttributes<T> &
  DetailedHTMLProps<HTMLAttributes<T>, T> & {
    open: boolean;
    close: () => void;
  };

export interface DropdownProps<T = HTMLButtonElement, M = HTMLDialogElement> {
  renderToggle: (attrs: DropdownToggleProps<T>) => ReactNode;
  renderPopup: (attrs: DropdownPopupProps<M>) => ReactNode;
}
