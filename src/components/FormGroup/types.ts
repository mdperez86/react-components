export type FormGroupProps = Omit<
  React.DetailedHTMLProps<
    React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement
  >,
  "ref"
> & {
  /**
   * The form group title.
   */
  title: string;
  /**
   * The form group description.
   */
  description?: string;
  /**
   * The hint text to show below the group.
   */
  hintText?: string;
  /**
   * The error text shown below the group.
   * It replaces the hint text when is set and
   * enforces the control to be destructive.
   */
  errorText?: string;
};
