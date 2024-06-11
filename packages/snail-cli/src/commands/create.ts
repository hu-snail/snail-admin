import logger from '../shared/logger.js'
import { loginTemplateRoot, dirname } from '../shared/path.js'

import { bigCamelize, kebabCase, camelize } from '@snail-admin/utils'
import { resolve } from 'path'
import inquirer from 'inquirer'
import fse from 'fs-extra'

const { pathExistsSync, copySync } = fse
const { prompt } = inquirer

type CodingStyle = 'tsx' | 'vue'

export interface CreateCommandOptions {
  internal?: boolean
  name?: string
  locale?: boolean
  sfc?: boolean
  tsx?: boolean
}

interface RenderData {
  kebabCaseName: string
  bigCamelizeName: string
  camelizeName: string
  locale?: boolean
  style: CodingStyle
  namespace: string
  bigCamelizeNamespace: string
}

export async function create(options: CreateCommandOptions) {
  logger.title('\n 🍀🍀Create a component ! \n')
  const namespace = 'sn'
  const renderData: RenderData = {
    namespace,
    bigCamelizeNamespace: bigCamelize(namespace),
    kebabCaseName: 'component-name',
    bigCamelizeName: 'ComponentName',
    camelizeName: 'componentName',
    style: 'vue',
  }

  const { name } = options.name
    ? options
    : await prompt({
        name: 'name',
        message: 'Name of the component created: ',
        default: renderData.kebabCaseName,
      })

  const kebabCaseName = kebabCase(name)
  const bigCamelizeName = bigCamelize(name)
  const camelizeName = camelize(name)

  Object.assign(renderData, { kebabCaseName, bigCamelizeName, camelizeName })

  const componentFolder = resolve(loginTemplateRoot, kebabCaseName)
  if (pathExistsSync(componentFolder)) {
    logger.warning(`${kebabCaseName} already exist and cannot be recreated...`)
    return
  }

  if (options.sfc || options.tsx) {
    renderData.style = options.sfc ? 'vue' : 'tsx'
  } else {
    const { style } = await prompt({
      name: 'style',
      type: 'list',
      message: 'Which style do you use to write your component ?',
      choices: [
        { name: 'sfc', value: 'vue' },
        { name: 'tsx', value: 'tsx' },
      ],
      default: 'vue',
    })

    renderData.style = style
  }
  copySync(resolve(dirname, '../../../template/create'), componentFolder)
}
