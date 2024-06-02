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
};
