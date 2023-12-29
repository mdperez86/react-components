import type { Meta, StoryObj } from "@storybook/react";
import { Colors } from "./Colors";
import { error, gray, primary, success, warning } from "../../colors";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Foundations/Colors/Primary",
  component: Colors,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Gray: Story = {
  args: {
    name: "Gray",
    colors: gray,
  },
};

export const Primary: Story = {
  args: {
    name: "Primary",
    colors: primary,
  },
};

export const Error: Story = {
  args: {
    name: "Error",
    colors: error,
  },
};

export const Warning: Story = {
  args: {
    name: "Warning",
    colors: warning,
  },
};

export const Success: Story = {
  args: {
    name: "Success",
    colors: success,
  },
};
