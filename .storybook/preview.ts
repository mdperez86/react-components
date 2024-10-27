import type { Preview } from "@storybook/react";
import { fn } from "@storybook/test";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

import "./styles.css";

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "dark",
    attributeName: "data-mode",
  }),
];

const preview: Preview = {
  tags: ["autodocs"],
  args: {
    onClick: fn(),
    onBlur: fn(),
    onFocus: fn(),
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
