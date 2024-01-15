import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { DatePickerProps } from "./types";

import { DatePicker } from "./DatePicker";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/DatePicker",
  component: DatePicker as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {},
} satisfies Meta<DatePickerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
  render(args) {
    const [value, onChange] = useState<Date>();

    return <DatePicker {...args} value={value} onChange={onChange} />;
  },
};
