import { type Ref, forwardRef, useId } from "react";
import type { NavMenuProps } from "./types";

export const NavMenu = forwardRef(function ForwardedNavMenu(
  { id, children, ...props }: NavMenuProps,
  ref: Ref<HTMLAnchorElement>,
) {
  const generatedId = useId();
  const navId = id ?? generatedId;

  return (
    <nav {...props} ref={ref} id={navId}>
      <ul role="menubar" aria-labelledby={navId} className="flex">
        {children}
      </ul>
    </nav>
  );
});
