import { type Ref, forwardRef } from "react";
import classNames from "classnames";
import { type CardProps } from "./types";

export const Card = forwardRef(function ForwardedCard(
  { className, onClick, ...props }: CardProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={classNames(
        className,
        "shadow-md rounded-lg overflow-hidden bg-white border border-gray-200",
      )}
    />
  );
});
