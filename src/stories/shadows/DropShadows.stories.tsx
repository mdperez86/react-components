import type { Meta, StoryObj } from "@storybook/react";
import { PropsWithChildren } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Foundations/Shadows/DropShadows",
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

export const DropShadows: Story = {
  render(args) {
    return (
      <div className="grid grid-cols-4 gap-4">
        <div {...args} className="w-24 h-24 bg-white drop-shadow-xs" />
        <div {...args} className="w-24 h-24 bg-white drop-shadow-sm" />
        <div {...args} className="w-24 h-24 bg-white drop-shadow-md" />
        <div {...args} className="w-24 h-24 bg-white drop-shadow-lg" />
        <div {...args} className="w-24 h-24 bg-white drop-shadow-xl" />
        <div {...args} className="w-24 h-24 bg-white drop-shadow-2xl" />
        <div {...args} className="w-24 h-24 bg-white drop-shadow-3xl" />
      </div>
    );
  },
};
