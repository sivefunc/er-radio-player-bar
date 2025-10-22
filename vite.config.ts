import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify("production"),
      'process.env.SPOTIFY_CLIENT_ID': JSON.stringify(env.SPOTIFY_CLIENT_ID),
      'process.env.SPOTIFY_CLIENT_SECRET': JSON.stringify(env.SPOTIFY_CLIENT_SECRET),
    },
    plugins: [
      react(),
      dts({
        tsconfigPath: './tsconfig.app.json',
        exclude: ["**/*.test.ts"]
      }),
    ],
    build: {
      lib: {
        entry: './src/index.tsx',
        name: 'ui',
        fileName: (format) => `ui.${format}.js`,
        formats: ['es'],
      },
    },
  }
})

