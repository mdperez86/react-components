import { type Ref, type ReactNode, type FormEvent } from "react";

export type FormControlProps<T = HTMLInputElement> = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
> & {
  /**
   * The form control label.
   */
  label: string;
  /**
   * The form control label position.
   *
   * @default top
   */
  labelPosition?: "top" | "right" | "bottom" | "left";
  /**
   * The hint text to show below the control.
   */
  hintText?: string;
  /**
   * The error text shown below the control.
   * It replaces the hint text when is set and
   * enforces the control to be destructive.
   */
  errorText?: string;
  /**
   * The control to render.
   *
   * @param props The control props.
   */
  renderControl: (props: FormControlChildProps<T>) => ReactNode;
};

export type LayoutProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  label: ReactNode;
  hint: ReactNode;
};

export interface FormControlChildProps<T = HTMLInputElement> {
  ref: Ref<T>;
  id: string;
  "aria-describedby": string;
  onInvalid: (event: FormEvent<T>) => void;
}
