import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  source: {
    entry: {
      index: "./playground",
    },
    alias: {
      "@duckform/core": "./packages/core/src",
      "@duckform/core/shared": "./packages/core/src/shared",
      "@duckform/react": "./packages/react/src",
      "@duckform/core/settings-form": "./packages/core/react/settings-form",
    },
  },
  plugins: [pluginReact()],
});
