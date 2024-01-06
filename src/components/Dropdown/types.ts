import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
} from "react";

export type DropdownToggleProps<T = HTMLButtonElement> = RefAttributes<T> &
  DetailedHTMLProps<HTMLAttributes<T>, T> & {
    toggle: boolean;
    onToggle(): void;
  };

export type DropdownPopupProps<T = HTMLDialogElement> = RefAttributes<T> &
  DetailedHTMLProps<HTMLAttributes<T>, T> & {
    open: boolean;
    close(): void;
  };

export type DropdownProps<T = HTMLButtonElement, M = HTMLDialogElement> = {
  toggle(attrs: DropdownToggleProps<T>): ReactNode;
  popup(attrs: DropdownPopupProps<M>): ReactNode;
};
