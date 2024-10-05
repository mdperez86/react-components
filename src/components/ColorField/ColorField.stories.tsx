import { ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";

import { ColorField } from "./ColorField";
import type { ColorFieldProps } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/ColorField",
  component: ColorField as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {
    placeholder: "Placeholder",
    disabled: false,
    onChange: fn(),
  },
} satisfies Meta<ColorFieldProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};

export const Controlled: Story = {
  args: {
    value: "#00ff00",
  },
  render: function Render(args) {
    const [{ value, onChange }, updateArgs] = useArgs();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      updateArgs({ value: e.target.value });
      onChange(e);
    }

    return <ColorField {...args} value={value} onChange={handleChange} />;
  },
};
