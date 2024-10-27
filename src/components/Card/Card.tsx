import { type Ref, forwardRef } from "react";
import clsx from "clsx";
import { type CardProps } from "./types";

export const Card = forwardRef(function ForwardedCard(
  { className, ...props }: CardProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(className, "shadow-md rounded-lg bg-white")}
    />
  );
});
