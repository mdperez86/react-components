import { type BaseSize } from "@this/types";

export type AvatarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  /**
   * Defines the visual size of the avatar.
   *
   * @default md
   */
  size?: BaseSize;
  /**
   * The url of the image resource to use as the avatar.
   */
  url?: string;
  /**
   * Used as the alt text for the image when the url is provided.
   * Or as the avatar text otherwise.
   */
  alt?: string;
};
