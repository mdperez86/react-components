import {
  type AriaAttributes,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { type InfotipProps } from "../Infotip";

export type TooltipProps<T = HTMLDivElement> = InfotipProps & {
  /**
   * The toggle component.
   *
   * @param attrs The trigger props.
   */
  renderTrigger: (attrs: TooltipTriggerProps<T>) => ReactNode;
};

export type TooltipTriggerProps<T = HTMLDivElement> = AriaAttributes &
  DetailedHTMLProps<HTMLAttributes<T>, T>;
