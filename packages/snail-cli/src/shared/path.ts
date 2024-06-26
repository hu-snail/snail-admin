import { resolve } from 'path'
import { getDirname } from './fs.js'
import {
  LOGIN_COMP_NAME,
  LAYOUT_COMP_NAME,
  ESLINT_PLUGIN_NAME,
  UTILS_PLUGIN_NAME,
  USE_PLUGIN_NAME,
  VITE_PLUGIN_NAME,
  CLI_PLUGIN_NAME,
} from './constants.js'

export const dirname = getDirname(import.meta.url)
// 项目根目录
export const projRoot = resolve(dirname, '..', '..', '..', '..')
// packages 目录
export const pkgRoot = resolve(projRoot, 'packages')
// 登录组件目录
export const loginRoot = resolve(pkgRoot, LOGIN_COMP_NAME)
// 登录模版目录
export const loginTemplateRoot = resolve(projRoot, LOGIN_COMP_NAME, 'src', 'template')
// 布局组件目录
export const layoutRoot = resolve(pkgRoot, LAYOUT_COMP_NAME)
// 布局模板目录
export const layoutTemplateRoot = resolve(projRoot, LAYOUT_COMP_NAME, 'src')
// eslint 插件目录
export const eslintRoot = resolve(projRoot, ESLINT_PLUGIN_NAME)
// utils 插件目录
export const utilsRoot = resolve(projRoot, UTILS_PLUGIN_NAME)
// use 插件目录
export const useRoot = resolve(projRoot, USE_PLUGIN_NAME)
// vite 插件目录
export const vitePluginRoot = resolve(projRoot, VITE_PLUGIN_NAME)
// cli 插件目录
export const cliRoot = resolve(projRoot, CLI_PLUGIN_NAME)

// 文档
export const docsDirName = 'docs'
export const docRoot = resolve(projRoot, docsDirName)
export const vpRoot = resolve(docRoot, '.vitepress')

// login build
export const loginSrc = resolve(loginRoot, './src')
export const loginEntry = resolve(loginRoot, 'index.ts')
export const loginOutputCjs = resolve(loginRoot, 'lib')
export const loginOutputEs = resolve(loginRoot, 'es')

export const projPackage = resolve(projRoot, 'package.json')
