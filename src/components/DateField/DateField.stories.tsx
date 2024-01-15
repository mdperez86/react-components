import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { DateFieldProps } from "./types";

import { DateField } from "./DateField";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/DateField",
  component: DateField as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {},
} satisfies Meta<DateFieldProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
  render(args) {
    const [value, onChange] = useState<Date>();

    return <DateField {...args} value={value} onChange={onChange} />;
  },
};
