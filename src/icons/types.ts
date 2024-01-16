import { type BaseSize } from "..";

export type IconProps = React.SVGProps<SVGSVGElement> & {
  /**
   * Translated into a width and height of the icon.
   *
   * @default sm
   */
  size?: BaseSize;
};
