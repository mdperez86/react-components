export interface YearPickerProps {
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
