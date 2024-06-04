import { type RollupOptions } from 'rollup'
import { loginEntry, loginOutputEs, loginOutputCjs, loginSrc } from '../../shared/index.js'

export interface BuildInfo {
  outDir?: string
  minify: boolean
  rollupOptions: RollupOptions
  lib: {
    entry: string
  }
}

export const buildConfig: BuildInfo = {
  outDir: 'es',
  minify: false,
  rollupOptions: {
    external: ['vue', '@snail-admin/utils'],
    input: [loginEntry],
    output: [
      {
        format: 'es',
        entryFileNames: '[name].mjs',
        preserveModules: true,
        exports: 'named',
        dir: loginOutputEs,
      },
      {
        format: 'cjs',
        entryFileNames: '[name].js',
        preserveModules: true,
        exports: 'named',
        dir: loginOutputCjs,
      },
    ],
  },
  lib: {
    entry: loginEntry,
  },
}

export interface BuildDtsInfo {
  root: string
  /** e.g: ['../es', '../lib'] */
  outDir: string[]
}

export const BuildDtsConfig: BuildDtsInfo = {
  root: loginSrc,
  outDir: [loginOutputEs, loginOutputCjs],
}
