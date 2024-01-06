import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export type ListBoxProps = Omit<ListBoxGroupProps, "value" | "onChange"> & {
  value?: string;
  onChange?(value: string): void;
};

export type ListBoxGroupProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  header?: ReactNode;
};

export type ListBoxOptionProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  icon?: ReactNode;
};
