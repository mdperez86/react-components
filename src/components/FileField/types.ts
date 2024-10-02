import { type ReactNode } from "react";

export type FileFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  /**
   * Display the given icon at the begining of the input field.
   */
  leadingIcon?: ReactNode;
  /**
   * Display a help icon at the end of the input field.
   */
  helpIcon?: boolean;
};
