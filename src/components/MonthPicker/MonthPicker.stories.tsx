import { useState } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import type { MonthPickerProps } from "./types";

import { MonthPicker } from "./MonthPicker";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/MonthPicker",
  component: MonthPicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {},
} as Meta<MonthPickerProps>;

export default meta;
type Story = StoryObj<Meta<MonthPickerProps>>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render(args) {
    const [value, onChange] = useState<number | undefined>(undefined);

    return <MonthPicker {...args} value={value} onChange={onChange} />;
  },
};
