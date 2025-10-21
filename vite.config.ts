import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
 define: {
    'process.env.NODE_ENV': JSON.stringify("production"),
  },
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      exclude: ["**/*.test.ts"]
    })
  ],
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'ui',
      fileName: (format) => `ui.${format}.js`,
      formats: ['es'],
    },
  },
})
