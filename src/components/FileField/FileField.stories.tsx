import { useEffect, useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HomeIcon } from "@this/icons";
import type { FileFieldProps } from "./types";

import { FileField } from "./FileField";
import { Button } from "../Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/FileField",
  component: FileField as React.FC,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: {
      type: "string",
    },
  },
  args: {
    placeholder: "Placeholder",
    disabled: false,
  },
} satisfies Meta<FileFieldProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};

export const Multiple: Story = {
  args: {
    multiple: true,
  },
};

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
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (ref.current) {
        ref.current.setCustomValidity("Invalid");
      }
    }, []);

    return <FileField {...args} ref={ref} />;
  },
};

export const FormReset: Story = {
  args: {
    leadingIcon: <HomeIcon />,
    required: true,
  },
  render(args) {
    return (
      <form className="flex flex-col gap-4">
        <FileField {...args} />

        <div className="flex gap-2 justify-center">
          <Button hierarchy="primary" type="submit">
            Submit
          </Button>
          <Button type="reset">Reset</Button>
        </div>
      </form>
    );
  },
};
