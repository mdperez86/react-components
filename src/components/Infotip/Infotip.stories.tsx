import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { InfotipProps } from "./types";

import { Infotip } from "./Infotip";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Infotip",
  component: Infotip as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {
    children: "The infotip text",
  },
} satisfies Meta<InfotipProps>;

export default meta;
type Story = StoryObj<Meta<Partial<InfotipProps>>>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};
