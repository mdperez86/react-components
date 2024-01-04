export type CheckBoxProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  /**
   * Defines the indeterminate state of the checkbox.
   */
  indeterminate?: boolean;
};
