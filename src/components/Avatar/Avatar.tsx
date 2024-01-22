import { type Ref, forwardRef, type ReactNode } from "react";
import classNames from "classnames";
import { UserIcon } from "@this/icons";
import { type AvatarProps } from "./types";

export const Avatar = forwardRef(function ForwardedAvatar(
  { size = "md", url, alt, className, ...props }: AvatarProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      ref={ref}
      aria-label={url ? alt : undefined}
      className={classNames(
        className,
        "bg-primary-50 text-primary-600",
        "rounded-full aspect-square",
        "flex items-center justify-center",
        "bg-center bg-cover bg-no-repeat",
        {
          "h-6": size === "xs",
          "h-8": size === "sm",
          "h-10": size === "md",
          "h-12": size === "lg",
          "h-14": size === "xl",
          "h-16": size === "2xl",
        },
      )}
      style={{
        backgroundImage: url ? `url(${url})` : undefined,
      }}
    >
      {renderChildren()}
    </div>
  );

  function renderChildren(): ReactNode {
    if (url) return undefined;

    return alt ? renderText() : renderPlaceholder();
  }

  function renderText(): ReactNode {
    return (
      <abbr
        className={classNames("uppercase font-medium", {
          "text-xs": size === "xs",
          "text-sm": size === "sm",
          "text-base": size === "md",
          "text-lg": size === "lg",
          "text-xl": size === "xl",
          "text-2xl": size === "2xl",
        })}
      >
        {alt}
      </abbr>
    );
  }

  function renderPlaceholder(): ReactNode {
    return <UserIcon size={size} />;
  }
});
