import React, { useEffect, useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { RadioButtonProps } from "./types";

import { HomeIcon } from "../../stories/buttons/HomeIcon";
import { RadioButton } from "./RadioButton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/RadioButton",
  component: RadioButton as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {
    checked: false,
    disabled: false,
  },
} satisfies Meta<RadioButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
    "aria-label": "Label",
  },
};