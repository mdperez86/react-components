import {
  type AriaAttributes,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type TooltipProps<T = HTMLDivElement> = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  /**
   * The toggle component.
   *
   * @param attrs The trigger props.
   */
  renderTrigger: (attrs: TooltipTriggerProps<T>) => ReactNode;
  /**
   * The position where the tooltip is going to be shown.
   *
   * @default top
   */
  position?: "top" | "right" | "bottom" | "left" | "top left" | "top right";
};

export type TooltipTriggerProps<T = HTMLDivElement> = AriaAttributes &
  DetailedHTMLProps<HTMLAttributes<T>, T>;
