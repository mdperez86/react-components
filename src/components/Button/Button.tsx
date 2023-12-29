import React from "react";
import { ButtonProps } from "./types";

export function Button(props: ButtonProps) {
  return <button {...props} />;
}
