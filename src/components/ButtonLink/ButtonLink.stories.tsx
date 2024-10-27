import type { Meta, StoryObj } from "@storybook/react";
import { HomeIcon } from "@this/icons";
import type { ButtonLinkProps } from "./types";

import { ButtonLink } from "./ButtonLink";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/ButtonLink",
  component: ButtonLink as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {
    href: "#",
    children: "Button",
    disabled: false,
  },
} satisfies Meta<ButtonLinkProps>;

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

export const SecondaryColor: Story = {
  args: {
    hierarchy: "secondary color",
  },
};

export const Tertiary: Story = {
  args: {
    hierarchy: "tertiary",
  },
};

export const TertiaryColor: Story = {
  args: {
    hierarchy: "tertiary color",
  },
};

export const WithIcon: Story = {
  args: {
    icon: "leading",
  },
  render(args) {
    return (
      <ButtonLink {...args}>
        <HomeIcon />
        <span>Button</span>
      </ButtonLink>
    );
  },
};

export const IconOnly: Story = {
  args: {
    icon: "only",
  },
  render(args) {
    return (
      <ButtonLink {...args}>
        <HomeIcon />
      </ButtonLink>
    );
  },
};
