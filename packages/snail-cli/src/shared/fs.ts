import { existsSync } from 'fs'
import fse from 'fs-extra'
import { mkdir, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'

const { lstatSync, pathExistsSync } = fse

export const writeJson = (path: string, data: any, spaces = 0) =>
  writeFile(path, JSON.stringify(data, undefined, spaces), 'utf-8')

export const ensureDir = async (path: string) => {
  if (!existsSync(path)) await mkdir(path, { recursive: true })
}

export function getDirname(url: string) {
  return fileURLToPath(new URL('.', url))
}

export const isDir = (file: string): boolean => pathExistsSync(file) && lstatSync(file).isDirectory()
