import type { Meta, StoryObj } from "@storybook/react";
import { ProgressCircle } from "./ProgressCircle";
import { type ProgressCircleProps } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/ProgressCircle",
  component: ProgressCircle,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<ProgressCircleProps>;

export default meta;
type Story = StoryObj<Meta<Partial<ProgressCircleProps>>>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Indeterminate: Story = {
  args: {
    id: "progress-1",
    "aria-label": "Content loading...",
  },
  render(args) {
    return (
      <div aria-busy="true" aria-describedby={args.id}>
        <ProgressCircle {...args} />
      </div>
    );
  },
};

export const WithValue: Story = {
  args: {
    value: 25,
    "aria-label": "Active users",
  },
};

export const WithMinMaxValue: Story = {
  args: {
    min: -10,
    value: -3,
    max: 0,
    "aria-label": "Custom label",
  },
};

export const WithValueAndLabel: Story = {
  args: {
    min: 0,
    value: 300,
    max: 10000,
    renderLabel({ value }) {
      return <span>({value}) Active users</span>;
    },
  },
};
