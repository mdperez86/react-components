import { type InputFieldProps } from "../InputField";

export type DateFieldProps = Omit<
  InputFieldProps,
  "type" | "value" | "onChange"
> & {
  locale?: string;
  value?: Date;
  onChange?: (value?: Date) => void;
};
