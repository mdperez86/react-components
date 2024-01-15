export interface DatePickerProps {
  /**
   * The locale to use for i18n.
   *
   * @default "en-US"
   */
  locale?: string;
  /**
   * The value of the date picker.
   */
  value?: Date;
  /**
   * Autofocus the current selected value on mount.
   *
   * @default false
   */
  autofocus?: boolean;
  /**
   * Triggered when the user selects a date.
   *
   * @param value The selected date.
   */
  onChange?: (value: Date) => void;
}
