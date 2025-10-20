import type { StorybookConfig } from '@storybook/angular';
import { DefinePlugin } from 'webpack';

const config: StorybookConfig = {
  "stories": [
    "../src/stories/**/*.mdx",
    "../src/stories/sj-*.stories.ts"
  ],
  "addons": [
    "@storybook/addon-docs"
  ],
  // Enable Autodocs globally so you don't need to tag every story
  docs: { autodocs: true },
  "framework": {
    "name": "@storybook/angular",
    "options": {}
  },
  webpackFinal: async (baseConfig) => {
    // Remove any existing DefinePlugin that sets process.env.NODE_ENV to avoid conflicts
    baseConfig.plugins = (baseConfig.plugins || []).filter((p: any) => {
      const isDefine = p && p.constructor && p.constructor.name === 'DefinePlugin';
      if (!isDefine) return true;
      try {
        const defs = (p as any).definitions || (p as any).runtimeValue || {};
        return !(defs && (defs['process.env.NODE_ENV'] || defs['process.env']));
      } catch {
        return true;
      }
    });
    baseConfig.plugins?.push(new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }));
    return baseConfig;
  }
};
export default config;
