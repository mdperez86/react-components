import { ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "@storybook/preview-api";
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
  argTypes: {
    defaultValue: {
      type: "string",
    },
    value: {
      type: "string",
    },
  },
  args: {
    placeholder: "Placeholder",
    disabled: false,
    onChange: fn(),
  },
} as Meta<ColorFieldProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    defaultValue: "#ff0000",
  },
};

export const Controlled: Story = {
  args: {
    value: "#00ff00",
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      setValue(e.target.value);
      args.onChange?.(e);
    }

    return <ColorField {...args} value={value} onChange={handleChange} />;
  },
};
