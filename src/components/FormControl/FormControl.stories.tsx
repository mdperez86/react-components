import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LoremIpsum } from "lorem-ipsum";
import type { FormControlProps } from "./types";

import { FormControl } from "./FormControl";
import { InputField } from "../InputField";
import { TextAreaField } from "../TextAreaField";
import { RadioButton } from "../RadioButton";
import { CheckBox } from "../CheckBox";
import { Toggle } from "../Toggle";
import { Combobox } from "../Combobox";

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
      <FormControl {...args}>
        <InputField />
      </FormControl>
    );
  },
};

const lorem = new LoremIpsum();
const options = Array.from({ length: 10 }).map(() => lorem.generateWords(2));

export const WithComboboxButton: Story = {
  args: {},
  render(args) {
    const [value, onChange] = useState<string>("");
    return (
      <FormControl {...args}>
        <Combobox options={options} value={value} onChange={onChange} />
      </FormControl>
    );
  },
};

export const WithTextAreaField: Story = {
  args: {},
  render(args) {
    return (
      <FormControl {...args}>
        <TextAreaField />
      </FormControl>
    );
  },
};

export const WithRadioButton: Story = {
  args: {},
  render(args) {
    return (
      <FormControl {...args}>
        <RadioButton />
      </FormControl>
    );
  },
};

export const WithCheckBoxButton: Story = {
  args: {},
  render(args) {
    return (
      <FormControl {...args}>
        <CheckBox />
      </FormControl>
    );
  },
};

export const WithToggleButton: Story = {
  args: {
    labelPosition: "left",
  },
  render(args) {
    return (
      <FormControl {...args}>
        <Toggle />
      </FormControl>
    );
  },
};
