import { type ButtonProps } from "../Button/types";

export type ButtonGroupProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
  "disabled"
> &
  Pick<ButtonProps, "size" | "hierarchy" | "destructive" | "icon" | "disabled">;
