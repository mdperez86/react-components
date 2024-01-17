export type ProgressBarProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
> & {
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
   * When `undefined` the progress bar will be cosidered
   * `indeterminate`.
   *
   * If the progress bar is describing the loading progress of a
   * particular region of a page, authors SHOULD both use
   * `aria-describedby` to reference the progressbar status, and
   * set the `aria-busy` attribute to `true` on the region until
   * it is finished loading.
   */
  value?: number;
  /**
   * The position of the label.
   *
   * @default floating top
   */
  labelPosition?: "right" | "bottom" | "floating top" | "floating bottom";
};
