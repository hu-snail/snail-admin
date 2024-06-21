import vue from '@vitejs/plugin-vue'
import { buildFull } from './src/build-full.js'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export const buildFullConfig = (minify: boolean) => ({
  plugins: [
    vue(),
    postcss({
      extract: 'index.css',
      use: ['sass'],
      plugins: [autoprefixer(), cssnano()],
    }),
  ],
  build: buildFull(minify),
})
