import type { IconProps } from "@this/icons";

export type NavMenuItemProps = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> & {
  /**
   * The item text.
   */
  text: string;
  /**
   * The item badge.
   */
  badge?: string;
  /**
   * The supporting text to show below the item text.
   */
  supportingText?: string;
  /**
   * The icon to render at the beginning of the item.
   *
   * @param props The icon props.
   * @return The icon.
   */
  renderIcon?: (props: IconProps) => React.ReactNode;
};
