import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  type CSSProperties,
} from "react";

export type InfotipProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
> & {
  /**
   * The position where the infotip is going to be shown relative to
   * its arrow.
   *
   * @default top
   */
  position?: "top" | "right" | "bottom" | "left" | "top left" | "top right";
  /**
   * The `x` coordinate relative to the edge of the arrow.
   */
  x?: CSSProperties["left"];
  /**
   * The `y` coordinate relative to the edge of the arrow.
   */
  y?: CSSProperties["top"];
};
