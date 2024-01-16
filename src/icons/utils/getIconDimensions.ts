import { type BaseSize } from "@this/types";
import { type IconProps } from "../types";

export const SIZE_MAP: Record<BaseSize, number> = {
  xs: 4 * 3,
  sm: 4 * 4,
  md: 4 * 5,
  lg: 4 * 6,
  xl: 4 * 7,
  "2xl": 4 * 8,
};

export function getIconDimensions(
  size: BaseSize,
): Pick<IconProps, "width" | "height"> {
  return {
    width: SIZE_MAP[size],
    height: SIZE_MAP[size],
  };
}
