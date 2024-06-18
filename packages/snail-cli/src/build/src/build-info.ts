import { type RollupOptions } from 'rollup'
import { pkgRoot } from '../../shared/path.js'

export interface BuildInfo {
  outDir?: string
  minify: boolean
  rollupOptions: RollupOptions
  lib: {
    entry: string
  }
}
const prefix = `/${pkgRoot}/${process.env.COMP_NAME}`
const ENTRY_PATH = `${prefix}/index.ts`
const ES_PATH = `${prefix}/es`
const CJS_PATH = `${prefix}/lib`
const SRC = `${prefix}/src`

export const buildConfig: BuildInfo = {
  outDir: 'es',
  minify: false,
  rollupOptions: {
    external: ['vue', '@snail-admin/utils', /\.scss/],
    input: [ENTRY_PATH],
    output: [
      {
        format: 'es',
        entryFileNames: '[name].mjs',
        preserveModules: true,
        exports: 'named',
        dir: ES_PATH,
      },
      {
        format: 'cjs',
        entryFileNames: '[name].js',
        preserveModules: true,
        exports: 'named',
        dir: CJS_PATH,
      },
    ],
  },
  lib: {
    entry: ENTRY_PATH,
  },
}

export interface BuildDtsInfo {
  root: string
  /** e.g: ['../es', '../lib'] */
  outDir: string[]
}

export const BuildDtsConfig: BuildDtsInfo = {
  root: SRC,
  outDir: [ES_PATH, CJS_PATH],
}
