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

export const CurrencySlider: Story = {
  args: {
    labelPosition: "bottom floating",
    formatLabel(sliderValue: number) {
      return sliderValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
  render(args) {
    const [value, setValue] = useState<[number, number]>();

    return <Slider {...args} value={value} onChange={setValue} />;
  },
};

export const PercentageSlider: Story = {
  args: {
    labelPosition: "bottom",
    formatLabel(sliderValue: number) {
      return (sliderValue / 100).toLocaleString("en-US", {
        style: "percent",
      });
    },
  },
  render(args) {
    const [value, setValue] = useState<[number, number]>();

    return <Slider {...args} value={value} onChange={setValue} />;
  },
};

export const TemperatureSlider: Story = {
  args: {
    min: -50,
    max: 50,
    formatLabel(sliderValue: number) {
      return sliderValue.toLocaleString("en-US", {
        style: "unit",
        unit: "celsius",
      });
    },
  },
  render(args) {
    const [value, setValue] = useState<[number, number]>();

    return <Slider {...args} value={value} onChange={setValue} />;
  },
};
