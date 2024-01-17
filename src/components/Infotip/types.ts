import { type DetailedHTMLProps, type HTMLAttributes } from "react";

export type InfotipProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
> & {
  /**
   * The position where the infotip is going to be shown.
   *
   * @default top
   */
  position?: "top" | "right" | "bottom" | "left" | "top left" | "top right";
};
