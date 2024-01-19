import { type ReactNode } from "react";

export type FormControlProps = Omit<
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
};

export type LayoutProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  label: ReactNode;
  hint: ReactNode;
};
