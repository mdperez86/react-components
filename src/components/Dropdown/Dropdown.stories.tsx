import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import type {
  DropdownProps,
  DropdownToggleProps,
  DropdownPopupProps,
} from "./types";

import { Button } from "../Button";
import { Dropdown } from "./Dropdown";
import { ListBox, ListBoxOption } from "../ListBox";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Dropdown",
  component: Dropdown as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {
    renderToggle({
      expanded,
      toggle,
      ...props
    }: DropdownToggleProps<HTMLButtonElement>) {
      return (
        <Button {...props} onClick={toggle}>
          Toggle
        </Button>
      );
    },
    renderPopup({
      expanded,
      collapse,
      ...attrs
    }: DropdownPopupProps<HTMLDivElement>) {
      return (
        <ListBox {...attrs} value={undefined} onChange={undefined}>
          <ListBoxOption>Item 1</ListBoxOption>
          <ListBoxOption>Item 2</ListBoxOption>
          <ListBoxOption>Item 3</ListBoxOption>
        </ListBox>
      );
    },
    onCollapsed: fn(),
    onExpanded: fn(),
    onToggled: fn(),
  },
} satisfies Meta<DropdownProps<HTMLButtonElement, HTMLDivElement>>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};
