import { type ReactNode } from "react";

export type ComboboxProps<T = string> = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "ref" | "type" | "children" | "value" | "onChange"
> & {
  /**
   * Represents the combobox behavior.
   *
   * @default "select only"
   */
  type?: "select only" | "autocomplete";
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
   * @param props The {@link ComboboxOptionProps}.
   */
  renderOption?: (props: ComboboxOptionProps<T>) => ReactNode;
  /**
   * Triggered when the user selects an option from the listbox.
   *
   * @param value The selected option value.
   */
  onChange?: (value?: T) => void;
  /**
   * Triggered when the user types in the combobox input to
   * filter options and when it behaves as `autocomplete`.
   *
   * @param value The typed string.
   */
  onSearch?: (value: string) => void;
};

export interface ComboboxOptionProps<T> {
  /**
   * The option to render as listbox option.
   */
  option: T;
  /**
   * The id of the option element.
   */
  id: string;
  /**
   * The extracted value from the option.
   */
  value: string;
  /**
   * The extracted text from the option.
   */
  text: string;
  /**
   * Remove focus from the option so the focus
   * remains in the combobox.
   *
   * @default -1
   */
  tabIndex: number;
}
