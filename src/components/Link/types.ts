export type LinkProps = Omit<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
  "disabled"
> & {
  /**
   * Visually defines an action that must be done carefully.
   *
   * @default false
   */
  destructive?: boolean;
  /**
   * Defines if the link is aria disabled or not.
   * The `onClick` event is prevented when `disabled`
   * is set to `true`. This is intentional to meet
   * a11y requirements.
   */
  disabled?: boolean;
};
