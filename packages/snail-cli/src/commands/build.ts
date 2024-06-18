// import { resolve } from 'path'
import { createSpinner } from 'nanospinner'
// import { dirname } from '../shared/path.js'
// import { build as buildVite } from 'vite'
// import buildConfig from '../build/build.config.js'
import logger from '../shared/logger.js'
import execa from 'execa'

// const buildPath = resolve(dirname, '..', 'build')

type PackageStyle = 'compontent' | 'plugin'

export interface BuildCommandOptions {
  style: PackageStyle
}
export async function build(options: any) {
  console.log(options)
  const spinner = createSpinner()
  logger.title('\n 🍀🍀snail-cli build ! \n')
  spinner.start({ text: 'build starting...' })

  await execa('gulp')
}
