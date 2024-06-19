import type { App, Plugin } from 'vue'

const version = '1.0.0'
export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    components.forEach((c) => app.use(c))
  }

  return {
    version,
    install,
  }
}
