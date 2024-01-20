import React, { useLayoutEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LoremIpsum } from "lorem-ipsum";
import type { ComboboxProps } from "./types";

import { User } from "../../icons";
import { Combobox, ListBoxOption } from "../index";

const lorem = new LoremIpsum();

export type Option = { value: number; text: string };

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Combobox",
  component: Combobox<Option>,
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
    options: Array.from({ length: 30 }).map((_, index) => ({
      value: index,
      text: lorem.generateWords(3),
    })),
    getOptionValue(option) {
      return String(option.value);
    },
    getOptionText(option) {
      return option.text;
    },
  },
} satisfies Meta<ComboboxProps<Option>>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SelectOnly: Story = {
  render(args) {
    const [value, onChange] = useState<Option>();
    return <Combobox {...args} value={value} onChange={onChange} />;
  },
};

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <User />,
    renderOption({ option, text, ...props }) {
      return (
        <ListBoxOption {...props} icon={<User />}>
          {text}
        </ListBoxOption>
      );
    },
  },
  render(args) {
    const [value, onChange] = useState<Option>();
    return <Combobox {...args} value={value} onChange={onChange} />;
  },
};

export const Invalid: Story = {
  args: {
    leadingIcon: <User />,
  },
  render(args) {
    const ref = useRef<HTMLInputElement>(null);
    const [value, onChange] = useState<Option>();

    useLayoutEffect(() => {
      if (ref.current) {
        ref.current.setCustomValidity("Invalid");
      }
    }, []);

    return <Combobox {...args} ref={ref} value={value} onChange={onChange} />;
  },
};

export const Autocomplete: Story = {
  args: {
    type: "autocomplete",
  },
  render(args) {
    const [value, onChange] = useState<Option>();
    const [options, setOptions] = useState(args.options ?? []);

    return (
      <Combobox
        {...args}
        options={options}
        value={value}
        onChange={onChange}
        onSearch={onSearch}
      />
    );

    function onSearch(value: string) {
      setOptions(
        (args.options ?? []).filter((option) =>
          option.text.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    }
  },
};
