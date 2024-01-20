import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { YearPickerProps } from "./types";

import { YearPicker } from "./YearPicker";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/YearPicker",
  component: YearPicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {},
} satisfies Meta<YearPickerProps>;

export default meta;
type Story = StoryObj<Meta<YearPickerProps>>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render(args) {
    const [value, onChange] = useState<number>();

    return <YearPicker {...args} value={value} onChange={onChange} />;
  },
};
