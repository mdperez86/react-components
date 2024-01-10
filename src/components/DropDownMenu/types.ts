import { type ReactNode } from "react";

export type DropDownMenuProps = DropDownMenuGroupProps;

export type DropDownMenuGroupProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  header?: ReactNode;
};

export type DropDownMenuItemProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  icon?: ReactNode;
  subMenu?: (attrs: DropDownSubMenuProps) => ReactNode;
};

export type DropDownSubMenuProps = React.RefAttributes<HTMLDivElement> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
