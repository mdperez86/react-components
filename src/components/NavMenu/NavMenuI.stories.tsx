import type { Meta, StoryObj } from "@storybook/react";
import type { NavMenuProps } from "./types";

import { HomeIcon, UserIcon } from "@this/icons";
import { NavMenu } from "./NavMenu";
import { NavMenuItem } from "./NavMenuItem";
import { Dropdown } from "../Dropdown";

const meta: Meta<NavMenuProps> = {
  title: "Components/NavMenu",
  component: NavMenu as React.FC,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NavMenu>;

export const Default: Story = {
  args: {
    "aria-label": "Company",
  },
  render(args) {
    return (
      <NavMenu {...args}>
        <NavMenuItem
          href="#"
          text="About us"
          renderIcon={({ ref, ...props }) => <HomeIcon {...props} />}
        />
        <NavMenuItem
          href="#"
          text="Careers"
          badge="We're hiring!"
          renderIcon={({ ref, ...props }) => <UserIcon {...props} />}
        />
      </NavMenu>
    );
  },
};
