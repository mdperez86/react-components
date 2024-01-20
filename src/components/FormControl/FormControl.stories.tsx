import { useState } from "react";
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
  component: FormControl,
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
type Story<T extends HTMLObjectElement = HTMLInputElement & HTMLObjectElement> =
  StoryObj<Meta<FormControlProps<T>>>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithInputField: Story = {
  args: {
    renderControl(args) {
      return <InputField {...args} />;
    },
  },
};

const lorem = new LoremIpsum();
const options = Array.from({ length: 10 }).map(() => lorem.generateWords(2));

export const WithComboboxButton: Story = {
  render(args) {
    const [value, onChange] = useState<string>();

    function renderControl(props: {}) {
      return (
        <Combobox
          {...props}
          options={options}
          value={value}
          onChange={onChange}
        />
      );
    }

    return <FormControl {...args} renderControl={renderControl} />;
  },
};

export const WithTextAreaField: Story<HTMLTextAreaElement & HTMLObjectElement> =
  {
    args: {
      renderControl(props) {
        return <TextAreaField {...props} />;
      },
    },
  };

export const WithRadioButton: Story = {
  args: {
    renderControl(props) {
      return <RadioButton {...props} />;
    },
  },
};

export const WithCheckBoxButton: Story = {
  args: {
    renderControl(props) {
      return <CheckBox {...props} />;
    },
  },
};

export const WithToggleButton: Story = {
  args: {
    labelPosition: "left",
    renderControl(props) {
      return <Toggle {...props} />;
    },
  },
};
