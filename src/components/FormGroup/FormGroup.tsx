import { type ForwardedRef, forwardRef, useId } from "react";
import clsx from "clsx";
import type { FormGroupProps } from "./types";

export const FormGroup = forwardRef(function ForwardedFormGroup(
  {
    title,
    description,
    hintText,
    errorText,
    children,
    ...props
  }: FormGroupProps,
  ref: ForwardedRef<HTMLFieldSetElement>,
) {
  const descriptionId = useId();
  const hintTextId = useId();
  const hint = errorText ?? hintText;

  return (
    <fieldset
      {...props}
      ref={ref}
      aria-describedby={hint ? hintTextId : undefined}
    >
      <legend
        className="text-md font-medium text-gray-700"
        aria-describedby={description ? descriptionId : undefined}
      >
        {title}
      </legend>

      {description && (
        <p id={descriptionId} className="text-md text-gray-500">
          {description}
        </p>
      )}

      <div className="flex flex-col gap-1.5 py-2">{children}</div>

      {hint && (
        <span
          id={hintTextId}
          aria-live="assertive"
          className={clsx("text-sm text-gray-500", {
            "text-error-500": errorText,
          })}
        >
          {hint}
        </span>
      )}
    </fieldset>
  );
});
