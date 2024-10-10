import { ReactNode, useLayoutEffect } from "react";
import { useRef, useState } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { LoremIpsum } from "lorem-ipsum";
import type { ComboboxProps } from "./types";

import { HomeIcon, UserIcon } from "../../icons";
import { Combobox, ListBoxOption } from "../index";

const lorem = new LoremIpsum();

export type Option = { value: number; text: string; icon: ReactNode };

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Combobox",
  component: Combobox<Option>,
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
    options: Array.from({ length: 30 }).map((_, index) => ({
      value: index,
      text: lorem.generateWords(3),
      icon: index % 2 === 0 ? <HomeIcon /> : <UserIcon />,
    })),
    getOptionValue(option) {
      return String(option.value);
    },
    getOptionText(option) {
      return option.text;
    },
  },
} as Meta<ComboboxProps<Option>>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SelectOnly: Story = {
  render(args) {
    const [value, onChange] = useState<Option | undefined>(undefined);
    return <Combobox {...args} value={value} onChange={onChange} />;
  },
};

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <UserIcon />,
    renderOption({ option, text, ...props }) {
      return (
        <ListBoxOption {...props} key={props.value} icon={option.icon}>
          {text}
        </ListBoxOption>
      );
    },
  },
  render(args) {
    const [value, onChange] = useState<Option | undefined>(undefined);
    return (
      <Combobox
        {...args}
        leadingIcon={value?.icon ?? args.leadingIcon}
        value={value}
        onChange={onChange}
      />
    );
  },
};

export const Invalid: Story = {
  args: {
    leadingIcon: <UserIcon />,
  },
  render(args) {
    const ref = useRef<HTMLInputElement | null>(null);
    const [value, onChange] = useState<Option | undefined>(undefined);

    useLayoutEffect(() => {
      if (ref.current) {
        ref.current.setCustomValidity("Invalid");
      }
    }, []);

    return <Combobox {...args} ref={ref} value={value} onChange={onChange} />;
  },
};

export const Autocomplete: Story = {
  args: {
    type: "autocomplete",
  },
  render(args) {
    const [value, onChange] = useState<Option | undefined>(undefined);
    const [options, setOptions] = useState(args.options ?? []);

    return (
      <Combobox
        {...args}
        options={options}
        value={value}
        onChange={onChange}
        onSearch={onSearch}
      />
    );

    function onSearch(value: string) {
      setOptions(
        (args.options ?? []).filter((option) =>
          option.text.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    }
  },
};
