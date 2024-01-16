import type { Meta, StoryObj } from "@storybook/react";
import { Home } from "@this/icons";
import type { AvatarProps } from "./types";

import { Avatar } from "./Avatar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Avatar",
  component: Avatar as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {},
} satisfies Meta<AvatarProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};

export const WithImage: Story = {
  args: {
    url: "https://avatars.githubusercontent.com/u/13334210?v=4",
    alt: "The name on the avatar",
  },
};

export const WithText: Story = {
  args: {
    alt: "md",
  },
};
