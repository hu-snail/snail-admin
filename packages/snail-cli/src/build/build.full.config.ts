import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { buildConfig } from './src/build-full.js'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import { terser } from 'rollup-plugin-terser'
import { pkgRoot } from '../shared/path.js'
import fse from 'fs-extra'

const { removeSync } = fse

export default defineConfig({
  plugins: [
    vue(),
    postcss({
      extract: 'index.css',
      use: ['sass'],
      plugins: [autoprefixer(), cssnano()],
    }),
    terser({
      format: {
        comments: 'all',
      },
    }),
    {
      name: 'remove',
      async buildEnd() {
        await removeSync(pkgRoot + '/snail-login/dist')
      },
      async closeBundle() {
        await removeSync(pkgRoot + '/snail-login/dist/style.css')
      },
    },
  ],
  build: buildConfig,
})
