import { type ReactNode } from "react";

export type TextAreaFieldProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
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
