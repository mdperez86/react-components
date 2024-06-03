import type { Meta, StoryObj } from "@storybook/react";
import type { NavMenuItemProps } from "./types";

import { NavMenuItem } from "./NavMenuItem";
import { CalendarIcon } from "@this/icons";

const meta: Meta<NavMenuItemProps> = {
  title: "Components/NavMenu/Item",
  component: NavMenuItem as React.FC,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NavMenuItem>;

export const Default: Story = {
  args: {
    text: "Product",
  },
  render(args) {
    return (
      <nav>
        <ul role="menubar">
          <NavMenuItem {...args} />
        </ul>
      </nav>
    );
  },
};

export const WithIcon: Story = {
  args: {
    text: "Product",
    badge: "New",
    supportingText: "Find the best solution for you.",
    renderIcon({ ref, ...props }) {
      return <CalendarIcon {...props} />;
    },
  },
  render(args) {
    return (
      <nav>
        <ul role="menubar">
          <NavMenuItem {...args} />
        </ul>
      </nav>
    );
  },
};
