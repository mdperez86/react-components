import { type InputFieldProps } from "../InputField";

export type DateFieldProps = Omit<
  InputFieldProps,
  "ref" | "type" | "value" | "onChange"
> & {
  /**
   * The locale used i18n format.
   *
   * @default "en-US"
   */
  locale?: string;
  /**
   * The current selected date.
   */
  value?: Date;
  /**
   * Triggered when the user selects a different date.
   *
   * @param value The selected date.
   */
  onChange?: (value?: Date) => void;
};
