import type { Meta, StoryObj } from "@storybook/react";
import { Home } from "@this/icons";
import type { ButtonProps } from "./types";

import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Button",
  component: Button as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {
    children: "Button",
    disabled: false,
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    hierarchy: "primary",
  },
};

export const Secondary: Story = {
  args: {
    hierarchy: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    hierarchy: "tertiary",
  },
};

export const WithIcon: Story = {
  args: {
    icon: "leading",
  },
  render(args) {
    return (
      <Button {...args}>
        <Home />
        <span>Button</span>
      </Button>
    );
  },
};

export const IconOnly: Story = {
  args: {
    icon: "only",
  },
  render(args) {
    return (
      <Button {...args}>
        <Home />
      </Button>
    );
  },
};
