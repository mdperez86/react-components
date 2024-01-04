import {
  type FormEvent,
  type ReactElement,
  type Ref,
  forwardRef,
  useId,
  Children,
  cloneElement,
  isValidElement,
  useRef,
  useEffect,
  useState,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import classNames from "classnames";
import { RadioButton } from "../RadioButton";
import { CheckBox } from "../CheckBox";
import { BottomLayout, LeftLayout, RightLayout, TopLayout } from "./layouts";
import { type InputFieldProps } from "../InputField";
import { type LayoutProps, type FormControlProps } from "./types";

export const FormControl = forwardRef(function ForwardedFormControl(
  {
    label,
    labelPosition,
    hintText,
    errorText,
    className,
    children,
    ...props
  }: FormControlProps,
  ref: Ref<HTMLDivElement>,
) {
  const controlId = useId();
  const controlRef = useRef<HTMLInputElement>();
  const child = Children.only(children);
  const [validityMessage, setValidityMessage] = useState("");
  const hintTextId = useId();

  useEffect(setControlError, [errorText]);

  if (!isValidElement<InputFieldProps>(child)) return null;

  const hint = validityMessage || hintText;

  const Layout = getLayout(labelPosition, child);

  return (
    <Layout
      {...props}
      ref={ref}
      label={
        <label
          htmlFor={child.props.id ?? controlId}
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
            className={classNames(
              "text-sm text-gray-500 group-has-[:invalid]:text-error-500",
            )}
          >
            {hint}
          </span>
        )
      }
    >
      {cloneElement(child, {
        ref: getControlRef(child),
        id: child.props.id ?? controlId,
        "aria-describedby": hintTextId,
        onInvalid: controlInvalidHandler(child),
      })}
    </Layout>
  );

  function setControlError(): void {
    if (errorText && controlRef.current) {
      controlRef.current.setCustomValidity(errorText);
      setValidityMessage(errorText);
    }
  }

  function getControlRef(control: ReactElement<InputFieldProps>) {
    return function setControlRef(el: HTMLInputElement) {
      controlRef.current = el;
      if (typeof control.props.ref === "function") {
        control.props.ref(el);
      }
    };
  }

  function controlInvalidHandler(control: ReactElement<InputFieldProps>) {
    return function handleControlInvalid(event: FormEvent<HTMLInputElement>) {
      const { onInvalid } = control.props;
      onInvalid && onInvalid(event);

      setValidityMessage(event.currentTarget.validationMessage);
    };
  }
});

function getLayout(
  labelPosition: FormControlProps["labelPosition"],
  child: ReactElement,
): ForwardRefExoticComponent<
  Omit<LayoutProps, "ref"> & RefAttributes<HTMLDivElement>
> {
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
