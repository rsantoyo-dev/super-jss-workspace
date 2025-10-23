import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    port: 5173,
    open: true,
    fs: {
      // Allow serving files from the workspace root and headfire-core/dist
      allow: [
        process.cwd(),
        path.resolve(__dirname, '../headfire-core/dist'),
        path.resolve(__dirname, '../headfire-core/src'),
        // Allow serving the packaged Headfire assets (CSS, runtime)
        path.resolve(__dirname, '../packages/headfire/dist'),
      ],
    },
  },
});
