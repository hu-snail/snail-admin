import { pkgRoot } from '../../shared/path.js'

const prefix = `/${pkgRoot}/snail-login`
const ENTRY_PATH = `${prefix}/index.ts`
const DIST_DIR = `${prefix}/dist`

export const buildFull = (minify: boolean): any => ({
  outDir: 'es',
  minify,
  sourcemap: minify,
  rollupOptions: {
    external: ['vue', '@snail-admin/utils'],
    input: [ENTRY_PATH],
    output: [
      {
        format: 'es',
        entryFileNames: `[name].full${minify ? '.min' : ''}.mjs`,
        exports: 'named',
        dir: DIST_DIR,
      },
      {
        format: 'cjs',
        entryFileNames: `[name].full${minify ? '.min' : ''}.js`,
        exports: 'named',
        dir: DIST_DIR,
        globals: {
          vue: 'Vue',
        },
      },
    ],
  },
  lib: {
    entry: ENTRY_PATH,
    name: 'snail-login',
  },
})
