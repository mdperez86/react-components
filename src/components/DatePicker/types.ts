export interface DatePickerProps {
  locale?: string;
  value?: Date;
  autofocus?: boolean;
  onChange?: (value: Date) => void;
}
