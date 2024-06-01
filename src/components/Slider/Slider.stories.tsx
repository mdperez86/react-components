import type { Meta, StoryObj } from "@storybook/react";
import type { SliderProps } from "./types";

import { Slider } from "./Slider";
import { useState } from "react";

const meta = {
  title: "Components/Slider",
  component: Slider as React.FC,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<SliderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render(args) {
    const [value, setValue] = useState<[number, number]>();

    return <Slider {...args} value={value} onChange={setValue} />;
  },
};
