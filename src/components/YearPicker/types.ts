export interface YearPickerProps {
  /**
   * The locale used i18n format.
   *
   * @default "en-US"
   */
  locale?: string;
  /**
   * The selected year number.
   */
  value?: number;
  /**
   * Triggered when the user selects a year from
   * the list.
   *
   * @param value The selected year number.
   */
  onChange?: (value: number) => void;
  /**
   * Triggered when the user presses the `Escape` key.
   */
  onClose?: () => void;
}
