import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../**/*.stories.@(ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
    });
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },

  docs: {},
};
export default config;
