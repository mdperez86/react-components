import React, { useLayoutEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LoremIpsum } from "lorem-ipsum";
import type { ComboboxProps } from "./types";

import { User } from "../../icons";
import { Combobox } from "../index";

const lorem = new LoremIpsum();

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Combobox",
  component: Combobox as React.FC,
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
} satisfies Meta<ComboboxProps<{ value: number; text: string }>>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render(args) {
    const [value, onChange] = useState("");
    return <Combobox {...args} value={value} onChange={onChange} />;
  },
};

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <User />,
  },
  render(args) {
    const [value, onChange] = useState("");
    return <Combobox {...args} value={value} onChange={onChange} />;
  },
};

export const Invalid: Story = {
  args: {
    leadingIcon: <User />,
  },
  render(args) {
    const ref = useRef<HTMLInputElement>(null);
    const [value, onChange] = useState("");

    useLayoutEffect(() => {
      if (ref.current) {
        ref.current.setCustomValidity("Invalid");
      }
    }, []);

    return <Combobox {...args} ref={ref} value={value} onChange={onChange} />;
  },
};
