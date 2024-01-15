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
  hierarchy?:
    | "primary"
    | "secondary"
    | "secondary color"
    | "tertiary"
    | "tertiary color";
  /**
   * Visually defines an action that must be done carefully.
   *
   * @default false
   */
  destructive?: boolean;
  /**
   * The icon position within the button content.
   */
  icon?: "leading" | "trailing" | "only";
  /**
   * Defines if the button is aria disabled or not.
   * The `onClick` event is prevented when `disabled`
   * is set to `true`. This is intentional to meet
   * a11y requirements.
   */
  disabled?: boolean;
  /**
   * Defines the border radius of the button.
   *
   * @default lg
   */
  rounded?: "lg" | "full";
};
