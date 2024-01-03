export type FormControlProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  /**
   * The form control label.
   */
  label: string;
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
