import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { ToggleProps } from "./types";

import { Toggle } from "./Toggle";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Toggle",
  component: Toggle as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    checked: { type: "boolean" },
  },
  args: {
    defaultChecked: false,
    disabled: false,
    "aria-label": "Label",
  },
} satisfies Meta<ToggleProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};
