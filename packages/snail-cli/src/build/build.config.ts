import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { buildConfig, BuildDtsConfig } from './src/build-info'

export default defineConfig({
  build: buildConfig,
  plugins: [vue(), dts(BuildDtsConfig)],
})
