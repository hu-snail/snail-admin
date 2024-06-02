import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    outDir: 'es',
    minify: false,
    rollupOptions: {
      external: ['vue', '@snail-admin/utils'],
      input: ['index.ts'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          exports: 'named',
          dir: '../snail-login/es',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          exports: 'named',
          dir: '../snail-login/lib',
        },
      ],
    },
    lib: {
      entry: './index.ts',
    },
  },
  plugins: [
    vue(),
    dts({
      root: './src',
      outDir: ['../es', '../lib'],
      cleanVueFileName: true,
    }),
  ],
})
