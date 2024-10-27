import {
  type FormEvent,
  type ReactElement,
  type ForwardedRef,
  type RefAttributes,
  type FC,
  forwardRef,
  useId,
  useRef,
  useEffect,
  useState,
  isValidElement,
} from "react";
import clsx from "clsx";
import { RadioButton } from "../RadioButton";
import { CheckBox } from "../CheckBox";
import { BottomLayout, LeftLayout, RightLayout, TopLayout } from "./layouts";
import type { LayoutProps, FormControlProps } from "./types";

export const FormControl = forwardRef(function ForwardedFormControl<
  T extends HTMLElement = HTMLInputElement,
>(
  {
    label,
    labelPosition,
    hintText,
    errorText,
    className,
    children: _,
    renderControl,
    ...props
  }: FormControlProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const controlRef = useRef<T>(null);
  const controlId = useId();
  const hintTextId = useId();
  const child = renderControl({
    ref: controlRef,
    id: controlId,
    "aria-describedby": hintTextId,
    onInvalid: handleControlInvalid,
  });
  const [validityMessage, setValidityMessage] = useState<string>();

  useEffect(setControlError, [errorText]);

  if (!isValidElement(child)) return null;

  const hint = validityMessage ?? hintText;

  const Layout = getLayout(labelPosition, child);

  return (
    <Layout
      {...props}
      ref={ref}
      className={clsx(className, "group/control")}
      label={
        <label
          htmlFor={controlId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      }
      hint={
        hint && (
          <span
            id={hintTextId}
            aria-live="assertive"
            className={clsx(
              "text-sm text-gray-500 group-has-[:invalid]/control:text-error-500",
            )}
          >
            {hint}
          </span>
        )
      }
    >
      {child}
    </Layout>
  );

  function setControlError(): void {
    if (controlRef.current && "setCustomValidity" in controlRef.current) {
      const objectElement: HTMLObjectElement = controlRef.current as never;
      objectElement.setCustomValidity(errorText ?? "");
      setValidityMessage(errorText);
    }
  }

  function handleControlInvalid(event: FormEvent<T>): void {
    const objectElement: HTMLObjectElement = event.currentTarget as never;
    setValidityMessage(objectElement.validationMessage);
  }
});

function getLayout(
  labelPosition: FormControlProps["labelPosition"],
  child: ReactElement,
): FC<LayoutProps & RefAttributes<HTMLDivElement>> {
  let position = labelPosition;

  const isLabelOnRight = child.type === RadioButton || child.type === CheckBox;
  if (!position && isLabelOnRight) {
    position = "right";
  }

  switch (position) {
    case "right":
      return RightLayout;
    case "bottom":
      return BottomLayout;
    case "left":
      return LeftLayout;
    default:
      return TopLayout;
  }
}
