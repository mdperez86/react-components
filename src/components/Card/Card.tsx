import { type Ref, forwardRef } from "react";
import classNames from "classnames";
import { type CardProps } from "./types";

export const Card = forwardRef(function ForwardedCard(
  { className, ...props }: CardProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={classNames(className, "shadow-md rounded-lg bg-white")}
    />
  );
});
