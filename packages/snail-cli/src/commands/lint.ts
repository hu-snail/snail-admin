import execa from 'execa'
import { createSpinner } from 'nanospinner'
import { CWD, ESLINT_EXTENSIONS } from '../shared/constants.js'
import { isDir } from '../shared/fs.js'
import { resolve } from 'path'
import logger from '../shared/logger.js'

export async function lint() {
  logger.title('\n 🍀🍀snail-cli lint ! \n')
  const spinner = createSpinner()
  try {
    spinner.start({ text: 'prettier starting...' })
    await execa('prettier', ['--write', '--cache', '.'])
    spinner.success({ text: 'prettier success' })

    spinner.start({ text: 'eslint starting...' })

    const eslintPatterns: string[] = [
      './src',
      './packages/snail-cli/src',
      './packages/snail-use/src',
      './packages/snail-utils/src',
      './packages/snail-vite-plugins/src',
    ]
    const { stdout } = await execa('eslint', [
      ...eslintPatterns.filter((pattern) => isDir(resolve(CWD, pattern))),
      '--fix',
      '--cache',
      '--ext',
      ESLINT_EXTENSIONS.join(),
    ])

    const type = stdout ? 'warn' : 'success'

    spinner[type]({ text: stdout || 'eslint success' })
  } catch (e: any) {
    spinner!.error({ text: e.toString() })
    process.exit(1)
  }
}
