import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { buildConfig, BuildDtsConfig } from './src/build-info'

export default defineConfig({
  build: buildConfig,
  plugins: [
    vue(),
    dts(BuildDtsConfig),
    {
      name: 'style',
      generateBundle(config, bundle) {
        const keys = Object.keys(bundle)
        for (const key of keys) {
          const bundler: any = bundle[key as any]
          this.emitFile({
            type: 'asset',
            fileName: key,
            source: bundler.code.replace(/\.scss/g, '.css'),
          })
        }
      },
    },
  ],
})
