import type { Meta, StoryObj } from "@storybook/react";
import { Home } from "@this/icons";
import type { ButtonGroupProps } from "./types";

import { ButtonGroup } from "./ButtonGroup";
import { Button } from "../Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {},
} satisfies Meta<ButtonGroupProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    hierarchy: "primary",
  },
  render(args) {
    return (
      <ButtonGroup {...args}>
        <Button>Leading</Button>
        <Button>Middle</Button>
        <Button disabled>Middle</Button>
        <Button destructive>Trailing</Button>
      </ButtonGroup>
    );
  },
};

export const Secondary: Story = {
  args: {
    hierarchy: "secondary",
  },
  render(args) {
    return (
      <ButtonGroup {...args}>
        <Button>Leading</Button>
        <Button>Middle</Button>
        <Button disabled>Middle</Button>
        <Button destructive>Trailing</Button>
      </ButtonGroup>
    );
  },
};

export const Tertiary: Story = {
  args: {
    hierarchy: "tertiary",
  },
  render(args) {
    return (
      <ButtonGroup {...args}>
        <Button>Leading</Button>
        <Button>Middle</Button>
        <Button disabled>Middle</Button>
        <Button destructive>Trailing</Button>
      </ButtonGroup>
    );
  },
};

export const WithIcon: Story = {
  args: {
    icon: "leading",
  },
  render(args) {
    return (
      <ButtonGroup {...args}>
        <Button>
          <Home />
          <span>Leading</span>
        </Button>
        <Button disabled>
          <Home />
          <span>Middle</span>
        </Button>
        <Button destructive>
          <Home />
          <span>Trailing</span>
        </Button>
      </ButtonGroup>
    );
  },
};

export const WithIconOnly: Story = {
  args: {
    icon: "only",
  },
  render(args) {
    return (
      <ButtonGroup {...args}>
        <Button aria-label="Home">
          <Home />
        </Button>
        <Button disabled aria-label="Home">
          <Home />
        </Button>
        <Button destructive aria-label="Home">
          <Home />
        </Button>
      </ButtonGroup>
    );
  },
};

export const Mixed: Story = {
  args: {},
  render(args) {
    return (
      <ButtonGroup {...args}>
        <span>Not a button</span>
        <Button hierarchy="primary">Leading</Button>
        <Button icon="leading">
          <Home />
          <span>Middle</span>
        </Button>
        <Button icon="only" aria-label="Home">
          <Home />
        </Button>
        <Button icon="trailing">
          <Home />
          <span>Middle</span>
        </Button>
        <Button disabled>Middle</Button>
        <span>Not a button</span>
        <Button destructive>Middle</Button>
        <Button>Trailing</Button>
        <span>Not a button</span>
      </ButtonGroup>
    );
  },
};
