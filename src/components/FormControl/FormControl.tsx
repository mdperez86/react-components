import {
  type Ref,
  forwardRef,
  useId,
  Children,
  cloneElement,
  isValidElement,
  useRef,
  useEffect,
  type ReactElement,
  type FormEvent,
  useState,
} from "react";
import classNames from "classnames";
import { type InputFieldProps } from "../InputField";
import { type FormControlProps } from "./types";

export const FormControl = forwardRef(function ForwardedFormControl(
  {
    label,
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
  const control = Children.only(children);
  const [validityMessage, setValidityMessage] = useState("");
  const hintTextId = useId();

  useEffect(setControlError, [errorText]);

  if (!isValidElement<InputFieldProps>(control)) return null;

  const hint = validityMessage || hintText;

  return (
    <div
      {...props}
      ref={ref}
      className={classNames(className, "group flex flex-col gap-1.5")}
    >
      <label
        htmlFor={control.props.id ?? controlId}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      {cloneElement(control, {
        ref: getControlRef(control),
        id: control.props.id ?? controlId,
        "aria-describedby": hintTextId,
        onInvalid: controlInvalidHandler(control),
      })}

      {hint && (
        <span
          id={hintTextId}
          aria-live="assertive"
          className={classNames(
            "text-sm text-gray-500 group-has-[:invalid]:text-error-500",
          )}
        >
          {hint}
        </span>
      )}
    </div>
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
