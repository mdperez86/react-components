import { type BaseSize } from "@this/types";
import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type ProgressCircleProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
> & {
  /**
   * Defines the visual size of the progress circle.
   *
   * @default md
   */
  size?: BaseSize;
  /**
   * The starting angle in degrees.
   *
   * @default 90
   */
  start?: number;
  /**
   * Indicates the minimum progress indicator value.
   * If it is missing or not a number, it defaults to `0` (zero).
   *
   * @default 0
   */
  min?: number;
  /**
   * Indicates the maximum progress indicator value.
   * If it is missing or not a number, it defaults to `100`.
   *
   * @default 100
   */
  max?: number;
  /**
   * Indicates the current progress indicator value. It must be
   * greater than or equals to `min` and less than or equals to
   * `max`.
   *
   * When `undefined` the progress circle will be cosidered
   * `indeterminate`.
   *
   * If the progress circle is describing the loading progress of a
   * particular region of a page, authors SHOULD both use
   * `aria-describedby` to reference the progressbar status, and
   * set the `aria-busy` attribute to `true` on the region until
   * it is finished loading.
   */
  value?: number;
  /**
   * The locale used to format the `value` when rendering the
   * label.
   *
   * @default "en-US"
   */
  locale?: string;
  /**
   * Defines the label of the pregress circle.
   *
   * @param props The label props.
   */
  renderLabel?: (props: ProgressCircleLabelProps) => ReactNode;
};

export interface ProgressCircleLabelProps {
  /**
   * The formatted value.
   */
  formattedValue?: string;
  /**
   * The valid value.
   */
  value?: number;
}
