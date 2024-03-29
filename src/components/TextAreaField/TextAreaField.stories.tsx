import { useEffect, useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HomeIcon } from "@this/icons";
import type { TextAreaFieldProps } from "./types";

import { TextAreaField } from "./TextAreaField";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/TextAreaField",
  component: TextAreaField as React.FC,
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
  },
} satisfies Meta<TextAreaFieldProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <HomeIcon />,
  },
};

export const WithHelpIcon: Story = {
  args: {
    helpIcon: true,
  },
};

export const Invalid: Story = {
  args: {
    leadingIcon: <HomeIcon />,
    helpIcon: true,
  },
  render(args) {
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (ref.current) {
        ref.current.setCustomValidity("Invalid");
      }
    }, []);

    return <TextAreaField {...args} ref={ref} />;
  },
};
