import { pkgRoot } from '../../shared/path.js'

const prefix = `/${pkgRoot}/snail-login`
const ENTRY_PATH = `${prefix}/index.ts`
const DIST_DIR = `${prefix}/dist`
export const buildConfig: any = {
  outDir: 'es',
  sourcemap: true,
  rollupOptions: {
    external: ['vue', '@snail-admin/utils'],
    input: [ENTRY_PATH],
    output: {
      globals: {
        vue: 'Vue',
        utils: 'utils',
      },
      dir: DIST_DIR,
    },
  },
  lib: {
    entry: ENTRY_PATH,
    name: 'snail-login',
    fileName: 'index.full',
    formats: ['es', 'umd', 'cjs'],
  },
}
