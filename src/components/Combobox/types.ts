import { type ReactNode } from "react";
import { type ListBoxOptionProps } from "../ListBox";

export type ComboboxProps<T = string> = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "children" | "value" | "onChange"
> & {
  /**
   * Display the given icon at the begining of the input field.
   */
  leadingIcon?: ReactNode;
  /**
   * The value of the combobox.
   */
  value?: T;
  /**
   * The option list to render as listbox options.
   *
   * @default []
   */
  options?: T[];
  /**
   * Used to identify the option.
   *
   * @default String(option)
   * @param option The rendering option.
   */
  getOptionValue?: (option: T) => string;
  /**
   * Used as the combobox text for the selected option.
   *
   * @default String(option)
   * @param option The rendering option.
   */
  getOptionText?: (option: T) => string;
  /**
   * Used to render the option within the listbox.
   *
   * @default ListBoxOption
   * @param props The {@link ListBoxOptionProps}.
   */
  renderOption?: (props: ListBoxOptionProps) => ReactNode;
  /**
   * Triggered when the user selects an option from the listbox.
   *
   * @param value The selected option value.
   */
  onChange?: (value: T) => void;
};