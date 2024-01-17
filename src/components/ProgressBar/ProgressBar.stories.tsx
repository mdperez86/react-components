import type { Meta, StoryObj } from "@storybook/react";
import type { ProgressBarProps } from "./types";

import { ProgressBar } from "./ProgressBar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {},
} satisfies Meta<ProgressBarProps>;

export default meta;
type Story = StoryObj<Meta<Partial<ProgressBarProps>>>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithValue: Story = {
  args: {
    value: 80,
    "aria-label": "Active users",
  },
  render(args) {
    return <ProgressBar {...args} />;
  },
};

export const Indeterminate: Story = {
  args: {
    id: "progress-1",
    "aria-label": "Content loading...",
  },
  render(args) {
    return (
      <>
        <div aria-busy="true" aria-describedby={args.id}>
          Busy content
        </div>

        <ProgressBar {...args} />
      </>
    );
  },
};

export const WithValueAndLabel: Story = {
  args: {
    value: 80,
    "aria-label": "Active users",
    renderLabel(formattedValue) {
      return `(${formattedValue}) active users`;
    },
  },
  render(args) {
    return <ProgressBar {...args} />;
  },
};
