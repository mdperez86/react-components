import { useState } from "@storybook/preview-api";
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
} as Meta<ListBoxProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
  render(args) {
    const [value, onChange] = useState("1");
    return (
      <ListBox {...args} value={value} onChange={onChange}>
        <ListBoxOption value="1.1">Item 1.1</ListBoxOption>
        <ListBoxOption value="1.2">Item 1.2</ListBoxOption>
        <ListBoxOption value="1.3">Item 1.3</ListBoxOption>
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
        <ListBoxOption value="1.1">Item 1.1</ListBoxOption>
        <ListBoxOption value="1.2">Item 1.2</ListBoxOption>
        <ListBoxOption value="1.3">Item 1.3</ListBoxOption>
      </ListBox>
    );
  },
};

export const WithGoups: Story = {
  args: {},
  render(args) {
    const [value, onChange] = useState<string | undefined>(undefined);
    return (
      <ListBox
        {...args}
        selectOnFocus={false}
        value={value}
        onChange={onChange}
        header="List header"
      >
        <ListBoxGroup header="Group header">
          <ListBoxOption value="1.1">Item 1.1</ListBoxOption>
          <ListBoxOption value="1.2">Item 1.2</ListBoxOption>
          <ListBoxOption value="1.3">Item 1.3</ListBoxOption>
        </ListBoxGroup>
        <ListBoxGroup header="Group header">
          <ListBoxOption value="2.1">Item 2.1</ListBoxOption>
          <ListBoxOption value="2.2">Item 2.2</ListBoxOption>
          <ListBoxOption value="2.3">Item 2.3</ListBoxOption>
        </ListBoxGroup>
      </ListBox>
    );
  },
};
