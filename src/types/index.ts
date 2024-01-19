declare module "react" {
  function forwardRef<T, P = Record<string, unknown>>(
    render: (props: P, ref: React.ForwardedRef<T>) => React.ReactNode | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}

export type BaseSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
