import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { DropDownMenuProps } from "./types";

import {
  DropDownMenu,
  DropDownMenuGroup,
  DropDownMenuItem,
} from "./DropDownMenu";
import { CheckIcon } from "../../icons";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/DropDownMenu",
  component: DropDownMenu as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {},
} satisfies Meta<DropDownMenuProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
  render(args) {
    return (
      <DropDownMenu {...args}>
        <DropDownMenuItem>Item 1</DropDownMenuItem>
        <DropDownMenuItem>Item 2</DropDownMenuItem>
        <DropDownMenuItem>Item 3</DropDownMenuItem>
      </DropDownMenu>
    );
  },
};

export const WithHeader: Story = {
  args: {},
  render(args) {
    return (
      <DropDownMenu {...args} header={<span>Header</span>}>
        <DropDownMenuItem>Item 1</DropDownMenuItem>
        <DropDownMenuItem>Item 2</DropDownMenuItem>
        <DropDownMenuItem>Item 3</DropDownMenuItem>
      </DropDownMenu>
    );
  },
};

export const WithGroups: Story = {
  args: {},
  render(args) {
    return (
      <DropDownMenu {...args} header={<span>Header</span>}>
        <DropDownMenuGroup>
          <DropDownMenuItem icon={<CheckIcon />}>Item 1.1</DropDownMenuItem>
          <DropDownMenuItem>Item 1.2</DropDownMenuItem>
          <DropDownMenuItem>Item 1.3</DropDownMenuItem>
          <DropDownMenuItem>Item 1.4</DropDownMenuItem>
        </DropDownMenuGroup>
        <DropDownMenuGroup>
          <DropDownMenuItem>Item 2.1</DropDownMenuItem>
          <DropDownMenuItem>Item 2.2</DropDownMenuItem>
          <DropDownMenuItem>Item 2.3</DropDownMenuItem>
        </DropDownMenuGroup>
        <DropDownMenuGroup>
          <DropDownMenuItem>Item 3.1</DropDownMenuItem>
        </DropDownMenuGroup>
      </DropDownMenu>
    );
  },
};

export const WithIcon: Story = {
  args: {},
  render(args) {
    return (
      <DropDownMenu {...args} header={<span>Header</span>}>
        <DropDownMenuGroup>
          <DropDownMenuItem icon={<CheckIcon />}>Item 1.1</DropDownMenuItem>
          <DropDownMenuItem>Item 1.2</DropDownMenuItem>
          <DropDownMenuItem>Item 1.3</DropDownMenuItem>
        </DropDownMenuGroup>
        <DropDownMenuGroup>
          <DropDownMenuItem>Item 2.1</DropDownMenuItem>
        </DropDownMenuGroup>
      </DropDownMenu>
    );
  },
};

export const WithSubMenu: Story = {
  args: {},
  render(args) {
    return (
      <DropDownMenu {...args} header={<span>Menu Header</span>}>
        <DropDownMenuGroup header={<span>Group Header</span>}>
          <DropDownMenuItem>Item 1.1</DropDownMenuItem>
          <DropDownMenuItem>Item 1.2</DropDownMenuItem>
          <DropDownMenuItem
            icon={<CheckIcon />}
            subMenu={(args) => (
              <DropDownMenu {...args} header={<span>Sub Menu Header</span>}>
                <DropDownMenuItem>Item 1.3.1</DropDownMenuItem>
                <DropDownMenuItem>Item 1.3.2</DropDownMenuItem>
              </DropDownMenu>
            )}
          >
            Item 1.3
          </DropDownMenuItem>
        </DropDownMenuGroup>
        <DropDownMenuGroup header={<span>Group Header</span>}>
          <DropDownMenuItem>Item 2.1</DropDownMenuItem>
          <DropDownMenuItem
            subMenu={(args) => (
              <DropDownMenu {...args} header={<span>Sub Menu Header</span>}>
                <DropDownMenuItem>Item 2.2.1</DropDownMenuItem>
                <DropDownMenuItem>Item 2.2.2</DropDownMenuItem>
              </DropDownMenu>
            )}
          >
            Item 2.2
          </DropDownMenuItem>
        </DropDownMenuGroup>
      </DropDownMenu>
    );
  },
};
