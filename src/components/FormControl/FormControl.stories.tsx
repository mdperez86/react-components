import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { FormControlProps } from "./types";

import { FormControl } from "./FormControl";
import { InputField } from "../InputField";
import { TextAreaField } from "../TextAreaField";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/FormControl",
  component: FormControl as React.FC<FormControlProps>,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {
    label: "Label",
    hintText: "This is a hint text to help user.",
  },
} satisfies Meta<FormControlProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithInputField: Story = {
  args: {},
  render(args) {
    return (
      <FormControl {...args} ref={undefined}>
        <InputField />
      </FormControl>
    );
  },
};

export const WithTextAreaField: Story = {
  args: {},
  render(args) {
    return (
      <FormControl {...args} ref={undefined}>
        <TextAreaField />
      </FormControl>
    );
  },
};
