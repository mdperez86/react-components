export interface MonthPickerProps {
  /**
   * The locale used i18n format.
   *
   * @default "en-US"
   */
  locale?: string;
  /**
   * The selected month number between 0 and 11.
   */
  value?: number;
  /**
   * Triggered when the user selects a month from
   * the list.
   *
   * @param value The selected month number.
   */
  onChange?: (value: number) => void;
  /**
   * When provided it shows the close button becoming
   * in its click action event.
   */
  onClose?: () => void;
}
