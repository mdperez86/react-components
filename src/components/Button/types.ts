export type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "disabled"
> & {
  /**
   * Defines the visual size of the button.
   *
   * @default md
   */
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  /**
   * Defines the visual hierarchy of the button.
   *
   * @default secondary
   */
  hierarchy?: "primary" | "secondary" | "tertiary";
  /**
   * Visually defines an action that must be done carefully.
   */
  destructive?: boolean;
  /**
   * Defines if the button is aria disabled or not.
   * The `onClick` event is prevented when `disabled`
   * is set to `true`. This is intentional to meet
   * a11y requirements.
   */
  disabled?: boolean;
};
