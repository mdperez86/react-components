import type { Meta, StoryObj } from "@storybook/react";
import { ActivityIcon } from "./ActivityIcon";
import * as icons from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Foundations/Icons",
  component: ActivityIcon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof ActivityIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
  render(args) {
    return (
      <div className="inline-flex gap-2 max-w-sm flex-wrap">
        {Object.entries(icons).map(([_, Icon], index) => (
          <Icon {...args} key={index} />
        ))}
      </div>
    );
  },
};
