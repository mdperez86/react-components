import type { Meta, StoryObj } from "@storybook/react";
import type { FormGroupProps } from "./types";

import { FormGroup } from "./FormGroup";
import { FormControl } from "../FormControl";
import { RadioButton } from "../RadioButton";
import { CheckBox } from "../CheckBox";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/FormGroup",
  component: FormGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {
    title: "The title",
    description: "The description.",
    hintText: "This is a hint text to help user.",
  },
} as Meta<FormGroupProps>;

export default meta;
type Story = StoryObj<Meta<FormGroupProps>>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const RadioGroup: Story = {
  args: {
    children: [
      <FormControl
        key={1}
        label="Option 1"
        renderControl={(props) => (
          <RadioButton {...props} name="option" value="1" />
        )}
      />,
      <FormControl
        key={2}
        label="Option 2"
        renderControl={(props) => (
          <RadioButton {...props} name="option" value="2" />
        )}
      />,
    ],
  },
};

export const CheckBoxGroup: Story = {
  args: {
    children: [
      <FormControl
        key={1}
        label="Option 1"
        renderControl={(props) => (
          <CheckBox {...props} name="option" value="1" />
        )}
      />,
      <FormControl
        key={2}
        label="Option 2"
        renderControl={(props) => (
          <CheckBox {...props} name="option" value="2" />
        )}
      />,
    ],
  },
};
