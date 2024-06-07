import logger from '../shared/logger'

export interface CreateCommandOptions {
  internal?: boolean
  name?: string
  locale?: boolean
  sfc?: boolean
  tsx?: boolean
}

export async function create(options: CreateCommandOptions) {
  logger.title('\n 🍀🍀Create a component ! \n')
}
