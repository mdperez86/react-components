export type MonthPickerProps = {
  locale?: string;
  value?: number;
  onChange?(value: number): void;
  onClose?(): void;
};
