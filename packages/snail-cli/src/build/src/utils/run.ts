import execa from 'execa'
import { createSpinner } from 'nanospinner'

export function createTask(cwd: string, command = 'build') {
  return () => execa('pnpm', [command], { cwd })
}

export async function runTask(taskName: string, task: any) {
  const s = createSpinner(`Building ${taskName}`).start()
  try {
    const start = performance.now()
    await task()
    s.success({ text: `Build ${taskName} completed! (${Math.ceil(performance.now() - start)}ms)` })
  } catch (e: any) {
    s.error({ text: `Build ${taskName} failed!` })
    console.error(e.toString())
  }
}
