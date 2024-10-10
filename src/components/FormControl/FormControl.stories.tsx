import { useState } from "@storybook/preview-api";
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
import { DateField } from "../DateField";
import { ColorField } from "../ColorField";
import { FileField } from "../FileField";

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
} as Meta<FormControlProps>;

export default meta;
type Story<T = HTMLInputElement> = StoryObj<Meta<FormControlProps<T>>>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithInputField: Story = {
  args: {
    renderControl(args) {
      return <InputField {...args} />;
    },
  },
};

export const WithTextAreaField: Story<HTMLTextAreaElement> = {
  args: {
    renderControl(props) {
      return <TextAreaField {...props} />;
    },
  },
};

export const WithDateField: Story = {
  render(args) {
    const [value, onChange] = useState<Date | undefined>(undefined);

    function renderControl(props: {}) {
      return <DateField {...props} value={value} onChange={onChange} />;
    }

    return <FormControl {...args} renderControl={renderControl} />;
  },
};

const lorem = new LoremIpsum();
const options = Array.from({ length: 10 }).map(() => lorem.generateWords(2));

export const WithCombobox: Story = {
  render(args) {
    const [value, onChange] = useState<string | undefined>(undefined);

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

export const WithRadioButton: Story = {
  args: {
    renderControl(props) {
      return <RadioButton {...props} />;
    },
  },
};

export const WithRadioGroup: Story = {
  args: {
    label: "Gender",
    renderControl({ ref, ...props }) {
      return (
        <div {...props} role="radiogroup" className="flex gap-4">
          <FormControl
            label="Male"
            renderControl={(props) => (
              <RadioButton {...props} name="gender" value="male" />
            )}
          />

          <FormControl
            label="Female"
            renderControl={(props) => (
              <RadioButton {...props} name="gender" value="female" />
            )}
          />
        </div>
      );
    },
  },
};

export const WithCheckBox: Story = {
  args: {
    renderControl(props) {
      return <CheckBox {...props} />;
    },
  },
};

export const WithToggle: Story = {
  args: {
    labelPosition: "left",
    renderControl(props) {
      return <Toggle {...props} />;
    },
  },
};

export const WithColorField: Story = {
  args: {
    labelPosition: "right",
    renderControl(props) {
      return <ColorField {...props} />;
    },
  },
};

export const WithFileField: Story = {
  args: {
    renderControl(props) {
      return <FileField {...props} />;
    },
  },
};
