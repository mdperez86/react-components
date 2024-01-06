import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { ListBoxProps } from "./types";

import { ListBox } from "./ListBox";
import { ListBoxOption } from "./ListBoxOption";
import { ListBoxGroup } from "./ListBoxGroup";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/ListBox",
  component: ListBox as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {},
} satisfies Meta<ListBoxProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
  render(args) {
    const [value, onChange] = useState("1");
    return (
      <ListBox {...args} value={value} onChange={onChange}>
        <ListBoxOption>Item 1</ListBoxOption>
        <ListBoxOption>Item 2</ListBoxOption>
        <ListBoxOption>Item 3</ListBoxOption>
      </ListBox>
    );
  },
};

export const WithHeader: Story = {
  args: {},
  render(args) {
    const [value, onChange] = useState("1");
    return (
      <ListBox {...args} value={value} onChange={onChange} header="List header">
        <ListBoxOption>Item 1</ListBoxOption>
        <ListBoxOption>Item 2</ListBoxOption>
        <ListBoxOption>Item 3</ListBoxOption>
      </ListBox>
    );
  },
};

export const WithGoups: Story = {
  args: {},
  render(args) {
    const [value, onChange] = useState("1.1");
    return (
      <ListBox {...args} value={value} onChange={onChange} header="List header">
        <ListBoxGroup header="Group header">
          <ListBoxOption>Item 1.1</ListBoxOption>
          <ListBoxOption>Item 1.2</ListBoxOption>
          <ListBoxOption>Item 1.2</ListBoxOption>
        </ListBoxGroup>
        <ListBoxGroup header="Group header">
          <ListBoxOption>Item 2.1</ListBoxOption>
          <ListBoxOption>Item 2.2</ListBoxOption>
          <ListBoxOption>Item 2.2</ListBoxOption>
        </ListBoxGroup>
      </ListBox>
    );
  },
};
