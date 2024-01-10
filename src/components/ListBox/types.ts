import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type ReactNode,
} from "react";

export type ListBoxProps = ListBoxGroupProps;

export type ListBoxGroupProps = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "value" | "onChange"
> & {
  /**
   * The header of the list box group.
   */
  header?: ReactNode;
  /**
   * The value of the selected list box option.
   */
  value?: string;
  /**
   * When true autoselect the focused list box option.
   */
  selectOnFocus?: boolean;
  /**
   * Trigered when a list box option is selected.
   * @param value The value of the selected list box option.
   */
  onChange?: (value: string) => void;
};

export type ListBoxOptionProps = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "value" | "onSelect"
> & {
  /**
   * The value of the list box option.
   */
  value?: string;
  /**
   * The leading icon of the list box option.
   */
  icon?: ReactNode;
  /**
   * The visual focus of the list box option.
   */
  focused?: boolean;
  /**
   * When true autoselect the focused list box option.
   */
  selectOnFocus?: boolean;
  /**
   * Trigered when a list box option is clicked.
   * @param value The value of the target list box option.
   */
  onSelect?: (value: string) => void;
};
