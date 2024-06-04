import execa from 'execa'
import { createSpinner } from 'nanospinner'
import { resolve } from 'path'

const CWD = process.cwd()
export function createTask(cwd, command = 'build') {
  return () => execa('pnpm', [command], { cwd })
}

export async function runTask(taskName, task) {
  const nanos = createSpinner(`Building ${taskName}`).start()
  try {
    const start = performance.now()
    await task()
    nanos.success({ text: `Build ${taskName} completed! (${Math.ceil(performance.now() - start)}ms)` })
  } catch (e) {
    nanos.error({ text: `Build ${taskName} failed!` })
    console.error(e.toString())
  }
}

export const buildLogin = createTask(resolve(CWD, './packages/snail-login'))

export async function runTaskQueue() {
  const start = performance.now()
  await runTask('login', buildLogin)
  console.info(`All tasks built in ${Math.ceil(performance.now() - start)} ms`)
}
