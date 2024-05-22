import type { Meta, StoryObj } from "@storybook/react";
import { HomeIcon } from "@this/icons";
import type { BadgeProps } from "./types";

import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge as React.FC,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {
    children: "Badge",
  },
} satisfies Meta<BadgeProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args) {
    return <Badge {...args} />;
  },
};

export const AllSizes: Story = {
  render(args) {
    return (
      <div className="inline-flex items-center gap-2">
        <Badge size="xs" {...args} />
        <Badge size="sm" {...args} />
        <Badge size="md" {...args} />
        <Badge size="lg" {...args} />
        <Badge size="xl" {...args} />
        <Badge size="2xl" {...args} />
      </div>
    );
  },
};

export const WithIcon: Story = {
  render(args) {
    return (
      <div className="inline-flex items-center gap-2">
        <Badge {...args}>
          <HomeIcon />
          <span>Button</span>
        </Badge>

        <Badge {...args}>
          <span>Button</span>
          <HomeIcon />
        </Badge>
      </div>
    );
  },
};
