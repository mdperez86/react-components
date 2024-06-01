export type SliderProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type" | "value" | "min" | "max" | "step" | "onChange"
> & {
  /**
   * The min value of the slider.
   *
   * @default 0
   */
  min?: number;
  /**
   * The max value of the slider.
   *
   * @default 100
   */
  max?: number;
  /**
   * The incremental amount of the slider. It must be greater
   * than zero.
   *
   * @default 1
   */
  step?: number;
  /**
   * The tuple of values, the first element in the array
   * is the min value and the last element is the max value.
   *
   * @default [0, 100]
   */
  value?: [number, number];
  /**
   * Triggered when the user changes the value of the slider.
   *
   * @param value The selected values.
   */
  onChange?: (value: [number, number]) => void;
};
