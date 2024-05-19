import type { Meta, StoryObj } from "@storybook/react";
import { PropsWithChildren } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Foundations/Typography",
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<PropsWithChildren>;

export const Display2xl: Story = {
  args: {
    children: "Display 2XL",
  },
  render(args) {
    return (
      <>
        <p {...args} className="text-display-2xl font-normal" />
        <p {...args} className="text-display-2xl font-medium" />
        <p {...args} className="text-display-2xl font-semibold" />
        <p {...args} className="text-display-2xl font-bold" />
      </>
    );
  },
};

export const DisplayXl: Story = {
  args: {
    children: "Display XL",
  },
  render(args) {
    return (
      <>
        <p {...args} className="text-display-xl font-normal" />
        <p {...args} className="text-display-xl font-medium" />
        <p {...args} className="text-display-xl font-semibold" />
        <p {...args} className="text-display-xl font-bold" />
      </>
    );
  },
};

export const DisplayLG: Story = {
  args: {
    children: "Display LG",
  },
  render(args) {
    return (
      <>
        <p {...args} className="text-display-lg font-normal" />
        <p {...args} className="text-display-lg font-medium" />
        <p {...args} className="text-display-lg font-semibold" />
        <p {...args} className="text-display-lg font-bold" />
      </>
    );
  },
};

export const DisplayMD: Story = {
  args: {
    children: "Display MD",
  },
  render(args) {
    return (
      <>
        <p {...args} className="text-display-md font-normal" />
        <p {...args} className="text-display-md font-medium" />
        <p {...args} className="text-display-md font-semibold" />
        <p {...args} className="text-display-md font-bold" />
      </>
    );
  },
};

export const DisplaySM: Story = {
  args: {
    children: "Display SM",
  },
  render(args) {
    return (
      <>
        <p {...args} className="text-display-sm font-normal" />
        <p {...args} className="text-display-sm font-medium" />
        <p {...args} className="text-display-sm font-semibold" />
        <p {...args} className="text-display-sm font-bold" />
      </>
    );
  },
};

export const DisplayXS: Story = {
  args: {
    children: "Display XS",
  },
  render(args) {
    return (
      <>
        <p {...args} className="text-display-xs font-normal" />
        <p {...args} className="text-display-xs font-medium" />
        <p {...args} className="text-display-xs font-semibold" />
        <p {...args} className="text-display-xs font-bold" />
      </>
    );
  },
};

export const TextXl: Story = {
  args: {
    children: "Text XL",
  },
  render(args) {
    return (
      <>
        <p {...args} className="text-xl font-normal" />
        <p {...args} className="text-xl font-medium" />
        <p {...args} className="text-xl font-semibold" />
        <p {...args} className="text-xl font-bold" />
      </>
    );
  },
};

export const TextLG: Story = {
  args: {
    children: "Text LG",
  },
  render(args) {
    return (
      <>
        <p {...args} className="text-lg font-normal" />
        <p {...args} className="text-lg font-medium" />
        <p {...args} className="text-lg font-semibold" />
        <p {...args} className="text-lg font-bold" />
      </>
    );
  },
};

export const TextMD: Story = {
  args: {
    children: "Text MD",
  },
  render(args) {
    return (
      <>
        <p {...args} className="text-md font-normal" />
        <p {...args} className="text-md font-medium" />
        <p {...args} className="text-md font-semibold" />
        <p {...args} className="text-md font-bold" />
      </>
    );
  },
};

export const TextSM: Story = {
  args: {
    children: "Text SM",
  },
  render(args) {
    return (
      <>
        <p {...args} className="text-sm font-normal" />
        <p {...args} className="text-sm font-medium" />
        <p {...args} className="text-sm font-semibold" />
        <p {...args} className="text-sm font-bold" />
      </>
    );
  },
};

export const TextXS: Story = {
  args: {
    children: "Text XS",
  },
  render(args) {
    return (
      <>
        <p {...args} className="text-xs font-normal" />
        <p {...args} className="text-xs font-medium" />
        <p {...args} className="text-xs font-semibold" />
        <p {...args} className="text-xs font-bold" />
      </>
    );
  },
};
