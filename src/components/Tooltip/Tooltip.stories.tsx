import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { TooltipProps } from "./types";

import { Tooltip } from "./Tooltip";
import { Button } from "../Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Tooltip",
  component: Tooltip as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {
    renderTrigger(args) {
      return (
        <Button {...args} ref={args.ref as never}>
          Toggle
        </Button>
      );
    },
    children: "The tooltip text",
  },
} satisfies Meta<TooltipProps<HTMLButtonElement>>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};
