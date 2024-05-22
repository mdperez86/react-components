import type { BaseSize } from "@this/types";

export type BadgeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  /**
   * The size of the badge.
   *
   * @default md
   */
  size?: BaseSize;
};
